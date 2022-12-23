const express = require('express');
const router = express.Router();
const Post = require('../assets/models/target');

router.post('/', async (req,res) => {
  console.log(req.body);
  const post = new Post({
    title: "Test Title",
    description: "Test Description",
    coords: [req.body.lat, req.body.lng]
  });
  console.log(post);
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  }catch(err){
    res.json({message: err});
  }

});

module.exports = router;