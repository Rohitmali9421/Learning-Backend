const {setUser} = require("../service/Auth");
const {v4:uuidv4} = require("uuid");
const User = require("../Models/user");
async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
    
  });
  return res.redirect("/")
}
async function handleUserlogin(req, res) {
  const { email, password } = req.body;
  const user =await User.findOne({email:email,password:password})
  if(!user)return res.render("login",{error:"invalid email or password"});

    const sessionID=uuidv4()
    setUser(sessionID,user)
    res.cookie('uid', sessionID);
  return res.redirect("/")
}
module.exports={handleUserSignup,handleUserlogin}