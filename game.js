const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("high-score");
const levelElement = document.getElementById("level");
const statusTextElement = document.getElementById("status-text");
const levelDescriptionElement = document.getElementById("level-description");

const overlayElement = document.getElementById("overlay");
const overlayTitleElement = document.getElementById("overlay-title");
const overlayMessageElement = document.getElementById("overlay-message");

const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const restartButton = document.getElementById("restart-button");
const touchButtons = document.querySelectorAll(".touch-button");

const GRID_SIZE = 20;
const TILE_COUNT = canvas.width / GRID_SIZE;
const HIGH_SCORE_KEY = "neon-snake-high-score";
const LEVELS_CONFIG_PATH = "./levels.json";

const directionVectors = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

let snake = [];
let currentDirection = "right";
let nextDirection = "right";
let food = null;
let obstacles = [];

let score = 0;
let highScore = Number(localStorage.getItem(HIGH_SCORE_KEY) || 0);
let foodsCollectedInLevel = 0;
let levelIndex = 0;
let levels = [];
let isConfigReady = false;

let isStarted = false;
let isPaused = false;
let isGameOver = false;

let lastFrameTime = 0;
let accumulatedTime = 0;

async function initialize() {
  showOverlay("加载关卡", "正在读取关卡配置...");
  syncControlState();

  try {
    levels = await loadLevels();
    isConfigReady = true;
  } catch (error) {
    console.error("Failed to load levels:", error);
    statusTextElement.textContent = "配置加载失败";
    showOverlay(
      "关卡加载失败",
      "无法读取 levels.json。请通过本地服务器打开游戏后重试。"
    );
    syncControlState();
    return;
  }

  highScoreElement.textContent = highScore;
  resetGameState();
  drawScene();
  requestAnimationFrame(gameLoop);
}

function resetGameState() {
  snake = [
    { x: 7, y: 15 },
    { x: 6, y: 15 },
    { x: 5, y: 15 },
  ];

  currentDirection = "right";
  nextDirection = "right";
  score = 0;
  foodsCollectedInLevel = 0;
  levelIndex = 0;
  obstacles = [];
  food = null;
  isStarted = false;
  isPaused = false;
  isGameOver = false;
  accumulatedTime = 0;

  buildObstaclesForLevel();
  placeFood();
  showOverlay("准备开始", getLevelOverlayMessage());
  pauseButton.textContent = "暂停";
  updateHUD();
  syncControlState();
}

function startGame() {
  if (!isConfigReady || (isStarted && !isGameOver)) {
    return;
  }

  if (isGameOver || !isStarted) {
    resetGameState();
  }

  isStarted = true;
  isPaused = false;
  isGameOver = false;
  hideOverlay();
  statusTextElement.textContent = "进行中";
  pauseButton.textContent = "暂停";
  syncControlState();
}

function restartGame() {
  if (!isConfigReady) {
    return;
  }

  resetGameState();
  isStarted = true;
  hideOverlay();
  statusTextElement.textContent = "进行中";
  syncControlState();
}

function togglePause() {
  if (!isStarted || isGameOver) {
    return;
  }

  isPaused = !isPaused;
  pauseButton.textContent = isPaused ? "继续" : "暂停";

  if (isPaused) {
    statusTextElement.textContent = "已暂停";
    showOverlay("游戏暂停", "再次点击继续，或按空格键恢复游戏。");
  } else {
    statusTextElement.textContent = "进行中";
    hideOverlay();
  }

  syncControlState();
}

function gameLoop(timestamp) {
  if (!lastFrameTime) {
    lastFrameTime = timestamp;
  }

  const deltaTime = timestamp - lastFrameTime;
  lastFrameTime = timestamp;

  if (isStarted && !isPaused && !isGameOver) {
    accumulatedTime += deltaTime;

    while (accumulatedTime >= getCurrentLevel().speed) {
      stepGame();
      accumulatedTime -= getCurrentLevel().speed;
    }
  }

  drawScene();
  requestAnimationFrame(gameLoop);
}

function stepGame() {
  currentDirection = nextDirection;
  const movement = directionVectors[currentDirection];
  const head = snake[0];
  const newHead = {
    x: head.x + movement.x,
    y: head.y + movement.y,
  };

  if (hasWallCollision(newHead) || hasSnakeCollision(newHead) || hasObstacleCollision(newHead)) {
    endGame();
    return;
  }

  snake.unshift(newHead);

  if (newHead.x === food.x && newHead.y === food.y) {
    handleFoodCollected();
  } else {
    snake.pop();
  }
}

function handleFoodCollected() {
  foodsCollectedInLevel += 1;
  score += 10;
  updateHighScore();

  if (foodsCollectedInLevel >= getCurrentLevel().foodsPerLevel && levelIndex < levels.length - 1) {
    levelIndex += 1;
    foodsCollectedInLevel = 0;
    buildObstaclesForLevel();
    statusTextElement.textContent = `升级到第 ${levelIndex + 1} 关`;
    showOverlay(`第 ${levelIndex + 1} 关`, getLevelOverlayMessage(), true);
    window.setTimeout(() => {
      if (!isPaused && !isGameOver) {
        hideOverlay();
        statusTextElement.textContent = "进行中";
      }
    }, 1200);
  } else if (levelIndex === levels.length - 1) {
    statusTextElement.textContent =
      foodsCollectedInLevel >= getCurrentLevel().foodsPerLevel ? "终局征服" : "最终冲刺";
  }

  placeFood();
  updateHUD();
}

function endGame() {
  isGameOver = true;
  isStarted = false;
  statusTextElement.textContent = "游戏结束";
  updateHighScore();
  showOverlay("游戏结束", `最终得分：${score} 分。点击“重新开始”再试一次。`);
  syncControlState();
}

function updateHUD() {
  const currentLevel = getCurrentLevel();

  if (!currentLevel) {
    scoreElement.textContent = score;
    highScoreElement.textContent = highScore;
    levelElement.textContent = "-";
    levelDescriptionElement.textContent = "关卡配置加载中。";
    return;
  }

  scoreElement.textContent = score;
  highScoreElement.textContent = highScore;
  levelElement.textContent = levelIndex + 1;
  levelDescriptionElement.textContent = getLevelSummary();

  if (!isGameOver && !isPaused && !isStarted) {
    statusTextElement.textContent = "等待开始";
  }
}

function updateHighScore() {
  if (score <= highScore) {
    return;
  }

  highScore = score;
  localStorage.setItem(HIGH_SCORE_KEY, String(highScore));
  highScoreElement.textContent = highScore;
}

function placeFood() {
  food = getFreeCell();
}

function buildObstaclesForLevel() {
  obstacles = [];
  const targetCount = getCurrentLevel().obstacles;

  for (let index = 0; index < targetCount; index += 1) {
    obstacles.push(getFreeCell([...obstacles]));
  }
}

function getFreeCell(extraBlocked = []) {
  const blocked = new Set([
    ...snake.map((segment) => `${segment.x},${segment.y}`),
    ...extraBlocked.map((item) => `${item.x},${item.y}`),
    ...(food ? [`${food.x},${food.y}`] : []),
  ]);

  const availableCells = [];

  for (let y = 0; y < TILE_COUNT; y += 1) {
    for (let x = 0; x < TILE_COUNT; x += 1) {
      if (!blocked.has(`${x},${y}`)) {
        availableCells.push({ x, y });
      }
    }
  }

  return availableCells[Math.floor(Math.random() * availableCells.length)];
}

function hasWallCollision(position) {
  return (
    position.x < 0 ||
    position.y < 0 ||
    position.x >= TILE_COUNT ||
    position.y >= TILE_COUNT
  );
}

function hasSnakeCollision(position) {
  return snake.some((segment) => segment.x === position.x && segment.y === position.y);
}

function hasObstacleCollision(position) {
  return obstacles.some((obstacle) => obstacle.x === position.x && obstacle.y === position.y);
}

function getCurrentLevel() {
  return levels[levelIndex];
}

async function loadLevels() {
  const response = await fetch(LEVELS_CONFIG_PATH, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Failed to fetch levels: ${response.status}`);
  }

  const payload = await response.json();
  return validateLevels(payload.levels);
}

function validateLevels(rawLevels) {
  if (!Array.isArray(rawLevels) || rawLevels.length < 20) {
    throw new Error("levels.json must contain at least 20 levels.");
  }

  return rawLevels.map((level, index) => {
    const speed = Number(level.speed);
    const obstaclesCount = Number(level.obstacles);
    const foodsPerLevel = Number(level.foodsPerLevel);
    const description = String(level.description || "").trim();

    if (
      !Number.isFinite(speed) ||
      !Number.isFinite(obstaclesCount) ||
      !Number.isFinite(foodsPerLevel) ||
      speed <= 0 ||
      obstaclesCount < 0 ||
      foodsPerLevel <= 0 ||
      description.length === 0
    ) {
      throw new Error(`Invalid level config at index ${index}.`);
    }

    if (index > 0) {
      const previousLevel = rawLevels[index - 1];

      if (speed > Number(previousLevel.speed)) {
        throw new Error(`Level ${index + 1} speed must not be slower than the previous level.`);
      }

      if (obstaclesCount < Number(previousLevel.obstacles)) {
        throw new Error(`Level ${index + 1} obstacles must not decrease.`);
      }
    }

    return {
      speed,
      obstacles: obstaclesCount,
      foodsPerLevel,
      description,
    };
  });
}

function getLevelSummary() {
  const currentLevel = getCurrentLevel();

  if (!currentLevel) {
    return "关卡配置加载中。";
  }

  const goalLabel =
    levelIndex === levels.length - 1
      ? `终局目标：连续吃到 ${currentLevel.foodsPerLevel} 个食物`
      : `本关目标：吃到 ${currentLevel.foodsPerLevel} 个食物后升关`;

  return `第 ${levelIndex + 1} 关：${currentLevel.description}${goalLabel ? ` ${goalLabel}。` : ""}`;
}

function getLevelOverlayMessage() {
  const currentLevel = getCurrentLevel();

  if (!currentLevel) {
    return "关卡配置加载中。";
  }

  const progressLabel =
    levelIndex === levels.length - 1
      ? `撑住 ${currentLevel.foodsPerLevel} 个食物，拿下终局荣耀。`
      : `本关吃掉 ${currentLevel.foodsPerLevel} 个食物即可进入下一关。`;

  return `${currentLevel.description}${progressLabel ? ` ${progressLabel}` : ""}`;
}

function showOverlay(title, message, autoHide = false) {
  overlayTitleElement.textContent = title;
  overlayMessageElement.textContent = message;
  overlayElement.classList.remove("hidden");

  if (!autoHide) {
    return;
  }

  window.setTimeout(() => {
    if (!isPaused && !isGameOver) {
      overlayElement.classList.add("hidden");
    }
  }, 1200);
}

function hideOverlay() {
  overlayElement.classList.add("hidden");
}

function syncControlState() {
  if (!isConfigReady) {
    startButton.disabled = true;
    pauseButton.disabled = true;
    restartButton.disabled = true;
    return;
  }

  restartButton.disabled = false;
  pauseButton.disabled = !isStarted || isGameOver;
  startButton.disabled = isStarted && !isGameOver;
}

function changeDirection(direction) {
  if (!isStarted || isPaused || isGameOver) {
    return;
  }

  const oppositeDirections = {
    up: "down",
    down: "up",
    left: "right",
    right: "left",
  };

  if (direction === oppositeDirections[currentDirection]) {
    return;
  }

  nextDirection = direction;
}

function drawScene() {
  drawBackground();
  drawGrid();
  drawObstacles();
  drawFood();
  drawSnake();
}

function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#08111b");
  gradient.addColorStop(1, "#04080d");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawGrid() {
  ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
  ctx.lineWidth = 1;

  for (let index = 0; index <= TILE_COUNT; index += 1) {
    const offset = index * GRID_SIZE;
    ctx.beginPath();
    ctx.moveTo(offset, 0);
    ctx.lineTo(offset, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, offset);
    ctx.lineTo(canvas.width, offset);
    ctx.stroke();
  }
}

function drawSnake() {
  snake.forEach((segment, index) => {
    const x = segment.x * GRID_SIZE;
    const y = segment.y * GRID_SIZE;
    const isHead = index === 0;

    ctx.fillStyle = isHead ? "#7cf2d7" : "#18c29c";
    ctx.beginPath();
    ctx.roundRect(x + 1, y + 1, GRID_SIZE - 2, GRID_SIZE - 2, 6);
    ctx.fill();

    if (isHead) {
      ctx.fillStyle = "#042420";
      const eyeOffsetY = currentDirection === "up" || currentDirection === "down" ? 5 : 6;
      const eyeLeftX = currentDirection === "left" ? x + 5 : x + 7;
      const eyeRightX = currentDirection === "right" ? x + 13 : x + 11;
      const eyeY = currentDirection === "up" ? y + 5 : y + eyeOffsetY;

      ctx.beginPath();
      ctx.arc(eyeLeftX, eyeY, 1.8, 0, Math.PI * 2);
      ctx.arc(eyeRightX, eyeY, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

function drawFood() {
  const centerX = food.x * GRID_SIZE + GRID_SIZE / 2;
  const centerY = food.y * GRID_SIZE + GRID_SIZE / 2;

  ctx.fillStyle = "#ff7d66";
  ctx.beginPath();
  ctx.arc(centerX, centerY, GRID_SIZE / 2.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffd36a";
  ctx.beginPath();
  ctx.arc(centerX + 2, centerY - 2, GRID_SIZE / 8, 0, Math.PI * 2);
  ctx.fill();
}

function drawObstacles() {
  ctx.fillStyle = "#5f7082";

  obstacles.forEach((obstacle) => {
    const x = obstacle.x * GRID_SIZE;
    const y = obstacle.y * GRID_SIZE;
    ctx.beginPath();
    ctx.roundRect(x + 2, y + 2, GRID_SIZE - 4, GRID_SIZE - 4, 4);
    ctx.fill();
  });
}

document.addEventListener("keydown", (event) => {
  const directionMap = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
  };

  if (event.code === "Space") {
    event.preventDefault();
    togglePause();
    return;
  }

  const direction = directionMap[event.key];

  if (direction) {
    event.preventDefault();
    changeDirection(direction);
  }
});

touchButtons.forEach((button) => {
  button.addEventListener("click", () => {
    changeDirection(button.dataset.direction);
  });
});

startButton.addEventListener("click", startGame);
pauseButton.addEventListener("click", togglePause);
restartButton.addEventListener("click", restartGame);

initialize();
