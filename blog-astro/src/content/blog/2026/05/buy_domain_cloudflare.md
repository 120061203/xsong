---
title: "如何購買網域並設定 Cloudflare 托管"
description: "以Hinet為例，購買自己的第一個Domain"
pubDate: 2026-05-13T15:00:00+08:00
updatedDate: 2026-05-13T15:00:00+08:00
heroImage: "../../../../assets/images/2026/05/buy_domain_cloudflare/buy_domain_cloudflare-1.webp"
categories: ["技術分享"]
tags: ["Domain", "Cloudflare", "DNS"]
private: false
---

# 如何購買網域並設定 Cloudflare 托管

擁有自己的網域是建立個人品牌或網站的第一步。這篇文章以台灣的中華電信 HiNet 購買網域為例，帶你完成從購買到交由 Cloudflare 托管的完整流程。

---

## 為什麼要用 Cloudflare 托管 DNS？

購買網域後，預設會使用註冊商的 DNS 服務。但把 DNS 交給 Cloudflare 管理有幾個明顯好處：

- **免費 SSL 憑證**：自動為你的網域啟用 HTTPS
- **CDN 加速**：透過 Cloudflare 的全球節點加速網站載入速度
- **DDoS 防護**：抵擋惡意流量攻擊
- **簡單易用的介面**：新增 A、CNAME、MX 等 DNS 記錄一目了然
- **免費電子郵件路由**：輕鬆設定自訂網域信箱（如 `hi@pinelab.tw`）

---

## 第一步：購買網域

以 HiNet 域名註冊為例：

1. 前往 [HiNet 域名註冊](https://domain.hinet.net)，搜尋你想要的網域名稱
2. 選擇喜歡的網域並完成購買

我這邊選的是單字domain ： [果.tw](https://果.tw)
購買完成後，進入網域管理頁面，你會看到網域的基本資訊。

---

## 第二步：在 Cloudflare 新增網域

1. 登入或註冊 [Cloudflare](https://dash.cloudflare.com)
2. 點左側「**網域**」→ 右上角「**+ 新增**」
3. 選擇「**連接網域**」
4. 輸入你的網域名稱，點「**繼續**」
5. Cloudflare 會自動掃描現有 DNS 記錄，確認後點「**繼續以啟用**」
6. 選擇免費方案即可

完成後，Cloudflare 會提供兩組專屬的 NS（名稱伺服器），例如：

```
norah.ns.cloudflare.com
vin.ns.cloudflare.com
```

記下這兩組 NS，下一步會用到。

---

## 第三步：在 HiNet 更新 NS 設定

1. 登入 HiNet 網域管理後台
2. 找到你的網域，點「**更新 DNS 主機**」
3. 將欄位填入 Cloudflare 給你的兩組 NS：
   - 第 1 欄：`norah.ns.cloudflare.com`
   - 第 2 欄：`vin.ns.cloudflare.com`
4. 點「**送出**」儲存

> IP Address 欄位留空即可，Cloudflare NS 不需要填 IP。

---

## 第四步：等待生效

DNS 更新通常在幾小時內生效（最長 48 小時）。生效後，Cloudflare 的網域狀態會從「待處理」變成「啟用中」，顯示：

> ✅ 您的網域現在受到 Cloudflare 保護

---

## 完成後可以做什麼？

托管完成後，所有 DNS 設定都在 Cloudflare 介面操作，常見用途包括：

- 新增 **A 記錄**，將網域指向你的伺服器 IP
- 新增 **CNAME 記錄**，將網域指向 Zeabur、Vercel 等平台
- 設定 **Email Routing**，建立自訂網域信箱
- 啟用 **SSL/TLS**，讓網站支援 HTTPS

只要將網域的 NS 設定為 Cloudflare，後續所有設定都能在同一個平台完成，省時又方便 🎉
