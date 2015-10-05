var app = angular.module('app', [ "ngResource",'ngCookies' ]);


app.service("myTranslators", [
		"$resource",
		"$cookies",
		"$window",
		function($resource,$cookies,$window) {
			
			this.getTranslation = function($scope) {
				
				var language = $window.navigator.language;
				var languageFilePath = './cartosi/translation/translation_'
						+ language + '.json';
				return $resource(languageFilePath).get(function(data) {
					$scope.translate = data;
				});
			};
		} ]);
