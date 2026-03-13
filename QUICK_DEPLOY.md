# 🚀 快速部署到 Vercel

## 步骤 1：导入项目（3 分钟）

1. 访问：**https://vercel.com/new**
2. 点击 "Import Git Repository"
3. 选择仓库：**`chunxiuxiamo/tcs-game`**
4. 点击 "Import"

## 步骤 2：配置项目（1 分钟）

在配置页面：

| 配置项 | 设置 |
|--------|------|
| Project Name | `tcs-game` |
| Framework Preset | `Other`（自动检测） |
| Build Command | （留空，静态项目） |
| Output Directory | `.`（根目录） |

## 步骤 3：部署（2 分钟）

点击 "Deploy" 按钮，等待 1-2 分钟完成。

## 步骤 4：访问游戏

部署成功后，访问：
- **主域名**：`https://tcs-game.vercel.app`

---

## 自动部署设置（可选）

以后每次推送到 GitHub，Vercel 会自动重新部署：

1. 进入项目设置
2. Git Integration → 选择分支：`master`
3. 保存

---

## 问题排查

### 问题 1：导入时找不到仓库

- 确认 GitHub 仓库是公开的
- 或者在 Vercel 中授权访问私有仓库

### 问题 2：部署后访问 404

- 检查 Output Directory 设置是否正确
- 确认 `index.html` 在根目录

### 问题 3：游戏无法运行

- 检查浏览器控制台是否有错误
- 确认 `levels.json` 文件存在（CORS 问题）

---

## 备用方案：GitHub Pages

如果 Vercel 部署有问题，可以使用 GitHub Pages：

1. 访问：https://github.com/chunxiuxiamo/tcs-game/settings/pages
2. Source 选择：`Deploy from a branch`
3. Branch 选择：`master` / `(root)`
4. 点击 Save

部署地址：`https://chunxiuxiamo.github.io/tcs-game/`
