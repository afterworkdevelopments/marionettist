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
import BaseView from "./views/base.js";
import CollectionView from "./views/collection.js";
import BaseModel from "./entities/models/base.js";
import BaseCollection from "./entities/collections/base.js";
import BaseResponder from "./entities/responders/base.js";
import BaseViewModel from "./entities/view-models/base.js";
import BaseController from "./controllers/base.js";
import Application from "./application.js";
import Module from "./module.js";
var root,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

root = typeof self === 'object' && self.self === self && self || typeof global === 'object' && global.global === global && global;

Marionettist.channels = new Channels();

Marionettist.location = new Location();

Marionettist.Module = Module;

Marionettist.env = new Env();

Marionettist.config = new Config();

Marionettist.logger = new Logger;

Marionettist._.extend(Marionettist.Renderer, Renderer);

Marionettist.utils = new Utils;

Marionettist.AppRoute = AppRoute;

Marionettist.AppRouter = AppRouter;

Marionettist._.extend(Marionettist.Region.prototype, Region.prototype);

Marionettist.Views = new Views();

Marionettist._.extend(Marionettist.View.prototype, {
  templateContext: function() {
    var helpers;
    helpers = Marionettist.Views.templateHelpers;
    return helpers;
  }
});

Marionettist.Views.Base = BaseView;

Marionettist.Views.Collection = CollectionView;

Marionettist.Entities = new Marionettist.Object();

Marionettist.Entities.Models = new Marionettist.Object();

Marionettist.Entities.Collections = new Marionettist.Object();

Marionettist.Entities.ViewModels = new Marionettist.Object();

Marionettist.Entities.Responders = new Marionettist.Object();

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

Marionettist.Entities.Responders.Base = BaseResponder;

Marionettist.Entities.ViewModels.Base = BaseViewModel;

Marionettist.Controllers = new Marionettist.Object();

Marionettist.Controllers.Base = BaseController;

Marionettist.Application = Application;

if (typeof global !== "undefined" && global !== null) {
  global.Marionettist = Marionettist;
}

export default Marionettist;
