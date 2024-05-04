import { Schema, model } from "mongoose";

const schema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  quantity: {
      type: Number,
      require: true
  },
  lote: {
    type: String,
    required: true,
  },
  date: {
    buildAt: {
      type: Date,
      required: true
    },
    expireAt: {
      type: Date,
      required: true 
    }
  }
});

const productStockModel = model('product_stock', schema);

export default productStockModel;