angular.module('painelGm')
	.controller('eventoCadController', function($scope, $routeParams, $window, usuarioService, cadastroListaEventos, eventosServices){
            $scope.evento = {};
            $scope.listaEventos = {};
            $scope.listaEventos.eventos = [];
            $scope.usuario = {};
            $scope.required = true;

            var codigoUsuario = $window.sessionStorage.getItem('id');
            $scope.listaEventos.codigoUsuario = codigoUsuario; 

            if($routeParams.id){
                eventosServices.get({id: $routeParams.id}, (listaEventos) => {
                    $scope.listaEventos = listaEventos;
                    $scope.listaEventos.dataEvento = new  Date(listaEventos.dataEvento)
                }, (error) => {
                        console.log(error);
                });
            }

            $scope.adicionarEvento = () => {
                $scope.listaEventos.eventos.forEach((element,index,array) => {
                    if(element.player == $scope.evento.player){
                        $scope.listaEventos.eventos[index].premiacao = $scope.listaEventos.eventos[index].premiacao+1;
                        $scope.listaEventos.eventos[index].nome = $scope.listaEventos.eventos[index].nome+' - '+$scope.evento.nome;
                        $scope.evento = {};
                        return;
                    }
                });

                if(!$scope.evento.id && $scope.evento.hasOwnProperty("premiacao")){
                        $scope.evento.gameMaster = $scope.listaEventos.gameMaster
                        $scope.listaEventos.eventos.push($scope.evento);
                        $scope.evento = {};
                        return;

                }

                let indiceEvento = $scope.listaEventos.eventos.indexOf($scope.evento);

                $scope.listaEventos.eventos[indiceEvento] = $scope.evento;

                $scope.evento = {};
            }

            $scope.enviarLista = () => {

                cadastroListaEventos.cadastrar($scope.listaEventos).then((retorno) => {
                    $scope.mensagem = retorno.mensagem;
                    if(retorno.inclusao){
                            $scope.evento = {};
                            $scope.listaEventos = {};
                            $scope.listaEventos.eventos = [];
                    }
                }, (error) => {
                    console.log(error);
                })
            };
                
            $scope.hasPrint = () => {
                return Boolean($scope.evento.printUrl); 
            }

            $scope.selecionaEvento = (evento,id) => {
                $scope.evento = evento;
            }

	

	});