const express = require('express');
const router = express.Router()
const Multer = require('multer')
const path = require('path')
const authMiddleware = require('../middleware/auth');

const UserController = require('../../api/controllers/UserController');

// register api
router.post('/register', authMiddleware.authenticate, UserController.register)

//send otp api
router.post('/sendotp', UserController.sendotp)

//resend otp api
router.post('/resendotp', UserController.resendotp)

//login api
router.post('/login', UserController.login)

// category data api
router.post('/categorydata', authMiddleware.authenticate, UserController.categorydata)

// product list api
router.post('/productlist', authMiddleware.authenticate, UserController.productlist)

// search and filter api
router.post('/search', authMiddleware.authenticate, UserController.search)

//add to wishlist api
router.post('/addwishlist', authMiddleware.authenticate, UserController.addwishlist)

//getwishlist api
router.post('/getwishlist', authMiddleware.authenticate, UserController.getwishlist)

//brandlist api
router.post('/brandlist', authMiddleware.authenticate, UserController.brandlist)

//discount api
router.post('/discount', authMiddleware.authenticate, UserController.discount)

//sortby api
router.post('/sortby', authMiddleware.authenticate, UserController.sortby)

//pricerange api
router.post('/pricerange', authMiddleware.authenticate, UserController.pricerange)

// brand search api
router.post('/brandsearch', authMiddleware.authenticate, UserController.brandsearch)

// add to cart api
router.post('/addtocart', authMiddleware.authenticate, UserController.addtocart)

// add address api
router.post('/addaddress', authMiddleware.authenticate, UserController.addaddress)

//delete address api
router.post('/deleteaddress', authMiddleware.authenticate, UserController.deleteaddress)

//getaddresslist api 
router.post('/getaddress', authMiddleware.authenticate, UserController.getaddresslist)

//homemanagement api
router.post('/homemanagement', authMiddleware.authenticate, UserController.homemanagement)

// cartlist apio
router.post('/cartlist', authMiddleware.authenticate, UserController.cartlist)

//check-out api
router.post('/checkout', authMiddleware.authenticate, UserController.checkout)

//orderlist api
router.post('/orderlist', authMiddleware.authenticate, UserController.orderlist)

//orderdetails api
router.post('/orderdetails', authMiddleware.authenticate, UserController.orderdetails)


module.exports = router;
