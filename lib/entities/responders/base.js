import Marionettist from "../../core.js";
import ModelBase from "../../entities/models/base.js";
import BaseView from "../../views/base.js";
var Base,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

Base = (function(superClass) {
  extend(Base, superClass);

  function Base(options) {
    if (options == null) {
      options = {};
    }
    Base.__super__.constructor.call(this, options);
    this._instance_id = Marionettist._.uniqueId("responder");
    this.register(this, this._instance_id);
  }

  Base.prototype.loaderView = BaseView.extend({
    template: function(data) {
      return Marionettist.config.templates.render("marionettist/loader", data, {
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
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    Base.__super__.close.call(this, args);
    return this.unregister(this, this._instance_id);
  };

  Base.prototype.show = function(view, options) {
    var fetchOptions, loaderView, region;
    if (options == null) {
      options = {};
    }
    fetchOptions = {};
    if (Marionettist._.isObject(options) && Marionettist._.isObject(options.fetch)) {
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
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return (ref = Marionettist.utils).waitFor.apply(ref, args);
  };

  Base.prototype.deferred = function() {
    return Marionettist.$.Deferred();
  };

  Base.prototype.fetch = function(options) {
    var asyncFetches, deferred;
    if (options == null) {
      options = {};
    }
    deferred = this.deferred();
    asyncFetches = Marionettist._.chain([this.get("async")]).flatten().compact().value();
    this.waitFor(asyncFetches, {
      success: function() {
        if (Marionettist._.isFunction(options.success)) {
          options.success();
        }
        return deferred.resolve();
      },
      error: function() {
        if (Marionettist._.isFunction(options.error)) {
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
    return Marionettist._.size(this._registry);
  };

  return Base;

})(ModelBase);

export default Base;
