`import _ from "underscore"`
`import underscoreContrib from "underscore-contrib"`
`import s from "underscore.string"`
`import $ from "jquery"`
`import Backbone from "backbone"`
`import backbone_radio from "backbone.radio"`
`import backboneAssociations from "backbone-associations"`
`import Marionette from "backbone.marionette"`
`import i18next from "i18next"`
`import numeral from "numeral"`
`import moment from "moment"`
`import momentRange from "moment-range"`
`import momentTimezone from "moment-timezone"`
`import Env from "./env.js"`
`import Channels from "./channels.js"`
`import Location from "./location.js"`
`import Config from "./config.js"`

Marionettist = Marionette.extend()

Marionettist.Backbone = Backbone

Marionettist.Marionette = Marionette

Marionettist._ = _

Marionettist.$ = $

Marionettist.s = s

Marionettist.I18n = i18next

Marionettist.numeral = numeral

Marionettist.moment = moment

Marionettist.channels = new Channels()

Marionettist.location = new Location()

# Environment
Marionettist.env = new Env()

# Config
Marionettist.config = new Config()


# Renderer
Marionettist._.extend Marionettist.Renderer,

  render: (template, data) ->
    if Marionettist._.isFunction(template)
      return template(data)
    else
      return if template is false
      engineTemplate = @getTemplate(template)
      throw "Template #{template} was not found!" unless Marionettist._.isFunction(engineTemplate)
      engineTemplate(data)

  getTemplate: (template) ->
    lookups = Marionettist.config.templates.lookupPaths
    lookups = lookups() if Marionettist._.isFunction(lookups)
    throw "lookupPaths most be an array" unless Marionettist._.isArray(lookups)
    templates = [template, @withTemplate(template)]
    lookups = [""] if lookups.length == 0
    for lookup in lookups
      ## inserts the template at the '-1' position of the template array
      ## this allows to omit the word 'templates' from the view but still
      ## store the templates in a directory outside of the view
      ## example: "users/list/layout" will become "users/list/templates/layout"

      for path in templates
        lookupPath = @findLookupPath(lookup+path, template)
        return lookupPath if lookupPath?

  findLookupPath: (path,template)->
    engine = Marionettist.config.templates.engine
    engine = engine() if _.isFunction(engine)
    lookupPath = engine[path]
    if Marionettist.config.templates.debug is true
      console.log "Looking template: #{template} in '#{path}'"
    return lookupPath if lookupPath

  withTemplate: (string) ->
    if string?
      array = string.split("/")
      array.splice(-1, 0, "templates")
      array.join("/")


# Utils

Marionettist.Utils = Marionettist._.extend new Marionettist.Object(),

  log: (msg, color) ->
    if Marionettist.env.current().isDevelopment()
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

class Marionettist.AppRouter extends Marionettist.Marionette.AppRouter

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


    throw new Marionettist.Marionette.Error('Method "' + methodName + '" was not found on the controller') if !method
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

_show = Marionettist.Marionette.Region.prototype.show

class Marionettist.Region extends Marionettist.Marionette.Region

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

  t: (args...)->
    Marionettist.I18n.t(args...)

  formatCurrency: (amount, format = "$0,0.00")->
    Marionettist.numeral(amount).format(format)

  formatNumber: (amount, format = "0,0.00")->
    Marionettist.numeral(amount).format(format)

  formatPercentage: (amount, format = "0.00%")->
    Marionettist.numeral(amount).format(format)

  formatDate: (date, format = "DD-MM-YYYY")->
    Marionettist.moment(date).format(format)

Marionettist._.extend Marionettist.View::,

  templateHelpers: ->
    helpers = Marionettist.Views.templateHelpers
    if @viewContext?
      helpers.viewContext = @viewContext
      helpers.viewContext = @viewContext() if Marionettist._.isFunction(@viewContext)
    else
      helpers.viewContext = {}
    return helpers

# views/collection

class Marionettist.Views.Collection extends Marionettist.Marionette.CollectionView

# views/composite
class Marionettist.Views.Composite extends Marionettist.Marionette.CompositeView

# views/item

class Marionettist.Views.Item extends Marionettist.Marionette.ItemView

# views/layout

class Marionettist.Views.Layout extends Marionettist.Marionette.LayoutView

# Entities

Marionettist.Entities = new Marionettist.Object()

Marionettist.Entities.Models = new Marionettist.Object()

Marionettist.Entities.Collections = new Marionettist.Object()

# entities/models/base
class Marionettist.Entities.Models.Base extends Marionettist.Backbone.Model
# entities/models/associated
if Marionettist.Backbone.AssociatedModel
  class Marionettist.Entities.Models.Associated extends Marionettist.Backbone.AssociatedModel

# entities/collections/base
class Marionettist.Entities.Collections.Base extends Marionettist.Backbone.Collection

#=require "./controllers.coffee"
Marionettist.Controllers = new Marionettist.Object()
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

global.Marionettist = Marionettist if global?

`export default Marionettist`
