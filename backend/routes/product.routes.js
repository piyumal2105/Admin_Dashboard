import express from "express";
import {
  addProduct,
  getAllItems,
  updateProduct,
  deleteProduct,
  updateUseProduct,
  getProductById,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post(`/addProduct`, addProduct);
router.get(`/`, getAllItems);
router.put(`/update/:id`, updateProduct);
router.delete(`/delete/:id`, deleteProduct);
router.put(`/updateUse/:id`, updateUseProduct);
router.get(`/:id`, getProductById);

export default router;
