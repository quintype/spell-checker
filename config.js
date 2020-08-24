const fs = require('fs');  

const data = JSON.parse(fs.readFileSync("./app-config.json", {encoding: 'utf8', flag:'r'}))
module.exports = data
