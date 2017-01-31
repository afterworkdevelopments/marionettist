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

SiteResponder = require("../entities/responders/site.coffee")
LayoutView = require("../views/layout.coffee")
LoadingView = require("../views/loading.coffee")
class SiteController extends Marionettist.Controllers.Base

  constructor: (options)->
    super(options)
    @app = options.app

  fakeFetch: (duration = 3000)->
    deferred = Marionettist.$.Deferred()
    setTimeout (=>
      console.log "ASYNC"
      deferred.resolve()
      ), duration
    return deferred.promise()

  index: ()->
    responder = new SiteResponder("base", region: @app.mainRegion)
    layoutView = new LayoutView()

    # Changes the default loading view for a custom one, the default view use font-awesome as spinner icon
    responder.set
      loaderView: new LoadingView()

    @listenTo layoutView, "render", =>
      @showNavbar layoutView.navRegion
      @showSidebar layoutView.sidebarRegion



    responder.set "async", @fakeFetch() # Added some async fetch, it can be a model or collection fetch or array of fetches

    responder.show(layoutView, async: true) # This will display a loading view until all fetches are resolve
```

**Note:** All responders most have a region.
