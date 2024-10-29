const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
    unique: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  inventoryLocation: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    // enum: ['Clothing', 'Electronics', 'Groceries', 'Furniture', 'Other'], 
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true,
  },
  stockUnit: {
    type: String,
    required: true,
    // enum: ['Pieces', 'Kilograms', 'Liters', 'Units', 'Packs'],
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  itemImages: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    enum: ['1', '2', '3'], 
    default: '1', 
  },
},{
    timestamps:true
});

const itemSchemaa = mongoose.model('Item', itemSchema);

module.exports=itemSchemaa


