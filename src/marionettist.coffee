`import Marionettist from "./core.js"`
`import Env from "./env.js"`
`import Channels from "./channels.js"`
`import Location from "./location.js"`
`import Config from "./config.js"`
`import Renderer from "./mixins/renderer.js"`
`import Utils from "./utils.js"`
`import Logger from "./logger.js"`
`import AppRoute from "./route.js"`
`import AppRouter from "./router.js"`
`import Region from "./region.js"`
`import Views from "./views.js"`
`import BaseView from "./views/base.js"`
`import CollectionView from "./views/collection.js"`
`import BaseModel from "./entities/models/base.js"`
`import BaseCollection from "./entities/collections/base.js"`
`import BaseResponder from "./entities/responders/base.js"`
`import BaseViewModel from "./entities/view-models/base.js"`
`import BaseController from "./controllers/base.js"`
`import Application from "./application.js"`
`import Module from "./module.js"`

root = typeof self == 'object' and self.self == self and self or typeof global == 'object' and global.global == global and global


Marionettist.channels = new Channels()

Marionettist.location = new Location()

Marionettist.Module = Module

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
    helpers = Marionettist.Views.templateHelpers
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

if Marionettist.Backbone.AssociatedModel
  class Marionettist.Entities.Models.Associated extends Marionettist.Backbone.AssociatedModel

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


`export default Marionettist`
