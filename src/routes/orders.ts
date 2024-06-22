import express from "express";
import {
  getAllOrders,
  myOrders,
  newOrder,
  getSingleOrder,
  proccessOrder,
  deleteOrder,
} from "../controllers/orders.js";
import { adminOnly } from "../middlewares/auth.js";

const orderRoutes = express.Router();

// route - /api/v1/order/new
orderRoutes.post("/new", newOrder);

// route - /api/v1/order/my-order
orderRoutes.get("/my-orders", myOrders);

// route - /api/v1/order/my-order
orderRoutes.get("/all-orders", adminOnly, getAllOrders);

orderRoutes
  .route("/:id")
  .get(getSingleOrder)
  .put(adminOnly,proccessOrder)
  .delete(adminOnly,deleteOrder);

export default orderRoutes;
