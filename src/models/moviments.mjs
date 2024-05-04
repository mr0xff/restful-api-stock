import { Schema, model } from "mongoose";

const schema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  quantity: {
      type: Number,
      required: true,
  },
  typeMoviment: "out" | "input",
}, { timestamps: { createdAt: true }});

const movimentsModel = model('moviments', schema);

export default movimentsModel;