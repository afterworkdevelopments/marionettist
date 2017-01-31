TransitionOut = require("../behaviors/transition-out.coffee")
class LoadingView extends Marionettist.Views.Base
  template: "site/templates/loading"

  behaviors:
    TransitionOut:
      behaviorClass: TransitionOut

  regions:
    navRegion: ".site-nav-region"
    contentRegion: ".site-content-region"

  onShow: ->



module.exports = LoadingView
