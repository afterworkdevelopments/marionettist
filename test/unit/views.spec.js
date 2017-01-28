describe('marionettist views', function() {
  'use strict';

  beforeEach(function() {
    var ViewClass = Marionettist.Views.Base.extend({
      template: function(data){
        return  Marionettist.config.templates.render("marionettist/loader", data,{
          defaultTemplate: "<div></div>"
        })
      },
      templateContext: function(){
        var ctx = Marionettist.Views.Base.prototype.templateContext.apply(this, arguments);
        ctx.helloWorld = "Hola mundo"
        return ctx;
      }
    })
    this.view = new ViewClass();

  });

  it('templateHelpers should not share the properties', function() {
    this.view.render();
    let templateHelpers = Marionettist.Views.templateHelpers;
    let totalHelpersKeys = Marionettist._.keys(templateHelpers).length;
    let totalKeys = Marionettist._.keys(this.view.templateContext()).length;
    expect(totalKeys > totalHelpersKeys).to.be.true;
  });



});
