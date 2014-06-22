'use strict';

describe('Directive: rPreventTouchstart', function () {

  // load the directive's module
  beforeEach(module('roundApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<r-prevent-touchstart></r-prevent-touchstart>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the rPreventTouchstart directive');
  }));
});
