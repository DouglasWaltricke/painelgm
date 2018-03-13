angular.module('eventosService', ['ngResource'])
    .factory('eventosServices', function($resource) {
        return $resource('http://54.200.188.39:81/api/webresources/listaeventos/:id', null, {
            'update' : { 
                    method: 'PUT'
            },
            'findListFromUser':{
                    url:'http://54.200.188.39:81/api/webresources/listaeventos/findListFromUser/:codigoUsuario',
                    method:'GET',
                    isArray:true
            },
            'conferir':{
                    url:'http://54.200.188.39:81/api/webresources/listaeventos/conferir',
                    method:'PUT'
            },
            'getTopEventoPlayers':{
               url:'http://54.200.188.39:81/api/webresources/eventos',
               method:'GET',
               isArray:true
            },
             'resetarEventos':{
               url:'http://54.200.188.39:81/api/webresources/eventos/resetar',
               method:'POST'
            }
        });
        })
    .factory('cadastroListaEventos', function(eventosServices, $q){
        var service = {};
        service.cadastrar = (listaEventos) => {
            return $q((resolve,reject) => {
                if(listaEventos.id){
                    eventosServices.update({id: listaEventos.id}, listaEventos, () => {
                        resolve({
                            mensagem:'Lista de eventos atualizada com sucesso'
                        });

                }, (error) => {
                    console.log(error);
                        reject({
                            mensagem:'Não foi possível atualizar a lista'
                        })	
                });
                } else{
                    eventosServices.save(listaEventos, () => {
                        resolve({
                            mensagem:'Lista enviada com sucesso',
                            inclusao:true
                        })
                    }, (error) => {
                        console.log(error);
                        reject({
                            mensagem:'Não foi possível enviar a lista'
                        })
                    });
                }
            });
        };
        return service;
    });
