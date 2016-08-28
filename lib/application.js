import Marionettist from "./core.js";
var Application,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Application = (function(superClass) {
  extend(Application, superClass);

  Application.prototype.Controllers = new Marionettist.Object();

  Application.prototype.Entities = new Marionettist.Object();

  Application.prototype.Views = new Marionettist.Object();

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
    if (Marionettist._.result(this, 'startAfterInitialized')) {
      this.start(options);
    }
  }

  Application.prototype.startHistory = function(options) {
    if (options == null) {
      options = {};
    }
    if (!Marionettist.Backbone.History.started) {
      return Marionettist.location.startHistory(options);
    }
  };

  Application.prototype.start = function(options) {
    this.triggerMethod("before:resources:fetch", options);
    if (this.resources == null) {
      this.resources = [];
    }
    return Marionettist.utils.waitFor(this.resources, {
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
      if (Marionettist._.isFunction(childApps)) {
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
    return Marionettist._.each(this._childApps, function(childApp) {
      if (Marionettist._.result(childApp, 'startWithParent')) {
        return childApp.start(options);
      }
    });
  };

  Application.prototype._stopChildApps = function(options) {
    return Marionettist._.each(this._childApps, function(childApp) {
      if (Marionettist._.result(childApp, 'stopWithParent')) {
        return childApp.stop(options);
      }
    });
  };

  Application.prototype._destroyChildApps = function(options) {
    return Marionettist._.each(this._childApps, function(childApp) {
      if (!Marionettist._.result(childApp, 'preventDestroy')) {
        return childApp.destroy(options);
      }
    });
  };

  Application.prototype._buildAppFromObject = function(appConfig) {
    var AppClass, options;
    AppClass = appConfig.AppClass;
    options = Marionettist._.omit(appConfig, 'AppClass');
    return this.buildApp(AppClass, options);
  };

  Application.prototype._buildApp = function(AppClass, options) {
    if (Marionettist._.isFunction(AppClass)) {
      return this.buildApp(AppClass, options);
    }
    if (Marionettist._.isObject(AppClass)) {
      return this._buildAppFromObject(AppClass);
    }
  };

  Application.prototype.buildApp = function(AppClass, options) {
    options = Marionettist._.extend({}, this.childAppOptions, options);
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
    return Marionettist._.each(childApps, (function(childApp, appName) {
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
    childApp.on('destroy', Marionettist._.partial(this._removeChildApp, appName), this);
    if (this.isRunning() && Marionettist._.result(childApp, 'startWithParent')) {
      childApp.start();
    }
    return childApp;
  };

  Application.prototype.getName = function() {
    return this._name;
  };

  Application.prototype.getChildApps = function() {
    return Marionettist._.clone(this._childApps);
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
    Marionettist._.each(this._childApps, (function(childApp, appName) {
      this.removeChildApp(appName);
    }), this);
    return childApps;
  };

  Application.prototype.removeChildApp = function(appName, options) {
    var childApp;
    options = Marionettist._.extend({}, options);
    childApp = this.getChildApp(appName);
    if (!childApp) {
      return;
    }
    if (options.preventDestroy || Marionettist._.result(childApp, 'preventDestroy')) {
      this._removeChildApp(appName);
    } else {
      childApp.destroy();
    }
    return childApp;
  };

  Application.prototype.destroy = function() {};

  return Application;

})(Marionettist.Application);

export default Application;
