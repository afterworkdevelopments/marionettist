SiteViewModel = require("../entities/view-models/site.coffee")

class SiteController extends Marionettist.Controllers.Base

  constructor: (options)->
    super(options)
    @app = options.app
    @viewModel = new SiteViewModel()

  index: ()->
    layoutView = @viewModel.getView("layout")
    loadingView = @viewModel.getView("loading")

    @listenTo layoutView, "show", =>
      @showNavbar layoutView.navRegion

    @app.mainRegion.show(loadingView)
    setTimeout (=>
      @app.mainRegion.show(layoutView)
      ), 500


  documentation: ()->
    layoutView = @viewModel.getView("layout")
    loadingView = @viewModel.getView("loading")

    @listenTo layoutView, "show", =>
      @showNavbar layoutView.navRegion

    @app.mainRegion.show(loadingView)
    setTimeout (=>
      @app.mainRegion.show(layoutView)
      ), 500

  contact: ()->
    layoutView = @viewModel.getView("layout")
    loadingView = @viewModel.getView("loading")

    @listenTo layoutView, "show", =>
      @showNavbar layoutView.navRegion

    @app.mainRegion.show(loadingView)
    setTimeout (=>
      @app.mainRegion.show(layoutView)
      ), 500


  showNavbar: (region)->
    navbar = @viewModel.getView("navbar")
    region.show(navbar)

  showLoading: (region)->
    loading = @viewModel.getView("loading")
    region.show(loading)


module.exports = SiteController
