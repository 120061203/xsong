---
title: "跨Agent協同溝通開發術，我的Agent會互相聊天"
description: "用 tmux-bridge-mcp 讓 Claude Code、Codex、Gemini CLI 等 AI Agent 透過 tmux pane 互傳訊息，打造真正的跨 Agent 協作環境"
pubDate: 2026-07-20T16:00:00+08:00
updatedDate: 2026-07-20T16:00:00+08:00
heroImage: "../../../../assets/images/2026/07/tmux-bridge-mcp-setup/tmux-bridge-mcp-setup-1.webp"
categories: ["技術分享"]
tags: ["MCP", "AI Agent", "tmux", "Claude Code", "DevOps"]
private: false
---

# 用 tmux-bridge-mcp 讓多個 AI Agent 在終端機互相溝通

## 前情提要

身為 DevOps，我常常需要同時跑多個 AI 工具：左邊 Claude Code 負責理解需求、右邊 Codex 負責寫 code。

但問題是兩邊各自為政，沒辦法互相溝通。

直到我發現了 [tmux-bridge-mcp](https://github.com/howardpen9/tmux-bridge-mcp)。

它是一個 MCP server，讓 Claude Code、Codex、Gemini CLI 等 AI agent 可以透過 tmux pane 互傳訊息，真正做到跨 agent 協作。

這篇筆記記錄整套環境的建立流程。

---

## 底層原理

tmux-bridge-mcp 的運作架構分三層：

```
AI Agent（Claude / Codex / Gemini）
        ↓  MCP protocol（JSON-RPC over stdio）
tmux-bridge-mcp server
        ↓  tmux CLI（send-keys / capture-pane）
tmux pane
```

### MCP 是什麼

MCP（Model Context Protocol）是 Anthropic 提出的開放標準，讓 AI agent 能透過 JSON-RPC 呼叫外部工具。tmux-bridge-mcp 把 tmux 的操作包裝成 MCP tool，讓 agent 可以直接「打字」到任意 pane。

### 訊息怎麼傳

1. Claude Code 呼叫 `tmux_keys` tool，帶著目標 pane ID 和要發送的文字
2. tmux-bridge-mcp server 收到後執行 `tmux send-keys -t <pane> "<message>" Enter`
3. 目標 pane（Codex / Gemini）接收到輸入，就像使用者親自打字一樣
4. 用 `tmux_read` tool 可以讀回對方 pane 的輸出內容

### 為什麼用 tmux 而不是 socket

tmux pane 天生就是 terminal session，不需要另外開 IPC channel。任何跑在 terminal 的 AI agent 都能直接接入，不限工具或語言。

---

## 需求

- macOS（或 Linux）
- tmux 3.2+
- Node.js 18+
- Claude Code 已安裝
- Codex 已安裝

---

## 安裝 tmux-bridge-mcp

### 一鍵自動安裝（推薦）

```bash
npx tmux-bridge-mcp setup
```

這個指令會自動偵測你安裝了哪些 AI agent，並寫入對應的 MCP 設定。

### 確認安裝成功

```bash
npx tmux-bridge-mcp --help
```

### 試跑 Demo

```bash
npx tmux-bridge-mcp demo
```

### 手動設定（選用）

如果自動安裝沒有涵蓋你的 agent，可以手動加到設定檔。

**Claude Code**（加到 `.mcp.json` 或全域設定）：

```json
{
  "mcpServers": {
    "tmux-bridge": {
      "command": "npx",
      "args": ["-y", "tmux-bridge-mcp"]
    }
  }
}
```

**Kimi CLI**：

```bash
kimi mcp add tmux-bridge -- npx tmux-bridge-mcp
```

**Gemini CLI**（編輯 `~/.gemini/settings.json`）、**OpenCode**（編輯 `~/.config/opencode/opencode.json`）格式相同，填入上面的 `command` / `args` 即可。

---

## 建立啟動腳本 start-ai.sh

有了 tmux-bridge-mcp 之後，我寫了一個腳本，一鍵開啟 tmux session，左右各啟動一個 AI agent。

```bash
#!/bin/zsh
DIR=${1:-$(pwd)}
SESSION=$(basename "$DIR")

# 如果 session 已存在就直接 attach
if tmux has-session -t $SESSION 2>/dev/null; then
  tmux attach -t $SESSION
  exit
fi

tmux new-session -s $SESSION -d -x 220 -y 50

# 左邊：claude
tmux send-keys -t $SESSION "cd $DIR && claude" Enter
tmux select-pane -t $SESSION:0.0 -T claude

# 右邊：codex
tmux split-window -h -t $SESSION
tmux send-keys -t $SESSION "cd $DIR && codex" Enter
tmux select-pane -t $SESSION:0.1 -T codex

tmux attach -t $SESSION
```

Session 名稱會自動用**目錄名稱**命名，例如在 `~/Documents/xsong` 啟動，session 就叫 `xsong`，開多個專案時不會互相衝突。

存成 `~/start-ai.sh`，加上執行權限：

```bash
chmod +x ~/start-ai.sh
```

### 使用方式

```bash
# 在目前目錄啟動
./start-ai.sh

# 指定專案目錄
./start-ai.sh ~/Documents/my-project
```

---

## 加上 alias 與管理指令（選用）

在 `~/.zshrc` 加入：

```bash
alias 2ai="~/start-ai.sh"

2ai-kill() {
  echo "目前所有 session："
  tmux ls 2>/dev/null || { echo "沒有任何 session"; return; }
  echo ""
  local name="${1:-}"
  if [ -z "$name" ]; then
    read "name?輸入要關閉的 session 名稱: "
    [ -z "$name" ] && echo "已取消" && return
  fi
  read "confirm?確定關閉 '$name'？(y/N): "
  [[ "$confirm" =~ ^[Yy]$ ]] && tmux kill-session -t "$name" && echo "已關閉 '$name'" || echo "已取消"
}
```

- `2ai`：在目前目錄啟動整套環境
- `2ai-kill`：互動式關閉指定 session，有列表預覽 + 確認步驟，避免誤刪

```bash
source ~/.zshrc

# 啟動
2ai

# 關閉（互動式選擇）
2ai-kill

# 直接指定名稱關閉
2ai-kill xsong
```

---

## 結果

執行後 tmux 會長這樣：

```
┌─────────────────────┬─────────────────────┐
│                     │                     │
│      claude         │       codex         │
│                     │                     │
└─────────────────────┴─────────────────────┘
```

兩個 agent 都跑在同一個專案目錄，透過 tmux-bridge-mcp 可以互傳訊息、分工協作。
