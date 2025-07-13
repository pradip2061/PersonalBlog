const express =require('express')
const { upload } = require('../middleware/upload')
const createBlog = require('../controller/BlogCreateController')
const createBlogRouter = express.Router()

createBlogRouter.post('/createblog',upload.single('image'),createBlog)

module.exports =createBlogRouter