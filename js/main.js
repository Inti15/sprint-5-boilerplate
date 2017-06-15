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
  cargarModal();
  $("#buscar").submit(buscarTema);
  $("#formAgregar").submit(agregarTema);
};

var cargarModal = function(){
  $('.modal').modal();
};

var cargarTemas = function () {
  $.getJSON(api.url, function (temas) {
    $listaTemas.html(" ");//Limpia la lista del html para mostrar el nuevo elemento creado
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
  // console.log(tarjetaTema);
  // Se agregan las tarjetas a la listaTemas
  $listaTemas.append(tarjetaTema);
};

var agregarTema = function (e) {
  // console.log("agregando Tema");
  e.preventDefault();
  var temaTitulo = $("#temaTitulo").val();
  var autor = $("#inputAutor").val()
  var contenido = $("#textArea").val();

  //petición AJAX
  $.post(api.url,{
    content: temaTitulo,
    author_name: autor
  },function (tema) {
    // console.log(temaTitulo + "/" + autor + "/" + contenido);
    $("#verModal").modal("close");
    cargarTemas();
  });
};

var buscarTema = function (e) {
  e.preventDefault();
  var temaBuscado = $("#search").val().toLowerCase();
  // var temasFiltrados = api.url
  //
  $.getJSON(api.url, function (temas) {
    $listaTemas.html(" ");
    var encontrado = temas.find(function (tema) {
      var resultado = tema.content.toLowerCase().indexOf(temaBuscado) >= 0;
      console.log(resultado);
      return resultado;
    });
    console.log(encontrado);
    crearTema(encontrado);
  });
  
  // $.getJSON(api.url, function (temas) {
  //   $listaTemas.html(" ");//Limpia la lista del html para mostrar el elemento buscado
  //   temas.forEach(function (tema) {
  //     var tema = tema.content;
  //     // console.log(tema);
  //     if (tema === temaBuscado) {
  //       console.log("encontrado");
  //     }
  //     else{
  //     console.log("no existe");
  //     }
  //   });
  // });

// crearTema();
};

$(document).ready(cargarPagina);
