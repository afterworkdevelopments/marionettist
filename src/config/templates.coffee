import Marionettist from "../core.coffee"
class Templates

  debug: false

  lookupPaths: []

  engine: ->
    engine = {}
    if HAML?
      engine = HAML
    if JST?
      engine = JST
    return engine

  render: (templateName = "", data = {} , options = {})->
    template = ""
    engine = @engine
    engine = engine() if Marionettist._.isFunction(templateName)
    if options.defaultTemplate?
      template = options.defaultTemplate
    if engine? and Marionettist._.isFunction(engine[templateName])
      template = engine[templateName](data)
    return template

export default Templates
