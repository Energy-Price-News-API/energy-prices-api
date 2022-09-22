/**
 *
 * @param keyword the keyword to filter
 * @returns string where space is replaced by %20
 */
module.exports = function filterKeyword(keyword) {
  return keyword.replace(/\s/g, '%20');
};
