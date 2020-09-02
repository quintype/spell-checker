var express = require("express");
var router = express.Router();
var request = require("request");
var tamilController =  require("../controller/tamil")
var getVernacularWords = require("../utils")

const handleResponse = initialWords => {
  var data = JSON.parse(initialWords);
  return data.map(word => {
    if(word["Suggestions"] === "wrong"){
      return "unsupported"
    }
    else {
      if (word["Suggestions"] !== "")
        return {
          word: word["Userword"],
          suggestions: word["Suggestions"]
        };
    }
  }).filter(element => element);
};

/* POST checkspell listing. */
router.post("/", function(req, res) {
  if(!req.body.language) {
    res.send(["unsupported"])
  }
  if(req.body.language === "tamil"){
  
   var wordsToSpellCheck = getVernacularWords(req.body.words)
   console.log("wordsToSpellCheck")
   if(!wordsToSpellCheck) {
     //in future handle support for english language spell check
     res.send(["unsupported"])
   }
   else {
     var {url, bodyConfig, headers} = tamilController(req.body)
     var options = {
      method: "POST",
      url,          
      headers,
      body: bodyConfig + wordsToSpellCheck 
    };
    request(options, function(error, response, body) {
      if (error) throw new Error(error);
      res.send(handleResponse(body));
    });
   }
  }
});

/* GET checkspell listing */
router.get("/", function(req, res) {
  res.send("Unsupported operation");
});


module.exports = { router, handleResponse };
