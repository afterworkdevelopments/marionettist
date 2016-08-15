`import Marionettist from "./core.js"`
class Utils extends Marionettist.Object

  pathFor: (_path)->
    path = ""
    path = "##{_path}"
    path

  waitFor: (promises, options = {}) ->
    switch
      when options.promiseType is "bluebird"
        @_waitForBluebird(promises, options)
      else
        @_waitForAjax(promises, options)

  _waitForAjax: (ajaxRequests, options = {}) ->
    xhrs = []
    xhrs= Marionettist._.chain([ajaxRequests]).flatten().value()
    Marionettist.$.when(xhrs...).then ((args...)->
      options.success(args...) if Marionettist._.isFunction(options.success)
      ), (args...)->
        options.error(args...) if Marionettist._.isFunction(options.error)

  _waitForBluebird: (promises, options = {})->
    promises = Marionettist._.chain([promises]).flatten().value()
    Promise.all(promises.map((promise) ->
      promise.reflect()
    )).then (inspections) ->

      successArgs = []
      errors = []
      for inspection in inspections
        if inspection.isFulfilled()
          successArgs.push inspection.value()
        else
          errors.push inspection.reason()
      if errors.length > 0
        options.error(errors...) if Marionettist._.isFunction(options.error)
      else
        options.success(successArgs...) if Marionettist._.isFunction(options.success)

`export default Utils`
