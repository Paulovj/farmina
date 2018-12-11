import * as $ from 'jquery';
import 'datatables';
import 'bootstrap-notify'
import 'jquery-i18n-properties'

export default (function () {

  var lang = "en";
  if ((sessionStorage.Language != "") && (sessionStorage.Language != 'undefined')){
      lang = sessionStorage.Language
    }


  var paisX = sessionStorage.Pais
  var urlX = "";
  var urlImgX = ""
  if(paisX == "Brasil"){
    urlX = "http://www.nav.farmina.com.br:3001/api/";
    
  }else{
    urlX = "http://mkt.farmina.com:3001/api/"
  }
 

  $('#NRecurso').val(sessionStorage.No)
  $('#validationCustom01').val(sessionStorage.Name)
  $('#validationCustom02').val(sessionStorage.Email)
  $('#validationCustom03').val(sessionStorage.UF)
  $('#validationCustom04').val(sessionStorage.Language)


    $("#perfilRegistrar").click(function(){
      console.log('entrou na janela');
      var settings = {
        "async": true,
        "crossDomain": true,
        // "url": "http://www.nav.farmina.com.br:3001/api/resourses/getUpdateLanguage",
        "url": urlX+"resourses/getUpdateLanguage",
        "method": "POST",
        "headers": {
          "content-type": "application/x-www-form-urlencoded",
          "cache-control": "no-cache",
          "postman-token": "cbc5f035-bd06-e229-08db-b3866ff0fd0d"
        },
        "data": {        
          "Pais" : paisX,
          "NRecurso" :$("#NRecurso").val(),
          "Idioma"   :$("#validationCustom04").val()
        }
      }
  
        $.ajax(settings).done(function (response) {
          console.log(response)
          var notify = $.notify('<strong>Carregando idioma ....</strong>', {
            type: 'success',
            allow_dismiss: false,
            showProgressbar: true
          });
          sessionStorage.setItem("Language", $("#validationCustom04").val());
          setTimeout(Carregando, 5000);

        });
  
      });
      
      var Carregando = function(){
        window.location = "setting.html"; 
      };
  

}());    