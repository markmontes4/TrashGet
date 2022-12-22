const express = require('express');
const router = express.Router();
const Post = require('../assets/models/target');

router.post('/', async (req,res) => {
  const post = new Post ({
    title: req.body.title,
    description: req.body.description,
    coords: req.body.coords
  });

  try{
  const savedPost = await post.save()
  res.json(savedPost);
  }catch(err){
    res.json({message: err})
  }
});

module.exports = router;