import Marionettist from "./core.js";
import Marionette from "backbone.marionette";
var Region, _show,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_show = Marionette.Region.prototype.show;

Region = (function(superClass) {
  extend(Region, superClass);

  function Region() {
    return Region.__super__.constructor.apply(this, arguments);
  }

  Region.prototype.show = function(view, options) {
    var args, oldView, preventDestroy, showCurrentView, transitionOut;
    options = options || {};
    preventDestroy = options.preventDestroy === true;
    transitionOut = options.transitionOut;
    delete options.transitionOut;
    if (transitionOut === false) {
      args = [view, options];
      return _show.apply(this, args);
    } else {
      oldView = this.currentView;
      showCurrentView = (function(_this) {
        return function() {
          args = [
            view, Marionettist._.extend(options, {
              preventDestroy: true
            })
          ];
          _show.apply(_this, args);
          if (!preventDestroy && (oldView != null)) {
            return oldView.destroy();
          }
        };
      })(this);
      if ((oldView != null) && Marionettist._.isFunction(oldView.onTransitionOut)) {
        oldView.triggerMethod("before:transition:out", showCurrentView, this);
        return oldView.triggerMethod("transition:out", showCurrentView, this);
      } else {
        return showCurrentView();
      }
    }
  };

  return Region;

})(Marionette.Region);

export default Region;
