angular.module('painelGm')
    .controller('divulgacaoListController', function($scope, $routeParams, $location, $window, divulgacaoServices, usuarioService){
        var listaDivulgacao = [];
        var codigoUsuario = $window.sessionStorage.getItem('id');
        $scope.valorMetaSemanal = 150;
        $scope.usuario = {};


        var getListaDivulgacao = () => {

            divulgacaoServices.findListFromUser({codigoUsuario:codigoUsuario}, (retorno) => {
                if(retorno.length){
                    $scope.listaDivulgacao = retorno;
                }
                else {
                    $scope.listaDivulgacao = [];
                    $scope.mensagem = 'Ops! você ainda não possui divulgações cadastradas'
                }
            }, (error) => {
                console.log(error);
            });
        }

        getListaDivulgacao();

        $scope.getMetaSemanal = (divulgacao) => {
        	let metaSemanal = divulgacao.numeroSemana*valorMetaSemanal; 
        	$scope.metaSemanal = metaSemanal;
        	 return metaSemanal;
        }

    
        $scope.isAtrasado = (divulgacao) => {
            let metaSemanal = divulgacao.numeroSemana * $scope.valorMetaSemanal; 
            return Boolean(divulgacao.quantidade < metaSemanal );
        }

        $scope.edit = (id)  => {
            $location.path('/cadastro-divulgacao/'+id);
        }

        $scope.remove = (divulgacao) =>{
            divulgacaoServices.delete({'id': divulgacao.id}, () => {
                let index = $scope.listaDivulgacao.indexOf(divulgacao);
                $scope.listaDivulgacao.splice(index,1);
                $scope.mensagem = 'Divulgação removida com sucesso';

            }, () => {
                $scope.mensagem = 'Não foi possível remover a divulgação';
            });
        }
});