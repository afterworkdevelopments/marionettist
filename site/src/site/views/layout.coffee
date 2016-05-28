class LayoutView extends Marionettist.Views.Layout
  template: "site/templates/layout"

  regions:
    navRegion: ".site-nav-region"
    contentRegion: ".site-content-region"

  onBeforeShow: ->
    @$el.fadeIn "slow"

  onBeforeHide: ->
    Marionettist.logger.warn "onBeforeHide"

  onHide: (cb,region)->
    Marionettist.logger.warn "onHide"
    @$el.fadeOut "slow", ->
      cb()

  onBeforeDestroy: ->
    Marionettist.logger.warn "onBeforeDestroy"

  onShow: ->
    

module.exports = LayoutView
