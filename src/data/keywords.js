// List of keywords.
// Keep first letter lowercase.
let keywords = [
  'green energy',
  'energy price',
  'energy prices',
  'energy firms',
  'renewable energy',
  'energy company',
  'energy tax',
  'energy bill', // new
  'energy resources', // new
  'electricity bill', // new
  'gas bill', // new
  'electricity costs', // new
  'energy', // new
  'gas prices', //new
  'petrol prices', //new
];

capitalizeKeywords()

// Capitalizes the first letter of each keyword, and adds it to the list of keywords.
function capitalizeKeywords() {
  let newKeywords = []

  for(key of keywords) {
    let newKey = key[0].toUpperCase() + key.slice(1);
    newKeywords.push(newKey);
  }
  
  keywords = keywords.concat(newKeywords)
}

module.exports = keywords;