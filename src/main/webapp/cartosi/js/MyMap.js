angular.module('app', [ "ngResource", "ui.bootstrap" ]).controller(
		'myMainCtrl', function($scope, $resource) {
			$scope.filter = {};
			$scope.updateMap = function() {

				console.log(JSON.stringify($scope.filter));
				toutAfficher($scope);
				filterMetier($scope);
				filterResponsable($scope);
				filterLinkto($scope);

			};

			updateDashbord($scope, $resource, $scope.filter);

		});

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
			$scope.nodes.update([ {
				id : data.id,
				hidden : false,
				group : data.group,
				label : data.label,
				title : data.title
			} ]);
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
			$scope.nodes.update([ {
				id : data.id,
				hidden : false,
				group : data.group,
				label : data.label,
				title : data.title
			} ]);
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
			$scope.edges.update([ {
				id : data.id,
				hidden : false,
				label : data.label,
				title : data.title
			} ]);
			nodeToSave.push(data.from);

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
			$scope.nodes.update([ {
				id : data.id,
				hidden : false,
				group : data.group,
				label : data.label,
				title : data.title
			} ]);
		}

	});

}

function updateDashbord(scope, resource, filter) {

	var siQuery = resource('./api/si/search', {
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

	scope.metiers = metierQuery.query(function() {
	});
	scope.responsables = responsableQuery.query(function() {
	});
	scope.projects = projectQuery.query(function() {
	});

	var mygroups = {};
	$("#loadingMap").show()
	var si = siQuery
			.query(
					{
						metier : filter.metier
					},
					function() {

						scope.si = si;
						var mynodes = [];
						var siProjects = si.projects;

						angular.forEach(siProjects, function(value, key) {
							mynodes.push({
								id : value.id,
								label : value.name,
								title : value.description,
								group : value.metier.name,
								responsable : value.responsable,
								image : "./cartosi/img/" + value.type + ".png",
								borderWidth : 4,
								shape : 'image'

							});

							mygroups[value.metier.name] = {
								color : {
									background : value.metier.color
								}
							};
						});

						var nodes = new vis.DataSet(mynodes);

						var myedges = [];
						angular.forEach(siProjects, function(project, key) {
							angular.forEach(project.links,
									function(value, key) {
										myedges.push({
											from : project.id,
											to : value,
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

						var locales = {
							en : {
								edit : 'Edit',
								del : 'Delete selected',
								back : 'Back',
								addNode : 'Add Node',
								addEdge : 'Add Edge',
								editNode : 'Edit Node',
								editEdge : 'Edit Edge',
								addDescription : 'Click in an empty space to place a new node.',
								edgeDescription : 'Click on a node and drag the edge to another node to connect them.',
								editEdgeDescription : 'Click on the control points and drag them to a node to connect to it.',
								createEdgeError : 'Cannot link edges to a cluster.',
								deleteClusterError : 'Clusters cannot be deleted.',
								editClusterError : 'Clusters cannot be edited.'
							}
						}

						var options = {
							autoResize : true,
							height : '100%',
							width : '100%',
							locale : 'en',
							locales : locales,
							clickToUse : false,
							layout : {
								randomSeed : undefined,
								improvedLayout : true,
								hierarchical : {
									enabled : false,
									levelSeparation : 150,
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
								zoomView : false
							}
						}

						// create a network

						$('#mynetwork').empty();
						var container = $('#mynetwork')[0];
						if (scope.network != null) {
							scope.network.destroy();
							scope.network = null;
						}

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
												window.location = "./cartosi/project/addproject.html?id="
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