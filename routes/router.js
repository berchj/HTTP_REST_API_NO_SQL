const express = require('express')
const router = express.Router()
const User = require('../models/user')
router.use(express.json())
//getting all

router.get('/', async (req,res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({
            message:error.message,
        })
    }
})

//getting one 
router.get('/:id', getUser , (req,res) => {
    res.json(res.user)
})

//creating one 
router.post('/', async (req,res)=>{
    const user = new User({
        name: req.body.name,
        email: req.body.email
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//updating one 
router.patch('/:id', getUser, async (req,res) => {
    if(req.body.name != null) res.user.name = req.body.name
    if(req.body.email != null) res.user.email = req.body.email
    if(req.body.address != null) res.user.address = req.body.address
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//deleting one
router.delete('/:id', getUser, async (req,res) => {
    try {
        await res.user.remove()
        res.json({message:'User deleted'})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

async function getUser(req,res,next){
    let user 
    try {
        user = await User.findById(req.params.id)
        if( user == null ) return res.status(500).json({message:`Can't find that user.`})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    res.user = user
    next()
}

module.exports = router