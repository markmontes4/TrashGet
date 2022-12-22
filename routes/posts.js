const express = require('express');
const router = express.Router();
const Post = require('../assets/models/target');

router.post('/', (req,res) => {
  console.log(req.body);
  res.json({
    latitude: 123123,
    longitude: 34563456
   });

});

module.exports = router;