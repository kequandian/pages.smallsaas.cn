global.window = {};
import localStorage from 'mock-local-storage';
window.localStorage = global.localStorage;
window.sessionStorage = global.sessionStorage;

const token = require('../src/token');

const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ0ZW5hbnRJZCI6Ijg3NjcwODA4MjQzNzE5NzgyNCIsInVzZXJJZCI6Ijk0OTQ4NDI1MDA0OTA0ODU3NyIsImFjY291bnQiOiJ1c2VyMTIzIiwiaWF0IjoxNTI0MDI2ODY2LCJqdGkiOiI5NDk0ODQyNTAwNDkwNDg1NzciLCJzdWIiOiJ1c2VyMTIzIiwiZXhwIjoxNTI0Mjg2MDY2fQ.Y4MAoLYMiJftUrucoCHxbD9fY4Ru_d2u3LfT_WcSER9uBuFrwVCfPEA9v0gwPTIWWp7V9nrVnoRUsssNLT7Pvg';

test('getToken from sessionStorage', () => {
  window.sessionStorage.token = accessToken;
  expect(token.getToken()).toEqual(accessToken);
});

test('getToken from localStorage', () => {
  window.localStorage.token = accessToken;
  expect(token.getToken()).toEqual(accessToken);
});

test('getAccount from sessionStorage', () => {
  window.sessionStorage.token = accessToken;
  expect(token.getAccount()).toEqual('user123');
});

test('getUserId from sessionStorage', () => {
  window.sessionStorage.token = accessToken;
  expect(token.getUserId()).toEqual('949484250049048577');
});
