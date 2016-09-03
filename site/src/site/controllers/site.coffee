SiteViewModel = require("../entities/view-models/site.coffee")

class SiteController extends Marionettist.Controllers.Base

  constructor: (options)->
    super(options)
    @app = options.app
    @viewModel = new SiteViewModel()
    @mainRegion = @app.getRegion()

  index: ()->
    layoutView = @viewModel.getView("layout")
    responder = @viewModel.getResponder("base",
      region: @mainRegion
      loaderView: @viewModel.getView("loading")
    )

    @listenTo layoutView, "render", =>
      @showNavbar layoutView

    # responder.get("async").push @fakeFetch()

    responder.show(layoutView, async: true)


  documentation: ()->
    layoutView = @viewModel.getView("layout")
    responder = @viewModel.getResponder("base",
      region: @mainRegion
      loaderView: @viewModel.getView("loading")
    )

    @listenTo layoutView, "render", =>
      @showNavbar layoutView

    # responder.get("async").push @fakeFetch()

    responder.show(layoutView, async: true)

  blog: ()->
    layoutView = @viewModel.getView("layout")
    responder = @viewModel.getResponder("base",
      region: @mainRegion
      loaderView: @viewModel.getView("loading")
    )

    @listenTo layoutView, "render", =>
      @showNavbar layoutView

    # responder.get("async").push @fakeFetch()

    responder.show(layoutView, async: true)



  showNavbar: (layoutView)->
    navbar = @viewModel.getView("navbar")
    layoutView.showChildView("navRegion",navbar)


  fakeFetch: (delay = 3000)->
    deferred = Marionettist.$.Deferred()
    setTimeout (=>
      deferred.resolve()
      ), delay
    deferred.promise()


module.exports = SiteController
