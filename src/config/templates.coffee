class Templates extends Marionettist.Object

  lookupPaths: ["templates/"]

  engine: ->
    engine = {}
    if root.HAML?
      engine = HAML
    if root.JST?
      engine = JST
    return engine

Marionettist.Config.options.templates = new Templates()
