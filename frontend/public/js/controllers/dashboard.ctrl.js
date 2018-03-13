angular.module('painelGm')
    .controller('dashboardController', function($scope, $routeParams, $rootScope, $location, $window, divulgacaoServices, usuarioService, eventosServices){
     
        $scope.usuario = $rootScope.usuario;

        var getTopEventosGM = () => {
            usuarioService.getTopEventosGM((retorno)=>{
                $scope.topEventosGM = retorno;
            })
        }

        getTopEventosGM();


        var getTopDivulgaoGM = () => {
            divulgacaoServices.getTopDivulgacaoGM((retorno)=>{
                $scope.topDivulgacaoGM = retorno;
            })
        }

        getTopDivulgaoGM();

        var getTopEventoPlayers = () => {
            eventosServices.getTopEventoPlayers((retorno)=>{
                $scope.topEventoPlayers = retorno;
            })
        }

        getTopEventoPlayers();


        $scope.resetarEventos = ()=>{
             eventosServices.resetarEventos();
        }

        $scope.resetarDivulgacao = ()=>{
            divulgacaoServices.resetarDivulgacao();
        }
    })
