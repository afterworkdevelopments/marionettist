## Configurations

### Templates

#### lookupPaths

Type: **Array**, default: **["templates/"]**

Base paths to lookup templates

```
class Views.AdvertiseItem extends Marionettist.Views.ItemView
  template: "maps/templates/item"
```

**getter**

```
Marionettist.config.templates.lookupPaths
```

**setter**

```
Marionettist.config.templates.lookupPaths = ["templates/", "demo/"]
```

#### engine

Type: **Object or function**, default: **function**

This option allows you change the default template engine, the default value it's a function that returns `HAML` object or `JST` if you have it defined (JST it's the default namespace in [haml_coffee_assets](https://github.com/netzpirat/haml_coffee_assets) )

**getter**

```
Marionettist.config.templates.engine
```

**setter**

```
Marionettist.config.templates.engine = HAML
```
