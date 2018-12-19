import * as $ from 'jquery';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker';
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
  
          $.each( result.result, function( index, value ){
              var objDatas = {}
              var service_type =''
              var PlannedHours = $.i18n.prop('PlannedHours',lang)
              var EstimatedFinishTime = $.i18n.prop('lEstimatedFinishTime',lang)
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
              var estimatedDate  =  moment(value['Estimated Starting Date']).utc().format("DD/MM/Y")
              arrayData.push(estimatedDate + ' - '+ value['Service Invoice No_'] + ' - '+EstimatedFinishTime+': ' + value['Estimated Starting Time'] + ' - '+ value['Estimated Finish Time'] +' - '+service_type)
              objDatas = estimatedDate;
              arrayDias.push(objDatas)

              $('.start-date'+number).datepicker({
                format: 'dd/mm/yyyy', 
                // startDate: "27/11/2018",
                startDate: moment(new Date()).utc('America/Sao_Paulo').format("DD/MM/Y"),
                todayBtn: true,
                language: "pt-BR",
                //orientation: "auto left",
                keyboardNavigation: false,
                //daysOfWeekDisabled: "6",
                // daysOfWeekHighlighted: "6",
                //calendarWeeks: true,
                autoclose: true,
                todayHighlight: true,
                beforeShowDay: function(date){
            
                  var date  =  moment(date).utc().format("DD/MM/Y")
                  var atual = new Date();
                  var atualDate  =  moment(atual).utc('America/Sao_Paulo').format("DD/MM/Y")
                
                  if(arrayDias.indexOf(date.trim()) > -1) {
                    // console.log(arrayData[arrayDias.indexOf(date)].split('-')[1]);
                    console.log(arrayData[arrayDias.indexOf(date)]);
                    return {
                      tooltip: arrayData[arrayDias.indexOf(date)],
                      classes: 'disabled highlighted '
                    };
                  }
                },
                //datesDisabled: ['11/28/2018', '11/30/2018'],
                toggleActive: true
              });
              // $(".start-date").data("datepicker").fill()
              $('.start-date'+number).datepicker('update');
          });
        }else{
          console.log('nao encontrou')
          $('.start-date'+number).datepicker({
            format: 'dd/mm/yyyy', 
            startDate: moment(new Date()).utc('America/Sao_Paulo').format("DD/MM/Y"),
            todayBtn: true,
            language: "pt-BR",
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
    });
  }
  //$('.start-date').datepicker();
  $('.end-date').datepicker();


}())
