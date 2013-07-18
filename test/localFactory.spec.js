describe('angular-localStorage module', function () {
	var $store, testValue, scope;

	beforeEach(function () {
		module('localStorage');

		inject(function ($injector) {
			$store = $injector.get('$store');
		});
	});

	describe('when use set() && get() methods', function () {

		beforeEach(function () {
			$store.set('spec', 'some test string');
		});

		beforeEach(function () {
			testValue = $store.get('spec');
		});

		it('should store value in localStorage', function () {
			expect(testValue).toBe('some test string');
		});
	});

	describe('when bind() $scope field to localStorage', function () {
		beforeEach(function () {
			inject(function ($rootScope) {
				scope = $rootScope.$new();

				scope.$apply(function () {
					scope.spec = true;
				});

				$store.bind(scope, 'spec');

				scope.$apply(function () {
					scope.spec = false;
				});
			});
		});

		beforeEach(function () {
			testValue = $store.get('spec');
		});

		it('should have $scope value', function () {
			expect(testValue).toEqual(scope.spec);
		});
	});

	describe('when unbind() variable that clears localStorage and the variable', function () {
		var testLocalStorageValue, testLocalVariableValue;

		beforeEach(function () {
			$store.unbind(scope, 'spec');
		});

		beforeEach(function () {
			testLocalStorageValue = $store.get('spec');
			testLocalVariableValue = scope.spec;
		});

		it('should not contain field in storage', function () {
			expect(testLocalStorageValue).toBeNull();
		});

		it('should not contain field in scope', function () {
			expect(testLocalVariableValue).toBeNull();
		});
	});

	describe('when bind() $scope field to localStorage with different storeName', function () {
		beforeEach(function () {
			inject(function ($rootScope) {
				scope = $rootScope.$new();

				scope.$apply(function () {
					scope.spec = true;
				});

				$store.bind(scope, 'spec', 'defaultValue', 'specStore');

				scope.$apply(function () {
					scope.spec = false;
				});
			});
		});

		beforeEach(function () {
			testValue = $store.get('specStore');
		});

		it('should have $scope value', function () {
			expect(testValue).toEqual(scope.spec);
		});
	});

	describe('when unbind() variable that clears localStorage and the variable when using a different storeName', function () {
		var testLocalStorageValue, testLocalVariableValue;

		beforeEach(function () {
			$store.unbind(scope, 'spec', 'specStore');
		});

		beforeEach(function () {
			testLocalStorageValue = $store.get('spec');
			testLocalVariableValue = scope.spec;
		});

		it('should not contain field in storage', function () {
			expect(testLocalStorageValue).toBeNull();
		});

		it('should not contain field in scope', function () {
			expect(testLocalVariableValue).toBeNull();
		});
	});

	describe('when remove() field from localStorage', function () {
		beforeEach(function () {
			$store.remove('spec');
		});

		beforeEach(function () {
			testValue = $store.get('spec');
		});

		it('should not contain field', function () {
			expect(testValue).toBeNull();
		});
	});
});