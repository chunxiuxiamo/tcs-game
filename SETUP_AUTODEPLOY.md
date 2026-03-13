# 🔧 设置 Vercel 自动部署

## 什么是自动部署？

启用自动部署后，每次推送到 GitHub，Vercel 会自动重新部署项目，无需手动操作。

---

## 🚀 设置步骤（3 分钟）

### 步骤 1：访问 Vercel 项目设置

1. 访问：**https://vercel.com/chunxiuxiamos-projects/tcs-game/settings**
   - 或者从 Vercel Dashboard 进入项目 → Settings

### 步骤 2：配置 Git Integration

1. 在左侧菜单找到 **"Git Integration"**
2. 点击 **"Configure"** 或 **"Connect"**
3. 选择 **GitHub** 作为 Git 提供商
4. 选择仓库：**`chunxiuxiamo/tcs-game`**
5. 点击 **"Save"** 或 **"Connect"**

### 步骤 3：配置分支

1. 在 **"Production Branch"** 设置中选择：**`master`**
2. 点击 **"Save"**

### 步骤 4：验证设置

设置完成后，每次推送到 `master` 分支时：
- ✅ Vercel 会自动检测到新的 commit
- ✅ 自动触发新的部署
- ✅ 部署完成后更新生产环境

---

## 📋 验证自动部署

设置完成后，可以测试：

```bash
# 1. 做一个小修改
cd /root/ai-code/tcs-game
echo "test" >> test.md

# 2. 提交并推送
git add .
git commit -m "test: 验证自动部署"
git push origin master

# 3. 访问 Vercel Dashboard
# https://vercel.com/chunxiuxiamos-projects/tcs-game/deployments
# 应该能看到新的自动部署正在运行
```

---

## ⚠️ 注意事项

1. **自动部署频率**：
   - 如果推送太频繁（如 10 分钟内多次推送），Vercel 可能会排队部署
   - 建议：合并多个修改后再推送

2. **环境变量**：
   - 如果项目需要环境变量，记得在 Vercel 设置中配置
   - 环境变量不会自动从 Git 仓库读取

3. **部署失败**：
   - 如果部署失败，Vercel 会发送邮件通知
   - 可以在 Deployments 页面查看错误日志

---

## 🔍 查看部署历史

访问以下地址查看所有部署记录：

**部署历史页面**：
https://vercel.com/chunxiuxiamos-projects/tcs-game/deployments

你会看到：
- 每次部署的时间
- Git commit 信息
- 部署状态（成功/失败）
- 构建时间

---

## 🎯 自动部署的优势

- ✅ **无需手动操作**：推送代码后自动部署
- ✅ **快速上线**：通常 30-60 秒完成部署
- ✅ **版本追踪**：每次部署都关联到 Git commit
- ✅ **回滚方便**：可以快速回滚到之前的版本
- ✅ **团队协作**：多人协作时，每个人的推送都会触发部署

---

## 🆘 如果 Git Integration 已连接

如果已经连接了 GitHub，只需要：

1. 访问项目设置：https://vercel.com/chunxiuxiamos-projects/tcs-game/settings
2. 找到 **"Production Branch"**
3. 确认设置为：**`master`**
4. 点击 **"Save"**

---

## 📊 当前项目信息

- **项目名称**：tcs-game
- **生产环境**：https://tcs-game-ebon.vercel.app
- **GitHub 仓库**：https://github.com/chunxiuxiamo/tcs-game
- **生产分支**：需要设置为 `master`

---

## 🎮 设置完成后的效果

设置完成后，你可以：

```bash
# 1. 修改游戏
# 比如调整关卡难度
vim levels.json

# 2. 提交
git add .
git commit -m "feat: 调整关卡难度"

# 3. 推送
git push origin master

# 4. 1-2 分钟后访问
# https://tcs-game-ebon.vercel.app
# 新版本已经自动部署完成！
```

---

**现在可以按照步骤设置自动部署了！** 🚀
