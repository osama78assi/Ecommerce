const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignIn");
const userDetailsController = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");
const UploadProductController = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProduct = require("../controller/product/getCategoryProductOne");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getProductDetails = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/user/addToCartController");
const countAddToCartProduct = require("../controller/user/countAddToCartProduct");
const addToCartViewProduct = require("../controller/user/addToCartViewProduct");
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct");
const searchProduct = require("../controller/product/searchProduct");
const filterProductController = require("../controller/product/filterProduct");
const updatePasswordController = require("../controller/user/updatePassword");
const updateEmailController = require("../controller/user/updateEmail");
const updateNameController = require("../controller/user/updateName");
const uploadCategoryController = require("../controller/category/uploadCategory");
const getAllCategoriesController = require("../controller/category/getAllCategories");
const updateCategoryController = require("../controller/category/updateCategory");

// Signin & signup
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

// admin panel
// router.get("/all-user",allUsers)
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);
router.post("/upload-product", authToken, UploadProductController);
router.post("/update-product", authToken, updateProductController);

// Categories
router.get("/all-categories", getAllCategoriesController);
router.post("/update-category", authToken, updateCategoryController);
router.post("/upload-category", authToken, uploadCategoryController);

// product
router.get("/get-product", getProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProduct);
router.post("/filter-product", filterProductController);

// user add to cart
router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/view-card-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);

// User Controls
router.post("/update-password", authToken, updatePasswordController);
router.post("/update-email", authToken, updateEmailController);
router.post("/update-name", authToken, updateNameController);
module.exports = router;
