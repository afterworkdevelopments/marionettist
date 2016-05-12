import Marionettist from "../core.js";
var React, ReactDOM, ReactView, backboneMixin, error, error1, error2,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ReactView = void 0;

try {
  React = require('react');
  ReactDOM = require('react-dom');
} catch (error1) {
  error = error1;
  React = void 0;
  ReactDOM = React = void 0;
}

try {
  backboneMixin = require('backbone-react-component');
} catch (error2) {
  error = error2;
  backboneMixin = void 0;
}

if ((React != null) && (ReactDOM != null)) {
  ReactView = (function(superClass) {
    extend(ReactView, superClass);

    function ReactView() {
      return ReactView.__super__.constructor.apply(this, arguments);
    }

    ReactView.prototype.getTemplate = function() {
      var defaultTemplate, template;
      template = Marionettist._getValue(this.getOption('template'));
      if (template === false) {
        return false;
      }
      defaultTemplate = {
        mixins: []
      };
      if (backboneMixin != null) {
        defaultTemplate.mixins.push(backboneMixin);
      }
      if (Marionettist._.isArray(template.mixins)) {
        template.mixins = Marionettist._.flatten(defaultTemplate.mixins, template.mixins);
      }
      template = Marionettist._.extend(defaultTemplate, template);
      return template;
    };

    ReactView.prototype.render = function() {
      var Factory, defaultProps, props, result, template, templateClass, templateHelpers;
      template = this.getTemplate();
      if ((template != null) && template !== false) {
        templateClass = React.createClass(template);
        props = Marionettist._getValue(this.props, this);
        templateHelpers = Marionette._getValue(this.getOption('templateHelpers'), this);
        defaultProps = {
          collection: this.collection,
          model: this.model,
          reactView: this,
          h: templateHelpers
        };
        props = Marionettist._.extend(defaultProps, props);
        Factory = React.createFactory(templateClass);
        result = Factory();
        ReactDOM.render(result, this.el);
      }
      return this;
    };

    return ReactView;

  })(Marionettist.Views.Layout);
}

export default ReactView;
