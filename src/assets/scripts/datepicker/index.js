import * as $ from 'jquery';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker';
import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.it.min.js';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
import 'jquery-i18n-properties'
import moment from 'moment/src/moment';
// import { Array } from 'core-js';


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
 
  $( "#add_agendamento_busca_professional1" ).change(function() {
    agendamentoX(this.value,1);
  });

  $( "#add_agendamento_busca_professional2" ).change(function() {
    agendamentoX(this.value,2);
  });

  $( "#add_agendamento_busca_professional3" ).change(function() {
    agendamentoX(this.value,3);
  });

  $( "#add_agendamento_busca_professional4" ).change(function() {
    agendamentoX(this.value,4);
  });

  $( "#add_agendamento_busca_professional5" ).change(function() {
    agendamentoX(this.value,5);
  });







  $( "#edit_agendamento_busca_professional1" ).change(function() {
    agendamentoX(this.value,1);
  });

  $( "#edit_agendamento_busca_professional2" ).change(function() {
    agendamentoX(this.value,2);
  });

  $( "#edit_agendamento_busca_professional3" ).change(function() {
    agendamentoX(this.value,3);
  });

  $( "#edit_agendamento_busca_professional4" ).change(function() {
    agendamentoX(this.value,4);
  });

  $( "#edit_agendamento_busca_professional5" ).change(function() {
    agendamentoX(this.value,5);
  });
  console.log('data de hj : '+ new Date())
  
  
  function agendamentoX(recurso,number){
    // $('.start-date').val('').datepicker('update','');
    $('.start-date'+number).val('').datepicker('destroy')
    // $.getJSON("http://www.nav.farmina.com.br:3001/api/resourses/getRecursoAgendamento?recurso="+recurso, function(result) { 
      $.getJSON(urlX+"resourses/getRecursoAgendamento?Pais="+paisX+"&recurso="+recurso, function(result) { 
        // success: function(result){
        if(result.result.length > 0){
          console.log('entrou ' + result.result.length)
          var arrayData = [];
          let arrayDias = new Array()
          console.log('data de hj 2: '+ new Date())
          $.each( result.result, function( index, value ){
              var objDatas = {}
              var service_type =''
              var PlannedHours = $.i18n.prop('PlannedHours',lang)
              var EstimatedTime = $.i18n.prop('lEstimatedTime',lang)
              if(value['Service Type'] == 1){
                service_type =  $.i18n.prop('lTreinamento',lang)
              }else if(value['Service Type'] == 2){
                service_type =  $.i18n.prop('lKitBoasVindas',lang)
              }else if(value['Service Type'] == 3){
                service_type =  $.i18n.prop('lISP',lang)
              }else if(value['Service Type'] == 4){
                service_type =  $.i18n.prop('lMerchandising',lang)
              }else if(value['Service Type'] == 5){
                service_type =  $.i18n.prop('lArmy',lang)
              }

              var teste = value['Estimated Starting Date'].split("-");
              var dia = teste[2].split('T')
              var estimatedDate  = dia[0]+'/'+teste[1]+'/'+teste[0]
              // var estimatedDate  =  moment(value['Estimated Starting Date']).format("DD/MM/Y")
              console.log('**************entrouuu data')
              console.log(estimatedDate)
              console.log('**************datat certa')

              console.log(teste[0]+'-'+teste[1]+'-'+teste[2])
              console.log(value['Estimated Starting Date'])
              
              
              arrayData.push(estimatedDate + ' - '+ value['Service Invoice No_'] + ' - '+EstimatedTime+': ' + value['Estimated Starting Time'] + ' - '+ value['Estimated Finish Time'] +' - '+service_type)
              
              objDatas = estimatedDate;
              arrayDias.push(objDatas)

              $('.start-date'+number).datepicker({
                format: 'dd/mm/yyyy', 
                startDate: moment(new Date()).format("DD/MM/Y"),
                todayBtn: true,
                //defaultDate:+1,
                //firstDay: 1,
                //regional: "it" , 
                //language: "pt-BR",
                //orientation: "auto left",
                keyboardNavigation: false,
                autoclose: true,
                todayHighlight: true,
                
                beforeShowDay: function(date){
                  
                  var date  =  moment(date).format("DD/MM/Y")
                  var atual = new Date();
                  $('.datepicker-days').attr( "data-toggle", "tooltip" );

                  if(arrayDias.indexOf(date.trim()) > -1) {
                    // console.log(arrayData[arrayDias.indexOf(date)].split('-')[1]);
                    console.log(arrayData[arrayDias.indexOf(date)]);
                    return {
                      tooltip: arrayData[arrayDias.indexOf(date)],
                      classes: 'highlighted disabled',
                      
                      
                    };
                    
                  }
                  $('[data-toggle="tooltip"]').tooltip(); 
                },
                //datesDisabled: ['11/28/2018', '11/30/2018'],
                toggleActive: true
              })
              $('.start-date'+number).datepicker('update');
              

          })
        }else{
          console.log('nao encontrou')
          $('.start-date'+number).datepicker({
            format: 'dd/mm/yyyy', 
            // startDate: moment(new Date()).utc('America/Sao_Paulo').format("DD/MM/Y"),
            startDate: moment(new Date()).format("DD/MM/Y"),
            todayBtn: true,
            //locale: 'en-gb',
            //language: "pt-BR",
            //orientation: "auto left",
            keyboardNavigation: false,
            //daysOfWeekDisabled: "6",
            // daysOfWeekHighlighted: "6",
            //calendarWeeks: true,
            autoclose: true,
            todayHighlight: true,
            toggleActive: true
          });

        }  
        //alert('1')
        // $('[data-toggle="tooltip"]').on('click',function(){
        //   alert('1')
        // }); 
        $('[data-toggle="tooltip"]').tooltip(); 

        
    });
  }
  //$('.start-date').datepicker();
  $('.end-date').datepicker();
  
  

  // $('.highlighted').on("click","td", function() {
  //   alert('teste');
  //   //
  // })


}())
