var app = angular.module('app', [ "ngResource", 'ngCookies' ]);

app.controller('myMailCtr', [ '$scope', '$resource', 'myTranslators',
		function($scope, $resource, myTranslators) {

			$scope.project = {};
			$scope.responsablesSelect =[];

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

			$scope.responsables = responsableQuery.query(function(data) {
				
				
				angular.forEach(data, function(responsable, key) {
					$scope.responsablesSelect.push(responsable.id);

				});
				
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

			$scope.updateResponsable = function() {
				$scope.responsablesSelect = [];
				var flagselect = [];

				if ($scope.filter.metier != null) {

					angular.forEach($scope.projects, function(data, key) {
						if (data.metier == $scope.filter.metier) {
							flagselect[data.responsable] = data.responsable;
							$scope.responsablesSelect.push(data.responsable);
						}
					});
				}

				if ($scope.filter.linkto != null) {

					angular.forEach($scope.projects, function(data, key) {
						angular.forEach(data.links, function(link, key) {
							if (link.projectId == $scope.filter.linkto && flagselect[data.responsable] ==null) {
								flagselect[data.responsable] = data.responsable;
								$scope.responsablesSelect.push(data.responsable);
							}
							});
						
					});

					
					

				}

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
