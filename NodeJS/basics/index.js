let express = require("express");


const app =express()

app.get("/" , (req,res)=>{
    res.end("homepage")
})
app.get("/about" , (req,res)=>{
    res.end("about")
})
app.get("/contact" , (req,res)=>{
    res.end("contact")
})


  app.listen(8000, () => {
    console.log("server started");
  });
