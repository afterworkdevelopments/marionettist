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
`import CollectionView from "./views/collection.js"`
`import CompositeView from "./views/composite.js"`
`import ItemView from "./views/item.js"`
`import LayoutView from "./views/layout.js"`
`import BaseModel from "./entities/models/base.js"`
`import BaseCollection from "./entities/collections/base.js"`
`import BaseViewModel from "./entities/view-models/base.js"`
`import BaseController from "./controllers/base.js"`

root = typeof self == 'object' and self.self == self and self or typeof global == 'object' and global.global == global and global


Marionettist.channels = new Channels()

Marionettist.location = new Location()

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

  templateHelpers: ->
    helpers = Marionettist.Views.templateHelpers
    if @viewContext?
      helpers.viewContext = @viewContext
      helpers.viewContext = @viewContext() if Marionettist._.isFunction(@viewContext)
    else
      helpers.viewContext = {}
    return helpers

# views/collection

Marionettist.Views.Collection = CollectionView

# views/composite
Marionettist.Views.Composite = CompositeView

# views/item

Marionettist.Views.Item = ItemView

# views/layout

Marionettist.Views.Layout = LayoutView

# Entities

Marionettist.Entities = new Marionettist.Object()

Marionettist.Entities.Models = new Marionettist.Object()

Marionettist.Entities.Collections = new Marionettist.Object()

Marionettist.Entities.ViewModels = new Marionettist.Object()

# entities/models/base

Marionettist.Entities.Models.Base = BaseModel

# entities/models/associated

if Marionettist.Backbone.AssociatedModel
  class Marionettist.Entities.Models.Associated extends Marionettist.Backbone.AssociatedModel

# entities/collections/base

Marionettist.Entities.Collections.Base = BaseCollection

# entities/view-models/base

Marionettist.Entities.ViewModels.Base = BaseViewModel

# controllers/base

Marionettist.Controllers = new Marionettist.Object()

Marionettist.Controllers.Base = BaseController

Marionettist.Application = Marionettist.Application.extend

  Controllers: new Marionettist.Object()

  Entities: new Marionettist.Object()

  Views: new Marionettist.Object()


  startHistory: (options= {})->
    Marionettist.location.startHistory(options)

  register: (instance, id) ->
    @_registry ?= {}
    @_registry[id] = instance

  unregister: (instance, id) ->
    delete @_registry[id]

  resetRegistry: ->
    oldCount = @getRegistrySize()
    for key, controller of @_registry
      controller.region.close()
    msg = "There were #{oldCount} controllers in the registry, there are now #{@getRegistrySize()}"
    if @getRegistrySize() > 0 then console.warn(msg, @_registry) else console.log(msg)

  getRegistrySize: ->
    Marionettist._.size @_registry

global.Marionettist = Marionettist if global?


`export default Marionettist`
