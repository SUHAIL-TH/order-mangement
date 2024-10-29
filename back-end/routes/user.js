const express=require("express")
const userRouter=express()
const userController=require("../controller/userController")
const uploadMultiple = require("../middleware/multer"); // Import the upload middleware









userRouter.post("/postsupplier",userController.postSupplier)
userRouter.get("/supplierlist",userController.supplierList)
userRouter.post("/additem",uploadMultiple.array('images',5),userController.addList)
userRouter.get('/itemlist',userController.itemList)
userRouter.post("/addpurchaseorder",userController.purchaseOrder)
userRouter.post("/purchaselist",userController.purchaseList)

module.exports=userRouter   