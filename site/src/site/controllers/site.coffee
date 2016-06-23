SiteViewModel = require("../entities/view-models/site.coffee")

class SiteController extends Marionettist.Controllers.Base

  constructor: (options)->
    super(options)
    @app = options.app
    @viewModel = new SiteViewModel()

  index: ()->
    layoutView = @viewModel.getView("layout")
    responder = @viewModel.getResponder("base",
      region: @app.mainRegion
      loaderView: @viewModel.getView("loading")
    )

    @listenTo layoutView, "show", =>
      @showNavbar layoutView.navRegion
      
    responder.get("async").push @fakeFetch()

    responder.show(layoutView, async: true)


  documentation: ()->
    layoutView = @viewModel.getView("layout")
    responder = @viewModel.getResponder("base",
      region: @app.mainRegion
      loaderView: @viewModel.getView("loading")
    )

    @listenTo layoutView, "show", =>
      @showNavbar layoutView.navRegion

    responder.get("async").push @fakeFetch()

    responder.show(layoutView, async: true)

  contact: ()->
    layoutView = @viewModel.getView("layout")
    responder = @viewModel.getResponder("base",
      region: @app.mainRegion
      loaderView: @viewModel.getView("loading")
    )

    @listenTo layoutView, "show", =>
      @showNavbar layoutView.navRegion

    responder.get("async").push @fakeFetch()

    responder.show(layoutView, async: true)



  showNavbar: (region)->
    navbar = @viewModel.getView("navbar")
    region.show(navbar)

  showLoading: (region)->
    loading = @viewModel.getView("loading")
    region.show(loading)

  fakeFetch: (delay = 3000)->
    deferred = Marionettist.$.Deferred()
    setTimeout (=>
      deferred.resolve()
      ), delay
    deferred.promise()


module.exports = SiteController
