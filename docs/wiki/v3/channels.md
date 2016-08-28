## Channels

Publish and subscribe events using channels.

Using the default `Marionette` application channel it's not a very good idea because you are tied to an **instance** of that application, and there will be cases where you just want to publish an event.

For example, instead of this:

```
MyApp = new Marionette.Application()

# Alert the user on the 'minutePassed' event

MyApp.vent.on "minutePassed", (someData)->
  alert("Received", someData)

# This will emit an event with the value of window.someData every minute

window.setInterval (->
  MyApp.vent.trigger "minutePassed", window.someData
), 1000 * 60

```
You can do this:

```
# Alert the user on the 'minutePassed' event

# The parameters to subscribe are: channelName, eventName, callback

Marionettist.channels.subscribe "global",  "minutePassed", (someData)->

  alert("Received", someData)


# This will emit an event with the value of window.someData every minute

window.setInterval (->

  # The parameters to publish are: channelName, eventName, data

  Marionettist.channels.publish "global", "minutePassed", window.someData

), 1000 * 60
```
**Note:** At the moment to publish and subscribe an event, `Marionettist` make use of `Backbone.Wreqr.radio` but when the next major release of  `Marionette` is up, probably it will be replaced with `Backbone.Radio`
