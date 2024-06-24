const User = require("../Models/user");
async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.render("home")
}
async function handleUserlogin(req, res) {
  const { email, password } = req.body;
  const user =await User.findOne({email:email,password:password})
  if(!user)return res.render("login",{error:"invalid email or password"})
  return res.render("home")
}
module.exports={handleUserSignup,handleUserlogin}