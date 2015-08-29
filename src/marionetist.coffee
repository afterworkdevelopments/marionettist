do (root=this, factory=(root, exports, Backbone, Marionette, _, $, i18n) ->

  Marionetist = Marionette.extend()

  Marionetist.I18n = i18n

  #=require "./config.coffee"

  #=require "./initializers.coffee"

  #=require "./views.coffee"

  #=require "./entities.coffee"

  #=require "./controllers.coffee"

  Marionetist.Application = Marionetist.Application.extend

    I18n: Marionetist.I18n

    Controllers: Marionetist.Controllers

    Entities: Marionetist.Entities

    Views: Marionetist.Views

    navigate: (route, options = {}) ->
      Backbone.history.navigate route, options

    getCurrentRoute: ->
      frag = Backbone.history.fragment
      if _.isEmpty(frag) then null else frag

    startHistory: (options= {})->
      if Backbone.history
        Backbone.history.start(options)

    register: (instance, id) ->
      @_registry ?= {}
      @_registry[id] = instance

    unregister: (instance, id) ->
      delete @_registry[id]

    resetRegistry: ->
      oldCount = @getRegistrySize()
      for key, controller of @_registry
      	controller.region.close()
      msg = "There were #{oldCount} controllers in the registry, there are now #{@getRegistrySize()}"
      if @getRegistrySize() > 0 then console.warn(msg, @_registry) else console.log(msg)

    getRegistrySize: ->
    	_.size @_registry


  return Marionetist

) ->

  root = typeof self == 'object' and self.self == self and self or typeof global == 'object' and global.global == global and global
  # Set up Backbone appropriately for the environment. Start with AMD.
  if typeof define == 'function' and define.amd
    define [
      'underscore'
      'jquery'
      'backbone'
      "backbone.marionette"
      "i18next-client"
      'exports'
    ], (_, $, Backbone, Marionette, i18n, exports) ->
      # Export global even in AMD case in case this script is loaded with
      # others that may still expect a global Backbone.
      Marionetist = factory(root, exports, Backbone, Marionette, _, $, i18n)
      root.Marionetist = Marionetist
      return
    # Next for Node.js or CommonJS. jQuery may not be needed as a module.
  else if typeof exports != 'undefined'
    _ = require('underscore')
    $ = undefined
    Backbone = require("backbone")
    Marionette = require("backbone.marionette")
    i18n = require("i18next-client")
    try
      $ = require('jquery')
    catch e

    module.exports = root.Marionetist = factory(root, exports, Backbone, Marionette, _, $, i18n)
    # Finally, as a browser global.
  else
    root.Marionetist = factory(root, {},root.Backbone, root.Marionette, root._, (root.jQuery or root.Zepto or root.ender or root.$), root.i18n)
