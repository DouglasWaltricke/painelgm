angular.module('painelGm')
	.controller('eventoListController', function($scope, $rootScope, $routeParams, $location, $window, eventosServices, usuarioService, cadastroListaEventos){
        var listaEventos = [];

        var codigoUsuario = $rootScope.usuario.id
        $scope.usuario = $rootScope.usuario;
          
        var getListaEventos = () => {
            eventosServices.findListFromUser({codigoUsuario: codigoUsuario},(retorno) => {
                if(retorno.length){
                    $scope.listaEventos = retorno;
                    return;
                } else {
                    $scope.listaEventos = [];
                    $scope.mensagem = 'Ops! você ainda não possui eventos cadastrados';
                }
            }, (error) => {
                console.log(error);
            });

        }

        getListaEventos();

        $scope.edit = (id)  => {
            $location.path('/cadastro/edit/'+id);
        }

        $scope.remove = (listaEventos) =>{
            eventosServices.delete({'id': listaEventos.id}, () => {
                let index = $scope.listaEventos.indexOf(listaEventos);
                $scope.listaEventos.splice(index,1);
                $scope.mensagem = 'Lista removida com sucesso';

            }, () => {
                $scope.mensagem = 'Não foi possível remover a lista';
            });
        }

        $scope.checked = (listaEventosChecked) => {
            listaEventosChecked.checked = true;
            cadastroListaEventos.cadastrar(listaEventosChecked)
                    .then((retorno) => {
                    $scope.mensagem = retorno.mensagem;
            })

        }
        
        $scope.conferir = (id) => {
           eventosServices.conferir({"id": id}, ()=>{
               $scope.mensagem = 'Lista atualiza com sucesso.';
               getListaEventos();

               
           },()=>{
               $scope.mensagem = 'Não foi possível atualizar a lista.';
           })
        }
});