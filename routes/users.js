var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
const authenticate = require('../authenticate/Authentication')
require('dotenv').config();

let USER = require('../model/User.model');

router.get('/try',authenticate,(req,res,next)=>{
   
  res.json({ status : 'valid user' });
})
/* GET users listing. */
router.post('/signup',async(req, res, next)=> {
    try {
      let { ...body } = req.body;
      
      body.password = USER.encryptPassword(body.password)
      let user = await USER.findOne({ where:{ email : body.email }}); 
      if(user)
      {
        res.status(200).json({ 'message':'Vendor is All ready Registered'});
      }
      else{
        let user =  await USER.create(body); 
        res.status(201).json({'message':"user registed Succesfully"});
      }
    } catch (error) {
      console.log('Error in try-catch -- >',error);
    }
  });
  
router.post('/signin',async(req,res,next)=>{
    try {
      let { ...body} = req.body;
      let user = await USER.findOne({ where : { email : body.email }});
      if(user)
      {
          if(USER.validatePassword(body.password,user))
          {          
            const token = jwt.sign({ user : user.id },process.env.SECRET,{expiresIn: 900});
            let { password, ...newUser} = user.dataValues;
            newUser.token = token;
            res.status(200).json(newUser);
          }
          else{
            res.json({ message : 'Invalid Password'});
          }
        }
      else{
       
        res.json({ message : 'Unauthorised user'});
      }
    } catch (error) {
      console.log(error);
    }
  
  })


router.get('/read',async(req,res,next)=>{
  try {
          let user = await USER.findAll();
          res.status(200).json(user);
  } catch (error) {
      console.log(error);
  }
})

router.put('/update/:id',async(req,res,next)=>{
  try {
          let {...body} = req.body;
          let {...param} = req.param;
          let user = await USER.findOne({where :{ id : param.id}})
          if(user){
              user = await USER.update(body,{where : { id:param.id}});
              res.status(200).json({'message':'User updated succesfully'});
          }
          else{
              res.status(200).json({'message':'User is Not Available'});
          }
  } catch (error) {
      console.log(error);
  }
})

router.delete('/delete/:id',async(req,res,next)=>{
  try {
          let {...param} = req.param;
          let user = await USER.findOne({where :{ id : param.id}});
          if(user){
              let result = await USER.distroy({where :{ id : param.id}});
              res.status(200).json({'message':"User Deleted succesfully"});
          }
  } catch (error) {
      console.log(error);
  }
})

module.exports = router;
