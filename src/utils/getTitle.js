function getTitle(value) {
  const altTitle = value.match(/alt=\"(.*?)\"/g);
  if (altTitle == null) return value;

  return altTitle[0].split('"')[1];
}

module.exports = getTitle;
