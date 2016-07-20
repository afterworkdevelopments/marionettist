`import Marionettist from "./core.js"`

class AppRouter extends Marionettist.AppRouter

  onRoute: (name, path, args) ->
    if @controller? and Marionettist._.isFunction(@controller.onRoute)
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
    @route(route, methodName, Marionettist._.bind(method, controller))


  _executeFilter: (filter, controller)->
    result = true
    for methodName in Marionettist._.keys(filter)
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
    params = @_extractParameters(route, Marionettist.Backbone.history.getFragment())

  _proccessFilterObject: (methodName,filter, controller)->
    defaultFilterOptions =
      method: null
      only: []
      except: []
    filterOptions = Marionettist._.extend(defaultFilterOptions, filter)
    controllerMethod = controller[methodName]
    actionName = controller.route.actionName()

    throw "filter option only, most be an array" unless Marionettist._.isArray(filterOptions.only)
    throw "filter option except, most be an array" unless Marionettist._.isArray(filterOptions.except)

    if filterOptions.only.length > 0 or filterOptions.except.length > 0
      if Marionettist._.contains(filterOptions.only, actionName) and !Marionettist._.contains(filterOptions.except, actionName)
        controllerMethod.apply(@controller, @_getParams()) if Marionettist._.isFunction(controllerMethod)
    else
      controllerMethod.apply(@controller, @_getParams()) if Marionettist._.isFunction(controllerMethod)

`export default AppRouter`
