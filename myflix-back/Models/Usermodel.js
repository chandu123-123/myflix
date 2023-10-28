const mongoose=require("mongoose")
const userschema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        max:50,
    },
    likedmovies:Array,
})
module.exports=mongoose.model("users",userschema)