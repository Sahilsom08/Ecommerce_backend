import express from "express";

import { adminOnly } from "../middlewares/auth.js";
import {
  deleteProduct,
  getAllCategories,
  getAllProducts,
  getLatestProducts,
  getSingleProduct,
  newProduct,
  searchAllProducts,
  updateProduct,
} from "../controllers/products.js";
import { singleUpload } from "../middlewares/multer.js";

const productRoutes = express.Router();

// create new product only admin
productRoutes.post("/new", adminOnly, singleUpload, newProduct);

// get latest product limited (5)
productRoutes.get("/latest-products", getLatestProducts);

// get all products only admin
productRoutes.get("/admin-products", adminOnly, getAllProducts);

// get all categories of products
productRoutes.get("/categories", getAllCategories);

// to get/search all products with filter
productRoutes.get("/all", searchAllProducts);

// get single product detail
//update product
//delete product
productRoutes
  .route("/:id")
  .get(getSingleProduct)
  .put(adminOnly, singleUpload, updateProduct)
  .delete(adminOnly, deleteProduct);

export default productRoutes;
