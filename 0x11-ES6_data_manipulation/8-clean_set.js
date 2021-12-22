export default function cleanSet(set, startString) {
  if (!set || !startString || !(typeof startString === 'string')) {
    return '';
  }

  function isStr(word) {
    return word !== '' && (typeof word === 'string');
  }

  const cleanSet = [];

  [...set].forEach((word) => {
    if (isStr(word) && word.startsWith(startString)) {
      cleanSet.push(word.replace(startString, ''));
    }
  });
  return cleanSet.join('-');
}
