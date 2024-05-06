require('express-router-group');
const express = require('express');
const authController = require('modules/auth/controllers/authController');
const categoriesController = require('modules/category/controllers/categoriesController');
const usersController = require('modules/user/controllers/userController');
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
    router.get('/', categoriesController.index);
    router.post('/create', categoriesController.create);
    router.put('/update/:id', categoriesController.update);
    router.delete('/delete/:id', categoriesController.destroy);
})

router.group('/user', (router) => {
    router.get('/', usersController.getAllUsers);
    router.delete('/', usersController.deleteUser)
})

module.exports = router