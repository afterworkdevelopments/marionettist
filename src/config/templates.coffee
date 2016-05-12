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

`export default Templates`
