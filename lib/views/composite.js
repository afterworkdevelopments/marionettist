import Marionettist from "../core.js";
import Marionette from "backbone.marionette";
var CompositeView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CompositeView = (function(superClass) {
  extend(CompositeView, superClass);

  function CompositeView() {
    return CompositeView.__super__.constructor.apply(this, arguments);
  }

  return CompositeView;

})(Marionette.CompositeView);

export default CompositeView;
