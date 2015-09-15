var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

(function(root, factory) {
  var $, Backbone, BackboneAssociations, Marionette, _, e, i18n, moment, momentRange, numeral, s;
  root = typeof self === 'object' && self.self === self && self || typeof global === 'object' && global.global === global && global;
  if (typeof define === 'function' && define.amd) {
    return define(['underscore', 'jquery', 'backbone', "backbone-associations", "backbone.marionette", "i18next-client", 'exports', "underscore.string", "numeral", "moment", "moment-range"], function(_, $, Backbone, BackboneAssociations, Marionette, i18n, exports, s, numeral, moment, momentRange) {
      var Marionetist;
      Marionetist = factory(root, exports, Backbone, Marionette, _, $, i18n, s, numeral, moment);
      root.Marionetist = Marionetist;
    });
  } else if (typeof exports !== 'undefined') {
    _ = require('underscore');
    $ = void 0;
    Backbone = require("backbone");
    Marionette = require("backbone.marionette");
    i18n = require("i18next-client");
    s = require("underscore.string");
    BackboneAssociations = require("backbone-associations");
    numeral = require("numeral");
    moment = require("moment");
    momentRange = require("moment-range");
    try {
      $ = require('jquery');
    } catch (_error) {
      e = _error;
    }
    return module.exports = root.Marionetist = factory(root, exports, Backbone, Marionette, _, $, i18n, s, numeral, moment);
  } else {
    return root.Marionetist = factory(root, {}, root.Backbone, root.Marionette, root._, root.jQuery || root.Zepto || root.ender || root.$, root.i18n, root.s, root.numeral, root.moment);
  }
})(this, function(root, exports, Backbone, Marionette, _, $, i18n, s, numeral, moment) {
  var Marionetist, Templates;
  if ($ == null) {
    if (typeof console !== "undefined" && console !== null) {
      console.error("Unable to load jQuery");
    }
  }
  if (_ == null) {
    if (typeof console !== "undefined" && console !== null) {
      console.error("Unable to load Underscore");
    }
  }
  if (s == null) {
    if (typeof console !== "undefined" && console !== null) {
      console.error("Unable to load Underscore.string");
    }
  }
  if (Backbone == null) {
    if (typeof console !== "undefined" && console !== null) {
      console.error("Unable to load Backbone");
    }
  }
  if (Backbone.AssociatedModel == null) {
    if (typeof console !== "undefined" && console !== null) {
      console.error("Unable to load backbone-associations");
    }
  }
  if (Marionette == null) {
    if (typeof console !== "undefined" && console !== null) {
      console.error("Unable to load Marionette");
    }
  }
  if (i18n == null) {
    if (typeof console !== "undefined" && console !== null) {
      console.error("Unable to load i18next");
    }
  }
  if (numeral == null) {
    if (typeof console !== "undefined" && console !== null) {
      console.error("Unable to load numeral");
    }
  }
  if (moment == null) {
    if (typeof console !== "undefined" && console !== null) {
      console.error("Unable to load moment");
    }
  }
  if (moment.range == null) {
    if (typeof console !== "undefined" && console !== null) {
      console.error("Unable to load moment-range");
    }
  }
  Marionetist = Marionette.extend();
  Marionetist.Backbone = Backbone;
  Marionetist.Marionette = Marionette;
  Marionetist._ = _;
  Marionetist.$ = $;
  Marionetist.s = s;
  Marionetist.I18n = i18n;
  Marionetist.numeral = numeral;
  Marionetist.moment = moment;
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
    render: function(template, data) {
      var path;
      if (_.isFunction(template)) {
        return template(data);
      } else {
        if (template === false) {
          return;
        }
        path = this.getTemplate(template);
        if (!path) {
          throw "Template " + template + " not found!";
        }
        return path(data);
      }
    },
    getTemplate: function(template) {
      var engine, i, j, len, len1, lookup, lookups, path, ref;
      lookups = Marionetist.Config.getOption("templates").getOption("lookupPaths");
      if (_.isFunction(lookups)) {
        lookups = lookups();
      }
      if (!_.isArray(lookups)) {
        throw "lookupPaths most be an array";
      }
      for (i = 0, len = lookups.length; i < len; i++) {
        lookup = lookups[i];
        ref = [template, this.withTemplate(template)];
        for (j = 0, len1 = ref.length; j < len1; j++) {
          path = ref[j];
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
    t: Marionetist.I18n.t,
    formatCurrency: function(amount, format) {
      if (format == null) {
        format = "$0,0.00";
      }
      return Marionetist.numeral(amount).format(format);
    },
    formatNumber: function(amount, format) {
      if (format == null) {
        format = "0,0.00";
      }
      return Marionetist.numeral(amount).format(format);
    },
    formatPercentage: function(amount, format) {
      if (format == null) {
        format = "0.00%";
      }
      return Marionetist.numeral(amount).format(format);
    },
    formatDate: function(date, format) {
      if (format == null) {
        format = "DD-MM-YYYY";
      }
      return Marionetist.moment(date).format(format);
    }
  };
  _.extend(Marionetist.View.prototype, {
    templateHelpers: function() {
      return Marionetist.Views.templateHelpers;
    }
  });
  Marionetist.Views.Collection = (function(superClass) {
    extend(Collection, superClass);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    return Collection;

  })(Marionette.CollectionView);
  Marionetist.Views.Composite = (function(superClass) {
    extend(Composite, superClass);

    function Composite() {
      return Composite.__super__.constructor.apply(this, arguments);
    }

    return Composite;

  })(Marionette.CompositeView);
  Marionetist.Views.Layout = (function(superClass) {
    extend(Layout, superClass);

    function Layout() {
      return Layout.__super__.constructor.apply(this, arguments);
    }

    return Layout;

  })(Marionette.LayoutView);
  Marionetist.Views.Item = (function(superClass) {
    extend(Item, superClass);

    function Item() {
      return Item.__super__.constructor.apply(this, arguments);
    }

    return Item;

  })(Marionette.ItemView);
  Marionetist.Entities = new Marionetist.Object();
  Marionetist.Entities.Models = new Marionetist.Object();
  Marionetist.Entities.Collections = new Marionetist.Object();
  Marionetist.Entities.Models.Base = (function(superClass) {
    extend(Base, superClass);

    function Base() {
      return Base.__super__.constructor.apply(this, arguments);
    }

    return Base;

  })(Backbone.Model);
  if (Backbone.AssociatedModel) {
    Marionetist.Entities.Models.Associated = (function(superClass) {
      extend(Associated, superClass);

      function Associated() {
        return Associated.__super__.constructor.apply(this, arguments);
      }

      return Associated;

    })(Backbone.AssociatedModel);
  }
  Marionetist.Entities.Collections.Base = (function(superClass) {
    extend(Base, superClass);

    function Base() {
      return Base.__super__.constructor.apply(this, arguments);
    }

    return Base;

  })(Backbone.Collection);
  Marionetist.Controllers = new Marionetist.Object();
  Marionetist.Controllers.Base = (function(superClass) {
    extend(Base, superClass);

    function Base() {
      return Base.__super__.constructor.apply(this, arguments);
    }

    return Base;

  })(Marionetist.Object);
  Marionetist.Application = Marionetist.Application.extend({
    Backbone: Marionetist.Backbone,
    Marionette: Marionetist.Marionette,
    _: Marionetist._,
    $: Marionetist.$,
    s: Marionetist.s,
    I18n: Marionetist.I18n,
    numeral: Marionetist.numeral,
    moment: Marionetist.moment,
    Controllers: new Marionetist.Object(),
    Entities: new Marionetist.Object(),
    Views: new Marionetist.Object(),
    navigate: function(route, options) {
      if (options == null) {
        options = {};
      }
      return Marionetist.Backbone.history.navigate(route, options);
    },
    getCurrentRoute: function() {
      var frag;
      frag = Marionetist.Backbone.history.fragment;
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
      if (Marionetist.Backbone.history != null) {
        return Marionetist.Backbone.history.start(options);
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
