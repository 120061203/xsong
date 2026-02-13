---
title: "企業等級機密資料保存-自架Vault系統簽CA驗證保護"
description: "如何保存機密資料，並且安全有效傳遞，我將會揭秘企業等級的安全儲存方法"
pubDate: 2026-02-13T16:00:00+08:00
updatedDate: 2026-02-13T16:00:00+08:00
heroImage: "../../../../assets/images/2026/02/security_storage_vault_system/security_storage_vault_system-1.webp"
categories: ["技術分享"]
tags: ["Security","Vault"]
private: false
---

## 前言

在開發階段會有很多的機密資訊例如 **.env** 檔案會儲存在自己的電腦本地，而一旦牽涉到上雲端、跨部門協作、遠端工作等情境，勢必就避免不了需要有一個更好的方式去存儲與傳遞。如果你有閱讀過我去年的這篇[通過試用期-我規定了公司的標準部署流程](/blog/2025/11/pass_trial_period) ，裡面有提到目前的方式是採用 Google Sheet 的方式去傳遞環境變數，由RD交付給Devops來進行部署。

然而最近由於公司的政策變動，可能會需要將資料從 Google 系列進行移出，目前存放於公司私有的 Notion，但在這時我的工程師直覺警報響起，Notion是一個適合筆記、線上共同編寫的平台，可是真的是適合儲存機密資訊的嗎，但是目前還沒有一個適合存放機密資料的平台，因此交給我去研究一個適合的解決方式。

## 我對未來機密資訊存儲的要求

1. 機密資訊的加密:反正不該看到明文，應該有一定的加解密方法
2. 權限控管嚴格：包含人員控管、IP控管、登入方式控管，最好能夠由OAuth方式，這樣才方便。
3. 定期的備份機制：如果能夠像Raid備份那樣，即使機器壞了也可自動切換該有多好，而且要有snapshot，可以自動備份到安全的地方。
4. 最好免費且開源：方便擴充以及收到最新的更新。~~我相信開源之力~~

## Vault的強大之處

Vault讓我覺得最強大的地方，不僅只是一個Key Value存儲的地方，這套系統透過Admin權限的Token，可以自動發行短暫的user token，每一次的有效時間可以自由設定，例如限制在1小時內才可以存取DB，不會再擔心帳號密碼遺失或被盜用的問題，一切的託管交給Vault。

## 知道Vault的契機

不得不說這個契機很巧的是，我在1/31（六）參加 敏捷台中Agile Taichung 舉辦的 **用積木學Scrum**活動，剛好坐在我旁邊的是一位台大電機並且在美商公司擔任Security相關工作的工程師，休息時間閒聊的時候想說問問看他們公司是如何控管機密資訊的，他和我分享了FedRAMP，一個美國聯邦風險與授權管理計畫 (FedRAMP) 提供一套標準化方法，不過這對於目前階段來說好像有點距離，後來他就和我分享了Vault這個關鍵字，但當下我只是默默記下這個關鍵字，其實對Vault不甚了解，很快活動就開始了，我們就繼續參與下去，結束了這個話題，從某種程度上來說，我是不是也算是在假日加班了。

等到下週上班，Team Meeting時，我向主管分享了這個方式，我看這個[Vault的github ](https://github.com/hashicorp/vault) ，居然是由 **HashiCorp** 管理的，這和之前[解鎖成就-第一次RD會議](/blog/2025/10/2025-10-17-milestone-first-RD-meeting.md)這篇分享的Terraform公司是同一間，讓我覺得這看上去是一個可行的方案，畢竟見識過了Terraform的威力。

## 測試階段Vault

在安裝的階段，我先在本機開始測試 Vault 的 Dev 模式，那 Dev 模式就比較不安全，所有機密儲存在記憶體，我在第一天安裝後測試了幾筆資料，並且在下班前關閉Vault了（pkill vault指令），隔天發現資料遺失了，才知道原來 Dev 模式是這樣的儲存方式，而且Unseal Key每次都會變更，所以隔天我就在電腦上切換成Prod模式了，畢竟這樣才比較接近生產環境，而且也能夠測試 Seal 功能。

```
危險指令：
pkill vault
Dev模式下，資料都儲存在記憶體中，因此如果重新啟動，儲存的Userpass帳戶、KV Secrets、Policies皆會遺失

Seal 功能：
在發生資料洩漏事件時，允許密封Vault，只有提供5把Unseal Key 中的 3 把，才可以解封。
```

## EC2安裝Vault

研究了一個階段，我覺得如果繼續研究本地端的會有點浪費時間，畢竟很多事情都是在雲端環境中才會出現的，例如Domain 、 VPC 、 ALB 、SSL等問題，因此我就採用 Terraform 去開了3台Vault 並且內建Vault，我只能說一鍵啟動EC2 並且安裝完成Vault真的很輕鬆，Terraform萬歲。但是在安裝的過程中預設安裝了Vault 15，這是可以在Terraform中避免的，未來如果安裝還是要仔細檢查一下。

## 為了安全使用Vault，我建立了 7層防護

1. 捨棄SSH連線，採用SSM連線
我在建立 EC2 時，捨棄採用 SSH連線 的方式，我採用SSM連線，只有被允許的IAM才能夠存取，這樣就再也不用擔心SSH的pem被遺失了，因為根本沒有pem。

2. IP限制 透過Security Group Rule 
只有接入公司的內網IP 才能夠存取這台Vault，即使外部人員知道 Vault 的IP 或 Domain 也無法入侵，另外即使知道了ALB的原始網址也無法存取，因為Vault限制了合法的Domain存取路徑，所以可以擋住不必要的DDoS攻擊。

3. AWS KMS Auto Unseal
在原本採用Unseal Key，還需要自行保存5把Key，那在這個模式下，只需要讓AWS KMS去管理Unseal Key就可以了，每次重啟Vault都可以自動解鎖，安全又方便，但是自己還是需要保管Recovery Key和Root Token。

4. mTLS 雙向驗證，伺服器端口的驗證機制更加嚴格，我一共開了3台EC2 ，Vault-0、1、2，我在Vault-0 Leader機上用Open SSL ，建立了CA，並且簽發了vault-0、1、2的憑證，同時具備serverAuth、 clientAuth憑證的才可以互相存取彼此，並且也在Security Group進行防護，沒有其他任何機器可以存取。

5. AWS Cognito Auth 認證
由於公司內部採用AWS，那我就採用Cognito進行Auth認證，只有用公司建立由AWS帳號才可以進入，並且第一次登入強制更改密碼，即便是管理員也不知道你的密碼呢，而且每次登入都非常輕鬆，再也不需要記住獨立的帳號以及密碼了。

6. Vault Policy 嚴格的權限控管
這就是Vault強大的地方了， 權限細緻的程度可以設定 Role、 Entity、Group、Policy，每個權限都需要有Root權限確認才能夠建立，控制每一個登入者能夠存取的範圍、token時間。

7. Snapshot定期備份到S3存儲
透過instance role去存取S3 並且加密，讓大量的機密被安全隱藏與備份，只有Vault才能夠加密與解鎖，即使機器損壞也可以被還原，不用再擔心資料遺失。

## 正式上線

由於現在還處於年假期間，我的主管也去放年假了，所以我還沒有進行實際使用者測試，但我想等下一次RD會議的時候來分享這個專案，並且邀請有興趣的RD來測試，應該是很有價值的事情。