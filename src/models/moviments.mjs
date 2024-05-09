import { Schema, model } from "mongoose";

const schema = new Schema({
  productStockId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  quantity: {
      type: Number,
      required: true,
  },
  type:{
    type: String,
    required: true,
  } 
}, { timestamps: { createdAt: true }});

const movimentsModel = model('moviments', schema);

export default movimentsModel;