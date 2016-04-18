import Templates from "./config/templates.js";
var Config;

Config = (function() {
  function Config() {
    this.templates = new Templates();
  }

  return Config;

})();

export default Config;
