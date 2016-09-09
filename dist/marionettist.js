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

var Module;

Module = Marionettist$2.Object.extend(Marionettist$2.Backbone.Radio.Requests, {
  initialize: function() {}
});

var Module$1 = Module;

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
var hasProp = {}.hasOwnProperty;
Marionettist$2.channels = new Channels$1();

Marionettist$2.location = new Location$1();

Marionettist$2.Module = Module$1;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvY29yZS5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvZW52LmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9jaGFubmVscy5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvbG9jYXRpb24uanMiLCIvbW50LzdhNmMwY2JkLTY3YzgtNDU5Ny05ZDMzLTJlMjliMTJkZjJhOS9yZXBvcy9tYXJpb25ldHRpc3QvbGliL2NvbmZpZy90ZW1wbGF0ZXMuanMiLCIvbW50LzdhNmMwY2JkLTY3YzgtNDU5Ny05ZDMzLTJlMjliMTJkZjJhOS9yZXBvcy9tYXJpb25ldHRpc3QvbGliL2NvbmZpZy5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvbWl4aW5zL3JlbmRlcmVyLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi91dGlscy5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvbG9nZ2VyLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9yb3V0ZS5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvcm91dGVyLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9yZWdpb24uanMiLCIvbW50LzdhNmMwY2JkLTY3YzgtNDU5Ny05ZDMzLTJlMjliMTJkZjJhOS9yZXBvcy9tYXJpb25ldHRpc3QvbGliL3ZpZXdzLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi92aWV3cy9iYXNlLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi92aWV3cy9jb2xsZWN0aW9uLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9lbnRpdGllcy9tb2RlbHMvYmFzZS5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvZW50aXRpZXMvY29sbGVjdGlvbnMvYmFzZS5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvZW50aXRpZXMvcmVzcG9uZGVycy9iYXNlLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9lbnRpdGllcy92aWV3LW1vZGVscy9iYXNlLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9jb250cm9sbGVycy9iYXNlLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9hcHBsaWNhdGlvbi5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvbW9kdWxlLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9tYXJpb25ldHRpc3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSBcInVuZGVyc2NvcmVcIjtcbmltcG9ydCB1bmRlcnNjb3JlQ29udHJpYiBmcm9tIFwidW5kZXJzY29yZS1jb250cmliXCI7XG5pbXBvcnQgcyBmcm9tIFwidW5kZXJzY29yZS5zdHJpbmdcIjtcbmltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCBCYWNrYm9uZSBmcm9tIFwiYmFja2JvbmVcIjtcbmltcG9ydCBiYWNrYm9uZV9yYWRpbyBmcm9tIFwiYmFja2JvbmUucmFkaW9cIjtcbmltcG9ydCBiYWNrYm9uZUFzc29jaWF0aW9ucyBmcm9tIFwiYmFja2JvbmUtYXNzb2NpYXRpb25zXCI7XG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tIFwiYmFja2JvbmUubWFyaW9uZXR0ZVwiO1xuaW1wb3J0IGkxOG5leHQgZnJvbSBcImkxOG5leHRcIjtcbmltcG9ydCBudW1lcmFsIGZyb20gXCJudW1lcmFsXCI7XG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcbmltcG9ydCBtb21lbnRSYW5nZSBmcm9tIFwibW9tZW50LXJhbmdlXCI7XG5pbXBvcnQgbW9tZW50VGltZXpvbmUgZnJvbSBcIm1vbWVudC10aW1lem9uZVwiO1xudmFyIE1hcmlvbmV0dGlzdDtcblxuTWFyaW9uZXR0aXN0ID0gTWFyaW9uZXR0ZS5leHRlbmQoKTtcblxuTWFyaW9uZXR0aXN0LkJhY2tib25lID0gQmFja2JvbmU7XG5cbk1hcmlvbmV0dGlzdC5NYXJpb25ldHRlID0gTWFyaW9uZXR0ZTtcblxuTWFyaW9uZXR0aXN0Ll8gPSBfO1xuXG5NYXJpb25ldHRpc3QuJCA9ICQ7XG5cbk1hcmlvbmV0dGlzdC5zID0gcztcblxuTWFyaW9uZXR0aXN0LkkxOG4gPSBpMThuZXh0O1xuXG5NYXJpb25ldHRpc3QubnVtZXJhbCA9IG51bWVyYWw7XG5cbk1hcmlvbmV0dGlzdC5tb21lbnQgPSBtb21lbnQ7XG5cbmV4cG9ydCBkZWZhdWx0IE1hcmlvbmV0dGlzdDtcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4vY29yZS5qc1wiO1xudmFyIEVudixcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkVudiA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChFbnYsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIEVudigpIHtcbiAgICB0aGlzLnN0YWdlID0gXCJkZXZlbG9wbWVudFwiO1xuICB9XG5cbiAgRW52LnByb3RvdHlwZS5pc0RldmVsb3BtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhZ2UgPT09IFwiZGV2ZWxvcG1lbnRcIjtcbiAgfTtcblxuICBFbnYucHJvdG90eXBlLmlzUHJvZHVjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnN0YWdlID09PSBcInByb2R1Y3Rpb25cIjtcbiAgfTtcblxuICBFbnYucHJvdG90eXBlLmdldExvY2FsZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBNYXJpb25ldHRpc3QuSTE4bi5sYW5ndWFnZTtcbiAgfTtcblxuICBFbnYucHJvdG90eXBlLnNldFN0YWdlID0gZnVuY3Rpb24oc3RhZ2UpIHtcbiAgICB2YXIgb2xkU3RhdGU7XG4gICAgb2xkU3RhdGUgPSB0aGlzLnN0YWdlO1xuICAgIHRoaXMuc3RhZ2UgPSBzdGFnZTtcbiAgICByZXR1cm4gdGhpcy50cmlnZ2VyTWV0aG9kKFwiY2hhbmdlOnN0YWdlXCIsIG9sZFN0YXRlLCBzdGFnZSk7XG4gIH07XG5cbiAgRW52LnByb3RvdHlwZS5nZXRTdGFnZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnN0YWdlO1xuICB9O1xuXG4gIEVudi5wcm90b3R5cGUuc2V0TG9jYWxlID0gZnVuY3Rpb24obG9jYWxlLCBjYWxsYmFjaykge1xuICAgIHZhciBvbGRMb2NhbGU7XG4gICAgaWYgKGxvY2FsZSA9PSBudWxsKSB7XG4gICAgICBsb2NhbGUgPSBcImVuXCI7XG4gICAgfVxuICAgIGlmIChjYWxsYmFjayA9PSBudWxsKSB7XG4gICAgICBjYWxsYmFjayA9IG51bGw7XG4gICAgfVxuICAgIG9sZExvY2FsZSA9IHRoaXMuZ2V0TG9jYWxlKCk7XG4gICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5JMThuLmNoYW5nZUxhbmd1YWdlKGxvY2FsZSwgZnVuY3Rpb24odCkge1xuICAgICAgTWFyaW9uZXR0aXN0LmNoYW5uZWxzLnB1Ymxpc2goXCJtYXJpb25ldHRpc3RcIiwgXCJjaGFuZ2U6bG9jYWxlXCIsIHtcbiAgICAgICAgY3VycmVudExvY2FsZTogbG9jYWxlLFxuICAgICAgICBvbGRMb2NhbGU6IG9sZExvY2FsZVxuICAgICAgfSk7XG4gICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihjYWxsYmFjaykpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBFbnY7XG5cbn0pKE1hcmlvbmV0dGlzdC5PYmplY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBFbnY7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbnZhciBDaGFubmVscyxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkNoYW5uZWxzID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKENoYW5uZWxzLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBDaGFubmVscygpIHt9XG5cbiAgQ2hhbm5lbHMucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbihjaGFubmVsTmFtZSwgZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgaWYgKGNoYW5uZWxOYW1lID09IG51bGwpIHtcbiAgICAgIGNoYW5uZWxOYW1lID0gXCJnbG9iYWxcIjtcbiAgICB9XG4gICAgaWYgKGV2ZW50TmFtZSA9PSBudWxsKSB7XG4gICAgICBldmVudE5hbWUgPSBcIlwiO1xuICAgIH1cbiAgICBpZiAoZGF0YSA9PSBudWxsKSB7XG4gICAgICBkYXRhID0ge307XG4gICAgfVxuICAgIHJldHVybiBNYXJpb25ldHRpc3QuQmFja2JvbmUuUmFkaW8uY2hhbm5lbChjaGFubmVsTmFtZSkucmVxdWVzdChldmVudE5hbWUsIGRhdGEpO1xuICB9O1xuXG4gIENoYW5uZWxzLnByb3RvdHlwZS5yZXBseU9uY2UgPSBmdW5jdGlvbihjaGFubmVsTmFtZSwgZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBjaGFubmVsO1xuICAgIGlmIChjaGFubmVsTmFtZSA9PSBudWxsKSB7XG4gICAgICBjaGFubmVsTmFtZSA9IFwiZ2xvYmFsXCI7XG4gICAgfVxuICAgIGlmIChldmVudE5hbWUgPT0gbnVsbCkge1xuICAgICAgZXZlbnROYW1lID0gXCJcIjtcbiAgICB9XG4gICAgY2hhbm5lbCA9IE1hcmlvbmV0dGlzdC5CYWNrYm9uZS5SYWRpby5jaGFubmVsKGNoYW5uZWxOYW1lKTtcbiAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihjYWxsYmFjaykpIHtcbiAgICAgIHJldHVybiBjaGFubmVsLnJlcGx5T25jZShldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNoYW5uZWwucmVwbHlPbmNlKGNhbGxiYWNrKTtcbiAgICB9XG4gIH07XG5cbiAgQ2hhbm5lbHMucHJvdG90eXBlLnJlcGx5ID0gZnVuY3Rpb24oY2hhbm5lbE5hbWUsIGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgY2hhbm5lbDtcbiAgICBpZiAoY2hhbm5lbE5hbWUgPT0gbnVsbCkge1xuICAgICAgY2hhbm5lbE5hbWUgPSBcImdsb2JhbFwiO1xuICAgIH1cbiAgICBpZiAoZXZlbnROYW1lID09IG51bGwpIHtcbiAgICAgIGV2ZW50TmFtZSA9IFwiXCI7XG4gICAgfVxuICAgIGNoYW5uZWwgPSBNYXJpb25ldHRpc3QuQmFja2JvbmUuUmFkaW8uY2hhbm5lbChjaGFubmVsTmFtZSk7XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgICByZXR1cm4gY2hhbm5lbC5yZXBseShldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNoYW5uZWwucmVwbHkoY2FsbGJhY2spO1xuICAgIH1cbiAgfTtcblxuICBDaGFubmVscy5wcm90b3R5cGUucHVibGlzaCA9IGZ1bmN0aW9uKGNoYW5uZWxOYW1lLCBldmVudE5hbWUsIGRhdGEpIHtcbiAgICBpZiAoY2hhbm5lbE5hbWUgPT0gbnVsbCkge1xuICAgICAgY2hhbm5lbE5hbWUgPSBcImdsb2JhbFwiO1xuICAgIH1cbiAgICBpZiAoZXZlbnROYW1lID09IG51bGwpIHtcbiAgICAgIGV2ZW50TmFtZSA9IFwiXCI7XG4gICAgfVxuICAgIGlmIChkYXRhID09IG51bGwpIHtcbiAgICAgIGRhdGEgPSB7fTtcbiAgICB9XG4gICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5CYWNrYm9uZS5SYWRpby5jaGFubmVsKGNoYW5uZWxOYW1lKS50cmlnZ2VyKGV2ZW50TmFtZSwgZGF0YSk7XG4gIH07XG5cbiAgQ2hhbm5lbHMucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uKGNoYW5uZWxOYW1lLCBldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgaWYgKGNoYW5uZWxOYW1lID09IG51bGwpIHtcbiAgICAgIGNoYW5uZWxOYW1lID0gXCJnbG9iYWxcIjtcbiAgICB9XG4gICAgaWYgKGV2ZW50TmFtZSA9PSBudWxsKSB7XG4gICAgICBldmVudE5hbWUgPSBcIlwiO1xuICAgIH1cbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0LkJhY2tib25lLlJhZGlvLmNoYW5uZWwoY2hhbm5lbE5hbWUpLm9uKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9O1xuXG4gIHJldHVybiBDaGFubmVscztcblxufSkoTWFyaW9uZXR0aXN0Lk9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IENoYW5uZWxzO1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi9jb3JlLmpzXCI7XG52YXIgTG9jYXRpb24sXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5Mb2NhdGlvbiA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChMb2NhdGlvbiwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gTG9jYXRpb24oKSB7fVxuXG4gIExvY2F0aW9uLnByb3RvdHlwZS5yZWZyZXNoUm91dGUgPSBmdW5jdGlvbihmcmFnbWVudCkge1xuICAgIGlmIChmcmFnbWVudCA9PSBudWxsKSB7XG4gICAgICBmcmFnbWVudCA9IHRoaXMuZ2V0Q3VycmVudFJvdXRlKCk7XG4gICAgfVxuICAgIHJldHVybiBNYXJpb25ldHRpc3QuQmFja2JvbmUuaGlzdG9yeS5sb2FkVXJsKGZyYWdtZW50KTtcbiAgfTtcblxuICBMb2NhdGlvbi5wcm90b3R5cGUubmF2aWdhdGVUbyA9IGZ1bmN0aW9uKHJvdXRlLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0LkJhY2tib25lLmhpc3RvcnkubmF2aWdhdGUocm91dGUsIG9wdGlvbnMpO1xuICB9O1xuXG4gIExvY2F0aW9uLnByb3RvdHlwZS5nZXRDdXJyZW50Um91dGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZnJhZztcbiAgICBmcmFnID0gTWFyaW9uZXR0aXN0LkJhY2tib25lLmhpc3RvcnkuZnJhZ21lbnQ7XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRW1wdHkoZnJhZykpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZnJhZztcbiAgICB9XG4gIH07XG5cbiAgTG9jYXRpb24ucHJvdG90eXBlLnN0YXJ0SGlzdG9yeSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIGlmIChNYXJpb25ldHRpc3QuQmFja2JvbmUuaGlzdG9yeSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gTWFyaW9uZXR0aXN0LkJhY2tib25lLmhpc3Rvcnkuc3RhcnQob3B0aW9ucyk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBMb2NhdGlvbjtcblxufSkoTWFyaW9uZXR0aXN0Lk9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IExvY2F0aW9uO1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi4vY29yZS5qc1wiO1xudmFyIFRlbXBsYXRlcztcblxuVGVtcGxhdGVzID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBUZW1wbGF0ZXMoKSB7fVxuXG4gIFRlbXBsYXRlcy5wcm90b3R5cGUuZGVidWcgPSBmYWxzZTtcblxuICBUZW1wbGF0ZXMucHJvdG90eXBlLmxvb2t1cFBhdGhzID0gW107XG5cbiAgVGVtcGxhdGVzLnByb3RvdHlwZS5lbmdpbmUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZW5naW5lO1xuICAgIGVuZ2luZSA9IHt9O1xuICAgIGlmICh0eXBlb2YgSEFNTCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBIQU1MICE9PSBudWxsKSB7XG4gICAgICBlbmdpbmUgPSBIQU1MO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIEpTVCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBKU1QgIT09IG51bGwpIHtcbiAgICAgIGVuZ2luZSA9IEpTVDtcbiAgICB9XG4gICAgcmV0dXJuIGVuZ2luZTtcbiAgfTtcblxuICBUZW1wbGF0ZXMucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKHRlbXBsYXRlTmFtZSwgZGF0YSwgb3B0aW9ucykge1xuICAgIHZhciBlbmdpbmUsIHRlbXBsYXRlO1xuICAgIGlmICh0ZW1wbGF0ZU5hbWUgPT0gbnVsbCkge1xuICAgICAgdGVtcGxhdGVOYW1lID0gXCJcIjtcbiAgICB9XG4gICAgaWYgKGRhdGEgPT0gbnVsbCkge1xuICAgICAgZGF0YSA9IHt9O1xuICAgIH1cbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHRlbXBsYXRlID0gXCJcIjtcbiAgICBlbmdpbmUgPSB0aGlzLmVuZ2luZTtcbiAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbih0ZW1wbGF0ZU5hbWUpKSB7XG4gICAgICBlbmdpbmUgPSBlbmdpbmUoKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuZGVmYXVsdFRlbXBsYXRlICE9IG51bGwpIHtcbiAgICAgIHRlbXBsYXRlID0gb3B0aW9ucy5kZWZhdWx0VGVtcGxhdGU7XG4gICAgfVxuICAgIGlmICgoZW5naW5lICE9IG51bGwpICYmIE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24oZW5naW5lW3RlbXBsYXRlTmFtZV0pKSB7XG4gICAgICB0ZW1wbGF0ZSA9IGVuZ2luZVt0ZW1wbGF0ZU5hbWVdKGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gdGVtcGxhdGU7XG4gIH07XG5cbiAgcmV0dXJuIFRlbXBsYXRlcztcblxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgVGVtcGxhdGVzO1xuIiwiaW1wb3J0IFRlbXBsYXRlcyBmcm9tIFwiLi9jb25maWcvdGVtcGxhdGVzLmpzXCI7XG5pbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbnZhciBDb25maWcsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5Db25maWcgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoQ29uZmlnLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBDb25maWcoKSB7XG4gICAgdGhpcy50ZW1wbGF0ZXMgPSBuZXcgVGVtcGxhdGVzKCk7XG4gIH1cblxuICByZXR1cm4gQ29uZmlnO1xuXG59KShNYXJpb25ldHRpc3QuT2JqZWN0KTtcblxuZXhwb3J0IGRlZmF1bHQgQ29uZmlnO1xuIiwidmFyIFJlbmRlcmVyO1xuXG5SZW5kZXJlciA9IHtcbiAgcmVuZGVyOiBmdW5jdGlvbih0ZW1wbGF0ZSwgZGF0YSkge1xuICAgIHZhciBlbmdpbmVUZW1wbGF0ZTtcbiAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbih0ZW1wbGF0ZSkpIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZShkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRlbXBsYXRlID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBlbmdpbmVUZW1wbGF0ZSA9IHRoaXMuZ2V0VGVtcGxhdGUodGVtcGxhdGUpO1xuICAgICAgaWYgKCFNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKGVuZ2luZVRlbXBsYXRlKSkge1xuICAgICAgICB0aHJvdyBcIlRlbXBsYXRlIFwiICsgdGVtcGxhdGUgKyBcIiB3YXMgbm90IGZvdW5kIVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGVuZ2luZVRlbXBsYXRlKGRhdGEpO1xuICAgIH1cbiAgfSxcbiAgZ2V0VGVtcGxhdGU6IGZ1bmN0aW9uKHRlbXBsYXRlKSB7XG4gICAgdmFyIGksIGosIGxlbiwgbGVuMSwgbG9va3VwLCBsb29rdXBQYXRoLCBsb29rdXBzLCBwYXRoLCB0ZW1wbGF0ZXM7XG4gICAgbG9va3VwcyA9IE1hcmlvbmV0dGlzdC5jb25maWcudGVtcGxhdGVzLmxvb2t1cFBhdGhzO1xuICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKGxvb2t1cHMpKSB7XG4gICAgICBsb29rdXBzID0gbG9va3VwcygpO1xuICAgIH1cbiAgICBpZiAoIU1hcmlvbmV0dGlzdC5fLmlzQXJyYXkobG9va3VwcykpIHtcbiAgICAgIHRocm93IFwibG9va3VwUGF0aHMgbW9zdCBiZSBhbiBhcnJheVwiO1xuICAgIH1cbiAgICB0ZW1wbGF0ZXMgPSBbdGVtcGxhdGVdO1xuICAgIGlmIChsb29rdXBzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgbG9va3VwcyA9IFtcIlwiXTtcbiAgICB9XG4gICAgZm9yIChpID0gMCwgbGVuID0gbG9va3Vwcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbG9va3VwID0gbG9va3Vwc1tpXTtcbiAgICAgIGZvciAoaiA9IDAsIGxlbjEgPSB0ZW1wbGF0ZXMubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICAgIHBhdGggPSB0ZW1wbGF0ZXNbal07XG4gICAgICAgIGxvb2t1cFBhdGggPSB0aGlzLmZpbmRMb29rdXBQYXRoKGxvb2t1cCArIHBhdGgsIHRlbXBsYXRlKTtcbiAgICAgICAgaWYgKGxvb2t1cFBhdGggIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBsb29rdXBQYXRoO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBmaW5kTG9va3VwUGF0aDogZnVuY3Rpb24ocGF0aCwgdGVtcGxhdGUpIHtcbiAgICB2YXIgZW5naW5lLCBsb29rdXBQYXRoO1xuICAgIGVuZ2luZSA9IE1hcmlvbmV0dGlzdC5jb25maWcudGVtcGxhdGVzLmVuZ2luZTtcbiAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihlbmdpbmUpKSB7XG4gICAgICBlbmdpbmUgPSBlbmdpbmUoKTtcbiAgICB9XG4gICAgbG9va3VwUGF0aCA9IGVuZ2luZVtwYXRoXTtcbiAgICBpZiAoTWFyaW9uZXR0aXN0LmNvbmZpZy50ZW1wbGF0ZXMuZGVidWcgPT09IHRydWUpIHtcbiAgICAgIE1hcmlvbmV0dGlzdC5sb2dnZXIuaW5mbyhcIkxvb2tpbmcgdGVtcGxhdGU6IFwiICsgdGVtcGxhdGUgKyBcIiBpbiAnXCIgKyBwYXRoICsgXCInXCIpO1xuICAgIH1cbiAgICBpZiAobG9va3VwUGF0aCkge1xuICAgICAgcmV0dXJuIGxvb2t1cFBhdGg7XG4gICAgfVxuICB9LFxuICB3aXRoVGVtcGxhdGU6IGZ1bmN0aW9uKHN0cmluZykge1xuICAgIHZhciBhcnJheTtcbiAgICBpZiAoc3RyaW5nICE9IG51bGwpIHtcbiAgICAgIGFycmF5ID0gc3RyaW5nLnNwbGl0KFwiL1wiKTtcbiAgICAgIGFycmF5LnNwbGljZSgtMSwgMCwgXCJ0ZW1wbGF0ZXNcIik7XG4gICAgICByZXR1cm4gYXJyYXkuam9pbihcIi9cIik7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBSZW5kZXJlcjtcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4vY29yZS5qc1wiO1xudmFyIFV0aWxzLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eSxcbiAgc2xpY2UgPSBbXS5zbGljZTtcblxuVXRpbHMgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoVXRpbHMsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIFV0aWxzKCkge1xuICAgIHJldHVybiBVdGlscy5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIFV0aWxzLnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlLCBjb250ZXh0LCBwYXJhbXMpIHtcbiAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIHZhbHVlID0gcGFyYW1zID8gdmFsdWUuYXBwbHkoY29udGV4dCwgcGFyYW1zKSA6IHZhbHVlLmNhbGwoY29udGV4dCk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICBVdGlscy5wcm90b3R5cGUucGF0aEZvciA9IGZ1bmN0aW9uKF9wYXRoKSB7XG4gICAgdmFyIHBhdGg7XG4gICAgcGF0aCA9IFwiXCI7XG4gICAgcGF0aCA9IFwiI1wiICsgX3BhdGg7XG4gICAgcmV0dXJuIHBhdGg7XG4gIH07XG5cbiAgVXRpbHMucHJvdG90eXBlLndhaXRGb3IgPSBmdW5jdGlvbihwcm9taXNlcywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgc3dpdGNoIChmYWxzZSkge1xuICAgICAgY2FzZSBvcHRpb25zLnByb21pc2VUeXBlICE9PSBcImJsdWViaXJkXCI6XG4gICAgICAgIHJldHVybiB0aGlzLl93YWl0Rm9yQmx1ZWJpcmQocHJvbWlzZXMsIG9wdGlvbnMpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dhaXRGb3JBamF4KHByb21pc2VzLCBvcHRpb25zKTtcbiAgICB9XG4gIH07XG5cbiAgVXRpbHMucHJvdG90eXBlLl93YWl0Rm9yQWpheCA9IGZ1bmN0aW9uKGFqYXhSZXF1ZXN0cywgb3B0aW9ucykge1xuICAgIHZhciByZWYsIHhocnM7XG4gICAgaWYgKGFqYXhSZXF1ZXN0cyA9PSBudWxsKSB7XG4gICAgICBhamF4UmVxdWVzdHMgPSBbXTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICB4aHJzID0gW107XG4gICAgeGhycyA9IE1hcmlvbmV0dGlzdC5fLmNoYWluKFthamF4UmVxdWVzdHNdKS5mbGF0dGVuKCkudmFsdWUoKTtcbiAgICBpZiAoeGhycy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gKHJlZiA9IE1hcmlvbmV0dGlzdC4kKS53aGVuLmFwcGx5KHJlZiwgeGhycykudGhlbigoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcmdzO1xuICAgICAgICBhcmdzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKG9wdGlvbnMuc3VjY2VzcykpIHtcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucy5zdWNjZXNzLmFwcGx5KG9wdGlvbnMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICB9KSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcmdzO1xuICAgICAgICBhcmdzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKG9wdGlvbnMuZXJyb3IpKSB7XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZXJyb3IuYXBwbHkob3B0aW9ucywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihvcHRpb25zLnN1Y2Nlc3MpKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLnN1Y2Nlc3MobnVsbCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIFV0aWxzLnByb3RvdHlwZS5fd2FpdEZvckJsdWViaXJkID0gZnVuY3Rpb24ocHJvbWlzZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHByb21pc2VzID0gTWFyaW9uZXR0aXN0Ll8uY2hhaW4oW3Byb21pc2VzXSkuZmxhdHRlbigpLnZhbHVlKCk7XG4gICAgaWYgKHByb21pc2VzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcy5tYXAoZnVuY3Rpb24ocHJvbWlzZSkge1xuICAgICAgICByZXR1cm4gcHJvbWlzZS5yZWZsZWN0KCk7XG4gICAgICB9KSkudGhlbihmdW5jdGlvbihpbnNwZWN0aW9ucykge1xuICAgICAgICB2YXIgZXJyb3JzLCBpLCBpbnNwZWN0aW9uLCBsZW4sIHN1Y2Nlc3NBcmdzO1xuICAgICAgICBzdWNjZXNzQXJncyA9IFtdO1xuICAgICAgICBlcnJvcnMgPSBbXTtcbiAgICAgICAgZm9yIChpID0gMCwgbGVuID0gaW5zcGVjdGlvbnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICBpbnNwZWN0aW9uID0gaW5zcGVjdGlvbnNbaV07XG4gICAgICAgICAgaWYgKGluc3BlY3Rpb24uaXNGdWxmaWxsZWQoKSkge1xuICAgICAgICAgICAgc3VjY2Vzc0FyZ3MucHVzaChpbnNwZWN0aW9uLnZhbHVlKCkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlcnJvcnMucHVzaChpbnNwZWN0aW9uLnJlYXNvbigpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24ob3B0aW9ucy5lcnJvcikpIHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zLmVycm9yLmFwcGx5KG9wdGlvbnMsIGVycm9ycyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKG9wdGlvbnMuc3VjY2VzcykpIHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zLnN1Y2Nlc3MuYXBwbHkob3B0aW9ucywgc3VjY2Vzc0FyZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKG9wdGlvbnMuc3VjY2VzcykpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuc3VjY2VzcyhudWxsKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFV0aWxzO1xuXG59KShNYXJpb25ldHRpc3QuT2JqZWN0KTtcblxuZXhwb3J0IGRlZmF1bHQgVXRpbHM7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbnZhciBMb2dnZXIsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5Mb2dnZXIgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoTG9nZ2VyLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBMb2dnZXIoKSB7fVxuXG4gIExvZ2dlci5wcm90b3R5cGUuc3VjY2VzcyA9IGZ1bmN0aW9uKG1zZywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgb3B0aW9ucy50eXBlID0gXCJzdWNjZXNzXCI7XG4gICAgcmV0dXJuIHRoaXMubG9nKG1zZywgb3B0aW9ucyk7XG4gIH07XG5cbiAgTG9nZ2VyLnByb3RvdHlwZS53YXJuID0gZnVuY3Rpb24obXNnLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBvcHRpb25zLnR5cGUgPSBcIndhcm5cIjtcbiAgICByZXR1cm4gdGhpcy5sb2cobXNnLCBvcHRpb25zKTtcbiAgfTtcblxuICBMb2dnZXIucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24obXNnLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBvcHRpb25zLnR5cGUgPSBcImVycm9yXCI7XG4gICAgcmV0dXJuIHRoaXMubG9nKG1zZywgb3B0aW9ucyk7XG4gIH07XG5cbiAgTG9nZ2VyLnByb3RvdHlwZS5pbmZvID0gZnVuY3Rpb24obXNnLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBvcHRpb25zLnR5cGUgPSBcImluZm9cIjtcbiAgICByZXR1cm4gdGhpcy5sb2cobXNnLCBvcHRpb25zKTtcbiAgfTtcblxuICBMb2dnZXIucHJvdG90eXBlLmxvZyA9IGZ1bmN0aW9uKG1zZywgb3B0aW9ucykge1xuICAgIHZhciBiZ2MsIGZvcmNlLCB0eXBlO1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgZm9yY2UgPSBvcHRpb25zLmZvcmNlO1xuICAgIHR5cGUgPSBvcHRpb25zLnR5cGU7XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5lbnYuaXNEZXZlbG9wbWVudCgpIHx8IGZvcmNlID09PSB0cnVlKSB7XG4gICAgICB0eXBlID0gdHlwZSB8fCAnYmxhY2snO1xuICAgICAgYmdjID0gJ1doaXRlJztcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgICB0eXBlID0gJ0dyZWVuJztcbiAgICAgICAgICBiZ2MgPSAnTGltZUdyZWVuJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnaW5mbyc6XG4gICAgICAgICAgdHlwZSA9ICdEb2RnZXJCbHVlJztcbiAgICAgICAgICBiZ2MgPSAnVHVycXVvaXNlJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICAgIHR5cGUgPSAnUmVkJztcbiAgICAgICAgICBiZ2MgPSAnQmxhY2snO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdzdGFydCc6XG4gICAgICAgICAgdHlwZSA9ICdPbGl2ZURyYWInO1xuICAgICAgICAgIGJnYyA9ICdQYWxlR3JlZW4nO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgICAgICB0eXBlID0gJ1RvbWF0byc7XG4gICAgICAgICAgYmdjID0gJ0JsYWNrJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgICB0eXBlID0gJ09yY2hpZCc7XG4gICAgICAgICAgYmdjID0gJ01lZGl1bVZpb2xldFJlZCc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdHlwZSA9IHR5cGU7XG4gICAgICB9XG4gICAgICBiZ2MgPSAnV2hpdGUnO1xuICAgICAgaWYgKHR5cGVvZiBtc2cgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnJWMnICsgbXNnLCAndHlwZTonICsgdHlwZSArICc7Zm9udC13ZWlnaHQ6Ym9sZDsgYmFja2dyb3VuZC10eXBlOiAnICsgYmdjICsgJzsnKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIExvZ2dlcjtcblxufSkoTWFyaW9uZXR0aXN0Lk9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IExvZ2dlcjtcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4vY29yZS5qc1wiO1xudmFyIEFwcFJvdXRlLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuQXBwUm91dGUgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoQXBwUm91dGUsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIEFwcFJvdXRlKCkge1xuICAgIHJldHVybiBBcHBSb3V0ZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIEFwcFJvdXRlLnByb3RvdHlwZS5yb3V0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRPcHRpb24oXCJyb3V0ZXJcIik7XG4gIH07XG5cbiAgQXBwUm91dGUucHJvdG90eXBlLnBhdGggPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRPcHRpb24oXCJwYXRoXCIpO1xuICB9O1xuXG4gIEFwcFJvdXRlLnByb3RvdHlwZS5hY3Rpb25OYW1lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uKFwiYWN0aW9uTmFtZVwiKTtcbiAgfTtcblxuICBBcHBSb3V0ZS5wcm90b3R5cGUuY29udHJvbGxlciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmdldE9wdGlvbihcImNvbnRyb2xsZXJcIik7XG4gIH07XG5cbiAgcmV0dXJuIEFwcFJvdXRlO1xuXG59KShNYXJpb25ldHRpc3QuT2JqZWN0KTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwUm91dGU7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbnZhciBBcHBSb3V0ZXIsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5BcHBSb3V0ZXIgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoQXBwUm91dGVyLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBBcHBSb3V0ZXIoKSB7XG4gICAgcmV0dXJuIEFwcFJvdXRlci5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIEFwcFJvdXRlci5wcm90b3R5cGUub25Sb3V0ZSA9IGZ1bmN0aW9uKG5hbWUsIHBhdGgsIGFyZ3MpIHtcbiAgICBpZiAoKHRoaXMuY29udHJvbGxlciAhPSBudWxsKSAmJiBNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKHRoaXMuY29udHJvbGxlci5vblJvdXRlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuY29udHJvbGxlci5vblJvdXRlKHRoaXMsIG5hbWUsIHBhdGgsIGFyZ3MpO1xuICAgIH1cbiAgfTtcblxuICBBcHBSb3V0ZXIucHJvdG90eXBlLl9zZXRDb250cm9sbGVyRmlsdGVycyA9IGZ1bmN0aW9uKGNvbnRyb2xsZXIpIHtcbiAgICB2YXIgZGVmYXVsdEZpbHRlcnMsIGZpbHRlcnM7XG4gICAgaWYgKGNvbnRyb2xsZXIgIT0gbnVsbCkge1xuICAgICAgZGVmYXVsdEZpbHRlcnMgPSB7XG4gICAgICAgIGJlZm9yZToge30sXG4gICAgICAgIGFmdGVyOiB7fVxuICAgICAgfTtcbiAgICAgIGZpbHRlcnMgPSBjb250cm9sbGVyLmZpbHRlcnM7XG4gICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihmaWx0ZXJzKSkge1xuICAgICAgICBmaWx0ZXJzID0gZmlsdGVycygpO1xuICAgICAgfVxuICAgICAgaWYgKGNvbnRyb2xsZXIuZmlsdGVycyA9PSBudWxsKSB7XG4gICAgICAgIGNvbnRyb2xsZXIuZmlsdGVycyA9IHt9O1xuICAgICAgfVxuICAgICAgY29udHJvbGxlci5maWx0ZXJzID0gTWFyaW9uZXR0aXN0Ll8uZXh0ZW5kKGRlZmF1bHRGaWx0ZXJzLCBmaWx0ZXJzKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRyb2xsZXI7XG4gIH07XG5cbiAgQXBwUm91dGVyLnByb3RvdHlwZS5fYWRkQXBwUm91dGUgPSBmdW5jdGlvbihjb250cm9sbGVyLCByb3V0ZSwgbWV0aG9kTmFtZSkge1xuICAgIHZhciBfbWV0aG9kLCBtZXRob2Q7XG4gICAgdGhpcy5jb250cm9sbGVyID0gdGhpcy5fc2V0Q29udHJvbGxlckZpbHRlcnMoY29udHJvbGxlcik7XG4gICAgX21ldGhvZCA9IGNvbnRyb2xsZXJbbWV0aG9kTmFtZV07XG4gICAgbWV0aG9kID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oYXJncykge1xuICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICBfdGhpcy5jb250cm9sbGVyLnJvdXRlID0gbmV3IE1hcmlvbmV0dGlzdC5BcHBSb3V0ZSh7XG4gICAgICAgICAgY29udHJvbGxlcjogX3RoaXMuY29udHJvbGxlcixcbiAgICAgICAgICBhY3Rpb25OYW1lOiBtZXRob2ROYW1lLFxuICAgICAgICAgIHBhdGg6IHJvdXRlXG4gICAgICAgIH0pO1xuICAgICAgICByZXN1bHQgPSBfdGhpcy5fZXhlY3V0ZUZpbHRlcihfdGhpcy5jb250cm9sbGVyLmZpbHRlcnMuYmVmb3JlLCBfdGhpcy5jb250cm9sbGVyKTtcbiAgICAgICAgaWYgKHJlc3VsdCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBfdGhpcy5jb250cm9sbGVyW21ldGhvZE5hbWVdLmFwcGx5KF90aGlzLmNvbnRyb2xsZXIsIF90aGlzLl9nZXRQYXJhbXMoKSk7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLl9leGVjdXRlRmlsdGVyKF90aGlzLmNvbnRyb2xsZXIuZmlsdGVycy5hZnRlciwgX3RoaXMuY29udHJvbGxlcik7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkodGhpcyk7XG4gICAgaWYgKCFtZXRob2QpIHtcbiAgICAgIHRocm93IG5ldyBNYXJpb25ldHRpc3QuTWFyaW9uZXR0ZS5FcnJvcignTWV0aG9kIFwiJyArIG1ldGhvZE5hbWUgKyAnXCIgd2FzIG5vdCBmb3VuZCBvbiB0aGUgY29udHJvbGxlcicpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yb3V0ZShyb3V0ZSwgbWV0aG9kTmFtZSwgTWFyaW9uZXR0aXN0Ll8uYmluZChtZXRob2QsIGNvbnRyb2xsZXIpKTtcbiAgfTtcblxuICBBcHBSb3V0ZXIucHJvdG90eXBlLl9leGVjdXRlRmlsdGVyID0gZnVuY3Rpb24oZmlsdGVyLCBjb250cm9sbGVyKSB7XG4gICAgdmFyIGZpbHRlclZhbHVlLCBpLCBsZW4sIG1ldGhvZE5hbWUsIHJlZiwgcmVzdWx0LCBzdG9wTXNnO1xuICAgIHJlc3VsdCA9IHRydWU7XG4gICAgcmVmID0gTWFyaW9uZXR0aXN0Ll8ua2V5cyhmaWx0ZXIpO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbWV0aG9kTmFtZSA9IHJlZltpXTtcbiAgICAgIGZpbHRlclZhbHVlID0gZmlsdGVyW21ldGhvZE5hbWVdO1xuICAgICAgc3RvcE1zZyA9IFwiQWN0aW9uIGhhbHRlZCBieSBmaWx0ZXIgJ1wiICsgbWV0aG9kTmFtZSArIFwiJ1wiO1xuICAgICAgc3dpdGNoIChmYWxzZSkge1xuICAgICAgICBjYXNlICFNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKGZpbHRlclZhbHVlKTpcbiAgICAgICAgICByZXN1bHQgPSBmaWx0ZXJWYWx1ZShjb250cm9sbGVyKTtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKHN0b3BNc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICFNYXJpb25ldHRpc3QuXy5pc09iamVjdChmaWx0ZXJWYWx1ZSk6XG4gICAgICAgICAgcmVzdWx0ID0gdGhpcy5fcHJvY2Nlc3NGaWx0ZXJPYmplY3QobWV0aG9kTmFtZSwgZmlsdGVyVmFsdWUsIGNvbnRyb2xsZXIpO1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oc3RvcE1zZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgQXBwUm91dGVyLnByb3RvdHlwZS5fZ2V0UGFyYW1zID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBhcmFtcywgcm91dGU7XG4gICAgcm91dGUgPSB0aGlzLl9yb3V0ZVRvUmVnRXhwKHRoaXMuY29udHJvbGxlci5yb3V0ZS5nZXRPcHRpb24oXCJwYXRoXCIpKTtcbiAgICByZXR1cm4gcGFyYW1zID0gdGhpcy5fZXh0cmFjdFBhcmFtZXRlcnMocm91dGUsIE1hcmlvbmV0dGlzdC5CYWNrYm9uZS5oaXN0b3J5LmdldEZyYWdtZW50KCkpO1xuICB9O1xuXG4gIEFwcFJvdXRlci5wcm90b3R5cGUuX3Byb2NjZXNzRmlsdGVyT2JqZWN0ID0gZnVuY3Rpb24obWV0aG9kTmFtZSwgZmlsdGVyLCBjb250cm9sbGVyKSB7XG4gICAgdmFyIGFjdGlvbk5hbWUsIGNvbnRyb2xsZXJNZXRob2QsIGRlZmF1bHRGaWx0ZXJPcHRpb25zLCBmaWx0ZXJPcHRpb25zO1xuICAgIGRlZmF1bHRGaWx0ZXJPcHRpb25zID0ge1xuICAgICAgbWV0aG9kOiBudWxsLFxuICAgICAgb25seTogW10sXG4gICAgICBleGNlcHQ6IFtdXG4gICAgfTtcbiAgICBmaWx0ZXJPcHRpb25zID0gTWFyaW9uZXR0aXN0Ll8uZXh0ZW5kKGRlZmF1bHRGaWx0ZXJPcHRpb25zLCBmaWx0ZXIpO1xuICAgIGNvbnRyb2xsZXJNZXRob2QgPSBjb250cm9sbGVyW21ldGhvZE5hbWVdO1xuICAgIGFjdGlvbk5hbWUgPSBjb250cm9sbGVyLnJvdXRlLmFjdGlvbk5hbWUoKTtcbiAgICBpZiAoIU1hcmlvbmV0dGlzdC5fLmlzQXJyYXkoZmlsdGVyT3B0aW9ucy5vbmx5KSkge1xuICAgICAgdGhyb3cgXCJmaWx0ZXIgb3B0aW9uIG9ubHksIG1vc3QgYmUgYW4gYXJyYXlcIjtcbiAgICB9XG4gICAgaWYgKCFNYXJpb25ldHRpc3QuXy5pc0FycmF5KGZpbHRlck9wdGlvbnMuZXhjZXB0KSkge1xuICAgICAgdGhyb3cgXCJmaWx0ZXIgb3B0aW9uIGV4Y2VwdCwgbW9zdCBiZSBhbiBhcnJheVwiO1xuICAgIH1cbiAgICBpZiAoZmlsdGVyT3B0aW9ucy5vbmx5Lmxlbmd0aCA+IDAgfHwgZmlsdGVyT3B0aW9ucy5leGNlcHQubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKE1hcmlvbmV0dGlzdC5fLmNvbnRhaW5zKGZpbHRlck9wdGlvbnMub25seSwgYWN0aW9uTmFtZSkgJiYgIU1hcmlvbmV0dGlzdC5fLmNvbnRhaW5zKGZpbHRlck9wdGlvbnMuZXhjZXB0LCBhY3Rpb25OYW1lKSkge1xuICAgICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihjb250cm9sbGVyTWV0aG9kKSkge1xuICAgICAgICAgIHJldHVybiBjb250cm9sbGVyTWV0aG9kLmFwcGx5KHRoaXMuY29udHJvbGxlciwgdGhpcy5fZ2V0UGFyYW1zKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKGNvbnRyb2xsZXJNZXRob2QpKSB7XG4gICAgICAgIHJldHVybiBjb250cm9sbGVyTWV0aG9kLmFwcGx5KHRoaXMuY29udHJvbGxlciwgdGhpcy5fZ2V0UGFyYW1zKCkpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gQXBwUm91dGVyO1xuXG59KShNYXJpb25ldHRpc3QuQXBwUm91dGVyKTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwUm91dGVyO1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi9jb3JlLmpzXCI7XG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tIFwiYmFja2JvbmUubWFyaW9uZXR0ZVwiO1xudmFyIFJlZ2lvbiwgX3Nob3csXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5fc2hvdyA9IE1hcmlvbmV0dGUuUmVnaW9uLnByb3RvdHlwZS5zaG93O1xuXG5SZWdpb24gPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoUmVnaW9uLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBSZWdpb24oKSB7XG4gICAgcmV0dXJuIFJlZ2lvbi5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIFJlZ2lvbi5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKHZpZXcsIG9wdGlvbnMpIHtcbiAgICB2YXIgYXJncywgb2xkVmlldywgcHJldmVudERlc3Ryb3ksIHNob3dDdXJyZW50VmlldywgdHJhbnNpdGlvbk91dCwgdmFsdWU7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgcHJldmVudERlc3Ryb3kgPSBvcHRpb25zLnByZXZlbnREZXN0cm95ID09PSB0cnVlO1xuICAgIHRyYW5zaXRpb25PdXQgPSBvcHRpb25zLnRyYW5zaXRpb25PdXQ7XG4gICAgZGVsZXRlIG9wdGlvbnMudHJhbnNpdGlvbk91dDtcbiAgICBhcmdzID0gW3ZpZXcsIG9wdGlvbnNdO1xuICAgIGlmICh0cmFuc2l0aW9uT3V0ID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIF9zaG93LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvbGRWaWV3ID0gdGhpcy5jdXJyZW50VmlldztcbiAgICAgIHNob3dDdXJyZW50VmlldyA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF9zaG93LmFwcGx5KF90aGlzLCBhcmdzKTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpO1xuICAgICAgaWYgKChvbGRWaWV3ICE9IG51bGwpICYmIE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24ob2xkVmlldy50cmFuc2l0aW9uT3V0KSkge1xuICAgICAgICBvbGRWaWV3LnRyaWdnZXJNZXRob2QoXCJiZWZvcmU6dHJhbnNpdGlvbjpvdXRcIik7XG4gICAgICAgIHZhbHVlID0gb2xkVmlldy50cmFuc2l0aW9uT3V0KCk7XG4gICAgICAgIGlmICgodmFsdWUgIT0gbnVsbCA/IHZhbHVlLnRoZW4gOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWUudGhlbigoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNob3dDdXJyZW50VmlldygpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KSh0aGlzKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgXCJ0cmFuc2l0aW9uT3V0IG1ldGhvZCBtb3N0IHJldHVybiBhIHByb21pc2VcIjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNob3dDdXJyZW50VmlldygpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gUmVnaW9uO1xuXG59KShNYXJpb25ldHRlLlJlZ2lvbik7XG5cbmV4cG9ydCBkZWZhdWx0IFJlZ2lvbjtcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4vY29yZS5qc1wiO1xudmFyIFZpZXdzLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eSxcbiAgc2xpY2UgPSBbXS5zbGljZTtcblxuVmlld3MgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoVmlld3MsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIFZpZXdzKCkge1xuICAgIHJldHVybiBWaWV3cy5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIFZpZXdzLnByb3RvdHlwZS50ZW1wbGF0ZUhlbHBlcnMgPSB7XG4gICAgcGF0aEZvcjogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncywgcmVmO1xuICAgICAgYXJncyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgcmV0dXJuIChyZWYgPSBNYXJpb25ldHRpc3QudXRpbHMpLnBhdGhGb3IuYXBwbHkocmVmLCBhcmdzKTtcbiAgICB9LFxuICAgIF86IE1hcmlvbmV0dGlzdC5fLFxuICAgIHM6IE1hcmlvbmV0dGlzdC5zLFxuICAgIHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MsIHJlZjtcbiAgICAgIGFyZ3MgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgIHJldHVybiAocmVmID0gTWFyaW9uZXR0aXN0LkkxOG4pLnQuYXBwbHkocmVmLCBhcmdzKTtcbiAgICB9LFxuICAgIGZvcm1hdEN1cnJlbmN5OiBmdW5jdGlvbihhbW91bnQsIGZvcm1hdCkge1xuICAgICAgaWYgKGZvcm1hdCA9PSBudWxsKSB7XG4gICAgICAgIGZvcm1hdCA9IFwiJDAsMC4wMFwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5udW1lcmFsKGFtb3VudCkuZm9ybWF0KGZvcm1hdCk7XG4gICAgfSxcbiAgICBmb3JtYXROdW1iZXI6IGZ1bmN0aW9uKGFtb3VudCwgZm9ybWF0KSB7XG4gICAgICBpZiAoZm9ybWF0ID09IG51bGwpIHtcbiAgICAgICAgZm9ybWF0ID0gXCIwLDAuMDBcIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNYXJpb25ldHRpc3QubnVtZXJhbChhbW91bnQpLmZvcm1hdChmb3JtYXQpO1xuICAgIH0sXG4gICAgZm9ybWF0UGVyY2VudGFnZTogZnVuY3Rpb24oYW1vdW50LCBmb3JtYXQpIHtcbiAgICAgIGlmIChmb3JtYXQgPT0gbnVsbCkge1xuICAgICAgICBmb3JtYXQgPSBcIjAuMDAlXCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWFyaW9uZXR0aXN0Lm51bWVyYWwoYW1vdW50KS5mb3JtYXQoZm9ybWF0KTtcbiAgICB9LFxuICAgIGZvcm1hdERhdGU6IGZ1bmN0aW9uKGRhdGUsIGZvcm1hdCkge1xuICAgICAgaWYgKGZvcm1hdCA9PSBudWxsKSB7XG4gICAgICAgIGZvcm1hdCA9IFwiREQtTU0tWVlZWVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5tb21lbnQoZGF0ZSkuZm9ybWF0KGZvcm1hdCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBWaWV3cztcblxufSkoTWFyaW9uZXR0aXN0Lk9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IFZpZXdzO1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi4vY29yZS5qc1wiO1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSBcImJhY2tib25lLm1hcmlvbmV0dGVcIjtcbnZhciBCYXNlVmlldyxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkJhc2VWaWV3ID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKEJhc2VWaWV3LCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBCYXNlVmlldygpIHtcbiAgICByZXR1cm4gQmFzZVZpZXcuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICByZXR1cm4gQmFzZVZpZXc7XG5cbn0pKE1hcmlvbmV0dGUuVmlldyk7XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VWaWV3O1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi4vY29yZS5qc1wiO1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSBcImJhY2tib25lLm1hcmlvbmV0dGVcIjtcbnZhciBDb2xsZWN0aW9uVmlldyxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkNvbGxlY3Rpb25WaWV3ID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKENvbGxlY3Rpb25WaWV3LCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBDb2xsZWN0aW9uVmlldygpIHtcbiAgICByZXR1cm4gQ29sbGVjdGlvblZpZXcuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICByZXR1cm4gQ29sbGVjdGlvblZpZXc7XG5cbn0pKE1hcmlvbmV0dGUuQ29sbGVjdGlvblZpZXcpO1xuXG5leHBvcnQgZGVmYXVsdCBDb2xsZWN0aW9uVmlldztcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4uLy4uL2NvcmUuanNcIjtcbmltcG9ydCBCYWNrYm9uZSBmcm9tIFwiYmFja2JvbmVcIjtcbnZhciBCYXNlLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuQmFzZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChCYXNlLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBCYXNlKCkge1xuICAgIHJldHVybiBCYXNlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIEJhc2U7XG5cbn0pKEJhY2tib25lLk1vZGVsKTtcblxuZXhwb3J0IGRlZmF1bHQgQmFzZTtcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4uLy4uL2NvcmUuanNcIjtcbmltcG9ydCBCYWNrYm9uZSBmcm9tIFwiYmFja2JvbmVcIjtcbnZhciBCYXNlLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuQmFzZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChCYXNlLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBCYXNlKCkge1xuICAgIHJldHVybiBCYXNlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIEJhc2U7XG5cbn0pKEJhY2tib25lLkNvbGxlY3Rpb24pO1xuXG5leHBvcnQgZGVmYXVsdCBCYXNlO1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi4vLi4vY29yZS5qc1wiO1xuaW1wb3J0IE1vZGVsQmFzZSBmcm9tIFwiLi4vLi4vZW50aXRpZXMvbW9kZWxzL2Jhc2UuanNcIjtcbmltcG9ydCBCYXNlVmlldyBmcm9tIFwiLi4vLi4vdmlld3MvYmFzZS5qc1wiO1xudmFyIEJhc2UsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5LFxuICBzbGljZSA9IFtdLnNsaWNlO1xuXG5CYXNlID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKEJhc2UsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIEJhc2Uob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgQmFzZS5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICB0aGlzLl9pbnN0YW5jZV9pZCA9IE1hcmlvbmV0dGlzdC5fLnVuaXF1ZUlkKFwicmVzcG9uZGVyXCIpO1xuICAgIHRoaXMucmVnaXN0ZXIodGhpcywgdGhpcy5faW5zdGFuY2VfaWQpO1xuICB9XG5cbiAgQmFzZS5wcm90b3R5cGUubG9hZGVyVmlldyA9IEJhc2VWaWV3LmV4dGVuZCh7XG4gICAgdGVtcGxhdGU6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHJldHVybiBNYXJpb25ldHRpc3QuY29uZmlnLnRlbXBsYXRlcy5yZW5kZXIoXCJtYXJpb25ldHRpc3QvbG9hZGVyXCIsIGRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cXCdtcmktbG9hZGVyXFwnPlxcbiAgPGRpdiBjbGFzcz1cXCdtcmktbG9hZGVyX19jb250ZW50XFwnPlxcbiAgICA8aSBjbGFzcz1cImZhIGZhLXNwaW5uZXIgZmEtc3BpbiBmYS0yeCBmYS1md1wiPjwvaT5cXG4gICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+TG9hZGluZy4uLjwvc3Bhbj5cXG4gIDwvZGl2PlxcbjwvZGl2PidcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgQmFzZS5wcm90b3R5cGUuZ2V0TG9hZGVyVmlldyA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLmdldChcImxvYWRlclZpZXdcIikgPT0gbnVsbCkge1xuICAgICAgdGhpcy5zZXQoe1xuICAgICAgICBsb2FkZXJWaWV3OiBuZXcgdGhpcy5sb2FkZXJWaWV3XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2V0KFwibG9hZGVyVmlld1wiKTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzO1xuICAgIGFyZ3MgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICBCYXNlLl9fc3VwZXJfXy5jbG9zZS5jYWxsKHRoaXMsIGFyZ3MpO1xuICAgIHJldHVybiB0aGlzLnVucmVnaXN0ZXIodGhpcywgdGhpcy5faW5zdGFuY2VfaWQpO1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbih2aWV3LCBvcHRpb25zKSB7XG4gICAgdmFyIGxvYWRlclZpZXcsIHJlZ2lvbjtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHJlZ2lvbiA9IG9wdGlvbnMucmVnaW9uICE9IG51bGwgPyBvcHRpb25zLnJlZ2lvbiA6IHRoaXMuZ2V0KFwicmVnaW9uXCIpO1xuICAgIHRoaXMubGlzdGVuVG8odmlldywgXCJjbG9zZVwiLCB0aGlzLmNsb3NlKTtcbiAgICBpZiAob3B0aW9ucy5hc3luYyAhPSBudWxsKSB7XG4gICAgICBpZiAob3B0aW9ucy5sb2FkZXJWaWV3ICE9PSBmYWxzZSkge1xuICAgICAgICBsb2FkZXJWaWV3ID0gdGhpcy5nZXRMb2FkZXJWaWV3KCk7XG4gICAgICAgIHRoaXMubGlzdGVuVG8obG9hZGVyVmlldywgXCJjbG9zZVwiLCB0aGlzLmNsb3NlKTtcbiAgICAgICAgcmVnaW9uLnNob3cobG9hZGVyVmlldyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5mZXRjaCgpLnRoZW4oKChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKG9wdGlvbnMubG9hZGVyVmlldyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmIChyZWdpb24uY3VycmVudFZpZXcgIT09IGxvYWRlclZpZXcpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHZpZXcuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlZ2lvbi5zaG93KHZpZXcpO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcykpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlZ2lvbi5zaG93KHZpZXcpO1xuICAgIH1cbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5kZWZhdWx0cyA9IHtcbiAgICBwYXJhbXM6IHt9LFxuICAgIGFzeW5jOiBbXVxuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLndhaXRGb3IgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywgcmVmO1xuICAgIGFyZ3MgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICByZXR1cm4gKHJlZiA9IE1hcmlvbmV0dGlzdC51dGlscykud2FpdEZvci5hcHBseShyZWYsIGFyZ3MpO1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLmRlZmVycmVkID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIE1hcmlvbmV0dGlzdC4kLkRlZmVycmVkKCk7XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUuZmV0Y2ggPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdmFyIGFzeW5jRmV0Y2hlcywgZGVmZXJyZWQ7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBkZWZlcnJlZCA9IHRoaXMuZGVmZXJyZWQoKTtcbiAgICBhc3luY0ZldGNoZXMgPSBNYXJpb25ldHRpc3QuXy5jaGFpbihbdGhpcy5nZXQoXCJhc3luY1wiKV0pLmZsYXR0ZW4oKS5jb21wYWN0KCkudmFsdWUoKTtcbiAgICB0aGlzLndhaXRGb3IoYXN5bmNGZXRjaGVzLCB7XG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24ob3B0aW9ucy5zdWNjZXNzKSkge1xuICAgICAgICAgIG9wdGlvbnMuc3VjY2VzcygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICB9LFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihvcHRpb25zLmVycm9yKSkge1xuICAgICAgICAgIG9wdGlvbnMuZXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucmVqZWN0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVmZXJyZWQoKS5wcm9taXNlKCk7XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmRlZmVycmVkKCkucHJvbWlzZSgpO1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24oaW5zdGFuY2UsIGlkKSB7XG4gICAgaWYgKHRoaXMuX3JlZ2lzdHJ5ID09IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlZ2lzdHJ5ID0ge307XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9yZWdpc3RyeVtpZF0gPSBpbnN0YW5jZTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS51bnJlZ2lzdGVyID0gZnVuY3Rpb24oaW5zdGFuY2UsIGlkKSB7XG4gICAgcmV0dXJuIGRlbGV0ZSB0aGlzLl9yZWdpc3RyeVtpZF07XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUucmVzZXRSZWdpc3RyeSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBrZXksIG1zZywgb2xkQ291bnQsIHJlZiwgcmVzcG9uZGVyO1xuICAgIG9sZENvdW50ID0gdGhpcy5nZXRSZWdpc3RyeVNpemUoKTtcbiAgICByZWYgPSB0aGlzLl9yZWdpc3RyeTtcbiAgICBmb3IgKGtleSBpbiByZWYpIHtcbiAgICAgIHJlc3BvbmRlciA9IHJlZltrZXldO1xuICAgICAgcmVzcG9uZGVyLnJlZ2lvbi5jbG9zZSgpO1xuICAgIH1cbiAgICBtc2cgPSBcIlRoZXJlIHdlcmUgXCIgKyBvbGRDb3VudCArIFwiIHJlc3BvbmRlcnMgaW4gdGhlIHJlZ2lzdHJ5LCB0aGVyZSBhcmUgbm93IFwiICsgKHRoaXMuZ2V0UmVnaXN0cnlTaXplKCkpO1xuICAgIGlmICh0aGlzLmdldFJlZ2lzdHJ5U2l6ZSgpID4gMCkge1xuICAgICAgcmV0dXJuIGNvbnNvbGUud2Fybihtc2csIHRoaXMuX3JlZ2lzdHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgfVxuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLmdldFJlZ2lzdHJ5U2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBNYXJpb25ldHRpc3QuXy5zaXplKHRoaXMuX3JlZ2lzdHJ5KTtcbiAgfTtcblxuICByZXR1cm4gQmFzZTtcblxufSkoTW9kZWxCYXNlKTtcblxuZXhwb3J0IGRlZmF1bHQgQmFzZTtcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4uLy4uL2NvcmUuanNcIjtcbmltcG9ydCBCYWNrYm9uZSBmcm9tIFwiYmFja2JvbmVcIjtcbmltcG9ydCBCYXNlTW9kZWwgZnJvbSBcIi4uLy4uL2VudGl0aWVzL21vZGVscy9iYXNlLmpzXCI7XG5pbXBvcnQgQmFzZUNvbGxlY3Rpb24gZnJvbSBcIi4uLy4uL2VudGl0aWVzL2NvbGxlY3Rpb25zL2Jhc2UuanNcIjtcbmltcG9ydCBCYXNlUmVzcG9uZGVyIGZyb20gXCIuLi8uLi9lbnRpdGllcy9yZXNwb25kZXJzL2Jhc2UuanNcIjtcbnZhciBCYXNlLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuQmFzZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChCYXNlLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBCYXNlKCkge1xuICAgIHJldHVybiBCYXNlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgQmFzZS5wcm90b3R5cGUucmVzcG9uZGVycyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBiYXNlOiBCYXNlUmVzcG9uZGVyXG4gICAgfTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5tb2RlbHMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYmFzZTogQmFzZU1vZGVsXG4gICAgfTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5jb2xsZWN0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBiYXNlOiBCYXNlQ29sbGVjdGlvblxuICAgIH07XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUudmlld3MgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge307XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUuZ2V0UmVzcG9uZGVyID0gZnVuY3Rpb24ocmVzcG9uZGVyTmFtZSwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2V0UmVzb3VyY2UoXCJyZXNwb25kZXJzXCIsIHJlc3BvbmRlck5hbWUsIG9wdGlvbnMpO1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLmdldFZpZXcgPSBmdW5jdGlvbih2aWV3TmFtZSwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2V0UmVzb3VyY2UoXCJ2aWV3c1wiLCB2aWV3TmFtZSwgb3B0aW9ucyk7XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUuZ2V0TW9kZWwgPSBmdW5jdGlvbihtb2RlbE5hbWUsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldFJlc291cmNlKFwibW9kZWxzXCIsIG1vZGVsTmFtZSwgb3B0aW9ucyk7XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUuZ2V0Q29sbGVjdGlvbiA9IGZ1bmN0aW9uKGNvbGxlY3Rpb25OYW1lLCBtb2RlbHMsIG9wdGlvbnMpIHtcbiAgICBpZiAobW9kZWxzID09IG51bGwpIHtcbiAgICAgIG1vZGVscyA9IFtdO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldFJlc291cmNlKFwiY29sbGVjdGlvbnNcIiwgY29sbGVjdGlvbk5hbWUsIG9wdGlvbnMsIG1vZGVscyk7XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUuZ2V0UmVzb3VyY2UgPSBmdW5jdGlvbihyZXNvdXJjZXNOYW1lLCByZXNvdXJjZU5hbWUsIG9wdGlvbnMsIG1vZGVscykge1xuICAgIHZhciByZXNvdXJjZSwgcmVzb3VyY2VzO1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgcmVzb3VyY2UgPSBudWxsO1xuICAgIHJlc291cmNlcyA9IHRoaXNbcmVzb3VyY2VzTmFtZV07XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24ocmVzb3VyY2VzKSkge1xuICAgICAgcmVzb3VyY2VzID0gcmVzb3VyY2VzKCk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnZpZXdNb2RlbCA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnZpZXdNb2RlbCA9IHRoaXM7XG4gICAgfVxuICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc09iamVjdChyZXNvdXJjZXMpICYmIChyZXNvdXJjZXNbcmVzb3VyY2VOYW1lXSAhPSBudWxsKSkge1xuICAgICAgaWYgKG1vZGVscyAhPSBudWxsKSB7XG4gICAgICAgIHJlc291cmNlID0gbmV3IHJlc291cmNlc1tyZXNvdXJjZU5hbWVdKG1vZGVscywgb3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvdXJjZSA9IG5ldyByZXNvdXJjZXNbcmVzb3VyY2VOYW1lXShvcHRpb25zKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc291cmNlO1xuICB9O1xuXG4gIHJldHVybiBCYXNlO1xuXG59KShCYWNrYm9uZS5Nb2RlbCk7XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2U7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuLi9jb3JlLmpzXCI7XG52YXIgQmFzZSxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkJhc2UgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoQmFzZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQmFzZSgpIHtcbiAgICByZXR1cm4gQmFzZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIEJhc2UucHJvdG90eXBlLm5hdmlnYXRlVG8gPSBmdW5jdGlvbihyb3V0ZSwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5sb2NhdGlvbi5uYXZpZ2F0ZVRvKHJvdXRlLCBvcHRpb25zKTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5nZXRDdXJyZW50Um91dGUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0LmxvY2F0aW9uLmdldEN1cnJlbnRSb3V0ZSgpO1xuICB9O1xuXG4gIHJldHVybiBCYXNlO1xuXG59KShNYXJpb25ldHRpc3QuT2JqZWN0KTtcblxuZXhwb3J0IGRlZmF1bHQgQmFzZTtcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4vY29yZS5qc1wiO1xudmFyIEFwcGxpY2F0aW9uLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuQXBwbGljYXRpb24gPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoQXBwbGljYXRpb24sIHN1cGVyQ2xhc3MpO1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5Db250cm9sbGVycyA9IG5ldyBNYXJpb25ldHRpc3QuT2JqZWN0KCk7XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLkVudGl0aWVzID0gbmV3IE1hcmlvbmV0dGlzdC5PYmplY3QoKTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuVmlld3MgPSBuZXcgTWFyaW9uZXR0aXN0Lk9iamVjdCgpO1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5faXNSdW5uaW5nID0gZmFsc2U7XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLl9pc0Rlc3Ryb3llZCA9IGZhbHNlO1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5wcmV2ZW50RGVzdHJveSA9IGZhbHNlO1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5zdGFydEFmdGVySW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuc3RhcnRXaXRoUGFyZW50ID0gZmFsc2U7XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLnN0b3BXaXRoUGFyZW50ID0gdHJ1ZTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUucmVzb3VyY2VzID0gW107XG5cbiAgZnVuY3Rpb24gQXBwbGljYXRpb24ob3B0aW9ucykge1xuICAgIEFwcGxpY2F0aW9uLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgIHRoaXMuX2luaXRDaGlsZEFwcHMob3B0aW9ucyk7XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5fLnJlc3VsdCh0aGlzLCAnc3RhcnRBZnRlckluaXRpYWxpemVkJykpIHtcbiAgICAgIHRoaXMuc3RhcnQob3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLnN0YXJ0SGlzdG9yeSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIGlmICghTWFyaW9uZXR0aXN0LkJhY2tib25lLkhpc3Rvcnkuc3RhcnRlZCkge1xuICAgICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5sb2NhdGlvbi5zdGFydEhpc3Rvcnkob3B0aW9ucyk7XG4gICAgfVxuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICB0aGlzLnRyaWdnZXJNZXRob2QoXCJiZWZvcmU6cmVzb3VyY2VzOmZldGNoXCIsIG9wdGlvbnMpO1xuICAgIGlmICh0aGlzLnJlc291cmNlcyA9PSBudWxsKSB7XG4gICAgICB0aGlzLnJlc291cmNlcyA9IFtdO1xuICAgIH1cbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0LnV0aWxzLndhaXRGb3IodGhpcy5yZXNvdXJjZXMsIHtcbiAgICAgIHN1Y2Nlc3M6IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgQXBwbGljYXRpb24uX19zdXBlcl9fLnN0YXJ0LmNhbGwoX3RoaXMsIG9wdGlvbnMpO1xuICAgICAgICAgIF90aGlzLnRyaWdnZXJNZXRob2QoXCJyZXNvdXJjZXM6ZmV0Y2g6c3VjY2Vzc1wiKTtcbiAgICAgICAgICByZXR1cm4gX3RoaXMudHJpZ2dlck1ldGhvZChcInJlYWR5XCIpO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcyksXG4gICAgICBlcnJvcjogKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMudHJpZ2dlck1ldGhvZChcInJlc291cmNlczpmZXRjaDplcnJvclwiKTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpXG4gICAgfSk7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLmlzUnVubmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9pc1J1bm5pbmc7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgaWYgKCF0aGlzLl9pc1J1bm5pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB0aGlzLnRyaWdnZXJNZXRob2QoJ2JlZm9yZTpzdG9wJywgb3B0aW9ucyk7XG4gICAgdGhpcy5faXNSdW5uaW5nID0gZmFsc2U7XG4gICAgdGhpcy50cmlnZ2VyTWV0aG9kKCdzdG9wJywgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLl9pbml0Q2hpbGRBcHBzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNoaWxkQXBwcywgb3B0aW9ucztcbiAgICBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdm9pZCAwID8ge30gOiBhcmd1bWVudHNbMF07XG4gICAgdGhpcy5fY2hpbGRBcHBzID0ge307XG4gICAgdGhpcy5tZXJnZU9wdGlvbnMob3B0aW9ucywgWydjaGlsZEFwcHMnLCAnY2hpbGRBcHBPcHRpb25zJ10pO1xuICAgIGNoaWxkQXBwcyA9IHRoaXMuY2hpbGRBcHBzO1xuICAgIGlmIChjaGlsZEFwcHMpIHtcbiAgICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKGNoaWxkQXBwcykpIHtcbiAgICAgICAgY2hpbGRBcHBzID0gY2hpbGRBcHBzLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgICB0aGlzLmFkZENoaWxkQXBwcyhjaGlsZEFwcHMpO1xuICAgIH1cbiAgICB0aGlzLl9pbml0TGlzdGVuZXJzKCk7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLl9pbml0TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5vbih7XG4gICAgICAnc3RhcnQnOiB0aGlzLl9zdGFydENoaWxkQXBwcyxcbiAgICAgICdiZWZvcmU6c3RvcCc6IHRoaXMuX3N0b3BDaGlsZEFwcHMsXG4gICAgICAnYmVmb3JlOmRlc3Ryb3knOiB0aGlzLl9kZXN0cm95Q2hpbGRBcHBzXG4gICAgfSk7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLl9zdGFydENoaWxkQXBwcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0Ll8uZWFjaCh0aGlzLl9jaGlsZEFwcHMsIGZ1bmN0aW9uKGNoaWxkQXBwKSB7XG4gICAgICBpZiAoTWFyaW9uZXR0aXN0LnV0aWxzLmdldFZhbHVlKGNoaWxkQXBwLmdldE9wdGlvbihcInN0YXJ0V2l0aFBhcmVudFwiKSkgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkQXBwLnN0YXJ0KG9wdGlvbnMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5fc3RvcENoaWxkQXBwcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0Ll8uZWFjaCh0aGlzLl9jaGlsZEFwcHMsIGZ1bmN0aW9uKGNoaWxkQXBwKSB7XG4gICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8ucmVzdWx0KGNoaWxkQXBwLCAnc3RvcFdpdGhQYXJlbnQnKSkge1xuICAgICAgICByZXR1cm4gY2hpbGRBcHAuc3RvcChvcHRpb25zKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuX2Rlc3Ryb3lDaGlsZEFwcHMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5fLmVhY2godGhpcy5fY2hpbGRBcHBzLCBmdW5jdGlvbihjaGlsZEFwcCkge1xuICAgICAgaWYgKCFNYXJpb25ldHRpc3QuXy5yZXN1bHQoY2hpbGRBcHAsICdwcmV2ZW50RGVzdHJveScpKSB7XG4gICAgICAgIHJldHVybiBjaGlsZEFwcC5kZXN0cm95KG9wdGlvbnMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5fYnVpbGRBcHBGcm9tT2JqZWN0ID0gZnVuY3Rpb24oYXBwQ29uZmlnKSB7XG4gICAgdmFyIEFwcENsYXNzLCBvcHRpb25zO1xuICAgIEFwcENsYXNzID0gYXBwQ29uZmlnLkFwcENsYXNzO1xuICAgIG9wdGlvbnMgPSBNYXJpb25ldHRpc3QuXy5vbWl0KGFwcENvbmZpZywgJ0FwcENsYXNzJyk7XG4gICAgcmV0dXJuIHRoaXMuYnVpbGRBcHAoQXBwQ2xhc3MsIG9wdGlvbnMpO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5fYnVpbGRBcHAgPSBmdW5jdGlvbihBcHBDbGFzcywgb3B0aW9ucykge1xuICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKEFwcENsYXNzKSkge1xuICAgICAgcmV0dXJuIHRoaXMuYnVpbGRBcHAoQXBwQ2xhc3MsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNPYmplY3QoQXBwQ2xhc3MpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYnVpbGRBcHBGcm9tT2JqZWN0KEFwcENsYXNzKTtcbiAgICB9XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLmJ1aWxkQXBwID0gZnVuY3Rpb24oQXBwQ2xhc3MsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gTWFyaW9uZXR0aXN0Ll8uZXh0ZW5kKHt9LCB0aGlzLmNoaWxkQXBwT3B0aW9ucywgb3B0aW9ucyk7XG4gICAgcmV0dXJuIG5ldyBBcHBDbGFzcyhvcHRpb25zKTtcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuX2Vuc3VyZUFwcElzVW5pcXVlID0gZnVuY3Rpb24oYXBwTmFtZSkge1xuICAgIGlmICh0aGlzLl9jaGlsZEFwcHNbYXBwTmFtZV0pIHtcbiAgICAgIHRocm93IG5ldyBNYXJpb25ldHRlLkVycm9yKHtcbiAgICAgICAgbmFtZTogJ0R1cGxpY2F0ZUNoaWxkQXBwRXJyb3InLFxuICAgICAgICBtZXNzYWdlOiAnQSBjaGlsZCBBcHAgd2l0aCBuYW1lIFwiJyArIGFwcE5hbWUgKyAnXCIgaGFzIGFscmVhZHkgYmVlbiBhZGRlZC4nXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLmFkZENoaWxkQXBwcyA9IGZ1bmN0aW9uKGNoaWxkQXBwcykge1xuICAgIHJldHVybiBNYXJpb25ldHRpc3QuXy5lYWNoKGNoaWxkQXBwcywgKGZ1bmN0aW9uKGNoaWxkQXBwLCBhcHBOYW1lKSB7XG4gICAgICB0aGlzLmFkZENoaWxkQXBwKGFwcE5hbWUsIGNoaWxkQXBwKTtcbiAgICB9KSwgdGhpcyk7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLmFkZENoaWxkQXBwID0gZnVuY3Rpb24oYXBwTmFtZSwgQXBwQ2xhc3MsIG9wdGlvbnMpIHtcbiAgICB2YXIgY2hpbGRBcHA7XG4gICAgdGhpcy5fZW5zdXJlQXBwSXNVbmlxdWUoYXBwTmFtZSk7XG4gICAgY2hpbGRBcHAgPSB0aGlzLl9idWlsZEFwcChBcHBDbGFzcywgb3B0aW9ucyk7XG4gICAgaWYgKCFjaGlsZEFwcCkge1xuICAgICAgdGhyb3cgbmV3IE1hcmlvbmV0dGUuRXJyb3Ioe1xuICAgICAgICBuYW1lOiAnQWRkQ2hpbGRBcHBFcnJvcicsXG4gICAgICAgIG1lc3NhZ2U6ICdBcHAgYnVpbGQgZmFpbGVkLiAgSW5jb3JyZWN0IGNvbmZpZ3VyYXRpb24uJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIGNoaWxkQXBwLl9uYW1lID0gYXBwTmFtZTtcbiAgICB0aGlzLl9jaGlsZEFwcHNbYXBwTmFtZV0gPSBjaGlsZEFwcDtcbiAgICBjaGlsZEFwcC5vbignZGVzdHJveScsIE1hcmlvbmV0dGlzdC5fLnBhcnRpYWwodGhpcy5fcmVtb3ZlQ2hpbGRBcHAsIGFwcE5hbWUpLCB0aGlzKTtcbiAgICBpZiAodGhpcy5pc1J1bm5pbmcoKSAmJiBNYXJpb25ldHRpc3QuXy5yZXN1bHQoY2hpbGRBcHAsICdzdGFydFdpdGhQYXJlbnQnKSkge1xuICAgICAgY2hpbGRBcHAuc3RhcnQoKTtcbiAgICB9XG4gICAgcmV0dXJuIGNoaWxkQXBwO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5nZXROYW1lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLmdldENoaWxkQXBwcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBNYXJpb25ldHRpc3QuXy5jbG9uZSh0aGlzLl9jaGlsZEFwcHMpO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5nZXRDaGlsZEFwcCA9IGZ1bmN0aW9uKGFwcE5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fY2hpbGRBcHBzW2FwcE5hbWVdO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5fcmVtb3ZlQ2hpbGRBcHAgPSBmdW5jdGlvbihhcHBOYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMuX2NoaWxkQXBwc1thcHBOYW1lXS5fbmFtZTtcbiAgICBkZWxldGUgdGhpcy5fY2hpbGRBcHBzW2FwcE5hbWVdO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5yZW1vdmVDaGlsZEFwcHMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2hpbGRBcHBzO1xuICAgIGNoaWxkQXBwcyA9IHRoaXMuZ2V0Q2hpbGRBcHBzKCk7XG4gICAgTWFyaW9uZXR0aXN0Ll8uZWFjaCh0aGlzLl9jaGlsZEFwcHMsIChmdW5jdGlvbihjaGlsZEFwcCwgYXBwTmFtZSkge1xuICAgICAgdGhpcy5yZW1vdmVDaGlsZEFwcChhcHBOYW1lKTtcbiAgICB9KSwgdGhpcyk7XG4gICAgcmV0dXJuIGNoaWxkQXBwcztcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBcHAgPSBmdW5jdGlvbihhcHBOYW1lLCBvcHRpb25zKSB7XG4gICAgdmFyIGNoaWxkQXBwO1xuICAgIG9wdGlvbnMgPSBNYXJpb25ldHRpc3QuXy5leHRlbmQoe30sIG9wdGlvbnMpO1xuICAgIGNoaWxkQXBwID0gdGhpcy5nZXRDaGlsZEFwcChhcHBOYW1lKTtcbiAgICBpZiAoIWNoaWxkQXBwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnByZXZlbnREZXN0cm95IHx8IE1hcmlvbmV0dGlzdC5fLnJlc3VsdChjaGlsZEFwcCwgJ3ByZXZlbnREZXN0cm95JykpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUNoaWxkQXBwKGFwcE5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGlsZEFwcC5kZXN0cm95KCk7XG4gICAgfVxuICAgIHJldHVybiBjaGlsZEFwcDtcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCkge307XG5cbiAgcmV0dXJuIEFwcGxpY2F0aW9uO1xuXG59KShNYXJpb25ldHRpc3QuQXBwbGljYXRpb24pO1xuXG5leHBvcnQgZGVmYXVsdCBBcHBsaWNhdGlvbjtcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4vY29yZS5qc1wiO1xudmFyIE1vZHVsZTtcblxuTW9kdWxlID0gTWFyaW9uZXR0aXN0Lk9iamVjdC5leHRlbmQoTWFyaW9uZXR0aXN0LkJhY2tib25lLlJhZGlvLlJlcXVlc3RzLCB7XG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge31cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBNb2R1bGU7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbmltcG9ydCBFbnYgZnJvbSBcIi4vZW52LmpzXCI7XG5pbXBvcnQgQ2hhbm5lbHMgZnJvbSBcIi4vY2hhbm5lbHMuanNcIjtcbmltcG9ydCBMb2NhdGlvbiBmcm9tIFwiLi9sb2NhdGlvbi5qc1wiO1xuaW1wb3J0IENvbmZpZyBmcm9tIFwiLi9jb25maWcuanNcIjtcbmltcG9ydCBSZW5kZXJlciBmcm9tIFwiLi9taXhpbnMvcmVuZGVyZXIuanNcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlscy5qc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi9sb2dnZXIuanNcIjtcbmltcG9ydCBBcHBSb3V0ZSBmcm9tIFwiLi9yb3V0ZS5qc1wiO1xuaW1wb3J0IEFwcFJvdXRlciBmcm9tIFwiLi9yb3V0ZXIuanNcIjtcbmltcG9ydCBSZWdpb24gZnJvbSBcIi4vcmVnaW9uLmpzXCI7XG5pbXBvcnQgVmlld3MgZnJvbSBcIi4vdmlld3MuanNcIjtcbmltcG9ydCBCYXNlVmlldyBmcm9tIFwiLi92aWV3cy9iYXNlLmpzXCI7XG5pbXBvcnQgQ29sbGVjdGlvblZpZXcgZnJvbSBcIi4vdmlld3MvY29sbGVjdGlvbi5qc1wiO1xuaW1wb3J0IEJhc2VNb2RlbCBmcm9tIFwiLi9lbnRpdGllcy9tb2RlbHMvYmFzZS5qc1wiO1xuaW1wb3J0IEJhc2VDb2xsZWN0aW9uIGZyb20gXCIuL2VudGl0aWVzL2NvbGxlY3Rpb25zL2Jhc2UuanNcIjtcbmltcG9ydCBCYXNlUmVzcG9uZGVyIGZyb20gXCIuL2VudGl0aWVzL3Jlc3BvbmRlcnMvYmFzZS5qc1wiO1xuaW1wb3J0IEJhc2VWaWV3TW9kZWwgZnJvbSBcIi4vZW50aXRpZXMvdmlldy1tb2RlbHMvYmFzZS5qc1wiO1xuaW1wb3J0IEJhc2VDb250cm9sbGVyIGZyb20gXCIuL2NvbnRyb2xsZXJzL2Jhc2UuanNcIjtcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tIFwiLi9hcHBsaWNhdGlvbi5qc1wiO1xuaW1wb3J0IE1vZHVsZSBmcm9tIFwiLi9tb2R1bGUuanNcIjtcbnZhciByb290LFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxucm9vdCA9IHR5cGVvZiBzZWxmID09PSAnb2JqZWN0JyAmJiBzZWxmLnNlbGYgPT09IHNlbGYgJiYgc2VsZiB8fCB0eXBlb2YgZ2xvYmFsID09PSAnb2JqZWN0JyAmJiBnbG9iYWwuZ2xvYmFsID09PSBnbG9iYWwgJiYgZ2xvYmFsO1xuXG5NYXJpb25ldHRpc3QuY2hhbm5lbHMgPSBuZXcgQ2hhbm5lbHMoKTtcblxuTWFyaW9uZXR0aXN0LmxvY2F0aW9uID0gbmV3IExvY2F0aW9uKCk7XG5cbk1hcmlvbmV0dGlzdC5Nb2R1bGUgPSBNb2R1bGU7XG5cbk1hcmlvbmV0dGlzdC5lbnYgPSBuZXcgRW52KCk7XG5cbk1hcmlvbmV0dGlzdC5jb25maWcgPSBuZXcgQ29uZmlnKCk7XG5cbk1hcmlvbmV0dGlzdC5sb2dnZXIgPSBuZXcgTG9nZ2VyO1xuXG5NYXJpb25ldHRpc3QuXy5leHRlbmQoTWFyaW9uZXR0aXN0LlJlbmRlcmVyLCBSZW5kZXJlcik7XG5cbk1hcmlvbmV0dGlzdC51dGlscyA9IG5ldyBVdGlscztcblxuTWFyaW9uZXR0aXN0LkFwcFJvdXRlID0gQXBwUm91dGU7XG5cbk1hcmlvbmV0dGlzdC5BcHBSb3V0ZXIgPSBBcHBSb3V0ZXI7XG5cbk1hcmlvbmV0dGlzdC5fLmV4dGVuZChNYXJpb25ldHRpc3QuUmVnaW9uLnByb3RvdHlwZSwgUmVnaW9uLnByb3RvdHlwZSk7XG5cbk1hcmlvbmV0dGlzdC5WaWV3cyA9IG5ldyBWaWV3cygpO1xuXG5NYXJpb25ldHRpc3QuXy5leHRlbmQoTWFyaW9uZXR0aXN0LlZpZXcucHJvdG90eXBlLCB7XG4gIHRlbXBsYXRlQ29udGV4dDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGhlbHBlcnM7XG4gICAgaGVscGVycyA9IE1hcmlvbmV0dGlzdC5WaWV3cy50ZW1wbGF0ZUhlbHBlcnM7XG4gICAgcmV0dXJuIGhlbHBlcnM7XG4gIH1cbn0pO1xuXG5NYXJpb25ldHRpc3QuVmlld3MuQmFzZVZpZXcgPSBCYXNlVmlldztcblxuTWFyaW9uZXR0aXN0LlZpZXdzLkNvbGxlY3Rpb24gPSBDb2xsZWN0aW9uVmlldztcblxuTWFyaW9uZXR0aXN0LkVudGl0aWVzID0gbmV3IE1hcmlvbmV0dGlzdC5PYmplY3QoKTtcblxuTWFyaW9uZXR0aXN0LkVudGl0aWVzLk1vZGVscyA9IG5ldyBNYXJpb25ldHRpc3QuT2JqZWN0KCk7XG5cbk1hcmlvbmV0dGlzdC5FbnRpdGllcy5Db2xsZWN0aW9ucyA9IG5ldyBNYXJpb25ldHRpc3QuT2JqZWN0KCk7XG5cbk1hcmlvbmV0dGlzdC5FbnRpdGllcy5WaWV3TW9kZWxzID0gbmV3IE1hcmlvbmV0dGlzdC5PYmplY3QoKTtcblxuTWFyaW9uZXR0aXN0LkVudGl0aWVzLlJlc3BvbmRlcnMgPSBuZXcgTWFyaW9uZXR0aXN0Lk9iamVjdCgpO1xuXG5NYXJpb25ldHRpc3QuRW50aXRpZXMuTW9kZWxzLkJhc2UgPSBCYXNlTW9kZWw7XG5cbmlmIChNYXJpb25ldHRpc3QuQmFja2JvbmUuQXNzb2NpYXRlZE1vZGVsKSB7XG4gIE1hcmlvbmV0dGlzdC5FbnRpdGllcy5Nb2RlbHMuQXNzb2NpYXRlZCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgZXh0ZW5kKEFzc29jaWF0ZWQsIHN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gQXNzb2NpYXRlZCgpIHtcbiAgICAgIHJldHVybiBBc3NvY2lhdGVkLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIHJldHVybiBBc3NvY2lhdGVkO1xuXG4gIH0pKE1hcmlvbmV0dGlzdC5CYWNrYm9uZS5Bc3NvY2lhdGVkTW9kZWwpO1xufVxuXG5NYXJpb25ldHRpc3QuRW50aXRpZXMuQ29sbGVjdGlvbnMuQmFzZSA9IEJhc2VDb2xsZWN0aW9uO1xuXG5NYXJpb25ldHRpc3QuRW50aXRpZXMuUmVzcG9uZGVycy5CYXNlID0gQmFzZVJlc3BvbmRlcjtcblxuTWFyaW9uZXR0aXN0LkVudGl0aWVzLlZpZXdNb2RlbHMuQmFzZSA9IEJhc2VWaWV3TW9kZWw7XG5cbk1hcmlvbmV0dGlzdC5Db250cm9sbGVycyA9IG5ldyBNYXJpb25ldHRpc3QuT2JqZWN0KCk7XG5cbk1hcmlvbmV0dGlzdC5Db250cm9sbGVycy5CYXNlID0gQmFzZUNvbnRyb2xsZXI7XG5cbk1hcmlvbmV0dGlzdC5BcHBsaWNhdGlvbiA9IEFwcGxpY2F0aW9uO1xuXG5pZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwgIT09IG51bGwpIHtcbiAgZ2xvYmFsLk1hcmlvbmV0dGlzdCA9IE1hcmlvbmV0dGlzdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFyaW9uZXR0aXN0O1xuIl0sIm5hbWVzIjpbIk1hcmlvbmV0dGlzdCIsIk1hcmlvbmV0dGUiLCJoYXNQcm9wIiwiZXh0ZW5kIiwiVGVtcGxhdGVzIiwic2xpY2UiLCJCYXNlIiwiTW9kZWxCYXNlIiwiQmFzZVZpZXciLCJDaGFubmVscyIsIkxvY2F0aW9uIiwiTW9kdWxlIiwiRW52IiwiQ29uZmlnIiwiTG9nZ2VyIiwiUmVuZGVyZXIiLCJVdGlscyIsIkFwcFJvdXRlIiwiQXBwUm91dGVyIiwiUmVnaW9uIiwiVmlld3MiLCJDb2xsZWN0aW9uVmlldyIsIkFwcGxpY2F0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFhQSxJQUFJQSxjQUFZLENBQUM7O0FBRWpCQSxjQUFZLEdBQUdDLFlBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7QUFFbkNELGNBQVksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDOztBQUVqQ0EsY0FBWSxDQUFDLFVBQVUsR0FBR0MsWUFBVSxDQUFDOztBQUVyQ0QsY0FBWSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRW5CQSxjQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFbkJBLGNBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVuQkEsY0FBWSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7O0FBRTVCQSxjQUFZLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzs7QUFFL0JBLGNBQVksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztBQUU3QixxQkFBZUEsY0FBWSxDQUFDOztBQ2hDeEIs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