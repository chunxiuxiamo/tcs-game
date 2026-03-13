# 推送到 GitHub 的步骤

## 方法 1：使用 GitHub Personal Access Token（推荐）

### 1. 创建 GitHub Token

1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. Token 名称：`tcs-game-deploy`
4. 勾选权限：
   - ✅ `repo`（完整仓库访问权限）
   - ✅ `workflow`（可选，如果需要 GitHub Actions）
5. 点击 "Generate token"
6. **复制生成的 token**（只会显示一次）

### 2. 推送到 GitHub

在终端运行以下命令（替换 `YOUR_TOKEN`）：

```bash
cd /root/ai-code/tcs-game

# 设置远程仓库
git remote add origin https://chunxiuxiamo:YOUR_TOKEN@github.com/chunxiuxiamo/tcs-game.git

# 推送代码
git push -u origin master
```

或者设置环境变量：

```bash
export GH_TOKEN="YOUR_TOKEN"

# 使用 gh CLI 创建仓库
gh repo create chunxiuxiamo/tcs-game --public --source=. --remote=origin --push
```

---

## 方法 2：使用 SSH 密钥（更安全）

### 1. 生成 SSH 密钥

```bash
ssh-keygen -t ed25519 -C "chunxiuxiamo" -f ~/.ssh/tcs-game
```

### 2. 添加公钥到 GitHub

1. 复制公钥：
```bash
cat ~/.ssh/tcs-game.pub
```

2. 访问：https://github.com/settings/ssh/new
3. 粘贴公钥内容
4. 点击 "Add SSH key"

### 3. 配置 git 使用 SSH

```bash
cd /root/ai-code/tcs-game
git remote add origin git@github.com:chunxiuxiamo/tcs-game.git
git push -u origin master
```

---

## 项目信息

- **仓库名称**：`tcs-game`（贪吃蛇游戏）
- **所有者**：`chunxiuxiamo`
- **可见性**：公开（public）
- **分支**：master

---

## 文件说明

- `index.html` - 游戏主页面
- `styles.css` - 游戏样式
- `game.js` - 游戏逻辑
- `levels.json` - 关卡配置（20关）
- `.gitignore` - Git 忽略文件

---

## GitHub Pages 部署（可选）

创建仓库后，可以启用 GitHub Pages 来托管游戏：

1. 进入仓库设置：Settings → Pages
2. Source 选择：`Deploy from a branch`
3. Branch 选择：`master` / `(root)`
4. 点击 Save

游戏将在以下地址可访问：
- `https://chunxiuxiamo.github.io/tcs-game/`
