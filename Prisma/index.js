const express =require("express")
const prisma = require("./prisma/index")
const app=express()
app.get("/",async(req,res)=>{
    const user =await prisma.user.create({
        data: {
          name: 'Rich',
          email: 'hello@prisma.com',
          password:"123",
          posts: {
            create: {
              title: 'My first post',
              body: 'Lots of really interesting stuff',
              slug: 'my-first-post',
            },
          },
        },
      })
    res.json(user)
})
app.listen(3000,()=>{
    console.log("server is running on 3000")
})