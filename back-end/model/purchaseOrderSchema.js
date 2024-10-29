const mongoose=require("mongoose")


const purchaseSchema =new mongoose.Schema({
    orderNo: {
      type: String,
      required: true,
      unique: true,
    },
    orderDate: {
      type: Date,
      required: true,
    },
    supplierName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier', 
      required: true,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item', 
      required: true,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
        
    },
    netAmount: {
      type: Number,
      required: true,
      min: 0,
    }
  }, {
    timestamps: true, // Adds createdAt and updatedAt timestamps automatically
  })

const purchaseSchemamodal=mongoose.model('purchase',purchaseSchema)
module.exports=purchaseSchemamodal