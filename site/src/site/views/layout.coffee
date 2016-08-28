TransitionOut = require("../behaviors/transition-out.coffee")
class LayoutView extends Marionettist.Views.BaseView
  template: "site/templates/layout"

  regions:
    navRegion: ".site-nav-region"
    contentRegion: ".site-content-region"

  behaviors:
    TransitionOut:
      behaviorClass: TransitionOut

  onShow: ->


module.exports = LayoutView
