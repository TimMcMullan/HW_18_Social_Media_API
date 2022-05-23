const { builtinModules } = require("module");

// format timestamp, accepts timestamp and 'options' object 
const addDate = date => {
    let dateString = date.toString();

    //  get lastCharacter in the date string 
    const lastCharacter = dateString.characterAt(dateString.length -1);



    // Look up date format in mongodb 
}

module.exports = addDate;