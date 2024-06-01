import express from 'express'
import User from '../models/userModel.js'
import cloudinary from '../config/cloudinary.js'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path'
import bcrypt from 'bcrypt'

const router = express.Router()

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 20000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('profilePicture');

const checkFileType = (file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
};

router.post('/signup', upload, async (req, res) => {
    try {
        const { email, password, name } = req.body;
        let profilePictureURL;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Please fill all the required fields',
                success: false
            });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: 'User already exists with this email',
                success: false
            });
        }

        if (req.file) {
            try {
                const { path } = req.file;
                const uploadedImage = await cloudinary.uploader.upload(path, {
                    folder: 'users/pp'
                });
                profilePictureURL = uploadedImage.secure_url;
            } catch (error) {
                return res.status(500).json({
                    message: 'Error uploading profile picture',
                    success: false
                });
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            email,
            password: hashedPassword,
            name,
            profilePictureURL
        });

        const newUser = await user.save();

        const payload = {
            user: {
                id: newUser._id
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.status(201).json({
            data: newUser,
            success: true,
            token
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
});


export default router