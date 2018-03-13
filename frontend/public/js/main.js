angular.module('painelGm',['ngRoute','ngResource','eventosService','usuariosService','Diretivas','divulgacaoService'])
	.config(function($routeProvider, $locationProvider, $httpProvider){

            $routeProvider.when('/login',{
                templateUrl:'views/login.html',
                controller:'loginController'
            });

            $routeProvider.when('/eventos', {
                templateUrl: 'views/evento.list.html',
                controller: 'eventoListController'
            });

            $routeProvider.when('/cadastro', {
                templateUrl: 'views/evento.cad.html',
                controller: 'eventoCadController'
            });

            $routeProvider.when('/cadastro/edit/:id', {
                templateUrl: 'views/evento.cad.html',
                controller: 'eventoCadController'
            });

            $routeProvider.when('/cadastro-usuario',{
                templateUrl:'views/usuario.cad.html',
                controller:'usuarioController'
            });

            $routeProvider.when('/cadastro-divulgacao',{
                templateUrl:'views/divulgacao.cad.html',
                controller:'divulgacaoCadController'
            });

             $routeProvider.when('/cadastro-divulgacao/:id',{
                templateUrl:'views/divulgacao.cad.html',
                controller:'divulgacaoCadController'
            });

            $routeProvider.when('/lista-divulgacao',{
                templateUrl:'views/divulgacao.list.html',
                controller:'divulgacaoListController'
            });

            $routeProvider.when('/dashboard',{
                templateUrl:'views/dashboard.html',
                controller:'dashboardController'
            });

            $routeProvider.otherwise({redirectTo: '/login'});
	});