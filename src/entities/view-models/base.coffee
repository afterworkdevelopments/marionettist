`import Marionettist from "../../core.js"`
`import Backbone from "backbone"`
`import BaseModel from "../../entities/models/base.js"`
`import BaseCollection from "../../entities/collections/base.js"`
`import BaseResponder from "../../entities/responders/base.js"`
class Base extends Backbone.Model

  responders:()->
    base: BaseResponder

  models: ()->
    base: BaseModel

  collections: ()->
    base: BaseCollection

  views: ()->
    {}

  getResponder: (responderName, options = {})->
    return @getResource("responders",responderName, options)

  getView: (viewName, options = {})->
    return @getResource("views",viewName, options)

  getModel: (modelName, options = {})->
    return @getResource("models",modelName, options)

  getCollection: (collectionName, models = [], options = {})->
    return @getResource("collections",collectionName, options, models)

  getResource: (resourcesName,resourceName, options = {}, models)->
    resource = null
    resources = @[resourcesName]
    resources = resources() if Marionettist._.isFunction(resources)
    options.viewModel = @ if not options.viewModel?
    if Marionettist._.isObject(resources) and resources[resourceName]?
      if models?
        resource = new resources[resourceName](models, options)
      else
        resource = new resources[resourceName](options)
    return resource

`export default Base`
