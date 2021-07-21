const endpoint = require('../src/endpoint');

test('get default endpoint', () => {
  expect(endpoint.get()).toBe('');
});

test('set endpoint', () => {
  const url = 'http://www.muaskin.com';
  endpoint.set(url);
  expect(endpoint.get()).toBe(url);
});

test('get endpoint from window.MC.HOST', () => {
  const url = 'http://www.muaskin.com';
  window.MC = {
    HOST: url
  };
  expect(endpoint.get()).toBe(url);
});
