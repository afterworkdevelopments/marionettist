`import Marionettist from "./core.js"`
class Env extends Marionettist.Object

  constructor: ()->
    @stage = "development"

  isDevelopment: ->
    @stage == "development"

  isProduction: ->
    @stage == "production"

  getLocale: ()->
    Marionettist.I18n.language

  setStage: (stage)->
    oldState = @stage
    @stage = stage
    @triggerMethod "change:stage", oldState, stage

  getStage: ()->
    @stage


  setLocale: (locale = "en", callback = null)->
    oldLocale = @getLocale()
    Marionettist.I18n.changeLanguage locale, (t) ->
      Marionettist.channels.publish "marionettist", "change:locale",
        currentLocale: locale
        oldLocale: oldLocale

      callback(t) if Marionettist._.isFunction(callback)
`export default Env`
