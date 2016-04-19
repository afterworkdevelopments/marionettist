import Marionettist from "./core.js";
var Logger,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Logger = (function(superClass) {
  extend(Logger, superClass);

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
    if (Marionettist.env.current().isDevelopment() || force === true) {
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

})(Marionettist.Object);

export default Logger;
