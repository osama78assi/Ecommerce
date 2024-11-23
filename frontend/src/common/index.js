const backendDomin = "http://localhost:5000";

const SummaryApi = {
  signUP: {
    url: `${backendDomin}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomin}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomin}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomin}/api/userLogout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomin}/api/all-user`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomin}/api/update-user`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomin}/api/upload-product`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomin}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomin}/api/update-product`,
    method: "post",
  },
  categoryProduct: {
    url: `${backendDomin}/api/get-categoryProduct`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomin}/api/category-product`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomin}/api/product-details`,
    method: "post",
  },
  addToCartProduct: {
    url: `${backendDomin}/api/addtocart`,
    method: "post",
  },
  addToCartProductCount: {
    url: `${backendDomin}/api/countAddToCartProduct`,
    method: "get",
  },
  addToCartProductView: {
    url: `${backendDomin}/api/view-card-product`,
    method: "get",
  },
  updateCartProduct: {
    url: `${backendDomin}/api/update-cart-product`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${backendDomin}/api/delete-cart-product`,
    method: "post",
  },
  searchProduct: {
    url: `${backendDomin}/api/search`,
    method: "get",
  },
  filterProduct: {
    url: `${backendDomin}/api/filter-product`,
    method: "post",
  },
  updateName: {
    url: `${backendDomin}/api/update-name`,
    method: "post",
  },
  updatePassword: {
    url: `${backendDomin}/api/update-password`,
    method: "post",
  },
  updateEmail: {
    url: `${backendDomin}/api/update-email`,
    method: "post",
  },
  allCategories: {
    url: `${backendDomin}/api/all-categories`,
    method: "get",
  },
  updateCategory: {
    url: `${backendDomin}/api/update-category`,
    method: "post",
  },
  uploadCategory: {
    url: `${backendDomin}/api/upload-category`,
    method: "post",
  },
  updateImage: {
    url: `${backendDomin}/api/update-image`,
    method: "post",
  },
  getAllCategories: {
    url: `${backendDomin}/api/all-categories`,
    method: "get",
  },
  getAllProducts: {
    url: `${backendDomin}/api/category-products`,
    method: "post",
  },
};

export default SummaryApi;
