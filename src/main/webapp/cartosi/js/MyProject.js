angular.module('app', [ "ngResource", "ui.bootstrap" ])
		.controller(
				'myProjectCtr',
				function($scope, $resource) {

					var projectQuery = $resource('../../api/project/:id', {
						id : '@id'
					}, {
						put : {
							method : 'PUT'
						}
					});

					var metierQuery = $resource('../../api/metier/:id', {
						id : '@id'
					});

					

					$scope.projects = projectQuery.query(function() {
					});
					
					$scope.metiers = metierQuery.query(function() {
					});
					
					
					
					
					$scope.project = {};

					
					var id = location.search.split('id=')[1]
					if (id != null) {
						$scope.project = projectQuery.get({
							"id" : id
						}, function(data) {
							console.log(JSON.stringify(data));
						});
					}
					
					
					$scope.update = function() {
						projectQuery.put($scope.project);
					}

					
					
					// ajout des liens
					
					
					$scope.del = function(link) {
						var newLink = [];

						angular.forEach($scope.project.links, function(data,
								key) {

							if (link.to != data.to
									|| link.version != data.version) {
								newLink.push(data);
							}
						});

						$scope.project.links = newLink;
					}

					$scope.selectLinkProject = function(project) {

						$scope.selectversions = JSON
								.parse($scope.selectProject).versions;
					}

					$scope.add = function() {
						if ($scope.project.links == null) {
							$scope.project.links = [];
						}

						$scope.project.links.push({
							"to" : JSON.parse($scope.selectProject).id,
							"version" : $scope.selectversion
						})

					}


				});
