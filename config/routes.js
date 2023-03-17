/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */


module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  'get /signup' :{view : 'signup'},
  'get /login' :{view : 'login'},
  'get /otp' : {view: 'otp'},
  'get /account' : {view : 'account'},
  'get /dashboard' : {view: 'dashboard'},
  'get /Transaction'  : {view : 'Transaction'},
  'post /signup/adduser' : 'UserController.signup',
  'post /login/loginuser' : 'UserController.loginuser',
  'post /userverification' : 'UserController.userverification',
  'get /logout/logoutuser' : 'UserController.logoutuser',
  'post /userallaccount' : 'AccountController.getallaccount',
  'post /Account/adduser' : 'AccountController.adduser',
  'post /Account/createAccount' : 'AccountController.createAccount',
  'post /Account/deleteAccount/:id' : 'AccountController.deleteAccount',
  'post /Account/updateAccount/:id' : 'AccountController.updateAccount',
  'post /Account/Transaction' : 'TransactionController.addTransaction',
  'get /Account/getTransaction/:id' : 'TransactionController.AllTransaction',
  'post /Account/EditTransaction/:id' : 'TransactionController.EditTransaction',
  'post /Account/deleteTransaction/:id' : 'TransactionController.deleteTransaction'


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
