import Marionettist from "./core.js";
var Utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

Utils = (function(superClass) {
  extend(Utils, superClass);

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
    xhrs = Marionettist._.chain([ajaxRequests]).flatten().value();
    return (ref = Marionettist.$).when.apply(ref, xhrs).then((function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (Marionettist._.isFunction(options.success)) {
        return options.success.apply(options, args);
      }
    }), function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (Marionettist._.isFunction(options.error)) {
        return options.error.apply(options, args);
      }
    });
  };

  Utils.prototype._waitForBluebird = function(promises, options) {
    if (options == null) {
      options = {};
    }
    promises = Marionettist._.chain([promises]).flatten().value();
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
        if (Marionettist._.isFunction(options.error)) {
          return options.error.apply(options, errors);
        }
      } else {
        if (Marionettist._.isFunction(options.success)) {
          return options.success.apply(options, successArgs);
        }
      }
    });
  };

  return Utils;

})(Marionettist.Object);

export default Utils;
