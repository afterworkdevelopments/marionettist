`import Marionettist from "./core.js"`
`import Marionette from "backbone.marionette"`

_show = Marionette.Region.prototype.show

class Region extends Marionette.Region

  show: (view, options)->
    options = options || {}
    preventDestroy = options.preventDestroy is true
    transitionOut = options.transitionOut
    delete options.transitionOut
    args = [view, options]
    if transitionOut == false
      _show.apply(@,  args)
    else
      oldView = @currentView
      showCurrentView = =>
        _show.apply(@,  args)
      if oldView? and Marionettist._.isFunction(oldView.transitionOut)
        oldView.triggerMethod("before:transition:out")
        value = oldView.transitionOut()
        if value?.then?
          value.then ()=>
            showCurrentView()
        else
          throw "transitionOut method most return a promise"
      else
        showCurrentView()

`export default Region`
