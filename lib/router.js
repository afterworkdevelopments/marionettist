import Marionettist from "./core.js";
var AppRouter,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

AppRouter = (function(superClass) {
  extend(AppRouter, superClass);

  function AppRouter() {
    return AppRouter.__super__.constructor.apply(this, arguments);
  }

  AppRouter.prototype.onRoute = function(name, path, args) {
    if ((this.controller != null) && Marionettist._.isFunction(this.controller.onRoute)) {
      return this.controller.onRoute(this, name, path, args);
    }
  };

  AppRouter.prototype._setControllerFilters = function(controller) {
    var defaultFilters, filters;
    if (controller != null) {
      defaultFilters = {
        before: {},
        after: {}
      };
      filters = controller.filters;
      if (Marionettist._.isFunction(filters)) {
        filters = filters();
      }
      if (controller.filters == null) {
        controller.filters = {};
      }
      controller.filters = Marionettist._.extend(defaultFilters, filters);
    }
    return controller;
  };

  AppRouter.prototype._addAppRoute = function(controller, route, methodName) {
    var _method, method;
    this.controller = this._setControllerFilters(controller);
    _method = controller[methodName];
    method = (function(_this) {
      return function(args) {
        var result;
        _this.controller.route = new Marionettist.AppRoute({
          controller: _this.controller,
          actionName: methodName,
          path: route
        });
        result = _this._executeFilter(_this.controller.filters.before, _this.controller);
        if (result !== false) {
          _this.controller[methodName].apply(_this.controller, _this._getParams());
          return _this._executeFilter(_this.controller.filters.after, _this.controller);
        }
      };
    })(this);
    if (!method) {
      throw new Marionettist.Marionette.Error('Method "' + methodName + '" was not found on the controller');
    }
    return this.route(route, methodName, Marionettist._.bind(method, controller));
  };

  AppRouter.prototype._executeFilter = function(filter, controller) {
    var filterValue, i, len, methodName, ref, result, stopMsg;
    result = true;
    ref = Marionettist._.keys(filter);
    for (i = 0, len = ref.length; i < len; i++) {
      methodName = ref[i];
      filterValue = filter[methodName];
      stopMsg = "Action halted by filter '" + methodName + "'";
      switch (false) {
        case !Marionettist._.isFunction(filterValue):
          result = filterValue(controller);
          if (result === false) {
            if (typeof console !== "undefined" && console !== null) {
              console.warn(stopMsg);
            }
            break;
          }
          break;
        case !Marionettist._.isObject(filterValue):
          result = this._proccessFilterObject(methodName, filterValue, controller);
          if (result === false) {
            if (typeof console !== "undefined" && console !== null) {
              console.warn(stopMsg);
            }
            break;
          }
      }
    }
    return result;
  };

  AppRouter.prototype._getParams = function() {
    var params, route;
    route = this._routeToRegExp(this.controller.route.getOption("path"));
    return params = this._extractParameters(route, Marionettist.Backbone.history.getFragment());
  };

  AppRouter.prototype._proccessFilterObject = function(methodName, filter, controller) {
    var actionName, controllerMethod, defaultFilterOptions, filterOptions;
    defaultFilterOptions = {
      method: null,
      only: [],
      except: []
    };
    filterOptions = Marionettist._.extend(defaultFilterOptions, filter);
    controllerMethod = controller[methodName];
    actionName = controller.route.actionName();
    if (!_.isArray(filterOptions.only)) {
      throw "filter option only, most be an array";
    }
    if (!_.isArray(filterOptions.except)) {
      throw "filter option except, most be an array";
    }
    if (filterOptions.only.length > 0 || filterOptions.except.length > 0) {
      if (Marionettist._.contains(filterOptions.only, actionName) && !Marionettist._.contains(filterOptions.except, actionName)) {
        if (Marionettist._.isFunction(controllerMethod)) {
          return controllerMethod.apply(this.controller, this._getParams());
        }
      }
    } else {
      if (Marionettist._.isFunction(controllerMethod)) {
        return controllerMethod.apply(this.controller, this._getParams());
      }
    }
  };

  return AppRouter;

})(Marionettist.AppRouter);

export default AppRouter;
