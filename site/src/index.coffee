Marionettist = require("../../dist/marionettist.js")

# Marionettist.config.templates.lookupPaths = ["site/"]

Routes = require("./site/routers/routes.coffee")
# I18n locales

localeResources =
  en: require("./site/locales/en.coffee")

Marionettist.I18n.init
  lng: "en"
  resources: localeResources

# Marionettist.config.templates.lookupPaths = []
# Marionettist.config.templates.debug = true

SubApp = Marionettist.Application.extend

  onResourcesFetchSuccess: ->
    console.log "yay"

  onStart: (options)->
    console.log "SubApponStart"
    console.log options
    console.log @options

mainApp = Marionettist.Application.extend
  region: '.site-application-region'
  childApps:
    subApp:
      AppClass: SubApp
      fooOption: true
      startWithParent: true


Site = new mainApp


Site.on "start", ->

  # start routers

  Routes.start
    app: Site

  # start listening to routes

  @startHistory
    pushState: false
    root: '/'

Marionettist.$(document).ready ->
  Site.start({hola: "MainApp"})

module.exports = Site
