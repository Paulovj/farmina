import * as $ from 'jquery';
import 'datatables';
import 'bootstrap-notify'
import 'jquery-i18n-properties'
//import * as Messages_fr from './../bundle/Messages_fr.properties'

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
        sessionStorage.setItem("No", result['No_']);
        sessionStorage.setItem("UF", result['Territory Code']);
        


        if (result['Resource Type'] == 0){
          window.location = "datatable.html"; 
        }else if(result['Resource Type'] == 1 || result['Resource Type'] == 2){
          window.location = "index.html"; 
        }

        
      });

    });

    if (sessionStorage.length > 0) {
      $('.lbl_login').text(sessionStorage.Name)
      //$('.lbl_login').text(sessionStorage.Type)
      console.log('Nome login:' + sessionStorage.Name)
      if (sessionStorage.Type ==0){
        $('#menu_index').hide();
        $('#menu_ordem_agendameno').hide();
        if(window.location.pathname == '/index.html' || window.location.pathname == '/ordem.html'){
          window.location = "datatable.html"; 
        }
      }
      
      } else {
       if(window.location.pathname != '/signin.html'){
         window.location = "signin.html"; 
       }
        console.log('Nao Logado********************************')
      }
    
    console.log(sessionStorage)
    //$('#lLogin').html('TESTE 45454')

    var lang ='';
    $.i18n.properties({
       name: 'Messages',
       path: './',
       mode: 'both',
       language: lang,
       callback: function() {
        console.log('************dentro do callback*******************************')
        //console.log($.i18n.prop('llogin',lang))

        /* Login */
        $('.lLogin').html($.i18n.prop('llogin',lang))
        $('.lEmail').html($.i18n.prop('lEmail',lang))
        $('.lPassword').html($.i18n.prop('lPassword',lang))
        $('.lRemember').html($.i18n.prop('lRemember',lang))
        
        /* Ordem de agendamento */
        $('.lDashboard').html($.i18n.prop('lDashboard',lang))
        $('.lOrdemAgendamento').html($.i18n.prop('lOrdemAgendamento',lang))
        $('.lServicoAgendado').html($.i18n.prop('lServicoAgendado',lang))
        $('.lSetting').html($.i18n.prop('lSetting',lang))
        $('.lLogout').html($.i18n.prop('lLogout',lang))
        $('.lNovaOrdemAgendamento').html($.i18n.prop('lNovaOrdemAgendamento',lang))
        
        $('.lDocumenttType').html($.i18n.prop('lDocumenttType',lang));
        $('.lSalespersonCode').html($.i18n.prop('lSalespersonCode',lang));
        $('.lBillToAddress').html($.i18n.prop('lBillToAddress',lang));
        $('.lNServico').html($.i18n.prop('lNServico',lang));
        $('.lStatus').html($.i18n.prop('lStatus',lang));
        $('.lDataPedido').html($.i18n.prop('lDataPedido',lang));
        $('.lHoraPedido').html($.i18n.prop('lHoraPedido',lang));
        $('.lNCliente').html($.i18n.prop('lNCliente',lang));
        $('.lName').html($.i18n.prop('lName',lang));
        $('.lProfissional').html($.i18n.prop('lProfissional',lang));
        $('.lNomeProfissional').html($.i18n.prop('lNomeProfissional',lang));
        
      }
    });

}());    