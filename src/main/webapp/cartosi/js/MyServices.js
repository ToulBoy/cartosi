// déclaration du module 'myservices' qui contient la liste de mes services
angular.module('myServices', []);


//enregistrement des services dans mon application main
angular.module('app', [ 'myServices' ]);


//ajout des services dans le module myservices
angular.module('myServices').service("ngResource");



////Nous enregistrons le service projectService 
//
//angular.module('myServices').service('myProjectServices', []).factory("$resource", function($resource) {
//	return $resource('./api/projet/:id', {
//		id : '@_id'
//	}, {
//		update : {
//			method : 'PUT'
//		}
//	});
//});






