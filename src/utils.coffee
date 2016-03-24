Marionettist.Utils = Marionettist._.extend new Marionettist.Object(),

  log: (msg, color) ->
    if Marionettist.Env.current().isDevelopment()
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

  waitFor: (ajaxRequests, options = {}) ->
    xhrs = []
    xhrs= _.chain([ajaxRequests]).flatten().value()
    Marionettist.$.when(xhrs...).then (->
      options.success() if Marionettist._.isFunction(options.success)
      ), (error)->
        options.error() if Marionettist._.isFunction(options.error)
