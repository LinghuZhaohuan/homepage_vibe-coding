import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

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
  const scrollRef = useRef<HTMLDivElement>(null);

  const getBotResponse = (input: string) => {
    const text = input.trim();
    if (!text) return null;

    // 精确匹配
    if (/姓名|你叫什么|名字/.test(text)) {
      return '我叫令狐赵桓，令狐是我的姓氏，这是一个复姓哦，全名一共四个字。';
    }
    if (/昵称|你的ID|ID/.test(text)) {
      return '我的常用网络昵称是 [待填充]，目前还在虚位以待呢～';
    }
    if (/玩笑|梗|内部玩笑/.test(text)) {
      return '在这里展示一个内部梗：[待填充]，只有懂的人才会懂哦！';
    }

    // 模糊匹配逻辑扩展
    if (/研0|计算机|身份/.test(text)) {
      return '我是计算机专业的研0学生，正处于开启科研生涯的前夕。';
    }
    if (/毕设|任务|在做什么/.test(text)) {
      return '我目前的主要任务是做毕业设计和进行 vibe coding（氛围感编程）。';
    }

    // 默认回复
    return '这个问题有点难倒我了，你可以直接联系令狐赵桓本人哦～';
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // 模拟回复延迟
    setTimeout(() => {
      const botResponseText = getBotResponse(userMessage.text);
      if (botResponseText) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: botResponseText,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    }, 600);
  };

  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

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
          通过简单的交互，快速了解令狐赵桓。支持搜索姓名、身份、兴趣等关键词。
        </p>
      </div>

      <Card className="w-full max-w-2xl border-none shadow-2xl glass-card overflow-hidden h-[550px] flex flex-col">
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            当前在线
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
                    <p className="text-sm leading-relaxed">{msg.text}</p>
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
              placeholder="问问我叫什么名字..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.slice(0, 200))}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-grow border-primary/20 focus-visible:ring-primary h-11"
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="h-11 w-11 p-0 rounded-full shrink-0 shadow-lg shadow-primary/20"
            >
              <Send size={18} />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};
