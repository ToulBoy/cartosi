var app = angular.module('app', [ "ngResource", 'ngCookies' ]);

app.controller('myProjectCtr', [ '$scope', '$resource', 'myTranslators',
		function($scope, $resource, myTranslators) {

			$scope.project = {};
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

			

			var id = location.search.split('id=')[1];
			if (id != null) {
				id = decodeURI(id);
				$scope.project = projectQuery.get({
					"id" : id
				});
			}

			$scope.update = function() {
				projectQuery.put($scope.project);
			}

			$scope.adlien = function() {

				if ($scope.project.links == null) {
					$scope.project.links = [];
				}

				$scope.project.links.push($scope.linkSelect);

				$scope.linkSelect = null;
			}
			
			
			$scope.remove = function(id) {
				var links = $scope.project.links;
				$scope.project.links = [];

				angular.forEach(links, function(data, key) {

					if (data.projectId != id) {
						$scope.project.links.push(data);
					}

				});

			}
			
			
			$scope.edite = function(id) {
				var links = $scope.project.links;
				$scope.project.links = [];

				angular.forEach(links, function(data, key) {

					if (data.projectId != id) {
						$scope.project.links.push(data);
					}else{
						$scope.linkSelect = data;
					}

				});

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
