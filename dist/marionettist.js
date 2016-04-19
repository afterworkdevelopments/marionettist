(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('underscore'), require('underscore-contrib'), require('underscore.string'), require('jquery'), require('backbone'), require('backbone.radio'), require('backbone-associations'), require('backbone.marionette'), require('i18next'), require('numeral'), require('moment'), require('moment-range'), require('moment-timezone')) :
  typeof define === 'function' && define.amd ? define(['underscore', 'underscore-contrib', 'underscore.string', 'jquery', 'backbone', 'backbone.radio', 'backbone-associations', 'backbone.marionette', 'i18next', 'numeral', 'moment', 'moment-range', 'moment-timezone'], factory) :
  (global.Marionettist = factory(global._,global.underscoreContrib,global.s,global.$,global.Backbone,global.Backbone.Radio,global.backboneAssociations,global.Marionette,global.i18next,global.numeral,global.moment,global.momentRange,global.momentTimezone));
}(this, function (_$1,underscoreContrib,s,$,Backbone,backbone_radio,backboneAssociations,Marionette,i18next,numeral,moment,momentRange,momentTimezone) { 'use strict';

  _$1 = 'default' in _$1 ? _$1['default'] : _$1;
  s = 'default' in s ? s['default'] : s;
  $ = 'default' in $ ? $['default'] : $;
  Backbone = 'default' in Backbone ? Backbone['default'] : Backbone;
  Marionette = 'default' in Marionette ? Marionette['default'] : Marionette;
  i18next = 'default' in i18next ? i18next['default'] : i18next;
  numeral = 'default' in numeral ? numeral['default'] : numeral;
  moment = 'default' in moment ? moment['default'] : moment;

  var Marionettist$1;

  Marionettist$1 = Marionette.extend();

  Marionettist$1.Backbone = Backbone;

  Marionettist$1.Marionette = Marionette;

  Marionettist$1._ = _$1;

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

    Env.prototype.current = function() {
      return this._current || (this._current = new Env);
    };

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
      templates = [template, this.withTemplate(template)];
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
  Utils = (function(superClass) {
    extend$5(Utils, superClass);

    function Utils() {
      return Utils.__super__.constructor.apply(this, arguments);
    }

    Utils.prototype.waitFor = function(ajaxRequests, options) {
      var ref, xhrs;
      if (options == null) {
        options = {};
      }
      xhrs = [];
      xhrs = _.chain([ajaxRequests]).flatten().value();
      return (ref = Marionettist$2.$).when.apply(ref, xhrs).then((function() {
        if (Marionettist$2._.isFunction(options.success)) {
          return options.success();
        }
      }), function(error) {
        if (Marionettist$2._.isFunction(options.error)) {
          return options.error();
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

    Logger.prototype.success = function(msg, force) {
      if (force == null) {
        force = false;
      }
      return this.log(msg, "success", force);
    };

    Logger.prototype.warn = function(msg, force) {
      if (force == null) {
        force = false;
      }
      return this.log(msg, "warn", force);
    };

    Logger.prototype.error = function(msg, force) {
      if (force == null) {
        force = false;
      }
      return this.log(msg, "error", force);
    };

    Logger.prototype.info = function(msg, force) {
      if (force == null) {
        force = false;
      }
      return this.log(msg, "info", force);
    };

    Logger.prototype.log = function(msg, color, force) {
      var bgc;
      if (force == null) {
        force = false;
      }
      if (Marionettist$2.env.current().isDevelopment() || force === true) {
        color = color || 'black';
        bgc = 'White';
        switch (color) {
          case 'success':
            color = 'Green';
            bgc = 'LimeGreen';
            break;
          case 'info':
            color = 'DodgerBlue';
            bgc = 'Turquoise';
            break;
          case 'error':
            color = 'Red';
            bgc = 'Black';
            break;
          case 'start':
            color = 'OliveDrab';
            bgc = 'PaleGreen';
            break;
          case 'warning':
            color = 'Tomato';
            bgc = 'Black';
            break;
          case 'end':
            color = 'Orchid';
            bgc = 'MediumVioletRed';
            break;
          default:
            color = color;
        }
        bgc = 'White';
        if (typeof msg === 'object') {
          console.log(msg);
        } else {
          console.log('%c' + msg, 'color:' + color + ';font-weight:bold; background-color: ' + bgc + ';');
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
      if (!_.isArray(filterOptions.only)) {
        throw "filter option only, most be an array";
      }
      if (!_.isArray(filterOptions.except)) {
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
  _show = Marionette.Region.prototype.show;

  Region = (function(superClass) {
    extend$9(Region, superClass);

    function Region() {
      return Region.__super__.constructor.apply(this, arguments);
    }

    Region.prototype.show = function(view, options) {
      var oldView, showCurrentView;
      options = options || {};
      oldView = this.currentView;
      showCurrentView = (function(_this) {
        return function() {
          var args;
          args = [
            view, Marionettist$2._.extend(options, {
              preventDestroy: true
            })
          ];
          _show.apply(_this, args);
          if (!options.preventDestroy) {
            return oldView.destroy();
          }
        };
      })(this);
      if ((oldView != null) && Marionettist$2._.isFunction(oldView.onHide)) {
        return oldView.onHide(showCurrentView, this);
      } else {
        return showCurrentView();
      }
    };

    return Region;

  })(Marionette.Region);

  var Region$1 = Region;

  var Views;
  var extend$10 = function(child, parent) { for (var key in parent) { if (hasProp$10.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
  var hasProp$10 = {}.hasOwnProperty;
  var slice = [].slice;
  Views = (function(superClass) {
    extend$10(Views, superClass);

    function Views() {
      return Views.__super__.constructor.apply(this, arguments);
    }

    Views.prototype.templateHelpers = {
      t: function() {
        var args, ref;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
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

  var CollectionView;
  var extend$11 = function(child, parent) { for (var key in parent) { if (hasProp$11.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
  var hasProp$11 = {}.hasOwnProperty;
  CollectionView = (function(superClass) {
    extend$11(CollectionView, superClass);

    function CollectionView() {
      return CollectionView.__super__.constructor.apply(this, arguments);
    }

    return CollectionView;

  })(Marionette.CollectionView);

  var CollectionView$1 = CollectionView;

  var CompositeView;
  var extend$12 = function(child, parent) { for (var key in parent) { if (hasProp$12.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
  var hasProp$12 = {}.hasOwnProperty;
  CompositeView = (function(superClass) {
    extend$12(CompositeView, superClass);

    function CompositeView() {
      return CompositeView.__super__.constructor.apply(this, arguments);
    }

    return CompositeView;

  })(Marionette.CompositeView);

  var CompositeView$1 = CompositeView;

  var ItemView;
  var extend$13 = function(child, parent) { for (var key in parent) { if (hasProp$13.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
  var hasProp$13 = {}.hasOwnProperty;
  ItemView = (function(superClass) {
    extend$13(ItemView, superClass);

    function ItemView() {
      return ItemView.__super__.constructor.apply(this, arguments);
    }

    return ItemView;

  })(Marionette.ItemView);

  var ItemView$1 = ItemView;

  var LayoutView;
  var extend$14 = function(child, parent) { for (var key in parent) { if (hasProp$14.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
  var hasProp$14 = {}.hasOwnProperty;
  LayoutView = (function(superClass) {
    extend$14(LayoutView, superClass);

    function LayoutView() {
      return LayoutView.__super__.constructor.apply(this, arguments);
    }

    return LayoutView;

  })(Marionette.LayoutView);

  var LayoutView$1 = LayoutView;

  var Base;
  var extend$15 = function(child, parent) { for (var key in parent) { if (hasProp$15.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
  var hasProp$15 = {}.hasOwnProperty;
  Base = (function(superClass) {
    extend$15(Base, superClass);

    function Base() {
      return Base.__super__.constructor.apply(this, arguments);
    }

    return Base;

  })(Backbone.Model);

  var BaseModel = Base;

  var Base$1;
  var extend$16 = function(child, parent) { for (var key in parent) { if (hasProp$16.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
  var hasProp$16 = {}.hasOwnProperty;
  Base$1 = (function(superClass) {
    extend$16(Base, superClass);

    function Base() {
      return Base.__super__.constructor.apply(this, arguments);
    }

    return Base;

  })(Backbone.Collection);

  var BaseCollection = Base$1;

  var Base$2;
  var extend$17 = function(child, parent) { for (var key in parent) { if (hasProp$17.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
  var hasProp$17 = {}.hasOwnProperty;
  Base$2 = (function(superClass) {
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

  var BaseController = Base$2;

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

  Marionettist$2.Region = Region$1;

  Marionettist$2.Views = new Views$1();

  Marionettist$2._.extend(Marionettist$2.View.prototype, {
    templateHelpers: function() {
      var helpers;
      helpers = Marionettist$2.Views.templateHelpers;
      if (this.viewContext != null) {
        helpers.viewContext = this.viewContext;
        if (Marionettist$2._.isFunction(this.viewContext)) {
          helpers.viewContext = this.viewContext();
        }
      } else {
        helpers.viewContext = {};
      }
      return helpers;
    }
  });

  Marionettist$2.Views.Collection = CollectionView$1;

  Marionettist$2.Views.Composite = CompositeView$1;

  Marionettist$2.Views.Item = ItemView$1;

  Marionettist$2.Views.Layout = LayoutView$1;

  Marionettist$2.Entities = new Marionettist$2.Object();

  Marionettist$2.Entities.Models = new Marionettist$2.Object();

  Marionettist$2.Entities.Collections = new Marionettist$2.Object();

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

  Marionettist$2.Controllers = new Marionettist$2.Object();

  Marionettist$2.Controllers.Base = BaseController;

  Marionettist$2.Application = Marionettist$2.Application.extend({
    Controllers: new Marionettist$2.Object(),
    Entities: new Marionettist$2.Object(),
    Views: new Marionettist$2.Object(),
    startHistory: function(options) {
      if (options == null) {
        options = {};
      }
      return Marionettist$2.location.startHistory(options);
    },
    register: function(instance, id) {
      if (this._registry == null) {
        this._registry = {};
      }
      return this._registry[id] = instance;
    },
    unregister: function(instance, id) {
      return delete this._registry[id];
    },
    resetRegistry: function() {
      var controller, key, msg, oldCount, ref;
      oldCount = this.getRegistrySize();
      ref = this._registry;
      for (key in ref) {
        controller = ref[key];
        controller.region.close();
      }
      msg = "There were " + oldCount + " controllers in the registry, there are now " + (this.getRegistrySize());
      if (this.getRegistrySize() > 0) {
        return console.warn(msg, this._registry);
      } else {
        return console.log(msg);
      }
    },
    getRegistrySize: function() {
      return Marionettist$2._.size(this._registry);
    }
  });

  if (typeof global !== "undefined" && global !== null) {
    global.Marionettist = Marionettist$2;
  }

  return Marionettist$2;

}));
//# sourceMappingURL=marionettist.js.map
