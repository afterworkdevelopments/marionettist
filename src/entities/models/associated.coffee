import Marionettist from "../../core.coffee"
Associated = undefined
if Marionettist.Backbone.AssociatedModel
  class Associated extends Marionettist.Backbone.AssociatedModel
    urlRoot: ""

    urlPath: ""

    headers: ->
      return {
      }

    url: ->
      if @isNew()
        "#{@urlRoot}/#{@urlPath}"
      else
        "#{@urlRoot}/#{@urlPath}/#{@get("id")}"

    remoteKey: "data"

    _setAttr:  (attributes, options)->
      # BUG FIX for fetch a model nested
      options.parse = false if options?
      super(attributes, options)

    sync: (method, model, options)->
      options.contentType = "application/json" if !options.contentType?
      options.headers = Marionettist.utils.getValue(@headers) if !options.headers?
      options.dataType = "json"
      if options.data? and options.data instanceof FormData
        options.method = "POST"
        options.contentType = false
        options.processData = false
        httpVerb = "POST"
        httpVerb = "PUT" if method is "update"
        httpVerb = "DELETE" if method is "delete"
        options.data.append("_method", httpVerb)

      if (method is "create" or method is "update" or method is "delete") and !options.attrs?
        if @remoteKey?
          attrs = {}
          attrs[@remoteKey] = @toJSON()
        else
          attrs = @toJSON()
        attrs = options.data if options.data? and options.data instanceof FormData
        options.attrs = attrs
      super(method, model, options)

    parse: (response, options)->
      data = response
      data = data[@remoteKey] if (@remoteKey? and !@collection) or (@remoteKey? and options.forceRemoteKey?)
      return data


export default Associated
