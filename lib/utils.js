import Marionettist from "./core.js";
var Utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

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

  Utils.prototype.waitFor = function(ajaxRequests, options) {
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
  };

  return Utils;

})(Marionettist.Object);

export default Utils;
