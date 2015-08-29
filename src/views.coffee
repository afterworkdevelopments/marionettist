Marionetist.Views = new Marionetist.Object()

Marionetist.Views.templateHelpers =
  t: Marionetist.I18n.t

_.extend Marionette.View::,

  templateHelpers: ->
    return Marionetist.Views.templateHelpers


#=require "./views/collection_view.coffee"

#=require "./views/composite_view.coffee"

#=require "./views/layout_view.coffee"

#=require "./views/item_view.coffee"
