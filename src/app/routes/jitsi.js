const express = require("../../../node_modules/express");
const router = express.Router();
const dataRepository = require("../data/dataRepository.js");

router.get('/getjitsiroomid/:studentPhone', (req,res) => {

  dataRepository.executeStatement(`${req.params.studentPhone}`, function(response){
    console.log(`Name is ${response.roomKey}`);
    // res.send(`Hello Mr. ${response.roomKey}`);
    res.send(response);
  })
  // res.send(`Hello World ${req.params.name}`);
});

module.exports = router;
