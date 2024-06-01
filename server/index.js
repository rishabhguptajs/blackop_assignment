import express, { json } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import rateLimit from 'express-rate-limit';
import connectDb from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import postRoutes from './routes/postRoutes.js'

dotenv.config()
connectDb()

const app = express()
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many requests from this IP, please try again later',
});

app.use(json())
app.use(cors())
app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})