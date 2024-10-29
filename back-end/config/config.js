const mongoose=require("mongoose")
module.exports={
    dbconnect:()=>{
        mongoose.connect("mongodb://0.0.0.0:27017/ecom").then(()=>{
            console.log("mongodb is connected   ")
        }).catch((error)=>{
            console.log(error)
        })
    }
}