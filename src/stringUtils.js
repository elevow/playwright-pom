// stringUtils.js
const pascalCase = (str) =>
    str
        .replace(/[^a-zA-Z0-9]/g, " ") // Replace non-alphanumeric characters with spaces
        .split(" ")
        .filter((word) => word.trim().length > 0) // Remove empty words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
        .join("");

// Helper function to convert strings to camelCase
const camelCase = (str) =>
    str
        .toLowerCase()
        .replace(/[_-\s](.)/g, (_, char) => char.toUpperCase()) // Handle _, -, and space
        .replace(/^\w/, (c) => c.toLowerCase()); // Ensure the first character is lowercase

// Function to generate meaningful and descriptive variable names
const getDescriptiveName = (el) => {
    // innerText can be very long and may not be suitable for variable names
    // Uncomment the following line if you want to use innerText
    // Future enhancement: Truncate the text to a reasonable length
    // Future enhancement: Use machine learning to generate more descriptive names
    // console.log('el', el.match(/'(.*?)'/gm))
    const value = [];
    for (const item of el.match(/'(.*?)'/gm)) {
        let transformItem = item.replace(/\n|\-|\'|\.|\,|\<|\>|:|\/|\(|\)|\•|\,|\|?/gm, '')
            .replace(/\[id=\"|\"]/gm, '')
            .replace(/\s+/gm, '-')
            .substring(0, 15)
        value.push(transformItem);
    }
    // console.log('value', value)
    const descName = value.join('-');
    // console.log('descName', descName)
    const camelCaseDescName = camelCase(descName);
    // console.log('camelCaseDescName', camelCaseDescName)
    return camelCaseDescName.replace(/\n|\-|\'|\,|\|?/gm, '');
}

module.exports = { pascalCase, camelCase, getDescriptiveName };