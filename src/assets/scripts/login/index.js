import * as $ from 'jquery';
import 'datatables';
import 'bootstrap-notify'
import 'jquery-i18n-properties'
//import * as Messages_fr from './../bundle/Messages_fr.properties'

export default (function () {

  if(window.location.pathname == '/index.html'){
    window.location = "ordem.html"; 
  }

  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  $(".NumberPositivo").keydown(function(e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode == 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (e.keyCode == 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (e.keyCode == 88 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  });

  

$("#btn_login").click(function(){
  var pais = $("#login_pais").val();
  var email = $("#login_email").val()
  var password = $("#loginPassword").val()
  var texto = "";
  var valid = 0

  if(pais =='0'){
    valid = '1';
    texto += $.i18n.prop('lPais',lang)  + ' ' + $.i18n.prop('lCampoObrigatorio',lang) +' <br>' 
  }
  if(email ==''){
    valid = '1';
    texto += $.i18n.prop('lEmail',lang) + ' ' + $.i18n.prop('lCampoObrigatorio',lang) +' <br>' 
  }
  if(password ==''){
    valid = '1';
    texto += $.i18n.prop('lPassword',lang) + ' ' + $.i18n.prop('lCampoObrigatorio',lang) +' <br>' 
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
          var country = "";
           if(pais =="Brasil"){
            country = "BR"
           }
           if(pais =="Italia"){
            country = "IT"
           }
           if(pais =="Usa"){
            country = "US"
           }
           if(pais =="Servia"){
            country = "SE"
           }
           if(pais =="Polonia"){
            country = "PL"
           }
          sessionStorage.setItem("Pais", pais);
          sessionStorage.setItem("Country", country);
          sessionStorage.setItem("Name", result['Name']);
          sessionStorage.setItem("Email", result['e-Mail']);
          sessionStorage.setItem("Type", result['Resource Type']);
          sessionStorage.setItem("No", result['No_']);
          sessionStorage.setItem("UF", result['Territory Code']);
          sessionStorage.setItem("Language", result['Language Code']);
          sessionStorage.setItem("PermissaoEdit", result['Can Edit Order']);
          
          sessionStorage.setItem("LimitDaysWelcomeKit", result['Limit Days Before Wellcome Kit']);
          sessionStorage.setItem("LimitDaysTraining", result['Limit Days Before Training']);
          sessionStorage.setItem("LimitDaysISP", result['Limit Days Before ISP']);
          sessionStorage.setItem("LimitDaysMerchand", result['Limit Days Before Merchand']);
          sessionStorage.setItem("LimitDaysArmy", result['Limit Days Before Army']);
          
          window.location = "datatable.html"; 
          
        }else if(response.result.length < 1){
          var notify = $.notify('Usuário ou Senha Inválido', {
            type: 'danger',
            allow_dismiss: false,
            //showProgressbar: true
          });

        }  

        
      });

    });
    console.log(sessionStorage)
    if (sessionStorage.length > 0) {
      $('.lbl_login').text(sessionStorage.Name)
      $('#menu_index').hide();
      //$('.lbl_login').text(sessionStorage.Type)
      console.log('Nome login:' + sessionStorage.Name)
      console.log('Resource Type:' + sessionStorage.Type)
      if (sessionStorage.Type ==2 || sessionStorage.Type ==3){
        $('#menu_index').hide();
        //$('#menu_ordem_agendameno').hide();
        //if(window.location.pathname == '/index.html' || window.location.pathname == '/ordem.html'){
          //window.location = "datatable.html"; 
        }else if ( sessionStorage.Type ==4){
          $('#menu_index').hide();
          $('#menu_ordem_agendameno').hide();
          // $('.PermissaoTraning').hide();
          // $('.PermissaoWelcome').hide();
          // $('.PermissaoMerchandising').hide();
          //if(window.location.pathname == '/index.html' || window.location.pathname == '/ordem.html'){
            //window.location = "datatable.html"; 
          

        }
      
      } else {
       if(window.location.pathname != '/signin.html'){
         window.location = "signin.html"; 
       }
        console.log('Nao Logado********************************')
      }

    //Validação SOS 
    if(sessionStorage.Type == 3){
      $('.PermissaoSOS').hide();
    }
    
    var lang = "en";
    if (sessionStorage.Language){
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
        $('.lTypeFood').html($.i18n.prop('lTypeFood',lang))
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
        
        $('.lSim').html($.i18n.prop('lSim',lang))
        $('.lNao').html($.i18n.prop('lNao',lang))
        $('.lYes').html($.i18n.prop('lYes',lang))
        $('.lNo').html($.i18n.prop('lNo',lang))
        $('.lPalletSpace').html($.i18n.prop('lPalletSpace',lang))
        $('.lCartonShelf').html($.i18n.prop('lCartonShelf',lang))
        $('.lOtherDisplay').html($.i18n.prop('lOtherDisplay',lang))
        $('.lWinter').html($.i18n.prop('lWinter',lang))
        $('.lChristmas').html($.i18n.prop('lChristmas',lang))
        $('.lValentineDay').html($.i18n.prop('lValentineDay',lang))
        $('.lSpring').html($.i18n.prop('lSpring',lang))
        $('.lWomansDay').html($.i18n.prop('lWomansDay',lang))
        $('.lHalloween').html($.i18n.prop('lHalloween',lang))
        $('.FullBranding').html($.i18n.prop('FullBranding',lang))
        $('.OpenBranding').html($.i18n.prop('OpenBranding',lang))
        $('.lHowManyPeopleSpoke').html($.i18n.prop('lHowManyPeopleSpoke',lang))
        $('.lHowManyDrySamplesYouGave').html($.i18n.prop('lHowManyDrySamplesYouGave',lang))
        $('.lHowManyWetSamplesYouGave').html($.i18n.prop('lHowManyWetSamplesYouGave',lang))
        $('.lHowManyKitsYouDelivered').html($.i18n.prop('lHowManyKitsYouDelivered',lang))
        $('.lHowManyPrintVouchersYouGave').html($.i18n.prop('lHowManyPrintVouchersYouGave',lang))
        $('.lHowManyPeopleRefusedToSpeakWithYou').html($.i18n.prop('lHowManyPeopleRefusedToSpeakWithYou',lang))
        $('.lLocationOfActivity').html($.i18n.prop('lLocationOfActivity',lang))
        $('.lPais').html($.i18n.prop('lPais',lang))
        $('.lBrazil').html($.i18n.prop('lBrazil',lang))
        $('.lItaly').html($.i18n.prop('lItaly',lang))
        $('.lUnitedState').html($.i18n.prop('lUnitedState',lang))
        $('.lPromoting').html($.i18n.prop('lPromoting',lang))
        $('.lPromotingNewLine').html($.i18n.prop('lPromotingNewLine',lang))
        $('.lPromotingExistingLine').html($.i18n.prop('lPromotingExistingLine',lang))
        $('.lThisStoreIsSellingOpenBags').html($.i18n.prop('lThisStoreIsSellingOpenBags',lang))
        $('.lGeneralNutrition').html($.i18n.prop('lGeneralNutrition',lang))
        $('.lHowManyMetersOfFarminaShelves').html($.i18n.prop('lHowManyMetersOfFarminaShelves',lang))
        $('.lQualTipoMarca').html($.i18n.prop('lQualTipoMarca',lang))
        $('.lViewReportActivity').html($.i18n.prop('lViewReportActivity',lang))
        $('.lEspacoAdicionalPara').html($.i18n.prop('lEspacoAdicionalPara',lang))
        
        $('.lForSpecificStore').html($.i18n.prop('lForSpecificStore',lang))
        $('.lInWhicPark').html($.i18n.prop('lInWhicPark',lang))
        $('.lHowManyPeopleParticipate').html($.i18n.prop('lHowManyPeopleParticipate',lang))
        $('.lViewOrder').html($.i18n.prop('lViewOrder',lang))

        $('.lSummer').html($.i18n.prop('lSummer',lang))
        $('.lAutumn').html($.i18n.prop('lAutumn',lang))
        $('.lEstimatedFinishTime').html($.i18n.prop('lEstimatedFinishTime',lang))
        $('.lEstimatedStartTime').html($.i18n.prop('lEstimatedStartTime',lang))
        $('.lDryWet').html($.i18n.prop('lDryWet',lang))

        $('.lPortugues').html($.i18n.prop('lPortugues',lang))
        $('.lIngles').html($.i18n.prop('lIngles',lang))
        $('.lItaliano').html($.i18n.prop('lItaliano',lang))
        
        $('.lLocation').html($.i18n.prop('lLocation',lang))
        
        $('.lEdit').html($.i18n.prop('lEdit',lang))
        
        
        $('.lTotalCustomers').html($.i18n.prop('lTotalCustomers',lang))
        $('.lTotalProfissionals').html($.i18n.prop('lTotalProfissionals',lang))
        $('.lTotalScheduling').html($.i18n.prop('lTotalScheduling',lang))
        $('.lTotalSchedulingActive').html($.i18n.prop('lTotalSchedulingActive',lang))
        $('.lProfissionalStats').html($.i18n.prop('lProfissionalStats',lang))
        $('.lCalendarReport').html($.i18n.prop('lCalendarReport',lang))
        $('.lOctober2018').html($.i18n.prop('lOctober2018',lang))
        $('.lCustomer').html($.i18n.prop('lCustomer',lang))
        $('.lProfessionals').html($.i18n.prop('lProfessionals',lang))
        $('.lFunction').html($.i18n.prop('lFunction',lang))
        
        $('.lUpload').html($.i18n.prop('lUpload',lang))
        $('.lUploadBefore').html($.i18n.prop('lUploadBefore',lang))
        $('.lUploadAfter').html($.i18n.prop('lUploadAfter',lang))
        $('.lSchedulingThisMonth').html($.i18n.prop('lSchedulingThisMonth',lang))
        
        
        $('.lConsultaClienteNav').html($.i18n.prop('lConsultaClienteNav',lang))
        $('.lPlannedStartTime').html($.i18n.prop('lPlannedStartTime',lang))

        $('.lNumberOfWorkersToTrain').html($.i18n.prop('lNumberOfWorkersToTrain',lang))
        $('.lProjector').html($.i18n.prop('lProjector',lang))
        $('.lBuffet').html($.i18n.prop('lBuffet',lang))
        $('.lPolonia').html($.i18n.prop('lPolonia',lang))
        $('.lItem').html($.i18n.prop('lItem',lang))
        $('.lselecioneRecurso').html($.i18n.prop('lselecioneRecurso',lang))
        $('.lWithHowManyPeopleYouSpoke').html($.i18n.prop('lWithHowManyPeopleYouSpoke',lang))

        $('.lLegendFull').html($.i18n.prop('lLegendFull',lang))
        $('.lLegendNotFull').html($.i18n.prop('lLegendNotFull',lang))
        $('.lLimitDaysBeforeWellcomeKit').html($.i18n.prop('lLimitDaysBeforeWellcomeKit',lang))
        $('.lLimitDaysBeforeTraining').html($.i18n.prop('lLimitDaysBeforeWellcomeKit',lang))
        $('.lLimitDaysBeforeISP').html($.i18n.prop('lLimitDaysBeforeISP',lang))
        $('.lLimitDaysBeforeMerchand').html($.i18n.prop('lLimitDaysBeforeMerchand',lang))
        $('.lLimitDaysBeforeArmy').html($.i18n.prop('lLimitDaysBeforeArmy',lang))
        $('.lLegend').html($.i18n.prop('lLegend',lang))
        $('.lCountry').html($.i18n.prop('lCountry',lang))
        
        

        

        

        




        
        
        
                
      }
    });

      
      $( ".maxNumber" ).change(function() {
        var max = parseInt($(this).attr('max'));
        var min = parseInt($(this).attr('min'));
        if ($(this).val() > max)
        {
            $(this).val(max);
        }
        else if ($(this).val() < min)
        {
            $(this).val(min);
        }       
      }); 


      // $(".js-example-tags").select2({
      //   tags: true
      // });


      $.extend( jQuery.fn.dataTableExt.oSort, {
        "date-eu-pre": function ( date ) {
          date = date.replace(" ", "");
          
          if ( ! date ) {
            return 0;
          }
      
          var year;
          var eu_date = date.split(/[\.\-\/]/);
      
          /*year (optional)*/
          if ( eu_date[2] ) {
            year = eu_date[2];
          }
          else {
            year = 0;
          }
      
          /*month*/
          var month = eu_date[1];
          if ( month.length == 1 ) {
            month = 0+month;
          }
      
          /*day*/
          var day = eu_date[0];
          if ( day.length == 1 ) {
            day = 0+day;
          }
      
          return (year + month + day) * 1;
        },
      
        "date-eu-asc": function ( a, b ) {
          return ((a < b) ? -1 : ((a > b) ? 1 : 0));
        },
      
        "date-eu-desc": function ( a, b ) {
          return ((a < b) ? 1 : ((a > b) ? -1 : 0));
        }
      } );


      
      
      
   

}());    