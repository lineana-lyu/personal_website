# 吕灵慧｜AI 产品经理作品集

基于 React、Vite 与 TypeScript 的单页个人简历网站。页面聚焦教育 AI、RAG 知识库、Agent 工作流与产品到技术的落地过程。

## 本地运行

Windows PowerShell 可直接运行（无需全局安装 pnpm）：

```powershell
.\dev.cmd
```

也可以使用当前电脑已有的 npm：

```powershell
npm run dev
```

如果已经安装 pnpm：

```bash
pnpm install
pnpm dev
```

生产构建：

```bash
pnpm build
pnpm preview
```

Windows 下也可使用 `.\build.cmd` 完成生产构建。

## 内容维护

- 个人、项目、能力和联系方式：`src/data/portfolio.ts`
- 页面结构与区块：`src/App.tsx`
- 项目流程图与架构图：`src/components/ProjectVisuals.tsx`
- 视觉与响应式样式：`src/styles.css`
- 首页视频：`public/media/111.mp4`
- 首页静态图：`public/media/hero-poster.jpg`
- 下载简历：`public/documents/resume.pdf`

项目图形均为基于真实项目内容绘制的产品设计示意，并非线上产品截图。后续可在各案例组件中替换或补充真实原型、PRD 与截图。
