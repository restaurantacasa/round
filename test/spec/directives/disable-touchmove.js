'use strict';

describe('Directive: disableTouchmove', function () {

  // load the directive's module
  beforeEach(module('roundApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<disable-touchmove></disable-touchmove>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the disableTouchmove directive');
  }));
});
