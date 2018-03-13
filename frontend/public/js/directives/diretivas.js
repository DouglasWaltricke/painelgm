angular.module('Diretivas', ['ngResource'])
	.directive('feedback', function(){
		return {
			scope:{
				mensagem:'@'
			},
			restrict: 'E',
			templateUrl: 'js/directives/feedback.html',
			transclude: true,
		};

	});