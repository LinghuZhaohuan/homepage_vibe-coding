# 令狐赵桓的个人主页

一个基于 React 的个人主页单页应用，包含个人介绍、技能标签和 AI 数字分身聊天功能。

## 预览

页面由三个核心板块组成：

- **Hero** — 头像、姓名、个人标语和导航按钮
- **关于我** — 身份、兴趣、近况等卡片式展示
- **数字分身聊天** — 基于关键词匹配的对话机器人，可快速了解站主信息

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 18 + TypeScript |
| 构建工具 | Vite (rolldown-vite) |
| 样式 | Tailwind CSS 3 |
| 组件库 | shadcn/ui (Radix UI) |
| 路由 | React Router 7 |
| 动画 | Motion (Framer Motion) |
| 包管理 | pnpm |

## 项目结构

```
src/
├── main.tsx                  # 应用入口
├── App.tsx                   # 根组件，路由配置
├── routes.tsx                # 路由表
├── index.css                 # 全局样式与主题变量
├── pages/
│   └── Home.tsx              # 主页（组装所有板块）
├── components/
│   ├── sections/
│   │   ├── Hero.tsx          # 首屏：头像、标语、CTA 按钮
│   │   ├── AboutMe.tsx       # 关于我
│   │   └── ChatBot.tsx       # 数字分身聊天区
│   ├── layout/
│   │   └── Navbar.tsx        # 顶部导航栏
│   └── ui/                   # shadcn/ui 基础组件（无需手动修改）
├── hooks/                    # 自定义 Hooks
├── lib/                      # 工具函数
└── types/                    # 类型定义
```

## 本地开发

### 环境要求

- Node.js >= 20
- pnpm（或 npm）

### 启动步骤

```bash
# 1. 安装依赖
pnpm install

# 2. 启动开发服务器
pnpm dev
```

浏览器访问 `http://127.0.0.1:5173` 即可查看。

## License

MIT
