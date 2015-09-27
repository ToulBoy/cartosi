angular.module('app', [ "ngResource", "ui.bootstrap" ]).controller(
		'myProjectCtr', function($scope, $resource) {

			var projectQuery = $resource('../../api/project/:id', {
				id : '@id'
			}, {
				put : {
					method : 'PUT'
				}
			});

//			var id =$.getUrlVars()["id"];
			 var id = location.search.split('id=')[1]
			if(id !=null){
				$scope.project = projectQuery.get({"id" :id},
						function(data) {
					console.log(JSON.stringify(data));
				});
			}
			
			$scope.update = function() {
//				projectQuery.put($scope.project);
				console.log(JSON.stringify($scope.project));
			}

//			$scope.load = function() {
//				$scope.project = projetRest.get({
//					id : $scope.project.id
//				});
//
//			}

			
			$scope.projects = projectQuery.query(function() {});

//			$scope.project = function() {
//
//				if ($scope.project.lienProjets == null) {
//					$scope.project.lienProjets = [];
//				}
//
//				$scope.project.lienProjets.push({
//					"typeLien" : $scope.lien.typeLien,
//					"idProject" : $scope.lien.idProject
//				});
//
//			}

		});

//angular.module('app', [ "ngResource", "ui.bootstrap" ]).controller(
//		'myMainCtrl', function($scope, $resource) {
//
//			var projetRest = $resource('./api/project/:id', {
//				id : '@id'
//			}, {
//				put : {
//					method : 'PUT'
//				}
//			});
//
//			var projects = projetRest.get();
//
//			var mynodes = [];
//			angular.forEach(projects, function(value, key) {
//				mynodes.push({
//					id : value.id,
//					label : value.name
//				});
//			});
//			
//			var nodes = new vis.DataSet(mynodes); 
//
//
//			var myedges = [];
//			angular.forEach(projects, function(project, key) {
//				angular.forEach(project.lienProjets, function(value, key) {
//					myedges.push({
//						from : project.id,
//						to : value.idProject
//					});
//				});
//			});
//
//			var edges = new vis.DataSet(myedges);
//
//			// create a network
//			var container = document.getElementById('mynetwork');
//
//			// provide the data in the vis format
//			var data = {
//				nodes : nodes,
//				edges : edges
//			};
//			var options = {};
//
//			// initialize your network!
//			var network = new vis.Network(container, data, options);
//
//		});
