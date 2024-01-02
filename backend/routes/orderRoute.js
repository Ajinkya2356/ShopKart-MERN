const express=require("express");
const { isAuthenticatedUser, authorizedRoles } = require("../middleWare/auth");
const { newOrder, singleOrder, userOrder, allOrder, updateOrder, deleteOrder } = require("../controllers/orderController");
const router=express.Router();
router.route('/order/new').post(isAuthenticatedUser,newOrder);
router.route('/order/:id').get(isAuthenticatedUser,singleOrder)
router.route('/orders/me').get(isAuthenticatedUser,userOrder)
router.route('/admin/orders').get(isAuthenticatedUser,authorizedRoles("admin"),allOrder)
router.route('/admin/order/:id').put(isAuthenticatedUser,authorizedRoles("admin"),updateOrder).delete(isAuthenticatedUser,authorizedRoles("admin"),deleteOrder);
module.exports=router