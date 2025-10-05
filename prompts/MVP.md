標題
「MindGrow 專注樹 — 透過番茄鐘與呼吸遊戲，養成專注力與心理韌性」

工具描述
這是一個心理健身App，結合 ToDo 任務規劃 + 番茄鐘專注 + 呼吸放鬆。
使用者每天輸入1–3件待辦事，按下Start即啟動25分鐘專注計時，系統會記錄中斷次數並影響「專注小樹」的成長。專注結束後，App引導使用者進行4-7-8呼吸遊戲或5分鐘散步，建立專注與放鬆循環，同時累積數據，幫助估算任務所需時間，養成長期專注與韌性。

以下是完整的 **「Cloudflare Pages 單人版 MindGrow 專注樹 MVP」** 架構設計與檔案說明。
這版僅用 React + Vite + LocalStorage，可在 Cloudflare Pages 上直接部署。

---

## 🌳 專案結構（Frontend Only, Deployable to Cloudflare Pages）

```
mindgrow/
├── prompts/
│   ├── MVP.md
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── components/
│   │   ├── TodoList.jsx
│   │   ├── PomodoroTimer.jsx
│   │   └── TreeDisplay.jsx
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── styles/
│   │   └── App.css
│   └── utils/
│       └── timeUtils.js
└── public/
    ├── icons/ (小樹圖示或番茄鐘icon)
    └── sound/ding.mp3 (倒數60秒的時候, 放音樂提醒)
```

---

## 🧭 資料流說明（Data Flow）

```
[Todolist] → 點擊 Start → 
[PomodoroTimer] 開始倒數 →
完成後 → 通知 [TreeDisplay] 成長一格 →
更新 localStorage 狀態
```

### LocalStorage 結構

```json
{
  "tasks": [
    {
      "id": "t1",
      "title": "寫報告",
      "isDone": false,
      "pomodoroCount": 1
    },
    {
      "id": "t2",
      "title": "準備簡報",
      "isDone": true,
      "pomodoroCount": 2
    }
  ],
  "currentPomodoro": {
    "isRunning": false,
    "remainingTime": 1500,
    "currentTaskId": "t1",
    "stopCount": 3,
    "startTime": "2025-10-06T09:00:00Z"
  },
  "focusTree": {
    "level": 3,
    "growthScore": 12
  }
}
```

🔍 各部分說明：
1️⃣ tasks

儲存所有代辦事項。

id：唯一識別碼（UUID 或簡單 timestamp）。

title：任務名稱。

isDone：是否已完成。

pomodoroCount：該任務完成了幾次番茄鐘。

2️⃣ currentPomodoro

記錄番茄鐘目前的狀態。

isRunning：是否正在倒數。

remainingTime：剩餘秒數。

currentTaskId：是哪一個任務的番茄鐘。

startTime：開始的時間（可用於計算中斷或回復）。

✅ 作用

App 關閉或重整時，能從 localStorage 恢復番茄鐘的狀態。

例如：重新打開後，還知道「我剛剛在為任務 A 倒數 18 分鐘」。

3️⃣ focusTree

記錄小樹的成長進度。

level：階段（決定顯示哪個 emoji 🌱→🌿→🌳→🌲）

growthScore：累積專注分數（每完成一個番茄鐘加 1 分）

---

## 🧩 元件說明

### `TodoList.jsx`

* 顯示待辦清單
* 可新增 / 刪除任務
* 每個任務旁有 [Start] 按鈕 → 啟動 PomodoroTimer
* 完成後自動打勾

```jsx
function TodoList({ tasks, onAdd, onStart, onToggleComplete }) {
  // 渲染任務清單
}
```

---

### `PomodoroTimer.jsx`

* 預設 25 分鐘倒數（MVP 可手動調整）
* 支援開始 / 暫停 / 重設
* 倒數結束時：

  1. 呼叫 `onPomodoroComplete()`
  2. 更新樹的成長值

```jsx
function PomodoroTimer({ currentTask, onPomodoroComplete }) {
  // 使用 useEffect 處理倒數
}
```

---

### `TreeDisplay.jsx`

* 根據完成次數顯示不同階段的小樹
* MVP 可用 emoji 或 SVG 替代動畫
* 例：

  * 0~2 次：🌱
  * 3~5 次：🌿
  * 6~9 次：🌳
  * 10 次以上：🌲（滿樹）

```jsx
function TreeDisplay({ level }) {
  const stages = ['🌱', '🌿', '🌳', '🌲'];
  return <div>{stages[Math.min(level, stages.length - 1)]}</div>;
}
```

---

## 🪴 自訂 Hook — `useLocalStorage.js`

封裝 localStorage 讀寫邏輯

```js
import { useState, useEffect } from 'react';

export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const json = localStorage.getItem(key);
    return json ? JSON.parse(json) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

---

## 🚀 未來可延伸的升級路線

| 階段       | 升級內容             | 技術                                    |
| -------- | ---------------- | ------------------------------------- |
| v1 (MVP) | LocalStorage 單人版 | React + Cloudflare Pages              |
| v2       | 使用者登入 + 雲端同步     | Node.js / Express API + MongoDB Atlas |
| v3       | 多人挑戰/排行榜         | Socket.IO + 雲端資料同步                    |
| v4       | 成就系統 / 動畫樹成長     | Canvas / WebGL / Lottie               |

---
