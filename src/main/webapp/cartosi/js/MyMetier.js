var app = angular.module('app', [ "ngResource", 'ngCookies' ]);

app.controller('myMetierCtr', [ '$scope', '$resource', 'myTranslators',
		function($scope, $resource, myTranslators) {

	
	
			$scope.metier = {};
			
			myTranslators.getTranslation($scope);

			var metierQuery = $resource('./api/metier/:id', {
				id : '@id'
			}, {
				put : {
					method : 'PUT'
				}
			});

			$scope.metiers = metierQuery.query(function() {
			});

			var id = location.search.split('id=')[1]
			if (id != null) {
				id = decodeURI(id)
				$scope.metier = metierQuery.get({
					"id" : id
				},function(data){
					$("#colorMetier").css("background-color", data.color);
				});
			}

			$scope.update = function() {
				metierQuery.put($scope.metier);
			}
			
			
			$scope.color = function() {
				$("#colorMetier").css("background-color", $scope.metier.color);
			
			
			}

		} ]);

app.service("myTranslators", [
		"$resource",
		"$cookies",
		"$window",
		function($resource, $cookies, $window) {

			this.getTranslation = function($scope) {

				var language = $window.navigator.language;
				var languageFilePath = './cartosi/translation/translation_'
						+ language + '.json';
				return $resource(languageFilePath).get(function(data) {
					$scope.translate = data;
				});
			};
		} ]);
