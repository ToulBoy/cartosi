// déclaration du module 'myservices' qui contient la liste de mes services
angular.module('myServices', []);


//enregistrement des services dans mon application main
angular.module('app', [ 'myServices' ]);


//ajout des services dans le module myservices



angular.module('myServices').service("ngResource");

angular.module('myServices').app.service('translationService', function($resource) {  
    this.getTranslation = function($scope, language) {
        var languageFilePath = './cartosi/tanslation/translation_' + language + '.json';
        $resource(languageFilePath).get(function (data) {
            $scope.translation = data;
        });
    };
});


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

