## Controllers

List of all the diferent controller classes:

* **`Marionettist.Controllers.Base`**

### Filters

Filters are methods that gets executed before or after a route action and can be defined in your controller.

You can define a filter in 2 diferent ways:

**As Function**

```
class CountriesController extends Marionettist.Controllers.Base

  filters:
    before:
      authenticate: (controller)=>
        console.log controller.route.path()
        console.log controller.route.actionName()
        console.log "do your custom authentication"
```

**As object**

```
class CountriesController extends Marionettist.Controllers.Base

  filters:
    before:
      authenticate:
        only: ["index"]

  authenticate: ()->
    console.log "authenticating"
```
