LayoutView = require("../views/layout.coffee")
NavbarView = require("../views/navbar.coffee")
class SiteController extends Marionettist.Controllers.Base

  constructor: (options)->
    super(options)
    @app = options.app

  index: ()->
    layoutView = @getLayoutView()

    @listenTo layoutView, "show", =>
      @showNavbar layoutView.navRegion

    @app.mainRegion.show(layoutView)


  documentation: ()->
    layoutView = @getLayoutView()

    @listenTo layoutView, "show", =>
      @showNavbar layoutView.navRegion

    @app.mainRegion.show(layoutView)

  getNavbarView: ()->
    new NavbarView()

  getLayoutView: ()->
    new LayoutView()

  showNavbar: (region)->
    navbar = @getNavbarView()
    region.show(navbar)


module.exports = SiteController
