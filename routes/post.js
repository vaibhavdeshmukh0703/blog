var express = require('express');
var router = express.Router();
const POST = require('../model/Post.model');

router.get('/getPosts', async(req,res,next) =>{
  try {
    const posts = await POST.findAll();
    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ 'error': "Notes not found" });
    }
  } catch (error) {
    console.log(error)
  }
});

router.post('/addPosts',async(req,res,next)=>{
  try {
    const {...body} = req.body;
    const post = await POST.create(body);
    res.status(200).json({"message":"Post Created"});
  } catch (error) {
    console.log(error);
  }
})

router.get('/getPostByTitle/:title',async(req,res,next)=>{
  try {
    let {...params} = req.params;
    const post = await POST.findOne({where:{title :params.title}});
    res.status(200).json(post)
  } catch (error) {
    console.log(error);
  }
});

router.put('/updatePost/:title',async(req,res,next)=>{
  try {
      let {...body} = req.body;
      let {...params} = req.params;
      const post = await POST.update(body,{where:params.title});
      res.status(200).json({"message":"POst updated sucesfully"});
  } catch (error) {
    res.status(404).send(error);
  }
})

router.delete('/deletePost/:title',async(req,res,next)=>{
  try {
    let {...params} = req.params;
    const post = await POST.destroy({where : params.id})
    res.status(200).json({"message":"Post Deleted Succesfuly"});
    
  } catch (error) {
    res.status(404).send(error);
  }
})
module.exports = router;
