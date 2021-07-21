global.window = {};
import localStorage from 'mock-local-storage';
window.localStorage = global.localStorage;
window.sessionStorage = global.sessionStorage;

import { query, createRaw } from '../src/services';

test('query', () => {
  query('http://localhost/api/test').then(({ code, data, message }) => {
    console.log(code, message, data);
  }).catch(error => {
    console.log(error);
  });
  //expect(endpoint.get()).toBe('');
});

test('query with param', () => {
  query('http://localhost/api/test', {name: 'abc'}).then(({ code, data, message }) => {
    console.log(code, message, data);
  }).catch(error => {
    console.log(error);
  });
  //expect(endpoint.get()).toBe('');
});

test('createRaw headers', () => {
  createRaw('http://localhost/api/test', 'bodydata', { name: 'abc' } ).then(({ code, data, message }) => {
    console.log(code, message, data);
  }).catch(error => {
    console.log(error);
  });
  //expect(endpoint.get()).toBe('');
});
