var config = require("../config");

function tamilController(reqBody){
    let url = config.default_tamil_spellchecker
    let bodyConfig  = config.default_tamil_spellchecker_body
    let headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    if(reqBody.service === "vikatan") {
        url = config.vikatan_spellchecker
        bodyConfig = config.vikatan_spellchecker_body
      }
    return {url, bodyConfig, headers}
}

module.exports = tamilController