`import Marionettist from "./core.js"`
class Utils extends Marionettist.Object

  waitFor: (ajaxRequests, options = {}) ->
    xhrs = []
    xhrs= _.chain([ajaxRequests]).flatten().value()
    Marionettist.$.when(xhrs...).then (->
      options.success() if Marionettist._.isFunction(options.success)
      ), (error)->
        options.error() if Marionettist._.isFunction(options.error)

`export default Utils`
