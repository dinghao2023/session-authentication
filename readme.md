### 在express项目中使用session认证
- 在express项目中，首先通过命令`npm i express-session`安装express-session中间件。
- 导入并配置express-session中间件：
```js
const session = require("express-session")
app.use(session({
    secret:"sessionauthentication",
    resave:false,
    saveUninitialized:true
}))
```
