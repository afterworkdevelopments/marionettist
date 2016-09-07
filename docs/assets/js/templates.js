(function() {
  if (window.HAML == null) {
    window.HAML = {};
  }

  window.HAML['site/templates/layout'] = function(context) {
    return (function() {
      var $c, $e, $o;
      $e = function(text, escape) {
        return ("" + text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/\//g, '&#47;').replace(/"/g, '&quot;');
      };
      $c = function(text) {
        switch (text) {
          case null:
          case void 0:
            return '';
          case true:
          case false:
            return '' + text;
          default:
            return text;
        }
      };
      $o = [];
      $o.push("<div class='uk-container uk-container-center uk-margin-large-bottom uk-margin-top'>\n  <section class='site-nav-region'></section>\n  <section class='site-content-region'>\n    <div class='uk-grid' data-uk-grid-margin=''>\n      <div class='uk-row-first uk-width-medium-1-1'>\n        <div class='uk-text-center uk-vertical-align'>\n          <div class='uk-vertical-align-middle uk-width-1-2'>\n            <h1 class='uk-heading-large'>");
      $o.push("              " + $e($c(this.t("app.site_title"))));
      $o.push("            </h1>\n            <p class='uk-text-large'>");
      $o.push("              " + $e($c(this.t("app.site_description"))));
      $o.push("            </p>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class='app-repo-link uk-float-right'>\n      <a class='uk-icon-button uk-icon-github uk-icon-justify' href='https://github.com/afterworkdevelopments/marionettist' target='_blank'></a>\n    </div>\n    <div class='uk-clearfix'></div>\n    <div class='uk-grid-divider'></div>\n    <div class='uk-grid' data-uk-grid-margin=''>\n      <div class='uk-row-first uk-width-medium-1-3'>\n        <div class='uk-grid'>\n          <div class='uk-width-1-6'>\n            <i class='uk-icon-flag uk-icon-large uk-text-primary'></i>\n          </div>\n          <div class='uk-width-5-6'>\n            <h2 class='uk-h3'>\n              I18n\n            </h2>\n            <p>");
      $o.push("              " + $e($c("Added localization support through ")));
      $o.push("              <a href='http://i18next.com' target='_blank'>");
      $o.push("                " + $e($c("i18next")));
      $o.push("              </a>\n            </p>\n          </div>\n        </div>\n      </div>\n      <div class='uk-width-medium-1-3'>\n        <div class='uk-grid'>\n          <div class='uk-width-1-6'>\n            <i class='uk-icon-code uk-icon-large uk-text-primary'></i>\n          </div>\n          <div class='uk-width-5-6'>\n            <h2 class='uk-h3'>");
      $o.push("              " + $e($c("Views")));
      $o.push("            </h2>\n            <p>");
      $o.push("              " + $c("Custom template engine (<a href='https://github.com/netzpirat/haml-coffee'>haml-coffee</a> by default) "));
      $o.push("            </p>\n            <p>");
      $o.push("              " + $e($c("Template helpers to format dates, numbers, strings, etc.")));
      $o.push("            </p>\n          </div>\n        </div>\n      </div>\n      <div class='uk-width-medium-1-3'>\n        <div class='uk-grid'>\n          <div class='uk-width-1-6'>\n            <i class='uk-icon-large uk-icon-refresh uk-text-primary'></i>\n          </div>\n          <div class='uk-width-5-6'>\n            <h2 class='uk-h3'>");
      $o.push("              " + $e($c("Router")));
      $o.push("            </h2>\n            <p>");
      $o.push("              " + $e($c("Action filters for controllers")));
      $o.push("            </p>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class='uk-grid-divider'></div>\n  </section>\n</div>");
      return $o.join("\n").replace(/\s([\w-]+)='true'/mg, ' $1').replace(/\s([\w-]+)='false'/mg, '').replace(/\s(?:id|class)=(['"])(\1)/mg, "");
    }).call(context);
  };

}).call(this);

(function() {
  if (window.HAML == null) {
    window.HAML = {};
  }

  window.HAML['site/templates/loading'] = function(context) {
    return (function() {
      var $o;
      $o = [];
      $o.push("<div class='uk-container uk-container-center uk-margin-large-bottom uk-margin-top'>\n  <div class='uk-height-1-1'>\n    <div class='uk-height-viewport uk-text-center uk-vertical-align'>\n      <div class='uk-vertical-align-middle'>\n        <div class='uk-container-center'>\n          <i class='uk-icon-large uk-icon-spin uk-icon-spinner'></i>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>");
      return $o.join("\n").replace(/\s(?:id|class)=(['"])(\1)/mg, "");
    }).call(context);
  };

}).call(this);

(function() {
  if (window.HAML == null) {
    window.HAML = {};
  }

  window.HAML['site/templates/navbar'] = function(context) {
    return (function() {
      var $c, $e, $o;
      $e = function(text, escape) {
        return ("" + text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/\//g, '&#47;').replace(/"/g, '&quot;');
      };
      $c = function(text) {
        switch (text) {
          case null:
          case void 0:
            return '';
          case true:
          case false:
            return '' + text;
          default:
            return text;
        }
      };
      $o = [];
      $o.push("<a class='uk-hidden-small uk-navbar-brand' href=''>");
      $o.push("  " + $e($c(this.t("app.brand"))));
      $o.push("</a>");
      return $o.join("\n").replace(/\s([\w-]+)='true'/mg, ' $1').replace(/\s([\w-]+)='false'/mg, '').replace(/\s(?:id|class)=(['"])(\1)/mg, "");
    }).call(context);
  };

}).call(this);
