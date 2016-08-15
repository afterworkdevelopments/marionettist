Marionettist = require("../../dist/marionettist.js")

# Marionettist.config.templates.lookupPaths = ["site/"]

Routes = require("./site/routers/routes.coffee")
# I18n locales

localeResources =
  en: require("./site/locales/en.coffee")

Marionettist.I18n.init
  lng: "en"
  resources: localeResources

fakeFetch = (delay = 3000)->
  deferred = Marionettist.$.Deferred()
  setTimeout (=>
    deferred.resolve()
    ), delay
  deferred.promise()
# Marionettist.config.templates.lookupPaths = []
Marionettist.config.templates.debug = true

SubApp = Marionettist.Application.extend

  onResourcesFetchSuccess: ->
    console.log "yay"

  onStart: (options)->
    console.log "onStart"
    console.log options
    console.log @options

mainApp = Marionettist.Application.extend
  childApps:
    subApp:
      AppClass: SubApp
      fooOption: true
      startWithParent: true


Site = new mainApp
window.Site = Site

Site.resources.push(fakeFetch(5000))

Site.addRegions
  mainRegion: '.site-application-region'


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

window.Marionettist = Marionettist

module.exports = Site
