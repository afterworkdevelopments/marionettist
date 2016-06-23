## Models

List of all the diferent model classes:

* **`Marionettist.Entities.Models.Base`**
* **`Marionettist.Entities.Models.Associated`**

## Collections

List of all the diferent collection classes:

* **`Marionettist.Entities.Collections.Base`**

## ViewModels

A view-model it's an object that groups common classes that you might use in a app. Every class invoked will have a the same instance of the viewModel  mixed in the options.

This is useful to have because you can have a viewModel object shared across the views, and listen or trigger events to comunicate with another views with the same context.

```
# ViewModel

class SiteViewModel extends Marionettist.Entities.ViewModels.Base

  models:
    navItem: require("../models/nav-item")

  collections:
    navItems: require("../collections/nav-items")

  views:
    layout: require("../../views/layout.coffee")
    navbar: require("../../views/navbar.coffee")
    loading: require("../../views/loading.coffee")
    sidebar: require("../../views/sidebar.coffee")
    navItem: require("../../views/nav-item.coffee")

module.exports = SiteViewModel

```

```
# Controller

SiteViewModel = require("../entities/view-models/site.coffee")
class SiteController extends Marionettist.Controllers.Base

  constructor: (options)->
    super(options)
    @app = options.app
    @viewModel = new SiteViewModel()

  index: ()->
    layoutView = @viewModel.getView("layout")
    sidebarView = @viewModel.getView("sidebar")

    layoutView.getOption("viewModel") # this is an instance of @viewModel

    @listenTo layoutView, "show", =>
      @showNavbar layoutView.navRegion
      @showSidebar layoutView.sidebarRegion


    @app.mainRegion.show(layoutView)

```


## Responders

A responder it's a simple service object oriented to show a view on a region.

Some benefits of using this service are:

* You can queue async fetches and when you call show, it will display a loading view while waits for all the fetches to resolve.
* A common interface to queue and fetch things.
* Can pass some parameters to it and do some custom logic inside of it, to separate concerns.

```
# Controller

SiteViewModel = require("../entities/view-models/site.coffee")
class SiteController extends Marionettist.Controllers.Base

  constructor: (options)->
    super(options)
    @app = options.app
    @viewModel = new SiteViewModel()

  fakeFetch: (duration = 3000)->
    deferred = Marionettist.$.Deferred()
    setTimeout (=>
      console.log "ASYNC"
      deferred.resolve()
      ), duration
    return deferred.promise()

  index: ()->
    responder = @viewModel.getResponder("base", region: @app.mainRegion)
    layoutView = @viewModel.getView("layout")

    # Changes the default loading view for a custom one, the default view use font-awesome as spinner icon
    responder.set
      loaderView: @viewModel.getView("loading")

    sidebarView = @viewModel.getView("sidebar")

    @listenTo layoutView, "show", =>
      @showNavbar layoutView.navRegion
      @showSidebar layoutView.sidebarRegion



    responder.set "async", @fakeFetch() # Added some async fetch, it can be a model or collection fetch or array of fetches

    responder.show(layoutView, async: true) # This will display a loading view until all fetches are resolve
```

**Note:** All responders most have a region.
