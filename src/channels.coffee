class Channels

  constructor: ()->
    
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

`export default Channels`
