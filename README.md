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
class Views.AdvertiseItem extends App.Views.ItemView
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

## Controllers

List of all the diferent controller classes:

* **`Marionettist.Controllers.Base`**

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
