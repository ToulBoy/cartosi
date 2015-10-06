var app = angular.module('app', [ "ngResource", "ui.bootstrap", "ngCookies" ]);

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

app.controller('myMainCtrl', [ '$scope', '$resource', 'myTranslators',
		function($scope, $resource, myTranslators) {

			$scope.filter = {};
			myTranslators.getTranslation($scope);

			$scope.updateMap = function() {

				toutAfficher($scope);
				filterMetier($scope);
				filterResponsable($scope);
				filterLinkto($scope);

			};

			updateDashbord($scope, $resource, $scope.filter);

		} ]);

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

	scope.si  = siQuery.query({
		metier : filter.metier
	}, function() {
	});
	var repartitionMetier = [];
	scope.projects = projectQuery
			.query(function(data) {
				angular
						.forEach(
								data,
								function(myProject, key) {

									if (repartitionMetier[myProject.metier] == null) {
										repartitionMetier[myProject.metier] = {};
										repartitionMetier[myProject.metier].value = 0;
									} else {
										repartitionMetier[myProject.metier].value = repartitionMetier[myProject.metier].value + 1;
										var color;
										angular
												.forEach(
														scope.metiers,
														function(metier, key) {

															if (metier.id == myProject.metier) {
																color = metier.color;
															}

														});

										repartitionMetier[myProject.metier].color = color;
										repartitionMetier[myProject.metier].highlight = color;
										repartitionMetier[myProject.metier].label = myProject.metier;
									}

								});

				var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
				var pieChart = new Chart(pieChartCanvas);

				var PieData = [];

				angular.forEach(scope.metiers, function(data, key) {
					if (repartitionMetier[data.id] != null
							&& repartitionMetier[data.id].value != null) {
						PieData.push({
							value : repartitionMetier[data.id].value,
							color : repartitionMetier[data.id].color,
							highlight : repartitionMetier[data.id].highlight,
							label : repartitionMetier[data.id].label
						});
					}
				});

				var pieOptions = {
					// Boolean - Whether we should show a stroke on each segment
					segmentShowStroke : true,
					// String - The colour of each segment stroke
					segmentStrokeColor : "#fff",
					// Number - The width of each segment stroke
					segmentStrokeWidth : 2,
					// Number - The percentage of the chart that we cut out of
					// the middle
					percentageInnerCutout : 50, // This is 0 for Pie charts
					// Number - Amount of animation steps
					animationSteps : 100,
					// String - Animation easing effect
					animationEasing : "easeOutBounce",
					// Boolean - Whether we animate the rotation of the Doughnut
					animateRotate : true,
					// Boolean - Whether we animate scaling the Doughnut from
					// the centre
					animateScale : false,
					// Boolean - whether to make the chart responsive to window
					// resizing
					responsive : true,
					// Boolean - whether to maintain the starting aspect ratio
					// or not when
					// responsive, if set to false, will take up entire
					// container
					maintainAspectRatio : true,
					// String - A legend template
					legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
				};
				// Create pie or douhnut chart
				// You can switch between pie and douhnut using the method
				// below.
				pieChart.Doughnut(PieData, pieOptions);
			});
}