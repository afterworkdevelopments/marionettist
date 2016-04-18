var Templates;

Templates = (function() {
  function Templates() {}

  Templates.prototype.lookupPaths = ["templates/"];

  Templates.prototype.engine = function() {
    var engine;
    engine = {};
    if (root.HAML != null) {
      engine = HAML;
    }
    if (root.JST != null) {
      engine = JST;
    }
    return engine;
  };

  return Templates;

})();

export default Templates;
