import _ from "underscore";
import underscoreContrib from "underscore-contrib";
import s from "underscore.string";
import $ from "jquery";
import Backbone from "backbone";
import backbone_radio from "backbone.radio";
import backboneAssociations from "backbone-associations";
import Marionette from "backbone.marionette";
import i18next from "i18next";
import numeral from "numeral";
import moment from "moment";
import momentRange from "moment-range";
import momentTimezone from "moment-timezone";
import Marionettist from "./core.js";
import Env from "./env.js";
import Channels from "./channels.js";
import Location from "./location.js";
import Config from "./config.js";
import Renderer from "./mixins/renderer.js";
import Utils from "./utils.js";
import Logger from "./logger.js";
import AppRoute from "./route.js";
import AppRouter from "./router.js";
import Region from "./region.js";
import Views from "./views.js";
import CollectionView from "./views/collection.js";
import CompositeView from "./views/composite.js";
import ItemView from "./views/item.js";
import LayoutView from "./views/layout.js";
import BaseModel from "./entities/models/base.js";
import BaseCollection from "./entities/collections/base.js";
import BaseController from "./controllers/base.js";
var root,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

root = typeof self === 'object' && self.self === self && self || typeof global === 'object' && global.global === global && global;

Marionettist.Backbone = Backbone;

Marionettist.Marionette = Marionette;

Marionettist._ = _;

Marionettist.$ = $;

Marionettist.s = s;

Marionettist.I18n = i18next;

Marionettist.numeral = numeral;

Marionettist.moment = moment;

Marionettist.channels = new Channels();

Marionettist.location = new Location();

Marionettist.env = new Env();

Marionettist.config = new Config();

Marionettist.logger = new Logger;

Marionettist._.extend(Marionettist.Renderer, Renderer);

Marionettist.utils = new Utils;

Marionettist.AppRoute = AppRoute;

Marionettist.AppRouter = AppRouter;

Marionettist.Region = Region;

Marionettist.Views = new Views();

Marionettist._.extend(Marionettist.View.prototype, {
  templateHelpers: function() {
    var helpers;
    helpers = Marionettist.Views.templateHelpers;
    if (this.viewContext != null) {
      helpers.viewContext = this.viewContext;
      if (Marionettist._.isFunction(this.viewContext)) {
        helpers.viewContext = this.viewContext();
      }
    } else {
      helpers.viewContext = {};
    }
    return helpers;
  }
});

Marionettist.Views.Collection = CollectionView;

Marionettist.Views.Composite = CompositeView;

Marionettist.Views.Item = ItemView;

Marionettist.Views.Layout = LayoutView;

Marionettist.Entities = new Marionettist.Object();

Marionettist.Entities.Models = new Marionettist.Object();

Marionettist.Entities.Collections = new Marionettist.Object();

Marionettist.Entities.Models.Base = BaseModel;

if (Marionettist.Backbone.AssociatedModel) {
  Marionettist.Entities.Models.Associated = (function(superClass) {
    extend(Associated, superClass);

    function Associated() {
      return Associated.__super__.constructor.apply(this, arguments);
    }

    return Associated;

  })(Marionettist.Backbone.AssociatedModel);
}

Marionettist.Entities.Collections.Base = BaseCollection;

Marionettist.Controllers = new Marionettist.Object();

Marionettist.Controllers.Base = BaseController;

Marionettist.Application = Marionettist.Application.extend({
  Controllers: new Marionettist.Object(),
  Entities: new Marionettist.Object(),
  Views: new Marionettist.Object(),
  startHistory: function(options) {
    if (options == null) {
      options = {};
    }
    return Marionettist.location.startHistory(options);
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
    return Marionettist._.size(this._registry);
  }
});

if (typeof global !== "undefined" && global !== null) {
  global.Marionettist = Marionettist;
}

export default Marionettist;
