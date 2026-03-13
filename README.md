# 🐍 霓虹贪吃蛇

一个基于 HTML5 Canvas 的贪吃蛇游戏，包含 20 个关卡和完整的计分系统。难度平滑递增，打造极具成瘾性的游戏体验。

[![GitHub stars](https://img.shields.io/github/stars/chunxiuxiamo/tcs-game?style=social)](https://github.com/chunxiuxiamo/tcs-game)
[![GitHub forks](https://img.shields.io/github/forks/chunxiuxiamo/tcs-game?style=social)](https://github.com/chunxiuxiamo/tcs-game)
[![License](https://img.shields.io/github/license/chunxiuxiamo/tcs-game)](LICENSE)

## ✨ 游戏特色

- 🎮 **20 个关卡**：难度平滑递增，成瘾性设计
- 📊 **完整计分系统**：实时分数 + 最高分持久化（localStorage）
- 📱 **响应式设计**：桌面 + 移动端完美适配
- 🎯 **关卡配置**：JSON 数据驱动，易于扩展和调整
- 🕹️ **触控支持**：虚拟方向键，移动端友好
- 🚀 **流畅体验**：requestAnimationFrame 渲染，60 FPS

## 🎮 如何游玩

### 操作方式

- **键盘**：方向键（↑ ← ↓ →）或 WASD
- **触控**：点击屏幕上的方向按钮
- **暂停**：空格键或"暂停"按钮

### 游戏规则

1. 吃掉食物增加分数和长度
2. 每关有独立的升关目标
3. 撞墙、撞自己或障碍物游戏结束
4. 最高分自动保存到本地浏览器

## 🎯 关卡设计

游戏包含 20 个关卡，按难度分为 4 个阶段：

| 阶段 | 关卡 | 速度范围 | 障碍物 | 特点 |
|------|------|---------|--------|------|
| 🌱 新手引导期 | 1-5 关 | 180-160ms | 0-2 个 | 建立信心，培养习惯 |
| 🌿 技能提升期 | 6-10 关 | 155-135ms | 3-6 个 | 轻度挑战，进入心流 |
| 🌳 高手挑战期 | 11-15 关 | 130-110ms | 7-12 个 | 高强度，成就感爆棚 |
| 🌲 大师巅峰期 | 16-20 关 | 105-85ms | 13-18 个 | 终极挑战，通关荣耀 |

### 成瘾性设计

- **第 1-5 关**：慢速无障碍，让玩家轻松上手
- **第 6-10 关**：速度与障碍同步提升，培养路径规划能力
- **第 11-15 关**：高压节奏，考验反应速度和策略
- **第 16-20 关**：极限挑战，通关本身就是战绩

## 🚀 在线游玩

| 平台 | 链接 |
|------|------|
| 🌐 Vercel | [tcs-game-ebon.vercel.app](https://tcs-game-ebon.vercel.app) |

## 🛠️ 本地运行

### 方法 1：直接打开（推荐）

```bash
# 克隆仓库
git clone https://github.com/chunxiuxiamo/tcs-game.git
cd tcs-game

# 用浏览器打开 index.html
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows
```

### 方法 2：HTTP 服务器

```bash
# Python 3
python3 -m http.server 8000

# Node.js (http-server)
npx http-server -p 8000

# 然后在浏览器访问：http://localhost:8000
```

## 📁 项目结构

```
tcs-game/
├── index.html      # 游戏主页面
├── styles.css      # 游戏样式
├── game.js         # 游戏逻辑（14 KB）
├── levels.json     # 关卡配置（20 关）
└── README.md      # 项目说明
```

## 🔧 技术栈

- **前端框架**：纯原生 JavaScript（无依赖）
- **渲染引擎**：HTML5 Canvas
- **状态管理**：JavaScript 对象 + localStorage
- **响应式布局**：CSS Grid + Flexbox

## 🎨 自定义关卡

编辑 `levels.json` 文件即可自定义关卡：

```json
{
  "levels": [
    {
      "speed": 180,           // 蛇的移动速度（毫秒）
      "obstacles": 0,         // 障碍物数量
      "foodsPerLevel": 4,      // 升关所需食物数
      "description": "关卡描述"
    }
  ]
}
```

## 📄 License

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

---

**🎮 立即开始游玩：[tcs-game-ebon.vercel.app](https://tcs-game-ebon.vercel.app)**
