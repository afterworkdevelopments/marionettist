import Marionettist from "../core.js";
import Marionette from "backbone.marionette";
var ItemView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ItemView = (function(superClass) {
  extend(ItemView, superClass);

  function ItemView() {
    return ItemView.__super__.constructor.apply(this, arguments);
  }

  return ItemView;

})(Marionette.ItemView);

export default ItemView;
