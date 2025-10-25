# Cloudflare Pages Next.js 项目

这是一个使用 Next.js 构建的 Cloudflare Pages 项目，配置了 TypeScript、Tailwind CSS 和 ESLint。

## 🚀 项目特性

- ⚡ Next.js 16.0.0 with App Router
- 🎨 Tailwind CSS 4.0 for styling
- 📝 TypeScript for type safety
- 🔧 ESLint for code quality
- 🌐 静态导出优化用于 Cloudflare Pages
- 🔒 安全头部配置

## 📁 项目结构

```
appnextjs/
├── src/
│   └── app/
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── public/
├── _headers          # Cloudflare Pages 安全头部
├── _redirects        # 客户端路由重定向
├── wrangler.toml     # Cloudflare Workers 配置
├── next.config.js    # Next.js 配置
└── package.json
```

## 🛠️ 本地开发

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 打开 [http://localhost:3000](http://localhost:3000) 查看应用

## 🚀 部署到 Cloudflare Pages

### 方法一：通过 Cloudflare Dashboard

1. 将代码推送到 GitHub/GitLab 仓库
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. 进入 Pages 部分
4. 点击 "Create a project"
5. 连接你的 Git 仓库
6. 配置构建设置：
   - **Framework preset**: Next.js (Static HTML Export)
   - **Build command**: `npm run pages:build`
   - **Build output directory**: `out`
   - **Root directory**: `/` (或 `appnextjs` 如果从子目录部署)

### 方法二：使用 Wrangler CLI

1. 安装 Wrangler：
```bash
npm install -g wrangler
```

2. 登录 Cloudflare：
```bash
wrangler login
```

3. 构建项目：
```bash
npm run pages:build
```

4. 部署到 Pages：
```bash
wrangler pages deploy out
```

## ⚙️ 配置说明

### next.config.js
- `output: 'export'`: 启用静态导出
- `trailingSlash: true`: 添加尾部斜杠
- `images.unoptimized: true`: 禁用图片优化（静态导出需要）

### _headers
配置安全头部，包括：
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

### _redirects
处理客户端路由，确保所有路由都指向 index.html

## 📦 可用脚本

- `npm run dev`: 启动开发服务器
- `npm run build`: 构建生产版本
- `npm run pages:build`: 为 Cloudflare Pages 构建
- `npm run start`: 启动生产服务器
- `npm run lint`: 运行 ESLint

## 🔧 自定义配置

### 环境变量
在项目根目录创建 `.env.local` 文件：
```env
NEXT_PUBLIC_API_URL=https://your-api.com
```

### 域名配置
在 `wrangler.toml` 中更新你的域名：
```toml
[[env.production.routes]]
pattern = "your-domain.com/*"
zone_name = "your-domain.com"
```

## 📚 更多资源

- [Next.js 文档](https://nextjs.org/docs)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License