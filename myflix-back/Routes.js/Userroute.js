const { addtolikedmovies, getlikedmovies } = require("../Controllers/Usercontrollers")

const router=require("express").Router()
router.post("/add",addtolikedmovies)
router.get("/liked/:email",getlikedmovies)
module.exports=router