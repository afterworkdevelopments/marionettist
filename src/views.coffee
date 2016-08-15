`import Marionettist from "./core.js"`
class Views extends Marionettist.Object

  templateHelpers:

    pathFor: (args...)->
      Marionettist.utils.pathFor(args...)

    _: Marionettist._

    s: Marionettist.s

    t: (args...)->
      Marionettist.I18n.t(args...)

    formatCurrency: (amount, format = "$0,0.00")->
      Marionettist.numeral(amount).format(format)

    formatNumber: (amount, format = "0,0.00")->
      Marionettist.numeral(amount).format(format)

    formatPercentage: (amount, format = "0.00%")->
      Marionettist.numeral(amount).format(format)

    formatDate: (date, format = "DD-MM-YYYY")->
      Marionettist.moment(date).format(format)


`export default Views`
