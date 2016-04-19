class LayoutView extends Marionettist.Views.Layout
  template: "site/layout"

  regions:
    navRegion: ".site-nav-region"
    contentRegion: ".site-content-region"


module.exports = LayoutView
