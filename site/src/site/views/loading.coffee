TransitionOut = require("../behaviors/transition-out.coffee")
class LoadingView extends Marionettist.Views.Layout
  template: "site/templates/loading"

  behaviors:
    TransitionOut:
      behaviorClass: TransitionOut

  regions:
    navRegion: ".site-nav-region"
    contentRegion: ".site-content-region"

  onShow: ->
    console.log @


module.exports = LoadingView
