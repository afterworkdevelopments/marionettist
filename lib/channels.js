import Marionettist from "./core.js";
var Channels,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Channels = (function(superClass) {
  extend(Channels, superClass);

  function Channels() {}

  Channels.prototype.request = function(channelName, eventName, data) {
    if (channelName == null) {
      channelName = "global";
    }
    if (eventName == null) {
      eventName = "";
    }
    if (data == null) {
      data = {};
    }
    return Marionettist.Backbone.Radio.channel(channelName).request(eventName, data);
  };

  Channels.prototype.replyOnce = function(channelName, eventName, callback) {
    var channel;
    if (channelName == null) {
      channelName = "global";
    }
    if (eventName == null) {
      eventName = "";
    }
    channel = Marionettist.Backbone.Radio.channel(channelName);
    if (Marionettist._.isFunction(callback)) {
      return channel.replyOnce(eventName, callback);
    } else {
      return channel.replyOnce(callback);
    }
  };

  Channels.prototype.reply = function(channelName, eventName, callback) {
    var channel;
    if (channelName == null) {
      channelName = "global";
    }
    if (eventName == null) {
      eventName = "";
    }
    channel = Marionettist.Backbone.Radio.channel(channelName);
    if (Marionettist._.isFunction(callback)) {
      return channel.reply(eventName, callback);
    } else {
      return channel.reply(callback);
    }
  };

  Channels.prototype.publish = function(channelName, eventName, data) {
    if (channelName == null) {
      channelName = "global";
    }
    if (eventName == null) {
      eventName = "";
    }
    if (data == null) {
      data = {};
    }
    return Marionettist.Backbone.Radio.channel(channelName).trigger(eventName, data);
  };

  Channels.prototype.subscribe = function(channelName, eventName, callback) {
    if (channelName == null) {
      channelName = "global";
    }
    if (eventName == null) {
      eventName = "";
    }
    return Marionettist.Backbone.Radio.channel(channelName).on(eventName, callback);
  };

  return Channels;

})(Marionettist.Object);

export default Channels;
