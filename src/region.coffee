_show = Marionette.Region.prototype.show

class Marionettist.Region extends Marionette.Region

  show: (view, options)->
    options = options || {}
    oldView = @currentView
    showCurrentView = =>
      args = [view, Marionettist._.extend(options, { preventDestroy: true })]
      _show.apply(@,  args)
      if !options.preventDestroy
        oldView.destroy()
    if oldView? and Marionettist._.isFunction(oldView.onHide)
      oldView.onHide(showCurrentView, @)
    else
      showCurrentView()
