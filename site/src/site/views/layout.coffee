class LayoutView extends Marionettist.Views.Layout
  template: "site/templates/layout"

  regions:
    navRegion: ".site-nav-region"
    contentRegion: ".site-content-region"

  onBeforeShow: ->
    @$el.fadeIn "slow"

  onBeforeTransitionOut: ->
    Marionettist.logger.warn "onBeforeTransitionOut"

  onTransitionOut: (cb,region)->
    Marionettist.logger.warn "TransitionOut"
    @$el.fadeOut "slow", ->
      cb()

  onBeforeDestroy: ->
    Marionettist.logger.warn "onBeforeDestroy"

  onShow: ->


module.exports = LayoutView
