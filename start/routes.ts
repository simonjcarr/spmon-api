/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
router.get('/', async () => {
  return { hello: 'world' }
})
router.group(() => {
  router.post('register', 'UsersController.registerUser')
  router.post('login', 'UsersController.loginUser')
  router.get('auth', 'UsersController.auth')
}).prefix('api/v1/user')
