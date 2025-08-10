const express =require('express')
const {getBlog, getBlogSingle, getblogcategory, viewscalc} = require('../controller/GetBlogController')
const checkToken = require('../middleware/CheckAuth')
const getBlogRouter = express.Router()

getBlogRouter.get('/getblog',getBlog)
getBlogRouter.get('/getblogsingle',getBlogSingle)
getBlogRouter.get('/getblogcategory',getblogcategory)
getBlogRouter.post('/views',checkToken,viewscalc)
module.exports =getBlogRouter