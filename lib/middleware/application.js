import Marionettist from "../core.js";
import MarionettistApplication from "../application.js";
var Application,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Application = (function(superClass) {
  extend(Application, superClass);

  function Application() {
    return Application.__super__.constructor.apply(this, arguments);
  }

  Application.prototype.start = function(options) {
    if (options == null) {
      options = {};
    }
    return Application.__super__.start.call(this, options);
  };

  return Application;

})(MarionettistApplication);

export default Application;
