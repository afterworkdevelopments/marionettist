(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('underscore'), require('underscore-contrib'), require('underscore.string'), require('jquery'), require('backbone'), require('backbone.radio'), require('backbone-associations'), require('backbone.marionette'), require('i18next'), require('numeral'), require('moment'), require('moment-range'), require('moment-timezone')) :
  typeof define === 'function' && define.amd ? define(['underscore', 'underscore-contrib', 'underscore.string', 'jquery', 'backbone', 'backbone.radio', 'backbone-associations', 'backbone.marionette', 'i18next', 'numeral', 'moment', 'moment-range', 'moment-timezone'], factory) :
  (global.Marionettist = factory(global._,global.underscoreContrib,global.s,global.$,global.Backbone,global.Backbone.Radio,global.backboneAssociations,global.Marionette$1,global.i18next,global.numeral,global.moment,global.momentRange,global.momentTimezone));
}(this, function (_,underscoreContrib,s,$,Backbone,backbone_radio,backboneAssociations,Marionette$1,i18next,numeral,moment,momentRange,momentTimezone) { 'use strict';

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

}));
//# sourceMappingURL=marionettist.js.map
