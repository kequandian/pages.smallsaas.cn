global.window = {};
import localStorage from 'mock-local-storage';
window.localStorage = global.localStorage;
window.sessionStorage = global.sessionStorage;

import request from '../src/request';

test('request', () => {
  request('http://localhost/api/test').then(({ code, data, message }) => {
    console.log(code, message, data);
  }).catch(error => {
    console.log(error);
  });
  //expect(endpoint.get()).toBe('');
});

test('request-customer-header', () => {
  request('http://localhost/api/test', { headers: { 'Content-Type': 'text/html' } }).then(({ code, data, message }) => {
    console.log(code, message, data);
  }).catch(error => {
    console.log(error);
  });
  //expect(endpoint.get()).toBe('');
});
