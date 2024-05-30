import express from 'express'
import User from '../models/userModel.js'
import cloudinary from '../config/cloudinary.js'

const router = express.Router()

router.post('/signup', async (req, res) => {
    try {
        const { email, password, name } = req.body
        const profilePicture = req.files.profilePicture

        if (!email || !password) {
            return res.status(400).json({
                error: 'Please fill all the required fields',
                success: false
            })
        }

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({
                error: 'User already exists with this email',
                success: false
            })
        }

        const profilePictureURL = await cloudinary.v2.uploader.upload(profilePicture, {
            folder: 'users/pp'
        })

        const user = User({
            email,
            password,
            name,
            profilePictureURL
        })

        await user.save()

        res.status(201).json({
            data: user,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
            success: false
        })
    }
})


export default router