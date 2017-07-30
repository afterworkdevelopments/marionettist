import Templates from "./config/templates.coffee"
import Marionettist from "./core.coffee"
class Config extends Marionettist.Object

  constructor: ()->
    @templates = new Templates()


export default Config
