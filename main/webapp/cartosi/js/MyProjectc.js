angular.module('app', [ "ngResource", "ui.bootstrap" ]).controller(
		'myProjectCtr', function($scope, $resource) {

			var projetRest = $resource('../api/project/:id', {
				id : '@id'
			}, {
				put : {
					method : 'PUT'
				}
			});

			$scope.update = function() {
				projetRest.put($scope.project);
			}

			$scope.load = function() {
				$scope.project = projetRest.get({
					id : $scope.project.id
				});

			}

			//	
			// $scope.lien = null;
			// $scope.project = [];

			$scope.modernBrowsers = [ {
				icon : "[...]/opera.png...",
				name : "Opera",
				maker : "Opera Software",
				ticked : false
			}, {
				icon : "[...]/internet_explorer.png...",
				name : "Internet Explorer",
				maker : "Microsoft",
				ticked : false
			}, {
				icon : "[...]/firefox-icon.png...",
				name : "Firefox",
				maker : "Mozilla Foundation",
				ticked : false
			}, {
				icon : "[...]/safari_browser.png...",
				name : "Safari",
				maker : "Apple",
				ticked : false
			}, {
				icon : "[...]/chrome.png...",
				name : "Chrome",
				maker : "Google",
				ticked : false
			} ];

			//	
			// var metiersRest = $resource('./api/metier/:id', {id: '@id'});
			// var typeLiensRest = $resource('./api/metier/:id', {id: '@id'});

			$scope.adlien = function() {

				if ($scope.project.lienProjets == null) {
					$scope.project.lienProjets = [];
				}

				$scope.project.lienProjets.push({
					"typeLien" : $scope.lien.typeLien,
					"idProject" : $scope.lien.idProject
				});

			}

		});

angular.module('app', [ "ngResource", "ui.bootstrap" ]).controller(
		'myMainCtrl', function($scope, $resource) {

			var projetRest = $resource('./api/project/:id', {
				id : '@id'
			}, {
				put : {
					method : 'PUT'
				}
			});

			var projects = projetRest.get();

			var mynodes = [];
			angular.forEach(projects, function(value, key) {
				mynodes.push({
					id : value.id,
					label : value.name
				});
			});
			
			var nodes = new vis.DataSet(mynodes); 


			var myedges = [];
			angular.forEach(projects, function(project, key) {
				angular.forEach(project.lienProjets, function(value, key) {
					myedges.push({
						from : project.id,
						to : value.idProject
					});
				});
			});

			var edges = new vis.DataSet(myedges);

			// create a network
			var container = document.getElementById('mynetwork');

			// provide the data in the vis format
			var data = {
				nodes : nodes,
				edges : edges
			};
			var options = {};

			// initialize your network!
			var network = new vis.Network(container, data, options);

		});
