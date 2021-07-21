module.exports = [
  {
    "path": "/user",
    "component": "../layouts/OAuthLayout",
    "routes": [
      {
        "path": "/user",
        "redirect": "/user/login"
      },
      {
        "path": "/user/login",
        "component": "./Account/Login"
      },
      {
        "path": "/user/logout",
        "component": "./Account/Logout"
      }
    ]
  },
  {
    "path": "/",
    "component": "../layouts/BasicLayout",
    "routes": [
      {
        "name": "menu",
        "icon": "copy",
        "path": "/website-menu",
        authority: ['portal.memu.menu'],
        "component": "./Menu/Menu"
      },
      {
        "name": "basePage",
        "icon": "copy",
        "path": "/website-basePage",
        authority: ['portal.base.menu'],
        "component": "./Content/BasePage"
      },
      {
        "name": "extraPage",
        "icon": "copy",
        "path": "/website-extraPage",
        authority: ['portal.extra.menu'],
        "component": "./Content/Page"
      },
      {
        "name": "footer",
        "icon": "copy",
        "path": "/website-footer",
        authority: ['portal.footer.menu'],
        "component": "./Content/Footer"
      },
      {
        "name": "carousels",
        "icon": "copy",
        "path": "/website-carousels",
        authority: ['portal.carousel.menu'],
        "component": "./Carousels"
      },
      // {
      //   "name": "element",
      //   "icon": "copy",
      //   "path": "/website-element",
      //   "component": "./Element/Items"
      // },
      {
        "path": "/",
        "redirect": "/website-menu"
      },
      {
        "component": "404"
      }
    ]
  }
]