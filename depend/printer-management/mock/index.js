const mock = {}
require('fs').readdirSync(require('path').join(__dirname + '/')).forEach(function(file) {
  if (file.indexOf('index.js') === -1) {
	  Object.assign(mock, require('./' + file))
	}
})
module.exports = mock
