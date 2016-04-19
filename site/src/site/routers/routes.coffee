SiteRouter = require("./site.coffee")
SiteController = require("../controllers/site.coffee")


Routes =
  routers:
    site:
      routerClass: SiteRouter
      controllerClass: SiteController
      options: {}

  start: (options = {})->
    routers = []
    Marionettist._.mapObject @routers, (route, name)=>
      unless route.options.controller?
        route.options.controller = new route.controllerClass(options)
      router = new route.routerClass(route.options)
      routers.push router
    routers

module.exports = Routes
