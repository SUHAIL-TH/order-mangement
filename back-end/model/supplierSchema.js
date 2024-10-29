const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  supplierId: {
    type: String,
    required: true,
    unique: true, 
  },
  supplierName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  taxNo: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true, 
    trim: true, 
  },
  status: {
    type: String,
    enum: ['1', '2', '3'], 
    default: '1', 
  },
}, {
  timestamps: true, 
});

// Create a Supplier model
const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
