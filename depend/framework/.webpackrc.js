export default {
  "entry": "src/index.js",
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
    "template": "./src/index.ejs"
  },
  "publicPath": process.env.NODE_ENV === 'production' ? './' : '/',
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
