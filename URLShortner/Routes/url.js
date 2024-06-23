const express =require("express")
const {handlegenerateShortenURL,handleAnaylitics}=require("../Controllers/url")

const router =express.Router()

router.post("/",handlegenerateShortenURL)
router.get("/Analytics/:shortID",handleAnaylitics)
module.exports=router