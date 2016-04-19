`import Marionettist from "../core.js"`

class Base extends Marionettist.Object

  navigateTo: (route, options = {}) ->
    Marionettist.location.navigateTo route, options

  getCurrentRoute: ->
    Marionettist.location.getCurrentRoute()


`export default Base`
