TransitionOut = require("../behaviors/transition-out.coffee")
class LayoutView extends Marionettist.Views.BaseView
  template: "site/templates/layout"

  templateContext: ()->
    context = super()
    context.siteTitle = "Foo"
    return context

  regions:
    navRegion: ".site-nav-region"
    contentRegion: ".site-content-region"

  behaviors:
    TransitionOut:
      behaviorClass: TransitionOut

  onShow: ->


module.exports = LayoutView
