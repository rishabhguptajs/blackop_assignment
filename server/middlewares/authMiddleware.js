import jwt from 'jsonwebtoken'

export const isLoggedin = (req, res, next) => {
    try {
        const token = req.headers.authorization
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    } catch (error) {
        res.status(401).json({
            message: "You need to be logged in to access this route",
            success: false
        })
    }
}