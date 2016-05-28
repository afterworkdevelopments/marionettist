`import Marionettist from "../../core.js"`
`import Backbone from "backbone"`
class Base extends Backbone.Model

  models: {}

  collections: {}

  views: {}

  getView: (viewName, options = {})->
    return @getResource("views",viewName, options)

  getModel: (modelName, options = {})->
    return @getResource("models",modelName, options)

  getCollection: (collectionName, options = {})->
    return @getResource("collections",collectionName, options)

  getResource: (resourcesName,resourceName, options = {})->
    resource = null
    resources = @[resourcesName]
    options.viewModel = @ if not options.viewModel?
    if Marionettist._.isObject(resources) and resources[resourceName]?
      resource = new resources[resourceName](options)
    return resource

`export default Base`
