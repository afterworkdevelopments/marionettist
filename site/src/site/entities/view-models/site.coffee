class SiteViewModel extends Marionettist.Entities.ViewModels.Base

  models: {}

  collections: {}

  views:
    layout: require("../../views/layout.coffee")
    navbar: require("../../views/navbar.coffee")
    loading: require("../../views/loading.coffee")

module.exports = SiteViewModel
