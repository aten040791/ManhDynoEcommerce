require('express-router-group');
const express = require('express');
const authController = require('modules/auth/controllers/authController');
const categoriesController = require('modules/category/controllers/categoriesController');
const userController = require('modules/user/controllers/userController');
const router = express.Router({mergeParams: true})

//Single routing
//Format: router.get(path, middlewareArray: optional = [], controllerAction)
router.get('/helloworld', authController.helloWorld);

/** 
 * Nested routing
 * Format: router.group(path, middlewareArray: optional = [], (router) => {
 *      router.get(path, controllerAction)
 * })
 */
router.group('/categories', (router) => {
    router.get('/', categoriesController.index)
})

router.group('/user', (router) => {
    router.get('/', userController.index);
    router.delete('/', userController.destroy);
})

module.exports = router