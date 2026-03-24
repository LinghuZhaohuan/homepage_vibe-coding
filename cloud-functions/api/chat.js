const QWEN_API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';
const MAX_MSG_LENGTH = 500;
const MAX_REQUESTS_PER_MIN = 10;
const RATE_WINDOW_MS = 60 * 1000;

const ipRequests = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const record = ipRequests.get(ip);

  if (!record || now - record.windowStart > RATE_WINDOW_MS) {
    ipRequests.set(ip, { windowStart: now, count: 1 });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_MIN) {
    return false;
  }

  record.count++;
  return true;
}

export async function onRequestPost(context) {
  const { env, clientIp, request } = context;

  const apiKey = env.QWEN_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API Key 未配置' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!checkRateLimit(clientIp)) {
    return new Response(JSON.stringify({ error: '请求过于频繁，请稍后再试' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: '请求格式错误' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { messages } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: '消息列表不能为空' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const lastUserMsg = messages.filter(m => m.role === 'user').pop();
  if (lastUserMsg && lastUserMsg.content && lastUserMsg.content.length > MAX_MSG_LENGTH) {
    return new Response(JSON.stringify({ error: `单条消息不能超过 ${MAX_MSG_LENGTH} 字` }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const trimmedMessages = messages.slice(-21);

  const model = env.QWEN_MODEL || 'qwen-plus';

  const apiResponse = await fetch(QWEN_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: trimmedMessages,
      stream: true,
    }),
  });

  if (!apiResponse.ok) {
    const errText = await apiResponse.text();
    return new Response(JSON.stringify({ error: '模型服务异常', detail: errText }), {
      status: apiResponse.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(apiResponse.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
