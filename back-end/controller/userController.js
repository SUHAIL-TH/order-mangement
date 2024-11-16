

const bycrpt=require("bcrypt")
const jwt = require('jsonwebtoken');
const supplierSchema =require("../model/supplierSchema")
const itemScheama=require("../model/itemSchema") 
const purchaseSchema=require("../model/purchaseOrderSchema")


const postSupplier=async(req,res)=>{
try {
  console.log(req.body)

  let data=req.body
  let supplierExsist=await supplierSchema.findOne({email:data.email})

  if(supplierExsist===null){
    let phoneExsisted=await supplierSchema.findOne({mobileNo:data.mobileNo})
    if(phoneExsisted===null){

      let supplier=new supplierSchema(data)
      supplier.save()
     return res.send({message:"Supplier created successfully",status:true})
    }else{

      res.send({message:"Mobile Number Allready Exsisted",status:false})
    }
  }else{
    res.send({message:"Email Allready Exsisted",status:false})
  }
  
} catch (error) {
    console.log(error)
    res.send({message:"somthing went wrong",status:false})
}
}

const supplierList=async(req,res)=>{
  try {

    let data=await supplierSchema.find({status:{$nin:[2,3]}})
    console.log(data)
    res.send({message:"supplier list",status:true,list:data})
    
  } catch (error) {
    console.log(error)
    res.send({message:"somthing went wrong",status:false})
  }
}


const addList=async(req,res)=>{
  try {
    console.log(req.body)
    console.log(req.files)

    let data={
      itemId:req.body.itemId,
      itemName:req.body.itemName,
      inventoryLocation:req.body.inventoryLocation,
      brand:req.body.brand,
      category:req.body.category,
      supplier:req.body.supplier,
      stockUnit:req.body.stockUnit,
      unitPrice:req.body.unitPrice,
      status:req.body.status

    }

    const itemImages = req.files    .map(file => file.path.replace(/\\/g, '/'));
    data.itemImages=itemImages

    let result=new itemScheama(data)
    result.save()
    res.send({message:"Item Added",status:true})
    
  } catch (error) {
    console.log(error)
    res.send({message:"somthing went wrong",status:false})
  }
}

const itemList=async(req,res)=>{
  try {

    let data=await itemScheama.find({status:1})
    res.send({message:'itemListed ',itemlist:data,status:true})
    
  } catch (error) {
    console.log(error)
    res.send({message:"somthieng went wrong ",status:false})
  }
}

const purchaseOrder=async(req,res)=>{
  try {
    let data=new purchaseSchema(req.body)
    await data.save()
    res.send({message:"purchase succesfully",status:true})
  } catch (error) {
    console.log(error)
    res.send({message:"somthing went wrong ",status:false})
  }
}

const purchaseList=async(req,res)=>{
  try {
    let query = [
      {
        $lookup: {
          from: "suppliers", // Corrected from 'form' to 'from'
          localField: "supplierName",
          foreignField: "_id",
          as: "supplier"
        }
      },
      {
        $unwind: {
          path: "$supplier", // Added '$' for the path
          preserveNullAndEmptyArrays: true // Corrected the property name
        }
      },
      {$lookup:{
        from:'items',
        localField:"itemId",
        foreignField:"_id",
        as:"item"
      }},{
        $unwind:{
          path:"$item",
          preserveNullAndEmptyArrays: true

        }
      },
      {
        $project: {
          orderNo: 1,
          orderDate: 1,
          total: 1,
          discount: 1,
          netAmount: 1,
          "supplier.supplierName": 1, // Include supplier name if needed
          "item.itemName": 1, // Include item name
          "item.category":1,
          "item.brand":1,
          "item.unitPrice":1,
          "item.stockUnit":1
        }
      }
    ];

    let data= await purchaseSchema.aggregate(query)
    console.log(data)
    res.send({message:"purchase order list",status:true,list:data})
  } catch (error) {
    console.log(error)
    res.send({message:"somthing went wrong",status:false})
  }
}

module.exports = {

  postSupplier,
  supplierList,
  addList,
  itemList,
  purchaseOrder,
  purchaseList
};
