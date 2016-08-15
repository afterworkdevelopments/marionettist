# Marionettist.Appication

Adds more options to standard `Marionette.Application` like:

  * The posibility of start child applications (mostly based on [marionette.toolkit](https://github.com/RoundingWellOS/marionette.toolkit) )


## Lifecycle Settings

### App's `startAfterInitialized`

Call `start` immediately after `initialize` if `true`.  Default value is `false`.
Can be added as an option when instantiated or defined on the `App` definition.
It can also be defined as a function returning a boolean value.

```js
var MyApp = Marionettist.Appication.extend({
  initialize: function(){
    this.isRunning() === false;
  },
  startAfterInitialized: true
});

var myApp = new MyApp();

myApp.isRunning() === true;

```

### App's `startWithParent`

If set `true` this `App` will start when its parent `App` starts.
Default value is `false`.
Can be added as an option when instantiated or defined on the `App` definition.
It can also be defined as a function returning a boolean value.

```js
var myApp = new Marionettist.Appication();

var myChildApp = myApp.addChildApp('myChildApp', {
  AppClass: Marionettist.Appication,
  startWithParent: false
});

var myStartWithParentApp = myApp.addChildApp('myStartWithParentApp', {
  AppClass: Marionettist.Appication,
  startWithParent: true
});

myApp.start();

// logs false
console.log(myChildApp.isRunning());

// logs true
console.log(myStartWithParentApp.isRunning());
```



## Lifecycle API

### App `start`

This method sets the `App` to its running state.
Events added after `start` are registered for removal `onStop`.
This triggers ["before:start" / "start" events](#beforestart--start-events).

```js
var myApp = new Marionettist.Appication();

myApp.on('start', function(options){
  console.log('My App Started!');
  options.foo === true;
});

// false
myApp.isRunning();


// "My App Started!" logged
myApp.start({
  foo: true
});

// true
myApp.isRunning();

// Nothing is logged
myApp.start();
```


## Lifecycle Events

### `before:start` / `start` events

The "before:start" event and corresponding `onBeforeStart`
method are triggered just before the `App` `isRunning` is set `true`.

The "start" event and corresponding `onStart`
method are triggered after the `App` `isRunning` is set `true`.

```js
var MyApp = Marionettist.Appication.extend({
  // ...

  onBeforeStart: function(options){
    // ...
  },

  onStart: function(options){
    // ...
  }
});

var myApp = new MyApp({...});

myApp.on('before:start', function(options){
  // ...
});

myApp.on('start', function(options){
  // ...
});
```


### `before:resources:fetch` / `resources:fetch:success` / `resources:fetch:error` events

The "before:resources:fetch" event and corresponding `onBeforeResourcesFetch`
method are triggered just before the `App` start's to fetch aync calls added to the resources property.

The "resources:fetch:success" event and corresponding `onResourcesFetchSuccess`
method are triggered just when the `App` has successfuly fetched all aync calls added to the resources property.

The "resources:fetch:error" event and corresponding `onResourcesFetchError`
method are triggered just when the `App` has failed to fetched one aync calls added to the resources property.

```js

var fakeFetch;

fakeFetch = function(delay) {
  var deferred;
  if (delay == null) {
    delay = 3000;
  }
  deferred = Marionettist.$.Deferred();
  setTimeout(((function(_this) {
    return function() {
      return deferred.resolve();
    };
  })(this)), delay);
  return deferred.promise();
};

var MyApp = Marionettist.Appication.extend({
  // ...

  onBeforeStart: function(options){
    // ...
  },

  onStart: function(options){
    // ...
  }
});

var myApp = new MyApp({...});

// waits for all the aync calls added on the resources to finish before application start's
myApp.resources.push(fakeFetch(5000));

myApp.on('before:resources:fetch', function(options){
  // ...
});

myApp.on('resources:fetch:success', function(){
  // ...
});

myApp.on('resources:fetch:error', function(){
  // ...
});

myApp.start()

```
