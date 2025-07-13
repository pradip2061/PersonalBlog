const express =require('express')
const {getBlog, getBlogSingle, getblogcategory} = require('../controller/GetBlogController')
const getBlogRouter = express.Router()

getBlogRouter.get('/getblog',getBlog)
getBlogRouter.get('/getblogsingle',getBlogSingle)
getBlogRouter.get('/getblogcategory',getblogcategory)
module.exports =getBlogRouter