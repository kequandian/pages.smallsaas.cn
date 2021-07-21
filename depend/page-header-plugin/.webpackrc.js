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
  "ignoreMomentLocale": true,
  "html": {
    "template": "./src/app.ejs"
  },
  "publicPath": "/",
  "disableDynamicImport": true,
  "hash": true,
  "disableCSSModules": true,
  "proxy": {
    "/api": {
      "target": "http://112.74.26.228:8080",
      "changeOrigin": true
    }
  }
}
