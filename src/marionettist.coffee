import Marionettist from "./core.coffee"
import Env from "./env.coffee"
import Channels from "./channels.coffee"
import Location from "./location.coffee"
import Config from "./config.coffee"
import Renderer from "./mixins/renderer.coffee"
import Utils from "./utils.coffee"
import Logger from "./logger.coffee"
import AppRoute from "./route.coffee"
import AppRouter from "./router.coffee"
import Region from "./region.coffee"
import Views from "./views.coffee"
import BaseView from "./views/base.coffee"
import CollectionView from "./views/collection.coffee"
import BaseModel from "./entities/models/base.coffee"
import BaseAssociatedModel from "./entities/models/associated.coffee"
import BaseCollection from "./entities/collections/base.coffee"
import BaseResponder from "./entities/responders/base.coffee"
import BaseViewModel from "./entities/view-models/base.coffee"
import BaseController from "./controllers/base.coffee"
import Application from "./application.coffee"
import Module from "./module.coffee"


root = typeof self == 'object' and self.self == self and self or typeof global == 'object' and global.global == global and global


Marionettist.channels = new Channels()

Marionettist.location = new Location()

Marionettist.Module = Module

# Mixins

Marionettist.Mixins =
  Collections: {}
  Models: {}
  Views: {}

# Environment
Marionettist.env = new Env()

# Config
Marionettist.config = new Config()

# Logger

Marionettist.logger = new Logger

# Renderer

Marionettist._.extend Marionettist.Renderer, Renderer

# Utils

Marionettist.utils = new Utils

# Route

Marionettist.AppRoute = AppRoute

# Router
Marionettist.AppRouter = AppRouter

#  Region

Marionettist._.extend Marionettist.Region::,Region::

# Views

Marionettist.Views = new Views()

Marionettist._.extend Marionettist.View::,

  templateContext: ->
    helpers = Marionettist._.clone Marionettist.Views.templateHelpers
    return helpers

# views/base

Marionettist.Views.Base = BaseView

# views/collection

Marionettist.Views.Collection = CollectionView


# Entities

Marionettist.Entities = new Marionettist.Object()

Marionettist.Entities.Models = new Marionettist.Object()

Marionettist.Entities.Collections = new Marionettist.Object()

Marionettist.Entities.ViewModels = new Marionettist.Object()

Marionettist.Entities.Responders = new Marionettist.Object()

# entities/models/base

Marionettist.Entities.Models.Base = BaseModel

# entities/models/associated
Marionettist.Entities.Models.Associated = BaseAssociatedModel

# entities/collections/base

Marionettist.Entities.Collections.Base = BaseCollection

# entities/view-models/base

Marionettist.Entities.Responders.Base = BaseResponder

# entities/view-models/base

Marionettist.Entities.ViewModels.Base = BaseViewModel

# controllers/base

Marionettist.Controllers = new Marionettist.Object()

Marionettist.Controllers.Base = BaseController

Marionettist.Application = Application


global.Marionettist = Marionettist if global?


export default Marionettist
