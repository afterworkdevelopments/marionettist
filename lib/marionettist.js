import _ from "underscore";
import underscoreContrib from "underscore-contrib";
import s from "underscore.string";
import $ from "jquery";
import Backbone from "backbone";
import backbone_radio from "backbone.radio";
import backboneAssociations from "backbone-associations";
import Marionette from "backbone.marionette";
import i18next from "i18next";
import numeral from "numeral";
import moment from "moment";
import momentRange from "moment-range";
import momentTimezone from "moment-timezone";
import Env from "./env.js";
import Channels from "./channels.js";
import Location from "./location.js";
import Config from "./config.js";
var Marionettist, _show,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Marionettist = Marionette.extend();

Marionettist.Backbone = Backbone;

Marionettist.Marionette = Marionette;

Marionettist._ = _;

Marionettist.$ = $;

Marionettist.s = s;

Marionettist.I18n = i18next;

Marionettist.numeral = numeral;

Marionettist.moment = moment;

Marionettist.channels = new Channels();

Marionettist.location = new Location();

Marionettist.env = new Env();

Marionettist.config = new Config();

Marionettist._.extend(Marionettist.Renderer, {
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
    lookups = Marionettist.config.templates.lookupPaths;
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
        engine = Marionettist.config.templates.engine;
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

Marionettist.Utils = Marionettist._.extend(new Marionettist.Object(), {
  log: function(msg, color) {
    var bgc;
    if (Marionettist.env.current().isDevelopment()) {
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
    return (ref = Marionettist.$).when.apply(ref, xhrs).then((function() {
      if (Marionettist._.isFunction(options.success)) {
        return options.success();
      }
    }), function(error) {
      if (Marionettist._.isFunction(options.error)) {
        return options.error();
      }
    });
  }
});

Marionettist.AppRoute = (function(superClass) {
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

})(Marionettist.Object);

Marionettist.AppRouter = (function(superClass) {
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
    return params = this._extractParameters(route, Backbone.history.getFragment());
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

})(Marionettist.Marionette.AppRouter);

_show = Marionettist.Marionette.Region.prototype.show;

Marionettist.Region = (function(superClass) {
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
          view, Marionettist._.extend(options, {
            preventDestroy: true
          })
        ];
        _show.apply(_this, args);
        if (!options.preventDestroy) {
          return oldView.destroy();
        }
      };
    })(this);
    if ((oldView != null) && Marionettist._.isFunction(oldView.onHide)) {
      return oldView.onHide(showCurrentView, this);
    } else {
      return showCurrentView();
    }
  };

  return Region;

})(Marionettist.Marionette.Region);

Marionettist.Views = new Marionettist.Object();

Marionettist.Views.templateHelpers = {
  t: Marionettist.I18n.t,
  formatCurrency: function(amount, format) {
    if (format == null) {
      format = "$0,0.00";
    }
    return Marionettist.numeral(amount).format(format);
  },
  formatNumber: function(amount, format) {
    if (format == null) {
      format = "0,0.00";
    }
    return Marionettist.numeral(amount).format(format);
  },
  formatPercentage: function(amount, format) {
    if (format == null) {
      format = "0.00%";
    }
    return Marionettist.numeral(amount).format(format);
  },
  formatDate: function(date, format) {
    if (format == null) {
      format = "DD-MM-YYYY";
    }
    return Marionettist.moment(date).format(format);
  }
};

Marionettist._.extend(Marionettist.View.prototype, {
  templateHelpers: function() {
    var helpers;
    helpers = Marionettist.Views.templateHelpers;
    if (this.viewContext != null) {
      helpers.viewContext = this.viewContext;
      if (Marionettist._.isFunction(this.viewContext)) {
        helpers.viewContext = this.viewContext();
      }
    } else {
      helpers.viewContext = {};
    }
    return helpers;
  }
});

Marionettist.Views.Collection = (function(superClass) {
  extend(Collection, superClass);

  function Collection() {
    return Collection.__super__.constructor.apply(this, arguments);
  }

  return Collection;

})(Marionettist.Marionette.CollectionView);

Marionettist.Views.Composite = (function(superClass) {
  extend(Composite, superClass);

  function Composite() {
    return Composite.__super__.constructor.apply(this, arguments);
  }

  return Composite;

})(Marionettist.Marionette.CompositeView);

Marionettist.Views.Item = (function(superClass) {
  extend(Item, superClass);

  function Item() {
    return Item.__super__.constructor.apply(this, arguments);
  }

  return Item;

})(Marionettist.Marionette.ItemView);

Marionettist.Views.Layout = (function(superClass) {
  extend(Layout, superClass);

  function Layout() {
    return Layout.__super__.constructor.apply(this, arguments);
  }

  return Layout;

})(Marionettist.Marionette.LayoutView);

Marionettist.Entities = new Marionettist.Object();

Marionettist.Entities.Models = new Marionettist.Object();

Marionettist.Entities.Collections = new Marionettist.Object();

Marionettist.Entities.Models.Base = (function(superClass) {
  extend(Base, superClass);

  function Base() {
    return Base.__super__.constructor.apply(this, arguments);
  }

  return Base;

})(Marionettist.Backbone.Model);

if (Marionettist.Backbone.AssociatedModel) {
  Marionettist.Entities.Models.Associated = (function(superClass) {
    extend(Associated, superClass);

    function Associated() {
      return Associated.__super__.constructor.apply(this, arguments);
    }

    return Associated;

  })(Marionettist.Backbone.AssociatedModel);
}

Marionettist.Entities.Collections.Base = (function(superClass) {
  extend(Base, superClass);

  function Base() {
    return Base.__super__.constructor.apply(this, arguments);
  }

  return Base;

})(Marionettist.Backbone.Collection);

Marionettist.Controllers = new Marionettist.Object();

Marionettist.Controllers.Base = (function(superClass) {
  extend(Base, superClass);

  function Base() {
    return Base.__super__.constructor.apply(this, arguments);
  }

  return Base;

})(Marionettist.Object);

Marionettist.Application = Marionettist.Application.extend({
  Backbone: Marionettist.Backbone,
  Marionette: Marionettist.Marionette,
  _: Marionettist._,
  $: Marionettist.$,
  s: Marionettist.s,
  I18n: Marionettist.I18n,
  numeral: Marionettist.numeral,
  moment: Marionettist.moment,
  Controllers: new Marionettist.Object(),
  Entities: new Marionettist.Object(),
  Views: new Marionettist.Object(),
  navigateTo: function(route, options) {
    if (options == null) {
      options = {};
    }
    return Marionettist.location.navigateTo(route, options);
  },
  getCurrentRoute: function() {
    return Marionettist.location.getCurrentRoute();
  },
  startHistory: function(options) {
    if (options == null) {
      options = {};
    }
    return Marionettist.location.startHistory(options);
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
    return Marionettist._.size(this._registry);
  }
});

export default Marionettist;
