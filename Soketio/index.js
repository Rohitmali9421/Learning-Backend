const express=require("express")
const app=express()
const {Server}=require("socket.io")

app.get("/",(req,res)=>{
    res.end("Hello")
})

app.listen(9000,()=>{
    console.log("server started");
    
})

