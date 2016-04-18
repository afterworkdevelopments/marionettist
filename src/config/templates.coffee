class Templates

  lookupPaths: ["templates/"]

  engine: ->
    engine = {}
    if HAML?
      engine = HAML
    if JST?
      engine = JST
    return engine

`export default Templates`
