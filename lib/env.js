var Env;

Env = (function() {
  Env.current = function() {
    return this._current || (this._current = new Env);
  };

  function Env() {
    this.stage = "development";
  }

  Env.prototype.isDevelopment = function() {
    return this.stage === "development";
  };

  Env.prototype.isProduction = function() {
    return this.stage === "production";
  };

  Env.prototype.getLocale = function() {
    return Marionettist.I18n.language;
  };

  Env.prototype.setLocale = function(locale, callback) {
    var oldLocale;
    if (locale == null) {
      locale = "en";
    }
    if (callback == null) {
      callback = null;
    }
    oldLocale = this.getLocale();
    return Marionettist.I18n.changeLanguage(locale, function(t) {
      Marionettist.channels.publish("marionettist", "change:locale", {
        currentLocale: locale,
        oldLocale: oldLocale
      });
      if (Marionettist._.isFunction(callback)) {
        return callback(t);
      }
    });
  };

  return Env;

})();

export default Env;
