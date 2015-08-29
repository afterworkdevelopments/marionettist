var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

(function(root, factory) {
  var $, Backbone, Marionette, _, e, i18n;
  root = typeof self === 'object' && self.self === self && self || typeof global === 'object' && global.global === global && global;
  if (typeof define === 'function' && define.amd) {
    return define(['underscore', 'jquery', 'backbone', "i18next-client", 'exports'], function(_, $, Backbone, i18n, exports) {
      var Marionetist;
      Marionetist = factory(root, exports, Backbone, Marionette, _, $, i18n);
      root.Marionetist = Marionetist;
    });
  } else if (typeof exports !== 'undefined') {
    _ = require('underscore');
    $ = void 0;
    Backbone = require("backbone");
    Marionette = require("backbone.marionette");
    i18n = require("i18next-client");
    try {
      $ = require('jquery');
    } catch (_error) {
      e = _error;
    }
    return module.exports = root.Marionetist = factory(root, exports, Backbone, Marionette, _, $, i18n);
  } else {
    return root.Marionetist = factory(root, {}, root.Backbone, root.Marionette, root._, root.jQuery || root.Zepto || root.ender || root.$, root.i18n);
  }
})(this, function(root, exports, Backbone, Marionette, _, $, i18n) {
  var Marionetist, Templates;
  Marionetist = Marionette.extend();
  Marionetist.I18n = i18n;
  Marionetist.Config = new Marionetist.Object();
  Templates = (function(superClass) {
    extend(Templates, superClass);

    function Templates() {
      return Templates.__super__.constructor.apply(this, arguments);
    }

    Templates.prototype.lookupPaths = ["templates/"];

    Templates.prototype.engine = function() {
      var engine;
      engine = {};
      if (root.HAML != null) {
        engine = HAML;
      }
      if (root.JST != null) {
        engine = JST;
      }
      return engine;
    };

    return Templates;

  })(Marionetist.Object);
  Marionetist.Config.options.templates = new Templates();
  _.extend(Marionetist.Renderer, {
    lookups: Marionetist.Config.getOption("templates").getOption("lookupPaths"),
    render: function(template, data) {
      var path;
      if (template === false) {
        return;
      }
      path = this.getTemplate(template);
      if (!path) {
        throw "Template " + template + " not found!";
      }
      return path(data);
    },
    getTemplate: function(template) {
      var engine, i, j, len, len1, lookup, path, ref, ref1;
      ref = this.lookups;
      for (i = 0, len = ref.length; i < len; i++) {
        lookup = ref[i];
        ref1 = [template, this.withTemplate(template)];
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          path = ref1[j];
          engine = Marionetist.Config.getOption("templates").getOption("engine");
          if (_.isFunction(engine)) {
            engine = engine();
          }
          if (engine[lookup + path]) {
            return engine[lookup + path];
          }
        }
      }
    },
    withTemplate: function(string) {
      var array;
      if (string != null) {
        array = string.split("/");
        array.splice(-1, 0, "templates");
        return array.join("/");
      }
    }
  });
  Marionetist.Views = new Marionetist.Object();
  Marionetist.Views.templateHelpers = {
    t: Marionetist.I18n.t
  };
  _.extend(Marionette.View.prototype, {
    templateHelpers: function() {
      return Marionetist.Views.templateHelpers;
    }
  });
  Marionetist.Views.CollectionView = (function(superClass) {
    extend(CollectionView, superClass);

    function CollectionView() {
      return CollectionView.__super__.constructor.apply(this, arguments);
    }

    return CollectionView;

  })(Marionette.CollectionView);
  Marionetist.Views.CompositeView = (function(superClass) {
    extend(CompositeView, superClass);

    function CompositeView() {
      return CompositeView.__super__.constructor.apply(this, arguments);
    }

    return CompositeView;

  })(Marionette.CompositeView);
  Marionetist.Views.LayoutView = (function(superClass) {
    extend(LayoutView, superClass);

    function LayoutView() {
      return LayoutView.__super__.constructor.apply(this, arguments);
    }

    return LayoutView;

  })(Marionette.LayoutView);
  Marionetist.Views.ItemView = (function(superClass) {
    extend(ItemView, superClass);

    function ItemView() {
      return ItemView.__super__.constructor.apply(this, arguments);
    }

    return ItemView;

  })(Marionette.ItemView);
  Marionetist.Entities = new Marionetist.Object();
  Marionetist.Controllers = new Marionetist.Object();
  Marionetist.Controllers.Application = (function(superClass) {
    extend(Application, superClass);

    function Application() {
      return Application.__super__.constructor.apply(this, arguments);
    }

    return Application;

  })(Marionetist.Object);
  Marionetist.Application = Marionetist.Application.extend({
    I18n: Marionetist.I18n,
    Controllers: Marionetist.Controllers,
    Entities: Marionetist.Entities,
    Views: Marionetist.Views,
    navigate: function(route, options) {
      if (options == null) {
        options = {};
      }
      return Backbone.history.navigate(route, options);
    },
    getCurrentRoute: function() {
      var frag;
      frag = Backbone.history.fragment;
      if (_.isEmpty(frag)) {
        return null;
      } else {
        return frag;
      }
    },
    startHistory: function(options) {
      if (options == null) {
        options = {};
      }
      if (Backbone.history) {
        return Backbone.history.start(options);
      }
    },
    register: function(instance, id) {
      if (this._registry == null) {
        this._registry = {};
      }
      return this._registry[id] = instance;
    },
    unregister: function(instance, id) {
      return delete this._registry[id];
    },
    resetRegistry: function() {
      var controller, key, msg, oldCount, ref;
      oldCount = this.getRegistrySize();
      ref = this._registry;
      for (key in ref) {
        controller = ref[key];
        controller.region.close();
      }
      msg = "There were " + oldCount + " controllers in the registry, there are now " + (this.getRegistrySize());
      if (this.getRegistrySize() > 0) {
        return console.warn(msg, this._registry);
      } else {
        return console.log(msg);
      }
    },
    getRegistrySize: function() {
      return _.size(this._registry);
    }
  });
  return Marionetist;
});
