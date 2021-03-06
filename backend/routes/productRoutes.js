import express from "express";
import {
    deleteProduct,
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
} from "../controllers/productController.js";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router
    .route("/:id/:cityId")
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct);

export default router;
