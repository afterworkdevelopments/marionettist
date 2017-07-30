import Marionettist from "./core.coffee"

class AppRoute extends Marionettist.Object

  router: ()->
    @getOption("router")

  path: ()->
    @getOption("path")

  actionName: ()->
    @getOption("actionName")

  controller: ()->
    @getOption("controller")

export default AppRoute
