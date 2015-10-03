angular.module('app', [ "ngResource", 'ngSanitize', 'ui.select' ]).controller(
		'myProjectCtr', function($scope, $resource) {

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
				$scope.project = projectQuery.get({
					"id" : id
				});
			}

			$scope.update = function() {
				projectQuery.put($scope.project);
			}

		});
