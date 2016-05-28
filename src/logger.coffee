`import Marionettist from "./core.js"`
class Logger extends Marionettist.Object

  constructor: ()->

  success: (msg, options = {})->
    options.type = "success"
    @log(msg,options)

  warn: (msg, options = {})->
    options.type = "warn"
    @log(msg,options)

  error: (msg, options = {})->
    options.type = "error"
    @log(msg,options)

  info: (msg, options = {})->
    options.type = "info"
    @log(msg,options)

  log: (msg, options = {}) ->
    force = options.force
    type = options.type
    if Marionettist.env.isDevelopment() or force is true
      type = type or 'black'
      bgc = 'White'
      switch type
        when 'success'
          type = 'Green'
          bgc = 'LimeGreen'
        when 'info'
          type = 'DodgerBlue'
          bgc = 'Turquoise'
        when 'error'
          type = 'Red'
          bgc = 'Black'
        when 'start'
          type = 'OliveDrab'
          bgc = 'PaleGreen'
        when 'warning'
          type = 'Tomato'
          bgc = 'Black'
        when 'end'
          type = 'Orchid'
          bgc = 'MediumVioletRed'
        else
          type = type
      bgc = 'White'
      if typeof msg == 'object'
        console.log msg
      else
        console.log '%c' + msg, 'type:' + type + ';font-weight:bold; background-type: ' + bgc + ';'
    return


`export default Logger`
