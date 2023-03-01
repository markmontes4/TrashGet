const express = require('express');
const router = express.Router();
const Post = require('../assets/models/target');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const https = require('https');
const fs = require('fs');

function saveImg(data, path){
  var dataString = data.split(",", 2);
  var img64 = dataString[1];
  var buffer = Buffer.from(img64, "base64");
  fs.writeFileSync(path, buffer, function(err){
    if(err){
      console.log(err);
    }else{
      console.log("created file success");
    }
  });
}

router.post('/', async (req,res) => {
  console.log(req.body);
  var path1 = "public/uploads/" + req.body.coords[0] + "_" + req.body.coords[1] + ".png"
  var path2 = "uploads/" + req.body.coords[0] + "_" + req.body.coords[1] + ".png"
  saveImg(req.body.img, path1);
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    coords: req.body.coords,
    img: path2
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