`import Marionettist from "./core.js"`
`import Marionette from "backbone.marionette"`

_show = Marionette.Region.prototype.show

class Region extends Marionette.Region

  show: (view, options)->
    options = options || {}
    preventDestroy = options.preventDestroy is true
    transitionOut = options.transitionOut
    delete options.transitionOut
    if transitionOut == false
      args = [view, options]
      _show.apply(@,  args)
    else
      oldView = @currentView
      showCurrentView = =>
        args = [view, Marionettist._.extend(options, { preventDestroy: true })]
        _show.apply(@,  args)
        oldView.destroy() if !preventDestroy and oldView?

      if oldView? and Marionettist._.isFunction(oldView.onTransitionOut)
        oldView.triggerMethod("before:transition:out",showCurrentView, @)
        oldView.triggerMethod("transition:out",showCurrentView, @)
      else
        showCurrentView()

`export default Region`
