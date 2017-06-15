console.log("Bienvenido");
var api = {
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/'
};

var $listaTemas = $("#listaTemas");

var plantillaTema =  '<ul id="listaTemas" class="collection container">'+
        '<li class="collection-item avatar center">'+
          '<i class="material-icons circle purple-text">perm_identity</i>'+
          '<span class="title cyan-text ">__tituloTema__</span>'+
          '<p><strong>Autor:</strong> __autor__ </p>'+
          '<p><strong>Respuestas:</strong> __numRespuestas__</p>'+
        '</li>'+
      '</ul>';

var cargarPagina = function () {
  cargarTemas();

};

var cargarTemas = function () {
  $.getJSON(api.url, function (temas) {
    temas.forEach(crearTema);
  });
};

var crearTema = function (tema){
  var tema = ;
  var autor = ;
  var numRespuestas = ;
};

$(document).ready(cargarPagina);
