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

			updateDashbord($scope, $resource);

		} ]);

function updateDashbord(scope, resource) {

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

	scope.si = siQuery.query(function(data) {
	
				var repartitionMetier = data.projectsByMetier;
				var pieChartCanvas1 = $("#pieChart1").get(0).getContext("2d");
				var pieChart1 = new Chart(pieChartCanvas1);
				var PieData1 = [];

				angular.forEach(scope.metiers, function(data, key) {
					if (repartitionMetier[data.id] != null
							&& repartitionMetier[data.id].value != null) {
						PieData1.push({
							value : repartitionMetier[data.id].value,
							color : repartitionMetier[data.id].color,
							highlight : repartitionMetier[data.id].highlight,
							label : repartitionMetier[data.id].label
						});
					}
				});

				var repartitionLink = data.linksByMetier;
				var pieChartCanvas2 = $("#pieChart2").get(0).getContext("2d");
				var pieChart2 = new Chart(pieChartCanvas2);
				var PieData2 = [];

				angular.forEach(scope.metiers, function(data, key) {
					if (repartitionLink[data.id] != null
							&& repartitionLink[data.id].value != null) {
						PieData2.push({
							value : repartitionLink[data.id].value,
							color : repartitionLink[data.id].color,
							highlight : repartitionLink[data.id].highlight,
							label : repartitionLink[data.id].label
						});
					}
				});

				var pieOptions1 = {
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
				
				var pieOptions2 = {
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
				pieChart1.Doughnut(PieData1, pieOptions1);
				pieChart2.Doughnut(PieData2, pieOptions2);

	
	});
}
