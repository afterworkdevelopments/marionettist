TransitionOut = Marionettist.Behavior.extend

  initialize: (options, view)->
    @view.transitionOut = @transitionOut

  onBeforeShow: ->
    Marionettist.logger.warn "onBeforeShow"
    @$el.fadeIn "slow"

  onBeforeTransitionOut: ->
    Marionettist.logger.warn "onBeforeTransitionOut"
    return true

  transitionOut: ()->
    deferred = Marionettist.$.Deferred()
    @$el.fadeIn "slow", =>
      Marionettist.logger.warn "TransitionOut"
      deferred.resolve()
    return deferred.promise()

  onBeforeDestroy: ->
    Marionettist.logger.warn "onBeforeDestroy"

module.exports = TransitionOut
