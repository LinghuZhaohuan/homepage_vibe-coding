# 令狐赵桓的个人主页

一个基于 React 的个人主页单页应用，包含精致的个人介绍模块和接入通义千问大模型的 AI 数字分身聊天功能。

## 预览

页面由三个核心板块组成：

- **Hero** — 头像、姓名、个人标语和导航按钮
- **关于我** — 包含四个可折叠的交互式模块：
  - 📋 **基本信息** — 姓名、年龄、籍贯，毛玻璃卡片 + 科技感设计
  - 🎓 **教育经历** — 垂直时间线布局，逐级淡入动画
  - 📞 **联系方式** — 隐私遮蔽 + 点击解密数字滚动动画 + 二维码弹窗
  - 📄 **个人简历** — Bento Box 项目卡、水平滚动竞赛里程碑、荣誉矩阵、能力仪表盘
- **数字分身聊天** — 接入通义千问（Qwen）大模型，支持 SSE 流式输出的智能对话

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 18 + TypeScript |
| 构建工具 | Vite (rolldown-vite) |
| 样式 | Tailwind CSS 3 |
| 组件库 | shadcn/ui (Radix UI) |
| 路由 | React Router 7 |
| 动画 | Motion (Framer Motion) |
| AI 对话 | 通义千问 Qwen API (SSE 流式) |
| Serverless | EdgeOne Pages Cloud Functions |
| 包管理 | pnpm |

## 项目结构

```
homepage_v1/
├── cloud-functions/
│   └── api/
│       └── chat.js              # EdgeOne Cloud Function — Qwen API 代理
├── public/
│   ├── images/                  # 头像、二维码等静态图片
│   └── information.md           # 数字分身人设说明书
├── src/
│   ├── main.tsx                 # 应用入口
│   ├── App.tsx                  # 根组件，路由配置
│   ├── index.css                # 全局样式与主题变量
│   ├── pages/
│   │   └── Home.tsx             # 主页（组装所有板块）
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx         # 首屏：头像、标语、CTA 按钮
│   │   │   ├── AboutMe.tsx      # 关于我（容器）
│   │   │   ├── PersonalInfo.tsx # 基本信息折叠模块
│   │   │   ├── Education.tsx    # 教育经历时间线模块
│   │   │   ├── Contact.tsx      # 联系方式模块（隐私保护 + 二维码）
│   │   │   ├── Resume.tsx       # 个人简历模块（四大子板块）
│   │   │   └── ChatBot.tsx      # AI 数字分身聊天区
│   │   ├── layout/
│   │   │   └── Navbar.tsx       # 顶部导航栏
│   │   └── ui/                  # shadcn/ui 基础组件
│   ├── hooks/                   # 自定义 Hooks
│   ├── lib/                     # 工具函数
│   └── types/                   # 类型定义
├── .env.example                 # 环境变量模板
├── vite.config.ts               # Vite 配置（含本地开发代理）
└── package.json
```

## 本地开发

### 环境要求

- Node.js >= 20
- pnpm（或 npm）

### 启动步骤

```bash
# 1. 安装依赖
pnpm install

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env，填入你的 Qwen API Key

# 3. 启动开发服务器
pnpm dev
```

浏览器访问 `http://127.0.0.1:5173` 即可查看。

## AI 聊天架构

```
浏览器 ChatBot  →  POST /api/chat  →  EdgeOne Cloud Function  →  通义千问 API
                                        (注入 API Key)            (SSE 流式响应)
```

- **API Key 安全**：密钥仅存在于服务端环境变量，前端代码零接触
- **流式输出**：SSE 逐字返回，实现打字机效果
- **安全防护**：单消息 500 字限制、IP 频率限制（每分钟 10 次）、对话历史截断

### 部署到 EdgeOne Pages

1. 将代码推送到 GitHub
2. 在 [EdgeOne Pages 控制台](https://console.tencentcloud.com/edgeone/pages) 导入仓库
3. 设置构建命令 `pnpm build`，输出目录 `dist`
4. 在 Environment Variables 中添加 `QWEN_API_KEY`
5. 部署完成，访问分配的域名即可

## License

MIT
