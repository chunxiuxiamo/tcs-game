# 部署到 Vercel 的步骤

## 方法 1：使用 Vercel CLI（推荐）

### 步骤 1：安装 Vercel CLI（已完成）

```bash
npm install -g vercel
```

### 步骤 2：登录 Vercel

需要使用 Vercel Token 进行认证：

1. 访问：https://vercel.com/account/tokens
2. 点击 "Create Token"
3. Token 名称：`tcs-game-deploy`
4. 权限：`Full Account`（或选择特定权限）
5. 点击 "Create"
6. **复制生成的 token**

### 步骤 3：部署项目

运行以下命令（替换 `YOUR_TOKEN`）：

```bash
cd /root/ai-code/tcs-game

# 使用 token 登录
export VERCEL_TOKEN="YOUR_TOKEN"

# 部署项目
vercel --yes --token=$VERCEL_TOKEN
```

或者非交互式部署：

```bash
vercel --yes \
  --token=$VERCEL_TOKEN \
  --prod \
  --name=tcs-game
```

---

## 方法 2：通过 Vercel 网站（最简单）

### 步骤 1：导入项目

1. 访问：https://vercel.com/new
2. 点击 "Import Git Repository"
3. 选择：`chunxiuxiamo/tcs-game`
4. 点击 "Import"

### 步骤 2：配置项目

- **Project Name**：`tcs-game`
- **Framework Preset**：`Other`（或自动检测）
- **Build Command**：（留空，静态项目）
- **Output Directory**：`.`

### 步骤 3：部署

点击 "Deploy" 按钮，等待部署完成。

---

## 方法 3：使用 GitHub 自动部署（推荐用于生产环境）

### 步骤 1：在 Vercel 连接 GitHub

1. 访问：https://vercel.com/account/integrations
2. 点击 "GitHub" → "Install"
3. 选择仓库权限 → "Install"

### 步骤 2：创建项目

1. 访问：https://vercel.com/new
2. 选择 `chunxiuxiamo/tcs-game`
3. 配置项目（参考方法 2）
4. 点击 "Deploy"

### 步骤 3：自动部署

之后每次推送到 GitHub，Vercel 会自动重新部署。

---

## 部署完成后的地址

项目将部署在：
- **主域名**：`https://tcs-game.vercel.app`
- **自定义域名**：可配置自己的域名

---

## 验证部署

访问 https://tcs-game.vercel.app 确认游戏正常运行。

---

## 预览部署

在部署到生产环境之前，可以先预览：

```bash
vercel --token=$VERCEL_TOKEN
```

这会生成一个预览 URL，可以分享给他人测试。
