import express from 'express'
import Post from '../models/postModel.js';
import { isLoggedin } from '../middlewares/authMiddleware.js';

const router = express.Router()

router.get('/', isLoggedin, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const posts = await Post.find()
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ _id: -1 });

        res.status(200).json({
            posts,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
});

router.post('/post/new', isLoggedin, async(req, res) => {
    try {
        const { title, content } = req.body
        if (!title || !content) {
            return res.status(400).json({
                message: 'Please fill all the required fields',
                success: false
            })
        };

        const post = Post({
            title,
            content
        });

        await post.save();

        res.status(201).json({
            data: post,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
})

export default router