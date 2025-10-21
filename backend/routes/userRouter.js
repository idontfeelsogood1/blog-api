const { Router } = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const passport = require('passport')

// Register 
router.post('/register', userController.registerUserPost)

// Login
router.post('/login', userController.loginUserPost)

// Verify token
router.get('/verify', passport.authenticate('jwt', { session: false }),
    userController.verifyTokenGet
)

// PROTECTED ROUTE 
router.use(passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        if (!req.user) {
            return res.sendStatus(401)
        } else if (!req.user.isWriter) {
            return res.sendStatus(403)
        }
        next()
    }
)

// Get all user
router.get('/', userController.allUserGet)

// Delete user
router.delete('/delete/:userId', userController.userDelete)

// Not found
router.use((req, res) => {
    return res.sendStatus(404)
})

module.exports = router