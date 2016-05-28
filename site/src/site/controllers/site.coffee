SiteViewModel = require("../entities/view-models/site.coffee")

class SiteController extends Marionettist.Controllers.Base

  constructor: (options)->
    super(options)
    @app = options.app
    @viewModel = new SiteViewModel()

  index: ()->
    layoutView = @viewModel.getView("layout")

    @listenTo layoutView, "show", =>
      @showNavbar layoutView.navRegion

    @app.mainRegion.show(layoutView)


  documentation: ()->
    layoutView = @viewModel.getView("layout")

    @listenTo layoutView, "show", =>
      @showNavbar layoutView.navRegion

    @app.mainRegion.show(layoutView)


  showNavbar: (region)->
    navbar = @viewModel.getView("navbar")
    region.show(navbar)


module.exports = SiteController
