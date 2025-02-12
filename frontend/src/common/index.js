// const backendDomain = "http://localhost:5000";
const backendDomain = "https://hostingsites.icu/alsakhra";

const SummaryApi = {
  signUP: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomain}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomain}/api/userLogout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomain}/api/all-user`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomain}/api/update-user`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomain}/api/upload-product`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomain}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomain}/api/update-product`,
    method: "post",
  },
  deleteProduct: {
    url: `${backendDomain}/api/delete-product/`,
    method: "delete",
  },
  categoryProduct: {
    url: `${backendDomain}/api/get-categoryProduct`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomain}/api/category-product`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomain}/api/product-details`,
    method: "post",
  },
  addToCartProduct: {
    url: `${backendDomain}/api/addtocart`,
    method: "post",
  },
  addToCartProductCount: {
    url: `${backendDomain}/api/countAddToCartProduct`,
    method: "get",
  },
  addToCartProductView: {
    url: `${backendDomain}/api/view-card-product`,
    method: "get",
  },
  updateCartProduct: {
    url: `${backendDomain}/api/update-cart-product`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${backendDomain}/api/delete-cart-product`,
    method: "post",
  },
  searchProduct: {
    url: `${backendDomain}/api/search`,
    method: "get",
  },
  filterProduct: {
    url: `${backendDomain}/api/filter-product`,
    method: "post",
  },
  updateName: {
    url: `${backendDomain}/api/update-name`,
    method: "post",
  },
  updatePassword: {
    url: `${backendDomain}/api/update-password`,
    method: "post",
  },
  updateEmail: {
    url: `${backendDomain}/api/update-email`,
    method: "post",
  },
  allCategories: {
    url: `${backendDomain}/api/all-categories`,
    method: "get",
  },
  updateCategory: {
    url: `${backendDomain}/api/update-category`,
    method: "post",
  },
  uploadCategory: {
    url: `${backendDomain}/api/upload-category`,
    method: "post",
  },
  updateImage: {
    url: `${backendDomain}/api/update-image`,
    method: "post",
  },
  getAllCategories: {
    url: `${backendDomain}/api/all-categories`,
    method: "get",
  },
  getAllProducts: {
    url: `${backendDomain}/api/category-products`,
    method: "post",
  },
  getAboutUsData: {
    url: `${backendDomain}/api/AboutUs`,
    method: "get",
  },
  getVisionData: {
    url: `${backendDomain}/api/visions`,
    method: "get",
  },
  getSliderData: {
    url: `${backendDomain}/api/sliders`,
    method: "get",
  },
  getGoalsData: {
    url: `${backendDomain}/api/goals`,
    method: "get",
  },
  uploadProductImages: {
    url: `${backendDomain}/api/upload`,
    method: "post",
  },
  deleteCategory: {
    url: `${backendDomain}/api/delete-category`,
    method: "delete",
  },
  uploadSliderImage: {
    url: `${backendDomain}/api/upload-slider-image`,
    method: "post",
  },
  uploadSliderData: {
    url: `${backendDomain}/api/add-slider`,
    method: "post",
  },
  deleteSlider: {
    url: `${backendDomain}/api/delete-slider`,
    method: "delete",
  },
  deleteGoal: {
    url: `${backendDomain}/api/delete-goal`,
    method: "delete",
  },
  uploadGoal: {
    url: `${backendDomain}/api/add-goal`,
    method: "post",
  },
  uploadVisionImage: {
    url: `${backendDomain}/api/upload-vision-image`,
    method: "post",
  },
  uploadVision: {
    url: `${backendDomain}/api/add-vision`,
    method: "post",
  },
  deleteVision: {
    url: `${backendDomain}/api/delete-vision`,
    method: "delete",
  },
  uploadAboutusImage: {
    url: `${backendDomain}/api/upload-aboutus-image`,
    method: "post"
  },
  uploadAboutus: {
    url: `${backendDomain}/api/add-aboutus`,
    method: "post"
  },
  deleteAboutus: {
    url: `${backendDomain}/api/delete-aboutus`,
    method: "delete"
  }
};

export default SummaryApi;
