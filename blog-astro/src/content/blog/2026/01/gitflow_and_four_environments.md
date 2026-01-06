---
title: "Git flow 與軟體開發的四個環境階段：從開發到上線的完整流程"
description: "理解 Git flow 分支策略與 Development、Testing、Staging、Production 四個環境的對應關係"
pubDate: 2026-01-06T16:00:00+08:00
updatedDate: 2026-01-06T16:00:00+08:00
heroImage: "../../../../assets/images/2026/01/gitflow_and_four_environments/gitflow_and_four_environments-1.webp"
categories: ["技術分享"]
tags: ["Git","GitFlow","DevOps","軟體開發"]
private: false
---

## 前言

在 SaaS 服務盛行的時代，系統更新頻率越來越高，  
**如何讓功能能穩定、可預期地上線，成為軟體開發中非常重要的一環**。

要建立一套完整的 CI/CD 與版本控管流程，首先需要理解兩個核心概念：
- **Git flow** 的分支開發模式
- **軟體開發常見的四個環境階段**

這篇文章將深入介紹這兩個概念，以及它們如何相互對應，  
為後續的 CI/CD 實作打下穩固的理論基礎。

> **系列文章**  
> 本文為系列文章的第一篇，著重於理論基礎。  
> 下一篇將介紹如何將這些概念應用到實際的 CI/CD 部署流程中。

---

## Git flow 簡介

Git flow 是一種常見的 Git 分支管理策略，  
目的是讓功能開發、版本釋出與修補錯誤能夠有明確的流程與界線。

常見的分支角色包含：

| 分支類型 | 用途 | 對應環境 |
|---------|------|---------|
| `main` / `master` | 正式環境程式碼 | Production |
| `develop` | 日常整合開發分支 | Development / Testing |
| `feature/*` | 功能開發分支 | Development |
| `release/*` | 準備釋出版本 | Staging |
| `hotfix/*` | 緊急修補正式環境問題 | Production |

透過 Git flow，可以確保：

> **核心優勢**
> - 新功能不會直接影響正式環境
> - 每一次釋出都有清楚的版本來源
> - 能與部署流程（**CI/CD**）自然整合


如果你對 **Git 基礎入門**有興趣，歡迎看看我的 [Youtbe 教學 - Git程式碼時光機 - 新手入門](https://www.youtube.com/watch?v=s3LWK39HWHM)


---

## 軟體開發的四個階段（Environments）

在實務上，軟體從開發到正式上線，通常會經過以下四個階段：

1. **Development** - 開發環境
2. **Testing** - 測試環境
3. **Staging** - 預備環境
4. **Production** - 正式環境

> **重要概念**  
> 這些名詞也是工程師在日常溝通中最常提到的術語，  
> 每個階段都有不同的目的、參與角色與衡量指標。

## 第一階段： 開發環境 - Development

### 定義
Development 是實際撰寫程式碼的階段，  
團隊會在此階段建立開發環境，根據需求開始實作功能。

這個階段通常：
- 功能變動頻繁
- Bug 最多
- 穩定性最低（也是工程師最忙的時期）

### 執行項目
- 定義客戶與產品需求
- 系統設計（架構、語言、框架規劃）
- 功能開發與程式撰寫
- 單元測試（Unit Test）

### 量化指標

- 功能完成進度（例如：每週完成 `3` 個功能模組）

### 工作分配
- 開發人員：功能開發與單元測試
- UI/UX 設計師：設計稿與互動設計
- 產品經理：需求分析與規劃

---

## 第二階段：測試環境 - Testing

### 定義
Testing 階段由測試人員主導，  
針對已完成的功能進行各類測試，並協助找出潛在問題。

### 執行項目
- 功能測試（Functional Testing）
- 回歸測試（Regression Testing）
- 效能測試（Performance Testing）
- 安全性測試（Security Testing）
- 紀錄 log 與錯誤回報

### 量化指標

- 測試案例數（例如：每週執行 `50` 個測試案例）
- Bug 修復率（例如：發現 `20` 個，修復 `15` 個）

### 工作分配
- 測試工程師：設計並執行測試
- 自動化測試工程師：撰寫自動化測試
- 開發人員：修復測試中發現的問題

---

## 第三階段：預備環境 - Staging

### 定義
Staging 是一個**高度模擬 Production 的環境**，  
目的是在正式上線前，進行最後的整合與驗證。

在這個階段，系統的部署方式、設定與 Production 幾乎一致。

### 執行項目
- 最終整合測試
- 使用者驗收測試（User Acceptance Testing, UAT）
- 部署流程與資料遷移測試
- 負載與壓力測試

### 量化指標

- UAT 通過率（例如 `90%` 測試案例通過）
- 部署成功率（例如 `95%` 無錯誤完成部署）

### 工作分配
- 測試工程師：最終測試
- 產品經理：協調使用者驗收
- 開發人員：修復驗收中發現的問題

---

## 第四階段：正式環境 - Production

### 定義
Production 是系統正式提供給使用者使用的環境，  
任何變更都會直接影響真實用戶。

### 常見部署方式
- 直接以新版本取代舊版本
- 建立新伺服器，逐步切換流量（如 Blue-Green / Canary）

### 執行項目
- 正式部署
- 系統監控與維運
- 問題回報與快速修復

### 量化指標

- 系統可用率（例如 `99.9%` uptime）
- 使用者滿意度

### 工作分配
- 維運工程師：部署與監控
- 開發人員：持續優化與問題修復

---

## 將軟體開發四個階段對應到 Git flow

在理解軟體開發的四個環境後，下一個關鍵問題是：  
**這些環境在 Git flow 中，分別對應到哪些分支？**

透過明確地將「環境」與「分支」一一對應，不僅能讓團隊在開發與部署時有共同語言，也能讓 CI/CD 流程自動化得更自然、可控。

---

### Development（開發環境） ↔ `feature/*`、`develop`

開發環境主要用來實作新功能與日常開發，因此在 Git flow 中，通常會對應到：

- `feature/*`：  
  每一個新功能或需求，都會從 `develop` 分支開出獨立的 feature branch 進行開發。
- `develop`：  
  作為功能整合分支，當 feature 開發完成並通過基本測試後，會合併回 `develop`。

**特性**
- 功能變動頻繁
- 不追求穩定性
- 以開發效率為優先

---

### Testing（測試環境） ↔ `develop`

Testing 環境通常會部署 `develop` 分支的最新狀態，  
用來進行功能測試、回歸測試與自動化測試。

此時的重點在於：
- 驗證多個 feature 整合後是否正常運作
- 提早發現功能衝突或邏輯錯誤

**特性**
- 持續更新
- 用於驗證整合後的功能品質
- 尚未具備正式釋出的穩定度

---

### Staging（預備環境） ↔ `release/*`

當功能開發完成，準備進入正式釋出流程時，  
會從 `develop` 分支切出 `release/*` 分支，並對應到 Staging（預備環境）。

在這個階段：
- 功能原則上已經凍結（Feature Freeze）
- 僅允許修正 Bug、調整設定或文件
- 進行 UAT、部署驗證與最終測試

**特性**
- 高度模擬正式環境
- 每個 `release/*` 分支對應一個可追蹤的版本
- 適合作為 Production 部署的版本來源

> **關鍵原則**  
> 這也是**正式環境前的最後一道防線**。

---

### Production（正式環境） ↔ `main` / `master`

當 `release/*` 分支在 Staging 環境通過所有驗證後，  
便會合併至 `main`（或 `master`）分支，並部署至 Production（正式環境）。

**特性**
- 穩定性優先
- 所有變更都可被回溯
- 與實際使用者直接相關

> **重要提醒**  
> 通常在這個時候：
> - 會為該次釋出建立 Git tag（例如 `v1.2.0`）
> - 該 tag 也可作為 Docker image 的版本標記
> - 對外正式提供服務

---

### Hotfix 的特殊情境

當正式環境發生緊急問題時，  
Git flow 會使用 `hotfix/*` 分支直接從 `main` 切出修復。

修復完成後：

```bash
# Hotfix 修復流程
git checkout main
git checkout -b hotfix/critical-bug
# ... 修復問題 ...
git checkout main
git merge hotfix/critical-bug
git checkout develop
git merge hotfix/critical-bug
```

- 合併回 `main`
- 同步回 `develop`
- 視情況重新部署 Staging 與 Production

> **設計優勢**  
> 這樣可以在**不破壞既有流程**的前提下，快速修正正式環境問題。

---

### 環境與分支對應總覽

| 環境 | 中文名稱 | Git flow 分支 |
|----|--------|---------------|
| Development | 開發環境 | `feature/*`、`develop` |
| Testing | 測試環境 | `develop` |
| Staging | 預備環境 | `release/*` |
| Production | 正式環境 | `main` / `master` |

---

## 結語

透過明確地將「環境」與「分支」一一對應，  
每一個環境、每一個版本，都能在 Git 中找到明確的來源，  
也為後續的 CI/CD、自動部署與 changelog 產生打下穩固的基礎。

在下一篇文章中，我們將介紹如何將這些理論應用到實際的 CI/CD 部署流程中，  
包括如何建立從 Staging 到 Production 的可追蹤部署機制，  
以及如何確保每一次部署都有清楚的版本來源。

> **延伸閱讀**  
> [從 Staging 到 Production：一套可追蹤的 CI/CD 版本控管實戰](./staging_to_production_versioned_cicd_pipeline)

