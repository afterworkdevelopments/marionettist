`import Marionettist from "./core.js"`
class Utils extends Marionettist.Object

  pathFor: (_path)->
    path = ""
    path = "##{_path}"
    path

  waitFor: (ajaxRequests, options = {}) ->
    xhrs = []
    xhrs= Marionettist._.chain([ajaxRequests]).flatten().value()
    Marionettist.$.when(xhrs...).then (->
      options.success() if Marionettist._.isFunction(options.success)
      ), (error)->
        options.error() if Marionettist._.isFunction(options.error)

`export default Utils`
