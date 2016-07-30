`import Marionettist from "./core.js"`

class Application extends Marionettist.Application

  Controllers: new Marionettist.Object()

  Entities: new Marionettist.Object()

  Views: new Marionettist.Object()

  _isRunning: false

  _isDestroyed: false

  preventDestroy: false

  startAfterInitialized: false

  startWithParent: false

  stopWithParent: true

  resources: []

  constructor: (options)->
    super(options)
    @_initChildApps(options)
    if Marionettist._.result(@, 'startAfterInitialized')
      @start(options)

  startHistory: (options= {})->
    Marionettist.location.startHistory(options) if not Marionettist.Backbone.History.started

  start: (options) ->
    @triggerMethod "before:resources:fetch", options
    Marionettist.utils.waitFor @resources,
      success: =>
        super(options)
        @triggerMethod "resources:fetch:success"
      error: =>
        @triggerMethod "resources:fetch:error"


  isRunning: ()->
    return @_isRunning

  # TODO
  stop: (options) ->
    if !@_isRunning
      return @
    @triggerMethod('before:stop', options)
    @_isRunning = false
    @triggerMethod('stop', options)
    return @

  _initChildApps: ->
    options = if arguments.length <= 0 or arguments[0] == undefined then {} else arguments[0]
    @_childApps = {}
    @mergeOptions options, [
      'childApps',
      'childAppOptions'
    ]
    childApps = @childApps
    if childApps
      if Marionettist._.isFunction(childApps)
        childApps = childApps.call(@, options)
      @addChildApps childApps
    @_initListeners()
    return

  _initListeners: ->
    @on
      'start': @_startChildApps
      'before:stop': @_stopChildApps
      'before:destroy': @_destroyChildApps
    return

  _startChildApps: (options)->
    Marionettist._.each @_childApps, (childApp) ->
      if Marionettist._.result(childApp, 'startWithParent')
        childApp.start(options)

  _stopChildApps: (options)->
    Marionettist._.each @_childApps, (childApp) ->
      if Marionettist._.result(childApp, 'stopWithParent')
        childApp.stop(options)

  _destroyChildApps: (options)->
    Marionettist._.each @_childApps, (childApp) ->
      if !Marionettist._.result(childApp, 'preventDestroy')
        childApp.destroy(options)

  _buildAppFromObject: (appConfig) ->
    AppClass = appConfig.AppClass
    options = Marionettist._.omit(appConfig, 'AppClass')
    @buildApp AppClass, options

  _buildApp: (AppClass, options) ->
    if Marionettist._.isFunction(AppClass)
      return @buildApp(AppClass, options)
    if Marionettist._.isObject(AppClass)
      return @_buildAppFromObject(AppClass)


  buildApp: (AppClass, options) ->
    # options on childApp definition supersede childAppOptions
    options = Marionettist._.extend({}, @childAppOptions, options)
    new AppClass(options)

  _ensureAppIsUnique: (appName) ->
    if @_childApps[appName]
      throw new (Marionette.Error)(
        name: 'DuplicateChildAppError'
        message: 'A child App with name "' + appName + '" has already been added.')

  addChildApps: (childApps) ->
    Marionettist._.each childApps, ((childApp, appName) ->
      @addChildApp appName, childApp
      return
    ), @

  addChildApp: (appName, AppClass, options) ->
    @_ensureAppIsUnique appName
    childApp = @_buildApp(AppClass, options)
    if !childApp
      throw new (Marionette.Error)(
        name: 'AddChildAppError'
        message: 'App build failed.  Incorrect configuration.')
    childApp._name = appName
    @_childApps[appName] = childApp
    # When the app is destroyed remove the cached app.
    childApp.on 'destroy', Marionettist._.partial(@_removeChildApp, appName), @
    if @isRunning() and Marionettist._.result(childApp, 'startWithParent')
      childApp.start()
    childApp

  getName: ->
    @_name

  getChildApps: ->
    Marionettist._.clone @_childApps

  getChildApp: (appName) ->
    @_childApps[appName]

  _removeChildApp: (appName) ->
    delete @_childApps[appName]._name
    delete @_childApps[appName]
    return

  removeChildApps: ->
    childApps = @getChildApps()
    Marionettist._.each @_childApps, ((childApp, appName) ->
      @removeChildApp appName
      return
    ), @
    childApps

  removeChildApp: (appName, options) ->
    options = Marionettist._.extend({}, options)
    childApp = @getChildApp(appName)
    if !childApp
      return
    # if preventDestroy simply unregister the child app
    if options.preventDestroy or Marionettist._.result(childApp, 'preventDestroy')
      @_removeChildApp appName
    else
      childApp.destroy()
    childApp
    
  # TODO
  destroy: ->




`export default Application`
