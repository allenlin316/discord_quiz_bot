
# Discord Quiz bot

## 動機
* 初學 `node.js` 想說來實作看看，因為這個小專案我學到了許多 `js` 的小技巧
* 這個筆記我會記錄一些我在實作過程中遇到的問題與解決方法
* 其實已經有很多人做出 quiz bot 但自己全部從零開始能夠學到的東西真的滿多的
* 官方的文件有許多 example ，但不是直接 copy&paste 就可以，有些東西必須自己要先
include 進來，或是有一些 promise 的問題

## 開發環境 🔧
### Packages
* discord.js : 用來做出 discord bot 的，讓開發者容易操作 Discord API 
* nodemon : 每次程式更改後存檔會自動重啟伺服器(很方便)
* dotenv : 把 `.env` 檔案的環境變數值儲存到 `process.env`
### Version
* node : v16.8.0
* npm : v7.21.0
* discord.js : v13.1.0 
    * v13 需要配合的 node 版本要高於 v16.6
* [nvm](https://stackoverflow.com/questions/8191459/how-do-i-update-node-js) : v1.1.7 
    * 讓開發者可以切換不同的 node 版本，這樣一來以後有版本問題的話就直接切換版本，而不用刪掉原來的版本
    * 我當初就是已經載好了 `node v14.x` 卻發現 discord.js 要配合更高版本的，所以下載這個來控制
* dotenv : v10.0.0

:::info
:warning: discord.js 版本與 node 的版本會有影響，有些方法在新的版本寫法不一樣
例如: discord.js v12 開始要自己 include [Intents](https://discordjs.guide/popular-topics/intents.html#privileged-intents)
:::

### 檔案
* 主要程式 : `bot.js`
* 操作題目的輸出 : `QuizMenu.js`
* 題目 : `question.json`
* [Procfile](https://devcenter.heroku.com/articles/procfile) : Heroku 一開始執行的時候會看這個檔案，就像我們在 terminal 輸入 `node bot.js`
* 沒有上傳的檔案(`.gitignore`) :  我沒有上傳 `.env` 因為裡面有 discord bot 的 token，如果上傳到公開的地方 discord 會把 token 的值改掉。沒有上傳 `node_modules`，因為這個檔案很大又沒有必要 

## 想法 💭