import express from "express";
import {
  getFeedProducts,
  getUserProducts,
  getProductDetails,
  deleteProduct,
  updateProduct,
  getBookedProducts,
  BookProduct,
} from "../controllers/products.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*READ*/
router.get("/", getFeedProducts);
router.get("/:userId/products", getUserProducts);
router.get("/:productId/product", getProductDetails);
router.get("/:userId/bookedproducts", getBookedProducts);

/*UPDATE*/
router.patch("/:productId/update", verifyToken, updateProduct); // Define the update route
router.patch("/:id/booking", verifyToken, BookProduct);

/* DELETE */
router.delete("/:userId/:productId/delete", verifyToken, deleteProduct);

export default router;
