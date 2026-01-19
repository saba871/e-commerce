const express = require('express');
const { signup, logIn, logOut } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

const userRouter = express.Router();

userRouter.post('/signup', signup)
userRouter.post('/login', logIn)
userRouter.post('/logout', logOut)

userRouter.post('/autoLogin', protect, (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Not authorized' })
    }

    res.status(200).json({
        user: req.user
    })
})

module.exports = userRouter;
