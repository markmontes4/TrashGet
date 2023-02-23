const express = require('express');
const router = express.Router();
const Post = require('../assets/models/target');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

router.post('/', upload.single('file'), async (req,res) => {
  console.log(req.body);
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    coords: req.body.coords,
    img: req.body.img
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