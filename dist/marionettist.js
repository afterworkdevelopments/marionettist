(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('underscore'), require('underscore-contrib'), require('underscore.string'), require('jquery'), require('backbone'), require('backbone.radio'), require('backbone-associations'), require('backbone.marionette'), require('i18next'), require('numeral'), require('moment'), require('moment-range'), require('moment-timezone')) :
  typeof define === 'function' && define.amd ? define(['underscore', 'underscore-contrib', 'underscore.string', 'jquery', 'backbone', 'backbone.radio', 'backbone-associations', 'backbone.marionette', 'i18next', 'numeral', 'moment', 'moment-range', 'moment-timezone'], factory) :
  (global.Marionettist = factory(global._,global.underscoreContrib,global.s,global.$,global.Backbone,global.Backbone.Radio,global.backboneAssociations,global.Marionette$1,global.i18next,global.numeral,global.moment,global.momentRange,global.momentTimezone));
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
    if (options == null) {
      options = {};
    }
    xhrs = [];
    xhrs = Marionettist$2._.chain([ajaxRequests]).flatten().value();
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
  };

  Utils.prototype._waitForBluebird = function(promises, options) {
    if (options == null) {
      options = {};
    }
    promises = Marionettist$2._.chain([promises]).flatten().value();
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
      if (Marionettist$2._.result(childApp, 'startWithParent')) {
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
    var helpers, viewContext;
    helpers = Marionettist$2.Views.templateHelpers;
    if (this.viewContext != null) {
      viewContext = this.viewContext;
      if (Marionettist$2._.isFunction(this.viewContext)) {
        viewContext = this.viewContext();
      }
      Marionettist$2._.extend(helpers, viewContext);
    } else {
      helpers.viewContext = {};
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvY29yZS5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvZW52LmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9jaGFubmVscy5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvbG9jYXRpb24uanMiLCIvbW50LzdhNmMwY2JkLTY3YzgtNDU5Ny05ZDMzLTJlMjliMTJkZjJhOS9yZXBvcy9tYXJpb25ldHRpc3QvbGliL2NvbmZpZy90ZW1wbGF0ZXMuanMiLCIvbW50LzdhNmMwY2JkLTY3YzgtNDU5Ny05ZDMzLTJlMjliMTJkZjJhOS9yZXBvcy9tYXJpb25ldHRpc3QvbGliL2NvbmZpZy5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvbWl4aW5zL3JlbmRlcmVyLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi91dGlscy5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvbG9nZ2VyLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9yb3V0ZS5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvcm91dGVyLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9yZWdpb24uanMiLCIvbW50LzdhNmMwY2JkLTY3YzgtNDU5Ny05ZDMzLTJlMjliMTJkZjJhOS9yZXBvcy9tYXJpb25ldHRpc3QvbGliL3ZpZXdzLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi92aWV3cy9iYXNlLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi92aWV3cy9jb2xsZWN0aW9uLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9lbnRpdGllcy9tb2RlbHMvYmFzZS5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvZW50aXRpZXMvY29sbGVjdGlvbnMvYmFzZS5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvZW50aXRpZXMvcmVzcG9uZGVycy9iYXNlLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9lbnRpdGllcy92aWV3LW1vZGVscy9iYXNlLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9jb250cm9sbGVycy9iYXNlLmpzIiwiL21udC83YTZjMGNiZC02N2M4LTQ1OTctOWQzMy0yZTI5YjEyZGYyYTkvcmVwb3MvbWFyaW9uZXR0aXN0L2xpYi9hcHBsaWNhdGlvbi5qcyIsIi9tbnQvN2E2YzBjYmQtNjdjOC00NTk3LTlkMzMtMmUyOWIxMmRmMmE5L3JlcG9zL21hcmlvbmV0dGlzdC9saWIvbWFyaW9uZXR0aXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJ1bmRlcnNjb3JlXCI7XG5pbXBvcnQgdW5kZXJzY29yZUNvbnRyaWIgZnJvbSBcInVuZGVyc2NvcmUtY29udHJpYlwiO1xuaW1wb3J0IHMgZnJvbSBcInVuZGVyc2NvcmUuc3RyaW5nXCI7XG5pbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgQmFja2JvbmUgZnJvbSBcImJhY2tib25lXCI7XG5pbXBvcnQgYmFja2JvbmVfcmFkaW8gZnJvbSBcImJhY2tib25lLnJhZGlvXCI7XG5pbXBvcnQgYmFja2JvbmVBc3NvY2lhdGlvbnMgZnJvbSBcImJhY2tib25lLWFzc29jaWF0aW9uc1wiO1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSBcImJhY2tib25lLm1hcmlvbmV0dGVcIjtcbmltcG9ydCBpMThuZXh0IGZyb20gXCJpMThuZXh0XCI7XG5pbXBvcnQgbnVtZXJhbCBmcm9tIFwibnVtZXJhbFwiO1xuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCI7XG5pbXBvcnQgbW9tZW50UmFuZ2UgZnJvbSBcIm1vbWVudC1yYW5nZVwiO1xuaW1wb3J0IG1vbWVudFRpbWV6b25lIGZyb20gXCJtb21lbnQtdGltZXpvbmVcIjtcbnZhciBNYXJpb25ldHRpc3Q7XG5cbk1hcmlvbmV0dGlzdCA9IE1hcmlvbmV0dGUuZXh0ZW5kKCk7XG5cbk1hcmlvbmV0dGlzdC5CYWNrYm9uZSA9IEJhY2tib25lO1xuXG5NYXJpb25ldHRpc3QuTWFyaW9uZXR0ZSA9IE1hcmlvbmV0dGU7XG5cbk1hcmlvbmV0dGlzdC5fID0gXztcblxuTWFyaW9uZXR0aXN0LiQgPSAkO1xuXG5NYXJpb25ldHRpc3QucyA9IHM7XG5cbk1hcmlvbmV0dGlzdC5JMThuID0gaTE4bmV4dDtcblxuTWFyaW9uZXR0aXN0Lm51bWVyYWwgPSBudW1lcmFsO1xuXG5NYXJpb25ldHRpc3QubW9tZW50ID0gbW9tZW50O1xuXG5leHBvcnQgZGVmYXVsdCBNYXJpb25ldHRpc3Q7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbnZhciBFbnYsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5FbnYgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoRW52LCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBFbnYoKSB7XG4gICAgdGhpcy5zdGFnZSA9IFwiZGV2ZWxvcG1lbnRcIjtcbiAgfVxuXG4gIEVudi5wcm90b3R5cGUuaXNEZXZlbG9wbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnN0YWdlID09PSBcImRldmVsb3BtZW50XCI7XG4gIH07XG5cbiAgRW52LnByb3RvdHlwZS5pc1Byb2R1Y3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFnZSA9PT0gXCJwcm9kdWN0aW9uXCI7XG4gIH07XG5cbiAgRW52LnByb3RvdHlwZS5nZXRMb2NhbGUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0LkkxOG4ubGFuZ3VhZ2U7XG4gIH07XG5cbiAgRW52LnByb3RvdHlwZS5zZXRTdGFnZSA9IGZ1bmN0aW9uKHN0YWdlKSB7XG4gICAgdmFyIG9sZFN0YXRlO1xuICAgIG9sZFN0YXRlID0gdGhpcy5zdGFnZTtcbiAgICB0aGlzLnN0YWdlID0gc3RhZ2U7XG4gICAgcmV0dXJuIHRoaXMudHJpZ2dlck1ldGhvZChcImNoYW5nZTpzdGFnZVwiLCBvbGRTdGF0ZSwgc3RhZ2UpO1xuICB9O1xuXG4gIEVudi5wcm90b3R5cGUuZ2V0U3RhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFnZTtcbiAgfTtcblxuICBFbnYucHJvdG90eXBlLnNldExvY2FsZSA9IGZ1bmN0aW9uKGxvY2FsZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgb2xkTG9jYWxlO1xuICAgIGlmIChsb2NhbGUgPT0gbnVsbCkge1xuICAgICAgbG9jYWxlID0gXCJlblwiO1xuICAgIH1cbiAgICBpZiAoY2FsbGJhY2sgPT0gbnVsbCkge1xuICAgICAgY2FsbGJhY2sgPSBudWxsO1xuICAgIH1cbiAgICBvbGRMb2NhbGUgPSB0aGlzLmdldExvY2FsZSgpO1xuICAgIHJldHVybiBNYXJpb25ldHRpc3QuSTE4bi5jaGFuZ2VMYW5ndWFnZShsb2NhbGUsIGZ1bmN0aW9uKHQpIHtcbiAgICAgIE1hcmlvbmV0dGlzdC5jaGFubmVscy5wdWJsaXNoKFwibWFyaW9uZXR0aXN0XCIsIFwiY2hhbmdlOmxvY2FsZVwiLCB7XG4gICAgICAgIGN1cnJlbnRMb2NhbGU6IGxvY2FsZSxcbiAgICAgICAgb2xkTG9jYWxlOiBvbGRMb2NhbGVcbiAgICAgIH0pO1xuICAgICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayh0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gRW52O1xuXG59KShNYXJpb25ldHRpc3QuT2JqZWN0KTtcblxuZXhwb3J0IGRlZmF1bHQgRW52O1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi9jb3JlLmpzXCI7XG52YXIgQ2hhbm5lbHMsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5DaGFubmVscyA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChDaGFubmVscywgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQ2hhbm5lbHMoKSB7fVxuXG4gIENoYW5uZWxzLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24oY2hhbm5lbE5hbWUsIGV2ZW50TmFtZSwgZGF0YSkge1xuICAgIGlmIChjaGFubmVsTmFtZSA9PSBudWxsKSB7XG4gICAgICBjaGFubmVsTmFtZSA9IFwiZ2xvYmFsXCI7XG4gICAgfVxuICAgIGlmIChldmVudE5hbWUgPT0gbnVsbCkge1xuICAgICAgZXZlbnROYW1lID0gXCJcIjtcbiAgICB9XG4gICAgaWYgKGRhdGEgPT0gbnVsbCkge1xuICAgICAgZGF0YSA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0LkJhY2tib25lLlJhZGlvLmNoYW5uZWwoY2hhbm5lbE5hbWUpLnJlcXVlc3QoZXZlbnROYW1lLCBkYXRhKTtcbiAgfTtcblxuICBDaGFubmVscy5wcm90b3R5cGUucmVwbHlPbmNlID0gZnVuY3Rpb24oY2hhbm5lbE5hbWUsIGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgY2hhbm5lbDtcbiAgICBpZiAoY2hhbm5lbE5hbWUgPT0gbnVsbCkge1xuICAgICAgY2hhbm5lbE5hbWUgPSBcImdsb2JhbFwiO1xuICAgIH1cbiAgICBpZiAoZXZlbnROYW1lID09IG51bGwpIHtcbiAgICAgIGV2ZW50TmFtZSA9IFwiXCI7XG4gICAgfVxuICAgIGNoYW5uZWwgPSBNYXJpb25ldHRpc3QuQmFja2JvbmUuUmFkaW8uY2hhbm5lbChjaGFubmVsTmFtZSk7XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgICByZXR1cm4gY2hhbm5lbC5yZXBseU9uY2UoZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjaGFubmVsLnJlcGx5T25jZShjYWxsYmFjayk7XG4gICAgfVxuICB9O1xuXG4gIENoYW5uZWxzLnByb3RvdHlwZS5yZXBseSA9IGZ1bmN0aW9uKGNoYW5uZWxOYW1lLCBldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGNoYW5uZWw7XG4gICAgaWYgKGNoYW5uZWxOYW1lID09IG51bGwpIHtcbiAgICAgIGNoYW5uZWxOYW1lID0gXCJnbG9iYWxcIjtcbiAgICB9XG4gICAgaWYgKGV2ZW50TmFtZSA9PSBudWxsKSB7XG4gICAgICBldmVudE5hbWUgPSBcIlwiO1xuICAgIH1cbiAgICBjaGFubmVsID0gTWFyaW9uZXR0aXN0LkJhY2tib25lLlJhZGlvLmNoYW5uZWwoY2hhbm5lbE5hbWUpO1xuICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xuICAgICAgcmV0dXJuIGNoYW5uZWwucmVwbHkoZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjaGFubmVsLnJlcGx5KGNhbGxiYWNrKTtcbiAgICB9XG4gIH07XG5cbiAgQ2hhbm5lbHMucHJvdG90eXBlLnB1Ymxpc2ggPSBmdW5jdGlvbihjaGFubmVsTmFtZSwgZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgaWYgKGNoYW5uZWxOYW1lID09IG51bGwpIHtcbiAgICAgIGNoYW5uZWxOYW1lID0gXCJnbG9iYWxcIjtcbiAgICB9XG4gICAgaWYgKGV2ZW50TmFtZSA9PSBudWxsKSB7XG4gICAgICBldmVudE5hbWUgPSBcIlwiO1xuICAgIH1cbiAgICBpZiAoZGF0YSA9PSBudWxsKSB7XG4gICAgICBkYXRhID0ge307XG4gICAgfVxuICAgIHJldHVybiBNYXJpb25ldHRpc3QuQmFja2JvbmUuUmFkaW8uY2hhbm5lbChjaGFubmVsTmFtZSkudHJpZ2dlcihldmVudE5hbWUsIGRhdGEpO1xuICB9O1xuXG4gIENoYW5uZWxzLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbihjaGFubmVsTmFtZSwgZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgIGlmIChjaGFubmVsTmFtZSA9PSBudWxsKSB7XG4gICAgICBjaGFubmVsTmFtZSA9IFwiZ2xvYmFsXCI7XG4gICAgfVxuICAgIGlmIChldmVudE5hbWUgPT0gbnVsbCkge1xuICAgICAgZXZlbnROYW1lID0gXCJcIjtcbiAgICB9XG4gICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5CYWNrYm9uZS5SYWRpby5jaGFubmVsKGNoYW5uZWxOYW1lKS5vbihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfTtcblxuICByZXR1cm4gQ2hhbm5lbHM7XG5cbn0pKE1hcmlvbmV0dGlzdC5PYmplY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBDaGFubmVscztcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4vY29yZS5qc1wiO1xudmFyIExvY2F0aW9uLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuTG9jYXRpb24gPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoTG9jYXRpb24sIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIExvY2F0aW9uKCkge31cblxuICBMb2NhdGlvbi5wcm90b3R5cGUucmVmcmVzaFJvdXRlID0gZnVuY3Rpb24oZnJhZ21lbnQpIHtcbiAgICBpZiAoZnJhZ21lbnQgPT0gbnVsbCkge1xuICAgICAgZnJhZ21lbnQgPSB0aGlzLmdldEN1cnJlbnRSb3V0ZSgpO1xuICAgIH1cbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0LkJhY2tib25lLmhpc3RvcnkubG9hZFVybChmcmFnbWVudCk7XG4gIH07XG5cbiAgTG9jYXRpb24ucHJvdG90eXBlLm5hdmlnYXRlVG8gPSBmdW5jdGlvbihyb3V0ZSwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5CYWNrYm9uZS5oaXN0b3J5Lm5hdmlnYXRlKHJvdXRlLCBvcHRpb25zKTtcbiAgfTtcblxuICBMb2NhdGlvbi5wcm90b3R5cGUuZ2V0Q3VycmVudFJvdXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGZyYWc7XG4gICAgZnJhZyA9IE1hcmlvbmV0dGlzdC5CYWNrYm9uZS5oaXN0b3J5LmZyYWdtZW50O1xuICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0VtcHR5KGZyYWcpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZyYWc7XG4gICAgfVxuICB9O1xuXG4gIExvY2F0aW9uLnByb3RvdHlwZS5zdGFydEhpc3RvcnkgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBpZiAoTWFyaW9uZXR0aXN0LkJhY2tib25lLmhpc3RvcnkgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5CYWNrYm9uZS5oaXN0b3J5LnN0YXJ0KG9wdGlvbnMpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gTG9jYXRpb247XG5cbn0pKE1hcmlvbmV0dGlzdC5PYmplY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBMb2NhdGlvbjtcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4uL2NvcmUuanNcIjtcbnZhciBUZW1wbGF0ZXM7XG5cblRlbXBsYXRlcyA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gVGVtcGxhdGVzKCkge31cblxuICBUZW1wbGF0ZXMucHJvdG90eXBlLmRlYnVnID0gZmFsc2U7XG5cbiAgVGVtcGxhdGVzLnByb3RvdHlwZS5sb29rdXBQYXRocyA9IFtdO1xuXG4gIFRlbXBsYXRlcy5wcm90b3R5cGUuZW5naW5lID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVuZ2luZTtcbiAgICBlbmdpbmUgPSB7fTtcbiAgICBpZiAodHlwZW9mIEhBTUwgIT09IFwidW5kZWZpbmVkXCIgJiYgSEFNTCAhPT0gbnVsbCkge1xuICAgICAgZW5naW5lID0gSEFNTDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBKU1QgIT09IFwidW5kZWZpbmVkXCIgJiYgSlNUICE9PSBudWxsKSB7XG4gICAgICBlbmdpbmUgPSBKU1Q7XG4gICAgfVxuICAgIHJldHVybiBlbmdpbmU7XG4gIH07XG5cbiAgVGVtcGxhdGVzLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbih0ZW1wbGF0ZU5hbWUsIGRhdGEsIG9wdGlvbnMpIHtcbiAgICB2YXIgZW5naW5lLCB0ZW1wbGF0ZTtcbiAgICBpZiAodGVtcGxhdGVOYW1lID09IG51bGwpIHtcbiAgICAgIHRlbXBsYXRlTmFtZSA9IFwiXCI7XG4gICAgfVxuICAgIGlmIChkYXRhID09IG51bGwpIHtcbiAgICAgIGRhdGEgPSB7fTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICB0ZW1wbGF0ZSA9IFwiXCI7XG4gICAgZW5naW5lID0gdGhpcy5lbmdpbmU7XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24odGVtcGxhdGVOYW1lKSkge1xuICAgICAgZW5naW5lID0gZW5naW5lKCk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmRlZmF1bHRUZW1wbGF0ZSAhPSBudWxsKSB7XG4gICAgICB0ZW1wbGF0ZSA9IG9wdGlvbnMuZGVmYXVsdFRlbXBsYXRlO1xuICAgIH1cbiAgICBpZiAoKGVuZ2luZSAhPSBudWxsKSAmJiBNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKGVuZ2luZVt0ZW1wbGF0ZU5hbWVdKSkge1xuICAgICAgdGVtcGxhdGUgPSBlbmdpbmVbdGVtcGxhdGVOYW1lXShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIHRlbXBsYXRlO1xuICB9O1xuXG4gIHJldHVybiBUZW1wbGF0ZXM7XG5cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFRlbXBsYXRlcztcbiIsImltcG9ydCBUZW1wbGF0ZXMgZnJvbSBcIi4vY29uZmlnL3RlbXBsYXRlcy5qc1wiO1xuaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi9jb3JlLmpzXCI7XG52YXIgQ29uZmlnLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuQ29uZmlnID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKENvbmZpZywgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQ29uZmlnKCkge1xuICAgIHRoaXMudGVtcGxhdGVzID0gbmV3IFRlbXBsYXRlcygpO1xuICB9XG5cbiAgcmV0dXJuIENvbmZpZztcblxufSkoTWFyaW9uZXR0aXN0Lk9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IENvbmZpZztcbiIsInZhciBSZW5kZXJlcjtcblxuUmVuZGVyZXIgPSB7XG4gIHJlbmRlcjogZnVuY3Rpb24odGVtcGxhdGUsIGRhdGEpIHtcbiAgICB2YXIgZW5naW5lVGVtcGxhdGU7XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24odGVtcGxhdGUpKSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGUoZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0ZW1wbGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZW5naW5lVGVtcGxhdGUgPSB0aGlzLmdldFRlbXBsYXRlKHRlbXBsYXRlKTtcbiAgICAgIGlmICghTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihlbmdpbmVUZW1wbGF0ZSkpIHtcbiAgICAgICAgdGhyb3cgXCJUZW1wbGF0ZSBcIiArIHRlbXBsYXRlICsgXCIgd2FzIG5vdCBmb3VuZCFcIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlbmdpbmVUZW1wbGF0ZShkYXRhKTtcbiAgICB9XG4gIH0sXG4gIGdldFRlbXBsYXRlOiBmdW5jdGlvbih0ZW1wbGF0ZSkge1xuICAgIHZhciBpLCBqLCBsZW4sIGxlbjEsIGxvb2t1cCwgbG9va3VwUGF0aCwgbG9va3VwcywgcGF0aCwgdGVtcGxhdGVzO1xuICAgIGxvb2t1cHMgPSBNYXJpb25ldHRpc3QuY29uZmlnLnRlbXBsYXRlcy5sb29rdXBQYXRocztcbiAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihsb29rdXBzKSkge1xuICAgICAgbG9va3VwcyA9IGxvb2t1cHMoKTtcbiAgICB9XG4gICAgaWYgKCFNYXJpb25ldHRpc3QuXy5pc0FycmF5KGxvb2t1cHMpKSB7XG4gICAgICB0aHJvdyBcImxvb2t1cFBhdGhzIG1vc3QgYmUgYW4gYXJyYXlcIjtcbiAgICB9XG4gICAgdGVtcGxhdGVzID0gW3RlbXBsYXRlXTtcbiAgICBpZiAobG9va3Vwcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGxvb2t1cHMgPSBbXCJcIl07XG4gICAgfVxuICAgIGZvciAoaSA9IDAsIGxlbiA9IGxvb2t1cHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxvb2t1cCA9IGxvb2t1cHNbaV07XG4gICAgICBmb3IgKGogPSAwLCBsZW4xID0gdGVtcGxhdGVzLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgICBwYXRoID0gdGVtcGxhdGVzW2pdO1xuICAgICAgICBsb29rdXBQYXRoID0gdGhpcy5maW5kTG9va3VwUGF0aChsb29rdXAgKyBwYXRoLCB0ZW1wbGF0ZSk7XG4gICAgICAgIGlmIChsb29rdXBQYXRoICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbG9va3VwUGF0aDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgZmluZExvb2t1cFBhdGg6IGZ1bmN0aW9uKHBhdGgsIHRlbXBsYXRlKSB7XG4gICAgdmFyIGVuZ2luZSwgbG9va3VwUGF0aDtcbiAgICBlbmdpbmUgPSBNYXJpb25ldHRpc3QuY29uZmlnLnRlbXBsYXRlcy5lbmdpbmU7XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24oZW5naW5lKSkge1xuICAgICAgZW5naW5lID0gZW5naW5lKCk7XG4gICAgfVxuICAgIGxvb2t1cFBhdGggPSBlbmdpbmVbcGF0aF07XG4gICAgaWYgKE1hcmlvbmV0dGlzdC5jb25maWcudGVtcGxhdGVzLmRlYnVnID09PSB0cnVlKSB7XG4gICAgICBNYXJpb25ldHRpc3QubG9nZ2VyLmluZm8oXCJMb29raW5nIHRlbXBsYXRlOiBcIiArIHRlbXBsYXRlICsgXCIgaW4gJ1wiICsgcGF0aCArIFwiJ1wiKTtcbiAgICB9XG4gICAgaWYgKGxvb2t1cFBhdGgpIHtcbiAgICAgIHJldHVybiBsb29rdXBQYXRoO1xuICAgIH1cbiAgfSxcbiAgd2l0aFRlbXBsYXRlOiBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICB2YXIgYXJyYXk7XG4gICAgaWYgKHN0cmluZyAhPSBudWxsKSB7XG4gICAgICBhcnJheSA9IHN0cmluZy5zcGxpdChcIi9cIik7XG4gICAgICBhcnJheS5zcGxpY2UoLTEsIDAsIFwidGVtcGxhdGVzXCIpO1xuICAgICAgcmV0dXJuIGFycmF5LmpvaW4oXCIvXCIpO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVuZGVyZXI7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbnZhciBVdGlscyxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHksXG4gIHNsaWNlID0gW10uc2xpY2U7XG5cblV0aWxzID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKFV0aWxzLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBVdGlscygpIHtcbiAgICByZXR1cm4gVXRpbHMuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBVdGlscy5wcm90b3R5cGUucGF0aEZvciA9IGZ1bmN0aW9uKF9wYXRoKSB7XG4gICAgdmFyIHBhdGg7XG4gICAgcGF0aCA9IFwiXCI7XG4gICAgcGF0aCA9IFwiI1wiICsgX3BhdGg7XG4gICAgcmV0dXJuIHBhdGg7XG4gIH07XG5cbiAgVXRpbHMucHJvdG90eXBlLndhaXRGb3IgPSBmdW5jdGlvbihwcm9taXNlcywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgc3dpdGNoIChmYWxzZSkge1xuICAgICAgY2FzZSBvcHRpb25zLnByb21pc2VUeXBlICE9PSBcImJsdWViaXJkXCI6XG4gICAgICAgIHJldHVybiB0aGlzLl93YWl0Rm9yQmx1ZWJpcmQocHJvbWlzZXMsIG9wdGlvbnMpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dhaXRGb3JBamF4KHByb21pc2VzLCBvcHRpb25zKTtcbiAgICB9XG4gIH07XG5cbiAgVXRpbHMucHJvdG90eXBlLl93YWl0Rm9yQWpheCA9IGZ1bmN0aW9uKGFqYXhSZXF1ZXN0cywgb3B0aW9ucykge1xuICAgIHZhciByZWYsIHhocnM7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICB4aHJzID0gW107XG4gICAgeGhycyA9IE1hcmlvbmV0dGlzdC5fLmNoYWluKFthamF4UmVxdWVzdHNdKS5mbGF0dGVuKCkudmFsdWUoKTtcbiAgICByZXR1cm4gKHJlZiA9IE1hcmlvbmV0dGlzdC4kKS53aGVuLmFwcGx5KHJlZiwgeGhycykudGhlbigoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncztcbiAgICAgIGFyZ3MgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKG9wdGlvbnMuc3VjY2VzcykpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuc3VjY2Vzcy5hcHBseShvcHRpb25zLCBhcmdzKTtcbiAgICAgIH1cbiAgICB9KSwgZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncztcbiAgICAgIGFyZ3MgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKG9wdGlvbnMuZXJyb3IpKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLmVycm9yLmFwcGx5KG9wdGlvbnMsIGFyZ3MpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIFV0aWxzLnByb3RvdHlwZS5fd2FpdEZvckJsdWViaXJkID0gZnVuY3Rpb24ocHJvbWlzZXMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHByb21pc2VzID0gTWFyaW9uZXR0aXN0Ll8uY2hhaW4oW3Byb21pc2VzXSkuZmxhdHRlbigpLnZhbHVlKCk7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzLm1hcChmdW5jdGlvbihwcm9taXNlKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZS5yZWZsZWN0KCk7XG4gICAgfSkpLnRoZW4oZnVuY3Rpb24oaW5zcGVjdGlvbnMpIHtcbiAgICAgIHZhciBlcnJvcnMsIGksIGluc3BlY3Rpb24sIGxlbiwgc3VjY2Vzc0FyZ3M7XG4gICAgICBzdWNjZXNzQXJncyA9IFtdO1xuICAgICAgZXJyb3JzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBpbnNwZWN0aW9ucy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpbnNwZWN0aW9uID0gaW5zcGVjdGlvbnNbaV07XG4gICAgICAgIGlmIChpbnNwZWN0aW9uLmlzRnVsZmlsbGVkKCkpIHtcbiAgICAgICAgICBzdWNjZXNzQXJncy5wdXNoKGluc3BlY3Rpb24udmFsdWUoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXJyb3JzLnB1c2goaW5zcGVjdGlvbi5yZWFzb24oKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihvcHRpb25zLmVycm9yKSkge1xuICAgICAgICAgIHJldHVybiBvcHRpb25zLmVycm9yLmFwcGx5KG9wdGlvbnMsIGVycm9ycyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKG9wdGlvbnMuc3VjY2VzcykpIHtcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucy5zdWNjZXNzLmFwcGx5KG9wdGlvbnMsIHN1Y2Nlc3NBcmdzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBVdGlscztcblxufSkoTWFyaW9uZXR0aXN0Lk9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IFV0aWxzO1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi9jb3JlLmpzXCI7XG52YXIgTG9nZ2VyLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuTG9nZ2VyID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKExvZ2dlciwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gTG9nZ2VyKCkge31cblxuICBMb2dnZXIucHJvdG90eXBlLnN1Y2Nlc3MgPSBmdW5jdGlvbihtc2csIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIG9wdGlvbnMudHlwZSA9IFwic3VjY2Vzc1wiO1xuICAgIHJldHVybiB0aGlzLmxvZyhtc2csIG9wdGlvbnMpO1xuICB9O1xuXG4gIExvZ2dlci5wcm90b3R5cGUud2FybiA9IGZ1bmN0aW9uKG1zZywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgb3B0aW9ucy50eXBlID0gXCJ3YXJuXCI7XG4gICAgcmV0dXJuIHRoaXMubG9nKG1zZywgb3B0aW9ucyk7XG4gIH07XG5cbiAgTG9nZ2VyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uKG1zZywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgb3B0aW9ucy50eXBlID0gXCJlcnJvclwiO1xuICAgIHJldHVybiB0aGlzLmxvZyhtc2csIG9wdGlvbnMpO1xuICB9O1xuXG4gIExvZ2dlci5wcm90b3R5cGUuaW5mbyA9IGZ1bmN0aW9uKG1zZywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgb3B0aW9ucy50eXBlID0gXCJpbmZvXCI7XG4gICAgcmV0dXJuIHRoaXMubG9nKG1zZywgb3B0aW9ucyk7XG4gIH07XG5cbiAgTG9nZ2VyLnByb3RvdHlwZS5sb2cgPSBmdW5jdGlvbihtc2csIG9wdGlvbnMpIHtcbiAgICB2YXIgYmdjLCBmb3JjZSwgdHlwZTtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIGZvcmNlID0gb3B0aW9ucy5mb3JjZTtcbiAgICB0eXBlID0gb3B0aW9ucy50eXBlO1xuICAgIGlmIChNYXJpb25ldHRpc3QuZW52LmlzRGV2ZWxvcG1lbnQoKSB8fCBmb3JjZSA9PT0gdHJ1ZSkge1xuICAgICAgdHlwZSA9IHR5cGUgfHwgJ2JsYWNrJztcbiAgICAgIGJnYyA9ICdXaGl0ZSc7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICAgICAgdHlwZSA9ICdHcmVlbic7XG4gICAgICAgICAgYmdjID0gJ0xpbWVHcmVlbic7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2luZm8nOlxuICAgICAgICAgIHR5cGUgPSAnRG9kZ2VyQmx1ZSc7XG4gICAgICAgICAgYmdjID0gJ1R1cnF1b2lzZSc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICB0eXBlID0gJ1JlZCc7XG4gICAgICAgICAgYmdjID0gJ0JsYWNrJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnc3RhcnQnOlxuICAgICAgICAgIHR5cGUgPSAnT2xpdmVEcmFiJztcbiAgICAgICAgICBiZ2MgPSAnUGFsZUdyZWVuJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnd2FybmluZyc6XG4gICAgICAgICAgdHlwZSA9ICdUb21hdG8nO1xuICAgICAgICAgIGJnYyA9ICdCbGFjayc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgdHlwZSA9ICdPcmNoaWQnO1xuICAgICAgICAgIGJnYyA9ICdNZWRpdW1WaW9sZXRSZWQnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHR5cGUgPSB0eXBlO1xuICAgICAgfVxuICAgICAgYmdjID0gJ1doaXRlJztcbiAgICAgIGlmICh0eXBlb2YgbXNnID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJyVjJyArIG1zZywgJ3R5cGU6JyArIHR5cGUgKyAnO2ZvbnQtd2VpZ2h0OmJvbGQ7IGJhY2tncm91bmQtdHlwZTogJyArIGJnYyArICc7Jyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBMb2dnZXI7XG5cbn0pKE1hcmlvbmV0dGlzdC5PYmplY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBMb2dnZXI7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbnZhciBBcHBSb3V0ZSxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkFwcFJvdXRlID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKEFwcFJvdXRlLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBBcHBSb3V0ZSgpIHtcbiAgICByZXR1cm4gQXBwUm91dGUuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBBcHBSb3V0ZS5wcm90b3R5cGUucm91dGVyID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uKFwicm91dGVyXCIpO1xuICB9O1xuXG4gIEFwcFJvdXRlLnByb3RvdHlwZS5wYXRoID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uKFwicGF0aFwiKTtcbiAgfTtcblxuICBBcHBSb3V0ZS5wcm90b3R5cGUuYWN0aW9uTmFtZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmdldE9wdGlvbihcImFjdGlvbk5hbWVcIik7XG4gIH07XG5cbiAgQXBwUm91dGUucHJvdG90eXBlLmNvbnRyb2xsZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRPcHRpb24oXCJjb250cm9sbGVyXCIpO1xuICB9O1xuXG4gIHJldHVybiBBcHBSb3V0ZTtcblxufSkoTWFyaW9uZXR0aXN0Lk9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IEFwcFJvdXRlO1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi9jb3JlLmpzXCI7XG52YXIgQXBwUm91dGVyLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuQXBwUm91dGVyID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKEFwcFJvdXRlciwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQXBwUm91dGVyKCkge1xuICAgIHJldHVybiBBcHBSb3V0ZXIuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBBcHBSb3V0ZXIucHJvdG90eXBlLm9uUm91dGUgPSBmdW5jdGlvbihuYW1lLCBwYXRoLCBhcmdzKSB7XG4gICAgaWYgKCh0aGlzLmNvbnRyb2xsZXIgIT0gbnVsbCkgJiYgTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbih0aGlzLmNvbnRyb2xsZXIub25Sb3V0ZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXIub25Sb3V0ZSh0aGlzLCBuYW1lLCBwYXRoLCBhcmdzKTtcbiAgICB9XG4gIH07XG5cbiAgQXBwUm91dGVyLnByb3RvdHlwZS5fc2V0Q29udHJvbGxlckZpbHRlcnMgPSBmdW5jdGlvbihjb250cm9sbGVyKSB7XG4gICAgdmFyIGRlZmF1bHRGaWx0ZXJzLCBmaWx0ZXJzO1xuICAgIGlmIChjb250cm9sbGVyICE9IG51bGwpIHtcbiAgICAgIGRlZmF1bHRGaWx0ZXJzID0ge1xuICAgICAgICBiZWZvcmU6IHt9LFxuICAgICAgICBhZnRlcjoge31cbiAgICAgIH07XG4gICAgICBmaWx0ZXJzID0gY29udHJvbGxlci5maWx0ZXJzO1xuICAgICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24oZmlsdGVycykpIHtcbiAgICAgICAgZmlsdGVycyA9IGZpbHRlcnMoKTtcbiAgICAgIH1cbiAgICAgIGlmIChjb250cm9sbGVyLmZpbHRlcnMgPT0gbnVsbCkge1xuICAgICAgICBjb250cm9sbGVyLmZpbHRlcnMgPSB7fTtcbiAgICAgIH1cbiAgICAgIGNvbnRyb2xsZXIuZmlsdGVycyA9IE1hcmlvbmV0dGlzdC5fLmV4dGVuZChkZWZhdWx0RmlsdGVycywgZmlsdGVycyk7XG4gICAgfVxuICAgIHJldHVybiBjb250cm9sbGVyO1xuICB9O1xuXG4gIEFwcFJvdXRlci5wcm90b3R5cGUuX2FkZEFwcFJvdXRlID0gZnVuY3Rpb24oY29udHJvbGxlciwgcm91dGUsIG1ldGhvZE5hbWUpIHtcbiAgICB2YXIgX21ldGhvZCwgbWV0aG9kO1xuICAgIHRoaXMuY29udHJvbGxlciA9IHRoaXMuX3NldENvbnRyb2xsZXJGaWx0ZXJzKGNvbnRyb2xsZXIpO1xuICAgIF9tZXRob2QgPSBjb250cm9sbGVyW21ldGhvZE5hbWVdO1xuICAgIG1ldGhvZCA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgX3RoaXMuY29udHJvbGxlci5yb3V0ZSA9IG5ldyBNYXJpb25ldHRpc3QuQXBwUm91dGUoe1xuICAgICAgICAgIGNvbnRyb2xsZXI6IF90aGlzLmNvbnRyb2xsZXIsXG4gICAgICAgICAgYWN0aW9uTmFtZTogbWV0aG9kTmFtZSxcbiAgICAgICAgICBwYXRoOiByb3V0ZVxuICAgICAgICB9KTtcbiAgICAgICAgcmVzdWx0ID0gX3RoaXMuX2V4ZWN1dGVGaWx0ZXIoX3RoaXMuY29udHJvbGxlci5maWx0ZXJzLmJlZm9yZSwgX3RoaXMuY29udHJvbGxlcik7XG4gICAgICAgIGlmIChyZXN1bHQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgX3RoaXMuY29udHJvbGxlclttZXRob2ROYW1lXS5hcHBseShfdGhpcy5jb250cm9sbGVyLCBfdGhpcy5fZ2V0UGFyYW1zKCkpO1xuICAgICAgICAgIHJldHVybiBfdGhpcy5fZXhlY3V0ZUZpbHRlcihfdGhpcy5jb250cm9sbGVyLmZpbHRlcnMuYWZ0ZXIsIF90aGlzLmNvbnRyb2xsZXIpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKHRoaXMpO1xuICAgIGlmICghbWV0aG9kKSB7XG4gICAgICB0aHJvdyBuZXcgTWFyaW9uZXR0aXN0Lk1hcmlvbmV0dGUuRXJyb3IoJ01ldGhvZCBcIicgKyBtZXRob2ROYW1lICsgJ1wiIHdhcyBub3QgZm91bmQgb24gdGhlIGNvbnRyb2xsZXInKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucm91dGUocm91dGUsIG1ldGhvZE5hbWUsIE1hcmlvbmV0dGlzdC5fLmJpbmQobWV0aG9kLCBjb250cm9sbGVyKSk7XG4gIH07XG5cbiAgQXBwUm91dGVyLnByb3RvdHlwZS5fZXhlY3V0ZUZpbHRlciA9IGZ1bmN0aW9uKGZpbHRlciwgY29udHJvbGxlcikge1xuICAgIHZhciBmaWx0ZXJWYWx1ZSwgaSwgbGVuLCBtZXRob2ROYW1lLCByZWYsIHJlc3VsdCwgc3RvcE1zZztcbiAgICByZXN1bHQgPSB0cnVlO1xuICAgIHJlZiA9IE1hcmlvbmV0dGlzdC5fLmtleXMoZmlsdGVyKTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIG1ldGhvZE5hbWUgPSByZWZbaV07XG4gICAgICBmaWx0ZXJWYWx1ZSA9IGZpbHRlclttZXRob2ROYW1lXTtcbiAgICAgIHN0b3BNc2cgPSBcIkFjdGlvbiBoYWx0ZWQgYnkgZmlsdGVyICdcIiArIG1ldGhvZE5hbWUgKyBcIidcIjtcbiAgICAgIHN3aXRjaCAoZmFsc2UpIHtcbiAgICAgICAgY2FzZSAhTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihmaWx0ZXJWYWx1ZSk6XG4gICAgICAgICAgcmVzdWx0ID0gZmlsdGVyVmFsdWUoY29udHJvbGxlcik7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihzdG9wTXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAhTWFyaW9uZXR0aXN0Ll8uaXNPYmplY3QoZmlsdGVyVmFsdWUpOlxuICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX3Byb2NjZXNzRmlsdGVyT2JqZWN0KG1ldGhvZE5hbWUsIGZpbHRlclZhbHVlLCBjb250cm9sbGVyKTtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKHN0b3BNc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIEFwcFJvdXRlci5wcm90b3R5cGUuX2dldFBhcmFtcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYXJhbXMsIHJvdXRlO1xuICAgIHJvdXRlID0gdGhpcy5fcm91dGVUb1JlZ0V4cCh0aGlzLmNvbnRyb2xsZXIucm91dGUuZ2V0T3B0aW9uKFwicGF0aFwiKSk7XG4gICAgcmV0dXJuIHBhcmFtcyA9IHRoaXMuX2V4dHJhY3RQYXJhbWV0ZXJzKHJvdXRlLCBNYXJpb25ldHRpc3QuQmFja2JvbmUuaGlzdG9yeS5nZXRGcmFnbWVudCgpKTtcbiAgfTtcblxuICBBcHBSb3V0ZXIucHJvdG90eXBlLl9wcm9jY2Vzc0ZpbHRlck9iamVjdCA9IGZ1bmN0aW9uKG1ldGhvZE5hbWUsIGZpbHRlciwgY29udHJvbGxlcikge1xuICAgIHZhciBhY3Rpb25OYW1lLCBjb250cm9sbGVyTWV0aG9kLCBkZWZhdWx0RmlsdGVyT3B0aW9ucywgZmlsdGVyT3B0aW9ucztcbiAgICBkZWZhdWx0RmlsdGVyT3B0aW9ucyA9IHtcbiAgICAgIG1ldGhvZDogbnVsbCxcbiAgICAgIG9ubHk6IFtdLFxuICAgICAgZXhjZXB0OiBbXVxuICAgIH07XG4gICAgZmlsdGVyT3B0aW9ucyA9IE1hcmlvbmV0dGlzdC5fLmV4dGVuZChkZWZhdWx0RmlsdGVyT3B0aW9ucywgZmlsdGVyKTtcbiAgICBjb250cm9sbGVyTWV0aG9kID0gY29udHJvbGxlclttZXRob2ROYW1lXTtcbiAgICBhY3Rpb25OYW1lID0gY29udHJvbGxlci5yb3V0ZS5hY3Rpb25OYW1lKCk7XG4gICAgaWYgKCFNYXJpb25ldHRpc3QuXy5pc0FycmF5KGZpbHRlck9wdGlvbnMub25seSkpIHtcbiAgICAgIHRocm93IFwiZmlsdGVyIG9wdGlvbiBvbmx5LCBtb3N0IGJlIGFuIGFycmF5XCI7XG4gICAgfVxuICAgIGlmICghTWFyaW9uZXR0aXN0Ll8uaXNBcnJheShmaWx0ZXJPcHRpb25zLmV4Y2VwdCkpIHtcbiAgICAgIHRocm93IFwiZmlsdGVyIG9wdGlvbiBleGNlcHQsIG1vc3QgYmUgYW4gYXJyYXlcIjtcbiAgICB9XG4gICAgaWYgKGZpbHRlck9wdGlvbnMub25seS5sZW5ndGggPiAwIHx8IGZpbHRlck9wdGlvbnMuZXhjZXB0Lmxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChNYXJpb25ldHRpc3QuXy5jb250YWlucyhmaWx0ZXJPcHRpb25zLm9ubHksIGFjdGlvbk5hbWUpICYmICFNYXJpb25ldHRpc3QuXy5jb250YWlucyhmaWx0ZXJPcHRpb25zLmV4Y2VwdCwgYWN0aW9uTmFtZSkpIHtcbiAgICAgICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24oY29udHJvbGxlck1ldGhvZCkpIHtcbiAgICAgICAgICByZXR1cm4gY29udHJvbGxlck1ldGhvZC5hcHBseSh0aGlzLmNvbnRyb2xsZXIsIHRoaXMuX2dldFBhcmFtcygpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbihjb250cm9sbGVyTWV0aG9kKSkge1xuICAgICAgICByZXR1cm4gY29udHJvbGxlck1ldGhvZC5hcHBseSh0aGlzLmNvbnRyb2xsZXIsIHRoaXMuX2dldFBhcmFtcygpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIEFwcFJvdXRlcjtcblxufSkoTWFyaW9uZXR0aXN0LkFwcFJvdXRlcik7XG5cbmV4cG9ydCBkZWZhdWx0IEFwcFJvdXRlcjtcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4vY29yZS5qc1wiO1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSBcImJhY2tib25lLm1hcmlvbmV0dGVcIjtcbnZhciBSZWdpb24sIF9zaG93LFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuX3Nob3cgPSBNYXJpb25ldHRlLlJlZ2lvbi5wcm90b3R5cGUuc2hvdztcblxuUmVnaW9uID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKFJlZ2lvbiwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gUmVnaW9uKCkge1xuICAgIHJldHVybiBSZWdpb24uX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBSZWdpb24ucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbih2aWV3LCBvcHRpb25zKSB7XG4gICAgdmFyIGFyZ3MsIG9sZFZpZXcsIHByZXZlbnREZXN0cm95LCBzaG93Q3VycmVudFZpZXcsIHRyYW5zaXRpb25PdXQsIHZhbHVlO1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHByZXZlbnREZXN0cm95ID0gb3B0aW9ucy5wcmV2ZW50RGVzdHJveSA9PT0gdHJ1ZTtcbiAgICB0cmFuc2l0aW9uT3V0ID0gb3B0aW9ucy50cmFuc2l0aW9uT3V0O1xuICAgIGRlbGV0ZSBvcHRpb25zLnRyYW5zaXRpb25PdXQ7XG4gICAgYXJncyA9IFt2aWV3LCBvcHRpb25zXTtcbiAgICBpZiAodHJhbnNpdGlvbk91dCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBfc2hvdy5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2xkVmlldyA9IHRoaXMuY3VycmVudFZpZXc7XG4gICAgICBzaG93Q3VycmVudFZpZXcgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfc2hvdy5hcHBseShfdGhpcywgYXJncyk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKTtcbiAgICAgIGlmICgob2xkVmlldyAhPSBudWxsKSAmJiBNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKG9sZFZpZXcudHJhbnNpdGlvbk91dCkpIHtcbiAgICAgICAgb2xkVmlldy50cmlnZ2VyTWV0aG9kKFwiYmVmb3JlOnRyYW5zaXRpb246b3V0XCIpO1xuICAgICAgICB2YWx1ZSA9IG9sZFZpZXcudHJhbnNpdGlvbk91dCgpO1xuICAgICAgICBpZiAoKHZhbHVlICE9IG51bGwgPyB2YWx1ZS50aGVuIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlLnRoZW4oKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzaG93Q3VycmVudFZpZXcoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSkodGhpcykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IFwidHJhbnNpdGlvbk91dCBtZXRob2QgbW9zdCByZXR1cm4gYSBwcm9taXNlXCI7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzaG93Q3VycmVudFZpZXcoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFJlZ2lvbjtcblxufSkoTWFyaW9uZXR0ZS5SZWdpb24pO1xuXG5leHBvcnQgZGVmYXVsdCBSZWdpb247XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbnZhciBWaWV3cyxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHksXG4gIHNsaWNlID0gW10uc2xpY2U7XG5cblZpZXdzID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKFZpZXdzLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBWaWV3cygpIHtcbiAgICByZXR1cm4gVmlld3MuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBWaWV3cy5wcm90b3R5cGUudGVtcGxhdGVIZWxwZXJzID0ge1xuICAgIHBhdGhGb3I6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MsIHJlZjtcbiAgICAgIGFyZ3MgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgIHJldHVybiAocmVmID0gTWFyaW9uZXR0aXN0LnV0aWxzKS5wYXRoRm9yLmFwcGx5KHJlZiwgYXJncyk7XG4gICAgfSxcbiAgICBfOiBNYXJpb25ldHRpc3QuXyxcbiAgICBzOiBNYXJpb25ldHRpc3QucyxcbiAgICB0OiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzLCByZWY7XG4gICAgICBhcmdzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgICByZXR1cm4gKHJlZiA9IE1hcmlvbmV0dGlzdC5JMThuKS50LmFwcGx5KHJlZiwgYXJncyk7XG4gICAgfSxcbiAgICBmb3JtYXRDdXJyZW5jeTogZnVuY3Rpb24oYW1vdW50LCBmb3JtYXQpIHtcbiAgICAgIGlmIChmb3JtYXQgPT0gbnVsbCkge1xuICAgICAgICBmb3JtYXQgPSBcIiQwLDAuMDBcIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNYXJpb25ldHRpc3QubnVtZXJhbChhbW91bnQpLmZvcm1hdChmb3JtYXQpO1xuICAgIH0sXG4gICAgZm9ybWF0TnVtYmVyOiBmdW5jdGlvbihhbW91bnQsIGZvcm1hdCkge1xuICAgICAgaWYgKGZvcm1hdCA9PSBudWxsKSB7XG4gICAgICAgIGZvcm1hdCA9IFwiMCwwLjAwXCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWFyaW9uZXR0aXN0Lm51bWVyYWwoYW1vdW50KS5mb3JtYXQoZm9ybWF0KTtcbiAgICB9LFxuICAgIGZvcm1hdFBlcmNlbnRhZ2U6IGZ1bmN0aW9uKGFtb3VudCwgZm9ybWF0KSB7XG4gICAgICBpZiAoZm9ybWF0ID09IG51bGwpIHtcbiAgICAgICAgZm9ybWF0ID0gXCIwLjAwJVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5udW1lcmFsKGFtb3VudCkuZm9ybWF0KGZvcm1hdCk7XG4gICAgfSxcbiAgICBmb3JtYXREYXRlOiBmdW5jdGlvbihkYXRlLCBmb3JtYXQpIHtcbiAgICAgIGlmIChmb3JtYXQgPT0gbnVsbCkge1xuICAgICAgICBmb3JtYXQgPSBcIkRELU1NLVlZWVlcIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNYXJpb25ldHRpc3QubW9tZW50KGRhdGUpLmZvcm1hdChmb3JtYXQpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gVmlld3M7XG5cbn0pKE1hcmlvbmV0dGlzdC5PYmplY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBWaWV3cztcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4uL2NvcmUuanNcIjtcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gXCJiYWNrYm9uZS5tYXJpb25ldHRlXCI7XG52YXIgQmFzZVZpZXcsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5CYXNlVmlldyA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChCYXNlVmlldywgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQmFzZVZpZXcoKSB7XG4gICAgcmV0dXJuIEJhc2VWaWV3Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIEJhc2VWaWV3O1xuXG59KShNYXJpb25ldHRlLlZpZXcpO1xuXG5leHBvcnQgZGVmYXVsdCBCYXNlVmlldztcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4uL2NvcmUuanNcIjtcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gXCJiYWNrYm9uZS5tYXJpb25ldHRlXCI7XG52YXIgQ29sbGVjdGlvblZpZXcsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5Db2xsZWN0aW9uVmlldyA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChDb2xsZWN0aW9uVmlldywgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQ29sbGVjdGlvblZpZXcoKSB7XG4gICAgcmV0dXJuIENvbGxlY3Rpb25WaWV3Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIENvbGxlY3Rpb25WaWV3O1xuXG59KShNYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3KTtcblxuZXhwb3J0IGRlZmF1bHQgQ29sbGVjdGlvblZpZXc7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuLi8uLi9jb3JlLmpzXCI7XG5pbXBvcnQgQmFja2JvbmUgZnJvbSBcImJhY2tib25lXCI7XG52YXIgQmFzZSxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkJhc2UgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoQmFzZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQmFzZSgpIHtcbiAgICByZXR1cm4gQmFzZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHJldHVybiBCYXNlO1xuXG59KShCYWNrYm9uZS5Nb2RlbCk7XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2U7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuLi8uLi9jb3JlLmpzXCI7XG5pbXBvcnQgQmFja2JvbmUgZnJvbSBcImJhY2tib25lXCI7XG52YXIgQmFzZSxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkJhc2UgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoQmFzZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQmFzZSgpIHtcbiAgICByZXR1cm4gQmFzZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHJldHVybiBCYXNlO1xuXG59KShCYWNrYm9uZS5Db2xsZWN0aW9uKTtcblxuZXhwb3J0IGRlZmF1bHQgQmFzZTtcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4uLy4uL2NvcmUuanNcIjtcbmltcG9ydCBNb2RlbEJhc2UgZnJvbSBcIi4uLy4uL2VudGl0aWVzL21vZGVscy9iYXNlLmpzXCI7XG5pbXBvcnQgQmFzZVZpZXcgZnJvbSBcIi4uLy4uL3ZpZXdzL2Jhc2UuanNcIjtcbnZhciBCYXNlLFxuICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eSxcbiAgc2xpY2UgPSBbXS5zbGljZTtcblxuQmFzZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gIGV4dGVuZChCYXNlLCBzdXBlckNsYXNzKTtcblxuICBmdW5jdGlvbiBCYXNlKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIEJhc2UuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5faW5zdGFuY2VfaWQgPSBNYXJpb25ldHRpc3QuXy51bmlxdWVJZChcInJlc3BvbmRlclwiKTtcbiAgICB0aGlzLnJlZ2lzdGVyKHRoaXMsIHRoaXMuX2luc3RhbmNlX2lkKTtcbiAgfVxuXG4gIEJhc2UucHJvdG90eXBlLmxvYWRlclZpZXcgPSBCYXNlVmlldy5leHRlbmQoe1xuICAgIHRlbXBsYXRlOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4gTWFyaW9uZXR0aXN0LmNvbmZpZy50ZW1wbGF0ZXMucmVuZGVyKFwibWFyaW9uZXR0aXN0L2xvYWRlclwiLCBkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRUZW1wbGF0ZTogJzxkaXYgY2xhc3M9XFwnbXJpLWxvYWRlclxcJz5cXG4gIDxkaXYgY2xhc3M9XFwnbXJpLWxvYWRlcl9fY29udGVudFxcJz5cXG4gICAgPGkgY2xhc3M9XCJmYSBmYS1zcGlubmVyIGZhLXNwaW4gZmEtMnggZmEtZndcIj48L2k+XFxuICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiPkxvYWRpbmcuLi48L3NwYW4+XFxuICA8L2Rpdj5cXG48L2Rpdj4nXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIEJhc2UucHJvdG90eXBlLmdldExvYWRlclZpZXcgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5nZXQoXCJsb2FkZXJWaWV3XCIpID09IG51bGwpIHtcbiAgICAgIHRoaXMuc2V0KHtcbiAgICAgICAgbG9hZGVyVmlldzogbmV3IHRoaXMubG9hZGVyVmlld1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldChcImxvYWRlclZpZXdcIik7XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncztcbiAgICBhcmdzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgQmFzZS5fX3N1cGVyX18uY2xvc2UuY2FsbCh0aGlzLCBhcmdzKTtcbiAgICByZXR1cm4gdGhpcy51bnJlZ2lzdGVyKHRoaXMsIHRoaXMuX2luc3RhbmNlX2lkKTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24odmlldywgb3B0aW9ucykge1xuICAgIHZhciBsb2FkZXJWaWV3LCByZWdpb247XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICByZWdpb24gPSBvcHRpb25zLnJlZ2lvbiAhPSBudWxsID8gb3B0aW9ucy5yZWdpb24gOiB0aGlzLmdldChcInJlZ2lvblwiKTtcbiAgICB0aGlzLmxpc3RlblRvKHZpZXcsIFwiY2xvc2VcIiwgdGhpcy5jbG9zZSk7XG4gICAgaWYgKG9wdGlvbnMuYXN5bmMgIT0gbnVsbCkge1xuICAgICAgaWYgKG9wdGlvbnMubG9hZGVyVmlldyAhPT0gZmFsc2UpIHtcbiAgICAgICAgbG9hZGVyVmlldyA9IHRoaXMuZ2V0TG9hZGVyVmlldygpO1xuICAgICAgICB0aGlzLmxpc3RlblRvKGxvYWRlclZpZXcsIFwiY2xvc2VcIiwgdGhpcy5jbG9zZSk7XG4gICAgICAgIHJlZ2lvbi5zaG93KGxvYWRlclZpZXcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuZmV0Y2goKS50aGVuKCgoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChvcHRpb25zLmxvYWRlclZpZXcgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAocmVnaW9uLmN1cnJlbnRWaWV3ICE9PSBsb2FkZXJWaWV3KSB7XG4gICAgICAgICAgICAgIHJldHVybiB2aWV3LmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZWdpb24uc2hvdyh2aWV3KTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZWdpb24uc2hvdyh2aWV3KTtcbiAgICB9XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUuZGVmYXVsdHMgPSB7XG4gICAgcGFyYW1zOiB7fSxcbiAgICBhc3luYzogW11cbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS53YWl0Rm9yID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MsIHJlZjtcbiAgICBhcmdzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgcmV0dXJuIChyZWYgPSBNYXJpb25ldHRpc3QudXRpbHMpLndhaXRGb3IuYXBwbHkocmVmLCBhcmdzKTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5kZWZlcnJlZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBNYXJpb25ldHRpc3QuJC5EZWZlcnJlZCgpO1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLmZldGNoID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHZhciBhc3luY0ZldGNoZXMsIGRlZmVycmVkO1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgZGVmZXJyZWQgPSB0aGlzLmRlZmVycmVkKCk7XG4gICAgYXN5bmNGZXRjaGVzID0gTWFyaW9uZXR0aXN0Ll8uY2hhaW4oW3RoaXMuZ2V0KFwiYXN5bmNcIildKS5mbGF0dGVuKCkuY29tcGFjdCgpLnZhbHVlKCk7XG4gICAgdGhpcy53YWl0Rm9yKGFzeW5jRmV0Y2hlcywge1xuICAgICAgc3VjY2VzczogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKG9wdGlvbnMuc3VjY2VzcykpIHtcbiAgICAgICAgICBvcHRpb25zLnN1Y2Nlc3MoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgfSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKE1hcmlvbmV0dGlzdC5fLmlzRnVuY3Rpb24ob3B0aW9ucy5lcnJvcikpIHtcbiAgICAgICAgICBvcHRpb25zLmVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnJlamVjdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmRlZmVycmVkKCkucHJvbWlzZSgpO1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5kZWZlcnJlZCgpLnByb21pc2UoKTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uKGluc3RhbmNlLCBpZCkge1xuICAgIGlmICh0aGlzLl9yZWdpc3RyeSA9PSBudWxsKSB7XG4gICAgICB0aGlzLl9yZWdpc3RyeSA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcmVnaXN0cnlbaWRdID0gaW5zdGFuY2U7XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUudW5yZWdpc3RlciA9IGZ1bmN0aW9uKGluc3RhbmNlLCBpZCkge1xuICAgIHJldHVybiBkZWxldGUgdGhpcy5fcmVnaXN0cnlbaWRdO1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLnJlc2V0UmVnaXN0cnkgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIga2V5LCBtc2csIG9sZENvdW50LCByZWYsIHJlc3BvbmRlcjtcbiAgICBvbGRDb3VudCA9IHRoaXMuZ2V0UmVnaXN0cnlTaXplKCk7XG4gICAgcmVmID0gdGhpcy5fcmVnaXN0cnk7XG4gICAgZm9yIChrZXkgaW4gcmVmKSB7XG4gICAgICByZXNwb25kZXIgPSByZWZba2V5XTtcbiAgICAgIHJlc3BvbmRlci5yZWdpb24uY2xvc2UoKTtcbiAgICB9XG4gICAgbXNnID0gXCJUaGVyZSB3ZXJlIFwiICsgb2xkQ291bnQgKyBcIiByZXNwb25kZXJzIGluIHRoZSByZWdpc3RyeSwgdGhlcmUgYXJlIG5vdyBcIiArICh0aGlzLmdldFJlZ2lzdHJ5U2l6ZSgpKTtcbiAgICBpZiAodGhpcy5nZXRSZWdpc3RyeVNpemUoKSA+IDApIHtcbiAgICAgIHJldHVybiBjb25zb2xlLndhcm4obXNnLCB0aGlzLl9yZWdpc3RyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjb25zb2xlLmxvZyhtc2cpO1xuICAgIH1cbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5nZXRSZWdpc3RyeVNpemUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0Ll8uc2l6ZSh0aGlzLl9yZWdpc3RyeSk7XG4gIH07XG5cbiAgcmV0dXJuIEJhc2U7XG5cbn0pKE1vZGVsQmFzZSk7XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2U7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuLi8uLi9jb3JlLmpzXCI7XG5pbXBvcnQgQmFja2JvbmUgZnJvbSBcImJhY2tib25lXCI7XG5pbXBvcnQgQmFzZU1vZGVsIGZyb20gXCIuLi8uLi9lbnRpdGllcy9tb2RlbHMvYmFzZS5qc1wiO1xuaW1wb3J0IEJhc2VDb2xsZWN0aW9uIGZyb20gXCIuLi8uLi9lbnRpdGllcy9jb2xsZWN0aW9ucy9iYXNlLmpzXCI7XG5pbXBvcnQgQmFzZVJlc3BvbmRlciBmcm9tIFwiLi4vLi4vZW50aXRpZXMvcmVzcG9uZGVycy9iYXNlLmpzXCI7XG52YXIgQmFzZSxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkJhc2UgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoQmFzZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gQmFzZSgpIHtcbiAgICByZXR1cm4gQmFzZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIEJhc2UucHJvdG90eXBlLnJlc3BvbmRlcnMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYmFzZTogQmFzZVJlc3BvbmRlclxuICAgIH07XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUubW9kZWxzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJhc2U6IEJhc2VNb2RlbFxuICAgIH07XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUuY29sbGVjdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYmFzZTogQmFzZUNvbGxlY3Rpb25cbiAgICB9O1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLnZpZXdzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLmdldFJlc3BvbmRlciA9IGZ1bmN0aW9uKHJlc3BvbmRlck5hbWUsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldFJlc291cmNlKFwicmVzcG9uZGVyc1wiLCByZXNwb25kZXJOYW1lLCBvcHRpb25zKTtcbiAgfTtcblxuICBCYXNlLnByb3RvdHlwZS5nZXRWaWV3ID0gZnVuY3Rpb24odmlld05hbWUsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldFJlc291cmNlKFwidmlld3NcIiwgdmlld05hbWUsIG9wdGlvbnMpO1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLmdldE1vZGVsID0gZnVuY3Rpb24obW9kZWxOYW1lLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZXRSZXNvdXJjZShcIm1vZGVsc1wiLCBtb2RlbE5hbWUsIG9wdGlvbnMpO1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLmdldENvbGxlY3Rpb24gPSBmdW5jdGlvbihjb2xsZWN0aW9uTmFtZSwgbW9kZWxzLCBvcHRpb25zKSB7XG4gICAgaWYgKG1vZGVscyA9PSBudWxsKSB7XG4gICAgICBtb2RlbHMgPSBbXTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZXRSZXNvdXJjZShcImNvbGxlY3Rpb25zXCIsIGNvbGxlY3Rpb25OYW1lLCBvcHRpb25zLCBtb2RlbHMpO1xuICB9O1xuXG4gIEJhc2UucHJvdG90eXBlLmdldFJlc291cmNlID0gZnVuY3Rpb24ocmVzb3VyY2VzTmFtZSwgcmVzb3VyY2VOYW1lLCBvcHRpb25zLCBtb2RlbHMpIHtcbiAgICB2YXIgcmVzb3VyY2UsIHJlc291cmNlcztcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHJlc291cmNlID0gbnVsbDtcbiAgICByZXNvdXJjZXMgPSB0aGlzW3Jlc291cmNlc05hbWVdO1xuICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKHJlc291cmNlcykpIHtcbiAgICAgIHJlc291cmNlcyA9IHJlc291cmNlcygpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy52aWV3TW9kZWwgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy52aWV3TW9kZWwgPSB0aGlzO1xuICAgIH1cbiAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNPYmplY3QocmVzb3VyY2VzKSAmJiAocmVzb3VyY2VzW3Jlc291cmNlTmFtZV0gIT0gbnVsbCkpIHtcbiAgICAgIGlmIChtb2RlbHMgIT0gbnVsbCkge1xuICAgICAgICByZXNvdXJjZSA9IG5ldyByZXNvdXJjZXNbcmVzb3VyY2VOYW1lXShtb2RlbHMsIG9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb3VyY2UgPSBuZXcgcmVzb3VyY2VzW3Jlc291cmNlTmFtZV0ob3B0aW9ucyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXNvdXJjZTtcbiAgfTtcblxuICByZXR1cm4gQmFzZTtcblxufSkoQmFja2JvbmUuTW9kZWwpO1xuXG5leHBvcnQgZGVmYXVsdCBCYXNlO1xuIiwiaW1wb3J0IE1hcmlvbmV0dGlzdCBmcm9tIFwiLi4vY29yZS5qc1wiO1xudmFyIEJhc2UsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5CYXNlID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKEJhc2UsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIEJhc2UoKSB7XG4gICAgcmV0dXJuIEJhc2UuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBCYXNlLnByb3RvdHlwZS5uYXZpZ2F0ZVRvID0gZnVuY3Rpb24ocm91dGUsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHJldHVybiBNYXJpb25ldHRpc3QubG9jYXRpb24ubmF2aWdhdGVUbyhyb3V0ZSwgb3B0aW9ucyk7XG4gIH07XG5cbiAgQmFzZS5wcm90b3R5cGUuZ2V0Q3VycmVudFJvdXRlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5sb2NhdGlvbi5nZXRDdXJyZW50Um91dGUoKTtcbiAgfTtcblxuICByZXR1cm4gQmFzZTtcblxufSkoTWFyaW9uZXR0aXN0Lk9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2U7XG4iLCJpbXBvcnQgTWFyaW9uZXR0aXN0IGZyb20gXCIuL2NvcmUuanNcIjtcbnZhciBBcHBsaWNhdGlvbixcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkFwcGxpY2F0aW9uID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKEFwcGxpY2F0aW9uLCBzdXBlckNsYXNzKTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuQ29udHJvbGxlcnMgPSBuZXcgTWFyaW9uZXR0aXN0Lk9iamVjdCgpO1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5FbnRpdGllcyA9IG5ldyBNYXJpb25ldHRpc3QuT2JqZWN0KCk7XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLlZpZXdzID0gbmV3IE1hcmlvbmV0dGlzdC5PYmplY3QoKTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuX2lzUnVubmluZyA9IGZhbHNlO1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5faXNEZXN0cm95ZWQgPSBmYWxzZTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUucHJldmVudERlc3Ryb3kgPSBmYWxzZTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuc3RhcnRBZnRlckluaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLnN0YXJ0V2l0aFBhcmVudCA9IGZhbHNlO1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5zdG9wV2l0aFBhcmVudCA9IHRydWU7XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLnJlc291cmNlcyA9IFtdO1xuXG4gIGZ1bmN0aW9uIEFwcGxpY2F0aW9uKG9wdGlvbnMpIHtcbiAgICBBcHBsaWNhdGlvbi5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICB0aGlzLl9pbml0Q2hpbGRBcHBzKG9wdGlvbnMpO1xuICAgIGlmIChNYXJpb25ldHRpc3QuXy5yZXN1bHQodGhpcywgJ3N0YXJ0QWZ0ZXJJbml0aWFsaXplZCcpKSB7XG4gICAgICB0aGlzLnN0YXJ0KG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5zdGFydEhpc3RvcnkgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBpZiAoIU1hcmlvbmV0dGlzdC5CYWNrYm9uZS5IaXN0b3J5LnN0YXJ0ZWQpIHtcbiAgICAgIHJldHVybiBNYXJpb25ldHRpc3QubG9jYXRpb24uc3RhcnRIaXN0b3J5KG9wdGlvbnMpO1xuICAgIH1cbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdGhpcy50cmlnZ2VyTWV0aG9kKFwiYmVmb3JlOnJlc291cmNlczpmZXRjaFwiLCBvcHRpb25zKTtcbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0LnV0aWxzLndhaXRGb3IodGhpcy5yZXNvdXJjZXMsIHtcbiAgICAgIHN1Y2Nlc3M6IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgQXBwbGljYXRpb24uX19zdXBlcl9fLnN0YXJ0LmNhbGwoX3RoaXMsIG9wdGlvbnMpO1xuICAgICAgICAgIF90aGlzLnRyaWdnZXJNZXRob2QoXCJyZXNvdXJjZXM6ZmV0Y2g6c3VjY2Vzc1wiKTtcbiAgICAgICAgICByZXR1cm4gX3RoaXMudHJpZ2dlck1ldGhvZChcInJlYWR5XCIpO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcyksXG4gICAgICBlcnJvcjogKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMudHJpZ2dlck1ldGhvZChcInJlc291cmNlczpmZXRjaDplcnJvclwiKTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpXG4gICAgfSk7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLmlzUnVubmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9pc1J1bm5pbmc7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgaWYgKCF0aGlzLl9pc1J1bm5pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB0aGlzLnRyaWdnZXJNZXRob2QoJ2JlZm9yZTpzdG9wJywgb3B0aW9ucyk7XG4gICAgdGhpcy5faXNSdW5uaW5nID0gZmFsc2U7XG4gICAgdGhpcy50cmlnZ2VyTWV0aG9kKCdzdG9wJywgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLl9pbml0Q2hpbGRBcHBzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNoaWxkQXBwcywgb3B0aW9ucztcbiAgICBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdm9pZCAwID8ge30gOiBhcmd1bWVudHNbMF07XG4gICAgdGhpcy5fY2hpbGRBcHBzID0ge307XG4gICAgdGhpcy5tZXJnZU9wdGlvbnMob3B0aW9ucywgWydjaGlsZEFwcHMnLCAnY2hpbGRBcHBPcHRpb25zJ10pO1xuICAgIGNoaWxkQXBwcyA9IHRoaXMuY2hpbGRBcHBzO1xuICAgIGlmIChjaGlsZEFwcHMpIHtcbiAgICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKGNoaWxkQXBwcykpIHtcbiAgICAgICAgY2hpbGRBcHBzID0gY2hpbGRBcHBzLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgICB0aGlzLmFkZENoaWxkQXBwcyhjaGlsZEFwcHMpO1xuICAgIH1cbiAgICB0aGlzLl9pbml0TGlzdGVuZXJzKCk7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLl9pbml0TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5vbih7XG4gICAgICAnc3RhcnQnOiB0aGlzLl9zdGFydENoaWxkQXBwcyxcbiAgICAgICdiZWZvcmU6c3RvcCc6IHRoaXMuX3N0b3BDaGlsZEFwcHMsXG4gICAgICAnYmVmb3JlOmRlc3Ryb3knOiB0aGlzLl9kZXN0cm95Q2hpbGRBcHBzXG4gICAgfSk7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLl9zdGFydENoaWxkQXBwcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0Ll8uZWFjaCh0aGlzLl9jaGlsZEFwcHMsIGZ1bmN0aW9uKGNoaWxkQXBwKSB7XG4gICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8ucmVzdWx0KGNoaWxkQXBwLCAnc3RhcnRXaXRoUGFyZW50JykpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkQXBwLnN0YXJ0KG9wdGlvbnMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5fc3RvcENoaWxkQXBwcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gTWFyaW9uZXR0aXN0Ll8uZWFjaCh0aGlzLl9jaGlsZEFwcHMsIGZ1bmN0aW9uKGNoaWxkQXBwKSB7XG4gICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8ucmVzdWx0KGNoaWxkQXBwLCAnc3RvcFdpdGhQYXJlbnQnKSkge1xuICAgICAgICByZXR1cm4gY2hpbGRBcHAuc3RvcChvcHRpb25zKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuX2Rlc3Ryb3lDaGlsZEFwcHMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgcmV0dXJuIE1hcmlvbmV0dGlzdC5fLmVhY2godGhpcy5fY2hpbGRBcHBzLCBmdW5jdGlvbihjaGlsZEFwcCkge1xuICAgICAgaWYgKCFNYXJpb25ldHRpc3QuXy5yZXN1bHQoY2hpbGRBcHAsICdwcmV2ZW50RGVzdHJveScpKSB7XG4gICAgICAgIHJldHVybiBjaGlsZEFwcC5kZXN0cm95KG9wdGlvbnMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5fYnVpbGRBcHBGcm9tT2JqZWN0ID0gZnVuY3Rpb24oYXBwQ29uZmlnKSB7XG4gICAgdmFyIEFwcENsYXNzLCBvcHRpb25zO1xuICAgIEFwcENsYXNzID0gYXBwQ29uZmlnLkFwcENsYXNzO1xuICAgIG9wdGlvbnMgPSBNYXJpb25ldHRpc3QuXy5vbWl0KGFwcENvbmZpZywgJ0FwcENsYXNzJyk7XG4gICAgcmV0dXJuIHRoaXMuYnVpbGRBcHAoQXBwQ2xhc3MsIG9wdGlvbnMpO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5fYnVpbGRBcHAgPSBmdW5jdGlvbihBcHBDbGFzcywgb3B0aW9ucykge1xuICAgIGlmIChNYXJpb25ldHRpc3QuXy5pc0Z1bmN0aW9uKEFwcENsYXNzKSkge1xuICAgICAgcmV0dXJuIHRoaXMuYnVpbGRBcHAoQXBwQ2xhc3MsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNPYmplY3QoQXBwQ2xhc3MpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYnVpbGRBcHBGcm9tT2JqZWN0KEFwcENsYXNzKTtcbiAgICB9XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLmJ1aWxkQXBwID0gZnVuY3Rpb24oQXBwQ2xhc3MsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gTWFyaW9uZXR0aXN0Ll8uZXh0ZW5kKHt9LCB0aGlzLmNoaWxkQXBwT3B0aW9ucywgb3B0aW9ucyk7XG4gICAgcmV0dXJuIG5ldyBBcHBDbGFzcyhvcHRpb25zKTtcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuX2Vuc3VyZUFwcElzVW5pcXVlID0gZnVuY3Rpb24oYXBwTmFtZSkge1xuICAgIGlmICh0aGlzLl9jaGlsZEFwcHNbYXBwTmFtZV0pIHtcbiAgICAgIHRocm93IG5ldyBNYXJpb25ldHRlLkVycm9yKHtcbiAgICAgICAgbmFtZTogJ0R1cGxpY2F0ZUNoaWxkQXBwRXJyb3InLFxuICAgICAgICBtZXNzYWdlOiAnQSBjaGlsZCBBcHAgd2l0aCBuYW1lIFwiJyArIGFwcE5hbWUgKyAnXCIgaGFzIGFscmVhZHkgYmVlbiBhZGRlZC4nXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLmFkZENoaWxkQXBwcyA9IGZ1bmN0aW9uKGNoaWxkQXBwcykge1xuICAgIHJldHVybiBNYXJpb25ldHRpc3QuXy5lYWNoKGNoaWxkQXBwcywgKGZ1bmN0aW9uKGNoaWxkQXBwLCBhcHBOYW1lKSB7XG4gICAgICB0aGlzLmFkZENoaWxkQXBwKGFwcE5hbWUsIGNoaWxkQXBwKTtcbiAgICB9KSwgdGhpcyk7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLmFkZENoaWxkQXBwID0gZnVuY3Rpb24oYXBwTmFtZSwgQXBwQ2xhc3MsIG9wdGlvbnMpIHtcbiAgICB2YXIgY2hpbGRBcHA7XG4gICAgdGhpcy5fZW5zdXJlQXBwSXNVbmlxdWUoYXBwTmFtZSk7XG4gICAgY2hpbGRBcHAgPSB0aGlzLl9idWlsZEFwcChBcHBDbGFzcywgb3B0aW9ucyk7XG4gICAgaWYgKCFjaGlsZEFwcCkge1xuICAgICAgdGhyb3cgbmV3IE1hcmlvbmV0dGUuRXJyb3Ioe1xuICAgICAgICBuYW1lOiAnQWRkQ2hpbGRBcHBFcnJvcicsXG4gICAgICAgIG1lc3NhZ2U6ICdBcHAgYnVpbGQgZmFpbGVkLiAgSW5jb3JyZWN0IGNvbmZpZ3VyYXRpb24uJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIGNoaWxkQXBwLl9uYW1lID0gYXBwTmFtZTtcbiAgICB0aGlzLl9jaGlsZEFwcHNbYXBwTmFtZV0gPSBjaGlsZEFwcDtcbiAgICBjaGlsZEFwcC5vbignZGVzdHJveScsIE1hcmlvbmV0dGlzdC5fLnBhcnRpYWwodGhpcy5fcmVtb3ZlQ2hpbGRBcHAsIGFwcE5hbWUpLCB0aGlzKTtcbiAgICBpZiAodGhpcy5pc1J1bm5pbmcoKSAmJiBNYXJpb25ldHRpc3QuXy5yZXN1bHQoY2hpbGRBcHAsICdzdGFydFdpdGhQYXJlbnQnKSkge1xuICAgICAgY2hpbGRBcHAuc3RhcnQoKTtcbiAgICB9XG4gICAgcmV0dXJuIGNoaWxkQXBwO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5nZXROYW1lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH07XG5cbiAgQXBwbGljYXRpb24ucHJvdG90eXBlLmdldENoaWxkQXBwcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBNYXJpb25ldHRpc3QuXy5jbG9uZSh0aGlzLl9jaGlsZEFwcHMpO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5nZXRDaGlsZEFwcCA9IGZ1bmN0aW9uKGFwcE5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fY2hpbGRBcHBzW2FwcE5hbWVdO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5fcmVtb3ZlQ2hpbGRBcHAgPSBmdW5jdGlvbihhcHBOYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMuX2NoaWxkQXBwc1thcHBOYW1lXS5fbmFtZTtcbiAgICBkZWxldGUgdGhpcy5fY2hpbGRBcHBzW2FwcE5hbWVdO1xuICB9O1xuXG4gIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5yZW1vdmVDaGlsZEFwcHMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2hpbGRBcHBzO1xuICAgIGNoaWxkQXBwcyA9IHRoaXMuZ2V0Q2hpbGRBcHBzKCk7XG4gICAgTWFyaW9uZXR0aXN0Ll8uZWFjaCh0aGlzLl9jaGlsZEFwcHMsIChmdW5jdGlvbihjaGlsZEFwcCwgYXBwTmFtZSkge1xuICAgICAgdGhpcy5yZW1vdmVDaGlsZEFwcChhcHBOYW1lKTtcbiAgICB9KSwgdGhpcyk7XG4gICAgcmV0dXJuIGNoaWxkQXBwcztcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBcHAgPSBmdW5jdGlvbihhcHBOYW1lLCBvcHRpb25zKSB7XG4gICAgdmFyIGNoaWxkQXBwO1xuICAgIG9wdGlvbnMgPSBNYXJpb25ldHRpc3QuXy5leHRlbmQoe30sIG9wdGlvbnMpO1xuICAgIGNoaWxkQXBwID0gdGhpcy5nZXRDaGlsZEFwcChhcHBOYW1lKTtcbiAgICBpZiAoIWNoaWxkQXBwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnByZXZlbnREZXN0cm95IHx8IE1hcmlvbmV0dGlzdC5fLnJlc3VsdChjaGlsZEFwcCwgJ3ByZXZlbnREZXN0cm95JykpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUNoaWxkQXBwKGFwcE5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGlsZEFwcC5kZXN0cm95KCk7XG4gICAgfVxuICAgIHJldHVybiBjaGlsZEFwcDtcbiAgfTtcblxuICBBcHBsaWNhdGlvbi5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCkge307XG5cbiAgcmV0dXJuIEFwcGxpY2F0aW9uO1xuXG59KShNYXJpb25ldHRpc3QuQXBwbGljYXRpb24pO1xuXG5leHBvcnQgZGVmYXVsdCBBcHBsaWNhdGlvbjtcbiIsImltcG9ydCBNYXJpb25ldHRpc3QgZnJvbSBcIi4vY29yZS5qc1wiO1xuaW1wb3J0IEVudiBmcm9tIFwiLi9lbnYuanNcIjtcbmltcG9ydCBDaGFubmVscyBmcm9tIFwiLi9jaGFubmVscy5qc1wiO1xuaW1wb3J0IExvY2F0aW9uIGZyb20gXCIuL2xvY2F0aW9uLmpzXCI7XG5pbXBvcnQgQ29uZmlnIGZyb20gXCIuL2NvbmZpZy5qc1wiO1xuaW1wb3J0IFJlbmRlcmVyIGZyb20gXCIuL21peGlucy9yZW5kZXJlci5qc1wiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzLmpzXCI7XG5pbXBvcnQgTG9nZ2VyIGZyb20gXCIuL2xvZ2dlci5qc1wiO1xuaW1wb3J0IEFwcFJvdXRlIGZyb20gXCIuL3JvdXRlLmpzXCI7XG5pbXBvcnQgQXBwUm91dGVyIGZyb20gXCIuL3JvdXRlci5qc1wiO1xuaW1wb3J0IFJlZ2lvbiBmcm9tIFwiLi9yZWdpb24uanNcIjtcbmltcG9ydCBWaWV3cyBmcm9tIFwiLi92aWV3cy5qc1wiO1xuaW1wb3J0IEJhc2VWaWV3IGZyb20gXCIuL3ZpZXdzL2Jhc2UuanNcIjtcbmltcG9ydCBDb2xsZWN0aW9uVmlldyBmcm9tIFwiLi92aWV3cy9jb2xsZWN0aW9uLmpzXCI7XG5pbXBvcnQgQmFzZU1vZGVsIGZyb20gXCIuL2VudGl0aWVzL21vZGVscy9iYXNlLmpzXCI7XG5pbXBvcnQgQmFzZUNvbGxlY3Rpb24gZnJvbSBcIi4vZW50aXRpZXMvY29sbGVjdGlvbnMvYmFzZS5qc1wiO1xuaW1wb3J0IEJhc2VSZXNwb25kZXIgZnJvbSBcIi4vZW50aXRpZXMvcmVzcG9uZGVycy9iYXNlLmpzXCI7XG5pbXBvcnQgQmFzZVZpZXdNb2RlbCBmcm9tIFwiLi9lbnRpdGllcy92aWV3LW1vZGVscy9iYXNlLmpzXCI7XG5pbXBvcnQgQmFzZUNvbnRyb2xsZXIgZnJvbSBcIi4vY29udHJvbGxlcnMvYmFzZS5qc1wiO1xuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gXCIuL2FwcGxpY2F0aW9uLmpzXCI7XG52YXIgcm9vdCxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbnJvb3QgPSB0eXBlb2Ygc2VsZiA9PT0gJ29iamVjdCcgJiYgc2VsZi5zZWxmID09PSBzZWxmICYmIHNlbGYgfHwgdHlwZW9mIGdsb2JhbCA9PT0gJ29iamVjdCcgJiYgZ2xvYmFsLmdsb2JhbCA9PT0gZ2xvYmFsICYmIGdsb2JhbDtcblxuTWFyaW9uZXR0aXN0LmNoYW5uZWxzID0gbmV3IENoYW5uZWxzKCk7XG5cbk1hcmlvbmV0dGlzdC5sb2NhdGlvbiA9IG5ldyBMb2NhdGlvbigpO1xuXG5NYXJpb25ldHRpc3QuZW52ID0gbmV3IEVudigpO1xuXG5NYXJpb25ldHRpc3QuY29uZmlnID0gbmV3IENvbmZpZygpO1xuXG5NYXJpb25ldHRpc3QubG9nZ2VyID0gbmV3IExvZ2dlcjtcblxuTWFyaW9uZXR0aXN0Ll8uZXh0ZW5kKE1hcmlvbmV0dGlzdC5SZW5kZXJlciwgUmVuZGVyZXIpO1xuXG5NYXJpb25ldHRpc3QudXRpbHMgPSBuZXcgVXRpbHM7XG5cbk1hcmlvbmV0dGlzdC5BcHBSb3V0ZSA9IEFwcFJvdXRlO1xuXG5NYXJpb25ldHRpc3QuQXBwUm91dGVyID0gQXBwUm91dGVyO1xuXG5NYXJpb25ldHRpc3QuXy5leHRlbmQoTWFyaW9uZXR0aXN0LlJlZ2lvbi5wcm90b3R5cGUsIFJlZ2lvbi5wcm90b3R5cGUpO1xuXG5NYXJpb25ldHRpc3QuVmlld3MgPSBuZXcgVmlld3MoKTtcblxuTWFyaW9uZXR0aXN0Ll8uZXh0ZW5kKE1hcmlvbmV0dGlzdC5WaWV3LnByb3RvdHlwZSwge1xuICB0ZW1wbGF0ZUNvbnRleHQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBoZWxwZXJzLCB2aWV3Q29udGV4dDtcbiAgICBoZWxwZXJzID0gTWFyaW9uZXR0aXN0LlZpZXdzLnRlbXBsYXRlSGVscGVycztcbiAgICBpZiAodGhpcy52aWV3Q29udGV4dCAhPSBudWxsKSB7XG4gICAgICB2aWV3Q29udGV4dCA9IHRoaXMudmlld0NvbnRleHQ7XG4gICAgICBpZiAoTWFyaW9uZXR0aXN0Ll8uaXNGdW5jdGlvbih0aGlzLnZpZXdDb250ZXh0KSkge1xuICAgICAgICB2aWV3Q29udGV4dCA9IHRoaXMudmlld0NvbnRleHQoKTtcbiAgICAgIH1cbiAgICAgIE1hcmlvbmV0dGlzdC5fLmV4dGVuZChoZWxwZXJzLCB2aWV3Q29udGV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlbHBlcnMudmlld0NvbnRleHQgPSB7fTtcbiAgICB9XG4gICAgcmV0dXJuIGhlbHBlcnM7XG4gIH1cbn0pO1xuXG5NYXJpb25ldHRpc3QuVmlld3MuQmFzZVZpZXcgPSBCYXNlVmlldztcblxuTWFyaW9uZXR0aXN0LlZpZXdzLkNvbGxlY3Rpb24gPSBDb2xsZWN0aW9uVmlldztcblxuTWFyaW9uZXR0aXN0LkVudGl0aWVzID0gbmV3IE1hcmlvbmV0dGlzdC5PYmplY3QoKTtcblxuTWFyaW9uZXR0aXN0LkVudGl0aWVzLk1vZGVscyA9IG5ldyBNYXJpb25ldHRpc3QuT2JqZWN0KCk7XG5cbk1hcmlvbmV0dGlzdC5FbnRpdGllcy5Db2xsZWN0aW9ucyA9IG5ldyBNYXJpb25ldHRpc3QuT2JqZWN0KCk7XG5cbk1hcmlvbmV0dGlzdC5FbnRpdGllcy5WaWV3TW9kZWxzID0gbmV3IE1hcmlvbmV0dGlzdC5PYmplY3QoKTtcblxuTWFyaW9uZXR0aXN0LkVudGl0aWVzLlJlc3BvbmRlcnMgPSBuZXcgTWFyaW9uZXR0aXN0Lk9iamVjdCgpO1xuXG5NYXJpb25ldHRpc3QuRW50aXRpZXMuTW9kZWxzLkJhc2UgPSBCYXNlTW9kZWw7XG5cbmlmIChNYXJpb25ldHRpc3QuQmFja2JvbmUuQXNzb2NpYXRlZE1vZGVsKSB7XG4gIE1hcmlvbmV0dGlzdC5FbnRpdGllcy5Nb2RlbHMuQXNzb2NpYXRlZCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgZXh0ZW5kKEFzc29jaWF0ZWQsIHN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gQXNzb2NpYXRlZCgpIHtcbiAgICAgIHJldHVybiBBc3NvY2lhdGVkLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIHJldHVybiBBc3NvY2lhdGVkO1xuXG4gIH0pKE1hcmlvbmV0dGlzdC5CYWNrYm9uZS5Bc3NvY2lhdGVkTW9kZWwpO1xufVxuXG5NYXJpb25ldHRpc3QuRW50aXRpZXMuQ29sbGVjdGlvbnMuQmFzZSA9IEJhc2VDb2xsZWN0aW9uO1xuXG5NYXJpb25ldHRpc3QuRW50aXRpZXMuUmVzcG9uZGVycy5CYXNlID0gQmFzZVJlc3BvbmRlcjtcblxuTWFyaW9uZXR0aXN0LkVudGl0aWVzLlZpZXdNb2RlbHMuQmFzZSA9IEJhc2VWaWV3TW9kZWw7XG5cbk1hcmlvbmV0dGlzdC5Db250cm9sbGVycyA9IG5ldyBNYXJpb25ldHRpc3QuT2JqZWN0KCk7XG5cbk1hcmlvbmV0dGlzdC5Db250cm9sbGVycy5CYXNlID0gQmFzZUNvbnRyb2xsZXI7XG5cbk1hcmlvbmV0dGlzdC5BcHBsaWNhdGlvbiA9IEFwcGxpY2F0aW9uO1xuXG5pZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwgIT09IG51bGwpIHtcbiAgZ2xvYmFsLk1hcmlvbmV0dGlzdCA9IE1hcmlvbmV0dGlzdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFyaW9uZXR0aXN0O1xuIl0sIm5hbWVzIjpbIk1hcmlvbmV0dGlzdCIsIk1hcmlvbmV0dGUiLCJoYXNQcm9wIiwiZXh0ZW5kIiwiVGVtcGxhdGVzIiwic2xpY2UiLCJCYXNlIiwiTW9kZWxCYXNlIiwiQmFzZVZpZXciLCJDaGFubmVscyIsIkxvY2F0aW9uIiwiRW52IiwiQ29uZmlnIiwiTG9nZ2VyIiwiUmVuZGVyZXIiLCJVdGlscyIsIkFwcFJvdXRlIiwiQXBwUm91dGVyIiwiUmVnaW9uIiwiVmlld3MiLCJDb2xsZWN0aW9uVmlldyIsIkFwcGxpY2F0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFhQSxJQUFJQSxjQUFZLENBQUM7O0FBRWpCQSxjQUFZLEdBQUdDLFlBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7QUFFbkNELGNBQVksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDOztBQUVqQ0EsY0FBWSxDQUFDLFVBQVUsR0FBR0MsWUFBVSxDQUFDOztBQUVyQ0QsY0FBWSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRW5CQSxjQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFbkJBLGNBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVuQkEsY0FBWSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7O0FBRTVCQSxjQUFZLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzs7QUFFL0JBLGNBQVksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztBQUU3QixxQkFBZUEsY0FBWSxDQUFDOztBQ2hDeEIsSUFBQSxHQUFHLENBQUE7QUFDTCxJQUFBRyxRQUFNLEdBQUcsU0FBUyxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLEVBQUUsRUFBRSxJQUFJRCxTQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLElBQUksR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxFQUFFLENBQUE7QUFDMVIsSUFBQUEsU0FBTyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUE7QUFFN0IsR0FBRyxHQUFHLENBQUMsU0FBUyxVQUFVLEVBQUU7RUFDMUJDLFFBQU0sQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7O0VBRXhCLFNBQVMsR0FBRyxHQUFHO0lBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7R0FDNUI7O0VBRUQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEdBQUcsV0FBVztJQUN2QyxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssYUFBYSxDQUFDO0dBQ3JDLENBQUM7O0VBRUYsR0FBRyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsV0FBVztJQUN0QyxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssWUFBWSxDQUFDO0dBQ3BDLENBQUM7O0VBRUYsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsV0FBVztJQUNuQyxPQUFPSCxjQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztHQUNuQyxDQUFDOztFQUVGLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLFNBQVMsS0FBSyxFQUFFO0lBQ3ZDLElBQUksUUFBUSxDQUFDO0lBQ2IsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDbkIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7R0FDNUQsQ0FBQzs7RUFFRixHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxXQUFXO0lBQ2xDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztHQUNuQixDQUFDOztFQUVGLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLFNBQVMsTUFBTSxFQUFFLFFBQVEsRUFBRTtJQUNuRCxJQUFJLFNBQVMsQ0FBQztJQUNkLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtNQUNsQixNQUFNLEdBQUcsSUFBSSxDQUFDO0tBQ2Y7SUFDRCxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7TUFDcEIsUUFBUSxHQUFHLElBQUksQ0FBQztLQUNqQjtJQUNELFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDN0IsT0FBT0EsY0FBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUFFO01BQzFEQSxjQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsZUFBZSxFQUFFO1FBQzdELGFBQWEsRUFBRSxNQUFNO1FBQ3JCLFNBQVMsRUFBRSxTQUFTO09BQ3JCLENBQUMsQ0FBQztNQUNILElBQUlBLGNBQVksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3ZDLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQ3BCO0tBQ0YsQ0FBQyxDQUFDO0dBQ0osQ0FBQzs7RUFFRixPQUFPLEdBQUcsQ0FBQzs7Q0FFWixDQUFDLENBQUNBLGNBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFeEIsWUFBZSxHQUFHLENBQUM7O0FDMURmLElBQUEsUUFBUSxDQUFBO0FBQ1YsSUFBQUcsUUFBTSxHQUFHLFNBQVMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFLEVBQUUsSUFBSUQsU0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxJQUFJLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUMsRUFBRSxDQUFBO0FBQzFSLElBQUFBLFNBQU8sR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFBO0FBRTdCLFFBQVEsR0FBRyxDQUFDLFNBQVMsVUFBVSxFQUFFO0VBQy9CQyxRQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDOztFQUU3QixTQUFTLFFBQVEsR0FBRyxFQUFFOztFQUV0QixRQUFRLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxTQUFTLFdBQVcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFO0lBQ2xFLElBQUksV0FBVyxJQUFJLElBQUksRUFBRTtNQUN2QixXQUFXLEdBQUcsUUFBUSxDQUFDO0tBQ3hCO0lBQ0QsSUFBSSxTQUFTLElBQUksSUFBSSxFQUFFO01BQ3JCLFNBQVMsR0FBRyxFQUFFLENBQUM7S0FDaEI7SUFDRCxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7TUFDaEIsSUFBSSxHQUFHLEVBQUUsQ0FBQztLQUNYO0lBQ0QsT0FBT0gsY0FBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7R0FDbEYsQ0FBQzs7RUFFRixRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxTQUFTLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFO0lBQ3hFLElBQUksT0FBTyxDQUFDO0lBQ1osSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO01BQ3ZCLFdBQVcsR0FBRyxRQUFRLENBQUM7S0FDeEI7SUFDRCxJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUU7TUFDckIsU0FBUyxHQUFHLEVBQUUsQ0FBQztLQUNoQjtJQUNELE9BQU8sR0FBR0EsY0FBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzNELElBQUlBLGNBQVksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO01BQ3ZDLE9BQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDL0MsTUFBTTtNQUNMLE9BQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUNwQztHQUNGLENBQUM7O0VBRUYsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRTtJQUNwRSxJQUFJLE9BQU8sQ0FBQztJQUNaLElBQUksV0FBVyxJQUFJLElBQUksRUFBRTtNQUN2QixXQUFXLEdBQUcsUUFBUSxDQUFDO0tBQ3hCO0lBQ0QsSUFBSSxTQUFTLElBQUksSUFBSSxFQUFFO01BQ3JCLFNBQVMsR0FBRyxFQUFFLENBQUM7S0FDaEI7SUFDRCxPQUFPLEdBQUdBLGNBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRCxJQUFJQSxjQUFZLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtNQUN2QyxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzNDLE1BQU07TUFDTCxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDaEM7R0FDRixDQUFDOztFQUVGLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLFNBQVMsV0FBVyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUU7SUFDbEUsSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO01BQ3ZCLFdBQVcsR0FBRyxRQUFRLENBQUM7S0FDeEI7SUFDRCxJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUU7TUFDckIsU0FBUyxHQUFHLEVBQUUsQ0FBQztLQUNoQjtJQUNELElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtNQUNoQixJQUFJLEdBQUcsRUFBRSxDQUFDO0tBQ1g7SUFDRCxPQUFPQSxjQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztHQUNsRixDQUFDOztFQUVGLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLFNBQVMsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUU7SUFDeEUsSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO01BQ3ZCLFdBQVcsR0FBRyxRQUFRLENBQUM7S0FDeEI7SUFDRCxJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUU7TUFDckIsU0FBUyxHQUFHLEVBQUUsQ0FBQztLQUNoQjtJQUNELE9BQU9BLGNBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0dBQ2pGLENBQUM7O0VBRUYsT0FBTyxRQUFRLENBQUM7O0NBRWpCLENBQUMsQ0FBQ0EsY0FBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUV4QixpQkFBZSxRQUFRLENBQUM7O0FDakZwQixJQUFBLFFBQVEsQ0FBQTtBQUNWLElBQUFHLFFBQU0sR0FBRyxTQUFTLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxLQUFLLElBQUksR0FBRyxJQUFJLE1BQU0sRUFBRSxFQUFFLElBQUlELFNBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsSUFBSSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLEVBQUUsQ0FBQTtBQUMxUixJQUFBQSxTQUFPLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQTtBQUU3QixRQUFRLEdBQUcsQ0FBQyxTQUFTLFVBQVUsRUFBRTtFQUMvQkMsUUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQzs7RUFFN0IsU0FBUyxRQUFRLEdBQUcsRUFBRTs7RUFFdEIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsU0FBUyxRQUFRLEVBQUU7SUFDbkQsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO01BQ3BCLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7S0FDbkM7SUFDRCxPQUFPSCxjQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7R0FDeEQsQ0FBQzs7RUFFRixRQUFRLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxTQUFTLEtBQUssRUFBRSxPQUFPLEVBQUU7SUFDdkQsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO01BQ25CLE9BQU8sR0FBRyxFQUFFLENBQUM7S0FDZDtJQUNELE9BQU9BLGNBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7R0FDL0QsQ0FBQzs7RUFFRixRQUFRLENBQUMsU0FBUyxDQUFDLGVBQWUsR0FBRyxXQUFXO0lBQzlDLElBQUksSUFBSSxDQUFDO0lBQ1QsSUFBSSxHQUFHQSxjQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDOUMsSUFBSUEsY0FBWSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7TUFDaEMsT0FBTyxJQUFJLENBQUM7S0FDYixNQUFNO01BQ0wsT0FBTyxJQUFJLENBQUM7S0FDYjtHQUNGLENBQUM7O0VBRUYsUUFBUSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsU0FBUyxPQUFPLEVBQUU7SUFDbEQsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO01BQ25CLE9BQU8sR0FBRyxFQUFFLENBQUM7S0FDZDtJQUNELElBQUlBLGNBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtNQUN6QyxPQUFPQSxjQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDckQ7R0FDRixDQUFDOztFQUVGLE9BQU8sUUFBUSxDQUFDOztDQUVqQixDQUFDLENBQUNBLGNBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFeEIsaUJBQWUsUUFBUSxDQUFDOztBQzlDeEIsSUFBSSxTQUFTLENBQUM7O0FBRWQsU0FBUyxHQUFHLENBQUMsV0FBVztFQUN0QixTQUFTLFNBQVMsR0FBRyxFQUFFOztFQUV2QixTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7O0VBRWxDLFNBQVMsQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQzs7RUFFckMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsV0FBVztJQUN0QyxJQUFJLE1BQU0sQ0FBQztJQUNYLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDWixJQUFJLE9BQU8sSUFBSSxLQUFLLFdBQVcsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO01BQ2hELE1BQU0sR0FBRyxJQUFJLENBQUM7S0FDZjtJQUNELElBQUksT0FBTyxHQUFHLEtBQUssV0FBVyxJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7TUFDOUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztLQUNkO0lBQ0QsT0FBTyxNQUFNLENBQUM7R0FDZixDQUFDOztFQUVGLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLFNBQVMsWUFBWSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7SUFDakUsSUFBSSxNQUFNLEVBQUUsUUFBUSxDQUFDO0lBQ3JCLElBQUksWUFBWSxJQUFJLElBQUksRUFBRTtNQUN4QixZQUFZLEdBQUcsRUFBRSxDQUFDO0tBQ25CO0lBQ0QsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO01BQ2hCLElBQUksR0FBRyxFQUFFLENBQUM7S0FDWDtJQUNELElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtNQUNuQixPQUFPLEdBQUcsRUFBRSxDQUFDO0tBQ2Q7SUFDRCxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ2QsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsSUFBSUEsY0FBWSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUU7TUFDM0MsTUFBTSxHQUFHLE1BQU0sRUFBRSxDQUFDO0tBQ25CO0lBQ0QsSUFBSSxPQUFPLENBQUMsZUFBZSxJQUFJLElBQUksRUFBRTtNQUNuQyxRQUFRLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQztLQUNwQztJQUNELElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUlBLGNBQVksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFO01BQ3ZFLFFBQVEsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdkM7SUFDRCxPQUFPLFFBQVEsQ0FBQztHQUNqQixDQUFDOztFQUVGLE9BQU8sU0FBUyxDQUFDOztDQUVsQixDQUFDLEVBQUUsQ0FBQzs7QUFFTCxrQkFBZSxTQUFTLENBQUM7O0FDakRyQixJQUFBLE1BQU0sQ0FBQTtBQUNSLElBQUFHLFFBQU0sR0FBRyxTQUFTLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxLQUFLLElBQUksR0FBRyxJQUFJLE1BQU0sRUFBRSxFQUFFLElBQUlELFNBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsSUFBSSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLEVBQUUsQ0FBQTtBQUMxUixJQUFBQSxTQUFPLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQTtBQUU3QixNQUFNLEdBQUcsQ0FBQyxTQUFTLFVBQVUsRUFBRTtFQUM3QkMsUUFBTSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQzs7RUFFM0IsU0FBUyxNQUFNLEdBQUc7SUFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJQyxXQUFTLEVBQUUsQ0FBQztHQUNsQzs7RUFFRCxPQUFPLE1BQU0sQ0FBQzs7Q0FFZixDQUFDLENBQUNKLGNBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFeEIsZUFBZSxNQUFNLENBQUM7O0FDakJ0QixJQUFJLFFBQVEsQ0FBQzs7QUFFYixRQUFRLEdBQUc7RUFDVCxNQUFNLEVBQUUsU0FBUyxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQy9CLElBQUksY0FBYyxDQUFDO0lBQ25CLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7TUFDdkMsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdkIsTUFBTTtNQUNMLElBQUksUUFBUSxLQUFLLEtBQUssRUFBRTtRQUN0QixPQUFPO09BQ1I7TUFDRCxjQUFjLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztNQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDOUMsTUFBTSxXQUFXLEdBQUcsUUFBUSxHQUFHLGlCQUFpQixDQUFDO09BQ2xEO01BQ0QsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDN0I7R0FDRjtFQUNELFdBQVcsRUFBRSxTQUFTLFFBQVEsRUFBRTtJQUM5QixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDO0lBQ2xFLE9BQU8sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7SUFDcEQsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtNQUN0QyxPQUFPLEdBQUcsT0FBTyxFQUFFLENBQUM7S0FDckI7SUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7TUFDcEMsTUFBTSw4QkFBOEIsQ0FBQztLQUN0QztJQUNELFNBQVMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZCLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7TUFDeEIsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDaEI7SUFDRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtNQUM5QyxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQ3BCLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xELElBQUksR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMxRCxJQUFJLFVBQVUsSUFBSSxJQUFJLEVBQUU7VUFDdEIsT0FBTyxVQUFVLENBQUM7U0FDbkI7T0FDRjtLQUNGO0dBQ0Y7RUFDRCxjQUFjLEVBQUUsU0FBUyxJQUFJLEVBQUUsUUFBUSxFQUFFO0lBQ3ZDLElBQUksTUFBTSxFQUFFLFVBQVUsQ0FBQztJQUN2QixNQUFNLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO0lBQzlDLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUU7TUFDckMsTUFBTSxHQUFHLE1BQU0sRUFBRSxDQUFDO0tBQ25CO0lBQ0QsVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7TUFDaEQsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsUUFBUSxHQUFHLE9BQU8sR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7S0FDbEY7SUFDRCxJQUFJLFVBQVUsRUFBRTtNQUNkLE9BQU8sVUFBVSxDQUFDO0tBQ25CO0dBQ0Y7RUFDRCxZQUFZLEVBQUUsU0FBUyxNQUFNLEVBQUU7SUFDN0IsSUFBSSxLQUFLLENBQUM7SUFDVixJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7TUFDbEIsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7TUFDMUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7TUFDakMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3hCO0dBQ0Y7Q0FDRixDQUFDOztBQUVGLGlCQUFlLFFBQVEsQ0FBQzs7QUNqRXBCLElBQUEsS0FBSyxDQUFBO0FBQ1AsSUFBQUcsUUFBTSxHQUFHLFNBQVMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFLEVBQUUsSUFBSUQsU0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxJQUFJLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUMsRUFBRSxDQUFBO0FBQzFSLElBQUFBLFNBQU8sR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFBO0FBQzNCLElBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUE7QUFFbEIsS0FBSyxHQUFHLENBQUMsU0FBUyxVQUFVLEVBQUU7RUFDNUJDLFFBQU0sQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7O0VBRTFCLFNBQVMsS0FBSyxHQUFHO0lBQ2YsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0dBQzNEOztFQUVELEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLFNBQVMsS0FBSyxFQUFFO0lBQ3hDLElBQUksSUFBSSxDQUFDO0lBQ1QsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNWLElBQUksR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDO0lBQ25CLE9BQU8sSUFBSSxDQUFDO0dBQ2IsQ0FBQzs7RUFFRixLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxTQUFTLFFBQVEsRUFBRSxPQUFPLEVBQUU7SUFDcEQsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO01BQ25CLE9BQU8sR0FBRyxFQUFFLENBQUM7S0FDZDtJQUNELFFBQVEsS0FBSztNQUNYLEtBQUssT0FBTyxDQUFDLFdBQVcsS0FBSyxVQUFVO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztNQUNsRDtRQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDL0M7R0FDRixDQUFDOztFQUVGLEtBQUssQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLFNBQVMsWUFBWSxFQUFFLE9BQU8sRUFBRTtJQUM3RCxJQUFJLEdBQUcsRUFBRSxJQUFJLENBQUM7SUFDZCxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7TUFDbkIsT0FBTyxHQUFHLEVBQUUsQ0FBQztLQUNkO0lBQ0QsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNWLElBQUksR0FBR0gsY0FBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzlELE9BQU8sQ0FBQyxHQUFHLEdBQUdBLGNBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXO01BQ25FLElBQUksSUFBSSxDQUFDO01BQ1QsSUFBSSxHQUFHLENBQUMsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztNQUM3RCxJQUFJQSxjQUFZLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDOUMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7T0FDN0M7S0FDRixDQUFDLEVBQUUsV0FBVztNQUNiLElBQUksSUFBSSxDQUFDO01BQ1QsSUFBSSxHQUFHLENBQUMsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztNQUM3RCxJQUFJQSxjQUFZLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDNUMsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7T0FDM0M7S0FDRixDQUFDLENBQUM7R0FDSixDQUFDOztFQUVGLEtBQUssQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxRQUFRLEVBQUUsT0FBTyxFQUFFO0lBQzdELElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtNQUNuQixPQUFPLEdBQUcsRUFBRSxDQUFDO0tBQ2Q7SUFDRCxRQUFRLEdBQUdBLGNBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM5RCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLE9BQU8sRUFBRTtNQUNoRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUMxQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxXQUFXLEVBQUU7TUFDN0IsSUFBSSxNQUFNLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsV0FBVyxDQUFDO01BQzVDLFdBQVcsR0FBRyxFQUFFLENBQUM7TUFDakIsTUFBTSxHQUFHLEVBQUUsQ0FBQztNQUNaLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xELFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsSUFBSSxVQUFVLENBQUMsV0FBVyxFQUFFLEVBQUU7VUFDNUIsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUN0QyxNQUFNO1VBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUNsQztPQUNGO01BQ0QsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNyQixJQUFJQSxjQUFZLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7VUFDNUMsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDN0M7T0FDRixNQUFNO1FBQ0wsSUFBSUEsY0FBWSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1VBQzlDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1NBQ3BEO09BQ0Y7S0FDRixDQUFDLENBQUM7R0FDSixDQUFDOztFQUVGLE9BQU8sS0FBSyxDQUFDOztDQUVkLENBQUMsQ0FBQ0EsY0FBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUV4QixjQUFlLEtBQUssQ0FBQzs7QUN4RmpCLElBQUEsTUFBTSxDQUFBO0FBQ1IsSUFBQUcsUUFBTSxHQUFHLFNBQVMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFLEVBQUUsSUFBSUQsU0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxJQUFJLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUMsRUFBRSxDQUFBO0FBQzFSLElBQUFBLFNBQU8sR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFBO0FBRTdCLE1BQU0sR0FBRyxDQUFDLFNBQVMsVUFBVSxFQUFFO0VBQzdCQyxRQUFNLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDOztFQUUzQixTQUFTLE1BQU0sR0FBRyxFQUFFOztFQUVwQixNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxTQUFTLEdBQUcsRUFBRSxPQUFPLEVBQUU7SUFDaEQsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO01BQ25CLE9BQU8sR0FBRyxFQUFFLENBQUM7S0FDZDtJQUNELE9BQU8sQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO0lBQ3pCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7R0FDL0IsQ0FBQzs7RUFFRixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxTQUFTLEdBQUcsRUFBRSxPQUFPLEVBQUU7SUFDN0MsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO01BQ25CLE9BQU8sR0FBRyxFQUFFLENBQUM7S0FDZDtJQUNELE9BQU8sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO0lBQ3RCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7R0FDL0IsQ0FBQzs7RUFFRixNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxTQUFTLEdBQUcsRUFBRSxPQUFPLEVBQUU7SUFDOUMsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO01BQ25CLE9BQU8sR0FBRyxFQUFFLENBQUM7S0FDZDtJQUNELE9BQU8sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO0lBQ3ZCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7R0FDL0IsQ0FBQzs7RUFFRixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxTQUFTLEdBQUcsRUFBRSxPQUFPLEVBQUU7SUFDN0MsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO01BQ25CLE9BQU8sR0FBRyxFQUFFLENBQUM7S0FDZDtJQUNELE9BQU8sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO0lBQ3RCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7R0FDL0IsQ0FBQzs7RUFFRixNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxTQUFTLEdBQUcsRUFBRSxPQUFPLEVBQUU7SUFDNUMsSUFBSSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQztJQUNyQixJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7TUFDbkIsT0FBTyxHQUFHLEVBQUUsQ0FBQztLQUNkO0lBQ0QsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDdEIs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