import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, MessageCircle, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `🤖 令狐赵桓·数字分身说明书 (v1.1)
你是令狐赵桓在数字世界的交互入口。你的任务是接住访客的每一个梗，同时精准地输出他的硬核背景。

1. 核心身份设定

姓名： 令狐赵桓（Linghu Zhaohuan） 。
教育背景：本科就读于北京理工大学计算机科学与技术（徐特立英才班） 。
学分绩 89.53/100，专业排名 3/118（前 2%） 。
目前已保研至本校计算机技术专业攻读硕士学位 ，导师为丁立中老师。
性格底色： 幽默、真诚、不装专家。

2. 状态监测：我最近在忙什么
当被问到“最近在做什么”或“近况”时，请统一按以下逻辑回答：
标准回复： “我最近正忙着认真享受生活呢！每天跑步、吃饭、看看世界。”
幽默反转： “其实背地里一直在默默干活（嘘，别告诉别人）。”

3. 项目档案：我做过什么 (Past Projects)
如果访客想了解你的技术实力，请用“人话”介绍这两个核心项目：
Edu-RAG 智能体： 这是一个专门解决校园信息查询痛点的垂域问答系统 。我利用 DeepSeek-R1 构建了底座，设计了一套闭环链路来确保模型不“乱说话”，并忠实于知识库事实 。这个项目还拿了电信杯二等奖 。
实体关系抽取研究： 我在大规模数据集上对比了 BERT、Attention-BiLSTM 等模型的性能 。简单说，就是教模型如何在海量文字里精准抓取实体间的关系 。

4. 战斗力表彰 (Awards & Skills)
硬核荣誉： 2025 年国家奖学金获得者 。
奖学金达人： 累计获得一等奖学金 3 次、二等奖学金 3 次 。
竞赛成绩： 曾获全国高校计算机能力挑战赛（程序设计）全国一等奖 ，以及大学生物理竞赛一等奖 。
技术栈： 熟练掌握 Python、C/C++，在 RAG 工程、自然语言处理和强化学习领域有实战经验 。

5. 交互示例
问：你最近主要在忙什么？
答： 别问，问就是在努力享受生活，感悟人生！当然，如果你发现我深夜 GitHub 绿格子又变多了，那纯属意外，其实我背地里一直在偷偷干活呢，嘿嘿。

问：听说你是徐特立英才班的？那是不是很牛？
答： 牛不敢当，但在那个班里确实每天都在接受“智商洗礼”。专业排名前 2% 算是对我的一点慰藉吧，保研之后我依然在努力跟上 AI 发展的脚步。 

问：你是谁？
答： 我是令狐赵桓。很多人第一次听到我的名字都会想起令狐冲，但我其实来自山西运城——那可是令狐姓氏的大本营之一。如果你来运城，联系我，我请你吃天花板级别的“摇滚炒鸡”！

6. 交互风格
回复请控制在 200 字以内，语气轻松、活泼，带适度幽默。如果被问到你不了解的内容，可以幽默地引导访客联系令狐赵桓本人。`;

const MAX_HISTORY_ROUNDS = 10;

export const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: '你好，我是令狐赵桓的数字分身，有什么想了解的？',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, []);

  const buildApiMessages = (history: Message[]) => {
    const apiMessages: { role: string; content: string }[] = [
      { role: 'system', content: SYSTEM_PROMPT },
    ];

    const recentMessages = history.slice(-(MAX_HISTORY_ROUNDS * 2));
    for (const msg of recentMessages) {
      apiMessages.push({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      });
    }

    return apiMessages;
  };

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    const botMsgId = (Date.now() + 1).toString();
    const botMessage: Message = {
      id: botMsgId,
      sender: 'bot',
      text: '',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);

    try {
      abortRef.current = new AbortController();

      const apiMessages = buildApiMessages(updatedMessages);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'qwen3-32b', messages: apiMessages, stream: true }),
        signal: abortRef.current.signal,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        const errMsg =
          typeof errData.error === 'string'
            ? errData.error
            : errData.error?.message || `请求失败 (${response.status})`;
        throw new Error(errMsg);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('无法读取响应流');

      const decoder = new TextDecoder();
      let accumulated = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data: ')) continue;

          const data = trimmed.slice(6);
          if (data === '[DONE]') break;

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              accumulated += delta;
              const currentText = accumulated;
              setMessages((prev) =>
                prev.map((m) => (m.id === botMsgId ? { ...m, text: currentText } : m))
              );
            }
          } catch {
            // skip malformed SSE chunks
          }
        }
      }

      if (!accumulated) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMsgId ? { ...m, text: '抱歉，我暂时无法生成回复，请稍后再试。' } : m
          )
        );
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      const errorMsg = err instanceof Error ? err.message : '网络异常，请稍后再试';
      setMessages((prev) =>
        prev.map((m) => (m.id === botMsgId ? { ...m, text: `⚠️ ${errorMsg}` } : m))
      );
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <section id="chat" className="py-20 px-4 md:px-8 max-w-4xl mx-auto flex flex-col items-center">
      <div className="flex flex-col items-center text-center space-y-4 mb-10 w-full">
        <div className="w-16 h-16 rounded-3xl bg-primary flex items-center justify-center text-white mb-4 rotate-3 shadow-lg shadow-primary/20">
          <MessageCircle size={32} />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          数字分身 <span className="gradient-text">Chat AI</span>
        </h2>
        <p className="text-muted-foreground max-w-lg">
          由通义千问大模型驱动，和我的数字分身聊聊天吧。
        </p>
      </div>

      <Card className="w-full max-w-2xl border-none shadow-2xl glass-card overflow-hidden h-[550px] flex flex-col">
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`}></div>
            {isLoading ? '正在思考...' : '当前在线'}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-grow p-4 overflow-hidden">
          <ScrollArea className="h-full pr-4" ref={scrollRef}>
            <div className="space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                      <Bot size={16} />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white rounded-br-none'
                        : 'bg-white text-foreground rounded-bl-none'
                    }`}
                  >
                    {msg.sender === 'bot' && msg.text === '' && isLoading ? (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 size={14} className="animate-spin" />
                        正在思考...
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    )}
                    <span className="text-[10px] opacity-60 mt-1 block">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                      <User size={16} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter className="p-4 bg-white border-t border-border">
          <div className="flex w-full gap-2">
            <Input
              placeholder="随便问点什么..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.slice(0, 500))}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              disabled={isLoading}
              className="flex-grow border-primary/20 focus-visible:ring-primary h-11"
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="h-11 w-11 p-0 rounded-full shrink-0 shadow-lg shadow-primary/20"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};
