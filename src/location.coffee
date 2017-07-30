import Marionettist from "./core.coffee"
class Location extends Marionettist.Object

  constructor: ()->

  refreshRoute: (fragment = @getCurrentRoute())->
    Marionettist.Backbone.history.loadUrl(fragment)

  navigateTo: (route, options = {}) ->
    Marionettist.Backbone.history.navigate route, options

  getCurrentRoute: ->
    frag = Marionettist.Backbone.history.fragment
    if Marionettist._.isEmpty(frag) then null else frag

  startHistory: (options= {})->
    if Marionettist.Backbone.history?
      Marionettist.Backbone.history.start(options)

export default Location
