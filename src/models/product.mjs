import { Schema, model } from "mongoose";

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  productGroupId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const productModel = model('product', schema);

export default productModel;