export default {
  "proxy": {
    "/api": {
      "target": "https://www.muaskin.com",
      "changeOrigin": true,
    },
    "/auth": {
      "target": "https://www.muaskin.com",
      "changeOrigin": true,
    },
    "/rest": {
      "target": "https://www.muaskin.com",
      "changeOrigin": true,
    },
  },
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
  "publicPath": process.env.NODE_ENV === 'production' ? './' : '/',
  "disableDynamicImport": true,
  "hash": true,
  "disableCSSModules": true
}
