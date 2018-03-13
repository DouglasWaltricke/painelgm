angular.module('usuariosService', ['ngResource'])
	.factory('usuarioService', function($resource){
		return $resource('http://54.200.188.39:81/api/webresources/usuarios/:id', null, {
			'update':{
				method:'PUT'
			},
			'getTopEventosGM':{
		       url:'http://54.200.188.39:81/api/webresources/usuarios/topEventosGM',
               method:'GET',
               isArray:true
			}
		});

	});