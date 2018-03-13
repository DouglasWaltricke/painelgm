angular.module('painelGm')
    .controller('loginController', function($scope, $rootScope, $http, $location, $window, usuarioService){
        $scope.usuario = {};
        $scope.autenticar = () => {
            let usuario = $scope.usuario;

            $http.post('http://54.200.188.39:81/api/webresources/login', usuario)
            .then((resp)=> {
                if(resp.data == ""){
                    $scope.mensagem = "Login ou senha incorretos"
                    $scope.usuario = {};
                    return;
                } else
                    $window.sessionStorage.id = resp.data;
                    usuarioService.get({'id': resp.data}, (retorno)=>{
                        $rootScope.usuario = retorno;
                    }, (error) => {
                        console.log(error);
                    });
         
                    $location.path('/dashboard');
            }, () => {
                    $scope.mensagem = "Login ou senha incorretos"
                    $scope.usuario = {};
            })
        }

    });