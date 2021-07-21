const trim = require('../src/trim');

test('trim an object', () => {
  const obj = {
    'a': ' x y  '
  };
  const res = {
    'a': 'x y'
  };
  expect(trim.trim(obj)).toEqual(res);
});

test('trim an array', () => {
  const array = [{
    'a': ' x y  ',
    'b': [ 'c': ' 1 ' ],
    'd': 1
  }];
  const res = [{
    'a': 'x y',
    'b': [ 'c': '1' ],
    'd': 1
  }];
  expect(trim.trim(array)).toEqual(res);
});
