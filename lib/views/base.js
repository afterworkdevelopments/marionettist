import Marionettist from "../core.js";
import Marionette from "backbone.marionette";
var BaseView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

BaseView = (function(superClass) {
  extend(BaseView, superClass);

  function BaseView() {
    return BaseView.__super__.constructor.apply(this, arguments);
  }

  return BaseView;

})(Marionette.View);

export default BaseView;
