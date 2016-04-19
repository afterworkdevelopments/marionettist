Marionettist = require("../../dist/marionettist.js")

Routes = require("./site/routers/routes.coffee")
# I18n locales

localeResources =
  en: require("./site/locales/en.coffee")

Marionettist.I18n.init
  lng: "en"
  resources: localeResources

console.log Marionettist.I18n.t("app.brand")

# Marionettist.config.templates.lookupPaths = []
Marionettist.config.templates.debug = true


Site = new Marionettist.Application

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
  Site.start()

window.Marionettist = Marionettist

module.exports = Site
