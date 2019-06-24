var express = require('express');
var router = express.Router();
var request = require('request');

const handleResponse = (initialWords) => {
  var data = JSON.parse(initialWords);
  return data.map(word => {
    if (word['Suggestions'] !== "") return {
      'word': word['Userword'],
      'suggestions': word['Suggestions']
    };
  }).filter((element) => element);
}

/* POST checkspell listing. */
router.post('/', function(req, res) {
  var options = {
    method: 'POST',
    url: 'http://vaani.neechalkaran.com/checkspell',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: ('action=vaani&tamilwords=' + req.body.tamilwords)
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    res.send(handleResponse(body));
  });
});

/* GET checkspell listing */
router.get('/', function(req, res) {
  res.send('Unsupported operation');
});

module.exports = {router, handleResponse};
