var express = require('express');
var router = express.Router();
let USER = require('../model/User.model');

/* GET users listing. */
router.post('/signup',async(req, res, next)=> {
    try {
      let { ...body } = req.body;
      
      body.password = User.encryptPassword(body.password)
      let user = await User.findOne({ where:{ email : body.email }}); 
      if(user)
      {
        res.json({ 'message':'Vendor '+body.name+' is All ready Registered'});
      }
      else{
        let user =  await User.create(body); 
        res.status(200).json({'message':"user registed Succesfully"});
      }
    } catch (error) {
      console.log('Inside Catch Block',error)
    }
  });
  
router.post('/signin',async(req,res,next)=>{
    try {
      let { ...body} = req.body;
      let user = await User.findOne({ where : { email : body.email }});
      if(user)
      {
          if(User.validatePassword(body.password,user))
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
