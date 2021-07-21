export function cartesianProduct(sets) {
  if(sets.length === 0) return [];
  let head = sets.shift();
  if (sets.length === 0) {
      return map(
          item => [item],
          head
      );
  }

  let tailProduct = cartesianProduct(sets);
  return flatMap(
      item => flatMap(
          items => [[item, ...items]],
          tailProduct
      ),
      head
  );
}

function concat(array) {
  return [].concat.apply([], array);
}

function map(fn, array) {
  return [].map.call(array, fn);
}

function flatMap(fn, array) {
  return concat(map(fn, array));
}