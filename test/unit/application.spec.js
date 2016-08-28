describe('marionettist application', function() {
  'use strict';

  beforeEach(function() {
    this.fooOptions = {foo: 'bar'};
    this.app = new Marionettist.Application();

    this.beforeResourcesFetchStub = sinon.stub();

    this.resourcesFetchSuccessStub = sinon.stub();

    this.resourcesFetchErrorStub = sinon.stub();

    this.readyStub = sinon.stub();

    this.beforeStartStub = sinon.stub();

    this.startStub = sinon.stub();

    this.app.on('before:start', this.beforeStartStub);

    this.app.on('before:resources:fetch', this.beforeResourcesFetchStub);

    this.app.on('resources:fetch:success', this.resourcesFetchSuccessStub);

    this.app.on('start', this.startStub);

    this.app.start(this.fooOptions);
  });

  it('should run the onBeforeStart callback', function() {
    expect(this.beforeStartStub).to.have.been.called;
  });

  it('should run the onBeforeResourcesFetch callback', function() {
    expect(this.beforeResourcesFetchStub).to.have.been.called;
  });

  it('should run the onResourcesFetchSuccess callback', function() {
    expect(this.resourcesFetchSuccessStub).to.have.been.called;
  });

  it('should run the onStart callback', function() {
    expect(this.startStub).to.have.been.called;
  });

});
