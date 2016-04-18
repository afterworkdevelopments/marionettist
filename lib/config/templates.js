var Templates;

Templates = (function() {
  function Templates() {}

  Templates.prototype.lookupPaths = ["templates/"];

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

  return Templates;

})();

export default Templates;
