TransitionOut = Marionettist.Behavior.extend

  initialize: (options, view)->
    @view.transitionOut = @transitionOut

  onBeforeShow: ->
    @$el.fadeIn "slow"

  onBeforeTransitionOut: ->
    return true

  transitionOut: ()->
    deferred = Marionettist.$.Deferred()
    @$el.fadeIn "slow", =>
      deferred.resolve()
    return deferred.promise()

  onBeforeDestroy: ->

module.exports = TransitionOut
