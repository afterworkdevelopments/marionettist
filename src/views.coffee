Marionettist.Views = new Marionettist.Object()

Marionettist.Views.templateHelpers =

  t: Marionettist.I18n.t

  formatCurrency: (amount, format = "$0,0.00")->
    Marionettist.numeral(amount).format(format)

  formatNumber: (amount, format = "0,0.00")->
    Marionettist.numeral(amount).format(format)

  formatPercentage: (amount, format = "0.00%")->
    Marionettist.numeral(amount).format(format)

  formatDate: (date, format = "DD-MM-YYYY")->
    Marionettist.moment(date).format(format)

_.extend Marionettist.View::,

  templateHelpers: ->
    return Marionettist.Views.templateHelpers


#=require "./views/collection.coffee"

#=require "./views/composite.coffee"

#=require "./views/layout.coffee"

#=require "./views/item.coffee"
