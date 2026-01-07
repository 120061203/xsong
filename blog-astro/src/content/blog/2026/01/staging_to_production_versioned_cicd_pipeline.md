---
title: "從 Staging 到 Production：一套可追蹤的 CI/CD 版本控管實戰"
description: "實作從 Staging 到 Production 的完整部署流程，確保每一次部署都有清楚的版本來源與可追蹤的 image tag"
pubDate: 2026-01-07T16:00:00+08:00
updatedDate: 2026-01-07T16:00:00+08:00
heroImage: "../../../../assets/images/2026/01/staging_to_production_versioned_cicd_pipeline/staging_to_production_versioned_cicd_pipeline-1.webp"
categories: ["技術分享"]
tags: ["CICD","Pipeline","Bitbucket","AWS"]
private: false
---

## 前言

在理解了 [Git flow 與軟體開發的四個環境階段](/blog/2026/01/gitflow_and_four_environments) 的理論基礎後，  
這篇文章將分享我如何為公司建立一套實際的 CI/CD 部署流程。

在實際的開發與部署流程中，**版本控管不只是標記一個數字，而是確保每一次變更都可被追蹤、被驗證、被回溯**。

為了更完整地實踐 Git flow，我希望能建立一套明確的部署規範：  
**所有程式碼在部署至正式環境（Production）之前，必須先經過模擬（Staging）環境的驗證流程**。  
這不僅能降低直接影響正式站的風險，也能讓每一次上線都有清楚的版本依據。

同時，在每一次部署的過程中，我也希望能夠**自動產生對應版本的 changelog**，讓團隊成員與未來的維護者能快速了解：
- 這個版本做了哪些功能調整
- 修復了哪些問題
- 是否包含破壞性變更

因此，這篇文章將分享我如何結合 Git flow、CI/CD Pipeline 與版本標記策略，  
打造一套 **從 Staging 到 Production 可追蹤、可回溯的部署流程**。

> **前置知識**  
> 建議先閱讀：[Git flow 與軟體開發的四個環境階段](/blog/2026/01/gitflow_and_four_environments)  
> 了解 Git flow 分支策略與四個環境的對應關係。

---

## 部署流程目標

在建立實際的 CI/CD 流程之前，我們先明確幾個核心目標：

### 核心原則

> **Build once, deploy many**  
> - Production 部署流程**不重新建置（build）image**
> - 不依賴 `main` / `staging` 分支的程式碼內容
> - 僅從 Staging 的 ECR Repository 複製已部署且驗證完成的 image
> - 將 Staging 視為 Production 的唯一版本來源（Single Source of Truth）

### 流程要求

1. **Dev → Staging 部署**
   - 部署至 Staging 時需**明確指定版本號**
   - 版本號由使用者在 Bitbucket Pipeline 執行時手動輸入
   - 該版本號將作為後續 Production 部署與 changelog 的依據

2. **Staging → Production 部署**
   - Production 部署時**不需手動輸入版本號**
   - Pipeline 自動抓取「最後一版已部署至 Staging 的版本」
   - 確保 Production 僅能從已驗證過的 Staging 版本進行升級

---

## Dev → Staging 部署流程

### 部署流程目標

> **核心要求**
> - 部署至 Staging 時需**明確指定版本號**
> - 版本號由使用者在 Bitbucket Pipeline 執行時手動輸入
> - 該版本號將作為後續 Production 部署與 changelog 的依據

### 實作步驟

#### Step 1：合併程式碼至 Staging 分支

```bash
# 從 develop 或 feature 分支合併至 staging
git checkout staging
git merge develop  # 或 git merge feature/your-feature
git push origin staging
```

請先將欲部署的開發程式碼，從 `develop` / `feature/*` 分支合併至 `staging` 分支，  
確保 `staging` 分支內容即為本次要部署至 Staging 的版本。

#### Step 2：手動觸發 Staging 部署 Pipeline

進入 Bitbucket Pipeline 介面後：

- 點選 **Run pipeline**
- **Branch**：`staging`
- **Pipeline**：`custom:deploy-to-staging`
- **設定變數**：

> **補充說明**  
> 除了手動設定版本號外，也可使用 **Git tag** 指定版本：

```bash
git tag v0.1.0
git push origin v0.1.0
```

#### Step 3：確認 Staging ECR Image 與 Tags

Pipeline 執行完成後，請至 Staging 的 ECR Repository 確認 image。

系統將同時產生以下四種 tag：

- `staging`
- `git-sha`
- `v1.2.0-staging`
- `v1.2.0`

---

## Staging → Production 部署流程

### 部署流程目標

> **自動化設計**
> - Production 部署時**不需手動輸入版本號**
> - Pipeline 自動抓取「最後一版已部署至 Staging 的版本」
> - 確保 Production 僅能從已驗證過的 Staging 版本進行升級

### 核心設計概念

> **Build once, deploy many**  
> - Production 部署流程**不重新建置（build）image**
> - 不依賴 `main` / `staging` 分支的程式碼內容
> - 僅從 Staging 的 ECR Repository 複製已部署且驗證完成的 image
> - 將 Staging 視為 Production 的唯一版本來源（Single Source of Truth）

---

### 實作步驟

#### Step 1：執行 Promotion Pipeline

進入 Bitbucket Pipeline 介面後：

- 點選 **Run pipeline**
- **Branch**：`staging` 或 `main` 皆可
- **Pipeline**：`promote-staging-to-prod`

> **說明**  
> 此 Pipeline 不會根據 `branch` 內容建置新的 image，  
> 而是從 Staging ECR 中查找最新的 `version tag` 並進行 promotion，  
> 因此 `branch` 的選擇不影響實際部署結果。

---

#### Step 2：從 Staging ECR 取得最新版本 Image
Pipeline 會自動執行以下動作：

1. 從 Staging ECR Repository 中找出最新的版本 tag  
   （例如：`v0.1.0` 或 `v0.1.0-staging`）
2. Pull 對應的 Docker image

```bash
# Pipeline 自動執行
docker pull <staging-ecr>/<image>:<latest-version-tag>
```

---

#### Step 3：重新標記並推送至 Production ECR
取得 image 後，Pipeline 將進行以下操作：

- 重新標記 image，產生：
  - `v0.1.0-prod`
  - `prod`
- 推送標記後的 image 至 Production ECR Repository

```bash
# Pipeline 自動執行
docker tag <staging-image>:<version> <prod-ecr>/<image>:<version>-prod
docker tag <staging-image>:<version> <prod-ecr>/<image>:prod
docker push <prod-ecr>/<image>:<version>-prod
docker push <prod-ecr>/<image>:prod
```

此設計可確保：
- Production 與 Staging 使用**完全相同的 image**
- 任何正式環境問題皆可直接回溯至對應的 Staging 版本

---

### 部署完成驗證
部署完成後，請至 Production 的 ECR Repository 確認：

- 是否存在對應版本的 `vX.Y.Z-prod` tag
- `prod` tag 是否指向最新部署版本

> **驗證重點**  
> 確認 Production ECR 中的 image 與 Staging ECR 中的 image 內容完全一致，  
> 僅 tag 標記不同。

---

### 流程效益

> **核心優勢**
> - 避免 Production 部署時的人工版本輸入錯誤
> - 確保 Production 僅使用經過 Staging 驗證的版本
> - 提升部署流程的穩定性、可追蹤性與可回溯性

---

## 部署流程總覽（Dev → Staging → Production）

```text
[ 開發完成 ]
      │
      ▼
[ 合併至 Staging 分支 ]
      │
      ▼
[ 執行 Staging 部署 Pipeline ]
  - 手動輸入版本號 (VERSION)
  - 建置 Docker Image
      │
      ▼
[ 推送 Image 至 Staging ECR ]
  - 標記版本 (vX.Y.Z)
  - 標記環境 (staging)
      │
      ▼
[ 執行 Production 部署 Pipeline ]
  - 不重新建置 Image
      │
      ▼
[ 從 Staging ECR 取得最新版本 Image ]
      │
      ▼
[ 重新標記 Image ]
  - vX.Y.Z-prod
  - prod
      │
      ▼
[ 部署至正式環境 Production ]
```

---

## 結語

透過這次的流程設計與實作，我們將原本容易出錯、難以追蹤的部署流程，  
逐步轉化為一套 **可預期、可回溯、可自動化** 的 CI/CD 機制。

以 Git flow 作為開發與分支管理的基礎，  
並明確區分 **開發環境、測試環境、預備環境與正式環境**，  
確保所有版本在進入 Production 之前，**一定會先經過 Staging 的驗證流程**，  
有效降低正式上線的風險。

在部署策略上，透過 **「Build once, deploy many」** 的概念，  
Production 僅從 Staging promotion 已驗證過的 image，  
避免在正式環境重新建置所帶來的不確定性，  
同時也讓每一次部署都有清楚的版本來源可供追蹤。

此外，將 **changelog** 的產生與 **Pull Request** 流程結合，  
不僅減少人工維護文件的負擔，  
也讓每一次版本釋出都能清楚記錄「做了什麼改動、為什麼改、影響哪些功能」。

這套流程並非一次到位的最終解法，  
但它提供了一個穩固的基礎，  
讓團隊能在持續交付的前提下，逐步提升部署品質與系統穩定度。

未來也可在此基礎上，持續加入更多自動化與防護機制，  
例如更完整的測試策略、部署驗證、或更細緻的版本治理，  
讓部署流程真正成為支撐產品成長的可靠後盾。

> **延伸閱讀**  
> 上一篇：[Git flow 與軟體開發的四個環境階段](/blog/2026/01/gitflow_and_four_environments)
