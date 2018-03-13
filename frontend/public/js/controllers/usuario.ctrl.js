angular.module('painelGm')
	.controller('usuarioController', function($scope, $routeParams, $window, $rootScope, $location, usuarioService){

		$scope.usuario = {};
		var codigoUsuario = $window.sessionStorage.getItem('id');

		hasUser = () => {
			return Boolean(codigoUsuario);
		} 

		if(hasUser()){
			usuarioService.get({'id': codigoUsuario}, (retorno)=>{
				$scope.usuario = retorno;
				$rootScope.usuario = retorno;
			}, (error) => {
			console.log(error);
			});

		}	

		

		$scope.editarUsuario = () => {
			let usuario = $scope.usuario;
			usuarioService.update({id:codigoUsuario}, usuario, (retorno)=>{
				$scope.mensagem = 'Usuario atualizado com sucesso!';
				

			}, (error) => {
				console.log(error);
				$scope.mensagem = 'Ops, não foi possível atualizar seu cadastro'
			});

		}

		$scope.sair = () =>{
			codigoUsuario = null;
			$window.sessionStorage.setItem('id',null);
		  	$location.path('/login');

		}

	});