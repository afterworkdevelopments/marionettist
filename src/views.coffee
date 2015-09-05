Marionetist.Views = new Marionetist.Object()

Marionetist.Views.templateHelpers =

  t: Marionetist.I18n.t

  formatCurrency: (amount, format = "$0,0.00")->
    Marionetist.numeral(amount).format(format)

  formatNumber: (amount, format = "0,0.00")->
    Marionetist.numeral(amount).format(format)

  formatPercentage: (amount, format = "0.00%")->
    Marionetist.numeral(amount).format(format)

  formatDate: (date, format = "DD-MM-YYYY")->
    Marionetist.moment(date).format(format)

_.extend Marionetist.View::,

  templateHelpers: ->
    return Marionetist.Views.templateHelpers


#=require "./views/collection.coffee"

#=require "./views/composite.coffee"

#=require "./views/layout.coffee"

#=require "./views/item.coffee"
