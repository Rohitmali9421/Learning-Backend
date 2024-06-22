const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA (1).json");
const app = express();
const port = 8000;

app.use(express.urlencoded({extended:false}))

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    
    const updatedUser = { ...users[index], ...req.body };
    users[index] = updatedUser;
    fs.writeFile("./MOCK_DATA (1).json", JSON.stringify(users), (err) => {
      return res.json({ status: "success" });
    });
  })
  .delete((req, res) => {
    const id=req.params.id
    const userss = users.filter((user)=>user.id!=id);
    fs.writeFile("./MOCK_DATA (1).json", JSON.stringify(userss) ,(err,data)=>{
        return res.json({status:"succsess"})
    })
  });

app.post("/api/users",(req,res)=>{
    const body=req.body;
    users.push({...body , id:users.length+1})
    fs.writeFile("./MOCK_DATA (1).json", JSON.stringify(users) ,(err,data)=>{
        return res.json({status:"succsess" ,id: users.length})
    })
})
 

app.listen(port, () => {
  console.log("server started");
});
