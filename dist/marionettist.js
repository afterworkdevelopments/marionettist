(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('underscore'), require('underscore-contrib'), require('underscore.string'), require('jquery'), require('backbone'), require('backbone.radio'), require('backbone-associations'), require('backbone.marionette'), require('i18next'), require('numeral'), require('moment'), require('moment-range'), require('moment-timezone')) :
  typeof define === 'function' && define.amd ? define(['underscore', 'underscore-contrib', 'underscore.string', 'jquery', 'backbone', 'backbone.radio', 'backbone-associations', 'backbone.marionette', 'i18next', 'numeral', 'moment', 'moment-range', 'moment-timezone'], factory) :
  (global.Marionettist = factory(global._,global.underscoreContrib,global.s,global.$,global.Backbone,global.backbone_radio,global.backboneAssociations,global.Marionette,global.i18next,global.numeral,global.moment,global.momentRange,global.momentTimezone));
}(this, function (_,underscoreContrib,s,$,Backbone,backbone_radio,backboneAssociations,Marionette,i18next,numeral,moment,momentRange,momentTimezone) { 'use strict';

  _ = 'default' in _ ? _['default'] : _;
  s = 'default' in s ? s['default'] : s;
  $ = 'default' in $ ? $['default'] : $;
  Backbone = 'default' in Backbone ? Backbone['default'] : Backbone;
  Marionette = 'default' in Marionette ? Marionette['default'] : Marionette;
  i18next = 'default' in i18next ? i18next['default'] : i18next;
  numeral = 'default' in numeral ? numeral['default'] : numeral;
  moment = 'default' in moment ? moment['default'] : moment;

  var Env;

  Env = (function() {
    Env.current = function() {
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
      return Marionettist.I18n.language;
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
      return Marionettist.I18n.changeLanguage(locale, function(t) {
        Marionettist.channels.publish("marionettist", "change:locale", {
          currentLocale: locale,
          oldLocale: oldLocale
        });
        if (Marionettist._.isFunction(callback)) {
          return callback(t);
        }
      });
    };

    return Env;

  })();

  var Env$1 = Env;

  var Channels;

  Channels = (function() {
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
      return Marionettist.Backbone.Radio.channel(channelName).request(eventName, data);
    };

    Channels.prototype.replyOnce = function(channelName, eventName, callback) {
      var channel;
      if (channelName == null) {
        channelName = "global";
      }
      if (eventName == null) {
        eventName = "";
      }
      channel = Marionettist.Backbone.Radio.channel(channelName);
      if (Marionettist._.isFunction(callback)) {
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
      channel = Marionettist.Backbone.Radio.channel(channelName);
      if (Marionettist._.isFunction(callback)) {
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
      return Marionettist.Backbone.Radio.channel(channelName).trigger(eventName, data);
    };

    Channels.prototype.subscribe = function(channelName, eventName, callback) {
      if (channelName == null) {
        channelName = "global";
      }
      if (eventName == null) {
        eventName = "";
      }
      return Marionettist.Backbone.Radio.channel(channelName).on(eventName, callback);
    };

    return Channels;

  })();

  var Channels$1 = Channels;

  var Location;

  Location = (function() {
    function Location() {}

    Location.prototype.refreshRoute = function(fragment) {
      if (fragment == null) {
        fragment = this.getCurrentRoute();
      }
      return Marionettist.Backbone.history.loadUrl(fragment);
    };

    Location.prototype.navigateTo = function(route, options) {
      if (options == null) {
        options = {};
      }
      return Marionettist.Backbone.history.navigate(route, options);
    };

    Location.prototype.getCurrentRoute = function() {
      var frag;
      frag = Marionettist.Backbone.history.fragment;
      if (Marionettist._.isEmpty(frag)) {
        return null;
      } else {
        return frag;
      }
    };

    Location.prototype.startHistory = function(options) {
      if (options == null) {
        options = {};
      }
      if (Marionettist.Backbone.history != null) {
        return Marionettist.Backbone.history.start(options);
      }
    };

    return Location;

  })();

  var Location$1 = Location;

  var Templates;

  Templates = (function() {
    function Templates() {}

    Templates.prototype.lookupPaths = ["templates/"];

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

  Config = (function() {
    function Config() {
      this.templates = new Templates$1();
    }

    return Config;

  })();

  var Config$1 = Config;

  var Marionettist$1;
  var _show;
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
  var hasProp = {}.hasOwnProperty;
  Marionettist$1 = Marionette.extend();

  Marionettist$1.Backbone = Backbone;

  Marionettist$1.Marionette = Marionette;

  Marionettist$1._ = _;

  Marionettist$1.$ = $;

  Marionettist$1.s = s;

  Marionettist$1.I18n = i18next;

  Marionettist$1.numeral = numeral;

  Marionettist$1.moment = moment;

  Marionettist$1.channels = new Channels$1();

  Marionettist$1.location = new Location$1();

  Marionettist$1.env = new Env$1();

  Marionettist$1.config = new Config$1();

  Marionettist$1._.extend(Marionettist$1.Renderer, {
    render: function(template, data) {
      var path;
      if (_.isFunction(template)) {
        return template(data);
      } else {
        if (template === false) {
          return;
        }
        path = this.getTemplate(template);
        if (!path) {
          throw "Template " + template + " not found!";
        }
        return path(data);
      }
    },
    getTemplate: function(template) {
      var engine, i, j, len, len1, lookup, lookups, path, ref;
      lookups = Marionettist$1.config.templates.lookupPaths;
      if (_.isFunction(lookups)) {
        lookups = lookups();
      }
      if (!_.isArray(lookups)) {
        throw "lookupPaths most be an array";
      }
      for (i = 0, len = lookups.length; i < len; i++) {
        lookup = lookups[i];
        ref = [template, this.withTemplate(template)];
        for (j = 0, len1 = ref.length; j < len1; j++) {
          path = ref[j];
          engine = Marionettist$1.config.templates.engine;
          if (_.isFunction(engine)) {
            engine = engine();
          }
          if (engine[lookup + path]) {
            return engine[lookup + path];
          }
        }
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
  });

  Marionettist$1.Utils = Marionettist$1._.extend(new Marionettist$1.Object(), {
    log: function(msg, color) {
      var bgc;
      if (Marionettist$1.env.current().isDevelopment()) {
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
    },
    waitFor: function(ajaxRequests, options) {
      var ref, xhrs;
      if (options == null) {
        options = {};
      }
      xhrs = [];
      xhrs = _.chain([ajaxRequests]).flatten().value();
      return (ref = Marionettist$1.$).when.apply(ref, xhrs).then((function() {
        if (Marionettist$1._.isFunction(options.success)) {
          return options.success();
        }
      }), function(error) {
        if (Marionettist$1._.isFunction(options.error)) {
          return options.error();
        }
      });
    }
  });

  Marionettist$1.AppRoute = (function(superClass) {
    extend(AppRoute, superClass);

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

  })(Marionettist$1.Object);

  Marionettist$1.AppRouter = (function(superClass) {
    extend(AppRouter, superClass);

    function AppRouter() {
      return AppRouter.__super__.constructor.apply(this, arguments);
    }

    AppRouter.prototype.onRoute = function(name, path, args) {
      if ((this.controller != null) && _.isFunction(this.controller.onRoute)) {
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
        if (Marionettist$1._.isFunction(filters)) {
          filters = filters();
        }
        if (controller.filters == null) {
          controller.filters = {};
        }
        controller.filters = Marionettist$1._.extend(defaultFilters, filters);
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
          _this.controller.route = new Marionettist$1.AppRoute({
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
        throw new Marionettist$1.Marionette.Error('Method "' + methodName + '" was not found on the controller');
      }
      return this.route(route, methodName, _.bind(method, controller));
    };

    AppRouter.prototype._executeFilter = function(filter, controller) {
      var filterValue, i, len, methodName, ref, result, stopMsg;
      result = true;
      ref = _.keys(filter);
      for (i = 0, len = ref.length; i < len; i++) {
        methodName = ref[i];
        filterValue = filter[methodName];
        stopMsg = "Action halted by filter '" + methodName + "'";
        switch (false) {
          case !Marionettist$1._.isFunction(filterValue):
            result = filterValue(controller);
            if (result === false) {
              if (typeof console !== "undefined" && console !== null) {
                console.warn(stopMsg);
              }
              break;
            }
            break;
          case !Marionettist$1._.isObject(filterValue):
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
      return params = this._extractParameters(route, Backbone.history.getFragment());
    };

    AppRouter.prototype._proccessFilterObject = function(methodName, filter, controller) {
      var actionName, controllerMethod, defaultFilterOptions, filterOptions;
      defaultFilterOptions = {
        method: null,
        only: [],
        except: []
      };
      filterOptions = Marionettist$1._.extend(defaultFilterOptions, filter);
      controllerMethod = controller[methodName];
      actionName = controller.route.actionName();
      if (!_.isArray(filterOptions.only)) {
        throw "filter option only, most be an array";
      }
      if (!_.isArray(filterOptions.except)) {
        throw "filter option except, most be an array";
      }
      if (filterOptions.only.length > 0 || filterOptions.except.length > 0) {
        if (Marionettist$1._.contains(filterOptions.only, actionName) && !Marionettist$1._.contains(filterOptions.except, actionName)) {
          if (Marionettist$1._.isFunction(controllerMethod)) {
            return controllerMethod.apply(this.controller, this._getParams());
          }
        }
      } else {
        if (Marionettist$1._.isFunction(controllerMethod)) {
          return controllerMethod.apply(this.controller, this._getParams());
        }
      }
    };

    return AppRouter;

  })(Marionettist$1.Marionette.AppRouter);

  _show = Marionettist$1.Marionette.Region.prototype.show;

  Marionettist$1.Region = (function(superClass) {
    extend(Region, superClass);

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
            view, Marionettist$1._.extend(options, {
              preventDestroy: true
            })
          ];
          _show.apply(_this, args);
          if (!options.preventDestroy) {
            return oldView.destroy();
          }
        };
      })(this);
      if ((oldView != null) && Marionettist$1._.isFunction(oldView.onHide)) {
        return oldView.onHide(showCurrentView, this);
      } else {
        return showCurrentView();
      }
    };

    return Region;

  })(Marionettist$1.Marionette.Region);

  Marionettist$1.Views = new Marionettist$1.Object();

  Marionettist$1.Views.templateHelpers = {
    t: Marionettist$1.I18n.t,
    formatCurrency: function(amount, format) {
      if (format == null) {
        format = "$0,0.00";
      }
      return Marionettist$1.numeral(amount).format(format);
    },
    formatNumber: function(amount, format) {
      if (format == null) {
        format = "0,0.00";
      }
      return Marionettist$1.numeral(amount).format(format);
    },
    formatPercentage: function(amount, format) {
      if (format == null) {
        format = "0.00%";
      }
      return Marionettist$1.numeral(amount).format(format);
    },
    formatDate: function(date, format) {
      if (format == null) {
        format = "DD-MM-YYYY";
      }
      return Marionettist$1.moment(date).format(format);
    }
  };

  Marionettist$1._.extend(Marionettist$1.View.prototype, {
    templateHelpers: function() {
      var helpers;
      helpers = Marionettist$1.Views.templateHelpers;
      if (this.viewContext != null) {
        helpers.viewContext = this.viewContext;
        if (Marionettist$1._.isFunction(this.viewContext)) {
          helpers.viewContext = this.viewContext();
        }
      } else {
        helpers.viewContext = {};
      }
      return helpers;
    }
  });

  Marionettist$1.Views.Collection = (function(superClass) {
    extend(Collection, superClass);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    return Collection;

  })(Marionettist$1.Marionette.CollectionView);

  Marionettist$1.Views.Composite = (function(superClass) {
    extend(Composite, superClass);

    function Composite() {
      return Composite.__super__.constructor.apply(this, arguments);
    }

    return Composite;

  })(Marionettist$1.Marionette.CompositeView);

  Marionettist$1.Views.Item = (function(superClass) {
    extend(Item, superClass);

    function Item() {
      return Item.__super__.constructor.apply(this, arguments);
    }

    return Item;

  })(Marionettist$1.Marionette.ItemView);

  Marionettist$1.Views.Layout = (function(superClass) {
    extend(Layout, superClass);

    function Layout() {
      return Layout.__super__.constructor.apply(this, arguments);
    }

    return Layout;

  })(Marionettist$1.Marionette.LayoutView);

  Marionettist$1.Entities = new Marionettist$1.Object();

  Marionettist$1.Entities.Models = new Marionettist$1.Object();

  Marionettist$1.Entities.Collections = new Marionettist$1.Object();

  Marionettist$1.Entities.Models.Base = (function(superClass) {
    extend(Base, superClass);

    function Base() {
      return Base.__super__.constructor.apply(this, arguments);
    }

    return Base;

  })(Marionettist$1.Backbone.Model);

  if (Marionettist$1.Backbone.AssociatedModel) {
    Marionettist$1.Entities.Models.Associated = (function(superClass) {
      extend(Associated, superClass);

      function Associated() {
        return Associated.__super__.constructor.apply(this, arguments);
      }

      return Associated;

    })(Marionettist$1.Backbone.AssociatedModel);
  }

  Marionettist$1.Entities.Collections.Base = (function(superClass) {
    extend(Base, superClass);

    function Base() {
      return Base.__super__.constructor.apply(this, arguments);
    }

    return Base;

  })(Marionettist$1.Backbone.Collection);

  Marionettist$1.Controllers = new Marionettist$1.Object();

  Marionettist$1.Controllers.Base = (function(superClass) {
    extend(Base, superClass);

    function Base() {
      return Base.__super__.constructor.apply(this, arguments);
    }

    return Base;

  })(Marionettist$1.Object);

  Marionettist$1.Application = Marionettist$1.Application.extend({
    Backbone: Marionettist$1.Backbone,
    Marionette: Marionettist$1.Marionette,
    _: Marionettist$1._,
    $: Marionettist$1.$,
    s: Marionettist$1.s,
    I18n: Marionettist$1.I18n,
    numeral: Marionettist$1.numeral,
    moment: Marionettist$1.moment,
    Controllers: new Marionettist$1.Object(),
    Entities: new Marionettist$1.Object(),
    Views: new Marionettist$1.Object(),
    navigateTo: function(route, options) {
      if (options == null) {
        options = {};
      }
      return Marionettist$1.location.navigateTo(route, options);
    },
    getCurrentRoute: function() {
      return Marionettist$1.location.getCurrentRoute();
    },
    startHistory: function(options) {
      if (options == null) {
        options = {};
      }
      return Marionettist$1.location.startHistory(options);
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
      return Marionettist$1._.size(this._registry);
    }
  });

  var Marionettist$2 = Marionettist$1;

  return Marionettist$2;

}));
//# sourceMappingURL=marionettist.js.map
