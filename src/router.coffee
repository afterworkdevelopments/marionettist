class Marionettist.AppRouter extends Marionette.AppRouter

  onRoute: (name, path, args) ->
    if @controller? and _.isFunction(@controller.onRoute)
      @controller.onRoute(@, name, path, args)

  _setControllerFilters: (controller)->
    if controller?
      defaultFilters =
        before: {}
        after: {}
      controller.filters = {} unless controller.filters?
      controller.filters = Marionettist._.extend(defaultFilters, controller.filters)
    controller



  _addAppRoute: (controller, route, methodName) ->
    @controller = @_setControllerFilters(controller)

    method = ()=>
      @controller.route = new Marionettist.AppRoute
        controller: @controller
        actionName: methodName
        path: route
      result = @_executeFilter @controller.filters.before, @controller
      if result != false
        @controller[methodName]()
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
        controllerMethod() if Marionettist._.isFunction(controllerMethod)
    else
      controllerMethod() if Marionettist._.isFunction(controllerMethod)
