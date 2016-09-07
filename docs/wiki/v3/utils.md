## Utilities

## Environment

change environment.

```
Marionettist.env.setStage "production"
```

### Logger

Prints text in diferent colors depending on type.



```
# Prints black text
Marionettist.logger.log "Hola"

# Prints red text
Marionettist.logger.log "Hola", type: "error"

# There is also another convenient methods for common types, like: success, warn, error, info.

Marionettist.logger.info "Hola"

```

If the environment is development, does not print anything, you can force to print by passing in the options `force: true`

```
Marionettist.logger.log "Hola", force: true
```

## Utils#waitFor

This method takes 2 parameters, an array of async calls and a option object. Wait for all the async calls to end, if all where success, then execute `options.success` else `options.error`

```
customers = new Customers()
orders = new Orders()

Marionettist.utils.waitFor [customers.fetch(),orders.fetch()],
  success: =>
    # do something on all success
  error: =>
    # do something on error

```

## Utils#pathFor

Can use this method to print any backbone url. At the moment it does nothing besides appending a '#' to the path, but in the future will change the path depending on the environment and backbone history options

```
# In your views

%a{href: @pathFor("documentation")}

# In your controller

Marionettist.utils.pathFor("documentation")

```
