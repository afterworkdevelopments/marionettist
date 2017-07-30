import Marionettist from "../core.coffee"

class Base extends Marionettist.Object

  navigateTo: (route, options = {}) ->
    Marionettist.location.navigateTo route, options

  getCurrentRoute: ->
    Marionettist.location.getCurrentRoute()


export default Base
