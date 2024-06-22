import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the Name"],
    },
    photo: {
      type: String,
      required: [true, "Please upload the photo"],
    },
    price: {
      type: Number,
      required: [true, "Please enter the price"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter the stock availability"],
    },
    category: {
      type: String,
      required: [true, "Please enter the product category"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("product", schema);
