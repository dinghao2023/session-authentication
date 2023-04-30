const express = require("express")
const app = express()
const session = require("express-session")
app.use(session({//配置session中间件
    secret:"sessionauthentication",
    resave:false,
    saveUninitialized:true
}))
app.use(express.static("./pages"))//托管静态页面
app.use(express.urlencoded({extended:false}))//解析post提交的数据
//登录的接口
app.post("/api/login",(req,res)=> {
    if(req.body.username === "admin" && req.body.password ==="000000") {
        // console.log(req.body)//{ username: 'admin', password: '000000' }
        //若登录成功，则将用户信息和登录状态保存在服务器的session中
        req.session.user = req.body
        req.session.islogin = true
        return res.send({ status: 0, msg: "登录成功" })
    }
    res.send({ status: 1, msg: "登录失败" })
})
//获取用户姓名的接口
app.get("/api/username",(req,res)=> {
    //从session中获取用户信息，响应给客户端
    if(!req.session.islogin) {
        return res.send({status:1,msg:"fail"})
    }
    res.send({status:0,msg:"success",username:req.session.user.username})
})
//退出登录的接口
app.post("/api/logout",(req,res)=> {
    req.session.destroy()
    res.send({status:0,msg:"退出成功"})
})

app.listen(80,()=> {
    console.log("server running at http://127.0.0.1:80")
})