import * as $ from 'jquery';
import 'datatables';
import 'bootstrap-notify'

export default (function () {

$("#btn_login").click(function(){
    console.log('entrou na janela');
    var data = new FormData();
    
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://www.nav.farmina.com.br:3001/api/resourses/getResourseLogin",
      "method": "POST",
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        "postman-token": "cbc5f035-bd06-e229-08db-b3866ff0fd0d"
      },
      "data": {        
        "Email"   :$("#login_email").val(),
        "Senha"   :$("#loginPassword").val(),
        
      }
    }

      $.ajax(settings).done(function (response) {
        var result = response.result[0];
        console.log(response.result[0]);        
        sessionStorage.setItem("Name", result['Name']);
        sessionStorage.setItem("Email", result['e-Mail']);
        sessionStorage.setItem("Type", result['Resource Type']);

        if (result['Resource Type'] == 0){
          window.location = "ordem.html"; 
        }else if(result['Resource Type'] == 1){
          window.location = "index.html"; 
        }

        
      });

    });

    if (sessionStorage.length > 0) {
      $('.lbl_login').text(sessionStorage.Name)
      console.log('Nome login' + sessionStorage)
      console.log('Nome login' + sessionStorage.Name)
      console.log('Logado********************************')
      } else {
       if(window.location.pathname != '/signin.html'){
         window.location = "signin.html"; 
       }
        console.log('Nao Logado********************************')
      }
    
    console.log(sessionStorage)

}());    