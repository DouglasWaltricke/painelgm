angular.module('painelGm')
	.controller('divulgacaoCadController', function($scope, $routeParams, $window, usuarioService, cadastroDivulgacaoService, divulgacaoServices){
		$scope.divulgacao = {};
		$scope.divulgacao.paginaUrl = [];
	 	$scope.usuario =  {};
                
      	var codigoUsuario = $window.sessionStorage.getItem('id');

		if($routeParams.id){
		    divulgacaoServices.get({id: $routeParams.id}, (divulgacao) => {
		        $scope.divulgacao = divulgacao;
		    }, (error) => {
		            console.log(error);
		    });
		}

		$scope.adicionarDivulgacao = () => {
			applyDefaultValues();
			cadastroDivulgacaoService.cadastrar($scope.divulgacao)
			.then((retorno) => {
				$scope.mensagem = retorno.mensagem;
				if(retorno.inclusao){
					$scope.divulgacao = {};
				}
			}, (error) => {
				console.log(error);
			})

		};

		$scope.addUrl = (urlTemp) => {
			$scope.divulgacao.paginaUrl.push({
				"url": urlTemp
			});

			$scope.urlTemp = null;
		}

		var applyDefaultValues = () => {
			$scope.divulgacao.codigoUsuario = codigoUsuario;
			$scope.divulgacao.dataDivulgacao = new Date();
		}

	});