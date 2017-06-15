console.log("Bienvenido");
var api = {
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/'
};

var $listaTemas = $("#listaTemas");//Se obtiene el elemento html que contendrá las tarjetas de los temas

var plantillaTema =  '<li data-target="__id__" class="collection-item avatar center">'+
          '<i class="material-icons circle purple-text">perm_identity</i>'+
          '<span class="title cyan-text ">__tituloTema__</span>'+
          '<p><strong>Autor:</strong> __autor__ </p>'+
          '<p><strong>Respuestas:</strong> __numRespuestas__</p>'+
        '</li>';

var cargarPagina = function () {
  cargarTemas();

};

var cargarTemas = function () {
  $.getJSON(api.url, function (temas) {
    temas.forEach(crearTema);
  });
};

var crearTema = function (tema){
  //Se obtienen las propiedades de cada objeto
  // console.log(tema);
  var idTema = tema.id;
  var tituloTema = tema.content;
  var autor = tema.author_name;
  var numRespuestas = tema.responses_count;
  // console.log(tituloTema+ " " + autor + " " + numRespuestas);

  //Se Remplazan valores en la plantillaTarjeta
  var tarjetaTema = "";
  tarjetaTema += plantillaTema.replace('__id__',idTema).replace('__tituloTema__',tituloTema).replace('__autor__',autor).replace('__numRespuestas__',numRespuestas);
  console.log(tarjetaTema);
  // Se agregan las tarjetas a la listaTemas
  $listaTemas.append(tarjetaTema);
};

$(document).ready(cargarPagina);
