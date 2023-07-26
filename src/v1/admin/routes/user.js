const express = require('express');
const router = express.Router()
const CategoryController = require('../controllers/CategoryController')
const SubCategoryController = require('../controllers/SubCategoryController')
const OrderController = require('../controllers/OrderController')
const UserController = require('../controllers/UserController')
const BrandController = require('../controllers/BrandController')
const ProductController = require('../controllers/ProductController')
const AdminController = require('../controllers/AdminController')
const CoupenController = require('../controllers/CoupenController')
const HomeManagementController = require('../controllers/HomeManagementController')
const authMiddleware = require('../middleware/Auth');
const upload = require('../middleware/multer')

/* category api */


// add category api
router.post('/addcategory', authMiddleware.authenticate, upload.single("image"), CategoryController.addcategory)

//delete category
router.post('/deletecategory', authMiddleware.authenticate, CategoryController.deletecategory)

//update category
router.post('/updatecategory', authMiddleware.authenticate, CategoryController.updatecategory)

//category list
router.post('/categorylist', authMiddleware.authenticate, CategoryController.categorylist)



/* brand api */


// addbrand api
router.post('/addbrand', authMiddleware.authenticate, upload.single("image"), BrandController.addbrand)

// deletebrand api
router.post('/deletebrand', authMiddleware.authenticate, BrandController.deletebrand)

// updatebrand api
router.post('/updatebrand', authMiddleware.authenticate, BrandController.updatebrand)

//brandlist api
router.post('/brandlist', authMiddleware.authenticate, BrandController.brandlist)



/* subcategory api */

// addsubcategory api
router.post('/addsubcategory', authMiddleware.authenticate,upload.single('image'), SubCategoryController.addsubcategory)

// deletesubcategory api
router.post('/deletesubcategory', authMiddleware.authenticate, SubCategoryController.deletesubcategory)

// updatesubcategory api
router.post('/updatesubcategory', authMiddleware.authenticate, SubCategoryController.updatesubcategory)

//subcategorylist api
router.post('/subcategorylist', authMiddleware.authenticate, SubCategoryController.subcategorylist)


/* product api */

// addproduct api
router.post('/addproduct', authMiddleware.authenticate, upload.single("image"), ProductController.addproduct)

// deleteproduct api
router.post('/deleteproduct', authMiddleware.authenticate, ProductController.deleteproduct)

// updateproduct api
router.post('/updateproduct', authMiddleware.authenticate, ProductController.updateproduct)

//productlist api
router.post('/productlist', authMiddleware.authenticate, ProductController.productlist)


/* order  api*/

//user order api
router.post('/orderlist', authMiddleware.authenticate, OrderController.orderlist)

//totalorder api
router.post('/totalorder', authMiddleware.authenticate, OrderController.total_order)

// order-details api
router.post('/orderdetail', authMiddleware.authenticate, OrderController.order_details)


/* user api */

// user list api
router.post('/userlist', authMiddleware.authenticate, UserController.user_list)

// user-detail api
router.post('/userdetail', authMiddleware.authenticate, UserController.user_detail)



/*admin api */

// admin login api
router.post('/adminlogin', AdminController.admin_login)

//update setting api
router.post('/updatesetting', authMiddleware.authenticate, AdminController.updatesetting)

//change passwprd api
router.post('/changepassword', authMiddleware.authenticate, AdminController.changepassword)

//forget password api
router.post('/forgetpassword', authMiddleware.authenticate, AdminController.forgetpassword)



/*coupen api*/

//coupenlist api
router.post('/coupenlist', authMiddleware.authenticate, CoupenController.coupenlist)

//add-coupen api
router.post('/addcoupen', authMiddleware.authenticate, CoupenController.addcoupen)

//delete coupen
router.post('/deletecoupen', authMiddleware.authenticate, CoupenController.deletecoupen)

// update coupen
router.post('/updatecoupen', authMiddleware.authenticate, CoupenController.updatecoupen)


/* home management api */

// add section-slider
router.post('/addsectionslider', authMiddleware.authenticate, upload.single("image"), HomeManagementController.add_sectionslider)

//delete section-slider
router.post('/deletesectionslider', authMiddleware.authenticate, HomeManagementController.delete_sectionslider)

// section-sliderlist
router.post('/sectionsliderlist', authMiddleware.authenticate, HomeManagementController.sectionslider_list)

//add section-category
router.post('/addsectioncategory', authMiddleware.authenticate, HomeManagementController.add_sectioncategory)

//delete section-category
router.post('/deletesectioncategory', authMiddleware.authenticate, HomeManagementController.delete_sectioncategory)

//sectioncategory list
router.post('/sectioncategorylist', authMiddleware.authenticate, HomeManagementController.sectioncategory_list)

//add section-product
router.post('/addsectionproduct', authMiddleware.authenticate, HomeManagementController.add_sectionproduct)

//delete section-product
router.post('/deletesectionproduct', authMiddleware.authenticate, HomeManagementController.delete_sectionproduct)

//sectionproduct list
router.post('/sectionproductlist', authMiddleware.authenticate, HomeManagementController.sectionproduct_list)

//add section-brand
router.post('/addsectionbrand', authMiddleware.authenticate, HomeManagementController.add_sectionbrand)

//delete section-brand
router.post('/deletesectionbrand', authMiddleware.authenticate, HomeManagementController.delete_sectionbrand)

//sectionbrand list
router.post('/sectionbrandlist', authMiddleware.authenticate, HomeManagementController.sectionbrand_list)


module.exports = router