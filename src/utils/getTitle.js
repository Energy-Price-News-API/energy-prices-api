function getTitle(value) {
  const altTitle = value.match(/alt=\"(.*?)\"/g);
  let title = '';

  if (altTitle == null) {
    title = value;
  } else {
    title = altTitle[0].split('"')[1];
  }

  //splitting title by '...'
  const sentences = title.split('...');

  //Set will provide us with distinct values in array
  return [...new Set(sentences)][0];
}

module.exports = getTitle;
