`import Marionettist from "./core.js"`
class Logger extends Marionettist.Object

  constructor: ()->

  success: (msg, force= false)->
    @log(msg, "success", force)

  warn: (msg, force= false)->
    @log(msg, "warn", force)

  error: (msg, force= false)->
    @log(msg, "error", force)

  info: (msg, force= false)->
    @log(msg, "info", force)

  log: (msg, color, force= false) ->
    if Marionettist.env.current().isDevelopment() or force is true
      color = color or 'black'
      bgc = 'White'
      switch color
        when 'success'
          color = 'Green'
          bgc = 'LimeGreen'
        when 'info'
          color = 'DodgerBlue'
          bgc = 'Turquoise'
        when 'error'
          color = 'Red'
          bgc = 'Black'
        when 'start'
          color = 'OliveDrab'
          bgc = 'PaleGreen'
        when 'warning'
          color = 'Tomato'
          bgc = 'Black'
        when 'end'
          color = 'Orchid'
          bgc = 'MediumVioletRed'
        else
          color = color
      bgc = 'White'
      if typeof msg == 'object'
        console.log msg
      else
        console.log '%c' + msg, 'color:' + color + ';font-weight:bold; background-color: ' + bgc + ';'
    return


`export default Logger`
