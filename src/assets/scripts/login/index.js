import * as $ from 'jquery';
import 'datatables';
import 'bootstrap-notify'
import 'jquery-i18n-properties'
//import * as Messages_fr from './../bundle/Messages_fr.properties'

export default (function () {

$("#btn_login").click(function(){
  var pais = $("#login_pais").val();
  var email = $("#login_email").val()
  var password = $("#loginPassword").val()
  var texto = "";
  var valid = 0

  if(pais =='0'){
    valid = '1';
    texto += 'Por favor selecione o <b>Pais</b> <br>'
  }
  if(email ==''){
    valid = '1';
    texto += 'Por favor preencha o <b>E-mail</b> <br>'
  }
  if(password ==''){
    valid = '1';
    texto += 'Por favor preencha a <b>Senha</b> <br>'
  }

  if(valid == 1){
    var notify = $.notify(texto, {
      type: 'warning',
      allow_dismiss: false,
      //showProgressbar: true
    });
    return false
  }



    console.log('entrou na janela');
    var data = new FormData();
    
    var url = "";
    if(pais == "Brasil"){
      url = "http://www.nav.farmina.com.br:3001/api/"
    }else{
      url = "http://mkt.farmina.com:3001/api/"
    }

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": url+"resourses/getResourseLogin",
      "method": "POST",
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        "postman-token": "cbc5f035-bd06-e229-08db-b3866ff0fd0d"
      },
      "data": {        
        "Pais" :pais,
        "Email":email,
        "Senha":password,
        
      }
    }

      $.ajax(settings).done(function (response) {
        

        var result = response.result[0];
        if(response.result.length > 0){  
          sessionStorage.setItem("Pais", pais);
          sessionStorage.setItem("Name", result['Name']);
          sessionStorage.setItem("Email", result['e-Mail']);
          sessionStorage.setItem("Type", result['Resource Type']);
          sessionStorage.setItem("No", result['No_']);
          sessionStorage.setItem("UF", result['Territory Code']);
          sessionStorage.setItem("Language", result['Language Code']);

          if (result['Resource Type'] == 0){
            window.location = "datatable.html"; 
          }else if(result['Resource Type'] == 1 || result['Resource Type'] == 2){
            window.location = "index.html"; 
          }
        }else if(response.result.length < 1){
          var notify = $.notify('Usuário ou Senha Inválido', {
            type: 'danger',
            allow_dismiss: false,
            //showProgressbar: true
          });

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
    var lang = "en";
    if (sessionStorage.Language != ""){
      lang = sessionStorage.Language
    }
    
    
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

        $('.lConsultaCliente').html($.i18n.prop('lConsultaCliente',lang))
        $('.lNomeCliente').html($.i18n.prop('lNomeCliente',lang))
        $('.lPhone').html($.i18n.prop('lPhone',lang))
        $('.lContato').html($.i18n.prop('lContato',lang))
        $('.lAddress').html($.i18n.prop('lAddress',lang))
        $('.lCidade').html($.i18n.prop('lCidade',lang))
        $('.lCep').html($.i18n.prop('lCep',lang))
        $('.lAddress2').html($.i18n.prop('lAddress2',lang))
        $('.lEnderecoCompleto').html($.i18n.prop('lEnderecoCompleto',lang))
        
        $('.lPromotor1').html($.i18n.prop('lPromotor1',lang))
        $('.lProfissional1').html($.i18n.prop('lProfissional1',lang))
        $('.lPromotor2').html($.i18n.prop('lPromotor2',lang))
        $('.lProfissional2').html($.i18n.prop('lProfissional2',lang))
        $('.lPromotor3').html($.i18n.prop('lPromotor3',lang))
        $('.lProfissional3').html($.i18n.prop('lProfissional3',lang))
        $('.lPromotor4').html($.i18n.prop('lPromotor4',lang))
        $('.lProfissional4').html($.i18n.prop('lProfissional4',lang))
        $('.lPromotor5').html($.i18n.prop('lPromotor5',lang))
        $('.lProfissional5').html($.i18n.prop('lProfissional5',lang))

        $('.lDataPlanejada').html($.i18n.prop('lDataPlanejada',lang))
        $('.lHoraPlanejada').html($.i18n.prop('lHoraPlanejada',lang))
        $('.lTipoServico').html($.i18n.prop('lTipoServico',lang))
        $('.lRegistrar').html($.i18n.prop('lRegistrar',lang))
        $('.lCancelar').html($.i18n.prop('lCancelar',lang))
        $('.lSelecione').html($.i18n.prop('lSelecione',lang))
        $('.lTreinamento').html($.i18n.prop('lTreinamento',lang))
        $('.lKitBoasVindas').html($.i18n.prop('lKitBoasVindas',lang))
        $('.lISP').html($.i18n.prop('lISP',lang))
        $('.lMerchandising').html($.i18n.prop('lMerchandising',lang))
        $('.lArmy').html($.i18n.prop('lArmy',lang))
        
        



        /* Datatable */
        $('.lDataInicioEstimativa').html($.i18n.prop('lDataInicioEstimativa',lang))
        $('.lDataInicio').html($.i18n.prop('lDataInicio',lang))
        $('.lHoraInicio').html($.i18n.prop('lHoraInicio',lang))
        $('.lDataFinal').html($.i18n.prop('lDatafinal',lang))
        $('.lHoraFinal').html($.i18n.prop('lHoraFinal',lang))
        $('.lFuncoes').html($.i18n.prop('lFuncoes',lang))
        
        $('.lEnviarFoto').html($.i18n.prop('lEnviarFoto',lang))
        $('.lImages').html($.i18n.prop('lImages',lang))
        $('.lFinalzarServico').html($.i18n.prop('lFinalzarServico',lang))
        
        $('.lFinalzarServicoAgendado').html($.i18n.prop('lFinalzarServicoAgendado',lang))
        $('.lFuncao').html($.i18n.prop('lFuncao',lang))
        $('.lNRecurso').html($.i18n.prop('lNRecurso',lang))
        $('.lObservacaoInicial').html($.i18n.prop('lObservacaoInicial',lang))

        $('.lFinalizar').html($.i18n.prop('lFinalizar',lang))
        $('.lIdioma').html($.i18n.prop('lIdioma',lang))
        $('.lBuscaCliente').html($.i18n.prop('lBuscaCliente',lang))
        $('.lStatusControle').html($.i18n.prop('lStatusControle',lang))


        $('.lMerchadisingMenssage').html($.i18n.prop('lMerchadisingMenssage',lang))
        $('.larmyMenssage').html($.i18n.prop('larmyMenssage',lang))
        $('.lISPMenssage').html($.i18n.prop('lISPMenssage',lang))
        $('.ltrainningMenssage').html($.i18n.prop('ltrainningMenssage',lang))
        $('.lFood').html($.i18n.prop('lFood',lang))
        $('.lTrainningType').html($.i18n.prop('lTrainningType',lang))
        $('.lTrainningComments').html($.i18n.prop('lTrainningComments',lang))
        $('.lPushNewLine').html($.i18n.prop('lPushNewLine',lang))
        $('.lLineSlowComments').html($.i18n.prop('lLineSlowComments',lang))

        $('.lDry').html($.i18n.prop('lDry',lang))
        $('.lWet').html($.i18n.prop('lWet',lang))
        $('.lRefreshment').html($.i18n.prop('lRefreshment',lang))
        $('.lNewlineStore').html($.i18n.prop('lNewlineStore',lang))
        
        
        $('.lEntregue').html($.i18n.prop('lEntregue',lang))
        $('.lQuantosClientesEntraramNaLoja').html($.i18n.prop('lQuantosClientesEntraramNaLoja',lang))
        $('.lQuantosComprovantesForamEntregues').html($.i18n.prop('lQuantosComprovantesForamEntregues',lang))
        $('.lQuantosProdutosForamVendidos').html($.i18n.prop('lQuantosProdutosForamVendidos',lang))
        $('.lQuantosKitsForamEntregues').html($.i18n.prop('lQuantosKitsForamEntregues',lang))
        $('.lQuantosPlanosNacionaisForamGerados').html($.i18n.prop('lQuantosPlanosNacionaisForamGerados',lang))
        $('.lQuantasSacolasdeComidaSecaVoceVendeu').html($.i18n.prop('lQuantasSacolasdeComidaSecaVoceVendeu',lang))
        $('.lQuantasLatasVoceVendeu').html($.i18n.prop('lQuantasLatasVoceVendeu',lang))
        $('.lQuantosKhVendeuAberto').html($.i18n.prop('lQuantosKhVendeuAberto',lang))
        $('.lNumeroPrateleirasProdutosFarmina').html($.i18n.prop('lNumeroPrateleirasProdutosFarmina',lang))
        $('.lConseguiuColocarProdutoFarminaPosicaoMelhor').html($.i18n.prop('lConseguiuColocarProdutoFarminaPosicaoMelhor',lang))
        $('.lConseguiuEspacoProduto').html($.i18n.prop('lConseguiuEspacoProduto',lang))
        $('.lConseguiuEspacoAdicionalForaPrateleira').html($.i18n.prop('lConseguiuEspacoAdicionalForaPrateleira',lang))
        $('.lQuantosMedidoresAdicionais').html($.i18n.prop('lQuantosMedidoresAdicionais',lang))
        $('.lImplementouCampanhaAdesivoSazonal').html($.i18n.prop('lImplementouCampanhaAdesivoSazonal',lang))
        $('.lImplementouMarca').html($.i18n.prop('lImplementouMarca',lang))
        $('.lCampanhaAdesivoSazonal').html($.i18n.prop('lCampanhaAdesivoSazonal',lang))

        $('.lHowManyPeopleSpoke').html($.i18n.prop('lHowManyPeopleSpoke',lang))
        $('.lHowManyDrySamples').html($.i18n.prop('lHowManyDrySamples',lang))
        $('.lHowManyWetSamples').html($.i18n.prop('lHowManyWetSamples',lang))
        $('.lHowManyKitDelivered').html($.i18n.prop('lHowManyKitDelivered',lang))
        $('.lPrintVoruchers').html($.i18n.prop('lPrintVoruchers',lang))
        $('.lHowManyPeopleRefused').html($.i18n.prop('lHowManyPeopleRefused',lang))
        $('.lLocationOfActivity').html($.i18n.prop('lLocationOfActivity',lang))
        
        
        
        

        
        
        
      }
    });

}());    