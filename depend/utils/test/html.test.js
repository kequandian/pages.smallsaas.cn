const html = require('../src/html');

test('trip html tags', () => {
  const str = '<p>very good.</p><p style="color: red">bye.</p>';
  expect(html.stripHtmlTag(str)).toEqual('very good.bye.');
});
