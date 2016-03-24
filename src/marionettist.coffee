do (root=this, factory=(root, exports, Backbone, Marionette, _, $, i18next, s, numeral, moment) ->

  # Dependencies Check

  console?.error "Unable to load jQuery" unless $?
  console?.error "Unable to load Underscore" unless _?
  console?.error "Unable to load Underscore.string" unless s?
  console?.error "Unable to load Backbone" unless Backbone?
  console?.error "Unable to load Backbone.Radio" unless Backbone.Radio?
  console?.error "Unable to load backbone-associations" unless Backbone.AssociatedModel?
  console?.error "Unable to load Marionette" unless Marionette?
  console?.error "Unable to load i18next" unless i18next?
  console?.error "Unable to load numeral" unless numeral?
  console?.error "Unable to load moment" unless moment?
  console?.error "Unable to load moment-range" unless moment.range?
  console?.error "Unable to load moment-timezone" unless moment.tz?

  Marionettist = Marionette.extend()

  Marionettist.Backbone = Backbone

  Marionettist.Marionette = Marionette

  Marionettist._ = _

  Marionettist.$ = $

  Marionettist.s = s

  Marionettist.I18n = i18next

  Marionettist.numeral = numeral

  Marionettist.moment = moment

  Marionettist.channels =

    request: (channelName = "global", eventName = "", data={})->
      return Marionettist.Backbone.Radio.channel(channelName).request(eventName,data)

    replyOnce: (channelName = "global", eventName = "", callback)->
      channel = Marionettist.Backbone.Radio.channel(channelName)
      if Marionettist._.isFunction(callback)
        return channel.replyOnce(eventName, callback)
      else
        return channel.replyOnce(callback)

    reply: (channelName = "global", eventName = "", callback)->
      channel = Marionettist.Backbone.Radio.channel(channelName)
      if Marionettist._.isFunction(callback)
        return channel.reply(eventName, callback)
      else
        return channel.reply(callback)

    publish: (channelName = "global", eventName = "", data ={})->
      return Marionettist.Backbone.Radio.channel(channelName).trigger eventName, data

    subscribe: (channelName = "global", eventName = "", callback)->
      return Marionettist.Backbone.Radio.channel(channelName).on eventName, callback


  Marionettist.location =

    refreshRoute: (fragment = @getCurrentRoute())->
      Backbone.history.loadUrl(fragment)

    navigateTo: (route, options = {}) ->
      Marionettist.Backbone.history.navigate route, options

    getCurrentRoute: ->
      frag = Marionettist.Backbone.history.fragment
      if Marionettist._.isEmpty(frag) then null else frag

    startHistory: (options= {})->
      if Marionettist.Backbone.history?
        Marionettist.Backbone.history.start(options)

  #=require "./environment.coffee"

  #=require "./config.coffee"

  #=require "./initializers.coffee"

  #=require "./utils.coffee"

  #=require "./route.coffee"

  #=require "./router.coffee"

  #=require "./region.coffee"

  #=require "./views.coffee"

  #=require "./entities.coffee"

  #=require "./controllers.coffee"

  Marionettist.Application = Marionettist.Application.extend

    Backbone: Marionettist.Backbone

    Marionette: Marionettist.Marionette

    _: Marionettist._

    $: Marionettist.$

    s: Marionettist.s

    I18n: Marionettist.I18n

    numeral: Marionettist.numeral

    moment: Marionettist.moment

    Controllers: new Marionettist.Object()

    Entities: new Marionettist.Object()

    Views: new Marionettist.Object()

    navigateTo: (route, options = {}) ->
      Marionettist.location.navigateTo route, options

    getCurrentRoute: ->
      Marionettist.location.getCurrentRoute()

    startHistory: (options= {})->
      Marionettist.location.startHistory(options)

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
    	Marionettist._.size @_registry


  return Marionettist

) ->

  root = typeof self == 'object' and self.self == self and self or typeof global == 'object' and global.global == global and global
  # Set up Backbone appropriately for the environment. Start with AMD.
  if typeof define == 'function' and define.amd
    define [
      'underscore'
      'jquery'
      'backbone'
      'backbone.radio'
      "backbone-associations"
      "backbone.marionette"
      "i18next"
      'exports'
      "underscore.string"
      "numeral"
      "moment"
      "moment-range"
      "moment-timezone"
    ], (_, $, Backbone, BackboneAssociations, Marionette, i18next, exports, s, numeral, moment, momentRange, momentTimezone) ->
      # Export global even in AMD case in case this script is loaded with
      # others that may still expect a global Backbone.
      Marionettist = factory(root, exports, Backbone, Marionette, _, $, i18next, s, numeral, moment)
      root.Marionettist = Marionettist
      return
    # Next for Node.js or CommonJS. jQuery may not be needed as a module.
  else if typeof exports != 'undefined'
    _ = require('underscore')
    $ = undefined
    Backbone = require("backbone")
    BackboneRadio = require("backbone.radio")
    Marionette = require("backbone.marionette")
    i18next = require("i18next")
    s = require("underscore.string")
    BackboneAssociations = require("backbone-associations")
    numeral = require("numeral")
    moment  = require("moment")
    momentTimezone  = require("moment-timezone")
    momentRange  = require("moment-range")
    try
      $ = require('jquery')
    catch e

    module.exports = root.Marionettist = factory(root, exports, Backbone, Marionette, _, $, i18next, s, numeral, moment)
    # Finally, as a browser global.
  else
    root.Marionettist = factory(root, {},root.Backbone, root.Marionette, root._, (root.jQuery or root.Zepto or root.ender or root.$), root.i18next, root.s, root.numeral, root.moment)
