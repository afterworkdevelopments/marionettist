# CHANGE LOG

## 3.0.3
* Added lib to .npmignore

## 3.0.2
* Fixed some dependencies

## 3.0.1
* Fixed resources reference from parent to sub applications, which can cause unexpected behaviours

## 3.0.0
* Updated docs
* Finxing error with browserify, where backbone.radio was not getting loaded properly
* Views:
  * Fixed bug where calling super in `templateContext` made all this context global and avaibale on all views, causing unexpected behaviours

## 3.0.0-beta

* Upgraded to Marionette 3
* Starting tests
* Views:
  * removed `viewContext` option, in favor `templateContext` of Marionette 3

## 2.4.0

* Added support for childApplications
* Added Underscore.string `@s` helper to views
* Added Underscore `@_` helper to views

## 2.3.1

* Fixed router filter bug where _ it's not defined

## 2.3.0

* Added responders
* Added viewModels

## 2.2.1

* TransitionOut method must return a promise

## 2.2.0

* Added posibility to disable transition out in region

## 2.1.0

* Added viewModel
* Fixed utils.pathFor
* Changed color option to type in Logger
* Upgraded site
* Updated docs

## 2.0.0

* Added Logger
* Updated i18next
* Added Environment
* Added Es6
* Added Utils
* Replaced Config
* Deprecations:
  * Removed the "template" path from the `templateLookup` options in the Rendered. Now you have the type the full template path
  * changed the way to setup configurations, now are in the `Marionettist.config` object

## 1.4.0

* Added `Marionettist.location.refreshRoute()` which reload the current route
* Updated some dependencies



## 1.3.1

* Fixing router params
* Added method to change locale and trigger event

## 1.3.0

* Added `Marionettist.channels`
* Added `Marionettist.location`

## 1.2.1

* Fixed bug in router

## 1.2.0

* Entended `Marionette` router.
* Added the posibility to define "before" and "after" filters inside a controller.
* The `onRoute` callback of the `Marionettist.AppRouter` now trigger same callback in the controller.

## 1.1.0

* Added `viewContext` property and  merge to template heplers.
* Updated documentation.

## 1.0.2

* Renamed package.

## 1.0.1

* Added dependencies check.
* Fixed `lookupPaths` in `Renderer` to use the option directly from config.

## 1.0.0

* Since the refactor was so big have to change to a MAJOR Version.
* Refactored base classes.
* Fixed error with backbone-associations dependency.
* Added extra libraries dependencies to the core.
* Updated documentation.
* Added more template helpers.

## 0.2.1

* Changed dependencies versions to match with `Marionette`.

## 0.2.0

* Attached core dependencies (`jQuery`, `Underscore`, `Underscore.string`, `Backbone`, `Marionette` and `i18next`) to `Marionettist` root.
* Updated dependencies on package.json and bower.json.
* Added minify to the Gulpfile.

## 0.1.0

* First release.
