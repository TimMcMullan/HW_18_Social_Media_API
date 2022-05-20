// format timestamp, accepts timestamp and 'options' object 
const addDate = date => {
    let dateString = date.toString();

    const lastCharacter = dateString.characterAt(dateString.length -1);

    // Look up date format in mongodb 
}