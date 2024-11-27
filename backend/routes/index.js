const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignIn");
const userDetailsController = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");
const uploadProductController = require("../controller/product/uploadProduct");
const getProducts = require("../controller/product/getProduct");
const getAllSlidersController = require('../controller/landingPage/getAllLandingPageItems/getAllSliders');
const getAllVisionsController = require('../controller/landingPage/getAllLandingPageItems/getAllvisions'); 
const getAllGoalsController = require('../controller/landingPage/getAllLandingPageItems/getAllGoals'); 
const getAllAboutUsController = require('../controller/landingPage/getAllLandingPageItems/getAllaboutUs');


//const DeleteProductController = require("../controller/product/deleteProduct");
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
const updateImageController = require("../controller/user/updateImg");
const addCategoryController = require("../controller/category/AddCategory");
const addSliderController = require("../controller/landingPage/addSlider");
const deleteSliderController = require("../controller/landingPage/deleteSlider");
const addVisionController = require("../controller/landingPage/addVision");
const deleteVisionController = require("../controller/landingPage/deleteVision");
const addAboutUsController = require("../controller/landingPage/aboutUs");
const deleteAboutUsController = require("../controller/landingPage/deleteAboutUs");
const addGoalController = require("../controller/landingPage/addGoal");
const deleteGoalController = require("../controller/landingPage/deleteGoals");
const uploadProductPermission = require("../helpers/permission");
const imageUploadController = require('../controller/uploads/imageUploadService');
const imageUploadService = require('../controller/uploads/imageUploadService');
const uploadSliderImage = imageUploadService('slider-images');
const imageVisionUploadService = require('../controller/uploads/visionImageUploadService');
const uploadVisionImage = imageVisionUploadService('vision-images');
const DeleteProductController =  require("../controller/product/DeleteProductController");



// Image upload route


 // Use addCategoryController instead of uploadCategoryController
// Signin & signup
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

// admin panel
// router.get("/all-user",allUsers)
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);
router.post("/update-product", authToken, updateProductController);



router.post("/upload-product", authToken , uploadProductController);
router.get("/products", getProducts);
router.delete("/delete-product/:id", DeleteProductController);




// Categories
router.get("/all-categories", getAllCategoriesController);
router.post("/update-category", authToken, updateCategoryController);
router.post("/upload-category", authToken, uploadCategoryController);
router.post("/add-category", authToken, addCategoryController); // New route for adding categories

// product
router.get("/get-product", getProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-products", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProduct);
router.post("/filter-product", filterProductController);

// user add to cart
router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/view-card-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);



router.post("/add-aboutus", authToken, addAboutUsController);
router.delete("/delete-aboutus/:id", authToken, deleteAboutUsController);
router.get("/AboutUs", getAllAboutUsController);




router.post("/add-goal", authToken, addGoalController);
router.delete("/delete-goal/:id", authToken, deleteGoalController);
router.get("/goals", getAllGoalsController);



//  

router.post("/add-vision", authToken, addVisionController);
router.delete("/delete-vision/:id", authToken, deleteAboutUsController);
router.post('/upload-vision-image', uploadVisionImage);
router.get('/visions', getAllVisionsController);






// user slider 
//router.post("/update-sliderimage", authToken, addSliderController)
router.post("/add-slider", authToken, addSliderController);
router.delete("/delete-slider/:id", authToken, deleteSliderController);
router.get("/sliders", getAllSlidersController);
router.post('/upload-slider-image', uploadSliderImage);


// User Controls
router.post("/update-password", authToken, updatePasswordController);
router.post("/update-email", authToken, updateEmailController);
router.post("/update-name", authToken, updateNameController);
router.post("/update-image", authToken, updateImageController)
module.exports = router;
