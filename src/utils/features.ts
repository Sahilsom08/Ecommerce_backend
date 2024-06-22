import mongoose from "mongoose";
import { InvalidateCacheProps, OrderItemType } from "../types/types.js";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";

export const connectDB = (uri: string) => {
  mongoose
    .connect(uri, { dbName: "Ecommerce" })
    .then((e) => console.log(`DB connected to ${e.connection.host}`))
    .catch((e) => console.log(e));
};

//revalidate
export const invalidateCache = ({
  product,
  order,
  admin,
  userId,
  orderId,
  productId,
}: InvalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = [
      "latest-products",
      "categories",
      "all-products",
    ];

    if (typeof productId === "string") {
      productKeys.push(`product-${productId}`);
    }
    if (typeof productId === "object") {
      productId.forEach((i) => {
        productKeys.push(`product-${i}`);
      });
    }
    myCache.del(productKeys);
  }

  if (order) {
    const orderKey: string[] = [
      "all-orders",
      `my-order-${userId}`,
      `order-${orderId}`,
    ];

    myCache.del(orderKey);
  }
};

export const reduceStock = async (orderItems: OrderItemType[]) => {
  for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);

    if (!product) {
      throw new Error("Product not found");
    }
    product.stock = order.quantity;

    await product.save();
  }
};
