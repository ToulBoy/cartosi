var app = angular.module('app', [ "ngResource", "ui.bootstrap","ngCookies"]);



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



app.controller(
		'myMainCtrl', 
		[ '$scope', '$resource', 'myTranslators',
			function($scope, $resource, myTranslators) {
			
			
//			 var metier = decodeURI(location.search.split('metier=')[1]);
//			 var linkto = decodeURI(location.search.split('linkto=')[1]);
//			 var responsable = decodeURI(location.search.split('responsable=')[1]);
			
			 
			 
//			$scope.filter = {"metier" : metier,
//					"linkto" : linkto,
//					"responsable" : responsable};
			
			myTranslators.getTranslation($scope);

			$scope.updateMap = function() {

				toutAfficher($scope);
				filterMetier($scope);
				filterResponsable($scope);
				filterLinkto($scope);

			};
			
			updateDashbord($scope, $resource, $scope.filter);

		}]);

function toutAfficher($scope) {

	angular.forEach($scope.nodes, function(data, key) {
		$scope.nodes.update([ {
			id : data.id,
			hidden : false,
			group : data.group,
			label : data.label,
			title : data.title
		} ]);
	});

	angular.forEach($scope.edges, function(data, key) {
		$scope.edges.update([ {
			id : data.id,
			hidden : false,
			label : data.label,
			title : data.title
		} ]);
	});

}

function filterMetier($scope) {
	if ($scope.filter.metier == "" || $scope.filter.metier == null)
		return;
	var idHidden = [];

	angular.forEach($scope.nodes, function(data, key) {
		if (data.group != $scope.filter.metier) {
			$scope.nodes.update([ {
				id : data.id,
				hidden : true,
				group : data.group,
				label : data.label,
				title : data.title
			} ]);
			idHidden.push(data.id);
		} else {
			// $scope.network.focus(data.id);
		}

	});

	angular.forEach($scope.edges, function(data, key) {
		if ($.inArray(data.to, idHidden) > -1
				|| $.inArray(data.from, idHidden) > -1) {
			$scope.edges.update([ {
				id : data.id,
				hidden : true,
				label : data.label,
				title : data.title
			} ]);
		} else {
			$scope.edges.update([ {
				id : data.id,
				hidden : false,
				label : data.label,
				title : data.title
			} ]);
		}
	});

}

function filterResponsable($scope) {
	if ($scope.filter.responsable == "" || $scope.filter.responsable == null)
		return;
	var idHidden = [];

	angular.forEach($scope.nodes, function(data, key) {
		if (data.responsable != $scope.filter.responsable) {
			$scope.nodes.update([ {
				id : data.id,
				hidden : true,
				group : data.group,
				label : data.label,
				title : data.title
			} ]);
			idHidden.push(data.id);
		} else {

			// $scope.network.focus(data.id);
		}

	});

	angular.forEach($scope.edges, function(data, key) {
		if ($.inArray(data.to, idHidden) > -1
				|| $.inArray(data.from, idHidden) > -1) {
			$scope.edges.update([ {
				id : data.id,
				hidden : true,
				label : data.label,
				title : data.title
			} ]);
		} else {
			$scope.edges.update([ {
				id : data.id,
				hidden : false,
				label : data.label,
				title : data.title
			} ]);
		}
	});

}

function filterLinkto($scope) {
	if ($scope.filter.linkto == "" || $scope.filter.linkto == null)
		return;
	var nodeToSave = [];

	angular.forEach($scope.edges, function(data, key) {
		if (data.to == $scope.filter.linkto) {

			nodeToSave.push(data.from);
			
			// $scope.network.focus(data.id);


		} else {
			$scope.edges.update([ {
				id : data.id,
				hidden : true,
				label : data.label,
				title : data.title
			} ]);
		}
	});

	// ajout du projet linkto
	nodeToSave.push($scope.filter.linkto);

	angular.forEach($scope.nodes, function(data, key) {
		if ($.inArray(data.id, nodeToSave) == -1) {
			$scope.nodes.update([ {
				id : data.id,
				hidden : true,
				group : data.group,
				label : data.label,
				title : data.title
			} ]);
		} else {
			// $scope.network.focus(data.id);
		}

	});

}

function updateDashbord(scope, resource, filter) {

	var siQuerySearch = resource('./api/si/search', {
		id : '@id'
	}, {
		put : {
			method : 'PUT'
		},
		query : {
			method : 'GET',
			isArray : false,
			params : {
				action : "search",
				metier : '@metier'
			}
		}
	});

	var projectQuery = resource('./api/project/', {
		id : '@id'
	}, {
		put : {
			method : 'PUT'
		}
	});

	var responsableQuery = resource('./api/responsable/', {
		id : '@id'
	}, {
		put : {
			method : 'PUT'
		}
	});

	var metierQuery = resource('./api/metier/', {
		id : '@id'
	}, {
		put : {
			method : 'PUT'
		}
	});

	
	var siQuery = resource('./api/si/', {
		id : '@id'
	}, {
		query : {
			method : 'GET',
			isArray : false,
			params : {
				action : "search",
				metier : '@metier'
			}
		}
	});
	
	scope.metiers = metierQuery.query(function() {
	});
	scope.responsables = responsableQuery.query(function() {
	});
	scope.projects = projectQuery.query(function() {
	});

	var mygroups = {};
	$("#loadingMap").show()
	scope.si = siQuery.query(function(data) {});
		
	
		siQuerySearch
			.query(
					filter,
					function(siFilter) {

						var mynodes = [];
						var siProjects = siFilter.projects;

						angular.forEach(siProjects, function(value, key) {
							mynodes.push({
								id : value.id,
								label : value.id,
								title : value.description,
								group : value.metier,
								responsable : value.responsable,
								image : "./cartosi/img/" + value.type + ".png",
								borderWidth : 4,
								shape : 'image'

							});

							mygroups[value.metier.id] = {
								color : {
									background : value.metier.color
								}
							};
						});

						var nodes = new vis.DataSet(mynodes);

						var myedges = [];
						angular.forEach(siProjects, function(project, key) {
							angular.forEach(project.links,
									function(link, key) {
										myedges.push({
											from : project.id,
											to : link.projectId,
											label : link.comment,
											arrows : "to",
// title : value.typeLien
										});
									});
						});

						var edges = new vis.DataSet(myedges);

						// provide the data in the vis format
						scope.nodes = nodes;
						scope.edges = edges;

						var data = {
							nodes : nodes,
							edges : edges
						};


						var options = {
							autoResize : true,
							height : '100%',
							width : '100%',
							clickToUse : false,
							layout : {
//								randomSeed : undefined,
								improvedLayout : true,
								hierarchical : {
									enabled : false,
//									levelSeparation : 150,
									direction : 'UD', // UD, DU, LR,
									// RL
									sortMethod : 'hubsize' // hubsize,
								// directed
								}
							},
							groups : mygroups,
							interaction : {
								navigationButtons : true,
								keyboard : true,
								zoomView : true
							}
						}

						// create a network

						$('#mynetwork').empty();
						var container = $('#mynetwork')[0];

						// initialize your network!
						scope.network = new vis.Network(container, data,
								options);

						scope.network.on("click", function(params) {
							//							

						});
						//
						scope.network
								.on(
										"doubleClick",
										function(params) {
											if (params.nodes[0] != null) {
												window.location = "./projectAdd.html?id="
														+ params.nodes[0];
											}
										});
						//
						// scope.network.on("stabilizationProgress", function(
						// params) {
						//
						// });

						scope.network.once("stabilizationIterationsDone",
								function() {
									$("#loadingMap").hide()
								});

					});

}