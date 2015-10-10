var app = angular.module('app', [ "ngResource", 'ngCookies',"checklist-model"]);

app.controller('myMailCtr', [ '$scope', '$resource', 'myTranslators',
		function($scope, $resource, myTranslators) {

			$scope.project = {};
			$scope.responsablesSelect =[];
			$scope.email={};
			$scope.email.adresse =[];
			myTranslators.getTranslation($scope);

			var projectQuery = $resource('./api/project/:id', {
				id : '@id'
			}, {
				put : {
					method : 'PUT'
				}
			});

			
			var emailQuery = $resource('./api/email/:id', {
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
					$scope.email.adresse.push(responsable.id);

				});
			});

			$scope.metiers = metierQuery.query(function() {
			});
			
			$scope.emails = emailQuery.query(function() {
			});

			var id = location.search.split('id=')[1];
			if (id != null) {
				id = decodeURI(id);
				$scope.project = projectQuery.get({
					"id" : id
				});
			}

			
		
			
//			$scope.selectedAll= function(t) {
//			    alert(t)
//			  };
//			
//			$scope.checkAll = function() {
//			    $scope.myEmails = angular.copy($scope.responsablesSelect);
//			  };
//		
//			$scope.uncheckAll = function() {
//		    $scope.myEmails= [];
//		  };
			

			$scope.send = function() {
			    
				$scope.email.texte = $("#compose-textarea").val();
				
				emailQuery.put($scope.email);
				
				
				$("#compose-textarea").val("");
				$scope.email={};
				$scope.email.adresse =$scope.responsablesSelect;
				window.location = "./index.html";
			};
			  
				
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

				$scope.email.adresse = $scope.responsablesSelect;
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
