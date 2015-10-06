var app = angular.module('app', [ "ngResource",'ngCookies' ]);

app.controller('myResponsableCtr', [ '$scope', '$resource', 'myTranslators',
		function($scope, $resource, myTranslators) {

			myTranslators.getTranslation($scope);

			var projectQuery = $resource('./api/project/:id', {
				id : '@id'
			}, {
				put : {
					method : 'PUT'
				}
			});

			var metierQuery = $resource('./api/metier/:id', {
				id : '@id'
			});

			var responsableQuery = $resource('./api/responsable/:id', {
				id : '@id'
			});

			$scope.projects = projectQuery.query(function() {
			});

			$scope.responsables = responsableQuery.query(function() {
			});

			$scope.metiers = metierQuery.query(function() {
			});

			var id = location.search.split('id=')[1]
			if (id != null) {
				$scope.responsable = responsableQuery.get({
					"id" : id
				});
			}

			$scope.update = function() {
				projectQuery.put($scope.responsable);
			}

		} ]);

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
