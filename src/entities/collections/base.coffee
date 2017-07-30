import Marionettist from "../../core.coffee"
import Backbone from "backbone"
class Base extends Backbone.Collection

  remoteKey: "data"

  urlRoot: ""

  headers: ->
    return {
    }

  url: ->
    "#{@urlRoot}/#{@urlPath}"

  sync: (method, model, options)->
    options.contentType = "application/json" if !options.contentType?
    options.headers = Marionettist.utils.getValue(@headers) if !options.headers?
    super(method, model, options)

  parse: (response, options)->
    data = response
    data = data[@remoteKey] if @remoteKey?
    @meta = response.meta if response.meta?
    return data


export default Base
