const express = require('express')
const router = express.Router()
const protectRoute = require('../middleware/protectRoute')
const userModel = require('../Model/userModel')

const getUsers = async (req,res)=> {
    try {
        const userId =  req.user._id
        const filteredUsers = await userModel.find({ _id: { $ne: userId } }).select('-password');

        return res.json(filteredUsers)
    
    } catch (e) {
        console.log('Error in getUsers:', e.message)
        res.status(500).json({error: 'internal server Error' })
    }
}

router.get('/', protectRoute, getUsers)

module.exports = router