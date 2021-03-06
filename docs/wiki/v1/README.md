# marionettist

It's a framework that extends [Marionette](http://marionettejs.com/) and add a lot of new features, like:

* **I18n**
* **Custom template engine (HAML coffee by default)**
* **Base classes to extend from**
* **Template helpers**



## Install

```
  npm install marionettist --save
```
## Dependencies

**Marionettist** depends on a lot of awesome libraries, like:

* **[numeral](http://numeraljs.com/) (Formatting and manipulating numbers)**
* **[moment](http://momentjs.com/) (Parse, validate, manipulate, and display dates in JavaScript)**
* **[moment-range](https://github.com/gf3/moment-range) (Fancy date ranges for Moment.js)**
* **[i18next](http://i18next.com/) (Internationalization)**
* **[underscore-contrib
](https://github.com/documentcloud/underscore-contrib) (Extra utilities for underscore)**
* **[underscore.string
](https://github.com/epeli/underscore.string) (Extra utilities for underscore)**
* **[backbone-associations](http://dhruvaray.github.io/backbone-associations) (Model relationships)**
* **[Backbone.Mutators](https://github.com/asciidisco/Backbone.Mutators) (Override models getters and setters with logic)**
* **[backbone.stickit
](https://github.com/NYTimes/backbone.stickit) (Data bindings)**

## Configurations

### Templates

#### lookupPaths

Type: **Array**, default: **["templates/"]**

This configuration allows you to ignore the given paths at the time to define the template in a view.

**Example**. Let's say you have a template in  `maps/templates/item`, since the default value is `templates/` you don't have to type this path on the template definition

```
class Views.AdvertiseItem extends Marionettist.Views.ItemView
  template: "maps/item"
```

**getter**

```
Marionettist.Config.getOption("templates").getOption("lookupPaths")
```

**setter**

```
Marionettist.Config.getOption("templates").lookupPaths = ["templates/", "demo/"]
```

#### engine

Type: **Object or function**, default: **function**

This option allows you change the default template engine, the default value it's a function that returns `HAML` object or `JST` if you have it defined (JST it's the default namespace in [haml_coffee_assets](https://github.com/netzpirat/haml_coffee_assets) )

**getter**

```
Marionettist.Config.getOption("templates").getOption("engine")
```

**setter**

```
Marionettist.Config.getOption("templates").engine = HAML
```

## I18n

You can change the current locale by calling `Marionettist.setLocale("es")`, this will trigger and event named `change:locale` on the marionettist channel. Which you can subscribe later on.

```
Marionettist.setLocale("es")

# subscribe to this event

Marionettist.channels.subscribe "marionettist", "change:locale", (opts)=>
  console.log  "CHANGING LOCALE"
  console.log opts

```

## Router

The **`Marionettist.AppRouter`** adds the next features:

* The `onRoute` callback gets triggered on the controller as well.
* Adds the posibility to define "before" and "after" filters in the controller.


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



## Models

List of all the diferent model classes:

* **`Marionettist.Entities.Models.Base`**
* **`Marionettist.Entities.Models.Associated`**

## Collections

List of all the diferent collection classes:

* **`Marionettist.Entities.Collections.Base`**

## Views

List of all the diferent view classes:

* **`Marionettist.Views.Collection`**
* **`Marionettist.Views.Composite`**
* **`Marionettist.Views.Item`**
* **`Marionettist.Views.Layout`**

### viewContext

By default, and if you don't override the `templateHelpers` method, all `Marionettist` views merge it's helpers with the `viewContext` property.

**Example.**

In your view just add the `viewContext` property as an object or function.

```
Marionettist = require("marionettist")

class Item extends Marionettist.Views.Item
  template: "item"
  tagName: "div"
  viewContext: ()->
    context =
      model: @model
      foo: "Bar"
    return context

module.exports = Item
```

Now in your template you have that property available

```
%p= @name
%p= @viewContext.foo
%p= @viewContext.model.get("name")
```

## Channels

Publish and subscribe events using channels.

Using the default `Marionette` application channel it's not a very good idea because you are tied to an **instance** of that application, and there will be cases where you just want to publish an event.

For example, instead of this:

```
MyApp = new Marionette.Application()

# Alert the user on the 'minutePassed' event

MyApp.vent.on "minutePassed", (someData)->
  alert("Received", someData)

# This will emit an event with the value of window.someData every minute

window.setInterval (->
  MyApp.vent.trigger "minutePassed", window.someData
), 1000 * 60

```
You can do this:

```
# Alert the user on the 'minutePassed' event

# The parameters to subscribe are: channelName, eventName, callback

Marionettist.channels.subscribe "global",  "minutePassed", (someData)->

  alert("Received", someData)


# This will emit an event with the value of window.someData every minute

window.setInterval (->

  # The parameters to publish are: channelName, eventName, data

  Marionettist.channels.publish "global", "minutePassed", window.someData

), 1000 * 60
```
**Note:** At the moment to publish and subscribe an event, `Marionettist` make use of `Backbone.Wreqr.radio` but when the next major release of  `Marionette` is up, probably it will be replaced with `Backbone.Radio`

## Template helpers

All marionettist views have the next helpers:

## @t(string)

i18next translation.

**Example.**

```
# Inside templates/dashboard.hamlc

%h1
  = @t("app.title")
```

## @formatCurrency(amount, format)

Gives format to an amount. Default format is `$0,0.00`

**Example.**

```

%p
  = @t("app.price")
  = @formatCurrency(25.595988) # outputs  $25.60
```

## @formatNumber(amount, format)

Gives format to an amount. Default format is `0,0.00`

**Example.**

```

%p
  = @t("app.price")
  = @formatNumber(3598.569) # outputs  3,598.57
```

## @formatPercentage(amount, format)

Gives format to an amount. Default format is `0.00%`

**Example.**

```

%p
  = @t("app.price")
  = @formatNumber(0.974878234) # outputs  97.49%
```

## @formatDate(date, format)

Gives format date. Default format is `DD-MM-YYYY`

**Example.**

```

%p
  = @t("app.today")
  = @formatDate(new Date()) # outputs  04-09-2015
```
