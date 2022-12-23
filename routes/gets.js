const express = require('express');
const router = express.Router();
const Post = require('../assets/models/target');

router.get('/', async (req, res) => {
  try{
    const posts = await Post.find();
    res.json(posts);
  }catch(err){
    res.json({message: err});
  }
});

module.exports = router;