export default {
  "entry": "src/app.js",
  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }]
  ],
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr"
      ]
    }
  },
  "es5ImcompatibleVersions": true,
  "ignoreMomentLocale": true,
  "html": {
    "template": "./src/app.ejs"
  },
  "publicPath": process.env.NODE_ENV === 'production' ? './ext/' : '/',
  "disableDynamicImport": false,
  "hash": false,
  "disableCSSModules": true,
  "proxy": {
    "/api": {
      "target": "http://112.74.26.228:8080",
      "changeOrigin": true
    }
  },
  "copy": [
    {
      "from": "src/config.js",
      "to": "config.js"
    }
  ]
}
