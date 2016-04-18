Marionettist = Marionette.extend()

Marionettist.Backbone = Backbone

Marionettist.Marionette = Marionette

Marionettist._ = _

Marionettist.$ = $

Marionettist.s = s

Marionettist.I18n = i18next

Marionettist.numeral = numeral

Marionettist.moment = moment


Marionettist.channels =

  request: (channelName = "global", eventName = "", data={})->
    return Marionettist.Backbone.Radio.channel(channelName).request(eventName,data)

  replyOnce: (channelName = "global", eventName = "", callback)->
    channel = Marionettist.Backbone.Radio.channel(channelName)
    if Marionettist._.isFunction(callback)
      return channel.replyOnce(eventName, callback)
    else
      return channel.replyOnce(callback)

  reply: (channelName = "global", eventName = "", callback)->
    channel = Marionettist.Backbone.Radio.channel(channelName)
    if Marionettist._.isFunction(callback)
      return channel.reply(eventName, callback)
    else
      return channel.reply(callback)

  publish: (channelName = "global", eventName = "", data ={})->
    return Marionettist.Backbone.Radio.channel(channelName).trigger eventName, data

  subscribe: (channelName = "global", eventName = "", callback)->
    return Marionettist.Backbone.Radio.channel(channelName).on eventName, callback


Marionettist.location =

  refreshRoute: (fragment = @getCurrentRoute())->
    Backbone.history.loadUrl(fragment)

  navigateTo: (route, options = {}) ->
    Marionettist.Backbone.history.navigate route, options

  getCurrentRoute: ->
    frag = Marionettist.Backbone.history.fragment
    if Marionettist._.isEmpty(frag) then null else frag

  startHistory: (options= {})->
    if Marionettist.Backbone.history?
      Marionettist.Backbone.history.start(options)

      
# Environment

class Marionettist.Env

  @current: ->
    @_current or= new Env

  constructor: ()->
    @stage = "development"

  isDevelopment: ->
    @stage == "development"

  isProduction: ->
    @stage == "production"

  getLocale: ()->
    Marionettist.I18n.language


  setLocale: (locale = "en", callback = null)->
    oldLocale = @getLocale()
    Marionettist.I18n.changeLanguage locale, (t) ->
      Marionettist.channels.publish "marionettist", "change:locale",
        currentLocale: locale
        oldLocale: oldLocale

      callback(t) if Marionettist._.isFunction(callback)

# Config
Marionettist.Config = new Marionettist.Object()

class Templates extends Marionettist.Object

  lookupPaths: ["templates/"]

  engine: ->
    engine = {}
    if root.HAML?
      engine = HAML
    if root.JST?
      engine = JST
    return engine

Marionettist.Config.options.templates = new Templates()

# Renderer
_.extend Marionettist.Renderer,

  render: (template, data) ->
    if _.isFunction(template)
      return template(data)
    else
      return if template is false
      path = @getTemplate(template)
      throw "Template #{template} not found!" unless path
      path(data)

  getTemplate: (template) ->
    lookups = Marionettist.Config.getOption("templates").getOption("lookupPaths")
    lookups = lookups() if _.isFunction(lookups)
    throw "lookupPaths most be an array" unless _.isArray(lookups)
    for lookup in lookups
      ## inserts the template at the '-1' position of the template array
      ## this allows to omit the word 'templates' from the view but still
      ## store the templates in a directory outside of the view
      ## example: "users/list/layout" will become "users/list/templates/layout"

      for path in [template, @withTemplate(template)]
        engine = Marionettist.Config.getOption("templates").getOption("engine")
        engine = engine() if _.isFunction(engine)
        return engine[lookup + path] if engine[lookup + path]

  withTemplate: (string) ->
    if string?
      array = string.split("/")
      array.splice(-1, 0, "templates")
      array.join("/")


# Utils

Marionettist.Utils = Marionettist._.extend new Marionettist.Object(),

  log: (msg, color) ->
    if Marionettist.Env.current().isDevelopment()
      color = color or 'black'
      bgc = 'White'
      switch color
        when 'success'
          color = 'Green'
          bgc = 'LimeGreen'
        when 'info'
          color = 'DodgerBlue'
          bgc = 'Turquoise'
        when 'error'
          color = 'Red'
          bgc = 'Black'
        when 'start'
          color = 'OliveDrab'
          bgc = 'PaleGreen'
        when 'warning'
          color = 'Tomato'
          bgc = 'Black'
        when 'end'
          color = 'Orchid'
          bgc = 'MediumVioletRed'
        else
          color = color
      bgc = 'White'
      if typeof msg == 'object'
        console.log msg
      else
        console.log '%c' + msg, 'color:' + color + ';font-weight:bold; background-color: ' + bgc + ';'
    return

  waitFor: (ajaxRequests, options = {}) ->
    xhrs = []
    xhrs= _.chain([ajaxRequests]).flatten().value()
    Marionettist.$.when(xhrs...).then (->
      options.success() if Marionettist._.isFunction(options.success)
      ), (error)->
        options.error() if Marionettist._.isFunction(options.error)

# Route

class Marionettist.AppRoute extends Marionettist.Object

  router: ()->
    @getOption("router")

  path: ()->
    @getOption("path")

  actionName: ()->
    @getOption("actionName")

  controller: ()->
    @getOption("controller")

# Router

class Marionettist.AppRouter extends Marionette.AppRouter

  onRoute: (name, path, args) ->
    if @controller? and _.isFunction(@controller.onRoute)
      @controller.onRoute(@, name, path, args)

  _setControllerFilters: (controller)->
    if controller?
      defaultFilters =
        before: {}
        after: {}
      filters = controller.filters
      filters = filters() if Marionettist._.isFunction(filters)
      controller.filters = {} unless controller.filters?
      controller.filters = Marionettist._.extend(defaultFilters, filters)
    controller



  _addAppRoute: (controller, route, methodName) ->
    @controller = @_setControllerFilters(controller)
    _method = controller[methodName]

    method = (args)=>
      @controller.route = new Marionettist.AppRoute
        controller: @controller
        actionName: methodName
        path: route
      result = @_executeFilter @controller.filters.before, @controller
      if result != false
        @controller[methodName].apply(@controller, @_getParams())
        @_executeFilter @controller.filters.after, @controller


    throw new Marionette.Error('Method "' + methodName + '" was not found on the controller') if !method
    @route(route, methodName, _.bind(method, controller))


  _executeFilter: (filter, controller)->
    result = true
    for methodName in _.keys(filter)
      filterValue = filter[methodName]
      stopMsg = "Action halted by filter '#{methodName}'"
      switch
        when Marionettist._.isFunction(filterValue)
          result = filterValue(controller)
          if result == false
            console?.warn stopMsg
            break
        when Marionettist._.isObject(filterValue)
          result = @_proccessFilterObject(methodName,filterValue, controller)
          if result == false
            console?.warn stopMsg
            break
    result

  _getParams: ()->
    route = @_routeToRegExp(@controller.route.getOption("path"))
    params = @_extractParameters(route, Backbone.history.getFragment())

  _proccessFilterObject: (methodName,filter, controller)->
    defaultFilterOptions =
      method: null
      only: []
      except: []
    filterOptions = Marionettist._.extend(defaultFilterOptions, filter)
    controllerMethod = controller[methodName]
    actionName = controller.route.actionName()

    throw "filter option only, most be an array" unless _.isArray(filterOptions.only)
    throw "filter option except, most be an array" unless _.isArray(filterOptions.except)

    if filterOptions.only.length > 0 or filterOptions.except.length > 0
      if Marionettist._.contains(filterOptions.only, actionName) and !Marionettist._.contains(filterOptions.except, actionName)
        controllerMethod.apply(@controller, @_getParams()) if Marionettist._.isFunction(controllerMethod)
    else
      controllerMethod.apply(@controller, @_getParams()) if Marionettist._.isFunction(controllerMethod)


#  Region

_show = Marionette.Region.prototype.show

class Marionettist.Region extends Marionette.Region

  show: (view, options)->
    options = options || {}
    oldView = @currentView
    showCurrentView = =>
      args = [view, Marionettist._.extend(options, { preventDestroy: true })]
      _show.apply(@,  args)
      if !options.preventDestroy
        oldView.destroy()
    if oldView? and Marionettist._.isFunction(oldView.onHide)
      oldView.onHide(showCurrentView, @)
    else
      showCurrentView()

# Views

Marionettist.Views = new Marionettist.Object()

Marionettist.Views.templateHelpers =

  t: Marionettist.I18n.t

  formatCurrency: (amount, format = "$0,0.00")->
    Marionettist.numeral(amount).format(format)

  formatNumber: (amount, format = "0,0.00")->
    Marionettist.numeral(amount).format(format)

  formatPercentage: (amount, format = "0.00%")->
    Marionettist.numeral(amount).format(format)

  formatDate: (date, format = "DD-MM-YYYY")->
    Marionettist.moment(date).format(format)

_.extend Marionettist.View::,

  templateHelpers: ->
    helpers = Marionettist.Views.templateHelpers
    if @viewContext?
      helpers.viewContext = @viewContext
      helpers.viewContext = @viewContext() if Marionettist._.isFunction(@viewContext)
    else
      helpers.viewContext = {}
    return helpers

# views/collection

class Marionettist.Views.Collection extends Marionette.CollectionView

# views/composite
class Marionettist.Views.Composite extends Marionette.CompositeView

# views/item

class Marionettist.Views.Item extends Marionette.ItemView

# views/layout

class Marionettist.Views.Layout extends Marionette.LayoutView

# Entities

Marionettist.Entities = new Marionettist.Object()

Marionettist.Entities.Models = new Marionettist.Object()

Marionettist.Entities.Collections = new Marionettist.Object()

# entities/models/base
class Marionettist.Entities.Models.Base extends Backbone.Model
# entities/models/associated
if Backbone.AssociatedModel
  class Marionettist.Entities.Models.Associated extends Backbone.AssociatedModel

# entities/collections/base
class Marionettist.Entities.Collections.Base extends Backbone.Collection

#=require "./controllers.coffee"

class Marionettist.Controllers.Base extends Marionettist.Object




Marionettist.Application = Marionettist.Application.extend

  Backbone: Marionettist.Backbone

  Marionette: Marionettist.Marionette

  _: Marionettist._

  $: Marionettist.$

  s: Marionettist.s

  I18n: Marionettist.I18n

  numeral: Marionettist.numeral

  moment: Marionettist.moment

  Controllers: new Marionettist.Object()

  Entities: new Marionettist.Object()

  Views: new Marionettist.Object()

  navigateTo: (route, options = {}) ->
    Marionettist.location.navigateTo route, options

  getCurrentRoute: ->
    Marionettist.location.getCurrentRoute()

  startHistory: (options= {})->
    Marionettist.location.startHistory(options)

  register: (instance, id) ->
    @_registry ?= {}
    @_registry[id] = instance

  unregister: (instance, id) ->
    delete @_registry[id]

  resetRegistry: ->
    oldCount = @getRegistrySize()
    for key, controller of @_registry
      controller.region.close()
    msg = "There were #{oldCount} controllers in the registry, there are now #{@getRegistrySize()}"
    if @getRegistrySize() > 0 then console.warn(msg, @_registry) else console.log(msg)

  getRegistrySize: ->
    Marionettist._.size @_registry


`export default Marionettist`
