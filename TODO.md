# Task: 打造令狐赵桓的个人主页

## Plan
- [ ] 初始化主题样式与配置文件
  - [x] 更新 `index.css` 的 HSL 变量 (樱花粉主题)
  - [x] 更新 `tailwind.config.js` 扩展颜色和配置
- [ ] 创建基础布局组件
  - [x] `src/components/layout/Navbar.tsx`: 响应式固定导航栏
- [ ] 实现主页面模块
  - [x] `src/pages/Home.tsx`: 组合所有 section
  - [x] `src/components/sections/Hero.tsx`: 个人头像与一句话介绍
  - [x] `src/components/sections/AboutMe.tsx`: 结构化信息卡片
  - [x] `src/components/sections/ChatBot.tsx`: 核心聊天逻辑与 UI
- [ ] 路由配置与清理
  - [x] 更新 `src/routes.tsx` 将首页重定向到新页面
  - [x] 移除冗余的 `SamplePage`
- [ ] 图片资源集成
  - [x] 使用 `image_search` 查找头像和背景素材
  - [x] 替换占位图
- [ ] 验证与上线前检查
  - [x] 运行 `npm run lint` 并修复

## Notes
- 聊天逻辑：采用静态规则匹配，优先级“精确 > 模糊 > 默认”。
- 响应式设计：优先适配移动端 (375px+)。
- 颜色选择：樱花粉 #F9A8D4。
