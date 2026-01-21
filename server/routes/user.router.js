const express = require('express');
const { signup, logIn, logOut, deleteUser, changeUser } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');
const User = require('../models/user.model');

const userRouter = express.Router();


userRouter.get('/', protect, async (req, res) => {
    try {
        const users = await User.find().select("-password");
        return res.status(200).json(users);
    } catch (error) {
        console.log('error in get users', error);
    }
})

userRouter.delete('/:id', protect, deleteUser)
userRouter.put('/:id', protect, changeUser)
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
