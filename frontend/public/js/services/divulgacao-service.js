angular.module('divulgacaoService', ['ngResource'])
    .factory('divulgacaoServices', function($resource) {
        return $resource('http://54.200.188.39:81/api/webresources/divulgacao/:id', null, {
            'update' : { 
                method: 'PUT'
            },
            'findListFromUser':{
                url:'http://54.200.188.39:81/api/webresources/divulgacao/findListFromUser/:codigoUsuario',
                method:'GET',
                isArray:true
            },
            'getTopDivulgacaoGM':{
               url:'http://54.200.188.39:81/api/webresources/divulgacao/topDivulcao',
               method:'GET',
               isArray:true
            },
              'resetarDivulgacao':{
               url:'http://54.200.188.39:81/api/webresources/divulgacao/resetar',
               method:'POST'
            }
        });
    })
    .factory('cadastroDivulgacaoService', function($q, divulgacaoServices){
        var service = {};
        service.cadastrar = (divulgacao) => {
            return $q((resolve,reject) => {
                if(divulgacao.id){
                    divulgacaoServices.update({id: divulgacao.id}, divulgacao, () => {
                        resolve({
                            mensagem:'Divulgacao atualizada com sucesso'
                    });
                }, (error) => {
                    console.log(error);
                    reject({
                        mensagem:'Não foi possível atualizar a Divulgacao'
                    })	
                });
                } else {
                    console.log(divulgacao);
                    divulgacaoServices.save(divulgacao, () => {
                        resolve({
                            mensagem:'Divulgacao enviada com sucesso',
                            inclusao:true
                        })
                    }, (error) => {
                        console.log(error);
                        reject({
                            mensagem:'Não foi possível enviar a Divulgacao'
                        })
                    });
                }
            });
        };
        return service;
    });