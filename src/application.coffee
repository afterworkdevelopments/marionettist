import Marionettist from "./core.coffee"

class Application extends Marionettist.Marionette.Toolkit.App

  Controllers: new Marionettist.Object()

  Entities: new Marionettist.Object()

  Views: new Marionettist.Object()

  _isRunning: false

  _isDestroyed: false

  preventDestroy: false

  startAfterInitialized: false

  startWithParent: false

  stopWithParent: true

  constructor: (options)->
    @resources = []
    super(options)

  startHistory: (options= {})->
    Marionettist.location.startHistory(options) if not Marionettist.Backbone.History.started

  start: (options) ->
    @triggerMethod "before:resources:fetch", options
    @resources = [] if not @resources?
    Marionettist.utils.waitFor @resources,
      success: =>
        super(options)
        @triggerMethod "resources:fetch:success"
        @triggerMethod "ready"
      error: =>
        @triggerMethod "resources:fetch:error"







export default Application
