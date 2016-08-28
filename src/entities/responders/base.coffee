`import Marionettist from "../../core.js"`
`import ModelBase from "../../entities/models/base.js"`
`import BaseView from "../../views/base.js"`
class Base extends ModelBase

  constructor: (options = {})->
    super options
    # Registers our controller with the application so we can see the currently defined controller objects
    # Helps us detect memory leaks
    @_instance_id = Marionettist._.uniqueId("responder")
    @register @, @_instance_id



  loaderView: BaseView.extend
    template: (data)->
      return Marionettist.config.templates.render "marionettist/loader", data,
        defaultTemplate: '''
         <div class='mri-loader'>
           <div class='mri-loader__content'>
             <i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>
             <span class="sr-only">Loading...</span>
           </div>
         </div>
       '''


  getLoaderView: ->
    @set(loaderView: new @loaderView) if not @get("loaderView")?
    return @get("loaderView")


  close: (args...) ->
    super args
    @unregister @, @_instance_id

  # Renders the view in the selected region and binds to view's close event
  show: (view, options = {}) ->
    region =
      if options.region?
        options.region
      else
        @get("region")
    @listenTo view, "close", @close
    if options.async?
      if options.loaderView isnt false
        loaderView = @getLoaderView()
        @listenTo loaderView, "close", @close
        region.show loaderView
      @fetch().then (()=>
        if options.loaderView isnt false
          return view.close() if region.currentView isnt loaderView
        region.show view
      )
    else
      region.show view

  defaults:
    params: {}
    async: []

  waitFor: (args...)->
    Marionettist.utils.waitFor args...

  deferred: ()->
    return Marionettist.$.Deferred()

  fetch: (options = {})->
    deferred = @deferred()
    asyncFetches = Marionettist._.chain([@get("async")]).flatten().compact().value()
    @waitFor asyncFetches,
      success: ->
        options.success() if Marionettist._.isFunction(options.success)
        deferred.resolve()
      error: ->
        options.error() if Marionettist._.isFunction(options.error)
        deferred.reject()

    return deferred.promise()

  save: ()->
    @deferred().promise()

  destroy: ()->
    @deferred().promise()

  register: (instance, id) ->
    @_registry ?= {}
    @_registry[id] = instance

  unregister: (instance, id) ->
    delete @_registry[id]

  resetRegistry: ->
    oldCount = @getRegistrySize()
    for key, responder of @_registry
      responder.region.close()
    msg = "There were #{oldCount} responders in the registry, there are now #{@getRegistrySize()}"
    if @getRegistrySize() > 0 then console.warn(msg, @_registry) else console.log(msg)

  getRegistrySize: ->
    Marionettist._.size @_registry


`export default Base`
