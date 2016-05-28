import Marionettist from "../../core.js";
import Backbone from "backbone";
var Base,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Base = (function(superClass) {
  extend(Base, superClass);

  function Base() {
    return Base.__super__.constructor.apply(this, arguments);
  }

  Base.prototype.models = {};

  Base.prototype.collections = {};

  Base.prototype.views = {};

  Base.prototype.getView = function(viewName, options) {
    if (options == null) {
      options = {};
    }
    return this.getResource("views", viewName, options);
  };

  Base.prototype.getModel = function(modelName, options) {
    if (options == null) {
      options = {};
    }
    return this.getResource("models", modelName, options);
  };

  Base.prototype.getCollection = function(collectionName, options) {
    if (options == null) {
      options = {};
    }
    return this.getResource("collections", collectionName, options);
  };

  Base.prototype.getResource = function(resourcesName, resourceName, options) {
    var resource, resources;
    if (options == null) {
      options = {};
    }
    resource = null;
    resources = this[resourcesName];
    if (options.viewModel == null) {
      options.viewModel = this;
    }
    if (Marionettist._.isObject(resources) && (resources[resourceName] != null)) {
      resource = new resources[resourceName](options);
    }
    return resource;
  };

  return Base;

})(Backbone.Model);

export default Base;
