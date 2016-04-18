(function() {
  if (window.HAML == null) {
    window.HAML = {};
  }

  window.HAML['site/templates/layout'] = function(context) {
    return (function() {
      var $o;
      $o = [];
      $o.push("<div class='uk-container uk-container-center uk-margin-large-bottom uk-margin-top'>\n  <div class='uk-grid'>\n    <div class='uk-row-first uk-width-medium-1-1'>\n      <div class='uk-text-center uk-vertical-align'>\n        <div class='uk-vertical-align-middle uk-width-1-2'>\n          <h1 class='uk-heading-large'></h1>\n          <p class='uk-text-large'></p>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>");
      return $o.join("\n").replace(/\s(?:id|class)=(['"])(\1)/mg, "");
    }).call(context);
  };

}).call(this);
