const { Router } = require('express')
const router = new Router()
const userController = require('../controllers/userController')

// Register 
router.post('/register', userController.registerUserPost)

// Login
router.post('/login', userController.loginUserPost)

// Verify token
router.get('/verify', passport.authenticate('jwt', { session: false }),
    userController.verifyToken
)

// Not found
router.use((req, res) => {
    return res.sendStatus(404)
})

module.exports = router