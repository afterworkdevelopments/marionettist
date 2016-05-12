import Templates from "./config/templates.js";
import Marionettist from "./core.js";
var Config,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Config = (function(superClass) {
  extend(Config, superClass);

  function Config() {
    this.templates = new Templates();
  }

  return Config;

})(Marionettist.Object);

export default Config;
