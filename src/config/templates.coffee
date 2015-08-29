class Templates extends Marionetist.Object

  lookupPaths: ["templates/"]

  engine: ->
    engine = {}
    if root.HAML?
      engine = HAML
    if root.JST?
      engine = JST
    return engine

Marionetist.Config.options.templates = new Templates()
