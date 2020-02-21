var express = require('express');
const {UserModel, ChatModel} = require('../db/models')
const md5 = require('blueimp-md5')
var router = express.Router();
const filter = {password: 0, __v: 0}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/register', function(req, res, next){
  const {username, password, type} = req.body
  UserModel.findOne({username}, function(error, user){
    if(user){
      res.send({code:1, msg: '用户名已经存在！'})
    }else{
      new UserModel({username, type, password:md5(password)}).save(function (error, user) {
        res.cookie('userid', user._id, {maxAge: 1000*60*60*24})
        const data = {username, type , _id: user._id}
        res.send({code: 0, data})
      })
    }
  })
})

//登录
router.post('/login', function (req, res, next) {
  const {username, password} = req.body
  UserModel.findOne({username, password: md5(password)}, filter, function (error, user) {
    if(user){
      res.cookie('userid', user._id,{maxAge: 1000*60*60*24})
      res.send({code: 0, data: user})
    }else{
      res.send({code: 1, msg: '用户名或密码不正确！'})
    }
  })
})

router.post('/update', function (req,res,next) {
  const userid = req.cookies.userid
  if (!userid) {
    return res.send({code: 1, msg: '请先登录！'})
  }
  const user = req.body
  UserModel.findByIdAndUpdate({_id: userid}, user, function (error, oldUser) {
    if (!oldUser) {
      res.clearCookie('userid')
      return res.send({code: 1, msg: '请先登录！'})
    }
    const {_id, username, type} = oldUser
    const data = Object.assign(user, {_id, username, type})
    res.send({code: 0, data})
  })
})

router.get('/user', function (req, res, next) {
  const userid = req.cookies.userid
  if (!userid) {
    res.send({code: 1, msg: '请先登录！'})
  }
  UserModel.findOne({_id: userid} ,filter, function (error, user) {
    if (user) {
      res.send({code: 0, data: user})
    }else{
      res.clearCookie('userid')
      res.send({code: 1, msg: '请先登录！'})
    }
  })
})

router.get('/userlist', function (req, res, next) {
  const {type} = req.query
  UserModel.find({type}, filter, function(error, userlist) {
    res.send({code: 0, data: userlist})
  })
})

router.get('/msglist', function (req, res, next) {
  const userid = req.cookies.userid
  UserModel.find(function (error, userDocs) {
    const users = userDocs.reduce((users, user) => {
      users[user._id] = {username: user.username, header: user.header}
      return users
    },{})
    ChatModel.find({'$or': [{from: userid},{to: userid}]}, filter, function (error, chatMsgs) {
      res.send({code: 0, data: {users, chatMsgs}})
    })
  })
})
 router.post('/readmsg', function (req, res, next) {
   const {from} = req.body
   const to = req.cookies.userid
   ChatModel.update({from, to, read: false}, {read: true}, {multi: true}, function (error, doc){
     res.send({code: 0, data: doc.nModified})
   })
 })
module.exports = router;
