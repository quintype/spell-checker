var express = require("express");
var router = express.Router();
var request = require("request");
var config = require("../config.js");

const handleResponse = initialWords => {
  var data = JSON.parse(initialWords);
  return data
    .map(word => {
      if (word["Suggestions"] !== "")
        return {
          word: word["Userword"],
          suggestions: word["Suggestions"]
        };
    })
    .filter(element => element);
};

/* POST checkspell listing. */
router.post("/", function(req, res) {
  let url = config.default_tamil_spellchecker
  let body_config = config.default_tamil_spellchecker_body
  if(req.body.service === "vikatan") {
    url = config.vikatan_spellchecker
    bodyConfig = config.vikatan_spellchecker_body
  }
  var options = {
    method: "POST",
    url,          
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: bodyConfig + req.body.words 
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    res.send(handleResponse(body));
  });
});

/* GET checkspell listing */
router.get("/", function(req, res) {
  res.send("Unsupported operation");
});

module.exports = { router, handleResponse };
