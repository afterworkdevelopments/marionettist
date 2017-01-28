(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('underscore'), require('underscore-contrib'), require('underscore.string'), require('jquery'), require('backbone'), require('backbone.radio'), require('backbone-associations'), require('backbone.marionette'), require('i18next'), require('numeral'), require('moment'), require('moment-range'), require('moment-timezone')) :
	typeof define === 'function' && define.amd ? define(['underscore', 'underscore-contrib', 'underscore.string', 'jquery', 'backbone', 'backbone.radio', 'backbone-associations', 'backbone.marionette', 'i18next', 'numeral', 'moment', 'moment-range', 'moment-timezone'], factory) :
	(global.Marionettist = factory(global._,global.underscoreContrib,global.s,global.$,global.Backbone,global.Backbone.Radio,global.backboneAssociations,global.Marionette,global.i18next,global.numeral,global.moment,global.momentRange,global.momentTimezone));
}(this, (function (_,underscoreContrib,s,$,Backbone,backbone_radio,backboneAssociations,Marionette$1,i18next,numeral,moment,momentRange,momentTimezone) { 'use strict';

_ = 'default' in _ ? _['default'] : _;
underscoreContrib = 'default' in underscoreContrib ? underscoreContrib['default'] : underscoreContrib;
s = 'default' in s ? s['default'] : s;
$ = 'default' in $ ? $['default'] : $;
Backbone = 'default' in Backbone ? Backbone['default'] : Backbone;
backbone_radio = 'default' in backbone_radio ? backbone_radio['default'] : backbone_radio;
backboneAssociations = 'default' in backboneAssociations ? backboneAssociations['default'] : backboneAssociations;
Marionette$1 = 'default' in Marionette$1 ? Marionette$1['default'] : Marionette$1;
i18next = 'default' in i18next ? i18next['default'] : i18next;
numeral = 'default' in numeral ? numeral['default'] : numeral;
moment = 'default' in moment ? moment['default'] : moment;
momentRange = 'default' in momentRange ? momentRange['default'] : momentRange;
momentTimezone = 'default' in momentTimezone ? momentTimezone['default'] : momentTimezone;

var Marionettist$2;

Marionettist$2 = Marionette$1.extend();

Marionettist$2.Backbone = Backbone;

Marionettist$2.Marionette = Marionette$1;

Marionettist$2._ = _;

Marionettist$2.$ = $;

Marionettist$2.s = s;

Marionettist$2.I18n = i18next;

Marionettist$2.numeral = numeral;

Marionettist$2.moment = moment;

var Marionettist$3 = Marionettist$2;

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
    return Marionettist$3.I18n.language;
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
    return Marionettist$3.I18n.changeLanguage(locale, function(t) {
      Marionettist$3.channels.publish("marionettist", "change:locale", {
        currentLocale: locale,
        oldLocale: oldLocale
      });
      if (Marionettist$3._.isFunction(callback)) {
        return callback(t);
      }
    });
  };

  return Env;

})(Marionettist$3.Object);

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
    return Marionettist$3.Backbone.Radio.channel(channelName).request(eventName, data);
  };

  Channels.prototype.replyOnce = function(channelName, eventName, callback) {
    var channel;
    if (channelName == null) {
      channelName = "global";
    }
    if (eventName == null) {
      eventName = "";
    }
    channel = Marionettist$3.Backbone.Radio.channel(channelName);
    if (Marionettist$3._.isFunction(callback)) {
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
    channel = Marionettist$3.Backbone.Radio.channel(channelName);
    if (Marionettist$3._.isFunction(callback)) {
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
    return Marionettist$3.Backbone.Radio.channel(channelName).trigger(eventName, data);
  };

  Channels.prototype.subscribe = function(channelName, eventName, callback) {
    if (channelName == null) {
      channelName = "global";
    }
    if (eventName == null) {
      eventName = "";
    }
    return Marionettist$3.Backbone.Radio.channel(channelName).on(eventName, callback);
  };

  return Channels;

})(Marionettist$3.Object);

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
    return Marionettist$3.Backbone.history.loadUrl(fragment);
  };

  Location.prototype.navigateTo = function(route, options) {
    if (options == null) {
      options = {};
    }
    return Marionettist$3.Backbone.history.navigate(route, options);
  };

  Location.prototype.getCurrentRoute = function() {
    var frag;
    frag = Marionettist$3.Backbone.history.fragment;
    if (Marionettist$3._.isEmpty(frag)) {
      return null;
    } else {
      return frag;
    }
  };

  Location.prototype.startHistory = function(options) {
    if (options == null) {
      options = {};
    }
    if (Marionettist$3.Backbone.history != null) {
      return Marionettist$3.Backbone.history.start(options);
    }
  };

  return Location;

})(Marionettist$3.Object);

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
    if (Marionettist$3._.isFunction(templateName)) {
      engine = engine();
    }
    if (options.defaultTemplate != null) {
      template = options.defaultTemplate;
    }
    if ((engine != null) && Marionettist$3._.isFunction(engine[templateName])) {
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

})(Marionettist$3.Object);

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
    if (Marionettist$3._.isFunction(value)) {
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
    xhrs = Marionettist$3._.chain([ajaxRequests]).flatten().value();
    if (xhrs.length > 0) {
      return (ref = Marionettist$3.$).when.apply(ref, xhrs).then((function() {
        var args;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        if (Marionettist$3._.isFunction(options.success)) {
          return options.success.apply(options, args);
        }
      }), function() {
        var args;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        if (Marionettist$3._.isFunction(options.error)) {
          return options.error.apply(options, args);
        }
      });
    } else {
      if (Marionettist$3._.isFunction(options.success)) {
        return options.success(null);
      }
    }
  };

  Utils.prototype._waitForBluebird = function(promises, options) {
    if (options == null) {
      options = {};
    }
    promises = Marionettist$3._.chain([promises]).flatten().value();
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
          if (Marionettist$3._.isFunction(options.error)) {
            return options.error.apply(options, errors);
          }
        } else {
          if (Marionettist$3._.isFunction(options.success)) {
            return options.success.apply(options, successArgs);
          }
        }
      });
    } else {
      if (Marionettist$3._.isFunction(options.success)) {
        return options.success(null);
      }
    }
  };

  return Utils;

})(Marionettist$3.Object);

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
    if (Marionettist$3.env.isDevelopment() || force === true) {
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

})(Marionettist$3.Object);

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

})(Marionettist$3.Object);

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
    if ((this.controller != null) && Marionettist$3._.isFunction(this.controller.onRoute)) {
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
      if (Marionettist$3._.isFunction(filters)) {
        filters = filters();
      }
      if (controller.filters == null) {
        controller.filters = {};
      }
      controller.filters = Marionettist$3._.extend(defaultFilters, filters);
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
        _this.controller.route = new Marionettist$3.AppRoute({
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
      throw new Marionettist$3.Marionette.Error('Method "' + methodName + '" was not found on the controller');
    }
    return this.route(route, methodName, Marionettist$3._.bind(method, controller));
  };

  AppRouter.prototype._executeFilter = function(filter, controller) {
    var filterValue, i, len, methodName, ref, result, stopMsg;
    result = true;
    ref = Marionettist$3._.keys(filter);
    for (i = 0, len = ref.length; i < len; i++) {
      methodName = ref[i];
      filterValue = filter[methodName];
      stopMsg = "Action halted by filter '" + methodName + "'";
      switch (false) {
        case !Marionettist$3._.isFunction(filterValue):
          result = filterValue(controller);
          if (result === false) {
            if (typeof console !== "undefined" && console !== null) {
              console.warn(stopMsg);
            }
            break;
          }
          break;
        case !Marionettist$3._.isObject(filterValue):
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
    return params = this._extractParameters(route, Marionettist$3.Backbone.history.getFragment());
  };

  AppRouter.prototype._proccessFilterObject = function(methodName, filter, controller) {
    var actionName, controllerMethod, defaultFilterOptions, filterOptions;
    defaultFilterOptions = {
      method: null,
      only: [],
      except: []
    };
    filterOptions = Marionettist$3._.extend(defaultFilterOptions, filter);
    controllerMethod = controller[methodName];
    actionName = controller.route.actionName();
    if (!Marionettist$3._.isArray(filterOptions.only)) {
      throw "filter option only, most be an array";
    }
    if (!Marionettist$3._.isArray(filterOptions.except)) {
      throw "filter option except, most be an array";
    }
    if (filterOptions.only.length > 0 || filterOptions.except.length > 0) {
      if (Marionettist$3._.contains(filterOptions.only, actionName) && !Marionettist$3._.contains(filterOptions.except, actionName)) {
        if (Marionettist$3._.isFunction(controllerMethod)) {
          return controllerMethod.apply(this.controller, this._getParams());
        }
      }
    } else {
      if (Marionettist$3._.isFunction(controllerMethod)) {
        return controllerMethod.apply(this.controller, this._getParams());
      }
    }
  };

  return AppRouter;

})(Marionettist$3.AppRouter);

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
      if ((oldView != null) && Marionettist$3._.isFunction(oldView.transitionOut)) {
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
      return (ref = Marionettist$3.utils).pathFor.apply(ref, args);
    },
    _: Marionettist$3._,
    s: Marionettist$3.s,
    t: function() {
      var args, ref;
      args = 1 <= arguments.length ? slice$1.call(arguments, 0) : [];
      return (ref = Marionettist$3.I18n).t.apply(ref, args);
    },
    Mnt: Marionettist$3,
    formatCurrency: function(amount, format) {
      if (format == null) {
        format = "$0,0.00";
      }
      return Marionettist$3.numeral(amount).format(format);
    },
    formatNumber: function(amount, format) {
      if (format == null) {
        format = "0,0.00";
      }
      return Marionettist$3.numeral(amount).format(format);
    },
    formatPercentage: function(amount, format) {
      if (format == null) {
        format = "0.00%";
      }
      return Marionettist$3.numeral(amount).format(format);
    },
    formatDate: function(date, format) {
      if (format == null) {
        format = "DD-MM-YYYY";
      }
      return Marionettist$3.moment(date).format(format);
    }
  };

  return Views;

})(Marionettist$3.Object);

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
    this._instance_id = Marionettist$3._.uniqueId("responder");
    this.register(this, this._instance_id);
  }

  Base.prototype.loaderView = BaseView$1.extend({
    template: function(data) {
      return Marionettist$3.config.templates.render("marionettist/loader", data, {
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
    if (Marionettist$3._.isObject(options) && Marionettist$3._.isObject(options.fetch)) {
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
    return (ref = Marionettist$3.utils).waitFor.apply(ref, args);
  };

  Base.prototype.deferred = function() {
    return Marionettist$3.$.Deferred();
  };

  Base.prototype.fetch = function(options) {
    var asyncFetches, deferred;
    if (options == null) {
      options = {};
    }
    deferred = this.deferred();
    asyncFetches = Marionettist$3._.chain([this.get("async")]).flatten().compact().value();
    this.waitFor(asyncFetches, {
      success: function() {
        if (Marionettist$3._.isFunction(options.success)) {
          options.success();
        }
        return deferred.resolve();
      },
      error: function() {
        if (Marionettist$3._.isFunction(options.error)) {
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
    return Marionettist$3._.size(this._registry);
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
    if (Marionettist$3._.isFunction(resources)) {
      resources = resources();
    }
    if (options.viewModel == null) {
      options.viewModel = this;
    }
    if (Marionettist$3._.isObject(resources) && (resources[resourceName] != null)) {
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
    return Marionettist$3.location.navigateTo(route, options);
  };

  Base.prototype.getCurrentRoute = function() {
    return Marionettist$3.location.getCurrentRoute();
  };

  return Base;

})(Marionettist$3.Object);

var BaseController = Base$4;

var Application;
var extend$18 = function(child, parent) { for (var key in parent) { if (hasProp$18.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
var hasProp$18 = {}.hasOwnProperty;

Application = (function(superClass) {
  extend$18(Application, superClass);

  Application.prototype.Controllers = new Marionettist$3.Object();

  Application.prototype.Entities = new Marionettist$3.Object();

  Application.prototype.Views = new Marionettist$3.Object();

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
    if (Marionettist$3._.result(this, 'startAfterInitialized')) {
      this.start(options);
    }
  }

  Application.prototype.startHistory = function(options) {
    if (options == null) {
      options = {};
    }
    if (!Marionettist$3.Backbone.History.started) {
      return Marionettist$3.location.startHistory(options);
    }
  };

  Application.prototype.start = function(options) {
    this.triggerMethod("before:resources:fetch", options);
    if (this.resources == null) {
      this.resources = [];
    }
    return Marionettist$3.utils.waitFor(this.resources, {
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
      if (Marionettist$3._.isFunction(childApps)) {
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
    return Marionettist$3._.each(this._childApps, function(childApp) {
      if (Marionettist$3.utils.getValue(childApp.getOption("startWithParent")) === true) {
        return childApp.start(options);
      }
    });
  };

  Application.prototype._stopChildApps = function(options) {
    return Marionettist$3._.each(this._childApps, function(childApp) {
      if (Marionettist$3._.result(childApp, 'stopWithParent')) {
        return childApp.stop(options);
      }
    });
  };

  Application.prototype._destroyChildApps = function(options) {
    return Marionettist$3._.each(this._childApps, function(childApp) {
      if (!Marionettist$3._.result(childApp, 'preventDestroy')) {
        return childApp.destroy(options);
      }
    });
  };

  Application.prototype._buildAppFromObject = function(appConfig) {
    var AppClass, options;
    AppClass = appConfig.AppClass;
    options = Marionettist$3._.omit(appConfig, 'AppClass');
    return this.buildApp(AppClass, options);
  };

  Application.prototype._buildApp = function(AppClass, options) {
    if (Marionettist$3._.isFunction(AppClass)) {
      return this.buildApp(AppClass, options);
    }
    if (Marionettist$3._.isObject(AppClass)) {
      return this._buildAppFromObject(AppClass);
    }
  };

  Application.prototype.buildApp = function(AppClass, options) {
    options = Marionettist$3._.extend({}, this.childAppOptions, options);
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
    return Marionettist$3._.each(childApps, (function(childApp, appName) {
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
    childApp.on('destroy', Marionettist$3._.partial(this._removeChildApp, appName), this);
    if (this.isRunning() && Marionettist$3._.result(childApp, 'startWithParent')) {
      childApp.start();
    }
    return childApp;
  };

  Application.prototype.getName = function() {
    return this._name;
  };

  Application.prototype.getChildApps = function() {
    return Marionettist$3._.clone(this._childApps);
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
    Marionettist$3._.each(this._childApps, (function(childApp, appName) {
      this.removeChildApp(appName);
    }), this);
    return childApps;
  };

  Application.prototype.removeChildApp = function(appName, options) {
    var childApp;
    options = Marionettist$3._.extend({}, options);
    childApp = this.getChildApp(appName);
    if (!childApp) {
      return;
    }
    if (options.preventDestroy || Marionettist$3._.result(childApp, 'preventDestroy')) {
      this._removeChildApp(appName);
    } else {
      childApp.destroy();
    }
    return childApp;
  };

  Application.prototype.destroy = function() {};

  return Application;

})(Marionettist$3.Application);

var Application$1 = Application;

var Module;

Module = Marionettist$3.Object.extend(Marionettist$3.Backbone.Radio.Requests);

var Module$1 = Module;

var root;
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
var hasProp = {}.hasOwnProperty;

root = typeof self === 'object' && self.self === self && self || typeof global === 'object' && global.global === global && global;

Marionettist$3.channels = new Channels$1();

Marionettist$3.location = new Location$1();

Marionettist$3.Module = Module$1;

Marionettist$3.Mixins = {
  Collections: {},
  Models: {},
  Views: {}
};

Marionettist$3.env = new Env$1();

Marionettist$3.config = new Config$1();

Marionettist$3.logger = new Logger$1;

Marionettist$3._.extend(Marionettist$3.Renderer, Renderer$1);

Marionettist$3.utils = new Utils$1;

Marionettist$3.AppRoute = AppRoute$1;

Marionettist$3.AppRouter = AppRouter$1;

Marionettist$3._.extend(Marionettist$3.Region.prototype, Region$1.prototype);

Marionettist$3.Views = new Views$1();

Marionettist$3._.extend(Marionettist$3.View.prototype, {
  templateContext: function() {
    var helpers;
    helpers = Marionettist$3._.clone(Marionettist$3.Views.templateHelpers);
    return helpers;
  }
});

Marionettist$3.Views.Base = BaseView$1;

Marionettist$3.Views.Collection = CollectionView$1;

Marionettist$3.Entities = new Marionettist$3.Object();

Marionettist$3.Entities.Models = new Marionettist$3.Object();

Marionettist$3.Entities.Collections = new Marionettist$3.Object();

Marionettist$3.Entities.ViewModels = new Marionettist$3.Object();

Marionettist$3.Entities.Responders = new Marionettist$3.Object();

Marionettist$3.Entities.Models.Base = BaseModel;

if (Marionettist$3.Backbone.AssociatedModel) {
  Marionettist$3.Entities.Models.Associated = (function(superClass) {
    extend(Associated, superClass);

    function Associated() {
      return Associated.__super__.constructor.apply(this, arguments);
    }

    return Associated;

  })(Marionettist$3.Backbone.AssociatedModel);
}

Marionettist$3.Entities.Collections.Base = BaseCollection;

Marionettist$3.Entities.Responders.Base = BaseResponder;

Marionettist$3.Entities.ViewModels.Base = BaseViewModel;

Marionettist$3.Controllers = new Marionettist$3.Object();

Marionettist$3.Controllers.Base = BaseController;

Marionettist$3.Application = Application$1;

if (typeof global !== "undefined" && global !== null) {
  global.Marionettist = Marionettist$3;
}

return Marionettist$3;

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9saW51eC1kYXRhL3BlcnNvbmFsL21hcmlvbmV0dGlzdC9saWIvY29yZS5qcyIsIi9saW51eC1kYXRhL3BlcnNvbmFsL21hcmlvbmV0dGlzdC9saWIvZW52LmpzIiwiL2xpbnV4LWRhdGEvcGVyc29uYWwvbWFyaW9uZXR0aXN0L2xpYi9jaGFubmVscy5qcyIsIi9saW51eC1kYXRhL3BlcnNvbmFsL21hcmlvbmV0dGlzdC9saWIvbG9jYXRpb24uanMiLCIvbGludXgtZGF0YS9wZXJzb25hbC9tYXJpb25ldHRpc3QvbGliL2NvbmZpZy90ZW1wbGF0ZXMuanMiLCIvbGludXgtZGF0YS9wZXJzb25hbC9tYXJpb25ldHRpc3QvbGliL2NvbmZpZy5qcyIsIi9saW51eC1kYXRhL3BlcnNvbmFsL21hcmlvbmV0dGlzdC9saWIvbWl4aW5zL3JlbmRlcmVyLmpzIiwiL2xpbnV4LWRhdGEvcGVyc29uYWwvbWFyaW9uZXR0aXN0L2xpYi91dGlscy5qcyIsIi9saW51eC1kYXRhL3BlcnNvbmFsL21hcmlvbmV0dGlzdC9saWIvbG9nZ2VyLmpzIiwiL2xpbnV4LWRhdGEvcGVyc29uYWwvbWFyaW9uZXR0aXN0L2xpYi9yb3V0ZS5qcyIsIi9saW51eC1kYXRhL3BlcnNvbmFsL21hcmlvbmV0dGlzdC9saWIvcm91dGVyLmpzIiwiL2xpbnV4LWRhdGEvcGVyc29uYWwvbWFyaW9uZXR0aXN0L2xpYi9yZWdpb24uanMiLCIvbGludXgtZGF0YS9wZXJzb25hbC9tYXJpb25ldHRpc3QvbGliL3ZpZXdzLmpzIiwiL2xpbnV4LWRhdGEvcGVyc29uYWwvbWFyaW9uZXR0aXN0L2xpYi92aWV3cy9iYXNlLmpzIiwiL2xpbnV4LWRhdGEvcGVyc29uYWwvbWFyaW9uZXR0aXN0L2xpYi92aWV3cy9jb2xsZWN0aW9uLmpzIiwiL2xpbnV4LWRhdGEvcGVyc29uYWwvbWFyaW9uZXR0aXN0L2xpYi9lbnRpdGllcy9tb2RlbHMvYmFzZS5qcyIsIi9saW51eC1kYXRhL3BlcnNvbmFsL21hcmlvbmV0dGlzdC9saWIvZW50aXRpZXMvY29sbGVjdGlvbnMvYmFzZS5qcyIsIi9saW51eC1kYXRhL3BlcnNvbmFsL21hcmlvbmV0dGlzdC9saWIvZW50aXRpZXMvcmVzcG9uZGVycy9iYXNlLmpzIiwiL2xpbnV4LWRhdGEvcGVyc29uYWwvbWFyaW9uZXR0aXN0L2xpYi9lbnRpdGllcy92aWV3LW1vZGVscy9iYXNlLmpzIiwiL2xpbnV4LWRhdGEvcGVyc29uYWwvbWFyaW9uZXR0aXN0L2xpYi9jb250cm9sbGVycy9iYXNlLmpzIiwiL2xpbnV4LWRhdGEvcGVyc29uYWwvbWFyaW9uZXR0aXN0L2xpYi9hcHBsaWNhdGlvbi5qcyIsIi9saW51eC1kYXRhL3BlcnNvbmFsL21hcmlvbmV0dGlzdC9saWIvbW9kdWxlLmpzIiwiL2xpbnV4LWRhdGEvcGVyc29uYWwvbWFyaW9uZXR0aXN0L2xpYi9tYXJpb25ldHRpc3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSBcInVuZGVyc2NvcmVcIjtcbmltcG9ydCB1bmRlcnNjb3JlQ29udHJpYiBmcm9tIFwidW5kZXJzY29yZS1jb250cmliXCI7XG5pbXBvcnQgcyBmcm9tIFwidW5kZXJzY29yZS5zdHJpbmdcIjtcbmltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCBCYWNrYm9uZSBmcm9tIFwiYmFja2JvbmVcIjtcbmltcG9ydCBiYWNrYm9uZV9yYWRpbyBmcm9tIFwiYmFja2JvbmUucmFkaW9cIjtcbmltcG9ydCBiYWNrYm9uZUFzc29jaWF0aW9ucyBmcm9tIFwiYmFja2JvbmUtYXNzb2NpYXRpb25zXCI7XG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tIFwiYmFja2JvbmUubWFyaW9uZXR0ZVwiO1xuaW1wb3J0IGkxOG5leHQgZnJvbSBcImkxOG5leHRcIjtcbmltcG9ydCBudW1lcmFsIGZyb20gXCJudW1lcmFsXCI7XG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcbmltcG9ydCBtb21lbnRSYW5nZSBmcm9tIFwibW9tZW50LXJhbmdlXCI7XG5pbXBvcnQgbW9tZW50VGltZXpvbmUgZnJvbSBcIm1vbWVudC10aW1lem9uZVwiO1xudmFyIE1hcmlvbmV0dGlzdDtcblxuTWFyaW9uZXR0aXN0ID0gTWFyaW9uZXR0ZS5leHRlbmQoKTtcblxuTWFyaW9uZXR0aXN0LkJhY2tib25lID0gQmFja2JvbmU7XG5cbk1hcmlvbmV0dGlzdC5NYXJpb25ldHRlID0gTWFyaW9uZXR0ZTtcblxuTWFyaW9uZXR0aXN0Ll8gPSBfO1xuXG5NYXJpb25ldHRpc3QuJCA9ICQ7XG5cbk1hcmlvbmV0dGlzdC5zID0gcztcblxuTWFyaW9uZXR0aXN0LkkxOG4gPSBpMThuZXh0O1xuXG5NYXJpb25ldHRpc3QubnVtZXJhbCA9IG51bWVyYWw7XG5cbk1hcmlvbmV0dGlzdC5tb21lbnQgPSBtb21lbnQ7XG5cbmV4cG9ydCBkZWZhdWx0IE1hcmlvbmV0dGlzdDtcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4vY29yZS5qc1wiO1xudmFyIEVudixcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkVudiA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChFbnYsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIEVudigpIHtcbiAgICB0aGlzLnN0YWdlID0gXCJkZXZlbG9wbWVudFwiO1xuICB9XG5cbiAgRW52LnByb3RvdHlwZS5pc0RldmVsb3BtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhZ2UgPT09IFwiZGV2ZWxvcG1lbnRcIjtcbiAgfTtcblxuICBFbnYucHJvdG90eXBlLmlzUHJvZHVjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnN0YWdlID09PSBcInByb2R1Y3Rpb25cIjtcbiAgfTtcblxuICBFbnYucHJvdG90eXBlLmdldExvY2FsZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBNYXJpb25ldHRpc3QuSTE4bi5sYW5ndWFnZTtcbiAgfTtcblxuICBFbnYucHJvdG90eXBlLnNldFN0YWdlID0gZnVuY3Rpb24oc3RhZ2UpIHtcbiAgICB2YXIgb2xkU3RhdGU7XG4gICAgb2xkU3RhdGUgPSB0aGlzLnN0YWdlO1xuICAgIHRoaXMuc3RhZ2UgPSBzdGFnZTtcbiAgICByZXR1cm4gdGhpcy50cmlnZ2VyTWV0aG9kKFwiY2hhbmdlOnN0YWdlXCIsIG9sZFN0YXRlLCBzdGFnZSk7XG4gIH07XG5cbiAgRW52LnByb3RvdHlwZS5nZXRTdGFnZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnN0YWdlO1xuICB9O1xuXG4gIEVudi5wcm90b3R5cGUuc2V0TG9jYWxlID0gZnVuY3Rpb24obG9jYWxlLCBjYWxsYmFjaykge1xuICAgIHZhciBvbGRMb2NhbGU7XG4gICAgaWYgKGxvY2FsZSA9PSBudWxsKSB7XG4gICAgICBsb2NhbGUgPSBcImVuXCI7XG4gICAgfVxuICAgIGlmIChjYWxsYmFjayA9PSBudWxsKSB7XG4gICAgICBjYWxsYmFjayA9IG51bGw7XG4gICAgfVxuICAgIG9sZExvY2FsZSA9IHRoaXMuZ2V0TG9jYWxlKCk7XG4gICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5JMThuLmNoYW5nZUxhbmd1YWdlKGxvY2FsZSwgZnVuY3Rpb24odCkge1xuICAgICAgTWFyaW9uZXR0aXN0LmNoYW5uZWxzLnB1Ymxpc2goXCJtYXJpb25ldHRpc3RcIiwgXCJjaGFuZ2U6bG9jYWxlXCIsIHtcbiAgICAgICAgY3VycmVudExvY2FsZTogbG9jYWxlLFxuICAgICAgICBvbGRMb2NhbGU6IG9sZExvY2FsZVxuICAgICAgfSk7XG4gICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihjYWxsYmFjaykpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBFbnY7XG5cbn0pKE1hcmlvbmV0dGlzdC5PYmplY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBFbnY7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbnZhciBDaGFubmVscyxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkNoYW5uZWxzID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKENoYW5uZWxzLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBDaGFubmVscygpIHt9XG5cbiAgQ2hhbm5lbHMucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbihjaGFubmVsTmFtZSwgZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgaWYgKGNoYW5uZWxOYW1lID09IG51bGwpIHtcbiAgICAgIGNoYW5uZWxOYW1lID0gXCJnbG9iYWxcIjtcbiAgICB9XG4gICAgaWYgKGV2ZW50TmFtZSA9PSBudWxsKSB7XG4gICAgICBldmVudE5hbWUgPSBcIlwiO1xuICAgIH1cbiAgICBpZiAoZGF0YSA9PSBudWxsKSB7XG4gICAgICBkYXRhID0ge307XG4gICAgfVxuICAgIHJldHVybiBNYXJpb25ldHRpc3QuQmFja2JvbmUuUmFkaW8uY2hhbm5lbChjaGFubmVsTmFtZSkucmVxdWVzdChldmVudE5hbWUsIGRhdGEpO1xuICB9O1xuXG4gIENoYW5uZWxzLnByb3RvdHlwZS5yZXBseU9uY2UgPSBmdW5jdGlvbihjaGFubmVsTmFtZSwgZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBjaGFubmVsO1xuICAgIGlmIChjaGFubmVsTmFtZSA9PSBudWxsKSB7XG4gICAgICBjaGFubmVsTmFtZSA9IFwiZ2xvYmFsXCI7XG4gICAgfVxuICAgIGlmIChldmVudE5hbWUgPT0gbnVsbCkge1xuICAgICAgZXZlbnROYW1lID0gXCJcIjtcbiAgICB9XG4gICAgY2hhbm5lbCA9IE1hcmlvbmV0dGlzdC5CYWNrYm9uZS5SYWRpby5jaGFubmVsKGNoYW5uZWxOYW1lKTtcbiAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihjYWxsYmFjaykpIHtcbiAgICAgIHJldHVybiBjaGFubmVsLnJlcGx5T25jZShldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNoYW5uZWwucmVwbHlPbmNlKGNhbGxiYWNrKTtcbiAgICB9XG4gIH07XG5cbiAgQ2hhbm5lbHMucHJvdG90eXBlLnJlcGx5ID0gZnVuY3Rpb24oY2hhbm5lbE5hbWUsIGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgY2hhbm5lbDtcbiAgICBpZiAoY2hhbm5lbE5hbWUgPT0gbnVsbCkge1xuICAgICAgY2hhbm5lbE5hbWUgPSBcImdsb2JhbFwiO1xuICAgIH1cbiAgICBpZiAoZXZlbnROYW1lID09IG51bGwpIHtcbiAgICAgIGV2ZW50TmFtZSA9IFwiXCI7XG4gICAgfVxuICAgIGNoYW5uZWwgPSBNYXJpb25ldHRpc3QuQmFja2JvbmUuUmFkaW8uY2hhbm5lbChjaGFubmVsTmFtZSk7XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgICByZXR1cm4gY2hhbm5lbC5yZXBseShldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNoYW5uZWwucmVwbHkoY2FsbGJhY2spO1xuICAgIH1cbiAgfTtcblxuICBDaGFubmVscy5wcm90b3R5cGUucHVibGlzaCA9IGZ1bmN0aW9uKGNoYW5uZWxOYW1lLCBldmVudE5hbWUsIGRhdGEpIHtcbiAgICBpZiAoY2hhbm5lbE5hbWUgPT0gbnVsbCkge1xuICAgICAgY2hhbm5lbE5hbWUgPSBcImdsb2JhbFwiO1xuICAgIH1cbiAgICBpZiAoZXZlbnROYW1lID09IG51bGwpIHtcbiAgICAgIGV2ZW50TmFtZSA9IFwiXCI7XG4gICAgfVxuICAgIGlmIChkYXRhID09IG51bGwpIHtcbiAgICAgIGRhdGEgPSB7fTtcbiAgICB9XG4gICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5CYWNrYm9uZS5SYWRpby5jaGFubmVsKGNoYW5uZWxOYW1lKS50cmlnZ2VyKGV2ZW50TmFtZSwgZGF0YSk7XG4gIH07XG5cbiAgQ2hhbm5lbHMucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uKGNoYW5uZWxOYW1lLCBldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgaWYgKGNoYW5uZWxOYW1lID09IG51bGwpIHtcbiAgICAgIGNoYW5uZWxOYW1lID0gXCJnbG9iYWxcIjtcbiAgICB9XG4gICAgaWYgKGV2ZW50TmFtZSA9PSBudWxsKSB7XG4gICAgICBldmVudE5hbWUgPSBcIlwiO1xuICAgIH1cbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0LkJhY2tib25lLlJhZGlvLmNoYW5uZWwoY2hhbm5lbE5hbWUpLm9uKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9O1xuXG4gIHJldHVybiBDaGFubmVscztcblxufSkoTWFyaW9uZXR0aXN0Lk9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IENoYW5uZWxzO1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi9jb3JlLmpzXCI7XG52YXIgTG9jYXRpb24sXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5Mb2NhdGlvbiA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChMb2NhdGlvbiwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gTG9jYXRpb24oKSB7fVxuXG4gIExvY2F0aW9uLnByb3RvdHlwZS5yZWZyZXNoUm91dGUgPSBmdW5jdGlvbihmcmFnbWVudCkge1xuICAgIGlmIChmcmFnbWVudCA9PSBudWxsKSB7XG4gICAgICBmcmFnbWVudCA9IHRoaXMuZ2V0Q3VycmVudFJvdXRlKCk7XG4gICAgfVxuICAgIHJldHVybiBNYXJpb25ldHRpc3QuQmFja2JvbmUuaGlzdG9yeS5sb2FkVXJsKGZyYWdtZW50KTtcbiAgfTtcblxuICBMb2NhdGlvbi5wcm90b3R5cGUubmF2aWdhdGVUbyA9IGZ1bmN0aW9uKHJvdXRlLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0LkJhY2tib25lLmhpc3RvcnkubmF2aWdhdGUocm91dGUsIG9wdGlvbnMpO1xuICB9O1xuXG4gIExvY2F0aW9uLnByb3RvdHlwZS5nZXRDdXJyZW50Um91dGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZnJhZztcbiAgICBmcmFnID0gTWFyaW9uZXR0aXN0LkJhY2tib25lLmhpc3RvcnkuZnJhZ21lbnQ7XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRW1wdHkoZnJhZykpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZnJhZztcbiAgICB9XG4gIH07XG5cbiAgTG9jYXRpb24ucHJvdG90eXBlLnN0YXJ0SGlzdG9yeSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIGlmIChNYXJpb25ldHRpc3QuQmFja2JvbmUuaGlzdG9yeSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gTWFyaW9uZXR0aXN0LkJhY2tib25lLmhpc3Rvcnkuc3RhcnQob3B0aW9ucyk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBMb2NhdGlvbjtcblxufSkoTWFyaW9uZXR0aXN0Lk9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IExvY2F0aW9uO1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi4vY29yZS5qc1wiO1xudmFyIFRlbXBsYXRlcztcblxuVGVtcGxhdGVzID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBUZW1wbGF0ZXMoKSB7fVxuXG4gIFRlbXBsYXRlcy5wcm90b3R5cGUuZGVidWcgPSBmYWxzZTtcblxuICBUZW1wbGF0ZXMucHJvdG90eXBlLmxvb2t1cFBhdGhzID0gW107XG5cbiAgVGVtcGxhdGVzLnByb3RvdHlwZS5lbmdpbmUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZW5naW5lO1xuICAgIGVuZ2luZSA9IHt9O1xuICAgIGlmICh0eXBlb2YgSEFNTCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBIQU1MICE9PSBudWxsKSB7XG4gICAgICBlbmdpbmUgPSBIQU1MO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIEpTVCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBKU1QgIT09IG51bGwpIHtcbiAgICAgIGVuZ2luZSA9IEpTVDtcbiAgICB9XG4gICAgcmV0dXJuIGVuZ2luZTtcbiAgfTtcblxuICBUZW1wbGF0ZXMucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKHRlbXBsYXRlTmFtZSwgZGF0YSwgb3B0aW9ucykge1xuICAgIHZhciBlbmdpbmUsIHRlbXBsYXRlO1xuICAgIGlmICh0ZW1wbGF0ZU5hbWUgPT0gbnVsbCkge1xuICAgICAgdGVtcGxhdGVOYW1lID0gXCJcIjtcbiAgICB9XG4gICAgaWYgKGRhdGEgPT0gbnVsbCkge1xuICAgICAgZGF0YSA9IHt9O1xuICAgIH1cbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHRlbXBsYXRlID0gXCJcIjtcbiAgICBlbmdpbmUgPSB0aGlzLmVuZ2luZTtcbiAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbih0ZW1wbGF0ZU5hbWUpKSB7XG4gICAgICBlbmdpbmUgPSBlbmdpbmUoKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuZGVmYXVsdFRlbXBsYXRlICE9IG51bGwpIHtcbiAgICAgIHRlbXBsYXRlID0gb3B0aW9ucy5kZWZhdWx0VGVtcGxhdGU7XG4gICAgfVxuICAgIGlmICgoZW5naW5lICE9IG51bGwpICYmIE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24oZW5naW5lW3RlbXBsYXRlTmFtZV0pKSB7XG4gICAgICB0ZW1wbGF0ZSA9IGVuZ2luZVt0ZW1wbGF0ZU5hbWVdKGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gdGVtcGxhdGU7XG4gIH07XG5cbiAgcmV0dXJuIFRlbXBsYXRlcztcblxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgVGVtcGxhdGVzO1xuIiwiaW1wb3J0IFRlbXBsYXRlcyBmcm9tIFwiLi9jb25maWcvdGVtcGxhdGVzLmpzXCI7XG5pbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbnZhciBDb25maWcsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5Db25maWcgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoQ29uZmlnLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBDb25maWcoKSB7XG4gICAgdGhpcy50ZW1wbGF0ZXMgPSBuZXcgVGVtcGxhdGVzKCk7XG4gIH1cblxuICByZXR1cm4gQ29uZmlnO1xuXG59KShNYXJpb25ldHRpc3QuT2JqZWN0KTtcblxuZXhwb3J0IGRlZmF1bHQgQ29uZmlnO1xuIiwidmFyIFJlbmRlcmVyO1xuXG5SZW5kZXJlciA9IHtcbiAgcmVuZGVyOiBmdW5jdGlvbih0ZW1wbGF0ZSwgZGF0YSkge1xuICAgIHZhciBlbmdpbmVUZW1wbGF0ZTtcbiAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbih0ZW1wbGF0ZSkpIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZShkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRlbXBsYXRlID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBlbmdpbmVUZW1wbGF0ZSA9IHRoaXMuZ2V0VGVtcGxhdGUodGVtcGxhdGUpO1xuICAgICAgaWYgKCFNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKGVuZ2luZVRlbXBsYXRlKSkge1xuICAgICAgICB0aHJvdyBcIlRlbXBsYXRlIFwiICsgdGVtcGxhdGUgKyBcIiB3YXMgbm90IGZvdW5kIVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGVuZ2luZVRlbXBsYXRlKGRhdGEpO1xuICAgIH1cbiAgfSxcbiAgZ2V0VGVtcGxhdGU6IGZ1bmN0aW9uKHRlbXBsYXRlKSB7XG4gICAgdmFyIGksIGosIGxlbiwgbGVuMSwgbG9va3VwLCBsb29rdXBQYXRoLCBsb29rdXBzLCBwYXRoLCB0ZW1wbGF0ZXM7XG4gICAgbG9va3VwcyA9IE1hcmlvbmV0dGlzdC5jb25maWcudGVtcGxhdGVzLmxvb2t1cFBhdGhzO1xuICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKGxvb2t1cHMpKSB7XG4gICAgICBsb29rdXBzID0gbG9va3VwcygpO1xuICAgIH1cbiAgICBpZiAoIU1hcmlvbmV0dGlzdC5fLmlzQXJyYXkobG9va3VwcykpIHtcbiAgICAgIHRocm93IFwibG9va3VwUGF0aHMgbW9zdCBiZSBhbiBhcnJheVwiO1xuICAgIH1cbiAgICB0ZW1wbGF0ZXMgPSBbdGVtcGxhdGVdO1xuICAgIGlmIChsb29rdXBzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgbG9va3VwcyA9IFtcIlwiXTtcbiAgICB9XG4gICAgZm9yIChpID0gMCwgbGVuID0gbG9va3Vwcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbG9va3VwID0gbG9va3Vwc1tpXTtcbiAgICAgIGZvciAoaiA9IDAsIGxlbjEgPSB0ZW1wbGF0ZXMubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICAgIHBhdGggPSB0ZW1wbGF0ZXNbal07XG4gICAgICAgIGxvb2t1cFBhdGggPSB0aGlzLmZpbmRMb29rdXBQYXRoKGxvb2t1cCArIHBhdGgsIHRlbXBsYXRlKTtcbiAgICAgICAgaWYgKGxvb2t1cFBhdGggIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBsb29rdXBQYXRoO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBmaW5kTG9va3VwUGF0aDogZnVuY3Rpb24ocGF0aCwgdGVtcGxhdGUpIHtcbiAgICB2YXIgZW5naW5lLCBsb29rdXBQYXRoO1xuICAgIGVuZ2luZSA9IE1hcmlvbmV0dGlzdC5jb25maWcudGVtcGxhdGVzLmVuZ2luZTtcbiAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihlbmdpbmUpKSB7XG4gICAgICBlbmdpbmUgPSBlbmdpbmUoKTtcbiAgICB9XG4gICAgbG9va3VwUGF0aCA9IGVuZ2luZVtwYXRoXTtcbiAgICBpZiAoTWFyaW9uZXR0aXN0LmNvbmZpZy50ZW1wbGF0ZXMuZGVidWcgPT09IHRydWUpIHtcbiAgICAgIE1hcmlvbmV0dGlzdC5sb2dnZXIuaW5mbyhcIkxvb2tpbmcgdGVtcGxhdGU6IFwiICsgdGVtcGxhdGUgKyBcIiBpbiAnXCIgKyBwYXRoICsgXCInXCIpO1xuICAgIH1cbiAgICBpZiAobG9va3VwUGF0aCkge1xuICAgICAgcmV0dXJuIGxvb2t1cFBhdGg7XG4gICAgfVxuICB9LFxuICB3aXRoVGVtcGxhdGU6IGZ1bmN0aW9uKHN0cmluZykge1xuICAgIHZhciBhcnJheTtcbiAgICBpZiAoc3RyaW5nICE9IG51bGwpIHtcbiAgICAgIGFycmF5ID0gc3RyaW5nLnNwbGl0KFwiL1wiKTtcbiAgICAgIGFycmF5LnNwbGljZSgtMSwgMCwgXCJ0ZW1wbGF0ZXNcIik7XG4gICAgICByZXR1cm4gYXJyYXkuam9pbihcIi9cIik7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBSZW5kZXJlcjtcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4vY29yZS5qc1wiO1xudmFyIFV0aWxzLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eSxcbiAgc2xpY2UgPSBbXS5zbGljZTtcblxuVXRpbHMgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoVXRpbHMsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIFV0aWxzKCkge1xuICAgIHJldHVybiBVdGlscy5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIFV0aWxzLnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlLCBjb250ZXh0LCBwYXJhbXMpIHtcbiAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIHZhbHVlID0gcGFyYW1zID8gdmFsdWUuYXBwbHkoY29udGV4dCwgcGFyYW1zKSA6IHZhbHVlLmNhbGwoY29udGV4dCk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICBVdGlscy5wcm90b3R5cGUucGF0aEZvciA9IGZ1bmN0aW9uKF9wYXRoKSB7XG4gICAgdmFyIHBhdGg7XG4gICAgcGF0aCA9IFwiXCI7XG4gICAgcGF0aCA9IFwiI1wiICsgX3BhdGg7XG4gICAgcmV0dXJuIHBhdGg7XG4gIH07XG5cbiAgVXRpbHMucHJvdG90eXBlLndhaXRGb3IgPSBmdW5jdGlvbihwcm9taXNlcywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgc3dpdGNoIChmYWxzZSkge1xuICAgICAgY2FzZSBvcHRpb25zLnByb21pc2VUeXBlICE9PSBcImJsdWViaXJkXCI6XG4gICAgICAgIHJldHVybiB0aGlzLl93YWl0Rm9yQmx1ZWJpcmQocHJvbWlzZXMsIG9wdGlvbnMpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dhaXRGb3JBamF4KHByb21pc2VzLCBvcHRpb25zKTtcbiAgICB9XG4gIH07XG5cbiAgVXRpbHMucHJvdG90eXBlLl93YWl0Rm9yQWpheCA9IGZ1bmN0aW9uKGFqYXhSZXF1ZXN0cywgb3B0aW9ucykge1xuICAgIHZhciByZWYsIHhocnM7XG4gICAgaWYgKGFqYXhSZXF1ZXN0cyA9PSBudWxsKSB7XG4gICAgICBhamF4UmVxdWVzdHMgPSBbXTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICB4aHJzID0gW107XG4gICAgeGhycyA9IE1hcmlvbmV0dGlzdC5fLmNoYWluKFthamF4UmVxdWVzdHNdKS5mbGF0dGVuKCkudmFsdWUoKTtcbiAgICBpZiAoeGhycy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gKHJlZiA9IE1hcmlvbmV0dGlzdC4kKS53aGVuLmFwcGx5KHJlZiwgeGhycykudGhlbigoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcmdzO1xuICAgICAgICBhcmdzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKG9wdGlvbnMuc3VjY2VzcykpIHtcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucy5zdWNjZXNzLmFwcGx5KG9wdGlvbnMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICB9KSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcmdzO1xuICAgICAgICBhcmdzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKG9wdGlvbnMuZXJyb3IpKSB7XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZXJyb3IuYXBwbHkob3B0aW9ucywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihvcHRpb25zLnN1Y2Nlc3MpKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLnN1Y2Nlc3MobnVsbCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIFV0aWxzLnByb3RvdHlwZS5fd2FpdEZvckJsdWViaXJkID0gZnVuY3Rpb24ocHJvbWlzZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHByb21pc2VzID0gTWFyaW9uZXR0aXN0Ll8uY2hhaW4oW3Byb21pc2VzXSkuZmxhdHRlbigpLnZhbHVlKCk7XG4gICAgaWYgKHByb21pc2VzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcy5tYXAoZnVuY3Rpb24ocHJvbWlzZSkge1xuICAgICAgICByZXR1cm4gcHJvbWlzZS5yZWZsZWN0KCk7XG4gICAgICB9KSkudGhlbihmdW5jdGlvbihpbnNwZWN0aW9ucykge1xuICAgICAgICB2YXIgZXJyb3JzLCBpLCBpbnNwZWN0aW9uLCBsZW4sIHN1Y2Nlc3NBcmdzO1xuICAgICAgICBzdWNjZXNzQXJncyA9IFtdO1xuICAgICAgICBlcnJvcnMgPSBbXTtcbiAgICAgICAgZm9yIChpID0gMCwgbGVuID0gaW5zcGVjdGlvbnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICBpbnNwZWN0aW9uID0gaW5zcGVjdGlvbnNbaV07XG4gICAgICAgICAgaWYgKGluc3BlY3Rpb24uaXNGdWxmaWxsZWQoKSkge1xuICAgICAgICAgICAgc3VjY2Vzc0FyZ3MucHVzaChpbnNwZWN0aW9uLnZhbHVlKCkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlcnJvcnMucHVzaChpbnNwZWN0aW9uLnJlYXNvbigpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24ob3B0aW9ucy5lcnJvcikpIHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zLmVycm9yLmFwcGx5KG9wdGlvbnMsIGVycm9ycyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKG9wdGlvbnMuc3VjY2VzcykpIHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zLnN1Y2Nlc3MuYXBwbHkob3B0aW9ucywgc3VjY2Vzc0FyZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKG9wdGlvbnMuc3VjY2VzcykpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuc3VjY2VzcyhudWxsKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFV0aWxzO1xuXG59KShNYXJpb25ldHRpc3QuT2JqZWN0KTtcblxuZXhwb3J0IGRlZmF1bHQgVXRpbHM7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbnZhciBMb2dnZXIsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5Mb2dnZXIgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoTG9nZ2VyLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBMb2dnZXIoKSB7fVxuXG4gIExvZ2dlci5wcm90b3R5cGUuc3VjY2VzcyA9IGZ1bmN0aW9uKG1zZywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgb3B0aW9ucy50eXBlID0gXCJzdWNjZXNzXCI7XG4gICAgcmV0dXJuIHRoaXMubG9nKG1zZywgb3B0aW9ucyk7XG4gIH07XG5cbiAgTG9nZ2VyLnByb3RvdHlwZS53YXJuID0gZnVuY3Rpb24obXNnLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBvcHRpb25zLnR5cGUgPSBcIndhcm5cIjtcbiAgICByZXR1cm4gdGhpcy5sb2cobXNnLCBvcHRpb25zKTtcbiAgfTtcblxuICBMb2dnZXIucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24obXNnLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBvcHRpb25zLnR5cGUgPSBcImVycm9yXCI7XG4gICAgcmV0dXJuIHRoaXMubG9nKG1zZywgb3B0aW9ucyk7XG4gIH07XG5cbiAgTG9nZ2VyLnByb3RvdHlwZS5pbmZvID0gZnVuY3Rpb24obXNnLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBvcHRpb25zLnR5cGUgPSBcImluZm9cIjtcbiAgICByZXR1cm4gdGhpcy5sb2cobXNnLCBvcHRpb25zKTtcbiAgfTtcblxuICBMb2dnZXIucHJvdG90eXBlLmxvZyA9IGZ1bmN0aW9uKG1zZywgb3B0aW9ucykge1xuICAgIHZhciBiZ2MsIGZvcmNlLCB0eXBlO1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgZm9yY2UgPSBvcHRpb25zLmZvcmNlO1xuICAgIHR5cGUgPSBvcHRpb25zLnR5cGU7XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5lbnYuaXNEZXZlbG9wbWVudCgpIHx8IGZvcmNlID09PSB0cnVlKSB7XG4gICAgICB0eXBlID0gdHlwZSB8fCAnYmxhY2snO1xuICAgICAgYmdjID0gJ1doaXRlJztcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgICB0eXBlID0gJ0dyZWVuJztcbiAgICAgICAgICBiZ2MgPSAnTGltZUdyZWVuJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnaW5mbyc6XG4gICAgICAgICAgdHlwZSA9ICdEb2RnZXJCbHVlJztcbiAgICAgICAgICBiZ2MgPSAnVHVycXVvaXNlJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICAgIHR5cGUgPSAnUmVkJztcbiAgICAgICAgICBiZ2MgPSAnQmxhY2snO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdzdGFydCc6XG4gICAgICAgICAgdHlwZSA9ICdPbGl2ZURyYWInO1xuICAgICAgICAgIGJnYyA9ICdQYWxlR3JlZW4nO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgICAgICB0eXBlID0gJ1RvbWF0byc7XG4gICAgICAgICAgYmdjID0gJ0JsYWNrJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgICB0eXBlID0gJ09yY2hpZCc7XG4gICAgICAgICAgYmdjID0gJ01lZGl1bVZpb2xldFJlZCc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdHlwZSA9IHR5cGU7XG4gICAgICB9XG4gICAgICBiZ2MgPSAnV2hpdGUnO1xuICAgICAgaWYgKHR5cGVvZiBtc2cgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnJWMnICsgbXNnLCAndHlwZTonICsgdHlwZSArICc7Zm9udC13ZWlnaHQ6Ym9sZDsgYmFja2dyb3VuZC10eXBlOiAnICsgYmdjICsgJzsnKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIExvZ2dlcjtcblxufSkoTWFyaW9uZXR0aXN0Lk9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IExvZ2dlcjtcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4vY29yZS5qc1wiO1xudmFyIEFwcFJvdXRlLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuQXBwUm91dGUgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoQXBwUm91dGUsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIEFwcFJvdXRlKCkge1xuICAgIHJldHVybiBBcHBSb3V0ZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIEFwcFJvdXRlLnByb3RvdHlwZS5yb3V0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRPcHRpb24oXCJyb3V0ZXJcIik7XG4gIH07XG5cbiAgQXBwUm91dGUucHJvdG90eXBlLnBhdGggPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRPcHRpb24oXCJwYXRoXCIpO1xuICB9O1xuXG4gIEFwcFJvdXRlLnByb3RvdHlwZS5hY3Rpb25OYW1lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uKFwiYWN0aW9uTmFtZVwiKTtcbiAgfTtcblxuICBBcHBSb3V0ZS5wcm90b3R5cGUuY29udHJvbGxlciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmdldE9wdGlvbihcImNvbnRyb2xsZXJcIik7XG4gIH07XG5cbiAgcmV0dXJuIEFwcFJvdXRlO1xuXG59KShNYXJpb25ldHRpc3QuT2JqZWN0KTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwUm91dGU7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbnZhciBBcHBSb3V0ZXIsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5BcHBSb3V0ZXIgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoQXBwUm91dGVyLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBBcHBSb3V0ZXIoKSB7XG4gICAgcmV0dXJuIEFwcFJvdXRlci5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIEFwcFJvdXRlci5wcm90b3R5cGUub25Sb3V0ZSA9IGZ1bmN0aW9uKG5hbWUsIHBhdGgsIGFyZ3MpIHtcbiAgICBpZiAoKHRoaXMuY29udHJvbGxlciAhPSBudWxsKSAmJiBNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKHRoaXMuY29udHJvbGxlci5vblJvdXRlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuY29udHJvbGxlci5vblJvdXRlKHRoaXMsIG5hbWUsIHBhdGgsIGFyZ3MpO1xuICAgIH1cbiAgfTtcblxuICBBcHBSb3V0ZXIucHJvdG90eXBlLl9zZXRDb250cm9sbGVyRmlsdGVycyA9IGZ1bmN0aW9uKGNvbnRyb2xsZXIpIHtcbiAgICB2YXIgZGVmYXVsdEZpbHRlcnMsIGZpbHRlcnM7XG4gICAgaWYgKGNvbnRyb2xsZXIgIT0gbnVsbCkge1xuICAgICAgZGVmYXVsdEZpbHRlcnMgPSB7XG4gICAgICAgIGJlZm9yZToge30sXG4gICAgICAgIGFmdGVyOiB7fVxuICAgICAgfTtcbiAgICAgIGZpbHRlcnMgPSBjb250cm9sbGVyLmZpbHRlcnM7XG4gICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihmaWx0ZXJzKSkge1xuICAgICAgICBmaWx0ZXJzID0gZmlsdGVycygpO1xuICAgICAgfVxuICAgICAgaWYgKGNvbnRyb2xsZXIuZmlsdGVycyA9PSBudWxsKSB7XG4gICAgICAgIGNvbnRyb2xsZXIuZmlsdGVycyA9IHt9O1xuICAgICAgfVxuICAgICAgY29udHJvbGxlci5maWx0ZXJzID0gTWFyaW9uZXR0aXN0Ll8uZXh0ZW5kKGRlZmF1bHRGaWx0ZXJzLCBmaWx0ZXJzKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRyb2xsZXI7XG4gIH07XG5cbiAgQXBwUm91dGVyLnByb3RvdHlwZS5fYWRkQXBwUm91dGUgPSBmdW5jdGlvbihjb250cm9sbGVyLCByb3V0ZSwgbWV0aG9kTmFtZSkge1xuICAgIHZhciBfbWV0aG9kLCBtZXRob2Q7XG4gICAgdGhpcy5jb250cm9sbGVyID0gdGhpcy5fc2V0Q29udHJvbGxlckZpbHRlcnMoY29udHJvbGxlcik7XG4gICAgX21ldGhvZCA9IGNvbnRyb2xsZXJbbWV0aG9kTmFtZV07XG4gICAgbWV0aG9kID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oYXJncykge1xuICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICBfdGhpcy5jb250cm9sbGVyLnJvdXRlID0gbmV3IE1hcmlvbmV0dGlzdC5BcHBSb3V0ZSh7XG4gICAgICAgICAgY29udHJvbGxlcjogX3RoaXMuY29udHJvbGxlcixcbiAgICAgICAgICBhY3Rpb25OYW1lOiBtZXRob2ROYW1lLFxuICAgICAgICAgIHBhdGg6IHJvdXRlXG4gICAgICAgIH0pO1xuICAgICAgICByZXN1bHQgPSBfdGhpcy5fZXhlY3V0ZUZpbHRlcihfdGhpcy5jb250cm9sbGVyLmZpbHRlcnMuYmVmb3JlLCBfdGhpcy5jb250cm9sbGVyKTtcbiAgICAgICAgaWYgKHJlc3VsdCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBfdGhpcy5jb250cm9sbGVyW21ldGhvZE5hbWVdLmFwcGx5KF90aGlzLmNvbnRyb2xsZXIsIF90aGlzLl9nZXRQYXJhbXMoKSk7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLl9leGVjdXRlRmlsdGVyKF90aGlzLmNvbnRyb2xsZXIuZmlsdGVycy5hZnRlciwgX3RoaXMuY29udHJvbGxlcik7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkodGhpcyk7XG4gICAgaWYgKCFtZXRob2QpIHtcbiAgICAgIHRocm93IG5ldyBNYXJpb25ldHRpc3QuTWFyaW9uZXR0ZS5FcnJvcignTWV0aG9kIFwiJyArIG1ldGhvZE5hbWUgKyAnXCIgd2FzIG5vdCBmb3VuZCBvbiB0aGUgY29udHJvbGxlcicpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yb3V0ZShyb3V0ZSwgbWV0aG9kTmFtZSwgTWFyaW9uZXR0aXN0Ll8uYmluZChtZXRob2QsIGNvbnRyb2xsZXIpKTtcbiAgfTtcblxuICBBcHBSb3V0ZXIucHJvdG90eXBlLl9leGVjdXRlRmlsdGVyID0gZnVuY3Rpb24oZmlsdGVyLCBjb250cm9sbGVyKSB7XG4gICAgdmFyIGZpbHRlclZhbHVlLCBpLCBsZW4sIG1ldGhvZE5hbWUsIHJlZiwgcmVzdWx0LCBzdG9wTXNnO1xuICAgIHJlc3VsdCA9IHRydWU7XG4gICAgcmVmID0gTWFyaW9uZXR0aXN0Ll8ua2V5cyhmaWx0ZXIpO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbWV0aG9kTmFtZSA9IHJlZltpXTtcbiAgICAgIGZpbHRlclZhbHVlID0gZmlsdGVyW21ldGhvZE5hbWVdO1xuICAgICAgc3RvcE1zZyA9IFwiQWN0aW9uIGhhbHRlZCBieSBmaWx0ZXIgJ1wiICsgbWV0aG9kTmFtZSArIFwiJ1wiO1xuICAgICAgc3dpdGNoIChmYWxzZSkge1xuICAgICAgICBjYXNlICFNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKGZpbHRlclZhbHVlKTpcbiAgICAgICAgICByZXN1bHQgPSBmaWx0ZXJWYWx1ZShjb250cm9sbGVyKTtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKHN0b3BNc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICFNYXJpb25ldHRpc3QuXy5pc09iamVjdChmaWx0ZXJWYWx1ZSk6XG4gICAgICAgICAgcmVzdWx0ID0gdGhpcy5fcHJvY2Nlc3NGaWx0ZXJPYmplY3QobWV0aG9kTmFtZSwgZmlsdGVyVmFsdWUsIGNvbnRyb2xsZXIpO1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oc3RvcE1zZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgQXBwUm91dGVyLnByb3RvdHlwZS5fZ2V0UGFyYW1zID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBhcmFtcywgcm91dGU7XG4gICAgcm91dGUgPSB0aGlzLl9yb3V0ZVRvUmVnRXhwKHRoaXMuY29udHJvbGxlci5yb3V0ZS5nZXRPcHRpb24oXCJwYXRoXCIpKTtcbiAgICByZXR1cm4gcGFyYW1zID0gdGhpcy5fZXh0cmFjdFBhcmFtZXRlcnMocm91dGUsIE1hcmlvbmV0dGlzdC5CYWNrYm9uZS5oaXN0b3J5LmdldEZyYWdtZW50KCkpO1xuICB9O1xuXG4gIEFwcFJvdXRlci5wcm90b3R5cGUuX3Byb2NjZXNzRmlsdGVyT2JqZWN0ID0gZnVuY3Rpb24obWV0aG9kTmFtZSwgZmlsdGVyLCBjb250cm9sbGVyKSB7XG4gICAgdmFyIGFjdGlvbk5hbWUsIGNvbnRyb2xsZXJNZXRob2QsIGRlZmF1bHRGaWx0ZXJPcHRpb25zLCBmaWx0ZXJPcHRpb25zO1xuICAgIGRlZmF1bHRGaWx0ZXJPcHRpb25zID0ge1xuICAgICAgbWV0aG9kOiBudWxsLFxuICAgICAgb25seTogW10sXG4gICAgICBleGNlcHQ6IFtdXG4gICAgfTtcbiAgICBmaWx0ZXJPcHRpb25zID0gTWFyaW9uZXR0aXN0Ll8uZXh0ZW5kKGRlZmF1bHRGaWx0ZXJPcHRpb25zLCBmaWx0ZXIpO1xuICAgIGNvbnRyb2xsZXJNZXRob2QgPSBjb250cm9sbGVyW21ldGhvZE5hbWVdO1xuICAgIGFjdGlvbk5hbWUgPSBjb250cm9sbGVyLnJvdXRlLmFjdGlvbk5hbWUoKTtcbiAgICBpZiAoIU1hcmlvbmV0dGlzdC5fLmlzQXJyYXkoZmlsdGVyT3B0aW9ucy5vbmx5KSkge1xuICAgICAgdGhyb3cgXCJmaWx0ZXIgb3B0aW9uIG9ubHksIG1vc3QgYmUgYW4gYXJyYXlcIjtcbiAgICB9XG4gICAgaWYgKCFNYXJpb25ldHRpc3QuXy5pc0FycmF5KGZpbHRlck9wdGlvbnMuZXhjZXB0KSkge1xuICAgICAgdGhyb3cgXCJmaWx0ZXIgb3B0aW9uIGV4Y2VwdCwgbW9zdCBiZSBhbiBhcnJheVwiO1xuICAgIH1cbiAgICBpZiAoZmlsdGVyT3B0aW9ucy5vbmx5Lmxlbmd0aCA+IDAgfHwgZmlsdGVyT3B0aW9ucy5leGNlcHQubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKE1hcmlvbmV0dGlzdC5fLmNvbnRhaW5zKGZpbHRlck9wdGlvbnMub25seSwgYWN0aW9uTmFtZSkgJiYgIU1hcmlvbmV0dGlzdC5fLmNvbnRhaW5zKGZpbHRlck9wdGlvbnMuZXhjZXB0LCBhY3Rpb25OYW1lKSkge1xuICAgICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihjb250cm9sbGVyTWV0aG9kKSkge1xuICAgICAgICAgIHJldHVybiBjb250cm9sbGVyTWV0aG9kLmFwcGx5KHRoaXMuY29udHJvbGxlciwgdGhpcy5fZ2V0UGFyYW1zKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKGNvbnRyb2xsZXJNZXRob2QpKSB7XG4gICAgICAgIHJldHVybiBjb250cm9sbGVyTWV0aG9kLmFwcGx5KHRoaXMuY29udHJvbGxlciwgdGhpcy5fZ2V0UGFyYW1zKCkpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gQXBwUm91dGVyO1xuXG59KShNYXJpb25ldHRpc3QuQXBwUm91dGVyKTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwUm91dGVyO1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi9jb3JlLmpzXCI7XG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tIFwiYmFja2JvbmUubWFyaW9uZXR0ZVwiO1xudmFyIFJlZ2lvbiwgX3Nob3csXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5fc2hvdyA9IE1hcmlvbmV0dGUuUmVnaW9uLnByb3RvdHlwZS5zaG93O1xuXG5SZWdpb24gPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoUmVnaW9uLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBSZWdpb24oKSB7XG4gICAgcmV0dXJuIFJlZ2lvbi5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIFJlZ2lvbi5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKHZpZXcsIG9wdGlvbnMpIHtcbiAgICB2YXIgYXJncywgb2xkVmlldywgcHJldmVudERlc3Ryb3ksIHNob3dDdXJyZW50VmlldywgdHJhbnNpdGlvbk91dCwgdmFsdWU7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgcHJldmVudERlc3Ryb3kgPSBvcHRpb25zLnByZXZlbnREZXN0cm95ID09PSB0cnVlO1xuICAgIHRyYW5zaXRpb25PdXQgPSBvcHRpb25zLnRyYW5zaXRpb25PdXQ7XG4gICAgZGVsZXRlIG9wdGlvbnMudHJhbnNpdGlvbk91dDtcbiAgICBhcmdzID0gW3ZpZXcsIG9wdGlvbnNdO1xuICAgIGlmICh0cmFuc2l0aW9uT3V0ID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIF9zaG93LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvbGRWaWV3ID0gdGhpcy5jdXJyZW50VmlldztcbiAgICAgIHNob3dDdXJyZW50VmlldyA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF9zaG93LmFwcGx5KF90aGlzLCBhcmdzKTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpO1xuICAgICAgaWYgKChvbGRWaWV3ICE9IG51bGwpICYmIE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24ob2xkVmlldy50cmFuc2l0aW9uT3V0KSkge1xuICAgICAgICBvbGRWaWV3LnRyaWdnZXJNZXRob2QoXCJiZWZvcmU6dHJhbnNpdGlvbjpvdXRcIik7XG4gICAgICAgIHZhbHVlID0gb2xkVmlldy50cmFuc2l0aW9uT3V0KCk7XG4gICAgICAgIGlmICgodmFsdWUgIT0gbnVsbCA/IHZhbHVlLnRoZW4gOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWUudGhlbigoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNob3dDdXJyZW50VmlldygpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KSh0aGlzKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgXCJ0cmFuc2l0aW9uT3V0IG1ldGhvZCBtb3N0IHJldHVybiBhIHByb21pc2VcIjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNob3dDdXJyZW50VmlldygpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gUmVnaW9uO1xuXG59KShNYXJpb25ldHRlLlJlZ2lvbik7XG5cbmV4cG9ydCBkZWZhdWx0IFJlZ2lvbjtcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4vY29yZS5qc1wiO1xudmFyIFZpZXdzLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eSxcbiAgc2xpY2UgPSBbXS5zbGljZTtcblxuVmlld3MgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoVmlld3MsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIFZpZXdzKCkge1xuICAgIHJldHVybiBWaWV3cy5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIFZpZXdzLnByb3RvdHlwZS50ZW1wbGF0ZUhlbHBlcnMgPSB7XG4gICAgcGF0aEZvcjogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncywgcmVmO1xuICAgICAgYXJncyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgcmV0dXJuIChyZWYgPSBNYXJpb25ldHRpc3QudXRpbHMpLnBhdGhGb3IuYXBwbHkocmVmLCBhcmdzKTtcbiAgICB9LFxuICAgIF86IE1hcmlvbmV0dGlzdC5fLFxuICAgIHM6IE1hcmlvbmV0dGlzdC5zLFxuICAgIHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MsIHJlZjtcbiAgICAgIGFyZ3MgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgIHJldHVybiAocmVmID0gTWFyaW9uZXR0aXN0LkkxOG4pLnQuYXBwbHkocmVmLCBhcmdzKTtcbiAgICB9LFxuICAgIE1udDogTWFyaW9uZXR0aXN0LFxuICAgIGZvcm1hdEN1cnJlbmN5OiBmdW5jdGlvbihhbW91bnQsIGZvcm1hdCkge1xuICAgICAgaWYgKGZvcm1hdCA9PSBudWxsKSB7XG4gICAgICAgIGZvcm1hdCA9IFwiJDAsMC4wMFwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5udW1lcmFsKGFtb3VudCkuZm9ybWF0KGZvcm1hdCk7XG4gICAgfSxcbiAgICBmb3JtYXROdW1iZXI6IGZ1bmN0aW9uKGFtb3VudCwgZm9ybWF0KSB7XG4gICAgICBpZiAoZm9ybWF0ID09IG51bGwpIHtcbiAgICAgICAgZm9ybWF0ID0gXCIwLDAuMDBcIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNYXJpb25ldHRpc3QubnVtZXJhbChhbW91bnQpLmZvcm1hdChmb3JtYXQpO1xuICAgIH0sXG4gICAgZm9ybWF0UGVyY2VudGFnZTogZnVuY3Rpb24oYW1vdW50LCBmb3JtYXQpIHtcbiAgICAgIGlmIChmb3JtYXQgPT0gbnVsbCkge1xuICAgICAgICBmb3JtYXQgPSBcIjAuMDAlXCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWFyaW9uZXR0aXN0Lm51bWVyYWwoYW1vdW50KS5mb3JtYXQoZm9ybWF0KTtcbiAgICB9LFxuICAgIGZvcm1hdERhdGU6IGZ1bmN0aW9uKGRhdGUsIGZvcm1hdCkge1xuICAgICAgaWYgKGZvcm1hdCA9PSBudWxsKSB7XG4gICAgICAgIGZvcm1hdCA9IFwiREQtTU0tWVlZWVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5tb21lbnQoZGF0ZSkuZm9ybWF0KGZvcm1hdCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBWaWV3cztcblxufSkoTWFyaW9uZXR0aXN0Lk9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IFZpZXdzO1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi4vY29yZS5qc1wiO1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSBcImJhY2tib25lLm1hcmlvbmV0dGVcIjtcbnZhciBCYXNlVmlldyxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkJhc2VWaWV3ID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKEJhc2VWaWV3LCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBCYXNlVmlldygpIHtcbiAgICByZXR1cm4gQmFzZVZpZXcuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICByZXR1cm4gQmFzZVZpZXc7XG5cbn0pKE1hcmlvbmV0dGUuVmlldyk7XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VWaWV3O1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi4vY29yZS5qc1wiO1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSBcImJhY2tib25lLm1hcmlvbmV0dGVcIjtcbnZhciBDb2xsZWN0aW9uVmlldyxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkNvbGxlY3Rpb25WaWV3ID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKENvbGxlY3Rpb25WaWV3LCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBDb2xsZWN0aW9uVmlldygpIHtcbiAgICByZXR1cm4gQ29sbGVjdGlvblZpZXcuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICByZXR1cm4gQ29sbGVjdGlvblZpZXc7XG5cbn0pKE1hcmlvbmV0dGUuQ29sbGVjdGlvblZpZXcpO1xuXG5leHBvcnQgZGVmYXVsdCBDb2xsZWN0aW9uVmlldztcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4uLy4uL2NvcmUuanNcIjtcbmltcG9ydCBCYWNrYm9uZSBmcm9tIFwiYmFja2JvbmVcIjtcbnZhciBCYXNlLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuQmFzZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChCYXNlLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBCYXNlKCkge1xuICAgIHJldHVybiBCYXNlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIEJhc2U7XG5cbn0pKEJhY2tib25lLk1vZGVsKTtcblxuZXhwb3J0IGRlZmF1bHQgQmFzZTtcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4uLy4uL2NvcmUuanNcIjtcbmltcG9ydCBCYWNrYm9uZSBmcm9tIFwiYmFja2JvbmVcIjtcbnZhciBCYXNlLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuQmFzZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChCYXNlLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBCYXNlKCkge1xuICAgIHJldHVybiBCYXNlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIEJhc2U7XG5cbn0pKEJhY2tib25lLkNvbGxlY3Rpb24pO1xuXG5leHBvcnQgZGVmYXVsdCBCYXNlO1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi4vLi4vY29yZS5qc1wiO1xuaW1wb3J0IE1vZGVsQmFzZSBmcm9tIFwiLi4vLi4vZW50aXRpZXMvbW9kZWxzL2Jhc2UuanNcIjtcbmltcG9ydCBCYXNlVmlldyBmcm9tIFwiLi4vLi4vdmlld3MvYmFzZS5qc1wiO1xudmFyIEJhc2UsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5LFxuICBzbGljZSA9IFtdLnNsaWNlO1xuXG5CYXNlID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKEJhc2UsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIEJhc2Uob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgQmFzZS5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICB0aGlzLl9pbnN0YW5jZV9pZCA9IE1hcmlvbmV0dGlzdC5fLnVuaXF1ZUlkKFwicmVzcG9uZGVyXCIpO1xuICAgIHRoaXMucmVnaXN0ZXIodGhpcywgdGhpcy5faW5zdGFuY2VfaWQpO1xuICB9XG5cbiAgQmFzZS5wcm90b3R5cGUubG9hZGVyVmlldyA9IEJhc2VWaWV3LmV4dGVuZCh7XG4gICAgdGVtcGxhdGU6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHJldHVybiBNYXJpb25ldHRpc3QuY29uZmlnLnRlbXBsYXRlcy5yZW5kZXIoXCJtYXJpb25ldHRpc3QvbG9hZGVyXCIsIGRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cXCdtcmktbG9hZGVyXFwnPlxcbiAgPGRpdiBjbGFzcz1cXCdtcmktbG9hZGVyX19jb250ZW50XFwnPlxcbiAgICA8aSBjbGFzcz1cImZhIGZhLXNwaW5uZXIgZmEtc3BpbiBmYS0yeCBmYS1md1wiPjwvaT5cXG4gICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+TG9hZGluZy4uLjwvc3Bhbj5cXG4gIDwvZGl2PlxcbjwvZGl2PidcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgQmFzZS5wcm90b3R5cGUuZ2V0TG9hZGVyVmlldyA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLmdldChcImxvYWRlclZpZXdcIikgPT0gbnVsbCkge1xuICAgICAgdGhpcy5zZXQoe1xuICAgICAgICBsb2FkZXJWaWV3OiBuZXcgdGhpcy5sb2FkZXJWaWV3XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2V0KFwibG9hZGVyVmlld1wiKTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzO1xuICAgIGFyZ3MgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICBCYXNlLl9fc3VwZXJfXy5jbG9zZS5jYWxsKHRoaXMsIGFyZ3MpO1xuICAgIHJldHVybiB0aGlzLnVucmVnaXN0ZXIodGhpcywgdGhpcy5faW5zdGFuY2VfaWQpO1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbih2aWV3LCBvcHRpb25zKSB7XG4gICAgdmFyIGZldGNoT3B0aW9ucywgbG9hZGVyVmlldywgcmVnaW9uO1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgZmV0Y2hPcHRpb25zID0ge307XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzT2JqZWN0KG9wdGlvbnMpICYmIE1hcmlvbmV0dGlzdC5fLmlzT2JqZWN0KG9wdGlvbnMuZmV0Y2gpKSB7XG4gICAgICBmZXRjaE9wdGlvbnMgPSBvcHRpb25zLmZldGNoO1xuICAgIH1cbiAgICByZWdpb24gPSBvcHRpb25zLnJlZ2lvbiAhPSBudWxsID8gb3B0aW9ucy5yZWdpb24gOiB0aGlzLmdldChcInJlZ2lvblwiKTtcbiAgICB0aGlzLmxpc3RlblRvKHZpZXcsIFwiY2xvc2VcIiwgdGhpcy5jbG9zZSk7XG4gICAgaWYgKG9wdGlvbnMuYXN5bmMgIT0gbnVsbCkge1xuICAgICAgaWYgKG9wdGlvbnMubG9hZGVyVmlldyAhPT0gZmFsc2UpIHtcbiAgICAgICAgbG9hZGVyVmlldyA9IHRoaXMuZ2V0TG9hZGVyVmlldygpO1xuICAgICAgICB0aGlzLmxpc3RlblRvKGxvYWRlclZpZXcsIFwiY2xvc2VcIiwgdGhpcy5jbG9zZSk7XG4gICAgICAgIHJlZ2lvbi5zaG93KGxvYWRlclZpZXcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuZmV0Y2goZmV0Y2hPcHRpb25zKS50aGVuKCgoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChvcHRpb25zLmxvYWRlclZpZXcgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAocmVnaW9uLmN1cnJlbnRWaWV3ICE9PSBsb2FkZXJWaWV3KSB7XG4gICAgICAgICAgICAgIHJldHVybiB2aWV3LmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZWdpb24uc2hvdyh2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpKSwgZnVuY3Rpb24oKSB7fSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZWdpb24uc2hvdyh2aWV3KTtcbiAgICB9XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUuZGVmYXVsdHMgPSB7XG4gICAgcGFyYW1zOiB7fSxcbiAgICBhc3luYzogW11cbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS53YWl0Rm9yID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MsIHJlZjtcbiAgICBhcmdzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgcmV0dXJuIChyZWYgPSBNYXJpb25ldHRpc3QudXRpbHMpLndhaXRGb3IuYXBwbHkocmVmLCBhcmdzKTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5kZWZlcnJlZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBNYXJpb25ldHRpc3QuJC5EZWZlcnJlZCgpO1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLmZldGNoID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHZhciBhc3luY0ZldGNoZXMsIGRlZmVycmVkO1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgZGVmZXJyZWQgPSB0aGlzLmRlZmVycmVkKCk7XG4gICAgYXN5bmNGZXRjaGVzID0gTWFyaW9uZXR0aXN0Ll8uY2hhaW4oW3RoaXMuZ2V0KFwiYXN5bmNcIildKS5mbGF0dGVuKCkuY29tcGFjdCgpLnZhbHVlKCk7XG4gICAgdGhpcy53YWl0Rm9yKGFzeW5jRmV0Y2hlcywge1xuICAgICAgc3VjY2VzczogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKG9wdGlvbnMuc3VjY2VzcykpIHtcbiAgICAgICAgICBvcHRpb25zLnN1Y2Nlc3MoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgfSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24ob3B0aW9ucy5lcnJvcikpIHtcbiAgICAgICAgICBvcHRpb25zLmVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnJlamVjdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmRlZmVycmVkKCkucHJvbWlzZSgpO1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5kZWZlcnJlZCgpLnByb21pc2UoKTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uKGluc3RhbmNlLCBpZCkge1xuICAgIGlmICh0aGlzLl9yZWdpc3RyeSA9PSBudWxsKSB7XG4gICAgICB0aGlzLl9yZWdpc3RyeSA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcmVnaXN0cnlbaWRdID0gaW5zdGFuY2U7XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUudW5yZWdpc3RlciA9IGZ1bmN0aW9uKGluc3RhbmNlLCBpZCkge1xuICAgIHJldHVybiBkZWxldGUgdGhpcy5fcmVnaXN0cnlbaWRdO1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLnJlc2V0UmVnaXN0cnkgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIga2V5LCBtc2csIG9sZENvdW50LCByZWYsIHJlc3BvbmRlcjtcbiAgICBvbGRDb3VudCA9IHRoaXMuZ2V0UmVnaXN0cnlTaXplKCk7XG4gICAgcmVmID0gdGhpcy5fcmVnaXN0cnk7XG4gICAgZm9yIChrZXkgaW4gcmVmKSB7XG4gICAgICByZXNwb25kZXIgPSByZWZba2V5XTtcbiAgICAgIHJlc3BvbmRlci5yZWdpb24uY2xvc2UoKTtcbiAgICB9XG4gICAgbXNnID0gXCJUaGVyZSB3ZXJlIFwiICsgb2xkQ291bnQgKyBcIiByZXNwb25kZXJzIGluIHRoZSByZWdpc3RyeSwgdGhlcmUgYXJlIG5vdyBcIiArICh0aGlzLmdldFJlZ2lzdHJ5U2l6ZSgpKTtcbiAgICBpZiAodGhpcy5nZXRSZWdpc3RyeVNpemUoKSA+IDApIHtcbiAgICAgIHJldHVybiBjb25zb2xlLndhcm4obXNnLCB0aGlzLl9yZWdpc3RyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjb25zb2xlLmxvZyhtc2cpO1xuICAgIH1cbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5nZXRSZWdpc3RyeVNpemUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0Ll8uc2l6ZSh0aGlzLl9yZWdpc3RyeSk7XG4gIH07XG5cbiAgcmV0dXJuIEJhc2U7XG5cbn0pKE1vZGVsQmFzZSk7XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2U7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuLi8uLi9jb3JlLmpzXCI7XG5pbXBvcnQgQmFja2JvbmUgZnJvbSBcImJhY2tib25lXCI7XG5pbXBvcnQgQmFzZU1vZGVsIGZyb20gXCIuLi8uLi9lbnRpdGllcy9tb2RlbHMvYmFzZS5qc1wiO1xuaW1wb3J0IEJhc2VDb2xsZWN0aW9uIGZyb20gXCIuLi8uLi9lbnRpdGllcy9jb2xsZWN0aW9ucy9iYXNlLmpzXCI7XG5pbXBvcnQgQmFzZVJlc3BvbmRlciBmcm9tIFwiLi4vLi4vZW50aXRpZXMvcmVzcG9uZGVycy9iYXNlLmpzXCI7XG52YXIgQmFzZSxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkJhc2UgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoQmFzZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQmFzZSgpIHtcbiAgICByZXR1cm4gQmFzZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIEJhc2UucHJvdG90eXBlLnJlc3BvbmRlcnMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYmFzZTogQmFzZVJlc3BvbmRlclxuICAgIH07XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUubW9kZWxzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJhc2U6IEJhc2VNb2RlbFxuICAgIH07XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUuY29sbGVjdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYmFzZTogQmFzZUNvbGxlY3Rpb25cbiAgICB9O1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLnZpZXdzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLmdldFJlc3BvbmRlciA9IGZ1bmN0aW9uKHJlc3BvbmRlck5hbWUsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldFJlc291cmNlKFwicmVzcG9uZGVyc1wiLCByZXNwb25kZXJOYW1lLCBvcHRpb25zKTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5nZXRWaWV3ID0gZnVuY3Rpb24odmlld05hbWUsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldFJlc291cmNlKFwidmlld3NcIiwgdmlld05hbWUsIG9wdGlvbnMpO1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLmdldE1vZGVsID0gZnVuY3Rpb24obW9kZWxOYW1lLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZXRSZXNvdXJjZShcIm1vZGVsc1wiLCBtb2RlbE5hbWUsIG9wdGlvbnMpO1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLmdldENvbGxlY3Rpb24gPSBmdW5jdGlvbihjb2xsZWN0aW9uTmFtZSwgbW9kZWxzLCBvcHRpb25zKSB7XG4gICAgaWYgKG1vZGVscyA9PSBudWxsKSB7XG4gICAgICBtb2RlbHMgPSBbXTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZXRSZXNvdXJjZShcImNvbGxlY3Rpb25zXCIsIGNvbGxlY3Rpb25OYW1lLCBvcHRpb25zLCBtb2RlbHMpO1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLmdldFJlc291cmNlID0gZnVuY3Rpb24ocmVzb3VyY2VzTmFtZSwgcmVzb3VyY2VOYW1lLCBvcHRpb25zLCBtb2RlbHMpIHtcbiAgICB2YXIgcmVzb3VyY2UsIHJlc291cmNlcztcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHJlc291cmNlID0gbnVsbDtcbiAgICByZXNvdXJjZXMgPSB0aGlzW3Jlc291cmNlc05hbWVdO1xuICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKHJlc291cmNlcykpIHtcbiAgICAgIHJlc291cmNlcyA9IHJlc291cmNlcygpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy52aWV3TW9kZWwgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy52aWV3TW9kZWwgPSB0aGlzO1xuICAgIH1cbiAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNPYmplY3QocmVzb3VyY2VzKSAmJiAocmVzb3VyY2VzW3Jlc291cmNlTmFtZV0gIT0gbnVsbCkpIHtcbiAgICAgIGlmIChtb2RlbHMgIT0gbnVsbCkge1xuICAgICAgICByZXNvdXJjZSA9IG5ldyByZXNvdXJjZXNbcmVzb3VyY2VOYW1lXShtb2RlbHMsIG9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb3VyY2UgPSBuZXcgcmVzb3VyY2VzW3Jlc291cmNlTmFtZV0ob3B0aW9ucyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXNvdXJjZTtcbiAgfTtcblxuICByZXR1cm4gQmFzZTtcblxufSkoQmFja2JvbmUuTW9kZWwpO1xuXG5leHBvcnQgZGVmYXVsdCBCYXNlO1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi4vY29yZS5qc1wiO1xudmFyIEJhc2UsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5CYXNlID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKEJhc2UsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIEJhc2UoKSB7XG4gICAgcmV0dXJuIEJhc2UuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBCYXNlLnByb3RvdHlwZS5uYXZpZ2F0ZVRvID0gZnVuY3Rpb24ocm91dGUsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHJldHVybiBNYXJpb25ldHRpc3QubG9jYXRpb24ubmF2aWdhdGVUbyhyb3V0ZSwgb3B0aW9ucyk7XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUuZ2V0Q3VycmVudFJvdXRlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5sb2NhdGlvbi5nZXRDdXJyZW50Um91dGUoKTtcbiAgfTtcblxuICByZXR1cm4gQmFzZTtcblxufSkoTWFyaW9uZXR0aXN0Lk9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2U7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbnZhciBBcHBsaWNhdGlvbixcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkFwcGxpY2F0aW9uID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKEFwcGxpY2F0aW9uLCBzdXBlckNsYXNzKTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuQ29udHJvbGxlcnMgPSBuZXcgTWFyaW9uZXR0aXN0Lk9iamVjdCgpO1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5FbnRpdGllcyA9IG5ldyBNYXJpb25ldHRpc3QuT2JqZWN0KCk7XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLlZpZXdzID0gbmV3IE1hcmlvbmV0dGlzdC5PYmplY3QoKTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuX2lzUnVubmluZyA9IGZhbHNlO1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5faXNEZXN0cm95ZWQgPSBmYWxzZTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUucHJldmVudERlc3Ryb3kgPSBmYWxzZTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuc3RhcnRBZnRlckluaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLnN0YXJ0V2l0aFBhcmVudCA9IGZhbHNlO1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5zdG9wV2l0aFBhcmVudCA9IHRydWU7XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLnJlc291cmNlcyA9IFtdO1xuXG4gIGZ1bmN0aW9uIEFwcGxpY2F0aW9uKG9wdGlvbnMpIHtcbiAgICBBcHBsaWNhdGlvbi5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICB0aGlzLl9pbml0Q2hpbGRBcHBzKG9wdGlvbnMpO1xuICAgIGlmIChNYXJpb25ldHRpc3QuXy5yZXN1bHQodGhpcywgJ3N0YXJ0QWZ0ZXJJbml0aWFsaXplZCcpKSB7XG4gICAgICB0aGlzLnN0YXJ0KG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5zdGFydEhpc3RvcnkgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBpZiAoIU1hcmlvbmV0dGlzdC5CYWNrYm9uZS5IaXN0b3J5LnN0YXJ0ZWQpIHtcbiAgICAgIHJldHVybiBNYXJpb25ldHRpc3QubG9jYXRpb24uc3RhcnRIaXN0b3J5KG9wdGlvbnMpO1xuICAgIH1cbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdGhpcy50cmlnZ2VyTWV0aG9kKFwiYmVmb3JlOnJlc291cmNlczpmZXRjaFwiLCBvcHRpb25zKTtcbiAgICBpZiAodGhpcy5yZXNvdXJjZXMgPT0gbnVsbCkge1xuICAgICAgdGhpcy5yZXNvdXJjZXMgPSBbXTtcbiAgICB9XG4gICAgcmV0dXJuIE1hcmlvbmV0dGlzdC51dGlscy53YWl0Rm9yKHRoaXMucmVzb3VyY2VzLCB7XG4gICAgICBzdWNjZXNzOiAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIEFwcGxpY2F0aW9uLl9fc3VwZXJfXy5zdGFydC5jYWxsKF90aGlzLCBvcHRpb25zKTtcbiAgICAgICAgICBfdGhpcy50cmlnZ2VyTWV0aG9kKFwicmVzb3VyY2VzOmZldGNoOnN1Y2Nlc3NcIik7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLnRyaWdnZXJNZXRob2QoXCJyZWFkeVwiKTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpLFxuICAgICAgZXJyb3I6IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLnRyaWdnZXJNZXRob2QoXCJyZXNvdXJjZXM6ZmV0Y2g6ZXJyb3JcIik7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKVxuICAgIH0pO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5pc1J1bm5pbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5faXNSdW5uaW5nO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIGlmICghdGhpcy5faXNSdW5uaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdGhpcy50cmlnZ2VyTWV0aG9kKCdiZWZvcmU6c3RvcCcsIG9wdGlvbnMpO1xuICAgIHRoaXMuX2lzUnVubmluZyA9IGZhbHNlO1xuICAgIHRoaXMudHJpZ2dlck1ldGhvZCgnc3RvcCcsIG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5faW5pdENoaWxkQXBwcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjaGlsZEFwcHMsIG9wdGlvbnM7XG4gICAgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHZvaWQgMCA/IHt9IDogYXJndW1lbnRzWzBdO1xuICAgIHRoaXMuX2NoaWxkQXBwcyA9IHt9O1xuICAgIHRoaXMubWVyZ2VPcHRpb25zKG9wdGlvbnMsIFsnY2hpbGRBcHBzJywgJ2NoaWxkQXBwT3B0aW9ucyddKTtcbiAgICBjaGlsZEFwcHMgPSB0aGlzLmNoaWxkQXBwcztcbiAgICBpZiAoY2hpbGRBcHBzKSB7XG4gICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihjaGlsZEFwcHMpKSB7XG4gICAgICAgIGNoaWxkQXBwcyA9IGNoaWxkQXBwcy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgdGhpcy5hZGRDaGlsZEFwcHMoY2hpbGRBcHBzKTtcbiAgICB9XG4gICAgdGhpcy5faW5pdExpc3RlbmVycygpO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5faW5pdExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMub24oe1xuICAgICAgJ3N0YXJ0JzogdGhpcy5fc3RhcnRDaGlsZEFwcHMsXG4gICAgICAnYmVmb3JlOnN0b3AnOiB0aGlzLl9zdG9wQ2hpbGRBcHBzLFxuICAgICAgJ2JlZm9yZTpkZXN0cm95JzogdGhpcy5fZGVzdHJveUNoaWxkQXBwc1xuICAgIH0pO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5fc3RhcnRDaGlsZEFwcHMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5fLmVhY2godGhpcy5fY2hpbGRBcHBzLCBmdW5jdGlvbihjaGlsZEFwcCkge1xuICAgICAgaWYgKE1hcmlvbmV0dGlzdC51dGlscy5nZXRWYWx1ZShjaGlsZEFwcC5nZXRPcHRpb24oXCJzdGFydFdpdGhQYXJlbnRcIikpID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBjaGlsZEFwcC5zdGFydChvcHRpb25zKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuX3N0b3BDaGlsZEFwcHMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5fLmVhY2godGhpcy5fY2hpbGRBcHBzLCBmdW5jdGlvbihjaGlsZEFwcCkge1xuICAgICAgaWYgKE1hcmlvbmV0dGlzdC5fLnJlc3VsdChjaGlsZEFwcCwgJ3N0b3BXaXRoUGFyZW50JykpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkQXBwLnN0b3Aob3B0aW9ucyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLl9kZXN0cm95Q2hpbGRBcHBzID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHJldHVybiBNYXJpb25ldHRpc3QuXy5lYWNoKHRoaXMuX2NoaWxkQXBwcywgZnVuY3Rpb24oY2hpbGRBcHApIHtcbiAgICAgIGlmICghTWFyaW9uZXR0aXN0Ll8ucmVzdWx0KGNoaWxkQXBwLCAncHJldmVudERlc3Ryb3knKSkge1xuICAgICAgICByZXR1cm4gY2hpbGRBcHAuZGVzdHJveShvcHRpb25zKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuX2J1aWxkQXBwRnJvbU9iamVjdCA9IGZ1bmN0aW9uKGFwcENvbmZpZykge1xuICAgIHZhciBBcHBDbGFzcywgb3B0aW9ucztcbiAgICBBcHBDbGFzcyA9IGFwcENvbmZpZy5BcHBDbGFzcztcbiAgICBvcHRpb25zID0gTWFyaW9uZXR0aXN0Ll8ub21pdChhcHBDb25maWcsICdBcHBDbGFzcycpO1xuICAgIHJldHVybiB0aGlzLmJ1aWxkQXBwKEFwcENsYXNzLCBvcHRpb25zKTtcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuX2J1aWxkQXBwID0gZnVuY3Rpb24oQXBwQ2xhc3MsIG9wdGlvbnMpIHtcbiAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihBcHBDbGFzcykpIHtcbiAgICAgIHJldHVybiB0aGlzLmJ1aWxkQXBwKEFwcENsYXNzLCBvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzT2JqZWN0KEFwcENsYXNzKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2J1aWxkQXBwRnJvbU9iamVjdChBcHBDbGFzcyk7XG4gICAgfVxuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5idWlsZEFwcCA9IGZ1bmN0aW9uKEFwcENsYXNzLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IE1hcmlvbmV0dGlzdC5fLmV4dGVuZCh7fSwgdGhpcy5jaGlsZEFwcE9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIHJldHVybiBuZXcgQXBwQ2xhc3Mob3B0aW9ucyk7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLl9lbnN1cmVBcHBJc1VuaXF1ZSA9IGZ1bmN0aW9uKGFwcE5hbWUpIHtcbiAgICBpZiAodGhpcy5fY2hpbGRBcHBzW2FwcE5hbWVdKSB7XG4gICAgICB0aHJvdyBuZXcgTWFyaW9uZXR0ZS5FcnJvcih7XG4gICAgICAgIG5hbWU6ICdEdXBsaWNhdGVDaGlsZEFwcEVycm9yJyxcbiAgICAgICAgbWVzc2FnZTogJ0EgY2hpbGQgQXBwIHdpdGggbmFtZSBcIicgKyBhcHBOYW1lICsgJ1wiIGhhcyBhbHJlYWR5IGJlZW4gYWRkZWQuJ1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5hZGRDaGlsZEFwcHMgPSBmdW5jdGlvbihjaGlsZEFwcHMpIHtcbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0Ll8uZWFjaChjaGlsZEFwcHMsIChmdW5jdGlvbihjaGlsZEFwcCwgYXBwTmFtZSkge1xuICAgICAgdGhpcy5hZGRDaGlsZEFwcChhcHBOYW1lLCBjaGlsZEFwcCk7XG4gICAgfSksIHRoaXMpO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5hZGRDaGlsZEFwcCA9IGZ1bmN0aW9uKGFwcE5hbWUsIEFwcENsYXNzLCBvcHRpb25zKSB7XG4gICAgdmFyIGNoaWxkQXBwO1xuICAgIHRoaXMuX2Vuc3VyZUFwcElzVW5pcXVlKGFwcE5hbWUpO1xuICAgIGNoaWxkQXBwID0gdGhpcy5fYnVpbGRBcHAoQXBwQ2xhc3MsIG9wdGlvbnMpO1xuICAgIGlmICghY2hpbGRBcHApIHtcbiAgICAgIHRocm93IG5ldyBNYXJpb25ldHRlLkVycm9yKHtcbiAgICAgICAgbmFtZTogJ0FkZENoaWxkQXBwRXJyb3InLFxuICAgICAgICBtZXNzYWdlOiAnQXBwIGJ1aWxkIGZhaWxlZC4gIEluY29ycmVjdCBjb25maWd1cmF0aW9uLidcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjaGlsZEFwcC5fbmFtZSA9IGFwcE5hbWU7XG4gICAgdGhpcy5fY2hpbGRBcHBzW2FwcE5hbWVdID0gY2hpbGRBcHA7XG4gICAgY2hpbGRBcHAub24oJ2Rlc3Ryb3knLCBNYXJpb25ldHRpc3QuXy5wYXJ0aWFsKHRoaXMuX3JlbW92ZUNoaWxkQXBwLCBhcHBOYW1lKSwgdGhpcyk7XG4gICAgaWYgKHRoaXMuaXNSdW5uaW5nKCkgJiYgTWFyaW9uZXR0aXN0Ll8ucmVzdWx0KGNoaWxkQXBwLCAnc3RhcnRXaXRoUGFyZW50JykpIHtcbiAgICAgIGNoaWxkQXBwLnN0YXJ0KCk7XG4gICAgfVxuICAgIHJldHVybiBjaGlsZEFwcDtcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuZ2V0TmFtZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5nZXRDaGlsZEFwcHMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0Ll8uY2xvbmUodGhpcy5fY2hpbGRBcHBzKTtcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuZ2V0Q2hpbGRBcHAgPSBmdW5jdGlvbihhcHBOYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkQXBwc1thcHBOYW1lXTtcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuX3JlbW92ZUNoaWxkQXBwID0gZnVuY3Rpb24oYXBwTmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLl9jaGlsZEFwcHNbYXBwTmFtZV0uX25hbWU7XG4gICAgZGVsZXRlIHRoaXMuX2NoaWxkQXBwc1thcHBOYW1lXTtcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBcHBzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNoaWxkQXBwcztcbiAgICBjaGlsZEFwcHMgPSB0aGlzLmdldENoaWxkQXBwcygpO1xuICAgIE1hcmlvbmV0dGlzdC5fLmVhY2godGhpcy5fY2hpbGRBcHBzLCAoZnVuY3Rpb24oY2hpbGRBcHAsIGFwcE5hbWUpIHtcbiAgICAgIHRoaXMucmVtb3ZlQ2hpbGRBcHAoYXBwTmFtZSk7XG4gICAgfSksIHRoaXMpO1xuICAgIHJldHVybiBjaGlsZEFwcHM7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLnJlbW92ZUNoaWxkQXBwID0gZnVuY3Rpb24oYXBwTmFtZSwgb3B0aW9ucykge1xuICAgIHZhciBjaGlsZEFwcDtcbiAgICBvcHRpb25zID0gTWFyaW9uZXR0aXN0Ll8uZXh0ZW5kKHt9LCBvcHRpb25zKTtcbiAgICBjaGlsZEFwcCA9IHRoaXMuZ2V0Q2hpbGRBcHAoYXBwTmFtZSk7XG4gICAgaWYgKCFjaGlsZEFwcCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5wcmV2ZW50RGVzdHJveSB8fCBNYXJpb25ldHRpc3QuXy5yZXN1bHQoY2hpbGRBcHAsICdwcmV2ZW50RGVzdHJveScpKSB7XG4gICAgICB0aGlzLl9yZW1vdmVDaGlsZEFwcChhcHBOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hpbGRBcHAuZGVzdHJveSgpO1xuICAgIH1cbiAgICByZXR1cm4gY2hpbGRBcHA7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHt9O1xuXG4gIHJldHVybiBBcHBsaWNhdGlvbjtcblxufSkoTWFyaW9uZXR0aXN0LkFwcGxpY2F0aW9uKTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwbGljYXRpb247XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbnZhciBNb2R1bGU7XG5cbk1vZHVsZSA9IE1hcmlvbmV0dGlzdC5PYmplY3QuZXh0ZW5kKE1hcmlvbmV0dGlzdC5CYWNrYm9uZS5SYWRpby5SZXF1ZXN0cyk7XG5cbmV4cG9ydCBkZWZhdWx0IE1vZHVsZTtcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4vY29yZS5qc1wiO1xuaW1wb3J0IEVudiBmcm9tIFwiLi9lbnYuanNcIjtcbmltcG9ydCBDaGFubmVscyBmcm9tIFwiLi9jaGFubmVscy5qc1wiO1xuaW1wb3J0IExvY2F0aW9uIGZyb20gXCIuL2xvY2F0aW9uLmpzXCI7XG5pbXBvcnQgQ29uZmlnIGZyb20gXCIuL2NvbmZpZy5qc1wiO1xuaW1wb3J0IFJlbmRlcmVyIGZyb20gXCIuL21peGlucy9yZW5kZXJlci5qc1wiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzLmpzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuL2xvZ2dlci5qc1wiO1xuaW1wb3J0IEFwcFJvdXRlIGZyb20gXCIuL3JvdXRlLmpzXCI7XG5pbXBvcnQgQXBwUm91dGVyIGZyb20gXCIuL3JvdXRlci5qc1wiO1xuaW1wb3J0IFJlZ2lvbiBmcm9tIFwiLi9yZWdpb24uanNcIjtcbmltcG9ydCBWaWV3cyBmcm9tIFwiLi92aWV3cy5qc1wiO1xuaW1wb3J0IEJhc2VWaWV3IGZyb20gXCIuL3ZpZXdzL2Jhc2UuanNcIjtcbmltcG9ydCBDb2xsZWN0aW9uVmlldyBmcm9tIFwiLi92aWV3cy9jb2xsZWN0aW9uLmpzXCI7XG5pbXBvcnQgQmFzZU1vZGVsIGZyb20gXCIuL2VudGl0aWVzL21vZGVscy9iYXNlLmpzXCI7XG5pbXBvcnQgQmFzZUNvbGxlY3Rpb24gZnJvbSBcIi4vZW50aXRpZXMvY29sbGVjdGlvbnMvYmFzZS5qc1wiO1xuaW1wb3J0IEJhc2VSZXNwb25kZXIgZnJvbSBcIi4vZW50aXRpZXMvcmVzcG9uZGVycy9iYXNlLmpzXCI7XG5pbXBvcnQgQmFzZVZpZXdNb2RlbCBmcm9tIFwiLi9lbnRpdGllcy92aWV3LW1vZGVscy9iYXNlLmpzXCI7XG5pbXBvcnQgQmFzZUNvbnRyb2xsZXIgZnJvbSBcIi4vY29udHJvbGxlcnMvYmFzZS5qc1wiO1xuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gXCIuL2FwcGxpY2F0aW9uLmpzXCI7XG5pbXBvcnQgTW9kdWxlIGZyb20gXCIuL21vZHVsZS5qc1wiO1xudmFyIHJvb3QsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5yb290ID0gdHlwZW9mIHNlbGYgPT09ICdvYmplY3QnICYmIHNlbGYuc2VsZiA9PT0gc2VsZiAmJiBzZWxmIHx8IHR5cGVvZiBnbG9iYWwgPT09ICdvYmplY3QnICYmIGdsb2JhbC5nbG9iYWwgPT09IGdsb2JhbCAmJiBnbG9iYWw7XG5cbk1hcmlvbmV0dGlzdC5jaGFubmVscyA9IG5ldyBDaGFubmVscygpO1xuXG5NYXJpb25ldHRpc3QubG9jYXRpb24gPSBuZXcgTG9jYXRpb24oKTtcblxuTWFyaW9uZXR0aXN0Lk1vZHVsZSA9IE1vZHVsZTtcblxuTWFyaW9uZXR0aXN0Lk1peGlucyA9IHtcbiAgQ29sbGVjdGlvbnM6IHt9LFxuICBNb2RlbHM6IHt9LFxuICBWaWV3czoge31cbn07XG5cbk1hcmlvbmV0dGlzdC5lbnYgPSBuZXcgRW52KCk7XG5cbk1hcmlvbmV0dGlzdC5jb25maWcgPSBuZXcgQ29uZmlnKCk7XG5cbk1hcmlvbmV0dGlzdC5sb2dnZXIgPSBuZXcgTG9nZ2VyO1xuXG5NYXJpb25ldHRpc3QuXy5leHRlbmQoTWFyaW9uZXR0aXN0LlJlbmRlcmVyLCBSZW5kZXJlcik7XG5cbk1hcmlvbmV0dGlzdC51dGlscyA9IG5ldyBVdGlscztcblxuTWFyaW9uZXR0aXN0LkFwcFJvdXRlID0gQXBwUm91dGU7XG5cbk1hcmlvbmV0dGlzdC5BcHBSb3V0ZXIgPSBBcHBSb3V0ZXI7XG5cbk1hcmlvbmV0dGlzdC5fLmV4dGVuZChNYXJpb25ldHRpc3QuUmVnaW9uLnByb3RvdHlwZSwgUmVnaW9uLnByb3RvdHlwZSk7XG5cbk1hcmlvbmV0dGlzdC5WaWV3cyA9IG5ldyBWaWV3cygpO1xuXG5NYXJpb25ldHRpc3QuXy5leHRlbmQoTWFyaW9uZXR0aXN0LlZpZXcucHJvdG90eXBlLCB7XG4gIHRlbXBsYXRlQ29udGV4dDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGhlbHBlcnM7XG4gICAgaGVscGVycyA9IE1hcmlvbmV0dGlzdC5fLmNsb25lKE1hcmlvbmV0dGlzdC5WaWV3cy50ZW1wbGF0ZUhlbHBlcnMpO1xuICAgIHJldHVybiBoZWxwZXJzO1xuICB9XG59KTtcblxuTWFyaW9uZXR0aXN0LlZpZXdzLkJhc2UgPSBCYXNlVmlldztcblxuTWFyaW9uZXR0aXN0LlZpZXdzLkNvbGxlY3Rpb24gPSBDb2xsZWN0aW9uVmlldztcblxuTWFyaW9uZXR0aXN0LkVudGl0aWVzID0gbmV3IE1hcmlvbmV0dGlzdC5PYmplY3QoKTtcblxuTWFyaW9uZXR0aXN0LkVudGl0aWVzLk1vZGVscyA9IG5ldyBNYXJpb25ldHRpc3QuT2JqZWN0KCk7XG5cbk1hcmlvbmV0dGlzdC5FbnRpdGllcy5Db2xsZWN0aW9ucyA9IG5ldyBNYXJpb25ldHRpc3QuT2JqZWN0KCk7XG5cbk1hcmlvbmV0dGlzdC5FbnRpdGllcy5WaWV3TW9kZWxzID0gbmV3IE1hcmlvbmV0dGlzdC5PYmplY3QoKTtcblxuTWFyaW9uZXR0aXN0LkVudGl0aWVzLlJlc3BvbmRlcnMgPSBuZXcgTWFyaW9uZXR0aXN0Lk9iamVjdCgpO1xuXG5NYXJpb25ldHRpc3QuRW50aXRpZXMuTW9kZWxzLkJhc2UgPSBCYXNlTW9kZWw7XG5cbmlmIChNYXJpb25ldHRpc3QuQmFja2JvbmUuQXNzb2NpYXRlZE1vZGVsKSB7XG4gIE1hcmlvbmV0dGlzdC5FbnRpdGllcy5Nb2RlbHMuQXNzb2NpYXRlZCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgZXh0ZW5kKEFzc29jaWF0ZWQsIHN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gQXNzb2NpYXRlZCgpIHtcbiAgICAgIHJldHVybiBBc3NvY2lhdGVkLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIHJldHVybiBBc3NvY2lhdGVkO1xuXG4gIH0pKE1hcmlvbmV0dGlzdC5CYWNrYm9uZS5Bc3NvY2lhdGVkTW9kZWwpO1xufVxuXG5NYXJpb25ldHRpc3QuRW50aXRpZXMuQ29sbGVjdGlvbnMuQmFzZSA9IEJhc2VDb2xsZWN0aW9uO1xuXG5NYXJpb25ldHRpc3QuRW50aXRpZXMuUmVzcG9uZGVycy5CYXNlID0gQmFzZVJlc3BvbmRlcjtcblxuTWFyaW9uZXR0aXN0LkVudGl0aWVzLlZpZXdNb2RlbHMuQmFzZSA9IEJhc2VWaWV3TW9kZWw7XG5cbk1hcmlvbmV0dGlzdC5Db250cm9sbGVycyA9IG5ldyBNYXJpb25ldHRpc3QuT2JqZWN0KCk7XG5cbk1hcmlvbmV0dGlzdC5Db250cm9sbGVycy5CYXNlID0gQmFzZUNvbnRyb2xsZXI7XG5cbk1hcmlvbmV0dGlzdC5BcHBsaWNhdGlvbiA9IEFwcGxpY2F0aW9uO1xuXG5pZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwgIT09IG51bGwpIHtcbiAgZ2xvYmFsLk1hcmlvbmV0dGlzdCA9IE1hcmlvbmV0dGlzdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFyaW9uZXR0aXN0O1xuIl0sIm5hbWVzIjpbIk1hcmlvbmV0dGlzdCIsIk1hcmlvbmV0dGUiLCJleHRlbmQiLCJoYXNQcm9wIiwiVGVtcGxhdGVzIiwic2xpY2UiLCJCYXNlIiwiQmFzZVZpZXciLCJNb2RlbEJhc2UiLCJDaGFubmVscyIsIkxvY2F0aW9uIiwiTW9kdWxlIiwiRW52IiwiQ29uZmlnIiwiTG9nZ2VyIiwiUmVuZGVyZXIiLCJVdGlscyIsIkFwcFJvdXRlIiwiQXBwUm91dGVyIiwiUmVnaW9uIiwiVmlld3MiLCJDb2xsZWN0aW9uVmlldyIsIkFwcGxpY2F0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWFBLElBQUlBLGNBQVksQ0FBQzs7QUFFakJBLGNBQVksR0FBR0MsWUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDOztBQUVuQ0QsY0FBWSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7O0FBRWpDQSxjQUFZLENBQUMsVUFBVSxHQUFHQyxZQUFVLENBQUM7O0FBRXJDRCxjQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFbkJBLGNBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVuQkEsY0FBWSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRW5CQSxjQUFZLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQzs7QUFFNUJBLGNBQVksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOztBQUUvQkEsY0FBWSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7O0FBRTdCLHFCQUFlQSxjQUFZLENBQUM7O0FDaEM1QixJQUFJLEdBQUc7SUFDTEUsUUFBTSxHQUFHLFNBQVMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFLEVBQUUsSUFBSUMsU0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxJQUFJLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLElB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SUFBSUMsVUFBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxJQUFJLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUMsRUFBRTtJQUMxUkEsVUFBTyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUM7O0FBRTlCRyxNQUFJLEdBQUcsQ0FBQyxTQUFTLFVBQVUsRUFBRTtFQUMzQkosU0FBTSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQzs7RUFFekIsU0FBUyxJQUFJLEdBQUc7SUFDZCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7R0FDMUQ7O0VBRUQsT0FBTyxJQUFJLENBQUM7O0NBRWIsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBRXhCLHFCQUFlSSxNQUFJLENBQUM7O0FDZHBCLElBQUlBLE1BQUk7SUFDTkosU0FBTSxHQUFHLFNBQVMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFLEVBQUUsSUFBSUMsVUFBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxJQUFJLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFB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