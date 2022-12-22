const express = require('express');
const router = express.Router();
const Post = require('../assets/models/target');

router.post('/', (req,res) => {
  console.log(req.body);
  res.json({
    latitude: req.lat,
    longitude: req.lon
   });

});

module.exports = router;