# NTU Election Affairs Check Point (ntu-vote-checkpoint)
Developed for [Election &amp; Recalling Execution Community, NTU Students Association](https://vote.ntustudents.org/)  
Designed by [Hao-Yung Chan (katrina376)](https://github.com/katrina376/), 2016 Fall Semester  
Powered by [Google Apps Script](https://developers.google.com/apps-script/)  
Released under [MIT License](https://github.com/katrina376/ntu-vote-checkpoint/blob/master/LICENSE)

由[國立臺灣大學學生會選舉罷免執行委員會](https://vote.ntustudents.org/) 105-1 委員 [Hao-Yung (Katrina) Chan](https://github.com/katrina376/) 開發，於 105 學年度第一學期第一次使用。使用 [Google Apps Script](https://developers.google.com/apps-script/) 建置。本專案採用 [MIT 授權](https://github.com/katrina376/ntu-vote-checkpoint/blob/master/LICENSE)。

## Build
待補。

## Run
必須在 Google Drive 上使用 GAS 專案檔運行。

## Source Code Description
#### `config.gs`
設定專案參數：
+ `DB_ID` : 資料庫 id
+ `SHEET_NAMES` : 資料庫內相關表格的名稱，包含：
  - `station` : 票點編號與名稱
  - `step` : 檢查點編號、標題與說明
  - `state` : 各票點的各檢查點狀態，已完成者記錄時間
  - `log` : 記錄更新時間
+ `ELECTION` : 選舉名稱  

#### `app.gs`
主程式。

#### `view.html`
操作介面。

#### `script.html`
JavaScript file (called in `view.html`)

#### `style.html`
CSS file (called in `view.html`)  
