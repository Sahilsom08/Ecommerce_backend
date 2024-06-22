import express from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  newUser,
} from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";

const userRoutes = express.Router();

//route - /api/v1/user/new
userRoutes.post("/new", newUser);

// route - /api/v1/user/all
userRoutes.get("/all", adminOnly, getAllUser);

// route - /api/v1/user/:id(dynamic id)
userRoutes.get("/:id", getUser);

// route - /app/v1/user/:id
userRoutes.delete("/:id", adminOnly, deleteUser);

//* above two also written as given below *//
// app.route('/:id').get(getUser).delete(deleteUser)

export default userRoutes;
