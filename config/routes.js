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

  //this all route work for get the pages
  '/': { view: 'pages/homepage' },
  'get /signup': { view: 'signup' },
  'get /login': { view: 'login' },
  'get /AddAccount': { view: 'AddAccount' },
  'get /dashboard': { view: 'dashboard' },
  'get /tr': { view: 'transactionlist' },


  //set the user route
  'post /signup/adduser': 'UserController.signup',
  'post /login/loginuser': 'UserController.loginuser',
  'get /logout/logoutuser': 'UserController.logoutuser',


  //set the account module route
  'get /userallaccount': 'AccountController.getallaccount',
  'get /Account/getuser/:id': 'AccountController.getuser',
  'post /Account/adduser/:id': 'AccountController.adduser',
  'post /Account/createAccount': 'AccountController.createAccount',
  'get /Account/deleteAccount/:id': 'AccountController.deleteAccount',
  'get /Account/updateAccount/:id': 'AccountController.editAccount',
  'post /Account/updateAccount/:id': 'AccountController.updateAccount',
  'get /Account/defaultAccount': 'AccountController.defaultAccount',
  'get /Account/viewuser/:id': 'AccountController.viewuser',


  //set the transaction module route
  'get /Transaction/:id': 'TransactionController.viewAddTransaction',
  'post /Account/Transaction/:id': 'TransactionController.addTransaction',
  'get /Account/getTransaction/:id': 'TransactionController.AllTransaction',
  'get /Account/EditTransaction/:id': 'TransactionController.EditTransaction',
  'post /Account/EditTransaction/:id': 'TransactionController.updateTransaction',
  'get /Account/deleteTransaction/:id': 'TransactionController.deleteTransaction'


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
