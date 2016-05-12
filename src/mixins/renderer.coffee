Renderer =

  render: (template, data) ->
    if Marionettist._.isFunction(template)
      return template(data)
    else
      return if template is false
      engineTemplate = @getTemplate(template)
      throw "Template #{template} was not found!" unless Marionettist._.isFunction(engineTemplate)
      engineTemplate(data)

  getTemplate: (template) ->
    lookups = Marionettist.config.templates.lookupPaths
    lookups = lookups() if Marionettist._.isFunction(lookups)
    throw "lookupPaths most be an array" unless Marionettist._.isArray(lookups)
    templates = [template]
    lookups = [""] if lookups.length == 0
    for lookup in lookups
      ## inserts the template at the '-1' position of the template array
      ## this allows to omit the word 'templates' from the view but still
      ## store the templates in a directory outside of the view
      ## example: "users/list/layout" will become "users/list/templates/layout"

      for path in templates
        lookupPath = @findLookupPath(lookup+path, template)
        return lookupPath if lookupPath?

  findLookupPath: (path,template)->
    engine = Marionettist.config.templates.engine
    engine = engine() if Marionettist._.isFunction(engine)
    lookupPath = engine[path]
    if Marionettist.config.templates.debug is true
      Marionettist.logger.info "Looking template: #{template} in '#{path}'"
    return lookupPath if lookupPath

  withTemplate: (string) ->
    if string?
      array = string.split("/")
      array.splice(-1, 0, "templates")
      array.join("/")

`export default Renderer`
