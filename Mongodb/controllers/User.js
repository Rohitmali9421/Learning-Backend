
const User=require("../models/user") 

async function handleGetAllUsers(req,res){
    const users= await User.find({})
    return res.json(users)
}
async function handleGetUserByID(req,res){
    const id=req.params.id
    const user=await User.find({_id:id})
    return res.json(user)
}
async function handleCreateUser(req,res){
    const body = req.body;
    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.gender ||
      !body.job_title ||
      !body.email
    ) {
      return res.status(400).json({ msg: "all filds are required" });
    } else {
      const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        gender: body.gender,
        job_title: body.job_title,
        email: body.email,
      });
      return res.status(201).json({ msg: "success" });
    }
}


module.exports={
    handleGetAllUsers,
    handleGetUserByID,
    handleCreateUser,
}