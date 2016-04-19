`import Templates from "./config/templates.js"`
`import Marionettist from "./core.js"`
class Config extends Marionettist.Object

  constructor: ()->
    @templates = new Templates()


`export default Config`
