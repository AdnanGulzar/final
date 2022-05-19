const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
  getUserProducts,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(isAuthenticatedUser,  getAdminProducts);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser,  updateProduct)
  .delete(isAuthenticatedUser,  deleteProduct);

router.route("/product/:id").get(getProductDetails);
router.route("/products/:userid").get(getUserProducts);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
