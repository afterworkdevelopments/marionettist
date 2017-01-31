(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('underscore'), require('underscore-contrib'), require('underscore.string'), require('jquery'), require('backbone'), require('backbone.radio'), require('backbone-associations'), require('backbone.marionette'), require('i18next'), require('numeral'), require('moment'), require('moment-range'), require('moment-timezone')) :
  typeof define === 'function' && define.amd ? define(['underscore', 'underscore-contrib', 'underscore.string', 'jquery', 'backbone', 'backbone.radio', 'backbone-associations', 'backbone.marionette', 'i18next', 'numeral', 'moment', 'moment-range', 'moment-timezone'], factory) :
  (global.Marionettist = factory(global._,global.underscoreContrib,global.s,global.$,global.Backbone,global.Backbone.Radio,global.backboneAssociations,global.Marionette,global.i18next,global.numeral,global.moment,global.momentRange,global.momentTimezone));
}(this, (function (_,underscoreContrib,s,$,Backbone,backbone_radio,backboneAssociations,Marionette$1,i18next,numeral,moment,momentRange,momentTimezone) { 'use strict';

_ = 'default' in _ ? _['default'] : _;
s = 'default' in s ? s['default'] : s;
$ = 'default' in $ ? $['default'] : $;
Backbone = 'default' in Backbone ? Backbone['default'] : Backbone;
backbone_radio = 'default' in backbone_radio ? backbone_radio['default'] : backbone_radio;
Marionette$1 = 'default' in Marionette$1 ? Marionette$1['default'] : Marionette$1;
i18next = 'default' in i18next ? i18next['default'] : i18next;
numeral = 'default' in numeral ? numeral['default'] : numeral;
moment = 'default' in moment ? moment['default'] : moment;

var Marionettist$1;

Marionettist$1 = Marionette$1.extend();

Marionettist$1.Backbone = Backbone;

Marionettist$1.Backbone.Radio = backbone_radio;

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
    Mnt: Marionettist$2,
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
    var fetchOptions, loaderView, region;
    if (options == null) {
      options = {};
    }
    fetchOptions = {};
    if (Marionettist$2._.isObject(options) && Marionettist$2._.isObject(options.fetch)) {
      fetchOptions = options.fetch;
    }
    region = options.region != null ? options.region : this.get("region");
    this.listenTo(view, "close", this.close);
    if (options.async != null) {
      if (options.loaderView !== false) {
        loaderView = this.getLoaderView();
        this.listenTo(loaderView, "close", this.close);
        region.show(loaderView);
      }
      return this.fetch(fetchOptions).then(((function(_this) {
        return function() {
          if (options.loaderView !== false) {
            if (region.currentView !== loaderView) {
              return view.close();
            }
          }
          return region.show(view);
        };
      })(this)), function() {});
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

Module = Marionettist$2.Object.extend(Marionettist$2.Backbone.Radio.Requests);

var Module$1 = Module;

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
var hasProp = {}.hasOwnProperty;
Marionettist$2.channels = new Channels$1();

Marionettist$2.location = new Location$1();

Marionettist$2.Module = Module$1;

Marionettist$2.Mixins = {
  Collections: {},
  Models: {},
  Views: {}
};

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
    helpers = Marionettist$2._.clone(Marionettist$2.Views.templateHelpers);
    return helpers;
  }
});

Marionettist$2.Views.Base = BaseView$1;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvY29yZS5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvZW52LmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9jaGFubmVscy5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvbG9jYXRpb24uanMiLCIvbW50LzdhNmMwY2JkLTY3YzgtNDU5Ny05ZDMzLTJlMjliMTJkZjJhOS9yZXBvcy9tYXJpb25ldHRpc3QvbGliL2NvbmZpZy90ZW1wbGF0ZXMuanMiLCIvbW50LzdhNmMwY2JkLTY3YzgtNDU5Ny05ZDMzLTJlMjliMTJkZjJhOS9yZXBvcy9tYXJpb25ldHRpc3QvbGliL2NvbmZpZy5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvbWl4aW5zL3JlbmRlcmVyLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi91dGlscy5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvbG9nZ2VyLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9yb3V0ZS5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvcm91dGVyLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9yZWdpb24uanMiLCIvbW50LzdhNmMwY2JkLTY3YzgtNDU5Ny05ZDMzLTJlMjliMTJkZjJhOS9yZXBvcy9tYXJpb25ldHRpc3QvbGliL3ZpZXdzLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi92aWV3cy9iYXNlLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi92aWV3cy9jb2xsZWN0aW9uLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9lbnRpdGllcy9tb2RlbHMvYmFzZS5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvZW50aXRpZXMvY29sbGVjdGlvbnMvYmFzZS5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvZW50aXRpZXMvcmVzcG9uZGVycy9iYXNlLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9lbnRpdGllcy92aWV3LW1vZGVscy9iYXNlLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9jb250cm9sbGVycy9iYXNlLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9hcHBsaWNhdGlvbi5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvbW9kdWxlLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9tYXJpb25ldHRpc3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSBcInVuZGVyc2NvcmVcIjtcbmltcG9ydCB1bmRlcnNjb3JlQ29udHJpYiBmcm9tIFwidW5kZXJzY29yZS1jb250cmliXCI7XG5pbXBvcnQgcyBmcm9tIFwidW5kZXJzY29yZS5zdHJpbmdcIjtcbmltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCBCYWNrYm9uZSBmcm9tIFwiYmFja2JvbmVcIjtcbmltcG9ydCBiYWNrYm9uZV9yYWRpbyBmcm9tIFwiYmFja2JvbmUucmFkaW9cIjtcbmltcG9ydCBiYWNrYm9uZUFzc29jaWF0aW9ucyBmcm9tIFwiYmFja2JvbmUtYXNzb2NpYXRpb25zXCI7XG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tIFwiYmFja2JvbmUubWFyaW9uZXR0ZVwiO1xuaW1wb3J0IGkxOG5leHQgZnJvbSBcImkxOG5leHRcIjtcbmltcG9ydCBudW1lcmFsIGZyb20gXCJudW1lcmFsXCI7XG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcbmltcG9ydCBtb21lbnRSYW5nZSBmcm9tIFwibW9tZW50LXJhbmdlXCI7XG5pbXBvcnQgbW9tZW50VGltZXpvbmUgZnJvbSBcIm1vbWVudC10aW1lem9uZVwiO1xudmFyIE1hcmlvbmV0dGlzdDtcblxuTWFyaW9uZXR0aXN0ID0gTWFyaW9uZXR0ZS5leHRlbmQoKTtcblxuTWFyaW9uZXR0aXN0LkJhY2tib25lID0gQmFja2JvbmU7XG5cbk1hcmlvbmV0dGlzdC5CYWNrYm9uZS5SYWRpbyA9IGJhY2tib25lX3JhZGlvO1xuXG5NYXJpb25ldHRpc3QuTWFyaW9uZXR0ZSA9IE1hcmlvbmV0dGU7XG5cbk1hcmlvbmV0dGlzdC5fID0gXztcblxuTWFyaW9uZXR0aXN0LiQgPSAkO1xuXG5NYXJpb25ldHRpc3QucyA9IHM7XG5cbk1hcmlvbmV0dGlzdC5JMThuID0gaTE4bmV4dDtcblxuTWFyaW9uZXR0aXN0Lm51bWVyYWwgPSBudW1lcmFsO1xuXG5NYXJpb25ldHRpc3QubW9tZW50ID0gbW9tZW50O1xuXG5leHBvcnQgZGVmYXVsdCBNYXJpb25ldHRpc3Q7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbnZhciBFbnYsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5FbnYgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoRW52LCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBFbnYoKSB7XG4gICAgdGhpcy5zdGFnZSA9IFwiZGV2ZWxvcG1lbnRcIjtcbiAgfVxuXG4gIEVudi5wcm90b3R5cGUuaXNEZXZlbG9wbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnN0YWdlID09PSBcImRldmVsb3BtZW50XCI7XG4gIH07XG5cbiAgRW52LnByb3RvdHlwZS5pc1Byb2R1Y3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFnZSA9PT0gXCJwcm9kdWN0aW9uXCI7XG4gIH07XG5cbiAgRW52LnByb3RvdHlwZS5nZXRMb2NhbGUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0LkkxOG4ubGFuZ3VhZ2U7XG4gIH07XG5cbiAgRW52LnByb3RvdHlwZS5zZXRTdGFnZSA9IGZ1bmN0aW9uKHN0YWdlKSB7XG4gICAgdmFyIG9sZFN0YXRlO1xuICAgIG9sZFN0YXRlID0gdGhpcy5zdGFnZTtcbiAgICB0aGlzLnN0YWdlID0gc3RhZ2U7XG4gICAgcmV0dXJuIHRoaXMudHJpZ2dlck1ldGhvZChcImNoYW5nZTpzdGFnZVwiLCBvbGRTdGF0ZSwgc3RhZ2UpO1xuICB9O1xuXG4gIEVudi5wcm90b3R5cGUuZ2V0U3RhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFnZTtcbiAgfTtcblxuICBFbnYucHJvdG90eXBlLnNldExvY2FsZSA9IGZ1bmN0aW9uKGxvY2FsZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgb2xkTG9jYWxlO1xuICAgIGlmIChsb2NhbGUgPT0gbnVsbCkge1xuICAgICAgbG9jYWxlID0gXCJlblwiO1xuICAgIH1cbiAgICBpZiAoY2FsbGJhY2sgPT0gbnVsbCkge1xuICAgICAgY2FsbGJhY2sgPSBudWxsO1xuICAgIH1cbiAgICBvbGRMb2NhbGUgPSB0aGlzLmdldExvY2FsZSgpO1xuICAgIHJldHVybiBNYXJpb25ldHRpc3QuSTE4bi5jaGFuZ2VMYW5ndWFnZShsb2NhbGUsIGZ1bmN0aW9uKHQpIHtcbiAgICAgIE1hcmlvbmV0dGlzdC5jaGFubmVscy5wdWJsaXNoKFwibWFyaW9uZXR0aXN0XCIsIFwiY2hhbmdlOmxvY2FsZVwiLCB7XG4gICAgICAgIGN1cnJlbnRMb2NhbGU6IGxvY2FsZSxcbiAgICAgICAgb2xkTG9jYWxlOiBvbGRMb2NhbGVcbiAgICAgIH0pO1xuICAgICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayh0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gRW52O1xuXG59KShNYXJpb25ldHRpc3QuT2JqZWN0KTtcblxuZXhwb3J0IGRlZmF1bHQgRW52O1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi9jb3JlLmpzXCI7XG52YXIgQ2hhbm5lbHMsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5DaGFubmVscyA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChDaGFubmVscywgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQ2hhbm5lbHMoKSB7fVxuXG4gIENoYW5uZWxzLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24oY2hhbm5lbE5hbWUsIGV2ZW50TmFtZSwgZGF0YSkge1xuICAgIGlmIChjaGFubmVsTmFtZSA9PSBudWxsKSB7XG4gICAgICBjaGFubmVsTmFtZSA9IFwiZ2xvYmFsXCI7XG4gICAgfVxuICAgIGlmIChldmVudE5hbWUgPT0gbnVsbCkge1xuICAgICAgZXZlbnROYW1lID0gXCJcIjtcbiAgICB9XG4gICAgaWYgKGRhdGEgPT0gbnVsbCkge1xuICAgICAgZGF0YSA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0LkJhY2tib25lLlJhZGlvLmNoYW5uZWwoY2hhbm5lbE5hbWUpLnJlcXVlc3QoZXZlbnROYW1lLCBkYXRhKTtcbiAgfTtcblxuICBDaGFubmVscy5wcm90b3R5cGUucmVwbHlPbmNlID0gZnVuY3Rpb24oY2hhbm5lbE5hbWUsIGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgY2hhbm5lbDtcbiAgICBpZiAoY2hhbm5lbE5hbWUgPT0gbnVsbCkge1xuICAgICAgY2hhbm5lbE5hbWUgPSBcImdsb2JhbFwiO1xuICAgIH1cbiAgICBpZiAoZXZlbnROYW1lID09IG51bGwpIHtcbiAgICAgIGV2ZW50TmFtZSA9IFwiXCI7XG4gICAgfVxuICAgIGNoYW5uZWwgPSBNYXJpb25ldHRpc3QuQmFja2JvbmUuUmFkaW8uY2hhbm5lbChjaGFubmVsTmFtZSk7XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgICByZXR1cm4gY2hhbm5lbC5yZXBseU9uY2UoZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjaGFubmVsLnJlcGx5T25jZShjYWxsYmFjayk7XG4gICAgfVxuICB9O1xuXG4gIENoYW5uZWxzLnByb3RvdHlwZS5yZXBseSA9IGZ1bmN0aW9uKGNoYW5uZWxOYW1lLCBldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGNoYW5uZWw7XG4gICAgaWYgKGNoYW5uZWxOYW1lID09IG51bGwpIHtcbiAgICAgIGNoYW5uZWxOYW1lID0gXCJnbG9iYWxcIjtcbiAgICB9XG4gICAgaWYgKGV2ZW50TmFtZSA9PSBudWxsKSB7XG4gICAgICBldmVudE5hbWUgPSBcIlwiO1xuICAgIH1cbiAgICBjaGFubmVsID0gTWFyaW9uZXR0aXN0LkJhY2tib25lLlJhZGlvLmNoYW5uZWwoY2hhbm5lbE5hbWUpO1xuICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xuICAgICAgcmV0dXJuIGNoYW5uZWwucmVwbHkoZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjaGFubmVsLnJlcGx5KGNhbGxiYWNrKTtcbiAgICB9XG4gIH07XG5cbiAgQ2hhbm5lbHMucHJvdG90eXBlLnB1Ymxpc2ggPSBmdW5jdGlvbihjaGFubmVsTmFtZSwgZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgaWYgKGNoYW5uZWxOYW1lID09IG51bGwpIHtcbiAgICAgIGNoYW5uZWxOYW1lID0gXCJnbG9iYWxcIjtcbiAgICB9XG4gICAgaWYgKGV2ZW50TmFtZSA9PSBudWxsKSB7XG4gICAgICBldmVudE5hbWUgPSBcIlwiO1xuICAgIH1cbiAgICBpZiAoZGF0YSA9PSBudWxsKSB7XG4gICAgICBkYXRhID0ge307XG4gICAgfVxuICAgIHJldHVybiBNYXJpb25ldHRpc3QuQmFja2JvbmUuUmFkaW8uY2hhbm5lbChjaGFubmVsTmFtZSkudHJpZ2dlcihldmVudE5hbWUsIGRhdGEpO1xuICB9O1xuXG4gIENoYW5uZWxzLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbihjaGFubmVsTmFtZSwgZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgIGlmIChjaGFubmVsTmFtZSA9PSBudWxsKSB7XG4gICAgICBjaGFubmVsTmFtZSA9IFwiZ2xvYmFsXCI7XG4gICAgfVxuICAgIGlmIChldmVudE5hbWUgPT0gbnVsbCkge1xuICAgICAgZXZlbnROYW1lID0gXCJcIjtcbiAgICB9XG4gICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5CYWNrYm9uZS5SYWRpby5jaGFubmVsKGNoYW5uZWxOYW1lKS5vbihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfTtcblxuICByZXR1cm4gQ2hhbm5lbHM7XG5cbn0pKE1hcmlvbmV0dGlzdC5PYmplY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBDaGFubmVscztcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4vY29yZS5qc1wiO1xudmFyIExvY2F0aW9uLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuTG9jYXRpb24gPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoTG9jYXRpb24sIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIExvY2F0aW9uKCkge31cblxuICBMb2NhdGlvbi5wcm90b3R5cGUucmVmcmVzaFJvdXRlID0gZnVuY3Rpb24oZnJhZ21lbnQpIHtcbiAgICBpZiAoZnJhZ21lbnQgPT0gbnVsbCkge1xuICAgICAgZnJhZ21lbnQgPSB0aGlzLmdldEN1cnJlbnRSb3V0ZSgpO1xuICAgIH1cbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0LkJhY2tib25lLmhpc3RvcnkubG9hZFVybChmcmFnbWVudCk7XG4gIH07XG5cbiAgTG9jYXRpb24ucHJvdG90eXBlLm5hdmlnYXRlVG8gPSBmdW5jdGlvbihyb3V0ZSwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5CYWNrYm9uZS5oaXN0b3J5Lm5hdmlnYXRlKHJvdXRlLCBvcHRpb25zKTtcbiAgfTtcblxuICBMb2NhdGlvbi5wcm90b3R5cGUuZ2V0Q3VycmVudFJvdXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGZyYWc7XG4gICAgZnJhZyA9IE1hcmlvbmV0dGlzdC5CYWNrYm9uZS5oaXN0b3J5LmZyYWdtZW50O1xuICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0VtcHR5KGZyYWcpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZyYWc7XG4gICAgfVxuICB9O1xuXG4gIExvY2F0aW9uLnByb3RvdHlwZS5zdGFydEhpc3RvcnkgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBpZiAoTWFyaW9uZXR0aXN0LkJhY2tib25lLmhpc3RvcnkgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5CYWNrYm9uZS5oaXN0b3J5LnN0YXJ0KG9wdGlvbnMpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gTG9jYXRpb247XG5cbn0pKE1hcmlvbmV0dGlzdC5PYmplY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBMb2NhdGlvbjtcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4uL2NvcmUuanNcIjtcbnZhciBUZW1wbGF0ZXM7XG5cblRlbXBsYXRlcyA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gVGVtcGxhdGVzKCkge31cblxuICBUZW1wbGF0ZXMucHJvdG90eXBlLmRlYnVnID0gZmFsc2U7XG5cbiAgVGVtcGxhdGVzLnByb3RvdHlwZS5sb29rdXBQYXRocyA9IFtdO1xuXG4gIFRlbXBsYXRlcy5wcm90b3R5cGUuZW5naW5lID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVuZ2luZTtcbiAgICBlbmdpbmUgPSB7fTtcbiAgICBpZiAodHlwZW9mIEhBTUwgIT09IFwidW5kZWZpbmVkXCIgJiYgSEFNTCAhPT0gbnVsbCkge1xuICAgICAgZW5naW5lID0gSEFNTDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBKU1QgIT09IFwidW5kZWZpbmVkXCIgJiYgSlNUICE9PSBudWxsKSB7XG4gICAgICBlbmdpbmUgPSBKU1Q7XG4gICAgfVxuICAgIHJldHVybiBlbmdpbmU7XG4gIH07XG5cbiAgVGVtcGxhdGVzLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbih0ZW1wbGF0ZU5hbWUsIGRhdGEsIG9wdGlvbnMpIHtcbiAgICB2YXIgZW5naW5lLCB0ZW1wbGF0ZTtcbiAgICBpZiAodGVtcGxhdGVOYW1lID09IG51bGwpIHtcbiAgICAgIHRlbXBsYXRlTmFtZSA9IFwiXCI7XG4gICAgfVxuICAgIGlmIChkYXRhID09IG51bGwpIHtcbiAgICAgIGRhdGEgPSB7fTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICB0ZW1wbGF0ZSA9IFwiXCI7XG4gICAgZW5naW5lID0gdGhpcy5lbmdpbmU7XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24odGVtcGxhdGVOYW1lKSkge1xuICAgICAgZW5naW5lID0gZW5naW5lKCk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmRlZmF1bHRUZW1wbGF0ZSAhPSBudWxsKSB7XG4gICAgICB0ZW1wbGF0ZSA9IG9wdGlvbnMuZGVmYXVsdFRlbXBsYXRlO1xuICAgIH1cbiAgICBpZiAoKGVuZ2luZSAhPSBudWxsKSAmJiBNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKGVuZ2luZVt0ZW1wbGF0ZU5hbWVdKSkge1xuICAgICAgdGVtcGxhdGUgPSBlbmdpbmVbdGVtcGxhdGVOYW1lXShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIHRlbXBsYXRlO1xuICB9O1xuXG4gIHJldHVybiBUZW1wbGF0ZXM7XG5cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFRlbXBsYXRlcztcbiIsImltcG9ydCBUZW1wbGF0ZXMgZnJvbSBcIi4vY29uZmlnL3RlbXBsYXRlcy5qc1wiO1xuaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi9jb3JlLmpzXCI7XG52YXIgQ29uZmlnLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuQ29uZmlnID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKENvbmZpZywgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQ29uZmlnKCkge1xuICAgIHRoaXMudGVtcGxhdGVzID0gbmV3IFRlbXBsYXRlcygpO1xuICB9XG5cbiAgcmV0dXJuIENvbmZpZztcblxufSkoTWFyaW9uZXR0aXN0Lk9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IENvbmZpZztcbiIsInZhciBSZW5kZXJlcjtcblxuUmVuZGVyZXIgPSB7XG4gIHJlbmRlcjogZnVuY3Rpb24odGVtcGxhdGUsIGRhdGEpIHtcbiAgICB2YXIgZW5naW5lVGVtcGxhdGU7XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24odGVtcGxhdGUpKSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGUoZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0ZW1wbGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZW5naW5lVGVtcGxhdGUgPSB0aGlzLmdldFRlbXBsYXRlKHRlbXBsYXRlKTtcbiAgICAgIGlmICghTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihlbmdpbmVUZW1wbGF0ZSkpIHtcbiAgICAgICAgdGhyb3cgXCJUZW1wbGF0ZSBcIiArIHRlbXBsYXRlICsgXCIgd2FzIG5vdCBmb3VuZCFcIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlbmdpbmVUZW1wbGF0ZShkYXRhKTtcbiAgICB9XG4gIH0sXG4gIGdldFRlbXBsYXRlOiBmdW5jdGlvbih0ZW1wbGF0ZSkge1xuICAgIHZhciBpLCBqLCBsZW4sIGxlbjEsIGxvb2t1cCwgbG9va3VwUGF0aCwgbG9va3VwcywgcGF0aCwgdGVtcGxhdGVzO1xuICAgIGxvb2t1cHMgPSBNYXJpb25ldHRpc3QuY29uZmlnLnRlbXBsYXRlcy5sb29rdXBQYXRocztcbiAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihsb29rdXBzKSkge1xuICAgICAgbG9va3VwcyA9IGxvb2t1cHMoKTtcbiAgICB9XG4gICAgaWYgKCFNYXJpb25ldHRpc3QuXy5pc0FycmF5KGxvb2t1cHMpKSB7XG4gICAgICB0aHJvdyBcImxvb2t1cFBhdGhzIG1vc3QgYmUgYW4gYXJyYXlcIjtcbiAgICB9XG4gICAgdGVtcGxhdGVzID0gW3RlbXBsYXRlXTtcbiAgICBpZiAobG9va3Vwcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGxvb2t1cHMgPSBbXCJcIl07XG4gICAgfVxuICAgIGZvciAoaSA9IDAsIGxlbiA9IGxvb2t1cHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxvb2t1cCA9IGxvb2t1cHNbaV07XG4gICAgICBmb3IgKGogPSAwLCBsZW4xID0gdGVtcGxhdGVzLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgICBwYXRoID0gdGVtcGxhdGVzW2pdO1xuICAgICAgICBsb29rdXBQYXRoID0gdGhpcy5maW5kTG9va3VwUGF0aChsb29rdXAgKyBwYXRoLCB0ZW1wbGF0ZSk7XG4gICAgICAgIGlmIChsb29rdXBQYXRoICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbG9va3VwUGF0aDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgZmluZExvb2t1cFBhdGg6IGZ1bmN0aW9uKHBhdGgsIHRlbXBsYXRlKSB7XG4gICAgdmFyIGVuZ2luZSwgbG9va3VwUGF0aDtcbiAgICBlbmdpbmUgPSBNYXJpb25ldHRpc3QuY29uZmlnLnRlbXBsYXRlcy5lbmdpbmU7XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24oZW5naW5lKSkge1xuICAgICAgZW5naW5lID0gZW5naW5lKCk7XG4gICAgfVxuICAgIGxvb2t1cFBhdGggPSBlbmdpbmVbcGF0aF07XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5jb25maWcudGVtcGxhdGVzLmRlYnVnID09PSB0cnVlKSB7XG4gICAgICBNYXJpb25ldHRpc3QubG9nZ2VyLmluZm8oXCJMb29raW5nIHRlbXBsYXRlOiBcIiArIHRlbXBsYXRlICsgXCIgaW4gJ1wiICsgcGF0aCArIFwiJ1wiKTtcbiAgICB9XG4gICAgaWYgKGxvb2t1cFBhdGgpIHtcbiAgICAgIHJldHVybiBsb29rdXBQYXRoO1xuICAgIH1cbiAgfSxcbiAgd2l0aFRlbXBsYXRlOiBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICB2YXIgYXJyYXk7XG4gICAgaWYgKHN0cmluZyAhPSBudWxsKSB7XG4gICAgICBhcnJheSA9IHN0cmluZy5zcGxpdChcIi9cIik7XG4gICAgICBhcnJheS5zcGxpY2UoLTEsIDAsIFwidGVtcGxhdGVzXCIpO1xuICAgICAgcmV0dXJuIGFycmF5LmpvaW4oXCIvXCIpO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVuZGVyZXI7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbnZhciBVdGlscyxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHksXG4gIHNsaWNlID0gW10uc2xpY2U7XG5cblV0aWxzID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKFV0aWxzLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBVdGlscygpIHtcbiAgICByZXR1cm4gVXRpbHMuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBVdGlscy5wcm90b3R5cGUuZ2V0VmFsdWUgPSBmdW5jdGlvbih2YWx1ZSwgY29udGV4dCwgcGFyYW1zKSB7XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICB2YWx1ZSA9IHBhcmFtcyA/IHZhbHVlLmFwcGx5KGNvbnRleHQsIHBhcmFtcykgOiB2YWx1ZS5jYWxsKGNvbnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgVXRpbHMucHJvdG90eXBlLnBhdGhGb3IgPSBmdW5jdGlvbihfcGF0aCkge1xuICAgIHZhciBwYXRoO1xuICAgIHBhdGggPSBcIlwiO1xuICAgIHBhdGggPSBcIiNcIiArIF9wYXRoO1xuICAgIHJldHVybiBwYXRoO1xuICB9O1xuXG4gIFV0aWxzLnByb3RvdHlwZS53YWl0Rm9yID0gZnVuY3Rpb24ocHJvbWlzZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHN3aXRjaCAoZmFsc2UpIHtcbiAgICAgIGNhc2Ugb3B0aW9ucy5wcm9taXNlVHlwZSAhPT0gXCJibHVlYmlyZFwiOlxuICAgICAgICByZXR1cm4gdGhpcy5fd2FpdEZvckJsdWViaXJkKHByb21pc2VzLCBvcHRpb25zKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0aGlzLl93YWl0Rm9yQWpheChwcm9taXNlcywgb3B0aW9ucyk7XG4gICAgfVxuICB9O1xuXG4gIFV0aWxzLnByb3RvdHlwZS5fd2FpdEZvckFqYXggPSBmdW5jdGlvbihhamF4UmVxdWVzdHMsIG9wdGlvbnMpIHtcbiAgICB2YXIgcmVmLCB4aHJzO1xuICAgIGlmIChhamF4UmVxdWVzdHMgPT0gbnVsbCkge1xuICAgICAgYWpheFJlcXVlc3RzID0gW107XG4gICAgfVxuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgeGhycyA9IFtdO1xuICAgIHhocnMgPSBNYXJpb25ldHRpc3QuXy5jaGFpbihbYWpheFJlcXVlc3RzXSkuZmxhdHRlbigpLnZhbHVlKCk7XG4gICAgaWYgKHhocnMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIChyZWYgPSBNYXJpb25ldHRpc3QuJCkud2hlbi5hcHBseShyZWYsIHhocnMpLnRoZW4oKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXJncztcbiAgICAgICAgYXJncyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihvcHRpb25zLnN1Y2Nlc3MpKSB7XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMuc3VjY2Vzcy5hcHBseShvcHRpb25zLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgfSksIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXJncztcbiAgICAgICAgYXJncyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihvcHRpb25zLmVycm9yKSkge1xuICAgICAgICAgIHJldHVybiBvcHRpb25zLmVycm9yLmFwcGx5KG9wdGlvbnMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24ob3B0aW9ucy5zdWNjZXNzKSkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5zdWNjZXNzKG51bGwpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBVdGlscy5wcm90b3R5cGUuX3dhaXRGb3JCbHVlYmlyZCA9IGZ1bmN0aW9uKHByb21pc2VzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBwcm9taXNlcyA9IE1hcmlvbmV0dGlzdC5fLmNoYWluKFtwcm9taXNlc10pLmZsYXR0ZW4oKS52YWx1ZSgpO1xuICAgIGlmIChwcm9taXNlcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMubWFwKGZ1bmN0aW9uKHByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2UucmVmbGVjdCgpO1xuICAgICAgfSkpLnRoZW4oZnVuY3Rpb24oaW5zcGVjdGlvbnMpIHtcbiAgICAgICAgdmFyIGVycm9ycywgaSwgaW5zcGVjdGlvbiwgbGVuLCBzdWNjZXNzQXJncztcbiAgICAgICAgc3VjY2Vzc0FyZ3MgPSBbXTtcbiAgICAgICAgZXJyb3JzID0gW107XG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGluc3BlY3Rpb25zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgaW5zcGVjdGlvbiA9IGluc3BlY3Rpb25zW2ldO1xuICAgICAgICAgIGlmIChpbnNwZWN0aW9uLmlzRnVsZmlsbGVkKCkpIHtcbiAgICAgICAgICAgIHN1Y2Nlc3NBcmdzLnB1c2goaW5zcGVjdGlvbi52YWx1ZSgpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXJyb3JzLnB1c2goaW5zcGVjdGlvbi5yZWFzb24oKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKG9wdGlvbnMuZXJyb3IpKSB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9ucy5lcnJvci5hcHBseShvcHRpb25zLCBlcnJvcnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihvcHRpb25zLnN1Y2Nlc3MpKSB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9ucy5zdWNjZXNzLmFwcGx5KG9wdGlvbnMsIHN1Y2Nlc3NBcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihvcHRpb25zLnN1Y2Nlc3MpKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLnN1Y2Nlc3MobnVsbCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBVdGlscztcblxufSkoTWFyaW9uZXR0aXN0Lk9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IFV0aWxzO1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi9jb3JlLmpzXCI7XG52YXIgTG9nZ2VyLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuTG9nZ2VyID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKExvZ2dlciwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gTG9nZ2VyKCkge31cblxuICBMb2dnZXIucHJvdG90eXBlLnN1Y2Nlc3MgPSBmdW5jdGlvbihtc2csIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIG9wdGlvbnMudHlwZSA9IFwic3VjY2Vzc1wiO1xuICAgIHJldHVybiB0aGlzLmxvZyhtc2csIG9wdGlvbnMpO1xuICB9O1xuXG4gIExvZ2dlci5wcm90b3R5cGUud2FybiA9IGZ1bmN0aW9uKG1zZywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgb3B0aW9ucy50eXBlID0gXCJ3YXJuXCI7XG4gICAgcmV0dXJuIHRoaXMubG9nKG1zZywgb3B0aW9ucyk7XG4gIH07XG5cbiAgTG9nZ2VyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uKG1zZywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgb3B0aW9ucy50eXBlID0gXCJlcnJvclwiO1xuICAgIHJldHVybiB0aGlzLmxvZyhtc2csIG9wdGlvbnMpO1xuICB9O1xuXG4gIExvZ2dlci5wcm90b3R5cGUuaW5mbyA9IGZ1bmN0aW9uKG1zZywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgb3B0aW9ucy50eXBlID0gXCJpbmZvXCI7XG4gICAgcmV0dXJuIHRoaXMubG9nKG1zZywgb3B0aW9ucyk7XG4gIH07XG5cbiAgTG9nZ2VyLnByb3RvdHlwZS5sb2cgPSBmdW5jdGlvbihtc2csIG9wdGlvbnMpIHtcbiAgICB2YXIgYmdjLCBmb3JjZSwgdHlwZTtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIGZvcmNlID0gb3B0aW9ucy5mb3JjZTtcbiAgICB0eXBlID0gb3B0aW9ucy50eXBlO1xuICAgIGlmIChNYXJpb25ldHRpc3QuZW52LmlzRGV2ZWxvcG1lbnQoKSB8fCBmb3JjZSA9PT0gdHJ1ZSkge1xuICAgICAgdHlwZSA9IHR5cGUgfHwgJ2JsYWNrJztcbiAgICAgIGJnYyA9ICdXaGl0ZSc7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICAgICAgdHlwZSA9ICdHcmVlbic7XG4gICAgICAgICAgYmdjID0gJ0xpbWVHcmVlbic7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2luZm8nOlxuICAgICAgICAgIHR5cGUgPSAnRG9kZ2VyQmx1ZSc7XG4gICAgICAgICAgYmdjID0gJ1R1cnF1b2lzZSc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICB0eXBlID0gJ1JlZCc7XG4gICAgICAgICAgYmdjID0gJ0JsYWNrJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnc3RhcnQnOlxuICAgICAgICAgIHR5cGUgPSAnT2xpdmVEcmFiJztcbiAgICAgICAgICBiZ2MgPSAnUGFsZUdyZWVuJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnd2FybmluZyc6XG4gICAgICAgICAgdHlwZSA9ICdUb21hdG8nO1xuICAgICAgICAgIGJnYyA9ICdCbGFjayc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgdHlwZSA9ICdPcmNoaWQnO1xuICAgICAgICAgIGJnYyA9ICdNZWRpdW1WaW9sZXRSZWQnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHR5cGUgPSB0eXBlO1xuICAgICAgfVxuICAgICAgYmdjID0gJ1doaXRlJztcbiAgICAgIGlmICh0eXBlb2YgbXNnID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJyVjJyArIG1zZywgJ3R5cGU6JyArIHR5cGUgKyAnO2ZvbnQtd2VpZ2h0OmJvbGQ7IGJhY2tncm91bmQtdHlwZTogJyArIGJnYyArICc7Jyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBMb2dnZXI7XG5cbn0pKE1hcmlvbmV0dGlzdC5PYmplY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBMb2dnZXI7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbnZhciBBcHBSb3V0ZSxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkFwcFJvdXRlID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKEFwcFJvdXRlLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBBcHBSb3V0ZSgpIHtcbiAgICByZXR1cm4gQXBwUm91dGUuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBBcHBSb3V0ZS5wcm90b3R5cGUucm91dGVyID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uKFwicm91dGVyXCIpO1xuICB9O1xuXG4gIEFwcFJvdXRlLnByb3RvdHlwZS5wYXRoID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uKFwicGF0aFwiKTtcbiAgfTtcblxuICBBcHBSb3V0ZS5wcm90b3R5cGUuYWN0aW9uTmFtZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmdldE9wdGlvbihcImFjdGlvbk5hbWVcIik7XG4gIH07XG5cbiAgQXBwUm91dGUucHJvdG90eXBlLmNvbnRyb2xsZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRPcHRpb24oXCJjb250cm9sbGVyXCIpO1xuICB9O1xuXG4gIHJldHVybiBBcHBSb3V0ZTtcblxufSkoTWFyaW9uZXR0aXN0Lk9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IEFwcFJvdXRlO1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi9jb3JlLmpzXCI7XG52YXIgQXBwUm91dGVyLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuQXBwUm91dGVyID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKEFwcFJvdXRlciwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQXBwUm91dGVyKCkge1xuICAgIHJldHVybiBBcHBSb3V0ZXIuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBBcHBSb3V0ZXIucHJvdG90eXBlLm9uUm91dGUgPSBmdW5jdGlvbihuYW1lLCBwYXRoLCBhcmdzKSB7XG4gICAgaWYgKCh0aGlzLmNvbnRyb2xsZXIgIT0gbnVsbCkgJiYgTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbih0aGlzLmNvbnRyb2xsZXIub25Sb3V0ZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXIub25Sb3V0ZSh0aGlzLCBuYW1lLCBwYXRoLCBhcmdzKTtcbiAgICB9XG4gIH07XG5cbiAgQXBwUm91dGVyLnByb3RvdHlwZS5fc2V0Q29udHJvbGxlckZpbHRlcnMgPSBmdW5jdGlvbihjb250cm9sbGVyKSB7XG4gICAgdmFyIGRlZmF1bHRGaWx0ZXJzLCBmaWx0ZXJzO1xuICAgIGlmIChjb250cm9sbGVyICE9IG51bGwpIHtcbiAgICAgIGRlZmF1bHRGaWx0ZXJzID0ge1xuICAgICAgICBiZWZvcmU6IHt9LFxuICAgICAgICBhZnRlcjoge31cbiAgICAgIH07XG4gICAgICBmaWx0ZXJzID0gY29udHJvbGxlci5maWx0ZXJzO1xuICAgICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24oZmlsdGVycykpIHtcbiAgICAgICAgZmlsdGVycyA9IGZpbHRlcnMoKTtcbiAgICAgIH1cbiAgICAgIGlmIChjb250cm9sbGVyLmZpbHRlcnMgPT0gbnVsbCkge1xuICAgICAgICBjb250cm9sbGVyLmZpbHRlcnMgPSB7fTtcbiAgICAgIH1cbiAgICAgIGNvbnRyb2xsZXIuZmlsdGVycyA9IE1hcmlvbmV0dGlzdC5fLmV4dGVuZChkZWZhdWx0RmlsdGVycywgZmlsdGVycyk7XG4gICAgfVxuICAgIHJldHVybiBjb250cm9sbGVyO1xuICB9O1xuXG4gIEFwcFJvdXRlci5wcm90b3R5cGUuX2FkZEFwcFJvdXRlID0gZnVuY3Rpb24oY29udHJvbGxlciwgcm91dGUsIG1ldGhvZE5hbWUpIHtcbiAgICB2YXIgX21ldGhvZCwgbWV0aG9kO1xuICAgIHRoaXMuY29udHJvbGxlciA9IHRoaXMuX3NldENvbnRyb2xsZXJGaWx0ZXJzKGNvbnRyb2xsZXIpO1xuICAgIF9tZXRob2QgPSBjb250cm9sbGVyW21ldGhvZE5hbWVdO1xuICAgIG1ldGhvZCA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgX3RoaXMuY29udHJvbGxlci5yb3V0ZSA9IG5ldyBNYXJpb25ldHRpc3QuQXBwUm91dGUoe1xuICAgICAgICAgIGNvbnRyb2xsZXI6IF90aGlzLmNvbnRyb2xsZXIsXG4gICAgICAgICAgYWN0aW9uTmFtZTogbWV0aG9kTmFtZSxcbiAgICAgICAgICBwYXRoOiByb3V0ZVxuICAgICAgICB9KTtcbiAgICAgICAgcmVzdWx0ID0gX3RoaXMuX2V4ZWN1dGVGaWx0ZXIoX3RoaXMuY29udHJvbGxlci5maWx0ZXJzLmJlZm9yZSwgX3RoaXMuY29udHJvbGxlcik7XG4gICAgICAgIGlmIChyZXN1bHQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgX3RoaXMuY29udHJvbGxlclttZXRob2ROYW1lXS5hcHBseShfdGhpcy5jb250cm9sbGVyLCBfdGhpcy5fZ2V0UGFyYW1zKCkpO1xuICAgICAgICAgIHJldHVybiBfdGhpcy5fZXhlY3V0ZUZpbHRlcihfdGhpcy5jb250cm9sbGVyLmZpbHRlcnMuYWZ0ZXIsIF90aGlzLmNvbnRyb2xsZXIpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKHRoaXMpO1xuICAgIGlmICghbWV0aG9kKSB7XG4gICAgICB0aHJvdyBuZXcgTWFyaW9uZXR0aXN0Lk1hcmlvbmV0dGUuRXJyb3IoJ01ldGhvZCBcIicgKyBtZXRob2ROYW1lICsgJ1wiIHdhcyBub3QgZm91bmQgb24gdGhlIGNvbnRyb2xsZXInKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucm91dGUocm91dGUsIG1ldGhvZE5hbWUsIE1hcmlvbmV0dGlzdC5fLmJpbmQobWV0aG9kLCBjb250cm9sbGVyKSk7XG4gIH07XG5cbiAgQXBwUm91dGVyLnByb3RvdHlwZS5fZXhlY3V0ZUZpbHRlciA9IGZ1bmN0aW9uKGZpbHRlciwgY29udHJvbGxlcikge1xuICAgIHZhciBmaWx0ZXJWYWx1ZSwgaSwgbGVuLCBtZXRob2ROYW1lLCByZWYsIHJlc3VsdCwgc3RvcE1zZztcbiAgICByZXN1bHQgPSB0cnVlO1xuICAgIHJlZiA9IE1hcmlvbmV0dGlzdC5fLmtleXMoZmlsdGVyKTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIG1ldGhvZE5hbWUgPSByZWZbaV07XG4gICAgICBmaWx0ZXJWYWx1ZSA9IGZpbHRlclttZXRob2ROYW1lXTtcbiAgICAgIHN0b3BNc2cgPSBcIkFjdGlvbiBoYWx0ZWQgYnkgZmlsdGVyICdcIiArIG1ldGhvZE5hbWUgKyBcIidcIjtcbiAgICAgIHN3aXRjaCAoZmFsc2UpIHtcbiAgICAgICAgY2FzZSAhTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihmaWx0ZXJWYWx1ZSk6XG4gICAgICAgICAgcmVzdWx0ID0gZmlsdGVyVmFsdWUoY29udHJvbGxlcik7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihzdG9wTXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAhTWFyaW9uZXR0aXN0Ll8uaXNPYmplY3QoZmlsdGVyVmFsdWUpOlxuICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX3Byb2NjZXNzRmlsdGVyT2JqZWN0KG1ldGhvZE5hbWUsIGZpbHRlclZhbHVlLCBjb250cm9sbGVyKTtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKHN0b3BNc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIEFwcFJvdXRlci5wcm90b3R5cGUuX2dldFBhcmFtcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYXJhbXMsIHJvdXRlO1xuICAgIHJvdXRlID0gdGhpcy5fcm91dGVUb1JlZ0V4cCh0aGlzLmNvbnRyb2xsZXIucm91dGUuZ2V0T3B0aW9uKFwicGF0aFwiKSk7XG4gICAgcmV0dXJuIHBhcmFtcyA9IHRoaXMuX2V4dHJhY3RQYXJhbWV0ZXJzKHJvdXRlLCBNYXJpb25ldHRpc3QuQmFja2JvbmUuaGlzdG9yeS5nZXRGcmFnbWVudCgpKTtcbiAgfTtcblxuICBBcHBSb3V0ZXIucHJvdG90eXBlLl9wcm9jY2Vzc0ZpbHRlck9iamVjdCA9IGZ1bmN0aW9uKG1ldGhvZE5hbWUsIGZpbHRlciwgY29udHJvbGxlcikge1xuICAgIHZhciBhY3Rpb25OYW1lLCBjb250cm9sbGVyTWV0aG9kLCBkZWZhdWx0RmlsdGVyT3B0aW9ucywgZmlsdGVyT3B0aW9ucztcbiAgICBkZWZhdWx0RmlsdGVyT3B0aW9ucyA9IHtcbiAgICAgIG1ldGhvZDogbnVsbCxcbiAgICAgIG9ubHk6IFtdLFxuICAgICAgZXhjZXB0OiBbXVxuICAgIH07XG4gICAgZmlsdGVyT3B0aW9ucyA9IE1hcmlvbmV0dGlzdC5fLmV4dGVuZChkZWZhdWx0RmlsdGVyT3B0aW9ucywgZmlsdGVyKTtcbiAgICBjb250cm9sbGVyTWV0aG9kID0gY29udHJvbGxlclttZXRob2ROYW1lXTtcbiAgICBhY3Rpb25OYW1lID0gY29udHJvbGxlci5yb3V0ZS5hY3Rpb25OYW1lKCk7XG4gICAgaWYgKCFNYXJpb25ldHRpc3QuXy5pc0FycmF5KGZpbHRlck9wdGlvbnMub25seSkpIHtcbiAgICAgIHRocm93IFwiZmlsdGVyIG9wdGlvbiBvbmx5LCBtb3N0IGJlIGFuIGFycmF5XCI7XG4gICAgfVxuICAgIGlmICghTWFyaW9uZXR0aXN0Ll8uaXNBcnJheShmaWx0ZXJPcHRpb25zLmV4Y2VwdCkpIHtcbiAgICAgIHRocm93IFwiZmlsdGVyIG9wdGlvbiBleGNlcHQsIG1vc3QgYmUgYW4gYXJyYXlcIjtcbiAgICB9XG4gICAgaWYgKGZpbHRlck9wdGlvbnMub25seS5sZW5ndGggPiAwIHx8IGZpbHRlck9wdGlvbnMuZXhjZXB0Lmxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChNYXJpb25ldHRpc3QuXy5jb250YWlucyhmaWx0ZXJPcHRpb25zLm9ubHksIGFjdGlvbk5hbWUpICYmICFNYXJpb25ldHRpc3QuXy5jb250YWlucyhmaWx0ZXJPcHRpb25zLmV4Y2VwdCwgYWN0aW9uTmFtZSkpIHtcbiAgICAgICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24oY29udHJvbGxlck1ldGhvZCkpIHtcbiAgICAgICAgICByZXR1cm4gY29udHJvbGxlck1ldGhvZC5hcHBseSh0aGlzLmNvbnRyb2xsZXIsIHRoaXMuX2dldFBhcmFtcygpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihjb250cm9sbGVyTWV0aG9kKSkge1xuICAgICAgICByZXR1cm4gY29udHJvbGxlck1ldGhvZC5hcHBseSh0aGlzLmNvbnRyb2xsZXIsIHRoaXMuX2dldFBhcmFtcygpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIEFwcFJvdXRlcjtcblxufSkoTWFyaW9uZXR0aXN0LkFwcFJvdXRlcik7XG5cbmV4cG9ydCBkZWZhdWx0IEFwcFJvdXRlcjtcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4vY29yZS5qc1wiO1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSBcImJhY2tib25lLm1hcmlvbmV0dGVcIjtcbnZhciBSZWdpb24sIF9zaG93LFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuX3Nob3cgPSBNYXJpb25ldHRlLlJlZ2lvbi5wcm90b3R5cGUuc2hvdztcblxuUmVnaW9uID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKFJlZ2lvbiwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gUmVnaW9uKCkge1xuICAgIHJldHVybiBSZWdpb24uX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBSZWdpb24ucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbih2aWV3LCBvcHRpb25zKSB7XG4gICAgdmFyIGFyZ3MsIG9sZFZpZXcsIHByZXZlbnREZXN0cm95LCBzaG93Q3VycmVudFZpZXcsIHRyYW5zaXRpb25PdXQsIHZhbHVlO1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHByZXZlbnREZXN0cm95ID0gb3B0aW9ucy5wcmV2ZW50RGVzdHJveSA9PT0gdHJ1ZTtcbiAgICB0cmFuc2l0aW9uT3V0ID0gb3B0aW9ucy50cmFuc2l0aW9uT3V0O1xuICAgIGRlbGV0ZSBvcHRpb25zLnRyYW5zaXRpb25PdXQ7XG4gICAgYXJncyA9IFt2aWV3LCBvcHRpb25zXTtcbiAgICBpZiAodHJhbnNpdGlvbk91dCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBfc2hvdy5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2xkVmlldyA9IHRoaXMuY3VycmVudFZpZXc7XG4gICAgICBzaG93Q3VycmVudFZpZXcgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfc2hvdy5hcHBseShfdGhpcywgYXJncyk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKTtcbiAgICAgIGlmICgob2xkVmlldyAhPSBudWxsKSAmJiBNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKG9sZFZpZXcudHJhbnNpdGlvbk91dCkpIHtcbiAgICAgICAgb2xkVmlldy50cmlnZ2VyTWV0aG9kKFwiYmVmb3JlOnRyYW5zaXRpb246b3V0XCIpO1xuICAgICAgICB2YWx1ZSA9IG9sZFZpZXcudHJhbnNpdGlvbk91dCgpO1xuICAgICAgICBpZiAoKHZhbHVlICE9IG51bGwgPyB2YWx1ZS50aGVuIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlLnRoZW4oKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzaG93Q3VycmVudFZpZXcoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSkodGhpcykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IFwidHJhbnNpdGlvbk91dCBtZXRob2QgbW9zdCByZXR1cm4gYSBwcm9taXNlXCI7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzaG93Q3VycmVudFZpZXcoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFJlZ2lvbjtcblxufSkoTWFyaW9uZXR0ZS5SZWdpb24pO1xuXG5leHBvcnQgZGVmYXVsdCBSZWdpb247XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbnZhciBWaWV3cyxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHksXG4gIHNsaWNlID0gW10uc2xpY2U7XG5cblZpZXdzID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKFZpZXdzLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBWaWV3cygpIHtcbiAgICByZXR1cm4gVmlld3MuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBWaWV3cy5wcm90b3R5cGUudGVtcGxhdGVIZWxwZXJzID0ge1xuICAgIHBhdGhGb3I6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MsIHJlZjtcbiAgICAgIGFyZ3MgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgIHJldHVybiAocmVmID0gTWFyaW9uZXR0aXN0LnV0aWxzKS5wYXRoRm9yLmFwcGx5KHJlZiwgYXJncyk7XG4gICAgfSxcbiAgICBfOiBNYXJpb25ldHRpc3QuXyxcbiAgICBzOiBNYXJpb25ldHRpc3QucyxcbiAgICB0OiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzLCByZWY7XG4gICAgICBhcmdzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgICByZXR1cm4gKHJlZiA9IE1hcmlvbmV0dGlzdC5JMThuKS50LmFwcGx5KHJlZiwgYXJncyk7XG4gICAgfSxcbiAgICBNbnQ6IE1hcmlvbmV0dGlzdCxcbiAgICBmb3JtYXRDdXJyZW5jeTogZnVuY3Rpb24oYW1vdW50LCBmb3JtYXQpIHtcbiAgICAgIGlmIChmb3JtYXQgPT0gbnVsbCkge1xuICAgICAgICBmb3JtYXQgPSBcIiQwLDAuMDBcIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNYXJpb25ldHRpc3QubnVtZXJhbChhbW91bnQpLmZvcm1hdChmb3JtYXQpO1xuICAgIH0sXG4gICAgZm9ybWF0TnVtYmVyOiBmdW5jdGlvbihhbW91bnQsIGZvcm1hdCkge1xuICAgICAgaWYgKGZvcm1hdCA9PSBudWxsKSB7XG4gICAgICAgIGZvcm1hdCA9IFwiMCwwLjAwXCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWFyaW9uZXR0aXN0Lm51bWVyYWwoYW1vdW50KS5mb3JtYXQoZm9ybWF0KTtcbiAgICB9LFxuICAgIGZvcm1hdFBlcmNlbnRhZ2U6IGZ1bmN0aW9uKGFtb3VudCwgZm9ybWF0KSB7XG4gICAgICBpZiAoZm9ybWF0ID09IG51bGwpIHtcbiAgICAgICAgZm9ybWF0ID0gXCIwLjAwJVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5udW1lcmFsKGFtb3VudCkuZm9ybWF0KGZvcm1hdCk7XG4gICAgfSxcbiAgICBmb3JtYXREYXRlOiBmdW5jdGlvbihkYXRlLCBmb3JtYXQpIHtcbiAgICAgIGlmIChmb3JtYXQgPT0gbnVsbCkge1xuICAgICAgICBmb3JtYXQgPSBcIkRELU1NLVlZWVlcIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNYXJpb25ldHRpc3QubW9tZW50KGRhdGUpLmZvcm1hdChmb3JtYXQpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gVmlld3M7XG5cbn0pKE1hcmlvbmV0dGlzdC5PYmplY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBWaWV3cztcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4uL2NvcmUuanNcIjtcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gXCJiYWNrYm9uZS5tYXJpb25ldHRlXCI7XG52YXIgQmFzZVZpZXcsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5CYXNlVmlldyA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChCYXNlVmlldywgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQmFzZVZpZXcoKSB7XG4gICAgcmV0dXJuIEJhc2VWaWV3Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIEJhc2VWaWV3O1xuXG59KShNYXJpb25ldHRlLlZpZXcpO1xuXG5leHBvcnQgZGVmYXVsdCBCYXNlVmlldztcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4uL2NvcmUuanNcIjtcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gXCJiYWNrYm9uZS5tYXJpb25ldHRlXCI7XG52YXIgQ29sbGVjdGlvblZpZXcsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5Db2xsZWN0aW9uVmlldyA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChDb2xsZWN0aW9uVmlldywgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQ29sbGVjdGlvblZpZXcoKSB7XG4gICAgcmV0dXJuIENvbGxlY3Rpb25WaWV3Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIENvbGxlY3Rpb25WaWV3O1xuXG59KShNYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3KTtcblxuZXhwb3J0IGRlZmF1bHQgQ29sbGVjdGlvblZpZXc7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuLi8uLi9jb3JlLmpzXCI7XG5pbXBvcnQgQmFja2JvbmUgZnJvbSBcImJhY2tib25lXCI7XG52YXIgQmFzZSxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkJhc2UgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoQmFzZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQmFzZSgpIHtcbiAgICByZXR1cm4gQmFzZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHJldHVybiBCYXNlO1xuXG59KShCYWNrYm9uZS5Nb2RlbCk7XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2U7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuLi8uLi9jb3JlLmpzXCI7XG5pbXBvcnQgQmFja2JvbmUgZnJvbSBcImJhY2tib25lXCI7XG52YXIgQmFzZSxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkJhc2UgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoQmFzZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQmFzZSgpIHtcbiAgICByZXR1cm4gQmFzZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHJldHVybiBCYXNlO1xuXG59KShCYWNrYm9uZS5Db2xsZWN0aW9uKTtcblxuZXhwb3J0IGRlZmF1bHQgQmFzZTtcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4uLy4uL2NvcmUuanNcIjtcbmltcG9ydCBNb2RlbEJhc2UgZnJvbSBcIi4uLy4uL2VudGl0aWVzL21vZGVscy9iYXNlLmpzXCI7XG5pbXBvcnQgQmFzZVZpZXcgZnJvbSBcIi4uLy4uL3ZpZXdzL2Jhc2UuanNcIjtcbnZhciBCYXNlLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eSxcbiAgc2xpY2UgPSBbXS5zbGljZTtcblxuQmFzZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChCYXNlLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBCYXNlKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIEJhc2UuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5faW5zdGFuY2VfaWQgPSBNYXJpb25ldHRpc3QuXy51bmlxdWVJZChcInJlc3BvbmRlclwiKTtcbiAgICB0aGlzLnJlZ2lzdGVyKHRoaXMsIHRoaXMuX2luc3RhbmNlX2lkKTtcbiAgfVxuXG4gIEJhc2UucHJvdG90eXBlLmxvYWRlclZpZXcgPSBCYXNlVmlldy5leHRlbmQoe1xuICAgIHRlbXBsYXRlOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4gTWFyaW9uZXR0aXN0LmNvbmZpZy50ZW1wbGF0ZXMucmVuZGVyKFwibWFyaW9uZXR0aXN0L2xvYWRlclwiLCBkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRUZW1wbGF0ZTogJzxkaXYgY2xhc3M9XFwnbXJpLWxvYWRlclxcJz5cXG4gIDxkaXYgY2xhc3M9XFwnbXJpLWxvYWRlcl9fY29udGVudFxcJz5cXG4gICAgPGkgY2xhc3M9XCJmYSBmYS1zcGlubmVyIGZhLXNwaW4gZmEtMnggZmEtZndcIj48L2k+XFxuICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiPkxvYWRpbmcuLi48L3NwYW4+XFxuICA8L2Rpdj5cXG48L2Rpdj4nXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIEJhc2UucHJvdG90eXBlLmdldExvYWRlclZpZXcgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5nZXQoXCJsb2FkZXJWaWV3XCIpID09IG51bGwpIHtcbiAgICAgIHRoaXMuc2V0KHtcbiAgICAgICAgbG9hZGVyVmlldzogbmV3IHRoaXMubG9hZGVyVmlld1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldChcImxvYWRlclZpZXdcIik7XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncztcbiAgICBhcmdzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgQmFzZS5fX3N1cGVyX18uY2xvc2UuY2FsbCh0aGlzLCBhcmdzKTtcbiAgICByZXR1cm4gdGhpcy51bnJlZ2lzdGVyKHRoaXMsIHRoaXMuX2luc3RhbmNlX2lkKTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24odmlldywgb3B0aW9ucykge1xuICAgIHZhciBmZXRjaE9wdGlvbnMsIGxvYWRlclZpZXcsIHJlZ2lvbjtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIGZldGNoT3B0aW9ucyA9IHt9O1xuICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc09iamVjdChvcHRpb25zKSAmJiBNYXJpb25ldHRpc3QuXy5pc09iamVjdChvcHRpb25zLmZldGNoKSkge1xuICAgICAgZmV0Y2hPcHRpb25zID0gb3B0aW9ucy5mZXRjaDtcbiAgICB9XG4gICAgcmVnaW9uID0gb3B0aW9ucy5yZWdpb24gIT0gbnVsbCA/IG9wdGlvbnMucmVnaW9uIDogdGhpcy5nZXQoXCJyZWdpb25cIik7XG4gICAgdGhpcy5saXN0ZW5Ubyh2aWV3LCBcImNsb3NlXCIsIHRoaXMuY2xvc2UpO1xuICAgIGlmIChvcHRpb25zLmFzeW5jICE9IG51bGwpIHtcbiAgICAgIGlmIChvcHRpb25zLmxvYWRlclZpZXcgIT09IGZhbHNlKSB7XG4gICAgICAgIGxvYWRlclZpZXcgPSB0aGlzLmdldExvYWRlclZpZXcoKTtcbiAgICAgICAgdGhpcy5saXN0ZW5Ubyhsb2FkZXJWaWV3LCBcImNsb3NlXCIsIHRoaXMuY2xvc2UpO1xuICAgICAgICByZWdpb24uc2hvdyhsb2FkZXJWaWV3KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmZldGNoKGZldGNoT3B0aW9ucykudGhlbigoKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAob3B0aW9ucy5sb2FkZXJWaWV3ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKHJlZ2lvbi5jdXJyZW50VmlldyAhPT0gbG9hZGVyVmlldykge1xuICAgICAgICAgICAgICByZXR1cm4gdmlldy5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVnaW9uLnNob3codmlldyk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSksIGZ1bmN0aW9uKCkge30pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVnaW9uLnNob3codmlldyk7XG4gICAgfVxuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLmRlZmF1bHRzID0ge1xuICAgIHBhcmFtczoge30sXG4gICAgYXN5bmM6IFtdXG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUud2FpdEZvciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzLCByZWY7XG4gICAgYXJncyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgIHJldHVybiAocmVmID0gTWFyaW9uZXR0aXN0LnV0aWxzKS53YWl0Rm9yLmFwcGx5KHJlZiwgYXJncyk7XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUuZGVmZXJyZWQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0LiQuRGVmZXJyZWQoKTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5mZXRjaCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICB2YXIgYXN5bmNGZXRjaGVzLCBkZWZlcnJlZDtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIGRlZmVycmVkID0gdGhpcy5kZWZlcnJlZCgpO1xuICAgIGFzeW5jRmV0Y2hlcyA9IE1hcmlvbmV0dGlzdC5fLmNoYWluKFt0aGlzLmdldChcImFzeW5jXCIpXSkuZmxhdHRlbigpLmNvbXBhY3QoKS52YWx1ZSgpO1xuICAgIHRoaXMud2FpdEZvcihhc3luY0ZldGNoZXMsIHtcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihvcHRpb25zLnN1Y2Nlc3MpKSB7XG4gICAgICAgICAgb3B0aW9ucy5zdWNjZXNzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgIH0sXG4gICAgICBlcnJvcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKG9wdGlvbnMuZXJyb3IpKSB7XG4gICAgICAgICAgb3B0aW9ucy5lcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5yZWplY3QoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5kZWZlcnJlZCgpLnByb21pc2UoKTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVmZXJyZWQoKS5wcm9taXNlKCk7XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbihpbnN0YW5jZSwgaWQpIHtcbiAgICBpZiAodGhpcy5fcmVnaXN0cnkgPT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVnaXN0cnkgPSB7fTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3JlZ2lzdHJ5W2lkXSA9IGluc3RhbmNlO1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLnVucmVnaXN0ZXIgPSBmdW5jdGlvbihpbnN0YW5jZSwgaWQpIHtcbiAgICByZXR1cm4gZGVsZXRlIHRoaXMuX3JlZ2lzdHJ5W2lkXTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5yZXNldFJlZ2lzdHJ5ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGtleSwgbXNnLCBvbGRDb3VudCwgcmVmLCByZXNwb25kZXI7XG4gICAgb2xkQ291bnQgPSB0aGlzLmdldFJlZ2lzdHJ5U2l6ZSgpO1xuICAgIHJlZiA9IHRoaXMuX3JlZ2lzdHJ5O1xuICAgIGZvciAoa2V5IGluIHJlZikge1xuICAgICAgcmVzcG9uZGVyID0gcmVmW2tleV07XG4gICAgICByZXNwb25kZXIucmVnaW9uLmNsb3NlKCk7XG4gICAgfVxuICAgIG1zZyA9IFwiVGhlcmUgd2VyZSBcIiArIG9sZENvdW50ICsgXCIgcmVzcG9uZGVycyBpbiB0aGUgcmVnaXN0cnksIHRoZXJlIGFyZSBub3cgXCIgKyAodGhpcy5nZXRSZWdpc3RyeVNpemUoKSk7XG4gICAgaWYgKHRoaXMuZ2V0UmVnaXN0cnlTaXplKCkgPiAwKSB7XG4gICAgICByZXR1cm4gY29uc29sZS53YXJuKG1zZywgdGhpcy5fcmVnaXN0cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY29uc29sZS5sb2cobXNnKTtcbiAgICB9XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUuZ2V0UmVnaXN0cnlTaXplID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5fLnNpemUodGhpcy5fcmVnaXN0cnkpO1xuICB9O1xuXG4gIHJldHVybiBCYXNlO1xuXG59KShNb2RlbEJhc2UpO1xuXG5leHBvcnQgZGVmYXVsdCBCYXNlO1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi4vLi4vY29yZS5qc1wiO1xuaW1wb3J0IEJhY2tib25lIGZyb20gXCJiYWNrYm9uZVwiO1xuaW1wb3J0IEJhc2VNb2RlbCBmcm9tIFwiLi4vLi4vZW50aXRpZXMvbW9kZWxzL2Jhc2UuanNcIjtcbmltcG9ydCBCYXNlQ29sbGVjdGlvbiBmcm9tIFwiLi4vLi4vZW50aXRpZXMvY29sbGVjdGlvbnMvYmFzZS5qc1wiO1xuaW1wb3J0IEJhc2VSZXNwb25kZXIgZnJvbSBcIi4uLy4uL2VudGl0aWVzL3Jlc3BvbmRlcnMvYmFzZS5qc1wiO1xudmFyIEJhc2UsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5CYXNlID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKEJhc2UsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIEJhc2UoKSB7XG4gICAgcmV0dXJuIEJhc2UuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBCYXNlLnByb3RvdHlwZS5yZXNwb25kZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJhc2U6IEJhc2VSZXNwb25kZXJcbiAgICB9O1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLm1vZGVscyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBiYXNlOiBCYXNlTW9kZWxcbiAgICB9O1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLmNvbGxlY3Rpb25zID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJhc2U6IEJhc2VDb2xsZWN0aW9uXG4gICAgfTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS52aWV3cyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7fTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5nZXRSZXNwb25kZXIgPSBmdW5jdGlvbihyZXNwb25kZXJOYW1lLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZXRSZXNvdXJjZShcInJlc3BvbmRlcnNcIiwgcmVzcG9uZGVyTmFtZSwgb3B0aW9ucyk7XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUuZ2V0VmlldyA9IGZ1bmN0aW9uKHZpZXdOYW1lLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZXRSZXNvdXJjZShcInZpZXdzXCIsIHZpZXdOYW1lLCBvcHRpb25zKTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5nZXRNb2RlbCA9IGZ1bmN0aW9uKG1vZGVsTmFtZSwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2V0UmVzb3VyY2UoXCJtb2RlbHNcIiwgbW9kZWxOYW1lLCBvcHRpb25zKTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5nZXRDb2xsZWN0aW9uID0gZnVuY3Rpb24oY29sbGVjdGlvbk5hbWUsIG1vZGVscywgb3B0aW9ucykge1xuICAgIGlmIChtb2RlbHMgPT0gbnVsbCkge1xuICAgICAgbW9kZWxzID0gW107XG4gICAgfVxuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2V0UmVzb3VyY2UoXCJjb2xsZWN0aW9uc1wiLCBjb2xsZWN0aW9uTmFtZSwgb3B0aW9ucywgbW9kZWxzKTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5nZXRSZXNvdXJjZSA9IGZ1bmN0aW9uKHJlc291cmNlc05hbWUsIHJlc291cmNlTmFtZSwgb3B0aW9ucywgbW9kZWxzKSB7XG4gICAgdmFyIHJlc291cmNlLCByZXNvdXJjZXM7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICByZXNvdXJjZSA9IG51bGw7XG4gICAgcmVzb3VyY2VzID0gdGhpc1tyZXNvdXJjZXNOYW1lXTtcbiAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihyZXNvdXJjZXMpKSB7XG4gICAgICByZXNvdXJjZXMgPSByZXNvdXJjZXMoKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMudmlld01vZGVsID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMudmlld01vZGVsID0gdGhpcztcbiAgICB9XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzT2JqZWN0KHJlc291cmNlcykgJiYgKHJlc291cmNlc1tyZXNvdXJjZU5hbWVdICE9IG51bGwpKSB7XG4gICAgICBpZiAobW9kZWxzICE9IG51bGwpIHtcbiAgICAgICAgcmVzb3VyY2UgPSBuZXcgcmVzb3VyY2VzW3Jlc291cmNlTmFtZV0obW9kZWxzLCBvcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc291cmNlID0gbmV3IHJlc291cmNlc1tyZXNvdXJjZU5hbWVdKG9wdGlvbnMpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzb3VyY2U7XG4gIH07XG5cbiAgcmV0dXJuIEJhc2U7XG5cbn0pKEJhY2tib25lLk1vZGVsKTtcblxuZXhwb3J0IGRlZmF1bHQgQmFzZTtcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4uL2NvcmUuanNcIjtcbnZhciBCYXNlLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuQmFzZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChCYXNlLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBCYXNlKCkge1xuICAgIHJldHVybiBCYXNlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgQmFzZS5wcm90b3R5cGUubmF2aWdhdGVUbyA9IGZ1bmN0aW9uKHJvdXRlLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0LmxvY2F0aW9uLm5hdmlnYXRlVG8ocm91dGUsIG9wdGlvbnMpO1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLmdldEN1cnJlbnRSb3V0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBNYXJpb25ldHRpc3QubG9jYXRpb24uZ2V0Q3VycmVudFJvdXRlKCk7XG4gIH07XG5cbiAgcmV0dXJuIEJhc2U7XG5cbn0pKE1hcmlvbmV0dGlzdC5PYmplY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBCYXNlO1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi9jb3JlLmpzXCI7XG52YXIgQXBwbGljYXRpb24sXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5BcHBsaWNhdGlvbiA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChBcHBsaWNhdGlvbiwgc3VwZXJDbGFzcyk7XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLkNvbnRyb2xsZXJzID0gbmV3IE1hcmlvbmV0dGlzdC5PYmplY3QoKTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuRW50aXRpZXMgPSBuZXcgTWFyaW9uZXR0aXN0Lk9iamVjdCgpO1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5WaWV3cyA9IG5ldyBNYXJpb25ldHRpc3QuT2JqZWN0KCk7XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLl9pc1J1bm5pbmcgPSBmYWxzZTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuX2lzRGVzdHJveWVkID0gZmFsc2U7XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLnByZXZlbnREZXN0cm95ID0gZmFsc2U7XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLnN0YXJ0QWZ0ZXJJbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5zdGFydFdpdGhQYXJlbnQgPSBmYWxzZTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuc3RvcFdpdGhQYXJlbnQgPSB0cnVlO1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5yZXNvdXJjZXMgPSBbXTtcblxuICBmdW5jdGlvbiBBcHBsaWNhdGlvbihvcHRpb25zKSB7XG4gICAgQXBwbGljYXRpb24uX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5faW5pdENoaWxkQXBwcyhvcHRpb25zKTtcbiAgICBpZiAoTWFyaW9uZXR0aXN0Ll8ucmVzdWx0KHRoaXMsICdzdGFydEFmdGVySW5pdGlhbGl6ZWQnKSkge1xuICAgICAgdGhpcy5zdGFydChvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuc3RhcnRIaXN0b3J5ID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgaWYgKCFNYXJpb25ldHRpc3QuQmFja2JvbmUuSGlzdG9yeS5zdGFydGVkKSB7XG4gICAgICByZXR1cm4gTWFyaW9uZXR0aXN0LmxvY2F0aW9uLnN0YXJ0SGlzdG9yeShvcHRpb25zKTtcbiAgICB9XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHRoaXMudHJpZ2dlck1ldGhvZChcImJlZm9yZTpyZXNvdXJjZXM6ZmV0Y2hcIiwgb3B0aW9ucyk7XG4gICAgaWYgKHRoaXMucmVzb3VyY2VzID09IG51bGwpIHtcbiAgICAgIHRoaXMucmVzb3VyY2VzID0gW107XG4gICAgfVxuICAgIHJldHVybiBNYXJpb25ldHRpc3QudXRpbHMud2FpdEZvcih0aGlzLnJlc291cmNlcywge1xuICAgICAgc3VjY2VzczogKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBBcHBsaWNhdGlvbi5fX3N1cGVyX18uc3RhcnQuY2FsbChfdGhpcywgb3B0aW9ucyk7XG4gICAgICAgICAgX3RoaXMudHJpZ2dlck1ldGhvZChcInJlc291cmNlczpmZXRjaDpzdWNjZXNzXCIpO1xuICAgICAgICAgIHJldHVybiBfdGhpcy50cmlnZ2VyTWV0aG9kKFwicmVhZHlcIik7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSxcbiAgICAgIGVycm9yOiAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfdGhpcy50cmlnZ2VyTWV0aG9kKFwicmVzb3VyY2VzOmZldGNoOmVycm9yXCIpO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcylcbiAgICB9KTtcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuaXNSdW5uaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzUnVubmluZztcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBpZiAoIXRoaXMuX2lzUnVubmluZykge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHRoaXMudHJpZ2dlck1ldGhvZCgnYmVmb3JlOnN0b3AnLCBvcHRpb25zKTtcbiAgICB0aGlzLl9pc1J1bm5pbmcgPSBmYWxzZTtcbiAgICB0aGlzLnRyaWdnZXJNZXRob2QoJ3N0b3AnLCBvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuX2luaXRDaGlsZEFwcHMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2hpbGRBcHBzLCBvcHRpb25zO1xuICAgIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB2b2lkIDAgPyB7fSA6IGFyZ3VtZW50c1swXTtcbiAgICB0aGlzLl9jaGlsZEFwcHMgPSB7fTtcbiAgICB0aGlzLm1lcmdlT3B0aW9ucyhvcHRpb25zLCBbJ2NoaWxkQXBwcycsICdjaGlsZEFwcE9wdGlvbnMnXSk7XG4gICAgY2hpbGRBcHBzID0gdGhpcy5jaGlsZEFwcHM7XG4gICAgaWYgKGNoaWxkQXBwcykge1xuICAgICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24oY2hpbGRBcHBzKSkge1xuICAgICAgICBjaGlsZEFwcHMgPSBjaGlsZEFwcHMuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYWRkQ2hpbGRBcHBzKGNoaWxkQXBwcyk7XG4gICAgfVxuICAgIHRoaXMuX2luaXRMaXN0ZW5lcnMoKTtcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuX2luaXRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLm9uKHtcbiAgICAgICdzdGFydCc6IHRoaXMuX3N0YXJ0Q2hpbGRBcHBzLFxuICAgICAgJ2JlZm9yZTpzdG9wJzogdGhpcy5fc3RvcENoaWxkQXBwcyxcbiAgICAgICdiZWZvcmU6ZGVzdHJveSc6IHRoaXMuX2Rlc3Ryb3lDaGlsZEFwcHNcbiAgICB9KTtcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuX3N0YXJ0Q2hpbGRBcHBzID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHJldHVybiBNYXJpb25ldHRpc3QuXy5lYWNoKHRoaXMuX2NoaWxkQXBwcywgZnVuY3Rpb24oY2hpbGRBcHApIHtcbiAgICAgIGlmIChNYXJpb25ldHRpc3QudXRpbHMuZ2V0VmFsdWUoY2hpbGRBcHAuZ2V0T3B0aW9uKFwic3RhcnRXaXRoUGFyZW50XCIpKSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gY2hpbGRBcHAuc3RhcnQob3B0aW9ucyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLl9zdG9wQ2hpbGRBcHBzID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHJldHVybiBNYXJpb25ldHRpc3QuXy5lYWNoKHRoaXMuX2NoaWxkQXBwcywgZnVuY3Rpb24oY2hpbGRBcHApIHtcbiAgICAgIGlmIChNYXJpb25ldHRpc3QuXy5yZXN1bHQoY2hpbGRBcHAsICdzdG9wV2l0aFBhcmVudCcpKSB7XG4gICAgICAgIHJldHVybiBjaGlsZEFwcC5zdG9wKG9wdGlvbnMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5fZGVzdHJveUNoaWxkQXBwcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0Ll8uZWFjaCh0aGlzLl9jaGlsZEFwcHMsIGZ1bmN0aW9uKGNoaWxkQXBwKSB7XG4gICAgICBpZiAoIU1hcmlvbmV0dGlzdC5fLnJlc3VsdChjaGlsZEFwcCwgJ3ByZXZlbnREZXN0cm95JykpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkQXBwLmRlc3Ryb3kob3B0aW9ucyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLl9idWlsZEFwcEZyb21PYmplY3QgPSBmdW5jdGlvbihhcHBDb25maWcpIHtcbiAgICB2YXIgQXBwQ2xhc3MsIG9wdGlvbnM7XG4gICAgQXBwQ2xhc3MgPSBhcHBDb25maWcuQXBwQ2xhc3M7XG4gICAgb3B0aW9ucyA9IE1hcmlvbmV0dGlzdC5fLm9taXQoYXBwQ29uZmlnLCAnQXBwQ2xhc3MnKTtcbiAgICByZXR1cm4gdGhpcy5idWlsZEFwcChBcHBDbGFzcywgb3B0aW9ucyk7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLl9idWlsZEFwcCA9IGZ1bmN0aW9uKEFwcENsYXNzLCBvcHRpb25zKSB7XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24oQXBwQ2xhc3MpKSB7XG4gICAgICByZXR1cm4gdGhpcy5idWlsZEFwcChBcHBDbGFzcywgb3B0aW9ucyk7XG4gICAgfVxuICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc09iamVjdChBcHBDbGFzcykpIHtcbiAgICAgIHJldHVybiB0aGlzLl9idWlsZEFwcEZyb21PYmplY3QoQXBwQ2xhc3MpO1xuICAgIH1cbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuYnVpbGRBcHAgPSBmdW5jdGlvbihBcHBDbGFzcywgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBNYXJpb25ldHRpc3QuXy5leHRlbmQoe30sIHRoaXMuY2hpbGRBcHBPcHRpb25zLCBvcHRpb25zKTtcbiAgICByZXR1cm4gbmV3IEFwcENsYXNzKG9wdGlvbnMpO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5fZW5zdXJlQXBwSXNVbmlxdWUgPSBmdW5jdGlvbihhcHBOYW1lKSB7XG4gICAgaWYgKHRoaXMuX2NoaWxkQXBwc1thcHBOYW1lXSkge1xuICAgICAgdGhyb3cgbmV3IE1hcmlvbmV0dGUuRXJyb3Ioe1xuICAgICAgICBuYW1lOiAnRHVwbGljYXRlQ2hpbGRBcHBFcnJvcicsXG4gICAgICAgIG1lc3NhZ2U6ICdBIGNoaWxkIEFwcCB3aXRoIG5hbWUgXCInICsgYXBwTmFtZSArICdcIiBoYXMgYWxyZWFkeSBiZWVuIGFkZGVkLidcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuYWRkQ2hpbGRBcHBzID0gZnVuY3Rpb24oY2hpbGRBcHBzKSB7XG4gICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5fLmVhY2goY2hpbGRBcHBzLCAoZnVuY3Rpb24oY2hpbGRBcHAsIGFwcE5hbWUpIHtcbiAgICAgIHRoaXMuYWRkQ2hpbGRBcHAoYXBwTmFtZSwgY2hpbGRBcHApO1xuICAgIH0pLCB0aGlzKTtcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuYWRkQ2hpbGRBcHAgPSBmdW5jdGlvbihhcHBOYW1lLCBBcHBDbGFzcywgb3B0aW9ucykge1xuICAgIHZhciBjaGlsZEFwcDtcbiAgICB0aGlzLl9lbnN1cmVBcHBJc1VuaXF1ZShhcHBOYW1lKTtcbiAgICBjaGlsZEFwcCA9IHRoaXMuX2J1aWxkQXBwKEFwcENsYXNzLCBvcHRpb25zKTtcbiAgICBpZiAoIWNoaWxkQXBwKSB7XG4gICAgICB0aHJvdyBuZXcgTWFyaW9uZXR0ZS5FcnJvcih7XG4gICAgICAgIG5hbWU6ICdBZGRDaGlsZEFwcEVycm9yJyxcbiAgICAgICAgbWVzc2FnZTogJ0FwcCBidWlsZCBmYWlsZWQuICBJbmNvcnJlY3QgY29uZmlndXJhdGlvbi4nXG4gICAgICB9KTtcbiAgICB9XG4gICAgY2hpbGRBcHAuX25hbWUgPSBhcHBOYW1lO1xuICAgIHRoaXMuX2NoaWxkQXBwc1thcHBOYW1lXSA9IGNoaWxkQXBwO1xuICAgIGNoaWxkQXBwLm9uKCdkZXN0cm95JywgTWFyaW9uZXR0aXN0Ll8ucGFydGlhbCh0aGlzLl9yZW1vdmVDaGlsZEFwcCwgYXBwTmFtZSksIHRoaXMpO1xuICAgIGlmICh0aGlzLmlzUnVubmluZygpICYmIE1hcmlvbmV0dGlzdC5fLnJlc3VsdChjaGlsZEFwcCwgJ3N0YXJ0V2l0aFBhcmVudCcpKSB7XG4gICAgICBjaGlsZEFwcC5zdGFydCgpO1xuICAgIH1cbiAgICByZXR1cm4gY2hpbGRBcHA7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLmdldE5hbWUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuZ2V0Q2hpbGRBcHBzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5fLmNsb25lKHRoaXMuX2NoaWxkQXBwcyk7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLmdldENoaWxkQXBwID0gZnVuY3Rpb24oYXBwTmFtZSkge1xuICAgIHJldHVybiB0aGlzLl9jaGlsZEFwcHNbYXBwTmFtZV07XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLl9yZW1vdmVDaGlsZEFwcCA9IGZ1bmN0aW9uKGFwcE5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5fY2hpbGRBcHBzW2FwcE5hbWVdLl9uYW1lO1xuICAgIGRlbGV0ZSB0aGlzLl9jaGlsZEFwcHNbYXBwTmFtZV07XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLnJlbW92ZUNoaWxkQXBwcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjaGlsZEFwcHM7XG4gICAgY2hpbGRBcHBzID0gdGhpcy5nZXRDaGlsZEFwcHMoKTtcbiAgICBNYXJpb25ldHRpc3QuXy5lYWNoKHRoaXMuX2NoaWxkQXBwcywgKGZ1bmN0aW9uKGNoaWxkQXBwLCBhcHBOYW1lKSB7XG4gICAgICB0aGlzLnJlbW92ZUNoaWxkQXBwKGFwcE5hbWUpO1xuICAgIH0pLCB0aGlzKTtcbiAgICByZXR1cm4gY2hpbGRBcHBzO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5yZW1vdmVDaGlsZEFwcCA9IGZ1bmN0aW9uKGFwcE5hbWUsIG9wdGlvbnMpIHtcbiAgICB2YXIgY2hpbGRBcHA7XG4gICAgb3B0aW9ucyA9IE1hcmlvbmV0dGlzdC5fLmV4dGVuZCh7fSwgb3B0aW9ucyk7XG4gICAgY2hpbGRBcHAgPSB0aGlzLmdldENoaWxkQXBwKGFwcE5hbWUpO1xuICAgIGlmICghY2hpbGRBcHApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMucHJldmVudERlc3Ryb3kgfHwgTWFyaW9uZXR0aXN0Ll8ucmVzdWx0KGNoaWxkQXBwLCAncHJldmVudERlc3Ryb3knKSkge1xuICAgICAgdGhpcy5fcmVtb3ZlQ2hpbGRBcHAoYXBwTmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoaWxkQXBwLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgcmV0dXJuIGNoaWxkQXBwO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7fTtcblxuICByZXR1cm4gQXBwbGljYXRpb247XG5cbn0pKE1hcmlvbmV0dGlzdC5BcHBsaWNhdGlvbik7XG5cbmV4cG9ydCBkZWZhdWx0IEFwcGxpY2F0aW9uO1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi9jb3JlLmpzXCI7XG52YXIgTW9kdWxlO1xuXG5Nb2R1bGUgPSBNYXJpb25ldHRpc3QuT2JqZWN0LmV4dGVuZChNYXJpb25ldHRpc3QuQmFja2JvbmUuUmFkaW8uUmVxdWVzdHMpO1xuXG5leHBvcnQgZGVmYXVsdCBNb2R1bGU7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbmltcG9ydCBFbnYgZnJvbSBcIi4vZW52LmpzXCI7XG5pbXBvcnQgQ2hhbm5lbHMgZnJvbSBcIi4vY2hhbm5lbHMuanNcIjtcbmltcG9ydCBMb2NhdGlvbiBmcm9tIFwiLi9sb2NhdGlvbi5qc1wiO1xuaW1wb3J0IENvbmZpZyBmcm9tIFwiLi9jb25maWcuanNcIjtcbmltcG9ydCBSZW5kZXJlciBmcm9tIFwiLi9taXhpbnMvcmVuZGVyZXIuanNcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlscy5qc1wiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi9sb2dnZXIuanNcIjtcbmltcG9ydCBBcHBSb3V0ZSBmcm9tIFwiLi9yb3V0ZS5qc1wiO1xuaW1wb3J0IEFwcFJvdXRlciBmcm9tIFwiLi9yb3V0ZXIuanNcIjtcbmltcG9ydCBSZWdpb24gZnJvbSBcIi4vcmVnaW9uLmpzXCI7XG5pbXBvcnQgVmlld3MgZnJvbSBcIi4vdmlld3MuanNcIjtcbmltcG9ydCBCYXNlVmlldyBmcm9tIFwiLi92aWV3cy9iYXNlLmpzXCI7XG5pbXBvcnQgQ29sbGVjdGlvblZpZXcgZnJvbSBcIi4vdmlld3MvY29sbGVjdGlvbi5qc1wiO1xuaW1wb3J0IEJhc2VNb2RlbCBmcm9tIFwiLi9lbnRpdGllcy9tb2RlbHMvYmFzZS5qc1wiO1xuaW1wb3J0IEJhc2VDb2xsZWN0aW9uIGZyb20gXCIuL2VudGl0aWVzL2NvbGxlY3Rpb25zL2Jhc2UuanNcIjtcbmltcG9ydCBCYXNlUmVzcG9uZGVyIGZyb20gXCIuL2VudGl0aWVzL3Jlc3BvbmRlcnMvYmFzZS5qc1wiO1xuaW1wb3J0IEJhc2VWaWV3TW9kZWwgZnJvbSBcIi4vZW50aXRpZXMvdmlldy1tb2RlbHMvYmFzZS5qc1wiO1xuaW1wb3J0IEJhc2VDb250cm9sbGVyIGZyb20gXCIuL2NvbnRyb2xsZXJzL2Jhc2UuanNcIjtcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tIFwiLi9hcHBsaWNhdGlvbi5qc1wiO1xuaW1wb3J0IE1vZHVsZSBmcm9tIFwiLi9tb2R1bGUuanNcIjtcbnZhciByb290LFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxucm9vdCA9IHR5cGVvZiBzZWxmID09PSAnb2JqZWN0JyAmJiBzZWxmLnNlbGYgPT09IHNlbGYgJiYgc2VsZiB8fCB0eXBlb2YgZ2xvYmFsID09PSAnb2JqZWN0JyAmJiBnbG9iYWwuZ2xvYmFsID09PSBnbG9iYWwgJiYgZ2xvYmFsO1xuXG5NYXJpb25ldHRpc3QuY2hhbm5lbHMgPSBuZXcgQ2hhbm5lbHMoKTtcblxuTWFyaW9uZXR0aXN0LmxvY2F0aW9uID0gbmV3IExvY2F0aW9uKCk7XG5cbk1hcmlvbmV0dGlzdC5Nb2R1bGUgPSBNb2R1bGU7XG5cbk1hcmlvbmV0dGlzdC5NaXhpbnMgPSB7XG4gIENvbGxlY3Rpb25zOiB7fSxcbiAgTW9kZWxzOiB7fSxcbiAgVmlld3M6IHt9XG59O1xuXG5NYXJpb25ldHRpc3QuZW52ID0gbmV3IEVudigpO1xuXG5NYXJpb25ldHRpc3QuY29uZmlnID0gbmV3IENvbmZpZygpO1xuXG5NYXJpb25ldHRpc3QubG9nZ2VyID0gbmV3IExvZ2dlcjtcblxuTWFyaW9uZXR0aXN0Ll8uZXh0ZW5kKE1hcmlvbmV0dGlzdC5SZW5kZXJlciwgUmVuZGVyZXIpO1xuXG5NYXJpb25ldHRpc3QudXRpbHMgPSBuZXcgVXRpbHM7XG5cbk1hcmlvbmV0dGlzdC5BcHBSb3V0ZSA9IEFwcFJvdXRlO1xuXG5NYXJpb25ldHRpc3QuQXBwUm91dGVyID0gQXBwUm91dGVyO1xuXG5NYXJpb25ldHRpc3QuXy5leHRlbmQoTWFyaW9uZXR0aXN0LlJlZ2lvbi5wcm90b3R5cGUsIFJlZ2lvbi5wcm90b3R5cGUpO1xuXG5NYXJpb25ldHRpc3QuVmlld3MgPSBuZXcgVmlld3MoKTtcblxuTWFyaW9uZXR0aXN0Ll8uZXh0ZW5kKE1hcmlvbmV0dGlzdC5WaWV3LnByb3RvdHlwZSwge1xuICB0ZW1wbGF0ZUNvbnRleHQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBoZWxwZXJzO1xuICAgIGhlbHBlcnMgPSBNYXJpb25ldHRpc3QuXy5jbG9uZShNYXJpb25ldHRpc3QuVmlld3MudGVtcGxhdGVIZWxwZXJzKTtcbiAgICByZXR1cm4gaGVscGVycztcbiAgfVxufSk7XG5cbk1hcmlvbmV0dGlzdC5WaWV3cy5CYXNlID0gQmFzZVZpZXc7XG5cbk1hcmlvbmV0dGlzdC5WaWV3cy5Db2xsZWN0aW9uID0gQ29sbGVjdGlvblZpZXc7XG5cbk1hcmlvbmV0dGlzdC5FbnRpdGllcyA9IG5ldyBNYXJpb25ldHRpc3QuT2JqZWN0KCk7XG5cbk1hcmlvbmV0dGlzdC5FbnRpdGllcy5Nb2RlbHMgPSBuZXcgTWFyaW9uZXR0aXN0Lk9iamVjdCgpO1xuXG5NYXJpb25ldHRpc3QuRW50aXRpZXMuQ29sbGVjdGlvbnMgPSBuZXcgTWFyaW9uZXR0aXN0Lk9iamVjdCgpO1xuXG5NYXJpb25ldHRpc3QuRW50aXRpZXMuVmlld01vZGVscyA9IG5ldyBNYXJpb25ldHRpc3QuT2JqZWN0KCk7XG5cbk1hcmlvbmV0dGlzdC5FbnRpdGllcy5SZXNwb25kZXJzID0gbmV3IE1hcmlvbmV0dGlzdC5PYmplY3QoKTtcblxuTWFyaW9uZXR0aXN0LkVudGl0aWVzLk1vZGVscy5CYXNlID0gQmFzZU1vZGVsO1xuXG5pZiAoTWFyaW9uZXR0aXN0LkJhY2tib25lLkFzc29jaWF0ZWRNb2RlbCkge1xuICBNYXJpb25ldHRpc3QuRW50aXRpZXMuTW9kZWxzLkFzc29jaWF0ZWQgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICAgIGV4dGVuZChBc3NvY2lhdGVkLCBzdXBlckNsYXNzKTtcblxuICAgIGZ1bmN0aW9uIEFzc29jaWF0ZWQoKSB7XG4gICAgICByZXR1cm4gQXNzb2NpYXRlZC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gQXNzb2NpYXRlZDtcblxuICB9KShNYXJpb25ldHRpc3QuQmFja2JvbmUuQXNzb2NpYXRlZE1vZGVsKTtcbn1cblxuTWFyaW9uZXR0aXN0LkVudGl0aWVzLkNvbGxlY3Rpb25zLkJhc2UgPSBCYXNlQ29sbGVjdGlvbjtcblxuTWFyaW9uZXR0aXN0LkVudGl0aWVzLlJlc3BvbmRlcnMuQmFzZSA9IEJhc2VSZXNwb25kZXI7XG5cbk1hcmlvbmV0dGlzdC5FbnRpdGllcy5WaWV3TW9kZWxzLkJhc2UgPSBCYXNlVmlld01vZGVsO1xuXG5NYXJpb25ldHRpc3QuQ29udHJvbGxlcnMgPSBuZXcgTWFyaW9uZXR0aXN0Lk9iamVjdCgpO1xuXG5NYXJpb25ldHRpc3QuQ29udHJvbGxlcnMuQmFzZSA9IEJhc2VDb250cm9sbGVyO1xuXG5NYXJpb25ldHRpc3QuQXBwbGljYXRpb24gPSBBcHBsaWNhdGlvbjtcblxuaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsICE9PSBudWxsKSB7XG4gIGdsb2JhbC5NYXJpb25ldHRpc3QgPSBNYXJpb25ldHRpc3Q7XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1hcmlvbmV0dGlzdDtcbiJdLCJuYW1lcyI6WyJNYXJpb25ldHRpc3QiLCJNYXJpb25ldHRlIiwiaGFzUHJvcCIsImV4dGVuZCIsIlRlbXBsYXRlcyIsInNsaWNlIiwiQmFzZSIsIk1vZGVsQmFzZSIsIkJhc2VWaWV3IiwiQ2hhbm5lbHMiLCJMb2NhdGlvbiIsIk1vZHVsZSIsIkVudiIsIkNvbmZpZyIsIkxvZ2dlciIsIlJlbmRlcmVyIiwiVXRpbHMiLCJBcHBSb3V0ZSIsIkFwcFJvdXRlciIsIlJlZ2lvbiIsIlZpZXdzIiwiQ29sbGVjdGlvblZpZXciLCJBcHBsaWNhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQWFBLElBQUlBLGNBQVksQ0FBQzs7QUFFakJBLGNBQVksR0FBR0MsWUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDOztBQUVuQ0QsY0FBWSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7O0FBRWpDQSxjQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUM7O0FBRTdDQSxjQUFZLENBQUMsVUFBVSxHQUFHQyxZQUFVLENBQUM7O0FBRXJDRCxjQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFbkJBLGNBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVuQkEsY0FBWSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRW5CQSxjQUFZLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQzs7QUFFNUJBLGNBQVksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOztBQUUvQkEsY0FBWSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7O0FBRTdCLHFCQUFlQSxjQUFZLENBQUM7O0FDbEN4QixJQUFBLEdBQUcsQ0FBQTtBQUNMLElBQUFHLFFBQU0sR0FBRyxTQUFTLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxLQUFLLElBQUksR0FBRyxJQUFJLE1BQU0sRUFBRSxFQUFFLElBQUlELFNBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsSUFBSSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLEVBQUUsQ0FBQTtBQUMxUixJQUFBQSxTQUFPLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQTtBQUU3QixHQUFHLEdBQUcsQ0FBQyxTQUFTLFVBQVUsRUFBRTtFQUMxQkMsUUFBTSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQzs7RUFFeEIsU0FBUyxHQUFHLEdBQUc7SUFDYixJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztHQUM1Qjs7RUFFRCxHQUFHLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBRyxXQUFXO0lBQ3ZDLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxhQUFhLENBQUM7R0FDckMsQ0FBQzs7RUFFRixHQUFHLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxXQUFXO0lBQ3RDLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxZQUFZLENBQUM7R0FDcEMsQ0FBQzs7RUFFRixHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxXQUFXO0lBQ25DLE9BQU9ILGNBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0dBQ25DLENBQUM7O0VBRUYsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsU0FBUyxLQUFLLEVBQUU7SUFDdkMsSUFBSSxRQUFRLENBQUM7SUFDYixRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNuQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztHQUM1RCxDQUFDOztFQUVGLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLFdBQVc7SUFDbEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0dBQ25CLENBQUM7O0VBRUYsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxNQUFNLEVBQUUsUUFBUSxFQUFFO0lBQ25ELElBQUksU0FBUyxDQUFDO0lBQ2QsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO01BQ2xCLE1BQU0sR0FBRyxJQUFJLENBQUM7S0FDZjtJQUNELElBQUksUUFBUSxJQUFJLElBQUksRUFBRTtNQUNwQixRQUFRLEdBQUcsSUFBSSxDQUFDO0tBQ2pCO0lBQ0QsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QixPQUFPQSxjQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEVBQUU7TUFDMURBLGNBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxlQUFlLEVBQUU7UUFDN0QsYUFBYSxFQUFFLE1BQU07UUFDckIsU0FBUyxFQUFFLFNBQVM7T0FDckIsQ0FBQyxDQUFDO01BQ0gsSUFBSUEsY0FBWSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDdkMsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDcEI7S0FDRixDQUFDLENBQUM7R0FDSixDQUFDOztFQUVGLE9BQU8sR0FBRyxDQUFDOztDQUVaLENBQUMsQ0FBQ0EsY0FBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUV4QixZQUFlLEdBQUcsQ0FBQzs7QUMxRGYsSUFBQSxRQUFRLENBQUE7QUFDVixJQUFBRyxRQUFNLEdBQUcsU0FBUyxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLEVBQUUsRUFBRSxJQUFJRCxTQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLElBQUksR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxFQUFFLENBQUE7QUFDMVIsSUFBQUEsU0FBTyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUE7QUFFN0IsUUFBUSxHQUFHLENBQUMsU0FBUyxVQUFVLEVBQUU7RUFDL0JDLFFBQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7O0VBRTdCLFNBQVMsUUFBUSxHQUFHLEVBQUU7O0VBRXRCLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLFNBQVMsV0FBVyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUU7SUFDbEUsSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO01BQ3ZCLFdBQVcsR0FBRyxRQUFRLENBQUM7S0FDeEI7SUFDRCxJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUU7TUFDckIsU0FBUyxHQUFHLEVBQUUsQ0FBQztLQUNoQjtJQUNELElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtNQUNoQixJQUFJLEdBQUcsRUFBRSxDQUFDO0tBQ1g7SUFDRCxPQUFPSCxjQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztHQUNsRixDQUFDOztFQUVGLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLFNBQVMsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUU7SUFDeEUsSUFBSSxPQUFPLENBQUM7SUFDWixJQUFJLFdBQVcsSUFBSSxJQUFJLEVBQUU7TUFDdkIsV0FBVyxHQUFHLFFBQVEsQ0FBQztLQUN4QjtJQUNELElBQUksU0FBUyxJQUFJLElBQUksRUFBRTtNQUNyQixTQUFTLEdBQUcsRUFBRSxDQUFDO0tBQ2hCO0lBQ0QsT0FBTyxHQUFHQSxjQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDM0QsSUFBSUEsY0FBWSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7TUFDdkMsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUMvQyxNQUFNO01BQ0wsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3BDO0dBQ0YsQ0FBQzs7RUFFRixRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxTQUFTLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFO0lBQ3BFLElBQUksT0FBTyxDQUFDO0lBQ1osSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO01BQ3ZCLFdBQVcsR0FBRyxRQUFRLENBQUM7S0FDeEI7SUFDRCxJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUU7TUFDckIsU0FBUyxHQUFHLEVBQUUsQ0FBQztLQUNoQjtJQUNELE9BQU8sR0FBR0EsY0FBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzNELElBQUlBLGNBQVksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO01BQ3ZDLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDM0MsTUFBTTtNQUNMLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUNoQztHQUNGLENBQUM7O0VBRUYsUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsU0FBUyxXQUFXLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRTtJQUNsRSxJQUFJLFdBQVcsSUFBSSxJQUFJLEVBQUU7TUFDdkIsV0FBVyxHQUFHLFFBQVEsQ0FBQztLQUN4QjtJQUNELElBQUksU0FBUyxJQUFJLElBQUksRUFBRTtNQUNyQixTQUFTLEdBQUcsRUFBRSxDQUFDO0tBQ2hCO0lBQ0QsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO01BQ2hCLElBQUksR0FBRyxFQUFFLENBQUM7S0FDWDtJQUNELE9BQU9BLGNBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0dBQ2xGLENBQUM7O0VBRUYsUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRTtJQUN4RSxJQUFJLFdBQVcsSUFBSSxJQUFJLEVBQUU7TUFDdkIsV0FBVyxHQUFHLFFBQVEsQ0FBQztLQUN4QjtJQUNELElBQUksU0FBUyxJQUFJLElBQUksRUFBRTtNQUNyQixTQUFTLEdBQUcsRUFBRSxDQUFDO0tBQ2hCO0lBQ0QsT0FBT0EsY0FBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7R0FDakYsQ0FBQzs7RUFFRixPQUFPLFFBQVEsQ0FBQzs7Q0FFakIsQ0FBQyxDQUFDQSxjQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRXhCLGlCQUFlLFFBQVEsQ0FBQzs7QUNqRnBCLElBQUEsUUFBUSxDQUFBO0FBQ1YsSUFBQUcsUUFBTSxHQUFHLFNBQVMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFLEVBQUUsSUFBSUQsU0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxJQUFJLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUMsRUFBRSxDQUFBO0FBQzFSLElBQUFBLFNBQU8sR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFBO0FBRTdCLFFBQVEsR0FBRyxDQUFDLFNBQVMsVUFBVSxFQUFFO0VBQy9CQyxRQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDOztFQUU3QixTQUFTLFFBQVEsR0FBRyxFQUFFOztFQUV0QixRQUFRLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxTQUFTLFFBQVEsRUFBRTtJQUNuRCxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7TUFDcEIsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztLQUNuQztJQUNELE9BQU9ILGNBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztHQUN4RCxDQUFDOztFQUVGLFFBQVEsQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLFNBQVMsS0FBSyxFQUFFLE9BQU8sRUFBRTtJQUN2RCxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7TUFDbkIsT0FBTyxHQUFHLEVBQUUsQ0FBQztLQUNkO0lBQ0QsT0FBT0EsY0FBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztHQUMvRCxDQUFDOztFQUVGLFFBQVEsQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHLFdBQVc7SUFDOUMsSUFBSSxJQUFJLENBQUM7SUFDVCxJQUFJLEdBQUdBLGNBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztJQUM5QyxJQUFJQSxjQUFZLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtNQUNoQyxPQUFPLElBQUksQ0FBQztLQUNiLE1BQU07TUFDTCxPQUFPLElBQUksQ0FBQztLQUNiO0dBQ0YsQ0FBQzs7RUFFRixRQUFRLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxTQUFTLE9BQU8sRUFBRTtJQUNsRCxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7TUFDbkIsT0FBTyxHQUFHLEVBQUUsQ0FBQztLQUNkO0lBQ0QsSUFBSUEsY0FBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO01BQ3pDLE9BQU9BLGNBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNyRDtHQUNGLENBQUM7O0VBRUYsT0FBTyxRQUFRLENBQUM7O0NBRWpCLENBQUMsQ0FBQ0EsY0FBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUV4QixpQkFBZSxRQUFRLENBQUM7O0FDOUN4QixJQUFJLFNBQVMsQ0FBQzs7QUFFZCxTQUFTLEdBQUcsQ0FBQyxXQUFXO0VBQ3RCLFNBQVMsU0FBUyxHQUFHLEVBQUU7O0VBRXZCLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzs7RUFFbEMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDOztFQUVyQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxXQUFXO0lBQ3RDLElBQUksTUFBTSxDQUFDO0lBQ1gsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNaLElBQUksT0FBTyxJQUFJLEtBQUssV0FBVyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7TUFDaEQsTUFBTSxHQUFHLElBQUksQ0FBQztLQUNmO0lBQ0QsSUFBSSxPQUFPLEdBQUcsS0FBSyxXQUFXLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtNQUM5QyxNQUFNLEdBQUcsR0FBRyxDQUFDO0tBQ2Q7SUFDRCxPQUFPLE1BQU0sQ0FBQztHQUNmLENBQUM7O0VBRUYsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxZQUFZLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtJQUNqRSxJQUFJLE1BQU0sRUFBRSxRQUFRLENBQUM7SUFDckIsSUFBSSxZQUFZLElBQUksSUFBSSxFQUFFO01BQ3hCLFlBQVksR0FBRyxFQUFFLENBQUM7S0FDbkI7SUFDRCxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7TUFDaEIsSUFBSSxHQUFHLEVBQUUsQ0FBQztLQUNYO0lBQ0QsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO01BQ25CLE9BQU8sR0FBRyxFQUFFLENBQUM7S0FDZDtJQUNELFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDZCxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixJQUFJQSxjQUFZLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRTtNQUMzQyxNQUFNLEdBQUcsTUFBTSxFQUFFLENBQUM7S0FDbkI7SUFDRCxJQUFJLE9BQU8sQ0FBQyxlQUFlLElBQUksSUFBSSxFQUFFO01BQ25DLFFBQVEsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDO0tBQ3BDO0lBQ0QsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSUEsY0FBWSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUU7TUFDdkUsUUFBUSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN2QztJQUNELE9BQU8sUUFBUSxDQUFDO0dBQ2pCLENBQUM7O0VBRUYsT0FBTyxTQUFTLENBQUM7O0NBRWxCLENBQUMsRUFBRSxDQUFDOztBQUVMLGtCQUFlLFNBQVMsQ0FBQzs7QUNqRHJCLElBQUEsTUFBTSxDQUFBO0FBQ1IsSUFBQUcsUUFBTSxHQUFHLFNBQVMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFLEVBQUUsSUFBSUQsU0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxJQUFJLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUMsRUFBRSxDQUFBO0FBQzFSLElBQUFBLFNBQU8sR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFBO0FBRTdCLE1BQU0sR0FBRyxDQUFDLFNBQVMsVUFBVSxFQUFFO0VBQzdCQyxRQUFNLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDOztFQUUzQixTQUFTLE1BQU0sR0FBRztJQUNoQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUlDLFdBQVMsRUFBRSxDQUFDO0dBQ2xDOztFQUVELE9BQU8sTUFBTSxDQUFDOztDQUVmLENBQUMsQ0FBQ0osY0FBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUV4QixlQUFlLE1BQU0sQ0FBQzs7QUNqQnRCLElBQUksUUFBUSxDQUFDOztBQUViLFFBQVEsR0FBRztFQUNULE1BQU0sRUFBRSxTQUFTLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDL0IsSUFBSSxjQUFjLENBQUM7SUFDbkIsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtNQUN2QyxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN2QixNQUFNO01BQ0wsSUFBSSxRQUFRLEtBQUssS0FBSyxFQUFFO1FBQ3RCLE9BQU87T0FDUjtNQUNELGNBQWMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO01BQzVDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUM5QyxNQUFNLFdBQVcsR0FBRyxRQUFRLEdBQUcsaUJBQWlCLENBQUM7T0FDbEQ7TUFDRCxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM3QjtHQUNGO0VBQ0QsV0FBVyxFQUFFLFNBQVMsUUFBUSxFQUFFO0lBQzlCLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUM7SUFDbEUsT0FBTyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztJQUNwRCxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO01BQ3RDLE9BQU8sR0FBRyxPQUFPLEVBQUUsQ0FBQztLQUNyQjtJQUNELElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtNQUNwQyxNQUFNLDhCQUE4QixDQUFDO0tBQ3RDO0lBQ0QsU0FBUyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkIsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtNQUN4QixPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNoQjtJQUNELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO01BQzlDLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDcEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbEQsSUFBSSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzFELElBQUksVUFBVSxJQUFJLElBQUksRUFBRTtVQUN0QixPQUFPLFVBQVUsQ0FBQztTQUNuQjtPQUNGO0tBQ0Y7R0FDRjtFQUNELGNBQWMsRUFBRSxTQUFTLElBQUksRUFBRSxRQUFRLEVBQUU7SUFDdkMsSUFBSSxNQUFNLEVBQUUsVUFBVSxDQUFDO0lBQ3ZCLE1BQU0sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7SUFDOUMsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTtNQUNyQyxNQUFNLEdBQUcsTUFBTSxFQUFFLENBQUM7S0FDbkI7SUFDRCxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtNQUNoRCxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxRQUFRLEdBQUcsT0FBTyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztLQUNsRjtJQUNELElBQUksVUFBVSxFQUFFO01BQ2QsT0FBTyxVQUFVLENBQUM7S0FDbkI7R0FDRjtFQUNELFlBQVksRUFBRSxTQUFTLE1BQU0sRUFBRTtJQUM3QixJQUFJLEtBQUssQ0FBQztJQUNWLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtNQUNsQixLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztNQUMxQixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztNQUNqQyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDeEI7R0FDRjtDQUNGLENBQUM7O0FBRUYsaUJBQWUsUUFBUSxDQUFDOztBQ2pFcEIsSUFBQSxLQUFLLENBQUE7QUFDUCxJQUFBRyxRQUFNLEdBQUcsU0FBUyxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLEVBQUUsRUFBRSxJQUFJRCxTQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLElBQUksR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxFQUFFLENBQUE7QUFDMVIsSUFBQUEsU0FBTyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUE7QUFDM0IsSUFBQSxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQTtBQUVsQixLQUFLLEdBQUcsQ0FBQyxTQUFTLFVBQVUsRUFBRTtFQUM1QkMsUUFBTSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQzs7RUFFMUIsU0FBUyxLQUFLLEdBQUc7SUFDZixPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7R0FDM0Q7O0VBRUQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsU0FBUyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRTtJQUMxRCxJQUFJSCxjQUFZLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTtNQUNwQyxLQUFLLEdBQUcsTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDckU7SUFDRCxPQUFPLEtBQUssQ0FBQztHQUNkLENBQUM7O0VBRUYsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsU0FBUyxLQUFLLEVBQUU7SUFDeEMsSUFBSSxJQUFJLENBQUM7SUFDVCxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ1YsSUFBSSxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUM7SUFDbkIsT0FBTyxJQUFJLENBQUM7R0FDYixDQUFDOztFQUVGLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FB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QUFPLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztJQUN6QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0dBQy9CLENBQUM7O0VBRUYsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxHQUFHLEVBQUUsT0FBTyxFQUFFO0lBQzdDLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtNQUNuQixPQUFPLEdBQUcsRUFBRSxDQUFDO0tBQ2Q7SUFDRCxPQUFPLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztJQUN0QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0dBQy9CLENBQUM7O0VBRUYsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxHQUFHLEVBQUUsT0FBTyxFQUFFO0lBQzlDLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtNQUNuQixPQUFPLEdBQUcsRUFBRSxDQUFDO0tBQ2Q7SUFDRCxPQUFPLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztJQUN2QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0dBQy9CLENBQUM7O0VBRUYsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxHQUFHLEVBQUUsT0FBTyxFQUFFO0lBQzdDLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtNQUNuQixPQUFPLEdBQUcsRUFBRSxDQUFDO0tBQ2Q7SUFDRCxPQUFPLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztJQUN0QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0dBQy9CLENBQUM7O0VBRUYsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsU0FBUyxHQUFHLEVBQUUsT0FBTyxFQUFFO0lBQzVDLElBQUksR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUM7SUFDckIsSUFBSSxPQUFPLElBQUksSUFBSSxF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RixPQUFPLFNBQVMsQ0FBQzs7Q0FFbEIsQ0FBQyxDQUFDQSxjQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRTNCLGtCQUFlLFNBQVMsQ0FBQzs7QUNsSXJCLElBQUEsTUFBTSxDQUFBO0FBQUUsSUFBQSxLQUFLLENBQUE7QUFDZixJQUFBRyxRQUFNLEdBQUcsU0FBUyxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLEVBQUUsRUFBRSxJQUFJRCxTQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLElBQUksR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxFQUFFLENBQUE7QUFDMVIsSUFBQUEsU0FBTyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUE7QUFFN0IsS0FBSyxHQUFHRCxZQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7O0FBRXpDLE1BQU0sR0FBRyxDQUFDLFNBQVMsVUFBVSxFQUFFO0VBQzdCRSxRQUFNLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDOztFQUUzQixTQUFTLE1BQU0sR0FBRztJQUNoQixPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7R0FDNUQ7O0VBRUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxJQUFJLEVBQUUsT0FBTyxFQUFFO0lBQzlDLElBQUksSUFB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