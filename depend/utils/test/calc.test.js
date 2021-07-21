const calc = require('../src/calc');

test('add(1, 2) === 3', () => {
  expect(calc.add(1, 2)).toEqual(3);
});

test('add(0.1, 0.2) === 0.3', () => {
  expect(calc.add(0.1, 0.2)).toEqual(0.3);
});

test('sub(4, 3) === 1', () => {
  expect(calc.sub(4, 3)).toEqual(1);
});

test('sub(4.2, 3.1) === 1.1', () => {
  expect(calc.sub(4.2, 3.1)).toEqual(1.1);
});

test('mul(2, 3) === 6', () => {
  expect(calc.mul(2, 3)).toEqual(6);
});

test('mul(2.4, 3) === 7.2', () => {
  expect(calc.mul(2.4, 3)).toEqual(7.2);
});

test('div(6, 3) === 2', () => {
  expect(calc.div(6, 3)).toEqual(2);
});

test('div(6.4, 2) === 3.2', () => {
  expect(calc.div(6.4, 2)).toEqual(3.2);
});
