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
      $o.push("<div class='uk-container uk-container-center uk-margin-large-bottom uk-margin-top'>\n  <section class='site-nav-region'></section>\n  <section class='site-content-region'></section>\n  <div class='uk-grid'>\n    <div class='uk-row-first uk-width-medium-1-1'>\n      <div class='uk-text-center uk-vertical-align'>\n        <div class='uk-vertical-align-middle uk-width-1-2'>\n          <h1 class='uk-heading-large'>");
      $o.push("            " + $e($c(this.siteTitle)));
      $o.push("          </h1>\n          <p class='uk-text-large'>\n            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo.\n          </p>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class='uk-grid' data-uk-grid-margin=''>\n    <div class='uk-row-first uk-width-medium-1-3'>\n      <div class='uk-grid'>\n        <div class='uk-width-1-6'>\n          <i class='uk-icon-cog uk-icon-large uk-text-primary'></i>\n        </div>\n        <div class='uk-width-5-6'>\n          <h2 class='uk-h3'>Sample Heading</h2>\n          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>\n        </div>\n      </div>\n    </div>\n    <div class='uk-width-medium-1-3'>\n      <div class='uk-grid'>\n        <div class='uk-width-1-6'>\n          <i class='uk-icon-large uk-icon-thumbs-o-up uk-text-primary'></i>\n        </div>\n        <div class='uk-width-5-6'>\n          <h2 class='uk-h3'>Sample Heading</h2>\n          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>\n        </div>\n      </div>\n    </div>\n    <div class='uk-width-medium-1-3'></div>\n  </div>\n  <div class='uk-grid' data-uk-grid-margin=''>\n    <div class='uk-row-first uk-width-medium-1-2'>\n      <img alt='' height='400' src='http://placehold.it/660x400' width='660'>\n    </div>\n    <div class='uk-width-medium-1-2'>\n      <h1>Heading</h1>\n      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\n      <h2>Subheading</h2>\n      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\n      <a class='uk-button uk-button-primary' href='#'>\n        Button\n      </a>\n    </div>\n  </div>\n  <div class='uk-grid'>\n    <div class='uk-width-1-6'>\n      <i class='uk-icon-cloud-download uk-icon-large uk-text-primary'></i>\n    </div>\n    <div class='uk-width-5-6'>\n      <h2 class='uk-h3'>Sample Heading</h2>\n      <p>\n        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n      </p>\n    </div>\n  </div>\n  <div class='uk-grid' data-uk-grid-margin=''>\n    <div class='uk-row-first uk-width-medium-1-1'>\n      <div class='uk-panel uk-panel-box uk-text-center'>\n        <p>\n          <strong>Phasellus viverra nulla ut metus.</strong>\n          Quisque rutrum etiam ultricies nisi vel augue.\n          <a class='uk-button uk-button-primary uk-margin-left' href='#'>Button</a>\n        </p>\n      </div>\n    </div>\n  </div>\n</div>");
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
      $o.push("</a>\n<ul class='uk-navbar-nav'>\n  <li>\n    <a href='" + ($e($c(this.pathFor("documentation")))) + "'>\n      Documentation\n    </a>\n  </li>\n  <li>\n    <a href='" + ($e($c(this.pathFor("contact")))) + "'>\n      Contact\n    </a>\n  </li>\n</ul>");
      return $o.join("\n").replace(/\s([\w-]+)='true'/mg, ' $1').replace(/\s([\w-]+)='false'/mg, '').replace(/\s(?:id|class)=(['"])(\1)/mg, "");
    }).call(context);
  };

}).call(this);
