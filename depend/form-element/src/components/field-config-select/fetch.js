import { query } from 'kqd-utils/lib/services';

let timeout;
let currentValue;

export default function fetch(API, payload, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = payload;

  function fake() {
    query(API, payload)
      .then((response) => {
        if (currentValue === payload) {
          callback(response);
        }
      });
  }

  timeout = setTimeout(fake, 300);
}