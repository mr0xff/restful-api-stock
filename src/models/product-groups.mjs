import { Schema, model } from "mongoose";

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const productGroupModel = model('product_groups', schema);

export default productGroupModel;