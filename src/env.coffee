class Env

  @current: ->
    @_current or= new Env

  constructor: ()->
    @stage = "development"

  isDevelopment: ->
    @stage == "development"

  isProduction: ->
    @stage == "production"

  getLocale: ()->
    Marionettist.I18n.language


  setLocale: (locale = "en", callback = null)->
    oldLocale = @getLocale()
    Marionettist.I18n.changeLanguage locale, (t) ->
      Marionettist.channels.publish "marionettist", "change:locale",
        currentLocale: locale
        oldLocale: oldLocale

      callback(t) if Marionettist._.isFunction(callback)
`export default Env`
