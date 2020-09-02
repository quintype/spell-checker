function isUnicode(word) {
    const match = word.match(/[^\u0000-\u007F]+/); // eslint-disable-line no-control-regex
    return match && match[0];
};
  
function getVernacularWords(str){
    return str
    .split(" ")
    .filter(Boolean)
    .map(isUnicode)
    .join("|")
};

module.exports = getVernacularWords