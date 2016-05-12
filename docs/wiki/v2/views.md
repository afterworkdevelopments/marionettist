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
