const express =require("express")
const router =express.Router()
const {handleUserSignup,handleUserlogin} =require("../Controllers/User")

router.post("/",handleUserSignup)
router.post("/login",handleUserlogin)

module.exports=router