import Marionettist from "../core.js";
var Templates;

Templates = (function() {
  function Templates() {}

  Templates.prototype.debug = false;

  Templates.prototype.lookupPaths = [];

  Templates.prototype.engine = function() {
    var engine;
    engine = {};
    if (typeof HAML !== "undefined" && HAML !== null) {
      engine = HAML;
    }
    if (typeof JST !== "undefined" && JST !== null) {
      engine = JST;
    }
    return engine;
  };

  Templates.prototype.render = function(templateName, data, options) {
    var engine, template;
    if (templateName == null) {
      templateName = "";
    }
    if (data == null) {
      data = {};
    }
    if (options == null) {
      options = {};
    }
    template = "";
    engine = this.engine;
    if (Marionettist._.isFunction(templateName)) {
      engine = engine();
    }
    if (options.defaultTemplate != null) {
      template = options.defaultTemplate;
    }
    if ((engine != null) && Marionettist._.isFunction(engine[templateName])) {
      template = engine[templateName](data);
    }
    return template;
  };

  return Templates;

})();

export default Templates;
