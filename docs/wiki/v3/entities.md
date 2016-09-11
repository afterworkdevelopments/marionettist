## Models

List of all the diferent model classes:

* **`Marionettist.Entities.Models.Base`**
* **`Marionettist.Entities.Models.Associated`**

## Collections

List of all the diferent collection classes:

* **`Marionettist.Entities.Collections.Base`**


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
