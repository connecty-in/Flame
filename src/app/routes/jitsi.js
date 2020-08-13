const express = require("../../../node_modules/express");
const router = express.Router();
const dataRepository = require("../data/dataRepository.js");

router.get('/getjitsiroomid/:studentPhone', (req,res) => {

  dataRepository.executeStatement(`${req.params.studentPhone}`, function(name){
    console.log(`Name is ${name}`);
    res.send(`Hello Mr. ${name}`);
  })
  // res.send(`Hello World ${req.params.name}`);
});

module.exports = router;
