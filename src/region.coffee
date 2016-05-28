`import Marionettist from "./core.js"`
`import Marionette from "backbone.marionette"`

_show = Marionette.Region.prototype.show

class Region extends Marionette.Region

  show: (view, options)->
    options = options || {}
    oldView = @currentView
    showCurrentView = =>
      args = [view, Marionettist._.extend(options, { preventDestroy: true })]
      _show.apply(@,  args)
      if !options.preventDestroy
        oldView.destroy()
    if oldView? and Marionettist._.isFunction(oldView.onHide)
      oldView.triggerMethod("before:hide",showCurrentView, @)
      oldView.triggerMethod("hide",showCurrentView, @)
    else
      showCurrentView()

`export default Region`
