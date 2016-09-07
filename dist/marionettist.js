(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('underscore'), require('underscore-contrib'), require('underscore.string'), require('jquery'), require('backbone'), require('backbone.radio'), require('backbone-associations'), require('backbone.marionette'), require('i18next'), require('numeral'), require('moment'), require('moment-range'), require('moment-timezone')) :
  typeof define === 'function' && define.amd ? define(['underscore', 'underscore-contrib', 'underscore.string', 'jquery', 'backbone', 'backbone.radio', 'backbone-associations', 'backbone.marionette', 'i18next', 'numeral', 'moment', 'moment-range', 'moment-timezone'], factory) :
  (global.Marionettist = factory(global._,global.underscoreContrib,global.s,global.$,global.Backbone,global.Backbone.Radio,global.backboneAssociations,global.Marionette,global.i18next,global.numeral,global.moment,global.momentRange,global.momentTimezone));
}(this, (function (_,underscoreContrib,s,$,Backbone,backbone_radio,backboneAssociations,Marionette$1,i18next,numeral,moment,momentRange,momentTimezone) { 'use strict';

_ = 'default' in _ ? _['default'] : _;
s = 'default' in s ? s['default'] : s;
$ = 'default' in $ ? $['default'] : $;
Backbone = 'default' in Backbone ? Backbone['default'] : Backbone;
Marionette$1 = 'default' in Marionette$1 ? Marionette$1['default'] : Marionette$1;
i18next = 'default' in i18next ? i18next['default'] : i18next;
numeral = 'default' in numeral ? numeral['default'] : numeral;
moment = 'default' in moment ? moment['default'] : moment;

var Marionettist$1;

Marionettist$1 = Marionette$1.extend();

Marionettist$1.Backbone = Backbone;

Marionettist$1.Marionette = Marionette$1;

Marionettist$1._ = _;

Marionettist$1.$ = $;

Marionettist$1.s = s;

Marionettist$1.I18n = i18next;

Marionettist$1.numeral = numeral;

Marionettist$1.moment = moment;

var Marionettist$2 = Marionettist$1;

var Env;
var extend$1 = function(child, parent) { for (var key in parent) { if (hasProp$1.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
var hasProp$1 = {}.hasOwnProperty;
Env = (function(superClass) {
  extend$1(Env, superClass);

  function Env() {
    this.stage = "development";
  }

  Env.prototype.isDevelopment = function() {
    return this.stage === "development";
  };

  Env.prototype.isProduction = function() {
    return this.stage === "production";
  };

  Env.prototype.getLocale = function() {
    return Marionettist$2.I18n.language;
  };

  Env.prototype.setStage = function(stage) {
    var oldState;
    oldState = this.stage;
    this.stage = stage;
    return this.triggerMethod("change:stage", oldState, stage);
  };

  Env.prototype.getStage = function() {
    return this.stage;
  };

  Env.prototype.setLocale = function(locale, callback) {
    var oldLocale;
    if (locale == null) {
      locale = "en";
    }
    if (callback == null) {
      callback = null;
    }
    oldLocale = this.getLocale();
    return Marionettist$2.I18n.changeLanguage(locale, function(t) {
      Marionettist$2.channels.publish("marionettist", "change:locale", {
        currentLocale: locale,
        oldLocale: oldLocale
      });
      if (Marionettist$2._.isFunction(callback)) {
        return callback(t);
      }
    });
  };

  return Env;

})(Marionettist$2.Object);

var Env$1 = Env;

var Channels;
var extend$2 = function(child, parent) { for (var key in parent) { if (hasProp$2.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
var hasProp$2 = {}.hasOwnProperty;
Channels = (function(superClass) {
  extend$2(Channels, superClass);

  function Channels() {}

  Channels.prototype.request = function(channelName, eventName, data) {
    if (channelName == null) {
      channelName = "global";
    }
    if (eventName == null) {
      eventName = "";
    }
    if (data == null) {
      data = {};
    }
    return Marionettist$2.Backbone.Radio.channel(channelName).request(eventName, data);
  };

  Channels.prototype.replyOnce = function(channelName, eventName, callback) {
    var channel;
    if (channelName == null) {
      channelName = "global";
    }
    if (eventName == null) {
      eventName = "";
    }
    channel = Marionettist$2.Backbone.Radio.channel(channelName);
    if (Marionettist$2._.isFunction(callback)) {
      return channel.replyOnce(eventName, callback);
    } else {
      return channel.replyOnce(callback);
    }
  };

  Channels.prototype.reply = function(channelName, eventName, callback) {
    var channel;
    if (channelName == null) {
      channelName = "global";
    }
    if (eventName == null) {
      eventName = "";
    }
    channel = Marionettist$2.Backbone.Radio.channel(channelName);
    if (Marionettist$2._.isFunction(callback)) {
      return channel.reply(eventName, callback);
    } else {
      return channel.reply(callback);
    }
  };

  Channels.prototype.publish = function(channelName, eventName, data) {
    if (channelName == null) {
      channelName = "global";
    }
    if (eventName == null) {
      eventName = "";
    }
    if (data == null) {
      data = {};
    }
    return Marionettist$2.Backbone.Radio.channel(channelName).trigger(eventName, data);
  };

  Channels.prototype.subscribe = function(channelName, eventName, callback) {
    if (channelName == null) {
      channelName = "global";
    }
    if (eventName == null) {
      eventName = "";
    }
    return Marionettist$2.Backbone.Radio.channel(channelName).on(eventName, callback);
  };

  return Channels;

})(Marionettist$2.Object);

var Channels$1 = Channels;

var Location;
var extend$3 = function(child, parent) { for (var key in parent) { if (hasProp$3.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
var hasProp$3 = {}.hasOwnProperty;
Location = (function(superClass) {
  extend$3(Location, superClass);

  function Location() {}

  Location.prototype.refreshRoute = function(fragment) {
    if (fragment == null) {
      fragment = this.getCurrentRoute();
    }
    return Marionettist$2.Backbone.history.loadUrl(fragment);
  };

  Location.prototype.navigateTo = function(route, options) {
    if (options == null) {
      options = {};
    }
    return Marionettist$2.Backbone.history.navigate(route, options);
  };

  Location.prototype.getCurrentRoute = function() {
    var frag;
    frag = Marionettist$2.Backbone.history.fragment;
    if (Marionettist$2._.isEmpty(frag)) {
      return null;
    } else {
      return frag;
    }
  };

  Location.prototype.startHistory = function(options) {
    if (options == null) {
      options = {};
    }
    if (Marionettist$2.Backbone.history != null) {
      return Marionettist$2.Backbone.history.start(options);
    }
  };

  return Location;

})(Marionettist$2.Object);

var Location$1 = Location;

var Templates;

Templates = (function() {
  function Templates() {}

  Templates.prototype.debug = false;

  Templates.prototype.lookupPaths = [];

  Templates.prototype.engine = function() {
    var engine;
    engine = {};
    if (typeof HAML !== "undefined" && HAML !== null) {
      engine = HAML;
    }
    if (typeof JST !== "undefined" && JST !== null) {
      engine = JST;
    }
    return engine;
  };

  Templates.prototype.render = function(templateName, data, options) {
    var engine, template;
    if (templateName == null) {
      templateName = "";
    }
    if (data == null) {
      data = {};
    }
    if (options == null) {
      options = {};
    }
    template = "";
    engine = this.engine;
    if (Marionettist$2._.isFunction(templateName)) {
      engine = engine();
    }
    if (options.defaultTemplate != null) {
      template = options.defaultTemplate;
    }
    if ((engine != null) && Marionettist$2._.isFunction(engine[templateName])) {
      template = engine[templateName](data);
    }
    return template;
  };

  return Templates;

})();

var Templates$1 = Templates;

var Config;
var extend$4 = function(child, parent) { for (var key in parent) { if (hasProp$4.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
var hasProp$4 = {}.hasOwnProperty;
Config = (function(superClass) {
  extend$4(Config, superClass);

  function Config() {
    this.templates = new Templates$1();
  }

  return Config;

})(Marionettist$2.Object);

var Config$1 = Config;

var Renderer;

Renderer = {
  render: function(template, data) {
    var engineTemplate;
    if (Marionettist._.isFunction(template)) {
      return template(data);
    } else {
      if (template === false) {
        return;
      }
      engineTemplate = this.getTemplate(template);
      if (!Marionettist._.isFunction(engineTemplate)) {
        throw "Template " + template + " was not found!";
      }
      return engineTemplate(data);
    }
  },
  getTemplate: function(template) {
    var i, j, len, len1, lookup, lookupPath, lookups, path, templates;
    lookups = Marionettist.config.templates.lookupPaths;
    if (Marionettist._.isFunction(lookups)) {
      lookups = lookups();
    }
    if (!Marionettist._.isArray(lookups)) {
      throw "lookupPaths most be an array";
    }
    templates = [template];
    if (lookups.length === 0) {
      lookups = [""];
    }
    for (i = 0, len = lookups.length; i < len; i++) {
      lookup = lookups[i];
      for (j = 0, len1 = templates.length; j < len1; j++) {
        path = templates[j];
        lookupPath = this.findLookupPath(lookup + path, template);
        if (lookupPath != null) {
          return lookupPath;
        }
      }
    }
  },
  findLookupPath: function(path, template) {
    var engine, lookupPath;
    engine = Marionettist.config.templates.engine;
    if (Marionettist._.isFunction(engine)) {
      engine = engine();
    }
    lookupPath = engine[path];
    if (Marionettist.config.templates.debug === true) {
      Marionettist.logger.info("Looking template: " + template + " in '" + path + "'");
    }
    if (lookupPath) {
      return lookupPath;
    }
  },
  withTemplate: function(string) {
    var array;
    if (string != null) {
      array = string.split("/");
      array.splice(-1, 0, "templates");
      return array.join("/");
    }
  }
};

var Renderer$1 = Renderer;

var Utils;
var extend$5 = function(child, parent) { for (var key in parent) { if (hasProp$5.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
var hasProp$5 = {}.hasOwnProperty;
var slice = [].slice;
Utils = (function(superClass) {
  extend$5(Utils, superClass);

  function Utils() {
    return Utils.__super__.constructor.apply(this, arguments);
  }

  Utils.prototype.getValue = function(value, context, params) {
    if (Marionettist$2._.isFunction(value)) {
      value = params ? value.apply(context, params) : value.call(context);
    }
    return value;
  };

  Utils.prototype.pathFor = function(_path) {
    var path;
    path = "";
    path = "#" + _path;
    return path;
  };

  Utils.prototype.waitFor = function(promises, options) {
    if (options == null) {
      options = {};
    }
    switch (false) {
      case options.promiseType !== "bluebird":
        return this._waitForBluebird(promises, options);
      default:
        return this._waitForAjax(promises, options);
    }
  };

  Utils.prototype._waitForAjax = function(ajaxRequests, options) {
    var ref, xhrs;
    if (ajaxRequests == null) {
      ajaxRequests = [];
    }
    if (options == null) {
      options = {};
    }
    xhrs = [];
    xhrs = Marionettist$2._.chain([ajaxRequests]).flatten().value();
    if (xhrs.length > 0) {
      return (ref = Marionettist$2.$).when.apply(ref, xhrs).then((function() {
        var args;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        if (Marionettist$2._.isFunction(options.success)) {
          return options.success.apply(options, args);
        }
      }), function() {
        var args;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        if (Marionettist$2._.isFunction(options.error)) {
          return options.error.apply(options, args);
        }
      });
    } else {
      if (Marionettist$2._.isFunction(options.success)) {
        return options.success(null);
      }
    }
  };

  Utils.prototype._waitForBluebird = function(promises, options) {
    if (options == null) {
      options = {};
    }
    promises = Marionettist$2._.chain([promises]).flatten().value();
    if (promises.length > 0) {
      return Promise.all(promises.map(function(promise) {
        return promise.reflect();
      })).then(function(inspections) {
        var errors, i, inspection, len, successArgs;
        successArgs = [];
        errors = [];
        for (i = 0, len = inspections.length; i < len; i++) {
          inspection = inspections[i];
          if (inspection.isFulfilled()) {
            successArgs.push(inspection.value());
          } else {
            errors.push(inspection.reason());
          }
        }
        if (errors.length > 0) {
          if (Marionettist$2._.isFunction(options.error)) {
            return options.error.apply(options, errors);
          }
        } else {
          if (Marionettist$2._.isFunction(options.success)) {
            return options.success.apply(options, successArgs);
          }
        }
      });
    } else {
      if (Marionettist$2._.isFunction(options.success)) {
        return options.success(null);
      }
    }
  };

  return Utils;

})(Marionettist$2.Object);

var Utils$1 = Utils;

var Logger;
var extend$6 = function(child, parent) { for (var key in parent) { if (hasProp$6.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
var hasProp$6 = {}.hasOwnProperty;
Logger = (function(superClass) {
  extend$6(Logger, superClass);

  function Logger() {}

  Logger.prototype.success = function(msg, options) {
    if (options == null) {
      options = {};
    }
    options.type = "success";
    return this.log(msg, options);
  };

  Logger.prototype.warn = function(msg, options) {
    if (options == null) {
      options = {};
    }
    options.type = "warn";
    return this.log(msg, options);
  };

  Logger.prototype.error = function(msg, options) {
    if (options == null) {
      options = {};
    }
    options.type = "error";
    return this.log(msg, options);
  };

  Logger.prototype.info = function(msg, options) {
    if (options == null) {
      options = {};
    }
    options.type = "info";
    return this.log(msg, options);
  };

  Logger.prototype.log = function(msg, options) {
    var bgc, force, type;
    if (options == null) {
      options = {};
    }
    force = options.force;
    type = options.type;
    if (Marionettist$2.env.isDevelopment() || force === true) {
      type = type || 'black';
      bgc = 'White';
      switch (type) {
        case 'success':
          type = 'Green';
          bgc = 'LimeGreen';
          break;
        case 'info':
          type = 'DodgerBlue';
          bgc = 'Turquoise';
          break;
        case 'error':
          type = 'Red';
          bgc = 'Black';
          break;
        case 'start':
          type = 'OliveDrab';
          bgc = 'PaleGreen';
          break;
        case 'warning':
          type = 'Tomato';
          bgc = 'Black';
          break;
        case 'end':
          type = 'Orchid';
          bgc = 'MediumVioletRed';
          break;
        default:
          type = type;
      }
      bgc = 'White';
      if (typeof msg === 'object') {
        console.log(msg);
      } else {
        console.log('%c' + msg, 'type:' + type + ';font-weight:bold; background-type: ' + bgc + ';');
      }
    }
  };

  return Logger;

})(Marionettist$2.Object);

var Logger$1 = Logger;

var AppRoute;
var extend$7 = function(child, parent) { for (var key in parent) { if (hasProp$7.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
var hasProp$7 = {}.hasOwnProperty;
AppRoute = (function(superClass) {
  extend$7(AppRoute, superClass);

  function AppRoute() {
    return AppRoute.__super__.constructor.apply(this, arguments);
  }

  AppRoute.prototype.router = function() {
    return this.getOption("router");
  };

  AppRoute.prototype.path = function() {
    return this.getOption("path");
  };

  AppRoute.prototype.actionName = function() {
    return this.getOption("actionName");
  };

  AppRoute.prototype.controller = function() {
    return this.getOption("controller");
  };

  return AppRoute;

})(Marionettist$2.Object);

var AppRoute$1 = AppRoute;

var AppRouter;
var extend$8 = function(child, parent) { for (var key in parent) { if (hasProp$8.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
var hasProp$8 = {}.hasOwnProperty;
AppRouter = (function(superClass) {
  extend$8(AppRouter, superClass);

  function AppRouter() {
    return AppRouter.__super__.constructor.apply(this, arguments);
  }

  AppRouter.prototype.onRoute = function(name, path, args) {
    if ((this.controller != null) && Marionettist$2._.isFunction(this.controller.onRoute)) {
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
      if (Marionettist$2._.isFunction(filters)) {
        filters = filters();
      }
      if (controller.filters == null) {
        controller.filters = {};
      }
      controller.filters = Marionettist$2._.extend(defaultFilters, filters);
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
        _this.controller.route = new Marionettist$2.AppRoute({
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
      throw new Marionettist$2.Marionette.Error('Method "' + methodName + '" was not found on the controller');
    }
    return this.route(route, methodName, Marionettist$2._.bind(method, controller));
  };

  AppRouter.prototype._executeFilter = function(filter, controller) {
    var filterValue, i, len, methodName, ref, result, stopMsg;
    result = true;
    ref = Marionettist$2._.keys(filter);
    for (i = 0, len = ref.length; i < len; i++) {
      methodName = ref[i];
      filterValue = filter[methodName];
      stopMsg = "Action halted by filter '" + methodName + "'";
      switch (false) {
        case !Marionettist$2._.isFunction(filterValue):
          result = filterValue(controller);
          if (result === false) {
            if (typeof console !== "undefined" && console !== null) {
              console.warn(stopMsg);
            }
            break;
          }
          break;
        case !Marionettist$2._.isObject(filterValue):
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
    return params = this._extractParameters(route, Marionettist$2.Backbone.history.getFragment());
  };

  AppRouter.prototype._proccessFilterObject = function(methodName, filter, controller) {
    var actionName, controllerMethod, defaultFilterOptions, filterOptions;
    defaultFilterOptions = {
      method: null,
      only: [],
      except: []
    };
    filterOptions = Marionettist$2._.extend(defaultFilterOptions, filter);
    controllerMethod = controller[methodName];
    actionName = controller.route.actionName();
    if (!Marionettist$2._.isArray(filterOptions.only)) {
      throw "filter option only, most be an array";
    }
    if (!Marionettist$2._.isArray(filterOptions.except)) {
      throw "filter option except, most be an array";
    }
    if (filterOptions.only.length > 0 || filterOptions.except.length > 0) {
      if (Marionettist$2._.contains(filterOptions.only, actionName) && !Marionettist$2._.contains(filterOptions.except, actionName)) {
        if (Marionettist$2._.isFunction(controllerMethod)) {
          return controllerMethod.apply(this.controller, this._getParams());
        }
      }
    } else {
      if (Marionettist$2._.isFunction(controllerMethod)) {
        return controllerMethod.apply(this.controller, this._getParams());
      }
    }
  };

  return AppRouter;

})(Marionettist$2.AppRouter);

var AppRouter$1 = AppRouter;

var Region;
var _show;
var extend$9 = function(child, parent) { for (var key in parent) { if (hasProp$9.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
var hasProp$9 = {}.hasOwnProperty;
_show = Marionette$1.Region.prototype.show;

Region = (function(superClass) {
  extend$9(Region, superClass);

  function Region() {
    return Region.__super__.constructor.apply(this, arguments);
  }

  Region.prototype.show = function(view, options) {
    var args, oldView, preventDestroy, showCurrentView, transitionOut, value;
    options = options || {};
    preventDestroy = options.preventDestroy === true;
    transitionOut = options.transitionOut;
    delete options.transitionOut;
    args = [view, options];
    if (transitionOut === false) {
      return _show.apply(this, args);
    } else {
      oldView = this.currentView;
      showCurrentView = (function(_this) {
        return function() {
          return _show.apply(_this, args);
        };
      })(this);
      if ((oldView != null) && Marionettist$2._.isFunction(oldView.transitionOut)) {
        oldView.triggerMethod("before:transition:out");
        value = oldView.transitionOut();
        if ((value != null ? value.then : void 0) != null) {
          return value.then((function(_this) {
            return function() {
              return showCurrentView();
            };
          })(this));
        } else {
          throw "transitionOut method most return a promise";
        }
      } else {
        return showCurrentView();
      }
    }
  };

  return Region;

})(Marionette$1.Region);

var Region$1 = Region;

var Views;
var extend$10 = function(child, parent) { for (var key in parent) { if (hasProp$10.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
var hasProp$10 = {}.hasOwnProperty;
var slice$1 = [].slice;
Views = (function(superClass) {
  extend$10(Views, superClass);

  function Views() {
    return Views.__super__.constructor.apply(this, arguments);
  }

  Views.prototype.templateHelpers = {
    pathFor: function() {
      var args, ref;
      args = 1 <= arguments.length ? slice$1.call(arguments, 0) : [];
      return (ref = Marionettist$2.utils).pathFor.apply(ref, args);
    },
    _: Marionettist$2._,
    s: Marionettist$2.s,
    t: function() {
      var args, ref;
      args = 1 <= arguments.length ? slice$1.call(arguments, 0) : [];
      return (ref = Marionettist$2.I18n).t.apply(ref, args);
    },
    formatCurrency: function(amount, format) {
      if (format == null) {
        format = "$0,0.00";
      }
      return Marionettist$2.numeral(amount).format(format);
    },
    formatNumber: function(amount, format) {
      if (format == null) {
        format = "0,0.00";
      }
      return Marionettist$2.numeral(amount).format(format);
    },
    formatPercentage: function(amount, format) {
      if (format == null) {
        format = "0.00%";
      }
      return Marionettist$2.numeral(amount).format(format);
    },
    formatDate: function(date, format) {
      if (format == null) {
        format = "DD-MM-YYYY";
      }
      return Marionettist$2.moment(date).format(format);
    }
  };

  return Views;

})(Marionettist$2.Object);

var Views$1 = Views;

var BaseView;
var extend$11 = function(child, parent) { for (var key in parent) { if (hasProp$11.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
var hasProp$11 = {}.hasOwnProperty;
BaseView = (function(superClass) {
  extend$11(BaseView, superClass);

  function BaseView() {
    return BaseView.__super__.constructor.apply(this, arguments);
  }

  return BaseView;

})(Marionette$1.View);

var BaseView$1 = BaseView;

var CollectionView;
var extend$12 = function(child, parent) { for (var key in parent) { if (hasProp$12.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
var hasProp$12 = {}.hasOwnProperty;
CollectionView = (function(superClass) {
  extend$12(CollectionView, superClass);

  function CollectionView() {
    return CollectionView.__super__.constructor.apply(this, arguments);
  }

  return CollectionView;

})(Marionette$1.CollectionView);

var CollectionView$1 = CollectionView;

var Base;
var extend$13 = function(child, parent) { for (var key in parent) { if (hasProp$13.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
var hasProp$13 = {}.hasOwnProperty;
Base = (function(superClass) {
  extend$13(Base, superClass);

  function Base() {
    return Base.__super__.constructor.apply(this, arguments);
  }

  return Base;

})(Backbone.Model);

var BaseModel = Base;

var Base$1;
var extend$14 = function(child, parent) { for (var key in parent) { if (hasProp$14.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
var hasProp$14 = {}.hasOwnProperty;
Base$1 = (function(superClass) {
  extend$14(Base, superClass);

  function Base() {
    return Base.__super__.constructor.apply(this, arguments);
  }

  return Base;

})(Backbone.Collection);

var BaseCollection = Base$1;

var Base$2;
var extend$15 = function(child, parent) { for (var key in parent) { if (hasProp$15.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
var hasProp$15 = {}.hasOwnProperty;
var slice$2 = [].slice;
Base$2 = (function(superClass) {
  extend$15(Base, superClass);

  function Base(options) {
    if (options == null) {
      options = {};
    }
    Base.__super__.constructor.call(this, options);
    this._instance_id = Marionettist$2._.uniqueId("responder");
    this.register(this, this._instance_id);
  }

  Base.prototype.loaderView = BaseView$1.extend({
    template: function(data) {
      return Marionettist$2.config.templates.render("marionettist/loader", data, {
        defaultTemplate: '<div class=\'mri-loader\'>\n  <div class=\'mri-loader__content\'>\n    <i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>\n    <span class="sr-only">Loading...</span>\n  </div>\n</div>'
      });
    }
  });

  Base.prototype.getLoaderView = function() {
    if (this.get("loaderView") == null) {
      this.set({
        loaderView: new this.loaderView
      });
    }
    return this.get("loaderView");
  };

  Base.prototype.close = function() {
    var args;
    args = 1 <= arguments.length ? slice$2.call(arguments, 0) : [];
    Base.__super__.close.call(this, args);
    return this.unregister(this, this._instance_id);
  };

  Base.prototype.show = function(view, options) {
    var loaderView, region;
    if (options == null) {
      options = {};
    }
    region = options.region != null ? options.region : this.get("region");
    this.listenTo(view, "close", this.close);
    if (options.async != null) {
      if (options.loaderView !== false) {
        loaderView = this.getLoaderView();
        this.listenTo(loaderView, "close", this.close);
        region.show(loaderView);
      }
      return this.fetch().then(((function(_this) {
        return function() {
          if (options.loaderView !== false) {
            if (region.currentView !== loaderView) {
              return view.close();
            }
          }
          return region.show(view);
        };
      })(this)));
    } else {
      return region.show(view);
    }
  };

  Base.prototype.defaults = {
    params: {},
    async: []
  };

  Base.prototype.waitFor = function() {
    var args, ref;
    args = 1 <= arguments.length ? slice$2.call(arguments, 0) : [];
    return (ref = Marionettist$2.utils).waitFor.apply(ref, args);
  };

  Base.prototype.deferred = function() {
    return Marionettist$2.$.Deferred();
  };

  Base.prototype.fetch = function(options) {
    var asyncFetches, deferred;
    if (options == null) {
      options = {};
    }
    deferred = this.deferred();
    asyncFetches = Marionettist$2._.chain([this.get("async")]).flatten().compact().value();
    this.waitFor(asyncFetches, {
      success: function() {
        if (Marionettist$2._.isFunction(options.success)) {
          options.success();
        }
        return deferred.resolve();
      },
      error: function() {
        if (Marionettist$2._.isFunction(options.error)) {
          options.error();
        }
        return deferred.reject();
      }
    });
    return deferred.promise();
  };

  Base.prototype.save = function() {
    return this.deferred().promise();
  };

  Base.prototype.destroy = function() {
    return this.deferred().promise();
  };

  Base.prototype.register = function(instance, id) {
    if (this._registry == null) {
      this._registry = {};
    }
    return this._registry[id] = instance;
  };

  Base.prototype.unregister = function(instance, id) {
    return delete this._registry[id];
  };

  Base.prototype.resetRegistry = function() {
    var key, msg, oldCount, ref, responder;
    oldCount = this.getRegistrySize();
    ref = this._registry;
    for (key in ref) {
      responder = ref[key];
      responder.region.close();
    }
    msg = "There were " + oldCount + " responders in the registry, there are now " + (this.getRegistrySize());
    if (this.getRegistrySize() > 0) {
      return console.warn(msg, this._registry);
    } else {
      return console.log(msg);
    }
  };

  Base.prototype.getRegistrySize = function() {
    return Marionettist$2._.size(this._registry);
  };

  return Base;

})(BaseModel);

var BaseResponder = Base$2;

var Base$3;
var extend$16 = function(child, parent) { for (var key in parent) { if (hasProp$16.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
var hasProp$16 = {}.hasOwnProperty;
Base$3 = (function(superClass) {
  extend$16(Base, superClass);

  function Base() {
    return Base.__super__.constructor.apply(this, arguments);
  }

  Base.prototype.responders = function() {
    return {
      base: BaseResponder
    };
  };

  Base.prototype.models = function() {
    return {
      base: BaseModel
    };
  };

  Base.prototype.collections = function() {
    return {
      base: BaseCollection
    };
  };

  Base.prototype.views = function() {
    return {};
  };

  Base.prototype.getResponder = function(responderName, options) {
    if (options == null) {
      options = {};
    }
    return this.getResource("responders", responderName, options);
  };

  Base.prototype.getView = function(viewName, options) {
    if (options == null) {
      options = {};
    }
    return this.getResource("views", viewName, options);
  };

  Base.prototype.getModel = function(modelName, options) {
    if (options == null) {
      options = {};
    }
    return this.getResource("models", modelName, options);
  };

  Base.prototype.getCollection = function(collectionName, models, options) {
    if (models == null) {
      models = [];
    }
    if (options == null) {
      options = {};
    }
    return this.getResource("collections", collectionName, options, models);
  };

  Base.prototype.getResource = function(resourcesName, resourceName, options, models) {
    var resource, resources;
    if (options == null) {
      options = {};
    }
    resource = null;
    resources = this[resourcesName];
    if (Marionettist$2._.isFunction(resources)) {
      resources = resources();
    }
    if (options.viewModel == null) {
      options.viewModel = this;
    }
    if (Marionettist$2._.isObject(resources) && (resources[resourceName] != null)) {
      if (models != null) {
        resource = new resources[resourceName](models, options);
      } else {
        resource = new resources[resourceName](options);
      }
    }
    return resource;
  };

  return Base;

})(Backbone.Model);

var BaseViewModel = Base$3;

var Base$4;
var extend$17 = function(child, parent) { for (var key in parent) { if (hasProp$17.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
var hasProp$17 = {}.hasOwnProperty;
Base$4 = (function(superClass) {
  extend$17(Base, superClass);

  function Base() {
    return Base.__super__.constructor.apply(this, arguments);
  }

  Base.prototype.navigateTo = function(route, options) {
    if (options == null) {
      options = {};
    }
    return Marionettist$2.location.navigateTo(route, options);
  };

  Base.prototype.getCurrentRoute = function() {
    return Marionettist$2.location.getCurrentRoute();
  };

  return Base;

})(Marionettist$2.Object);

var BaseController = Base$4;

var Application;
var extend$18 = function(child, parent) { for (var key in parent) { if (hasProp$18.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
var hasProp$18 = {}.hasOwnProperty;
Application = (function(superClass) {
  extend$18(Application, superClass);

  Application.prototype.Controllers = new Marionettist$2.Object();

  Application.prototype.Entities = new Marionettist$2.Object();

  Application.prototype.Views = new Marionettist$2.Object();

  Application.prototype._isRunning = false;

  Application.prototype._isDestroyed = false;

  Application.prototype.preventDestroy = false;

  Application.prototype.startAfterInitialized = false;

  Application.prototype.startWithParent = false;

  Application.prototype.stopWithParent = true;

  Application.prototype.resources = [];

  function Application(options) {
    Application.__super__.constructor.call(this, options);
    this._initChildApps(options);
    if (Marionettist$2._.result(this, 'startAfterInitialized')) {
      this.start(options);
    }
  }

  Application.prototype.startHistory = function(options) {
    if (options == null) {
      options = {};
    }
    if (!Marionettist$2.Backbone.History.started) {
      return Marionettist$2.location.startHistory(options);
    }
  };

  Application.prototype.start = function(options) {
    this.triggerMethod("before:resources:fetch", options);
    if (this.resources == null) {
      this.resources = [];
    }
    return Marionettist$2.utils.waitFor(this.resources, {
      success: (function(_this) {
        return function() {
          Application.__super__.start.call(_this, options);
          _this.triggerMethod("resources:fetch:success");
          return _this.triggerMethod("ready");
        };
      })(this),
      error: (function(_this) {
        return function() {
          return _this.triggerMethod("resources:fetch:error");
        };
      })(this)
    });
  };

  Application.prototype.isRunning = function() {
    return this._isRunning;
  };

  Application.prototype.stop = function(options) {
    if (!this._isRunning) {
      return this;
    }
    this.triggerMethod('before:stop', options);
    this._isRunning = false;
    this.triggerMethod('stop', options);
    return this;
  };

  Application.prototype._initChildApps = function() {
    var childApps, options;
    options = arguments.length <= 0 || arguments[0] === void 0 ? {} : arguments[0];
    this._childApps = {};
    this.mergeOptions(options, ['childApps', 'childAppOptions']);
    childApps = this.childApps;
    if (childApps) {
      if (Marionettist$2._.isFunction(childApps)) {
        childApps = childApps.call(this, options);
      }
      this.addChildApps(childApps);
    }
    this._initListeners();
  };

  Application.prototype._initListeners = function() {
    this.on({
      'start': this._startChildApps,
      'before:stop': this._stopChildApps,
      'before:destroy': this._destroyChildApps
    });
  };

  Application.prototype._startChildApps = function(options) {
    return Marionettist$2._.each(this._childApps, function(childApp) {
      if (Marionettist$2.utils.getValue(childApp.getOption("startWithParent")) === true) {
        return childApp.start(options);
      }
    });
  };

  Application.prototype._stopChildApps = function(options) {
    return Marionettist$2._.each(this._childApps, function(childApp) {
      if (Marionettist$2._.result(childApp, 'stopWithParent')) {
        return childApp.stop(options);
      }
    });
  };

  Application.prototype._destroyChildApps = function(options) {
    return Marionettist$2._.each(this._childApps, function(childApp) {
      if (!Marionettist$2._.result(childApp, 'preventDestroy')) {
        return childApp.destroy(options);
      }
    });
  };

  Application.prototype._buildAppFromObject = function(appConfig) {
    var AppClass, options;
    AppClass = appConfig.AppClass;
    options = Marionettist$2._.omit(appConfig, 'AppClass');
    return this.buildApp(AppClass, options);
  };

  Application.prototype._buildApp = function(AppClass, options) {
    if (Marionettist$2._.isFunction(AppClass)) {
      return this.buildApp(AppClass, options);
    }
    if (Marionettist$2._.isObject(AppClass)) {
      return this._buildAppFromObject(AppClass);
    }
  };

  Application.prototype.buildApp = function(AppClass, options) {
    options = Marionettist$2._.extend({}, this.childAppOptions, options);
    return new AppClass(options);
  };

  Application.prototype._ensureAppIsUnique = function(appName) {
    if (this._childApps[appName]) {
      throw new Marionette.Error({
        name: 'DuplicateChildAppError',
        message: 'A child App with name "' + appName + '" has already been added.'
      });
    }
  };

  Application.prototype.addChildApps = function(childApps) {
    return Marionettist$2._.each(childApps, (function(childApp, appName) {
      this.addChildApp(appName, childApp);
    }), this);
  };

  Application.prototype.addChildApp = function(appName, AppClass, options) {
    var childApp;
    this._ensureAppIsUnique(appName);
    childApp = this._buildApp(AppClass, options);
    if (!childApp) {
      throw new Marionette.Error({
        name: 'AddChildAppError',
        message: 'App build failed.  Incorrect configuration.'
      });
    }
    childApp._name = appName;
    this._childApps[appName] = childApp;
    childApp.on('destroy', Marionettist$2._.partial(this._removeChildApp, appName), this);
    if (this.isRunning() && Marionettist$2._.result(childApp, 'startWithParent')) {
      childApp.start();
    }
    return childApp;
  };

  Application.prototype.getName = function() {
    return this._name;
  };

  Application.prototype.getChildApps = function() {
    return Marionettist$2._.clone(this._childApps);
  };

  Application.prototype.getChildApp = function(appName) {
    return this._childApps[appName];
  };

  Application.prototype._removeChildApp = function(appName) {
    delete this._childApps[appName]._name;
    delete this._childApps[appName];
  };

  Application.prototype.removeChildApps = function() {
    var childApps;
    childApps = this.getChildApps();
    Marionettist$2._.each(this._childApps, (function(childApp, appName) {
      this.removeChildApp(appName);
    }), this);
    return childApps;
  };

  Application.prototype.removeChildApp = function(appName, options) {
    var childApp;
    options = Marionettist$2._.extend({}, options);
    childApp = this.getChildApp(appName);
    if (!childApp) {
      return;
    }
    if (options.preventDestroy || Marionettist$2._.result(childApp, 'preventDestroy')) {
      this._removeChildApp(appName);
    } else {
      childApp.destroy();
    }
    return childApp;
  };

  Application.prototype.destroy = function() {};

  return Application;

})(Marionettist$2.Application);

var Application$1 = Application;

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
var hasProp = {}.hasOwnProperty;
Marionettist$2.channels = new Channels$1();

Marionettist$2.location = new Location$1();

Marionettist$2.env = new Env$1();

Marionettist$2.config = new Config$1();

Marionettist$2.logger = new Logger$1;

Marionettist$2._.extend(Marionettist$2.Renderer, Renderer$1);

Marionettist$2.utils = new Utils$1;

Marionettist$2.AppRoute = AppRoute$1;

Marionettist$2.AppRouter = AppRouter$1;

Marionettist$2._.extend(Marionettist$2.Region.prototype, Region$1.prototype);

Marionettist$2.Views = new Views$1();

Marionettist$2._.extend(Marionettist$2.View.prototype, {
  templateContext: function() {
    var helpers;
    helpers = Marionettist$2.Views.templateHelpers;
    return helpers;
  }
});

Marionettist$2.Views.BaseView = BaseView$1;

Marionettist$2.Views.Collection = CollectionView$1;

Marionettist$2.Entities = new Marionettist$2.Object();

Marionettist$2.Entities.Models = new Marionettist$2.Object();

Marionettist$2.Entities.Collections = new Marionettist$2.Object();

Marionettist$2.Entities.ViewModels = new Marionettist$2.Object();

Marionettist$2.Entities.Responders = new Marionettist$2.Object();

Marionettist$2.Entities.Models.Base = BaseModel;

if (Marionettist$2.Backbone.AssociatedModel) {
  Marionettist$2.Entities.Models.Associated = (function(superClass) {
    extend(Associated, superClass);

    function Associated() {
      return Associated.__super__.constructor.apply(this, arguments);
    }

    return Associated;

  })(Marionettist$2.Backbone.AssociatedModel);
}

Marionettist$2.Entities.Collections.Base = BaseCollection;

Marionettist$2.Entities.Responders.Base = BaseResponder;

Marionettist$2.Entities.ViewModels.Base = BaseViewModel;

Marionettist$2.Controllers = new Marionettist$2.Object();

Marionettist$2.Controllers.Base = BaseController;

Marionettist$2.Application = Application$1;

if (typeof global !== "undefined" && global !== null) {
  global.Marionettist = Marionettist$2;
}

return Marionettist$2;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvY29yZS5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvZW52LmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9jaGFubmVscy5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvbG9jYXRpb24uanMiLCIvbW50LzdhNmMwY2JkLTY3YzgtNDU5Ny05ZDMzLTJlMjliMTJkZjJhOS9yZXBvcy9tYXJpb25ldHRpc3QvbGliL2NvbmZpZy90ZW1wbGF0ZXMuanMiLCIvbW50LzdhNmMwY2JkLTY3YzgtNDU5Ny05ZDMzLTJlMjliMTJkZjJhOS9yZXBvcy9tYXJpb25ldHRpc3QvbGliL2NvbmZpZy5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvbWl4aW5zL3JlbmRlcmVyLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi91dGlscy5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvbG9nZ2VyLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9yb3V0ZS5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvcm91dGVyLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9yZWdpb24uanMiLCIvbW50LzdhNmMwY2JkLTY3YzgtNDU5Ny05ZDMzLTJlMjliMTJkZjJhOS9yZXBvcy9tYXJpb25ldHRpc3QvbGliL3ZpZXdzLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi92aWV3cy9iYXNlLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi92aWV3cy9jb2xsZWN0aW9uLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9lbnRpdGllcy9tb2RlbHMvYmFzZS5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvZW50aXRpZXMvY29sbGVjdGlvbnMvYmFzZS5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvZW50aXRpZXMvcmVzcG9uZGVycy9iYXNlLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9lbnRpdGllcy92aWV3LW1vZGVscy9iYXNlLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9jb250cm9sbGVycy9iYXNlLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9hcHBsaWNhdGlvbi5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvbWFyaW9uZXR0aXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJ1bmRlcnNjb3JlXCI7XG5pbXBvcnQgdW5kZXJzY29yZUNvbnRyaWIgZnJvbSBcInVuZGVyc2NvcmUtY29udHJpYlwiO1xuaW1wb3J0IHMgZnJvbSBcInVuZGVyc2NvcmUuc3RyaW5nXCI7XG5pbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgQmFja2JvbmUgZnJvbSBcImJhY2tib25lXCI7XG5pbXBvcnQgYmFja2JvbmVfcmFkaW8gZnJvbSBcImJhY2tib25lLnJhZGlvXCI7XG5pbXBvcnQgYmFja2JvbmVBc3NvY2lhdGlvbnMgZnJvbSBcImJhY2tib25lLWFzc29jaWF0aW9uc1wiO1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSBcImJhY2tib25lLm1hcmlvbmV0dGVcIjtcbmltcG9ydCBpMThuZXh0IGZyb20gXCJpMThuZXh0XCI7XG5pbXBvcnQgbnVtZXJhbCBmcm9tIFwibnVtZXJhbFwiO1xuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCI7XG5pbXBvcnQgbW9tZW50UmFuZ2UgZnJvbSBcIm1vbWVudC1yYW5nZVwiO1xuaW1wb3J0IG1vbWVudFRpbWV6b25lIGZyb20gXCJtb21lbnQtdGltZXpvbmVcIjtcbnZhciBNYXJpb25ldHRpc3Q7XG5cbk1hcmlvbmV0dGlzdCA9IE1hcmlvbmV0dGUuZXh0ZW5kKCk7XG5cbk1hcmlvbmV0dGlzdC5CYWNrYm9uZSA9IEJhY2tib25lO1xuXG5NYXJpb25ldHRpc3QuTWFyaW9uZXR0ZSA9IE1hcmlvbmV0dGU7XG5cbk1hcmlvbmV0dGlzdC5fID0gXztcblxuTWFyaW9uZXR0aXN0LiQgPSAkO1xuXG5NYXJpb25ldHRpc3QucyA9IHM7XG5cbk1hcmlvbmV0dGlzdC5JMThuID0gaTE4bmV4dDtcblxuTWFyaW9uZXR0aXN0Lm51bWVyYWwgPSBudW1lcmFsO1xuXG5NYXJpb25ldHRpc3QubW9tZW50ID0gbW9tZW50O1xuXG5leHBvcnQgZGVmYXVsdCBNYXJpb25ldHRpc3Q7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbnZhciBFbnYsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5FbnYgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoRW52LCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBFbnYoKSB7XG4gICAgdGhpcy5zdGFnZSA9IFwiZGV2ZWxvcG1lbnRcIjtcbiAgfVxuXG4gIEVudi5wcm90b3R5cGUuaXNEZXZlbG9wbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnN0YWdlID09PSBcImRldmVsb3BtZW50XCI7XG4gIH07XG5cbiAgRW52LnByb3RvdHlwZS5pc1Byb2R1Y3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFnZSA9PT0gXCJwcm9kdWN0aW9uXCI7XG4gIH07XG5cbiAgRW52LnByb3RvdHlwZS5nZXRMb2NhbGUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0LkkxOG4ubGFuZ3VhZ2U7XG4gIH07XG5cbiAgRW52LnByb3RvdHlwZS5zZXRTdGFnZSA9IGZ1bmN0aW9uKHN0YWdlKSB7XG4gICAgdmFyIG9sZFN0YXRlO1xuICAgIG9sZFN0YXRlID0gdGhpcy5zdGFnZTtcbiAgICB0aGlzLnN0YWdlID0gc3RhZ2U7XG4gICAgcmV0dXJuIHRoaXMudHJpZ2dlck1ldGhvZChcImNoYW5nZTpzdGFnZVwiLCBvbGRTdGF0ZSwgc3RhZ2UpO1xuICB9O1xuXG4gIEVudi5wcm90b3R5cGUuZ2V0U3RhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFnZTtcbiAgfTtcblxuICBFbnYucHJvdG90eXBlLnNldExvY2FsZSA9IGZ1bmN0aW9uKGxvY2FsZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgb2xkTG9jYWxlO1xuICAgIGlmIChsb2NhbGUgPT0gbnVsbCkge1xuICAgICAgbG9jYWxlID0gXCJlblwiO1xuICAgIH1cbiAgICBpZiAoY2FsbGJhY2sgPT0gbnVsbCkge1xuICAgICAgY2FsbGJhY2sgPSBudWxsO1xuICAgIH1cbiAgICBvbGRMb2NhbGUgPSB0aGlzLmdldExvY2FsZSgpO1xuICAgIHJldHVybiBNYXJpb25ldHRpc3QuSTE4bi5jaGFuZ2VMYW5ndWFnZShsb2NhbGUsIGZ1bmN0aW9uKHQpIHtcbiAgICAgIE1hcmlvbmV0dGlzdC5jaGFubmVscy5wdWJsaXNoKFwibWFyaW9uZXR0aXN0XCIsIFwiY2hhbmdlOmxvY2FsZVwiLCB7XG4gICAgICAgIGN1cnJlbnRMb2NhbGU6IGxvY2FsZSxcbiAgICAgICAgb2xkTG9jYWxlOiBvbGRMb2NhbGVcbiAgICAgIH0pO1xuICAgICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayh0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gRW52O1xuXG59KShNYXJpb25ldHRpc3QuT2JqZWN0KTtcblxuZXhwb3J0IGRlZmF1bHQgRW52O1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi9jb3JlLmpzXCI7XG52YXIgQ2hhbm5lbHMsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5DaGFubmVscyA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChDaGFubmVscywgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQ2hhbm5lbHMoKSB7fVxuXG4gIENoYW5uZWxzLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24oY2hhbm5lbE5hbWUsIGV2ZW50TmFtZSwgZGF0YSkge1xuICAgIGlmIChjaGFubmVsTmFtZSA9PSBudWxsKSB7XG4gICAgICBjaGFubmVsTmFtZSA9IFwiZ2xvYmFsXCI7XG4gICAgfVxuICAgIGlmIChldmVudE5hbWUgPT0gbnVsbCkge1xuICAgICAgZXZlbnROYW1lID0gXCJcIjtcbiAgICB9XG4gICAgaWYgKGRhdGEgPT0gbnVsbCkge1xuICAgICAgZGF0YSA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0LkJhY2tib25lLlJhZGlvLmNoYW5uZWwoY2hhbm5lbE5hbWUpLnJlcXVlc3QoZXZlbnROYW1lLCBkYXRhKTtcbiAgfTtcblxuICBDaGFubmVscy5wcm90b3R5cGUucmVwbHlPbmNlID0gZnVuY3Rpb24oY2hhbm5lbE5hbWUsIGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgY2hhbm5lbDtcbiAgICBpZiAoY2hhbm5lbE5hbWUgPT0gbnVsbCkge1xuICAgICAgY2hhbm5lbE5hbWUgPSBcImdsb2JhbFwiO1xuICAgIH1cbiAgICBpZiAoZXZlbnROYW1lID09IG51bGwpIHtcbiAgICAgIGV2ZW50TmFtZSA9IFwiXCI7XG4gICAgfVxuICAgIGNoYW5uZWwgPSBNYXJpb25ldHRpc3QuQmFja2JvbmUuUmFkaW8uY2hhbm5lbChjaGFubmVsTmFtZSk7XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgICByZXR1cm4gY2hhbm5lbC5yZXBseU9uY2UoZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjaGFubmVsLnJlcGx5T25jZShjYWxsYmFjayk7XG4gICAgfVxuICB9O1xuXG4gIENoYW5uZWxzLnByb3RvdHlwZS5yZXBseSA9IGZ1bmN0aW9uKGNoYW5uZWxOYW1lLCBldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGNoYW5uZWw7XG4gICAgaWYgKGNoYW5uZWxOYW1lID09IG51bGwpIHtcbiAgICAgIGNoYW5uZWxOYW1lID0gXCJnbG9iYWxcIjtcbiAgICB9XG4gICAgaWYgKGV2ZW50TmFtZSA9PSBudWxsKSB7XG4gICAgICBldmVudE5hbWUgPSBcIlwiO1xuICAgIH1cbiAgICBjaGFubmVsID0gTWFyaW9uZXR0aXN0LkJhY2tib25lLlJhZGlvLmNoYW5uZWwoY2hhbm5lbE5hbWUpO1xuICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xuICAgICAgcmV0dXJuIGNoYW5uZWwucmVwbHkoZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjaGFubmVsLnJlcGx5KGNhbGxiYWNrKTtcbiAgICB9XG4gIH07XG5cbiAgQ2hhbm5lbHMucHJvdG90eXBlLnB1Ymxpc2ggPSBmdW5jdGlvbihjaGFubmVsTmFtZSwgZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgaWYgKGNoYW5uZWxOYW1lID09IG51bGwpIHtcbiAgICAgIGNoYW5uZWxOYW1lID0gXCJnbG9iYWxcIjtcbiAgICB9XG4gICAgaWYgKGV2ZW50TmFtZSA9PSBudWxsKSB7XG4gICAgICBldmVudE5hbWUgPSBcIlwiO1xuICAgIH1cbiAgICBpZiAoZGF0YSA9PSBudWxsKSB7XG4gICAgICBkYXRhID0ge307XG4gICAgfVxuICAgIHJldHVybiBNYXJpb25ldHRpc3QuQmFja2JvbmUuUmFkaW8uY2hhbm5lbChjaGFubmVsTmFtZSkudHJpZ2dlcihldmVudE5hbWUsIGRhdGEpO1xuICB9O1xuXG4gIENoYW5uZWxzLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbihjaGFubmVsTmFtZSwgZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgIGlmIChjaGFubmVsTmFtZSA9PSBudWxsKSB7XG4gICAgICBjaGFubmVsTmFtZSA9IFwiZ2xvYmFsXCI7XG4gICAgfVxuICAgIGlmIChldmVudE5hbWUgPT0gbnVsbCkge1xuICAgICAgZXZlbnROYW1lID0gXCJcIjtcbiAgICB9XG4gICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5CYWNrYm9uZS5SYWRpby5jaGFubmVsKGNoYW5uZWxOYW1lKS5vbihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfTtcblxuICByZXR1cm4gQ2hhbm5lbHM7XG5cbn0pKE1hcmlvbmV0dGlzdC5PYmplY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBDaGFubmVscztcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4vY29yZS5qc1wiO1xudmFyIExvY2F0aW9uLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuTG9jYXRpb24gPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoTG9jYXRpb24sIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIExvY2F0aW9uKCkge31cblxuICBMb2NhdGlvbi5wcm90b3R5cGUucmVmcmVzaFJvdXRlID0gZnVuY3Rpb24oZnJhZ21lbnQpIHtcbiAgICBpZiAoZnJhZ21lbnQgPT0gbnVsbCkge1xuICAgICAgZnJhZ21lbnQgPSB0aGlzLmdldEN1cnJlbnRSb3V0ZSgpO1xuICAgIH1cbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0LkJhY2tib25lLmhpc3RvcnkubG9hZFVybChmcmFnbWVudCk7XG4gIH07XG5cbiAgTG9jYXRpb24ucHJvdG90eXBlLm5hdmlnYXRlVG8gPSBmdW5jdGlvbihyb3V0ZSwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5CYWNrYm9uZS5oaXN0b3J5Lm5hdmlnYXRlKHJvdXRlLCBvcHRpb25zKTtcbiAgfTtcblxuICBMb2NhdGlvbi5wcm90b3R5cGUuZ2V0Q3VycmVudFJvdXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGZyYWc7XG4gICAgZnJhZyA9IE1hcmlvbmV0dGlzdC5CYWNrYm9uZS5oaXN0b3J5LmZyYWdtZW50O1xuICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0VtcHR5KGZyYWcpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZyYWc7XG4gICAgfVxuICB9O1xuXG4gIExvY2F0aW9uLnByb3RvdHlwZS5zdGFydEhpc3RvcnkgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBpZiAoTWFyaW9uZXR0aXN0LkJhY2tib25lLmhpc3RvcnkgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5CYWNrYm9uZS5oaXN0b3J5LnN0YXJ0KG9wdGlvbnMpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gTG9jYXRpb247XG5cbn0pKE1hcmlvbmV0dGlzdC5PYmplY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBMb2NhdGlvbjtcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4uL2NvcmUuanNcIjtcbnZhciBUZW1wbGF0ZXM7XG5cblRlbXBsYXRlcyA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gVGVtcGxhdGVzKCkge31cblxuICBUZW1wbGF0ZXMucHJvdG90eXBlLmRlYnVnID0gZmFsc2U7XG5cbiAgVGVtcGxhdGVzLnByb3RvdHlwZS5sb29rdXBQYXRocyA9IFtdO1xuXG4gIFRlbXBsYXRlcy5wcm90b3R5cGUuZW5naW5lID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVuZ2luZTtcbiAgICBlbmdpbmUgPSB7fTtcbiAgICBpZiAodHlwZW9mIEhBTUwgIT09IFwidW5kZWZpbmVkXCIgJiYgSEFNTCAhPT0gbnVsbCkge1xuICAgICAgZW5naW5lID0gSEFNTDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBKU1QgIT09IFwidW5kZWZpbmVkXCIgJiYgSlNUICE9PSBudWxsKSB7XG4gICAgICBlbmdpbmUgPSBKU1Q7XG4gICAgfVxuICAgIHJldHVybiBlbmdpbmU7XG4gIH07XG5cbiAgVGVtcGxhdGVzLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbih0ZW1wbGF0ZU5hbWUsIGRhdGEsIG9wdGlvbnMpIHtcbiAgICB2YXIgZW5naW5lLCB0ZW1wbGF0ZTtcbiAgICBpZiAodGVtcGxhdGVOYW1lID09IG51bGwpIHtcbiAgICAgIHRlbXBsYXRlTmFtZSA9IFwiXCI7XG4gICAgfVxuICAgIGlmIChkYXRhID09IG51bGwpIHtcbiAgICAgIGRhdGEgPSB7fTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICB0ZW1wbGF0ZSA9IFwiXCI7XG4gICAgZW5naW5lID0gdGhpcy5lbmdpbmU7XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24odGVtcGxhdGVOYW1lKSkge1xuICAgICAgZW5naW5lID0gZW5naW5lKCk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmRlZmF1bHRUZW1wbGF0ZSAhPSBudWxsKSB7XG4gICAgICB0ZW1wbGF0ZSA9IG9wdGlvbnMuZGVmYXVsdFRlbXBsYXRlO1xuICAgIH1cbiAgICBpZiAoKGVuZ2luZSAhPSBudWxsKSAmJiBNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKGVuZ2luZVt0ZW1wbGF0ZU5hbWVdKSkge1xuICAgICAgdGVtcGxhdGUgPSBlbmdpbmVbdGVtcGxhdGVOYW1lXShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIHRlbXBsYXRlO1xuICB9O1xuXG4gIHJldHVybiBUZW1wbGF0ZXM7XG5cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFRlbXBsYXRlcztcbiIsImltcG9ydCBUZW1wbGF0ZXMgZnJvbSBcIi4vY29uZmlnL3RlbXBsYXRlcy5qc1wiO1xuaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi9jb3JlLmpzXCI7XG52YXIgQ29uZmlnLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuQ29uZmlnID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKENvbmZpZywgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQ29uZmlnKCkge1xuICAgIHRoaXMudGVtcGxhdGVzID0gbmV3IFRlbXBsYXRlcygpO1xuICB9XG5cbiAgcmV0dXJuIENvbmZpZztcblxufSkoTWFyaW9uZXR0aXN0Lk9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IENvbmZpZztcbiIsInZhciBSZW5kZXJlcjtcblxuUmVuZGVyZXIgPSB7XG4gIHJlbmRlcjogZnVuY3Rpb24odGVtcGxhdGUsIGRhdGEpIHtcbiAgICB2YXIgZW5naW5lVGVtcGxhdGU7XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24odGVtcGxhdGUpKSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGUoZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0ZW1wbGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZW5naW5lVGVtcGxhdGUgPSB0aGlzLmdldFRlbXBsYXRlKHRlbXBsYXRlKTtcbiAgICAgIGlmICghTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihlbmdpbmVUZW1wbGF0ZSkpIHtcbiAgICAgICAgdGhyb3cgXCJUZW1wbGF0ZSBcIiArIHRlbXBsYXRlICsgXCIgd2FzIG5vdCBmb3VuZCFcIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlbmdpbmVUZW1wbGF0ZShkYXRhKTtcbiAgICB9XG4gIH0sXG4gIGdldFRlbXBsYXRlOiBmdW5jdGlvbih0ZW1wbGF0ZSkge1xuICAgIHZhciBpLCBqLCBsZW4sIGxlbjEsIGxvb2t1cCwgbG9va3VwUGF0aCwgbG9va3VwcywgcGF0aCwgdGVtcGxhdGVzO1xuICAgIGxvb2t1cHMgPSBNYXJpb25ldHRpc3QuY29uZmlnLnRlbXBsYXRlcy5sb29rdXBQYXRocztcbiAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihsb29rdXBzKSkge1xuICAgICAgbG9va3VwcyA9IGxvb2t1cHMoKTtcbiAgICB9XG4gICAgaWYgKCFNYXJpb25ldHRpc3QuXy5pc0FycmF5KGxvb2t1cHMpKSB7XG4gICAgICB0aHJvdyBcImxvb2t1cFBhdGhzIG1vc3QgYmUgYW4gYXJyYXlcIjtcbiAgICB9XG4gICAgdGVtcGxhdGVzID0gW3RlbXBsYXRlXTtcbiAgICBpZiAobG9va3Vwcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGxvb2t1cHMgPSBbXCJcIl07XG4gICAgfVxuICAgIGZvciAoaSA9IDAsIGxlbiA9IGxvb2t1cHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxvb2t1cCA9IGxvb2t1cHNbaV07XG4gICAgICBmb3IgKGogPSAwLCBsZW4xID0gdGVtcGxhdGVzLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgICBwYXRoID0gdGVtcGxhdGVzW2pdO1xuICAgICAgICBsb29rdXBQYXRoID0gdGhpcy5maW5kTG9va3VwUGF0aChsb29rdXAgKyBwYXRoLCB0ZW1wbGF0ZSk7XG4gICAgICAgIGlmIChsb29rdXBQYXRoICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbG9va3VwUGF0aDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgZmluZExvb2t1cFBhdGg6IGZ1bmN0aW9uKHBhdGgsIHRlbXBsYXRlKSB7XG4gICAgdmFyIGVuZ2luZSwgbG9va3VwUGF0aDtcbiAgICBlbmdpbmUgPSBNYXJpb25ldHRpc3QuY29uZmlnLnRlbXBsYXRlcy5lbmdpbmU7XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24oZW5naW5lKSkge1xuICAgICAgZW5naW5lID0gZW5naW5lKCk7XG4gICAgfVxuICAgIGxvb2t1cFBhdGggPSBlbmdpbmVbcGF0aF07XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5jb25maWcudGVtcGxhdGVzLmRlYnVnID09PSB0cnVlKSB7XG4gICAgICBNYXJpb25ldHRpc3QubG9nZ2VyLmluZm8oXCJMb29raW5nIHRlbXBsYXRlOiBcIiArIHRlbXBsYXRlICsgXCIgaW4gJ1wiICsgcGF0aCArIFwiJ1wiKTtcbiAgICB9XG4gICAgaWYgKGxvb2t1cFBhdGgpIHtcbiAgICAgIHJldHVybiBsb29rdXBQYXRoO1xuICAgIH1cbiAgfSxcbiAgd2l0aFRlbXBsYXRlOiBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICB2YXIgYXJyYXk7XG4gICAgaWYgKHN0cmluZyAhPSBudWxsKSB7XG4gICAgICBhcnJheSA9IHN0cmluZy5zcGxpdChcIi9cIik7XG4gICAgICBhcnJheS5zcGxpY2UoLTEsIDAsIFwidGVtcGxhdGVzXCIpO1xuICAgICAgcmV0dXJuIGFycmF5LmpvaW4oXCIvXCIpO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVuZGVyZXI7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbnZhciBVdGlscyxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHksXG4gIHNsaWNlID0gW10uc2xpY2U7XG5cblV0aWxzID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKFV0aWxzLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBVdGlscygpIHtcbiAgICByZXR1cm4gVXRpbHMuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBVdGlscy5wcm90b3R5cGUuZ2V0VmFsdWUgPSBmdW5jdGlvbih2YWx1ZSwgY29udGV4dCwgcGFyYW1zKSB7XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICB2YWx1ZSA9IHBhcmFtcyA/IHZhbHVlLmFwcGx5KGNvbnRleHQsIHBhcmFtcykgOiB2YWx1ZS5jYWxsKGNvbnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgVXRpbHMucHJvdG90eXBlLnBhdGhGb3IgPSBmdW5jdGlvbihfcGF0aCkge1xuICAgIHZhciBwYXRoO1xuICAgIHBhdGggPSBcIlwiO1xuICAgIHBhdGggPSBcIiNcIiArIF9wYXRoO1xuICAgIHJldHVybiBwYXRoO1xuICB9O1xuXG4gIFV0aWxzLnByb3RvdHlwZS53YWl0Rm9yID0gZnVuY3Rpb24ocHJvbWlzZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHN3aXRjaCAoZmFsc2UpIHtcbiAgICAgIGNhc2Ugb3B0aW9ucy5wcm9taXNlVHlwZSAhPT0gXCJibHVlYmlyZFwiOlxuICAgICAgICByZXR1cm4gdGhpcy5fd2FpdEZvckJsdWViaXJkKHByb21pc2VzLCBvcHRpb25zKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0aGlzLl93YWl0Rm9yQWpheChwcm9taXNlcywgb3B0aW9ucyk7XG4gICAgfVxuICB9O1xuXG4gIFV0aWxzLnByb3RvdHlwZS5fd2FpdEZvckFqYXggPSBmdW5jdGlvbihhamF4UmVxdWVzdHMsIG9wdGlvbnMpIHtcbiAgICB2YXIgcmVmLCB4aHJzO1xuICAgIGlmIChhamF4UmVxdWVzdHMgPT0gbnVsbCkge1xuICAgICAgYWpheFJlcXVlc3RzID0gW107XG4gICAgfVxuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgeGhycyA9IFtdO1xuICAgIHhocnMgPSBNYXJpb25ldHRpc3QuXy5jaGFpbihbYWpheFJlcXVlc3RzXSkuZmxhdHRlbigpLnZhbHVlKCk7XG4gICAgaWYgKHhocnMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIChyZWYgPSBNYXJpb25ldHRpc3QuJCkud2hlbi5hcHBseShyZWYsIHhocnMpLnRoZW4oKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXJncztcbiAgICAgICAgYXJncyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihvcHRpb25zLnN1Y2Nlc3MpKSB7XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMuc3VjY2Vzcy5hcHBseShvcHRpb25zLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgfSksIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXJncztcbiAgICAgICAgYXJncyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihvcHRpb25zLmVycm9yKSkge1xuICAgICAgICAgIHJldHVybiBvcHRpb25zLmVycm9yLmFwcGx5KG9wdGlvbnMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24ob3B0aW9ucy5zdWNjZXNzKSkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5zdWNjZXNzKG51bGwpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBVdGlscy5wcm90b3R5cGUuX3dhaXRGb3JCbHVlYmlyZCA9IGZ1bmN0aW9uKHByb21pc2VzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBwcm9taXNlcyA9IE1hcmlvbmV0dGlzdC5fLmNoYWluKFtwcm9taXNlc10pLmZsYXR0ZW4oKS52YWx1ZSgpO1xuICAgIGlmIChwcm9taXNlcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMubWFwKGZ1bmN0aW9uKHByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2UucmVmbGVjdCgpO1xuICAgICAgfSkpLnRoZW4oZnVuY3Rpb24oaW5zcGVjdGlvbnMpIHtcbiAgICAgICAgdmFyIGVycm9ycywgaSwgaW5zcGVjdGlvbiwgbGVuLCBzdWNjZXNzQXJncztcbiAgICAgICAgc3VjY2Vzc0FyZ3MgPSBbXTtcbiAgICAgICAgZXJyb3JzID0gW107XG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGluc3BlY3Rpb25zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgaW5zcGVjdGlvbiA9IGluc3BlY3Rpb25zW2ldO1xuICAgICAgICAgIGlmIChpbnNwZWN0aW9uLmlzRnVsZmlsbGVkKCkpIHtcbiAgICAgICAgICAgIHN1Y2Nlc3NBcmdzLnB1c2goaW5zcGVjdGlvbi52YWx1ZSgpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXJyb3JzLnB1c2goaW5zcGVjdGlvbi5yZWFzb24oKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKG9wdGlvbnMuZXJyb3IpKSB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9ucy5lcnJvci5hcHBseShvcHRpb25zLCBlcnJvcnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihvcHRpb25zLnN1Y2Nlc3MpKSB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9ucy5zdWNjZXNzLmFwcGx5KG9wdGlvbnMsIHN1Y2Nlc3NBcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihvcHRpb25zLnN1Y2Nlc3MpKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLnN1Y2Nlc3MobnVsbCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBVdGlscztcblxufSkoTWFyaW9uZXR0aXN0Lk9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IFV0aWxzO1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi9jb3JlLmpzXCI7XG52YXIgTG9nZ2VyLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuTG9nZ2VyID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKExvZ2dlciwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gTG9nZ2VyKCkge31cblxuICBMb2dnZXIucHJvdG90eXBlLnN1Y2Nlc3MgPSBmdW5jdGlvbihtc2csIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIG9wdGlvbnMudHlwZSA9IFwic3VjY2Vzc1wiO1xuICAgIHJldHVybiB0aGlzLmxvZyhtc2csIG9wdGlvbnMpO1xuICB9O1xuXG4gIExvZ2dlci5wcm90b3R5cGUud2FybiA9IGZ1bmN0aW9uKG1zZywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgb3B0aW9ucy50eXBlID0gXCJ3YXJuXCI7XG4gICAgcmV0dXJuIHRoaXMubG9nKG1zZywgb3B0aW9ucyk7XG4gIH07XG5cbiAgTG9nZ2VyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uKG1zZywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgb3B0aW9ucy50eXBlID0gXCJlcnJvclwiO1xuICAgIHJldHVybiB0aGlzLmxvZyhtc2csIG9wdGlvbnMpO1xuICB9O1xuXG4gIExvZ2dlci5wcm90b3R5cGUuaW5mbyA9IGZ1bmN0aW9uKG1zZywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgb3B0aW9ucy50eXBlID0gXCJpbmZvXCI7XG4gICAgcmV0dXJuIHRoaXMubG9nKG1zZywgb3B0aW9ucyk7XG4gIH07XG5cbiAgTG9nZ2VyLnByb3RvdHlwZS5sb2cgPSBmdW5jdGlvbihtc2csIG9wdGlvbnMpIHtcbiAgICB2YXIgYmdjLCBmb3JjZSwgdHlwZTtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIGZvcmNlID0gb3B0aW9ucy5mb3JjZTtcbiAgICB0eXBlID0gb3B0aW9ucy50eXBlO1xuICAgIGlmIChNYXJpb25ldHRpc3QuZW52LmlzRGV2ZWxvcG1lbnQoKSB8fCBmb3JjZSA9PT0gdHJ1ZSkge1xuICAgICAgdHlwZSA9IHR5cGUgfHwgJ2JsYWNrJztcbiAgICAgIGJnYyA9ICdXaGl0ZSc7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICAgICAgdHlwZSA9ICdHcmVlbic7XG4gICAgICAgICAgYmdjID0gJ0xpbWVHcmVlbic7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2luZm8nOlxuICAgICAgICAgIHR5cGUgPSAnRG9kZ2VyQmx1ZSc7XG4gICAgICAgICAgYmdjID0gJ1R1cnF1b2lzZSc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICB0eXBlID0gJ1JlZCc7XG4gICAgICAgICAgYmdjID0gJ0JsYWNrJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnc3RhcnQnOlxuICAgICAgICAgIHR5cGUgPSAnT2xpdmVEcmFiJztcbiAgICAgICAgICBiZ2MgPSAnUGFsZUdyZWVuJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnd2FybmluZyc6XG4gICAgICAgICAgdHlwZSA9ICdUb21hdG8nO1xuICAgICAgICAgIGJnYyA9ICdCbGFjayc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgdHlwZSA9ICdPcmNoaWQnO1xuICAgICAgICAgIGJnYyA9ICdNZWRpdW1WaW9sZXRSZWQnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHR5cGUgPSB0eXBlO1xuICAgICAgfVxuICAgICAgYmdjID0gJ1doaXRlJztcbiAgICAgIGlmICh0eXBlb2YgbXNnID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJyVjJyArIG1zZywgJ3R5cGU6JyArIHR5cGUgKyAnO2ZvbnQtd2VpZ2h0OmJvbGQ7IGJhY2tncm91bmQtdHlwZTogJyArIGJnYyArICc7Jyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBMb2dnZXI7XG5cbn0pKE1hcmlvbmV0dGlzdC5PYmplY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBMb2dnZXI7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbnZhciBBcHBSb3V0ZSxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkFwcFJvdXRlID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKEFwcFJvdXRlLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBBcHBSb3V0ZSgpIHtcbiAgICByZXR1cm4gQXBwUm91dGUuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBBcHBSb3V0ZS5wcm90b3R5cGUucm91dGVyID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uKFwicm91dGVyXCIpO1xuICB9O1xuXG4gIEFwcFJvdXRlLnByb3RvdHlwZS5wYXRoID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uKFwicGF0aFwiKTtcbiAgfTtcblxuICBBcHBSb3V0ZS5wcm90b3R5cGUuYWN0aW9uTmFtZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmdldE9wdGlvbihcImFjdGlvbk5hbWVcIik7XG4gIH07XG5cbiAgQXBwUm91dGUucHJvdG90eXBlLmNvbnRyb2xsZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRPcHRpb24oXCJjb250cm9sbGVyXCIpO1xuICB9O1xuXG4gIHJldHVybiBBcHBSb3V0ZTtcblxufSkoTWFyaW9uZXR0aXN0Lk9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IEFwcFJvdXRlO1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi9jb3JlLmpzXCI7XG52YXIgQXBwUm91dGVyLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuQXBwUm91dGVyID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKEFwcFJvdXRlciwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQXBwUm91dGVyKCkge1xuICAgIHJldHVybiBBcHBSb3V0ZXIuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBBcHBSb3V0ZXIucHJvdG90eXBlLm9uUm91dGUgPSBmdW5jdGlvbihuYW1lLCBwYXRoLCBhcmdzKSB7XG4gICAgaWYgKCh0aGlzLmNvbnRyb2xsZXIgIT0gbnVsbCkgJiYgTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbih0aGlzLmNvbnRyb2xsZXIub25Sb3V0ZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXIub25Sb3V0ZSh0aGlzLCBuYW1lLCBwYXRoLCBhcmdzKTtcbiAgICB9XG4gIH07XG5cbiAgQXBwUm91dGVyLnByb3RvdHlwZS5fc2V0Q29udHJvbGxlckZpbHRlcnMgPSBmdW5jdGlvbihjb250cm9sbGVyKSB7XG4gICAgdmFyIGRlZmF1bHRGaWx0ZXJzLCBmaWx0ZXJzO1xuICAgIGlmIChjb250cm9sbGVyICE9IG51bGwpIHtcbiAgICAgIGRlZmF1bHRGaWx0ZXJzID0ge1xuICAgICAgICBiZWZvcmU6IHt9LFxuICAgICAgICBhZnRlcjoge31cbiAgICAgIH07XG4gICAgICBmaWx0ZXJzID0gY29udHJvbGxlci5maWx0ZXJzO1xuICAgICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24oZmlsdGVycykpIHtcbiAgICAgICAgZmlsdGVycyA9IGZpbHRlcnMoKTtcbiAgICAgIH1cbiAgICAgIGlmIChjb250cm9sbGVyLmZpbHRlcnMgPT0gbnVsbCkge1xuICAgICAgICBjb250cm9sbGVyLmZpbHRlcnMgPSB7fTtcbiAgICAgIH1cbiAgICAgIGNvbnRyb2xsZXIuZmlsdGVycyA9IE1hcmlvbmV0dGlzdC5fLmV4dGVuZChkZWZhdWx0RmlsdGVycywgZmlsdGVycyk7XG4gICAgfVxuICAgIHJldHVybiBjb250cm9sbGVyO1xuICB9O1xuXG4gIEFwcFJvdXRlci5wcm90b3R5cGUuX2FkZEFwcFJvdXRlID0gZnVuY3Rpb24oY29udHJvbGxlciwgcm91dGUsIG1ldGhvZE5hbWUpIHtcbiAgICB2YXIgX21ldGhvZCwgbWV0aG9kO1xuICAgIHRoaXMuY29udHJvbGxlciA9IHRoaXMuX3NldENvbnRyb2xsZXJGaWx0ZXJzKGNvbnRyb2xsZXIpO1xuICAgIF9tZXRob2QgPSBjb250cm9sbGVyW21ldGhvZE5hbWVdO1xuICAgIG1ldGhvZCA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgX3RoaXMuY29udHJvbGxlci5yb3V0ZSA9IG5ldyBNYXJpb25ldHRpc3QuQXBwUm91dGUoe1xuICAgICAgICAgIGNvbnRyb2xsZXI6IF90aGlzLmNvbnRyb2xsZXIsXG4gICAgICAgICAgYWN0aW9uTmFtZTogbWV0aG9kTmFtZSxcbiAgICAgICAgICBwYXRoOiByb3V0ZVxuICAgICAgICB9KTtcbiAgICAgICAgcmVzdWx0ID0gX3RoaXMuX2V4ZWN1dGVGaWx0ZXIoX3RoaXMuY29udHJvbGxlci5maWx0ZXJzLmJlZm9yZSwgX3RoaXMuY29udHJvbGxlcik7XG4gICAgICAgIGlmIChyZXN1bHQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgX3RoaXMuY29udHJvbGxlclttZXRob2ROYW1lXS5hcHBseShfdGhpcy5jb250cm9sbGVyLCBfdGhpcy5fZ2V0UGFyYW1zKCkpO1xuICAgICAgICAgIHJldHVybiBfdGhpcy5fZXhlY3V0ZUZpbHRlcihfdGhpcy5jb250cm9sbGVyLmZpbHRlcnMuYWZ0ZXIsIF90aGlzLmNvbnRyb2xsZXIpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKHRoaXMpO1xuICAgIGlmICghbWV0aG9kKSB7XG4gICAgICB0aHJvdyBuZXcgTWFyaW9uZXR0aXN0Lk1hcmlvbmV0dGUuRXJyb3IoJ01ldGhvZCBcIicgKyBtZXRob2ROYW1lICsgJ1wiIHdhcyBub3QgZm91bmQgb24gdGhlIGNvbnRyb2xsZXInKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucm91dGUocm91dGUsIG1ldGhvZE5hbWUsIE1hcmlvbmV0dGlzdC5fLmJpbmQobWV0aG9kLCBjb250cm9sbGVyKSk7XG4gIH07XG5cbiAgQXBwUm91dGVyLnByb3RvdHlwZS5fZXhlY3V0ZUZpbHRlciA9IGZ1bmN0aW9uKGZpbHRlciwgY29udHJvbGxlcikge1xuICAgIHZhciBmaWx0ZXJWYWx1ZSwgaSwgbGVuLCBtZXRob2ROYW1lLCByZWYsIHJlc3VsdCwgc3RvcE1zZztcbiAgICByZXN1bHQgPSB0cnVlO1xuICAgIHJlZiA9IE1hcmlvbmV0dGlzdC5fLmtleXMoZmlsdGVyKTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIG1ldGhvZE5hbWUgPSByZWZbaV07XG4gICAgICBmaWx0ZXJWYWx1ZSA9IGZpbHRlclttZXRob2ROYW1lXTtcbiAgICAgIHN0b3BNc2cgPSBcIkFjdGlvbiBoYWx0ZWQgYnkgZmlsdGVyICdcIiArIG1ldGhvZE5hbWUgKyBcIidcIjtcbiAgICAgIHN3aXRjaCAoZmFsc2UpIHtcbiAgICAgICAgY2FzZSAhTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihmaWx0ZXJWYWx1ZSk6XG4gICAgICAgICAgcmVzdWx0ID0gZmlsdGVyVmFsdWUoY29udHJvbGxlcik7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihzdG9wTXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAhTWFyaW9uZXR0aXN0Ll8uaXNPYmplY3QoZmlsdGVyVmFsdWUpOlxuICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX3Byb2NjZXNzRmlsdGVyT2JqZWN0KG1ldGhvZE5hbWUsIGZpbHRlclZhbHVlLCBjb250cm9sbGVyKTtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKHN0b3BNc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIEFwcFJvdXRlci5wcm90b3R5cGUuX2dldFBhcmFtcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYXJhbXMsIHJvdXRlO1xuICAgIHJvdXRlID0gdGhpcy5fcm91dGVUb1JlZ0V4cCh0aGlzLmNvbnRyb2xsZXIucm91dGUuZ2V0T3B0aW9uKFwicGF0aFwiKSk7XG4gICAgcmV0dXJuIHBhcmFtcyA9IHRoaXMuX2V4dHJhY3RQYXJhbWV0ZXJzKHJvdXRlLCBNYXJpb25ldHRpc3QuQmFja2JvbmUuaGlzdG9yeS5nZXRGcmFnbWVudCgpKTtcbiAgfTtcblxuICBBcHBSb3V0ZXIucHJvdG90eXBlLl9wcm9jY2Vzc0ZpbHRlck9iamVjdCA9IGZ1bmN0aW9uKG1ldGhvZE5hbWUsIGZpbHRlciwgY29udHJvbGxlcikge1xuICAgIHZhciBhY3Rpb25OYW1lLCBjb250cm9sbGVyTWV0aG9kLCBkZWZhdWx0RmlsdGVyT3B0aW9ucywgZmlsdGVyT3B0aW9ucztcbiAgICBkZWZhdWx0RmlsdGVyT3B0aW9ucyA9IHtcbiAgICAgIG1ldGhvZDogbnVsbCxcbiAgICAgIG9ubHk6IFtdLFxuICAgICAgZXhjZXB0OiBbXVxuICAgIH07XG4gICAgZmlsdGVyT3B0aW9ucyA9IE1hcmlvbmV0dGlzdC5fLmV4dGVuZChkZWZhdWx0RmlsdGVyT3B0aW9ucywgZmlsdGVyKTtcbiAgICBjb250cm9sbGVyTWV0aG9kID0gY29udHJvbGxlclttZXRob2ROYW1lXTtcbiAgICBhY3Rpb25OYW1lID0gY29udHJvbGxlci5yb3V0ZS5hY3Rpb25OYW1lKCk7XG4gICAgaWYgKCFNYXJpb25ldHRpc3QuXy5pc0FycmF5KGZpbHRlck9wdGlvbnMub25seSkpIHtcbiAgICAgIHRocm93IFwiZmlsdGVyIG9wdGlvbiBvbmx5LCBtb3N0IGJlIGFuIGFycmF5XCI7XG4gICAgfVxuICAgIGlmICghTWFyaW9uZXR0aXN0Ll8uaXNBcnJheShmaWx0ZXJPcHRpb25zLmV4Y2VwdCkpIHtcbiAgICAgIHRocm93IFwiZmlsdGVyIG9wdGlvbiBleGNlcHQsIG1vc3QgYmUgYW4gYXJyYXlcIjtcbiAgICB9XG4gICAgaWYgKGZpbHRlck9wdGlvbnMub25seS5sZW5ndGggPiAwIHx8IGZpbHRlck9wdGlvbnMuZXhjZXB0Lmxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChNYXJpb25ldHRpc3QuXy5jb250YWlucyhmaWx0ZXJPcHRpb25zLm9ubHksIGFjdGlvbk5hbWUpICYmICFNYXJpb25ldHRpc3QuXy5jb250YWlucyhmaWx0ZXJPcHRpb25zLmV4Y2VwdCwgYWN0aW9uTmFtZSkpIHtcbiAgICAgICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24oY29udHJvbGxlck1ldGhvZCkpIHtcbiAgICAgICAgICByZXR1cm4gY29udHJvbGxlck1ldGhvZC5hcHBseSh0aGlzLmNvbnRyb2xsZXIsIHRoaXMuX2dldFBhcmFtcygpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihjb250cm9sbGVyTWV0aG9kKSkge1xuICAgICAgICByZXR1cm4gY29udHJvbGxlck1ldGhvZC5hcHBseSh0aGlzLmNvbnRyb2xsZXIsIHRoaXMuX2dldFBhcmFtcygpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIEFwcFJvdXRlcjtcblxufSkoTWFyaW9uZXR0aXN0LkFwcFJvdXRlcik7XG5cbmV4cG9ydCBkZWZhdWx0IEFwcFJvdXRlcjtcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4vY29yZS5qc1wiO1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSBcImJhY2tib25lLm1hcmlvbmV0dGVcIjtcbnZhciBSZWdpb24sIF9zaG93LFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuX3Nob3cgPSBNYXJpb25ldHRlLlJlZ2lvbi5wcm90b3R5cGUuc2hvdztcblxuUmVnaW9uID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKFJlZ2lvbiwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gUmVnaW9uKCkge1xuICAgIHJldHVybiBSZWdpb24uX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBSZWdpb24ucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbih2aWV3LCBvcHRpb25zKSB7XG4gICAgdmFyIGFyZ3MsIG9sZFZpZXcsIHByZXZlbnREZXN0cm95LCBzaG93Q3VycmVudFZpZXcsIHRyYW5zaXRpb25PdXQsIHZhbHVlO1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHByZXZlbnREZXN0cm95ID0gb3B0aW9ucy5wcmV2ZW50RGVzdHJveSA9PT0gdHJ1ZTtcbiAgICB0cmFuc2l0aW9uT3V0ID0gb3B0aW9ucy50cmFuc2l0aW9uT3V0O1xuICAgIGRlbGV0ZSBvcHRpb25zLnRyYW5zaXRpb25PdXQ7XG4gICAgYXJncyA9IFt2aWV3LCBvcHRpb25zXTtcbiAgICBpZiAodHJhbnNpdGlvbk91dCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBfc2hvdy5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2xkVmlldyA9IHRoaXMuY3VycmVudFZpZXc7XG4gICAgICBzaG93Q3VycmVudFZpZXcgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfc2hvdy5hcHBseShfdGhpcywgYXJncyk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKTtcbiAgICAgIGlmICgob2xkVmlldyAhPSBudWxsKSAmJiBNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKG9sZFZpZXcudHJhbnNpdGlvbk91dCkpIHtcbiAgICAgICAgb2xkVmlldy50cmlnZ2VyTWV0aG9kKFwiYmVmb3JlOnRyYW5zaXRpb246b3V0XCIpO1xuICAgICAgICB2YWx1ZSA9IG9sZFZpZXcudHJhbnNpdGlvbk91dCgpO1xuICAgICAgICBpZiAoKHZhbHVlICE9IG51bGwgPyB2YWx1ZS50aGVuIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlLnRoZW4oKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzaG93Q3VycmVudFZpZXcoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSkodGhpcykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IFwidHJhbnNpdGlvbk91dCBtZXRob2QgbW9zdCByZXR1cm4gYSBwcm9taXNlXCI7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzaG93Q3VycmVudFZpZXcoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFJlZ2lvbjtcblxufSkoTWFyaW9uZXR0ZS5SZWdpb24pO1xuXG5leHBvcnQgZGVmYXVsdCBSZWdpb247XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbnZhciBWaWV3cyxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHksXG4gIHNsaWNlID0gW10uc2xpY2U7XG5cblZpZXdzID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKFZpZXdzLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBWaWV3cygpIHtcbiAgICByZXR1cm4gVmlld3MuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBWaWV3cy5wcm90b3R5cGUudGVtcGxhdGVIZWxwZXJzID0ge1xuICAgIHBhdGhGb3I6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MsIHJlZjtcbiAgICAgIGFyZ3MgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgIHJldHVybiAocmVmID0gTWFyaW9uZXR0aXN0LnV0aWxzKS5wYXRoRm9yLmFwcGx5KHJlZiwgYXJncyk7XG4gICAgfSxcbiAgICBfOiBNYXJpb25ldHRpc3QuXyxcbiAgICBzOiBNYXJpb25ldHRpc3QucyxcbiAgICB0OiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzLCByZWY7XG4gICAgICBhcmdzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgICByZXR1cm4gKHJlZiA9IE1hcmlvbmV0dGlzdC5JMThuKS50LmFwcGx5KHJlZiwgYXJncyk7XG4gICAgfSxcbiAgICBmb3JtYXRDdXJyZW5jeTogZnVuY3Rpb24oYW1vdW50LCBmb3JtYXQpIHtcbiAgICAgIGlmIChmb3JtYXQgPT0gbnVsbCkge1xuICAgICAgICBmb3JtYXQgPSBcIiQwLDAuMDBcIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNYXJpb25ldHRpc3QubnVtZXJhbChhbW91bnQpLmZvcm1hdChmb3JtYXQpO1xuICAgIH0sXG4gICAgZm9ybWF0TnVtYmVyOiBmdW5jdGlvbihhbW91bnQsIGZvcm1hdCkge1xuICAgICAgaWYgKGZvcm1hdCA9PSBudWxsKSB7XG4gICAgICAgIGZvcm1hdCA9IFwiMCwwLjAwXCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWFyaW9uZXR0aXN0Lm51bWVyYWwoYW1vdW50KS5mb3JtYXQoZm9ybWF0KTtcbiAgICB9LFxuICAgIGZvcm1hdFBlcmNlbnRhZ2U6IGZ1bmN0aW9uKGFtb3VudCwgZm9ybWF0KSB7XG4gICAgICBpZiAoZm9ybWF0ID09IG51bGwpIHtcbiAgICAgICAgZm9ybWF0ID0gXCIwLjAwJVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5udW1lcmFsKGFtb3VudCkuZm9ybWF0KGZvcm1hdCk7XG4gICAgfSxcbiAgICBmb3JtYXREYXRlOiBmdW5jdGlvbihkYXRlLCBmb3JtYXQpIHtcbiAgICAgIGlmIChmb3JtYXQgPT0gbnVsbCkge1xuICAgICAgICBmb3JtYXQgPSBcIkRELU1NLVlZWVlcIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNYXJpb25ldHRpc3QubW9tZW50KGRhdGUpLmZvcm1hdChmb3JtYXQpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gVmlld3M7XG5cbn0pKE1hcmlvbmV0dGlzdC5PYmplY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBWaWV3cztcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4uL2NvcmUuanNcIjtcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gXCJiYWNrYm9uZS5tYXJpb25ldHRlXCI7XG52YXIgQmFzZVZpZXcsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5CYXNlVmlldyA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChCYXNlVmlldywgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQmFzZVZpZXcoKSB7XG4gICAgcmV0dXJuIEJhc2VWaWV3Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIEJhc2VWaWV3O1xuXG59KShNYXJpb25ldHRlLlZpZXcpO1xuXG5leHBvcnQgZGVmYXVsdCBCYXNlVmlldztcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4uL2NvcmUuanNcIjtcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gXCJiYWNrYm9uZS5tYXJpb25ldHRlXCI7XG52YXIgQ29sbGVjdGlvblZpZXcsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5Db2xsZWN0aW9uVmlldyA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChDb2xsZWN0aW9uVmlldywgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQ29sbGVjdGlvblZpZXcoKSB7XG4gICAgcmV0dXJuIENvbGxlY3Rpb25WaWV3Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIENvbGxlY3Rpb25WaWV3O1xuXG59KShNYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3KTtcblxuZXhwb3J0IGRlZmF1bHQgQ29sbGVjdGlvblZpZXc7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuLi8uLi9jb3JlLmpzXCI7XG5pbXBvcnQgQmFja2JvbmUgZnJvbSBcImJhY2tib25lXCI7XG52YXIgQmFzZSxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkJhc2UgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoQmFzZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQmFzZSgpIHtcbiAgICByZXR1cm4gQmFzZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHJldHVybiBCYXNlO1xuXG59KShCYWNrYm9uZS5Nb2RlbCk7XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2U7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuLi8uLi9jb3JlLmpzXCI7XG5pbXBvcnQgQmFja2JvbmUgZnJvbSBcImJhY2tib25lXCI7XG52YXIgQmFzZSxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkJhc2UgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoQmFzZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQmFzZSgpIHtcbiAgICByZXR1cm4gQmFzZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHJldHVybiBCYXNlO1xuXG59KShCYWNrYm9uZS5Db2xsZWN0aW9uKTtcblxuZXhwb3J0IGRlZmF1bHQgQmFzZTtcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4uLy4uL2NvcmUuanNcIjtcbmltcG9ydCBNb2RlbEJhc2UgZnJvbSBcIi4uLy4uL2VudGl0aWVzL21vZGVscy9iYXNlLmpzXCI7XG5pbXBvcnQgQmFzZVZpZXcgZnJvbSBcIi4uLy4uL3ZpZXdzL2Jhc2UuanNcIjtcbnZhciBCYXNlLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eSxcbiAgc2xpY2UgPSBbXS5zbGljZTtcblxuQmFzZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChCYXNlLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBCYXNlKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIEJhc2UuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5faW5zdGFuY2VfaWQgPSBNYXJpb25ldHRpc3QuXy51bmlxdWVJZChcInJlc3BvbmRlclwiKTtcbiAgICB0aGlzLnJlZ2lzdGVyKHRoaXMsIHRoaXMuX2luc3RhbmNlX2lkKTtcbiAgfVxuXG4gIEJhc2UucHJvdG90eXBlLmxvYWRlclZpZXcgPSBCYXNlVmlldy5leHRlbmQoe1xuICAgIHRlbXBsYXRlOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4gTWFyaW9uZXR0aXN0LmNvbmZpZy50ZW1wbGF0ZXMucmVuZGVyKFwibWFyaW9uZXR0aXN0L2xvYWRlclwiLCBkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRUZW1wbGF0ZTogJzxkaXYgY2xhc3M9XFwnbXJpLWxvYWRlclxcJz5cXG4gIDxkaXYgY2xhc3M9XFwnbXJpLWxvYWRlcl9fY29udGVudFxcJz5cXG4gICAgPGkgY2xhc3M9XCJmYSBmYS1zcGlubmVyIGZhLXNwaW4gZmEtMnggZmEtZndcIj48L2k+XFxuICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiPkxvYWRpbmcuLi48L3NwYW4+XFxuICA8L2Rpdj5cXG48L2Rpdj4nXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIEJhc2UucHJvdG90eXBlLmdldExvYWRlclZpZXcgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5nZXQoXCJsb2FkZXJWaWV3XCIpID09IG51bGwpIHtcbiAgICAgIHRoaXMuc2V0KHtcbiAgICAgICAgbG9hZGVyVmlldzogbmV3IHRoaXMubG9hZGVyVmlld1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldChcImxvYWRlclZpZXdcIik7XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncztcbiAgICBhcmdzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgQmFzZS5fX3N1cGVyX18uY2xvc2UuY2FsbCh0aGlzLCBhcmdzKTtcbiAgICByZXR1cm4gdGhpcy51bnJlZ2lzdGVyKHRoaXMsIHRoaXMuX2luc3RhbmNlX2lkKTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24odmlldywgb3B0aW9ucykge1xuICAgIHZhciBsb2FkZXJWaWV3LCByZWdpb247XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICByZWdpb24gPSBvcHRpb25zLnJlZ2lvbiAhPSBudWxsID8gb3B0aW9ucy5yZWdpb24gOiB0aGlzLmdldChcInJlZ2lvblwiKTtcbiAgICB0aGlzLmxpc3RlblRvKHZpZXcsIFwiY2xvc2VcIiwgdGhpcy5jbG9zZSk7XG4gICAgaWYgKG9wdGlvbnMuYXN5bmMgIT0gbnVsbCkge1xuICAgICAgaWYgKG9wdGlvbnMubG9hZGVyVmlldyAhPT0gZmFsc2UpIHtcbiAgICAgICAgbG9hZGVyVmlldyA9IHRoaXMuZ2V0TG9hZGVyVmlldygpO1xuICAgICAgICB0aGlzLmxpc3RlblRvKGxvYWRlclZpZXcsIFwiY2xvc2VcIiwgdGhpcy5jbG9zZSk7XG4gICAgICAgIHJlZ2lvbi5zaG93KGxvYWRlclZpZXcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuZmV0Y2goKS50aGVuKCgoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChvcHRpb25zLmxvYWRlclZpZXcgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAocmVnaW9uLmN1cnJlbnRWaWV3ICE9PSBsb2FkZXJWaWV3KSB7XG4gICAgICAgICAgICAgIHJldHVybiB2aWV3LmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZWdpb24uc2hvdyh2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZWdpb24uc2hvdyh2aWV3KTtcbiAgICB9XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUuZGVmYXVsdHMgPSB7XG4gICAgcGFyYW1zOiB7fSxcbiAgICBhc3luYzogW11cbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS53YWl0Rm9yID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MsIHJlZjtcbiAgICBhcmdzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgcmV0dXJuIChyZWYgPSBNYXJpb25ldHRpc3QudXRpbHMpLndhaXRGb3IuYXBwbHkocmVmLCBhcmdzKTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5kZWZlcnJlZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBNYXJpb25ldHRpc3QuJC5EZWZlcnJlZCgpO1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLmZldGNoID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHZhciBhc3luY0ZldGNoZXMsIGRlZmVycmVkO1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgZGVmZXJyZWQgPSB0aGlzLmRlZmVycmVkKCk7XG4gICAgYXN5bmNGZXRjaGVzID0gTWFyaW9uZXR0aXN0Ll8uY2hhaW4oW3RoaXMuZ2V0KFwiYXN5bmNcIildKS5mbGF0dGVuKCkuY29tcGFjdCgpLnZhbHVlKCk7XG4gICAgdGhpcy53YWl0Rm9yKGFzeW5jRmV0Y2hlcywge1xuICAgICAgc3VjY2VzczogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKG9wdGlvbnMuc3VjY2VzcykpIHtcbiAgICAgICAgICBvcHRpb25zLnN1Y2Nlc3MoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgfSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24ob3B0aW9ucy5lcnJvcikpIHtcbiAgICAgICAgICBvcHRpb25zLmVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnJlamVjdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmRlZmVycmVkKCkucHJvbWlzZSgpO1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5kZWZlcnJlZCgpLnByb21pc2UoKTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uKGluc3RhbmNlLCBpZCkge1xuICAgIGlmICh0aGlzLl9yZWdpc3RyeSA9PSBudWxsKSB7XG4gICAgICB0aGlzLl9yZWdpc3RyeSA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcmVnaXN0cnlbaWRdID0gaW5zdGFuY2U7XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUudW5yZWdpc3RlciA9IGZ1bmN0aW9uKGluc3RhbmNlLCBpZCkge1xuICAgIHJldHVybiBkZWxldGUgdGhpcy5fcmVnaXN0cnlbaWRdO1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLnJlc2V0UmVnaXN0cnkgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIga2V5LCBtc2csIG9sZENvdW50LCByZWYsIHJlc3BvbmRlcjtcbiAgICBvbGRDb3VudCA9IHRoaXMuZ2V0UmVnaXN0cnlTaXplKCk7XG4gICAgcmVmID0gdGhpcy5fcmVnaXN0cnk7XG4gICAgZm9yIChrZXkgaW4gcmVmKSB7XG4gICAgICByZXNwb25kZXIgPSByZWZba2V5XTtcbiAgICAgIHJlc3BvbmRlci5yZWdpb24uY2xvc2UoKTtcbiAgICB9XG4gICAgbXNnID0gXCJUaGVyZSB3ZXJlIFwiICsgb2xkQ291bnQgKyBcIiByZXNwb25kZXJzIGluIHRoZSByZWdpc3RyeSwgdGhlcmUgYXJlIG5vdyBcIiArICh0aGlzLmdldFJlZ2lzdHJ5U2l6ZSgpKTtcbiAgICBpZiAodGhpcy5nZXRSZWdpc3RyeVNpemUoKSA+IDApIHtcbiAgICAgIHJldHVybiBjb25zb2xlLndhcm4obXNnLCB0aGlzLl9yZWdpc3RyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjb25zb2xlLmxvZyhtc2cpO1xuICAgIH1cbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5nZXRSZWdpc3RyeVNpemUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0Ll8uc2l6ZSh0aGlzLl9yZWdpc3RyeSk7XG4gIH07XG5cbiAgcmV0dXJuIEJhc2U7XG5cbn0pKE1vZGVsQmFzZSk7XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2U7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuLi8uLi9jb3JlLmpzXCI7XG5pbXBvcnQgQmFja2JvbmUgZnJvbSBcImJhY2tib25lXCI7XG5pbXBvcnQgQmFzZU1vZGVsIGZyb20gXCIuLi8uLi9lbnRpdGllcy9tb2RlbHMvYmFzZS5qc1wiO1xuaW1wb3J0IEJhc2VDb2xsZWN0aW9uIGZyb20gXCIuLi8uLi9lbnRpdGllcy9jb2xsZWN0aW9ucy9iYXNlLmpzXCI7XG5pbXBvcnQgQmFzZVJlc3BvbmRlciBmcm9tIFwiLi4vLi4vZW50aXRpZXMvcmVzcG9uZGVycy9iYXNlLmpzXCI7XG52YXIgQmFzZSxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkJhc2UgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoQmFzZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQmFzZSgpIHtcbiAgICByZXR1cm4gQmFzZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIEJhc2UucHJvdG90eXBlLnJlc3BvbmRlcnMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYmFzZTogQmFzZVJlc3BvbmRlclxuICAgIH07XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUubW9kZWxzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJhc2U6IEJhc2VNb2RlbFxuICAgIH07XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUuY29sbGVjdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYmFzZTogQmFzZUNvbGxlY3Rpb25cbiAgICB9O1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLnZpZXdzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLmdldFJlc3BvbmRlciA9IGZ1bmN0aW9uKHJlc3BvbmRlck5hbWUsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldFJlc291cmNlKFwicmVzcG9uZGVyc1wiLCByZXNwb25kZXJOYW1lLCBvcHRpb25zKTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5nZXRWaWV3ID0gZnVuY3Rpb24odmlld05hbWUsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldFJlc291cmNlKFwidmlld3NcIiwgdmlld05hbWUsIG9wdGlvbnMpO1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLmdldE1vZGVsID0gZnVuY3Rpb24obW9kZWxOYW1lLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZXRSZXNvdXJjZShcIm1vZGVsc1wiLCBtb2RlbE5hbWUsIG9wdGlvbnMpO1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLmdldENvbGxlY3Rpb24gPSBmdW5jdGlvbihjb2xsZWN0aW9uTmFtZSwgbW9kZWxzLCBvcHRpb25zKSB7XG4gICAgaWYgKG1vZGVscyA9PSBudWxsKSB7XG4gICAgICBtb2RlbHMgPSBbXTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZXRSZXNvdXJjZShcImNvbGxlY3Rpb25zXCIsIGNvbGxlY3Rpb25OYW1lLCBvcHRpb25zLCBtb2RlbHMpO1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLmdldFJlc291cmNlID0gZnVuY3Rpb24ocmVzb3VyY2VzTmFtZSwgcmVzb3VyY2VOYW1lLCBvcHRpb25zLCBtb2RlbHMpIHtcbiAgICB2YXIgcmVzb3VyY2UsIHJlc291cmNlcztcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHJlc291cmNlID0gbnVsbDtcbiAgICByZXNvdXJjZXMgPSB0aGlzW3Jlc291cmNlc05hbWVdO1xuICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKHJlc291cmNlcykpIHtcbiAgICAgIHJlc291cmNlcyA9IHJlc291cmNlcygpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy52aWV3TW9kZWwgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy52aWV3TW9kZWwgPSB0aGlzO1xuICAgIH1cbiAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNPYmplY3QocmVzb3VyY2VzKSAmJiAocmVzb3VyY2VzW3Jlc291cmNlTmFtZV0gIT0gbnVsbCkpIHtcbiAgICAgIGlmIChtb2RlbHMgIT0gbnVsbCkge1xuICAgICAgICByZXNvdXJjZSA9IG5ldyByZXNvdXJjZXNbcmVzb3VyY2VOYW1lXShtb2RlbHMsIG9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb3VyY2UgPSBuZXcgcmVzb3VyY2VzW3Jlc291cmNlTmFtZV0ob3B0aW9ucyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXNvdXJjZTtcbiAgfTtcblxuICByZXR1cm4gQmFzZTtcblxufSkoQmFja2JvbmUuTW9kZWwpO1xuXG5leHBvcnQgZGVmYXVsdCBCYXNlO1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi4vY29yZS5qc1wiO1xudmFyIEJhc2UsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5CYXNlID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKEJhc2UsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIEJhc2UoKSB7XG4gICAgcmV0dXJuIEJhc2UuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBCYXNlLnByb3RvdHlwZS5uYXZpZ2F0ZVRvID0gZnVuY3Rpb24ocm91dGUsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHJldHVybiBNYXJpb25ldHRpc3QubG9jYXRpb24ubmF2aWdhdGVUbyhyb3V0ZSwgb3B0aW9ucyk7XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUuZ2V0Q3VycmVudFJvdXRlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5sb2NhdGlvbi5nZXRDdXJyZW50Um91dGUoKTtcbiAgfTtcblxuICByZXR1cm4gQmFzZTtcblxufSkoTWFyaW9uZXR0aXN0Lk9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2U7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbnZhciBBcHBsaWNhdGlvbixcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkFwcGxpY2F0aW9uID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKEFwcGxpY2F0aW9uLCBzdXBlckNsYXNzKTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuQ29udHJvbGxlcnMgPSBuZXcgTWFyaW9uZXR0aXN0Lk9iamVjdCgpO1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5FbnRpdGllcyA9IG5ldyBNYXJpb25ldHRpc3QuT2JqZWN0KCk7XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLlZpZXdzID0gbmV3IE1hcmlvbmV0dGlzdC5PYmplY3QoKTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuX2lzUnVubmluZyA9IGZhbHNlO1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5faXNEZXN0cm95ZWQgPSBmYWxzZTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUucHJldmVudERlc3Ryb3kgPSBmYWxzZTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuc3RhcnRBZnRlckluaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLnN0YXJ0V2l0aFBhcmVudCA9IGZhbHNlO1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5zdG9wV2l0aFBhcmVudCA9IHRydWU7XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLnJlc291cmNlcyA9IFtdO1xuXG4gIGZ1bmN0aW9uIEFwcGxpY2F0aW9uKG9wdGlvbnMpIHtcbiAgICBBcHBsaWNhdGlvbi5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICB0aGlzLl9pbml0Q2hpbGRBcHBzKG9wdGlvbnMpO1xuICAgIGlmIChNYXJpb25ldHRpc3QuXy5yZXN1bHQodGhpcywgJ3N0YXJ0QWZ0ZXJJbml0aWFsaXplZCcpKSB7XG4gICAgICB0aGlzLnN0YXJ0KG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5zdGFydEhpc3RvcnkgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBpZiAoIU1hcmlvbmV0dGlzdC5CYWNrYm9uZS5IaXN0b3J5LnN0YXJ0ZWQpIHtcbiAgICAgIHJldHVybiBNYXJpb25ldHRpc3QubG9jYXRpb24uc3RhcnRIaXN0b3J5KG9wdGlvbnMpO1xuICAgIH1cbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdGhpcy50cmlnZ2VyTWV0aG9kKFwiYmVmb3JlOnJlc291cmNlczpmZXRjaFwiLCBvcHRpb25zKTtcbiAgICBpZiAodGhpcy5yZXNvdXJjZXMgPT0gbnVsbCkge1xuICAgICAgdGhpcy5yZXNvdXJjZXMgPSBbXTtcbiAgICB9XG4gICAgcmV0dXJuIE1hcmlvbmV0dGlzdC51dGlscy53YWl0Rm9yKHRoaXMucmVzb3VyY2VzLCB7XG4gICAgICBzdWNjZXNzOiAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIEFwcGxpY2F0aW9uLl9fc3VwZXJfXy5zdGFydC5jYWxsKF90aGlzLCBvcHRpb25zKTtcbiAgICAgICAgICBfdGhpcy50cmlnZ2VyTWV0aG9kKFwicmVzb3VyY2VzOmZldGNoOnN1Y2Nlc3NcIik7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLnRyaWdnZXJNZXRob2QoXCJyZWFkeVwiKTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpLFxuICAgICAgZXJyb3I6IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLnRyaWdnZXJNZXRob2QoXCJyZXNvdXJjZXM6ZmV0Y2g6ZXJyb3JcIik7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKVxuICAgIH0pO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5pc1J1bm5pbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5faXNSdW5uaW5nO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIGlmICghdGhpcy5faXNSdW5uaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyTWV0aG9kKCdiZWZvcmU6c3RvcCcsIG9wdGlvbnMpO1xuICAgIHRoaXMuX2lzUnVubmluZyA9IGZhbHNlO1xuICAgIHRoaXMudHJpZ2dlck1ldGhvZCgnc3RvcCcsIG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5faW5pdENoaWxkQXBwcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjaGlsZEFwcHMsIG9wdGlvbnM7XG4gICAgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHZvaWQgMCA/IHt9IDogYXJndW1lbnRzWzBdO1xuICAgIHRoaXMuX2NoaWxkQXBwcyA9IHt9O1xuICAgIHRoaXMubWVyZ2VPcHRpb25zKG9wdGlvbnMsIFsnY2hpbGRBcHBzJywgJ2NoaWxkQXBwT3B0aW9ucyddKTtcbiAgICBjaGlsZEFwcHMgPSB0aGlzLmNoaWxkQXBwcztcbiAgICBpZiAoY2hpbGRBcHBzKSB7XG4gICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihjaGlsZEFwcHMpKSB7XG4gICAgICAgIGNoaWxkQXBwcyA9IGNoaWxkQXBwcy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgdGhpcy5hZGRDaGlsZEFwcHMoY2hpbGRBcHBzKTtcbiAgICB9XG4gICAgdGhpcy5faW5pdExpc3RlbmVycygpO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5faW5pdExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMub24oe1xuICAgICAgJ3N0YXJ0JzogdGhpcy5fc3RhcnRDaGlsZEFwcHMsXG4gICAgICAnYmVmb3JlOnN0b3AnOiB0aGlzLl9zdG9wQ2hpbGRBcHBzLFxuICAgICAgJ2JlZm9yZTpkZXN0cm95JzogdGhpcy5fZGVzdHJveUNoaWxkQXBwc1xuICAgIH0pO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5fc3RhcnRDaGlsZEFwcHMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5fLmVhY2godGhpcy5fY2hpbGRBcHBzLCBmdW5jdGlvbihjaGlsZEFwcCkge1xuICAgICAgaWYgKE1hcmlvbmV0dGlzdC51dGlscy5nZXRWYWx1ZShjaGlsZEFwcC5nZXRPcHRpb24oXCJzdGFydFdpdGhQYXJlbnRcIikpID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBjaGlsZEFwcC5zdGFydChvcHRpb25zKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuX3N0b3BDaGlsZEFwcHMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5fLmVhY2godGhpcy5fY2hpbGRBcHBzLCBmdW5jdGlvbihjaGlsZEFwcCkge1xuICAgICAgaWYgKE1hcmlvbmV0dGlzdC5fLnJlc3VsdChjaGlsZEFwcCwgJ3N0b3BXaXRoUGFyZW50JykpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkQXBwLnN0b3Aob3B0aW9ucyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLl9kZXN0cm95Q2hpbGRBcHBzID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHJldHVybiBNYXJpb25ldHRpc3QuXy5lYWNoKHRoaXMuX2NoaWxkQXBwcywgZnVuY3Rpb24oY2hpbGRBcHApIHtcbiAgICAgIGlmICghTWFyaW9uZXR0aXN0Ll8ucmVzdWx0KGNoaWxkQXBwLCAncHJldmVudERlc3Ryb3knKSkge1xuICAgICAgICByZXR1cm4gY2hpbGRBcHAuZGVzdHJveShvcHRpb25zKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuX2J1aWxkQXBwRnJvbU9iamVjdCA9IGZ1bmN0aW9uKGFwcENvbmZpZykge1xuICAgIHZhciBBcHBDbGFzcywgb3B0aW9ucztcbiAgICBBcHBDbGFzcyA9IGFwcENvbmZpZy5BcHBDbGFzcztcbiAgICBvcHRpb25zID0gTWFyaW9uZXR0aXN0Ll8ub21pdChhcHBDb25maWcsICdBcHBDbGFzcycpO1xuICAgIHJldHVybiB0aGlzLmJ1aWxkQXBwKEFwcENsYXNzLCBvcHRpb25zKTtcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuX2J1aWxkQXBwID0gZnVuY3Rpb24oQXBwQ2xhc3MsIG9wdGlvbnMpIHtcbiAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihBcHBDbGFzcykpIHtcbiAgICAgIHJldHVybiB0aGlzLmJ1aWxkQXBwKEFwcENsYXNzLCBvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzT2JqZWN0KEFwcENsYXNzKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2J1aWxkQXBwRnJvbU9iamVjdChBcHBDbGFzcyk7XG4gICAgfVxuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5idWlsZEFwcCA9IGZ1bmN0aW9uKEFwcENsYXNzLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IE1hcmlvbmV0dGlzdC5fLmV4dGVuZCh7fSwgdGhpcy5jaGlsZEFwcE9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIHJldHVybiBuZXcgQXBwQ2xhc3Mob3B0aW9ucyk7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLl9lbnN1cmVBcHBJc1VuaXF1ZSA9IGZ1bmN0aW9uKGFwcE5hbWUpIHtcbiAgICBpZiAodGhpcy5fY2hpbGRBcHBzW2FwcE5hbWVdKSB7XG4gICAgICB0aHJvdyBuZXcgTWFyaW9uZXR0ZS5FcnJvcih7XG4gICAgICAgIG5hbWU6ICdEdXBsaWNhdGVDaGlsZEFwcEVycm9yJyxcbiAgICAgICAgbWVzc2FnZTogJ0EgY2hpbGQgQXBwIHdpdGggbmFtZSBcIicgKyBhcHBOYW1lICsgJ1wiIGhhcyBhbHJlYWR5IGJlZW4gYWRkZWQuJ1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5hZGRDaGlsZEFwcHMgPSBmdW5jdGlvbihjaGlsZEFwcHMpIHtcbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0Ll8uZWFjaChjaGlsZEFwcHMsIChmdW5jdGlvbihjaGlsZEFwcCwgYXBwTmFtZSkge1xuICAgICAgdGhpcy5hZGRDaGlsZEFwcChhcHBOYW1lLCBjaGlsZEFwcCk7XG4gICAgfSksIHRoaXMpO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5hZGRDaGlsZEFwcCA9IGZ1bmN0aW9uKGFwcE5hbWUsIEFwcENsYXNzLCBvcHRpb25zKSB7XG4gICAgdmFyIGNoaWxkQXBwO1xuICAgIHRoaXMuX2Vuc3VyZUFwcElzVW5pcXVlKGFwcE5hbWUpO1xuICAgIGNoaWxkQXBwID0gdGhpcy5fYnVpbGRBcHAoQXBwQ2xhc3MsIG9wdGlvbnMpO1xuICAgIGlmICghY2hpbGRBcHApIHtcbiAgICAgIHRocm93IG5ldyBNYXJpb25ldHRlLkVycm9yKHtcbiAgICAgICAgbmFtZTogJ0FkZENoaWxkQXBwRXJyb3InLFxuICAgICAgICBtZXNzYWdlOiAnQXBwIGJ1aWxkIGZhaWxlZC4gIEluY29ycmVjdCBjb25maWd1cmF0aW9uLidcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjaGlsZEFwcC5fbmFtZSA9IGFwcE5hbWU7XG4gICAgdGhpcy5fY2hpbGRBcHBzW2FwcE5hbWVdID0gY2hpbGRBcHA7XG4gICAgY2hpbGRBcHAub24oJ2Rlc3Ryb3knLCBNYXJpb25ldHRpc3QuXy5wYXJ0aWFsKHRoaXMuX3JlbW92ZUNoaWxkQXBwLCBhcHBOYW1lKSwgdGhpcyk7XG4gICAgaWYgKHRoaXMuaXNSdW5uaW5nKCkgJiYgTWFyaW9uZXR0aXN0Ll8ucmVzdWx0KGNoaWxkQXBwLCAnc3RhcnRXaXRoUGFyZW50JykpIHtcbiAgICAgIGNoaWxkQXBwLnN0YXJ0KCk7XG4gICAgfVxuICAgIHJldHVybiBjaGlsZEFwcDtcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuZ2V0TmFtZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5nZXRDaGlsZEFwcHMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0Ll8uY2xvbmUodGhpcy5fY2hpbGRBcHBzKTtcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuZ2V0Q2hpbGRBcHAgPSBmdW5jdGlvbihhcHBOYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkQXBwc1thcHBOYW1lXTtcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuX3JlbW92ZUNoaWxkQXBwID0gZnVuY3Rpb24oYXBwTmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLl9jaGlsZEFwcHNbYXBwTmFtZV0uX25hbWU7XG4gICAgZGVsZXRlIHRoaXMuX2NoaWxkQXBwc1thcHBOYW1lXTtcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBcHBzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNoaWxkQXBwcztcbiAgICBjaGlsZEFwcHMgPSB0aGlzLmdldENoaWxkQXBwcygpO1xuICAgIE1hcmlvbmV0dGlzdC5fLmVhY2godGhpcy5fY2hpbGRBcHBzLCAoZnVuY3Rpb24oY2hpbGRBcHAsIGFwcE5hbWUpIHtcbiAgICAgIHRoaXMucmVtb3ZlQ2hpbGRBcHAoYXBwTmFtZSk7XG4gICAgfSksIHRoaXMpO1xuICAgIHJldHVybiBjaGlsZEFwcHM7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLnJlbW92ZUNoaWxkQXBwID0gZnVuY3Rpb24oYXBwTmFtZSwgb3B0aW9ucykge1xuICAgIHZhciBjaGlsZEFwcDtcbiAgICBvcHRpb25zID0gTWFyaW9uZXR0aXN0Ll8uZXh0ZW5kKHt9LCBvcHRpb25zKTtcbiAgICBjaGlsZEFwcCA9IHRoaXMuZ2V0Q2hpbGRBcHAoYXBwTmFtZSk7XG4gICAgaWYgKCFjaGlsZEFwcCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5wcmV2ZW50RGVzdHJveSB8fCBNYXJpb25ldHRpc3QuXy5yZXN1bHQoY2hpbGRBcHAsICdwcmV2ZW50RGVzdHJveScpKSB7XG4gICAgICB0aGlzLl9yZW1vdmVDaGlsZEFwcChhcHBOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hpbGRBcHAuZGVzdHJveSgpO1xuICAgIH1cbiAgICByZXR1cm4gY2hpbGRBcHA7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHt9O1xuXG4gIHJldHVybiBBcHBsaWNhdGlvbjtcblxufSkoTWFyaW9uZXR0aXN0LkFwcGxpY2F0aW9uKTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwbGljYXRpb247XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbmltcG9ydCBFbnYgZnJvbSBcIi4vZW52LmpzXCI7XG5pbXBvcnQgQ2hhbm5lbHMgZnJvbSBcIi4vY2hhbm5lbHMuanNcIjtcbmltcG9ydCBMb2NhdGlvbiBmcm9tIFwiLi9sb2NhdGlvbi5qc1wiO1xuaW1wb3J0IENvbmZpZyBmcm9tIFwiLi9jb25maWcuanNcIjtcbmltcG9ydCBSZW5kZXJlciBmcm9tIFwiLi9taXhpbnMvcmVuZGVyZXIuanNcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlscy5qc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi9sb2dnZXIuanNcIjtcbmltcG9ydCBBcHBSb3V0ZSBmcm9tIFwiLi9yb3V0ZS5qc1wiO1xuaW1wb3J0IEFwcFJvdXRlciBmcm9tIFwiLi9yb3V0ZXIuanNcIjtcbmltcG9ydCBSZWdpb24gZnJvbSBcIi4vcmVnaW9uLmpzXCI7XG5pbXBvcnQgVmlld3MgZnJvbSBcIi4vdmlld3MuanNcIjtcbmltcG9ydCBCYXNlVmlldyBmcm9tIFwiLi92aWV3cy9iYXNlLmpzXCI7XG5pbXBvcnQgQ29sbGVjdGlvblZpZXcgZnJvbSBcIi4vdmlld3MvY29sbGVjdGlvbi5qc1wiO1xuaW1wb3J0IEJhc2VNb2RlbCBmcm9tIFwiLi9lbnRpdGllcy9tb2RlbHMvYmFzZS5qc1wiO1xuaW1wb3J0IEJhc2VDb2xsZWN0aW9uIGZyb20gXCIuL2VudGl0aWVzL2NvbGxlY3Rpb25zL2Jhc2UuanNcIjtcbmltcG9ydCBCYXNlUmVzcG9uZGVyIGZyb20gXCIuL2VudGl0aWVzL3Jlc3BvbmRlcnMvYmFzZS5qc1wiO1xuaW1wb3J0IEJhc2VWaWV3TW9kZWwgZnJvbSBcIi4vZW50aXRpZXMvdmlldy1tb2RlbHMvYmFzZS5qc1wiO1xuaW1wb3J0IEJhc2VDb250cm9sbGVyIGZyb20gXCIuL2NvbnRyb2xsZXJzL2Jhc2UuanNcIjtcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tIFwiLi9hcHBsaWNhdGlvbi5qc1wiO1xudmFyIHJvb3QsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5yb290ID0gdHlwZW9mIHNlbGYgPT09ICdvYmplY3QnICYmIHNlbGYuc2VsZiA9PT0gc2VsZiAmJiBzZWxmIHx8IHR5cGVvZiBnbG9iYWwgPT09ICdvYmplY3QnICYmIGdsb2JhbC5nbG9iYWwgPT09IGdsb2JhbCAmJiBnbG9iYWw7XG5cbk1hcmlvbmV0dGlzdC5jaGFubmVscyA9IG5ldyBDaGFubmVscygpO1xuXG5NYXJpb25ldHRpc3QubG9jYXRpb24gPSBuZXcgTG9jYXRpb24oKTtcblxuTWFyaW9uZXR0aXN0LmVudiA9IG5ldyBFbnYoKTtcblxuTWFyaW9uZXR0aXN0LmNvbmZpZyA9IG5ldyBDb25maWcoKTtcblxuTWFyaW9uZXR0aXN0LmxvZ2dlciA9IG5ldyBMb2dnZXI7XG5cbk1hcmlvbmV0dGlzdC5fLmV4dGVuZChNYXJpb25ldHRpc3QuUmVuZGVyZXIsIFJlbmRlcmVyKTtcblxuTWFyaW9uZXR0aXN0LnV0aWxzID0gbmV3IFV0aWxzO1xuXG5NYXJpb25ldHRpc3QuQXBwUm91dGUgPSBBcHBSb3V0ZTtcblxuTWFyaW9uZXR0aXN0LkFwcFJvdXRlciA9IEFwcFJvdXRlcjtcblxuTWFyaW9uZXR0aXN0Ll8uZXh0ZW5kKE1hcmlvbmV0dGlzdC5SZWdpb24ucHJvdG90eXBlLCBSZWdpb24ucHJvdG90eXBlKTtcblxuTWFyaW9uZXR0aXN0LlZpZXdzID0gbmV3IFZpZXdzKCk7XG5cbk1hcmlvbmV0dGlzdC5fLmV4dGVuZChNYXJpb25ldHRpc3QuVmlldy5wcm90b3R5cGUsIHtcbiAgdGVtcGxhdGVDb250ZXh0OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaGVscGVycztcbiAgICBoZWxwZXJzID0gTWFyaW9uZXR0aXN0LlZpZXdzLnRlbXBsYXRlSGVscGVycztcbiAgICByZXR1cm4gaGVscGVycztcbiAgfVxufSk7XG5cbk1hcmlvbmV0dGlzdC5WaWV3cy5CYXNlVmlldyA9IEJhc2VWaWV3O1xuXG5NYXJpb25ldHRpc3QuVmlld3MuQ29sbGVjdGlvbiA9IENvbGxlY3Rpb25WaWV3O1xuXG5NYXJpb25ldHRpc3QuRW50aXRpZXMgPSBuZXcgTWFyaW9uZXR0aXN0Lk9iamVjdCgpO1xuXG5NYXJpb25ldHRpc3QuRW50aXRpZXMuTW9kZWxzID0gbmV3IE1hcmlvbmV0dGlzdC5PYmplY3QoKTtcblxuTWFyaW9uZXR0aXN0LkVudGl0aWVzLkNvbGxlY3Rpb25zID0gbmV3IE1hcmlvbmV0dGlzdC5PYmplY3QoKTtcblxuTWFyaW9uZXR0aXN0LkVudGl0aWVzLlZpZXdNb2RlbHMgPSBuZXcgTWFyaW9uZXR0aXN0Lk9iamVjdCgpO1xuXG5NYXJpb25ldHRpc3QuRW50aXRpZXMuUmVzcG9uZGVycyA9IG5ldyBNYXJpb25ldHRpc3QuT2JqZWN0KCk7XG5cbk1hcmlvbmV0dGlzdC5FbnRpdGllcy5Nb2RlbHMuQmFzZSA9IEJhc2VNb2RlbDtcblxuaWYgKE1hcmlvbmV0dGlzdC5CYWNrYm9uZS5Bc3NvY2lhdGVkTW9kZWwpIHtcbiAgTWFyaW9uZXR0aXN0LkVudGl0aWVzLk1vZGVscy5Bc3NvY2lhdGVkID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgICBleHRlbmQoQXNzb2NpYXRlZCwgc3VwZXJDbGFzcyk7XG5cbiAgICBmdW5jdGlvbiBBc3NvY2lhdGVkKCkge1xuICAgICAgcmV0dXJuIEFzc29jaWF0ZWQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEFzc29jaWF0ZWQ7XG5cbiAgfSkoTWFyaW9uZXR0aXN0LkJhY2tib25lLkFzc29jaWF0ZWRNb2RlbCk7XG59XG5cbk1hcmlvbmV0dGlzdC5FbnRpdGllcy5Db2xsZWN0aW9ucy5CYXNlID0gQmFzZUNvbGxlY3Rpb247XG5cbk1hcmlvbmV0dGlzdC5FbnRpdGllcy5SZXNwb25kZXJzLkJhc2UgPSBCYXNlUmVzcG9uZGVyO1xuXG5NYXJpb25ldHRpc3QuRW50aXRpZXMuVmlld01vZGVscy5CYXNlID0gQmFzZVZpZXdNb2RlbDtcblxuTWFyaW9uZXR0aXN0LkNvbnRyb2xsZXJzID0gbmV3IE1hcmlvbmV0dGlzdC5PYmplY3QoKTtcblxuTWFyaW9uZXR0aXN0LkNvbnRyb2xsZXJzLkJhc2UgPSBCYXNlQ29udHJvbGxlcjtcblxuTWFyaW9uZXR0aXN0LkFwcGxpY2F0aW9uID0gQXBwbGljYXRpb247XG5cbmlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbCAhPT0gbnVsbCkge1xuICBnbG9iYWwuTWFyaW9uZXR0aXN0ID0gTWFyaW9uZXR0aXN0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBNYXJpb25ldHRpc3Q7XG4iXSwibmFtZXMiOlsiTWFyaW9uZXR0aXN0IiwiTWFyaW9uZXR0ZSIsImhhc1Byb3AiLCJleHRlbmQiLCJUZW1wbGF0ZXMiLCJzbGljZSIsIkJhc2UiLCJNb2RlbEJhc2UiLCJCYXNlVmlldyIsIkNoYW5uZWxzIiwiTG9jYXRpb24iLCJFbnYiLCJDb25maWciLCJMb2dnZXIiLCJSZW5kZXJlciIsIlV0aWxzIiwiQXBwUm91dGUiLCJBcHBSb3V0ZXIiLCJSZWdpb24iLCJWaWV3cyIsIkNvbGxlY3Rpb25WaWV3IiwiQXBwbGljYXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQWFBLElBQUlBLGNBQVksQ0FBQzs7QUFFakJBLGNBQVksR0FBR0MsWUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDOztBQUVuQ0QsY0FBWSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7O0FBRWpDQSxjQUFZLENBQUMsVUFBVSxHQUFHQyxZQUFVLENBQUM7O0FBRXJDRCxjQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFbkJBLGNBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVuQkEsY0FBWSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRW5CQSxjQUFZLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQzs7QUFFNUJBLGNBQVksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOztBQUUvQkEsY0FBWSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7O0FBRTdCLHFCQUFlQSxjQUFZLENBQUM7O0FDaEN4QixJQUFBLEdBQUcsQ0FBQTtBQUNMLElBQUFHLFFBQU0sR0FBRyxTQUFTLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxLQUFLLElBQUksR0FBRyxJQUFJLE1BQU0sRUFBRSxFQUFFLElBQUlELFNBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsSUFBSSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUs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LEVBQUUsRUFBRSxJQUFJRCxTQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLElBQUksR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxFQUFFLENBQUE7QUFDMVIsSUFBQUEsU0FBTyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUE7QUFDM0IsSUFBQSxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQTtBQUVsQixLQUFLLEdBQUcsQ0FBQyxTQUFTLFVBQVUsRUFBRTtFQUM1QkMsUUFBTSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQzs7RUFFMUIsU0FBUyxLQUFLLEdBQUc7SUFDZixPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7R0FDM0Q7O0VBRUQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsU0FBUyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRTtJQUMxRCxJQUFJSCxjQUFZLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTtNQUNwQyxLQUFLLEdBQUcsTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDckU7SUFDRCxPQUFPLEtBQUssQ0FBQztHQUNkLENBQUM7O0VBRUYsS0FBSyxDQUFDLFNBQVMsQ0FB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LENBQUMsQ0FBQzs7RUFFM0IsU0FBUyxNQUFNLEdBQUcsRUFBRTs7RUFFcEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsU0FBUyxHQUFHLEVBQUUsT0FBTyxFQUFFO0lBQ2hELElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtNQUNuQixPQUFPLEdBQUcsRUFBRSxDQUFDO0tBQ2Q7SUFDRCxPQUFPLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztJQUN6QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0dBQy9CLENBQUM7O0VBRUYsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxHQUFHLEVBQUUsT0FBTyxFQUFFO0lBQzdDLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtNQUNuQixPQUFPLEdBQUcsRUFBRSxDQUFDO0tBQ2Q7SUFDRCxPQUFPLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztJQUN0QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0dBQy9CLENBQUM7O0VBRUYsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxHQUFHLEVBQUUsT0FBTyxFQUFFO0lBQzlDLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtNQUNuQixPQUFPLEdBQUcsRUFBRSxDQUFDO0tBQ2Q7SUFDRCxPQUFPLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztJQUN2QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0dBQy9CLENBQUM7O0VBRUYsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxHQUFHLEVBQUUsT0FBTyxFQUFFO0lBQzdDLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtNQUNuQixPQUFPLEdBQUcsRUFBRSxDQUFDO0tBQ2Q7SUFDRCxPQUFPLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztJQUN0QixPQUFPLElBQUksQ0FBQyxHQUFHLENB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