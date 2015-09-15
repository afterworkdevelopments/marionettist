do (root=this, factory=(root, exports, Backbone, Marionette, _, $, i18n, s, numeral, moment) ->

  # Dependencies Check

  console?.error "Unable to load jQuery" unless $?
  console?.error "Unable to load Underscore" unless _?
  console?.error "Unable to load Underscore.string" unless s?
  console?.error "Unable to load Backbone" unless Backbone?
  console?.error "Unable to load backbone-associations" unless Backbone.AssociatedModel?
  console?.error "Unable to load Marionette" unless Marionette?
  console?.error "Unable to load i18next" unless i18n?
  console?.error "Unable to load numeral" unless numeral?
  console?.error "Unable to load moment" unless moment?
  console?.error "Unable to load moment-range" unless moment.range?

  Marionetist = Marionette.extend()

  Marionetist.Backbone = Backbone

  Marionetist.Marionette = Marionette

  Marionetist._ = _

  Marionetist.$ = $

  Marionetist.s = s

  Marionetist.I18n = i18n

  Marionetist.numeral = numeral

  Marionetist.moment = moment

  #=require "./config.coffee"

  #=require "./initializers.coffee"

  #=require "./views.coffee"

  #=require "./entities.coffee"

  #=require "./controllers.coffee"

  Marionetist.Application = Marionetist.Application.extend

    Backbone: Marionetist.Backbone

    Marionette: Marionetist.Marionette

    _: Marionetist._

    $: Marionetist.$

    s: Marionetist.s

    I18n: Marionetist.I18n

    numeral: Marionetist.numeral

    moment: Marionetist.moment

    Controllers: new Marionetist.Object()

    Entities: new Marionetist.Object()

    Views: new Marionetist.Object()

    navigate: (route, options = {}) ->
      Marionetist.Backbone.history.navigate route, options

    getCurrentRoute: ->
      frag = Marionetist.Backbone.history.fragment
      if _.isEmpty(frag) then null else frag

    startHistory: (options= {})->
      if Marionetist.Backbone.history?
        Marionetist.Backbone.history.start(options)

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
      "backbone-associations"
      "backbone.marionette"
      "i18next-client"
      'exports'
      "underscore.string"
      "numeral"
      "moment"
      "moment-range"
    ], (_, $, Backbone, BackboneAssociations, Marionette, i18n, exports, s, numeral, moment, momentRange) ->
      # Export global even in AMD case in case this script is loaded with
      # others that may still expect a global Backbone.
      Marionetist = factory(root, exports, Backbone, Marionette, _, $, i18n, s, numeral, moment)
      root.Marionetist = Marionetist
      return
    # Next for Node.js or CommonJS. jQuery may not be needed as a module.
  else if typeof exports != 'undefined'
    _ = require('underscore')
    $ = undefined
    Backbone = require("backbone")
    Marionette = require("backbone.marionette")
    i18n = require("i18next-client")
    s = require("underscore.string")
    BackboneAssociations = require("backbone-associations")
    numeral = require("numeral")
    moment  = require("moment")
    momentRange  = require("moment-range")
    try
      $ = require('jquery')
    catch e

    module.exports = root.Marionetist = factory(root, exports, Backbone, Marionette, _, $, i18n, s, numeral, moment)
    # Finally, as a browser global.
  else
    root.Marionetist = factory(root, {},root.Backbone, root.Marionette, root._, (root.jQuery or root.Zepto or root.ender or root.$), root.i18n, root.s, root.numeral, root.moment)
