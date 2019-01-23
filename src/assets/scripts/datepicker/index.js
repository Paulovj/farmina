import * as $ from 'jquery';
// import 'bootstrap-datepicker/dist/js/bootstrap-datepicker';
// import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.it.min.js';
// import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
import 'bootstrap-notify'
import 'jquery-i18n-properties'
import moment from 'moment/src/moment';
// import { Array } from 'core-js';


export default (function () {
  var max = 8

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
    edit_agendamentoX(this.value,1);
  });

  $( "#edit_agendamento_busca_professional2" ).change(function() {
    edit_agendamentoX(this.value,2);
  });

  $( "#edit_agendamento_busca_professional3" ).change(function() {
    edit_agendamentoX(this.value,3);
  });

  $( "#edit_agendamento_busca_professional4" ).change(function() {
    edit_agendamentoX(this.value,4);
  });

  $( "#edit_agendamento_busca_professional5" ).change(function() {
    edit_agendamentoX(this.value,5);
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
          var texte = ""
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


              // arrayData.push(estimatedDate + ' - '+ value['Service Invoice No_'] + ' - '+EstimatedTime+': ' + value['Estimated Starting Time'] + ' - '+ value['Estimated Finish Time'] +' - '+service_type)
              arrayData.push(value['Horas'])



              objDatas = estimatedDate;
              arrayDias.push(objDatas)



              $('.start-date'+number).datepicker({
                format: 'dd/mm/yyyy',
                // startDate: moment(new Date()).format("DD/MM/Y"),
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
                    // console.log('click', arrayData[arrayDias.indexOf(date)]);
                    if(arrayData[arrayDias.indexOf(date)] >=8){
                      return {
                        //tooltip: arrayData[arrayDias.indexOf(date)],
                        // tooltip: '',
                        classes: 'highlighted',
                      };
                    }else{
                      return {
                        //tooltip: arrayData[arrayDias.indexOf(date)],
                        // tooltip: '',
                        // classes: 'highlighted disabled',
                        classes: 'event',
                      };
                    }  

                  }
                  $('[data-toggle="tooltip"]').tooltip();
                },
                //datesDisabled: ['11/28/2018', '11/30/2018'],
                toggleActive: true
              })
              $('.start-date'+number).datepicker('update');

              // $(".start-date1 .datepicker-days td.day").click(function(){
              //   alert('day clicked');
              // });
              // $(".start-date1").on("datepicker-days", function() {
              //   alert('calendar icon clicked221454545');
              // });


          })

        }else{
         // console.log('nao encontrou')
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
  var arrayValidaHora1=[]
  var arrayValidaHora2=[]
  var arrayValidaHora3=[]
  var arrayValidaHora4=[]
  var arrayValidaHora5=[]



  $('.start-date1').datepicker().on('changeDate', function(ev){
    var now = moment(new Date(), "YYYY-MM-DD")
    var data = moment(new Date(ev.date), "YYYY-MM-DD")
    var dataparam = moment(new Date(ev.date)).format("Y-MM-DD")
    var calculo = moment.duration(data.diff(now)).asDays();
    var recurso = $('#add_agendamento_busca_professional1').val()
    if(calculo <= -1 ){
      $.getJSON(urlX+"resourses/getRecursoAgendamentoWhere?Pais="+paisX+"&recurso="+recurso+"&data="+dataparam, function(result) {
        if(result.result.length > 0){
          // alert('existe algo :::')
          $.each( result.result, function( index, value ){
            var service_type =''
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
            alert(estimatedDate + ' - '+ value['Service Invoice No_'] + ' - '+EstimatedTime+': ' + value['Estimated Starting Time'] + ' - '+ value['Estimated Finish Time'] +' - '+service_type)
            // alert('Entrou certo')
            $('.start-date1').val('');

            $('#add_agendamento_planned_start_time1').attr('disabled',true)
            $('#add_agendamento_planned_hour1').attr('disabled',true)
            $('#add_agendamento_planned_hour1').attr('max',max)
          })

        }else{
          //alert('nao existe algo::::')
          arrayValidaHora1 = []
          $('.start-date1').val('');
          $('#add_agendamento_planned_start_time1').attr('disabled',true)
          $('#add_agendamento_planned_hour1').attr('disabled',true)
          $('#add_agendamento_planned_hour1').attr('max',max)
        }
      })

    }else if( calculo > -1){
      $.getJSON(urlX+"resourses/getRecursoAgendamentoWhere?Pais="+paisX+"&recurso="+recurso+"&data="+dataparam, function(result) {
        if(result.result.length > 0){
          // alert('existe algo :::')
          var msg =""
          var hhmm = 0
          arrayValidaHora1 = [];
          $.each( result.result, function( index, value ){
            var service_type =''
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
              msg += estimatedDate + ' - '+ value['Service Invoice No_'] + ' - '+EstimatedTime+': ' + value['Estimated Starting Time'] + ' - '+ value['Estimated Finish Time'] +' - '+service_type +'\n'

              var hour_inicio = value['Estimated Starting Time'];
              var hour_fim = value['Estimated Finish Time'];

              arrayValidaHora1.push({'hora_ini':hour_inicio, 'hora_fim':hour_fim})

              const segent = (hmToMins(value['Estimated Starting Time']))
              const segsai = (hmToMins(value['Estimated Finish Time']))

               const diff = segsai - segent;
               hhmm = hhmm + diff/60
                // alert(hhmm)
          })
          var resta = max-hhmm
          // alert(msg+"restam:"+ (resta) +' horas')
          alert(msg)

          if(resta > 0){
          $('#add_agendamento_planned_start_time1').attr('disabled',false)
          $('#add_agendamento_planned_hour1').attr('disabled',false)
          $('#add_agendamento_planned_hour1').attr('max',resta)
           console.log(arrayValidaHora1);
          }else{
            $('#add_agendamento_planned_start_time1').attr('disabled',true)
            $('#add_agendamento_planned_hour1').attr('disabled',true)
          }
          
          // alert('Total:'+resta)
        }else{
          //alert('nao existe algo::::')
          arrayValidaHora1 = []
          $('#add_agendamento_planned_start_time1').attr('disabled',false)
          $('#add_agendamento_planned_hour1').attr('disabled',false)
          $('#add_agendamento_planned_hour1').attr('max',max)
        }
      })


      //getRecursoAgendamentoWhere
    }


  })


  $('.start-date2').datepicker().on('changeDate', function(ev){
    var now = moment(new Date(), "YYYY-MM-DD")
    var data = moment(new Date(ev.date), "YYYY-MM-DD")
    var dataparam = moment(new Date(ev.date)).format("Y-MM-DD")
    var calculo = moment.duration(data.diff(now)).asDays();
    var recurso = $('#add_agendamento_busca_professional2').val()
    if(calculo <= -1 ){
      $.getJSON(urlX+"resourses/getRecursoAgendamentoWhere?Pais="+paisX+"&recurso="+recurso+"&data="+dataparam, function(result) {
        if(result.result.length > 0){
          // alert('existe algo :::')
          $.each( result.result, function( index, value ){
            var service_type =''
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
            alert(estimatedDate + ' - '+ value['Service Invoice No_'] + ' - '+EstimatedTime+': ' + value['Estimated Starting Time'] + ' - '+ value['Estimated Finish Time'] +' - '+service_type)
            // alert('Entrou certo')
            $('.start-date2').val('');

            $('#add_agendamento_planned_start_time2').attr('disabled',true)
            $('#add_agendamento_planned_hour2').attr('disabled',true)
            $('#add_agendamento_planned_hour2').attr('max',max)
          })

        }else{
          //alert('nao existe algo::::')
          arrayValidaHora2 = []
          $('.start-date2').val('');
          $('#add_agendamento_planned_start_time2').attr('disabled',true)
          $('#add_agendamento_planned_hour2').attr('disabled',true)
          $('#add_agendamento_planned_hour2').attr('max',max)
        }
      })

    }else if( calculo > -1){
      $.getJSON(urlX+"resourses/getRecursoAgendamentoWhere?Pais="+paisX+"&recurso="+recurso+"&data="+dataparam, function(result) {
        if(result.result.length > 0){
          // alert('existe algo :::')
          var msg =""
          var hhmm = 0
          arrayValidaHora1 = [];
          $.each( result.result, function( index, value ){
            var service_type =''
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
              msg += estimatedDate + ' - '+ value['Service Invoice No_'] + ' - '+EstimatedTime+': ' + value['Estimated Starting Time'] + ' - '+ value['Estimated Finish Time'] +' - '+service_type +'\n'

              var hour_inicio = value['Estimated Starting Time'];
              var hour_fim = value['Estimated Finish Time'];

              arrayValidaHora2.push({'hora_ini':hour_inicio, 'hora_fim':hour_fim})

              const segent = (hmToMins(value['Estimated Starting Time']))
              const segsai = (hmToMins(value['Estimated Finish Time']))

               const diff = segsai - segent;
               hhmm = hhmm + diff/60
                // alert(hhmm)
          })
          var resta = max-hhmm
          // alert(msg+"restam:"+ (resta) +' horas')
          alert(msg)
          if(resta > 0){
          $('#add_agendamento_planned_start_time2').attr('disabled',false)
          $('#add_agendamento_planned_hour2').attr('disabled',false)
          $('#add_agendamento_planned_hour2').attr('max',resta)
           console.log(arrayValidaHora2);
          }else{
            $('#add_agendamento_planned_start_time2').attr('disabled',true)
            $('#add_agendamento_planned_hour2').attr('disabled',true)
          }
          //alert('Total:'+hhmm)
        }else{
          //alert('nao existe algo::::')
          arrayValidaHora1 = []
          $('#add_agendamento_planned_start_time2').attr('disabled',false)
          $('#add_agendamento_planned_hour2').attr('disabled',false)
          $('#add_agendamento_planned_hour2').attr('max',max)
        }
      })


      //getRecursoAgendamentoWhere
    }


  })

  $('.start-date3').datepicker().on('changeDate', function(ev){
    var now = moment(new Date(), "YYYY-MM-DD")
    var data = moment(new Date(ev.date), "YYYY-MM-DD")
    var dataparam = moment(new Date(ev.date)).format("Y-MM-DD")
    var calculo = moment.duration(data.diff(now)).asDays();
    var recurso = $('#add_agendamento_busca_professional3').val()
    if(calculo <= -1 ){
      $.getJSON(urlX+"resourses/getRecursoAgendamentoWhere?Pais="+paisX+"&recurso="+recurso+"&data="+dataparam, function(result) {
        if(result.result.length > 0){
          // alert('existe algo :::')
          $.each( result.result, function( index, value ){
            var service_type =''
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
            alert(estimatedDate + ' - '+ value['Service Invoice No_'] + ' - '+EstimatedTime+': ' + value['Estimated Starting Time'] + ' - '+ value['Estimated Finish Time'] +' - '+service_type)
            // alert('Entrou certo')
            $('.start-date3').val('');

            $('#add_agendamento_planned_start_time3').attr('disabled',true)
            $('#add_agendamento_planned_hour3').attr('disabled',true)
            $('#add_agendamento_planned_hour3').attr('max',max)
          })

        }else{
          //alert('nao existe algo::::')
          arrayValidaHora3 = []
          $('.start-date3').val('');
          $('#add_agendamento_planned_start_time3').attr('disabled',true)
          $('#add_agendamento_planned_hour3').attr('disabled',true)
          $('#add_agendamento_planned_hour3').attr('max',max)
        }
      })

    }else if( calculo > -1){
      $.getJSON(urlX+"resourses/getRecursoAgendamentoWhere?Pais="+paisX+"&recurso="+recurso+"&data="+dataparam, function(result) {
        if(result.result.length > 0){
          // alert('existe algo :::')
          var msg =""
          var hhmm = 0
          arrayValidaHora3 = [];
          $.each( result.result, function( index, value ){
            var service_type =''
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
              msg += estimatedDate + ' - '+ value['Service Invoice No_'] + ' - '+EstimatedTime+': ' + value['Estimated Starting Time'] + ' - '+ value['Estimated Finish Time'] +' - '+service_type +'\n'

              var hour_inicio = value['Estimated Starting Time'];
              var hour_fim = value['Estimated Finish Time'];

              arrayValidaHora3.push({'hora_ini':hour_inicio, 'hora_fim':hour_fim})

              const segent = (hmToMins(value['Estimated Starting Time']))
              const segsai = (hmToMins(value['Estimated Finish Time']))

               const diff = segsai - segent;
               hhmm = hhmm + diff/60
                // alert(hhmm)
          })
          var resta = max-hhmm
          //alert(msg+"restam:"+ (resta) +' horas')
          alert(msg)
          if(resta > 0){
          $('#add_agendamento_planned_start_time3').attr('disabled',false)
          $('#add_agendamento_planned_hour3').attr('disabled',false)
          $('#add_agendamento_planned_hour3').attr('max',resta)
           console.log(arrayValidaHora3);
          }else{
            $('#add_agendamento_planned_start_time3').attr('disabled',true)
            $('#add_agendamento_planned_hour3').attr('disabled',true)
          }
          //alert('Total:'+hhmm)
        }else{
          //alert('nao existe algo::::')
          arrayValidaHora3 = []
          $('#add_agendamento_planned_start_time3').attr('disabled',false)
          $('#add_agendamento_planned_hour3').attr('disabled',false)
          $('#add_agendamento_planned_hour3').attr('max',max)
        }
      })


      //getRecursoAgendamentoWhere
    }


  })

  $('.start-date4').datepicker().on('changeDate', function(ev){
    var now = moment(new Date(), "YYYY-MM-DD")
    var data = moment(new Date(ev.date), "YYYY-MM-DD")
    var dataparam = moment(new Date(ev.date)).format("Y-MM-DD")
    var calculo = moment.duration(data.diff(now)).asDays();
    var recurso = $('#add_agendamento_busca_professional4').val()
    if(calculo <= -1 ){
      $.getJSON(urlX+"resourses/getRecursoAgendamentoWhere?Pais="+paisX+"&recurso="+recurso+"&data="+dataparam, function(result) {
        if(result.result.length > 0){
          // alert('existe algo :::')
          $.each( result.result, function( index, value ){
            var service_type =''
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
            alert(estimatedDate + ' - '+ value['Service Invoice No_'] + ' - '+EstimatedTime+': ' + value['Estimated Starting Time'] + ' - '+ value['Estimated Finish Time'] +' - '+service_type)
            // alert('Entrou certo')
            $('.start-date4').val('');

            $('#add_agendamento_planned_start_time4').attr('disabled',true)
            $('#add_agendamento_planned_hour4').attr('disabled',true)
            $('#add_agendamento_planned_hour4').attr('max',max)
          })

        }else{
          //alert('nao existe algo::::')
          arrayValidaHora4 = []
          $('.start-date4').val('');
          $('#add_agendamento_planned_start_time4').attr('disabled',true)
          $('#add_agendamento_planned_hour4').attr('disabled',true)
          $('#add_agendamento_planned_hour4').attr('max',max)
        }
      })

    }else if( calculo > -1){
      $.getJSON(urlX+"resourses/getRecursoAgendamentoWhere?Pais="+paisX+"&recurso="+recurso+"&data="+dataparam, function(result) {
        if(result.result.length > 0){
          // alert('existe algo :::')
          var msg =""
          var hhmm = 0
          arrayValidaHora4 = [];
          $.each( result.result, function( index, value ){
            var service_type =''
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
              msg += estimatedDate + ' - '+ value['Service Invoice No_'] + ' - '+EstimatedTime+': ' + value['Estimated Starting Time'] + ' - '+ value['Estimated Finish Time'] +' - '+service_type +'\n'

              var hour_inicio = value['Estimated Starting Time'];
              var hour_fim = value['Estimated Finish Time'];

              arrayValidaHora1.push({'hora_ini':hour_inicio, 'hora_fim':hour_fim})

              const segent = (hmToMins(value['Estimated Starting Time']))
              const segsai = (hmToMins(value['Estimated Finish Time']))

               const diff = segsai - segent;
               hhmm = hhmm + diff/60
                // alert(hhmm)
          })
          var resta = max-hhmm
          // alert(msg+"restam:"+ (resta) +' horas')
          alert(msg)
          if(resta > 0){
          $('#add_agendamento_planned_start_time4').attr('disabled',false)
          $('#add_agendamento_planned_hour4').attr('disabled',false)
          $('#add_agendamento_planned_hour4').attr('max',resta)
           console.log(arrayValidaHora4);
          }else{
            $('#add_agendamento_planned_start_time4').attr('disabled',true)
            $('#add_agendamento_planned_hour4').attr('disabled',true)
          }
          //alert('Total:'+hhmm)
        }else{
          //alert('nao existe algo::::')
          arrayValidaHora4 = []
          $('#add_agendamento_planned_start_time4').attr('disabled',false)
          $('#add_agendamento_planned_hour4').attr('disabled',false)
          $('#add_agendamento_planned_hour4').attr('max',max)
        }
      })


      //getRecursoAgendamentoWhere
    }


  })

  $('.start-date5').datepicker().on('changeDate', function(ev){
    var now = moment(new Date(), "YYYY-MM-DD")
    var data = moment(new Date(ev.date), "YYYY-MM-DD")
    var dataparam = moment(new Date(ev.date)).format("Y-MM-DD")
    var calculo = moment.duration(data.diff(now)).asDays();
    var recurso = $('#add_agendamento_busca_professional5').val()
    if(calculo <= -1 ){
      $.getJSON(urlX+"resourses/getRecursoAgendamentoWhere?Pais="+paisX+"&recurso="+recurso+"&data="+dataparam, function(result) {
        if(result.result.length > 0){
          // alert('existe algo :::')
          $.each( result.result, function( index, value ){
            var service_type =''
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
            alert(estimatedDate + ' - '+ value['Service Invoice No_'] + ' - '+EstimatedTime+': ' + value['Estimated Starting Time'] + ' - '+ value['Estimated Finish Time'] +' - '+service_type)
            // alert('Entrou certo')
            $('.start-date5').val('');

            $('#add_agendamento_planned_start_time5').attr('disabled',true)
            $('#add_agendamento_planned_hour5').attr('disabled',true)
            $('#add_agendamento_planned_hour5').attr('max',max)
          })

        }else{
          //alert('nao existe algo::::')
          arrayValidaHora1 = []
          $('.start-date1').val('');
          $('#add_agendamento_planned_start_time5').attr('disabled',true)
          $('#add_agendamento_planned_hour5').attr('disabled',true)
          $('#add_agendamento_planned_hour5').attr('max',max)
        }
      })

    }else if( calculo > -1){
      $.getJSON(urlX+"resourses/getRecursoAgendamentoWhere?Pais="+paisX+"&recurso="+recurso+"&data="+dataparam, function(result) {
        if(result.result.length > 0){
          // alert('existe algo :::')
          var msg =""
          var hhmm = 0
          arrayValidaHora1 = [];
          $.each( result.result, function( index, value ){
            var service_type =''
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
              msg += estimatedDate + ' - '+ value['Service Invoice No_'] + ' - '+EstimatedTime+': ' + value['Estimated Starting Time'] + ' - '+ value['Estimated Finish Time'] +' - '+service_type +'\n'

              var hour_inicio = value['Estimated Starting Time'];
              var hour_fim = value['Estimated Finish Time'];

              arrayValidaHora5.push({'hora_ini':hour_inicio, 'hora_fim':hour_fim})

              const segent = (hmToMins(value['Estimated Starting Time']))
              const segsai = (hmToMins(value['Estimated Finish Time']))

               const diff = segsai - segent;
               hhmm = hhmm + diff/60
                // alert(hhmm)
          })
          var resta = max-hhmm
          // alert(msg+"restam:"+ (resta) +' horas')
          alert(msg)
          if(resta > 0){
          $('#add_agendamento_planned_start_time5').attr('disabled',false)
          $('#add_agendamento_planned_hour5').attr('disabled',false)
          $('#add_agendamento_planned_hour5').attr('max',resta)
           console.log(arrayValidaHora5);
          }else{
            $('#add_agendamento_planned_start_time5').attr('disabled',true)
            $('#add_agendamento_planned_hour5').attr('disabled',true)
          }
          //alert('Total:'+hhmm)
        }else{
          //alert('nao existe algo::::')
          arrayValidaHora5 = []
          $('#add_agendamento_planned_start_time5').attr('disabled',false)
          $('#add_agendamento_planned_hour5').attr('disabled',false)
          $('#add_agendamento_planned_hour5').attr('max',max)
        }
      })


      //getRecursoAgendamentoWhere
    }


  })



  function hmToMins(str) {
    const [hh, mm] = str.split(':').map(nr => Number(nr) || 0);
    return hh * 60 + mm;
  }

  $("#add_agendamento_planned_start_time1").blur(function(){
    var hora = hmToMins($(this).val());
    var valida = false;
    // alert('quantidade array: ' + arrayValidaHora1.length)
    arrayValidaHora1.map(function(value) {
      // alert(hmToMins(value.hora_ini) + ' > ' + hora)
      // alert(hmToMins(value.hora_fim) + ' < ' + hora)
      if(hora.between(hmToMins(value.hora_ini), hmToMins(value.hora_fim)) == true){
        //bloquei nao deixa continuar
        valida = true
      }
    })
    if(valida == true){
      $(this).val('');
      $('#add_agendamento_planned_start_time1').attr('disabled',true)
      $('#add_agendamento_planned_hour1').attr('disabled',true)
      //alert("Hora inválida!")
      var texto = "Planned Start Time 1 invalid"
      $.notify({
        title: $.i18n.prop('lAttentionMandatory',lang),
        message: texto
      },{
        type: 'pastel-danger',
        delay: 5000,
        z_index: 10000,
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
          '<span data-notify="title">{1}</span>' +
          '<span data-notify="message">{2}</span>' +
        '</div>'
      });

    }
  })


  $("#add_agendamento_planned_start_time2").blur(function(){
    var hora = hmToMins($(this).val());
    var valida = false;
    // alert('quantidade array: ' + arrayValidaHora1.length)
    arrayValidaHora2.map(function(value) {
      // alert(hmToMins(value.hora_ini) + ' > ' + hora)
      // alert(hmToMins(value.hora_fim) + ' < ' + hora)
      if(hora.between(hmToMins(value.hora_ini), hmToMins(value.hora_fim)) == true){
        //bloquei nao deixa continuar
        valida = true
      }
    })
    if(valida == true){
      $(this).val('');
      $('#add_agendamento_planned_start_time2').attr('disabled',true)
      $('#add_agendamento_planned_hour2').attr('disabled',true)
      //alert("Hora inválida!")
      var texto = "Planned Start Time 2 invalid"
      $.notify({
        title: $.i18n.prop('lAttentionMandatory',lang),
        message: texto
      },{
        type: 'pastel-danger',
        delay: 5000,
        z_index: 10000,
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
          '<span data-notify="title">{1}</span>' +
          '<span data-notify="message">{2}</span>' +
        '</div>'
      });

    }
  })


  $("#add_agendamento_planned_start_time3").blur(function(){
    var hora = hmToMins($(this).val());
    var valida = false;
    // alert('quantidade array: ' + arrayValidaHora1.length)
    arrayValidaHora3.map(function(value) {
      // alert(hmToMins(value.hora_ini) + ' > ' + hora)
      // alert(hmToMins(value.hora_fim) + ' < ' + hora)
      if(hora.between(hmToMins(value.hora_ini), hmToMins(value.hora_fim)) == true){
        //bloquei nao deixa continuar
        valida = true
      }
    })
    if(valida == true){
      $(this).val('');
      $('#add_agendamento_planned_start_time3').attr('disabled',true)
      $('#add_agendamento_planned_hour3').attr('disabled',true)
      //alert("Hora inválida!")
      var texto = "Planned Start Time 3 invalid"
      $.notify({
        title: $.i18n.prop('lAttentionMandatory',lang),
        message: texto
      },{
        type: 'pastel-danger',
        delay: 5000,
        z_index: 10000,
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
          '<span data-notify="title">{1}</span>' +
          '<span data-notify="message">{2}</span>' +
        '</div>'
      });

    }
  })


  $("#add_agendamento_planned_start_time4").blur(function(){
    var hora = hmToMins($(this).val());
    var valida = false;
    // alert('quantidade array: ' + arrayValidaHora1.length)
    arrayValidaHora4.map(function(value) {
      // alert(hmToMins(value.hora_ini) + ' > ' + hora)
      // alert(hmToMins(value.hora_fim) + ' < ' + hora)
      if(hora.between(hmToMins(value.hora_ini), hmToMins(value.hora_fim)) == true){
        //bloquei nao deixa continuar
        valida = true
      }
    })
    if(valida == true){
      $(this).val('');
      $('#add_agendamento_planned_start_time4').attr('disabled',true)
      $('#add_agendamento_planned_hour4').attr('disabled',true)
      //alert("Hora inválida!")
      var texto = "Planned Start Time 4 invalid"
      $.notify({
        title: $.i18n.prop('lAttentionMandatory',lang),
        message: texto
      },{
        type: 'pastel-danger',
        delay: 5000,
        z_index: 10000,
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
          '<span data-notify="title">{1}</span>' +
          '<span data-notify="message">{2}</span>' +
        '</div>'
      });

    }
  })


  $("#add_agendamento_planned_start_time5").blur(function(){
    var hora = hmToMins($(this).val());
    var valida = false;
    // alert('quantidade array: ' + arrayValidaHora1.length)
    arrayValidaHora5.map(function(value) {
      // alert(hmToMins(value.hora_ini) + ' > ' + hora)
      // alert(hmToMins(value.hora_fim) + ' < ' + hora)
      if(hora.between(hmToMins(value.hora_ini), hmToMins(value.hora_fim)) == true){
        //bloquei nao deixa continuar
        valida = true
      }
    })
    if(valida == true){
      $(this).val('');
      $('#add_agendamento_planned_start_time5').attr('disabled',true)
      $('#add_agendamento_planned_hour5').attr('disabled',true)
      //alert("Hora inválida!")
      var texto = "Planned Start Time 5 invalid"
      $.notify({
        title: $.i18n.prop('lAttentionMandatory',lang),
        message: texto
      },{
        type: 'pastel-danger',
        delay: 5000,
        z_index: 10000,
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
          '<span data-notify="title">{1}</span>' +
          '<span data-notify="message">{2}</span>' +
        '</div>'
      });

    }
  })



  Number.prototype.between  = function (a, b) {
    var min = Math.min(a,b),
        max = Math.max(a,b);
    return this >= min && this <= max;
};


/************************************************************************************************ */

function edit_agendamentoX(recurso,number){
  $('.edit-start-date'+number).val('').datepicker('destroy')
    $.getJSON(urlX+"resourses/getRecursoAgendamento?Pais="+paisX+"&recurso="+recurso, function(result) {
      if(result.result.length > 0){
        console.log('entrou ' + result.result.length)
        var arrayData = [];
        let arrayDias = new Array()
        var texte = ""
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
            console.log('**************entrouuu data')
            console.log(estimatedDate)
            console.log('**************datat certa')

            console.log(teste[0]+'-'+teste[1]+'-'+teste[2])
            console.log(value['Estimated Starting Date'])


            arrayData.push(estimatedDate + ' - '+ value['Service Invoice No_'] + ' - '+EstimatedTime+': ' + value['Estimated Starting Time'] + ' - '+ value['Estimated Finish Time'] +' - '+service_type)

            objDatas = estimatedDate;
            arrayDias.push(objDatas)

            $('.edit-start-date'+number).datepicker({
              format: 'dd/mm/yyyy',
              todayBtn: true,
              keyboardNavigation: false,
              autoclose: true,
              todayHighlight: true,

              beforeShowDay: function(date){

                var date  =  moment(date).format("DD/MM/Y")
                var atual = new Date();
                $('.datepicker-days').attr( "data-toggle", "tooltip" );

                if(arrayDias.indexOf(date.trim()) > -1) {
                  return {
                    tooltip: '',
                    classes: 'highlighted',
                  };
                }
                $('[data-toggle="tooltip"]').tooltip();
              },
              toggleActive: true
            })
            $('.edit-start-date'+number).datepicker('update');
        })

      }else{
        $('.edit-start-date'+number).datepicker({
          format: 'dd/mm/yyyy',
          startDate: moment(new Date()).format("DD/MM/Y"),
          todayBtn: true,
          keyboardNavigation: false,
          autoclose: true,
          todayHighlight: true,
          toggleActive: true
        });

      }
      $('[data-toggle="tooltip"]').tooltip();
  });
}


var arrayEditValidaHora1=[]
var arrayEditValidaHora2=[]
var arrayEditValidaHora3=[]
var arrayEditValidaHora4=[]
var arrayEditValidaHora5=[]



$('.edit-start-date1').datepicker().on('changeDate', function(ev){
  var now = moment(new Date(), "YYYY-MM-DD")
  var data = moment(new Date(ev.date), "YYYY-MM-DD")
  var dataparam = moment(new Date(ev.date)).format("Y-MM-DD")
  var calculo = moment.duration(data.diff(now)).asDays();
  var recurso = $('#edit_agendamento_busca_professional1').val()
  if(calculo <= -1 ){
    $.getJSON(urlX+"resourses/getRecursoAgendamentoWhere?Pais="+paisX+"&recurso="+recurso+"&data="+dataparam, function(result) {
      if(result.result.length > 0){
        // alert('existe algo :::')
        $.each( result.result, function( index, value ){
          var service_type =''
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
          alert(estimatedDate + ' - '+ value['Service Invoice No_'] + ' - '+EstimatedTime+': ' + value['Estimated Starting Time'] + ' - '+ value['Estimated Finish Time'] +' - '+service_type)
          // alert('Entrou certo')
          $('.edit-start-date1').val('');

          $('#edit_agendamento_planned_start_time1').attr('disabled',true)
          $('#edit_agendamento_planned_hour1').attr('disabled',true)
          $('#edit_agendamento_planned_hour1').attr('max',max)
        })

      }else{
        //alert('nao existe algo::::')
        arrayEditValidaHora1 = []
        $('.edit-start-date1').val('');
        $('#edit_agendamento_planned_start_time1').attr('disabled',true)
        $('#edit_agendamento_planned_hour1').attr('disabled',true)
        $('#edit_agendamento_planned_hour1').attr('max',max)
      }
    })

  }else if( calculo > -1){
    $.getJSON(urlX+"resourses/getRecursoAgendamentoWhere?Pais="+paisX+"&recurso="+recurso+"&data="+dataparam, function(result) {
      if(result.result.length > 0){
        // alert('existe algo :::')
        var msg =""
        var hhmm = 0
        arrayEditValidaHora1 = [];
        $.each( result.result, function( index, value ){
          var service_type =''
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
            msg += estimatedDate + ' - '+ value['Service Invoice No_'] + ' - '+EstimatedTime+': ' + value['Estimated Starting Time'] + ' - '+ value['Estimated Finish Time'] +' - '+service_type +'\n'

            var hour_inicio = value['Estimated Starting Time'];
            var hour_fim = value['Estimated Finish Time'];

            arrayEditValidaHora1.push({'hora_ini':hour_inicio, 'hora_fim':hour_fim})

            const segent = (hmToMins(value['Estimated Starting Time']))
            const segsai = (hmToMins(value['Estimated Finish Time']))

             const diff = segsai - segent;
             hhmm = hhmm + diff/60
              // alert(hhmm)
        })
        var resta = max-hhmm
        // alert(msg+"restam:"+ (resta) +' horas')
        alert(msg)
        if(resta > 0){
        $('#edit_agendamento_planned_start_time1').attr('disabled',false)
        $('#edit_agendamento_planned_hour1').attr('disabled',false)
        $('#edit_agendamento_planned_hour1').attr('max',resta)
         console.log(arrayEditValidaHora1);
        }else{
          $('#edit_agendamento_planned_start_time1').attr('disabled',true)
          $('#edit_agendamento_planned_hour1').attr('disabled',true)
        }
        //alert('Total:'+hhmm)
      }else{
        //alert('nao existe algo::::')
        arrayEditValidaHora1 = []
        $('#edit_agendamento_planned_start_time1').attr('disabled',false)
        $('#edit_agendamento_planned_hour1').attr('disabled',false)
        $('#edit_agendamento_planned_hour1').attr('max',max)
      }
    })


    //getRecursoAgendamentoWhere
  }


})



$('.edit-start-date2').datepicker().on('changeDate', function(ev){
  var now = moment(new Date(), "YYYY-MM-DD")
  var data = moment(new Date(ev.date), "YYYY-MM-DD")
  var dataparam = moment(new Date(ev.date)).format("Y-MM-DD")
  var calculo = moment.duration(data.diff(now)).asDays();
  var recurso = $('#edit_agendamento_busca_professional2').val()
  if(calculo <= -1 ){
    $.getJSON(urlX+"resourses/getRecursoAgendamentoWhere?Pais="+paisX+"&recurso="+recurso+"&data="+dataparam, function(result) {
      if(result.result.length > 0){
        // alert('existe algo :::')
        $.each( result.result, function( index, value ){
          var service_type =''
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
          alert(estimatedDate + ' - '+ value['Service Invoice No_'] + ' - '+EstimatedTime+': ' + value['Estimated Starting Time'] + ' - '+ value['Estimated Finish Time'] +' - '+service_type)
          // alert('Entrou certo')
          $('.edit-start-date2').val('');

          $('#edit_agendamento_planned_start_time2').attr('disabled',true)
          $('#edit_agendamento_planned_hour2').attr('disabled',true)
          $('#edit_agendamento_planned_hour2').attr('max',max)
        })

      }else{
        //alert('nao existe algo::::')
        arrayEditValidaHora2 = []
        $('.edit-start-date2').val('');
        $('#edit_agendamento_planned_start_time2').attr('disabled',true)
        $('#edit_agendamento_planned_hour2').attr('disabled',true)
        $('#edit_agendamento_planned_hour2').attr('max',max)
      }
    })

  }else if( calculo > -1){
    $.getJSON(urlX+"resourses/getRecursoAgendamentoWhere?Pais="+paisX+"&recurso="+recurso+"&data="+dataparam, function(result) {
      if(result.result.length > 0){
        // alert('existe algo :::')
        var msg =""
        var hhmm = 0
        arrayEditValidaHora2 = [];
        $.each( result.result, function( index, value ){
          var service_type =''
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
            msg += estimatedDate + ' - '+ value['Service Invoice No_'] + ' - '+EstimatedTime+': ' + value['Estimated Starting Time'] + ' - '+ value['Estimated Finish Time'] +' - '+service_type +'\n'

            var hour_inicio = value['Estimated Starting Time'];
            var hour_fim = value['Estimated Finish Time'];

            arrayEditValidaHora2.push({'hora_ini':hour_inicio, 'hora_fim':hour_fim})

            const segent = (hmToMins(value['Estimated Starting Time']))
            const segsai = (hmToMins(value['Estimated Finish Time']))

             const diff = segsai - segent;
             hhmm = hhmm + diff/60
              // alert(hhmm)
        })
        var resta = max-hhmm
        // alert(msg+"restam:"+ (resta) +' horas')
        alert(msg)
        if(resta > 0){
        $('#edit_agendamento_planned_start_time2').attr('disabled',false)
        $('#edit_agendamento_planned_hour2').attr('disabled',false)
        $('#edit_agendamento_planned_hour2').attr('max',resta)
         console.log(arrayEditValidaHora2);
        }else{
          $('#edit_agendamento_planned_start_time2').attr('disabled',true)
          $('#edit_agendamento_planned_hour2').attr('disabled',true)
        }
        //alert('Total:'+hhmm)
      }else{
        //alert('nao existe algo::::')
        arrayEditValidaHora2 = []
        $('#edit_agendamento_planned_start_time2').attr('disabled',false)
        $('#edit_agendamento_planned_hour2').attr('disabled',false)
        $('#edit_agendamento_planned_hour2').attr('max',max)
      }
    })


    //getRecursoAgendamentoWhere
  }


})









$('.edit-start-date3').datepicker().on('changeDate', function(ev){
  var now = moment(new Date(), "YYYY-MM-DD")
  var data = moment(new Date(ev.date), "YYYY-MM-DD")
  var dataparam = moment(new Date(ev.date)).format("Y-MM-DD")
  var calculo = moment.duration(data.diff(now)).asDays();
  var recurso = $('#edit_agendamento_busca_professional3').val()
  if(calculo <= -1 ){
    $.getJSON(urlX+"resourses/getRecursoAgendamentoWhere?Pais="+paisX+"&recurso="+recurso+"&data="+dataparam, function(result) {
      if(result.result.length > 0){
        // alert('existe algo :::')
        $.each( result.result, function( index, value ){
          var service_type =''
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
          alert(estimatedDate + ' - '+ value['Service Invoice No_'] + ' - '+EstimatedTime+': ' + value['Estimated Starting Time'] + ' - '+ value['Estimated Finish Time'] +' - '+service_type)
          // alert('Entrou certo')
          $('.edit-start-date3').val('');

          $('#edit_agendamento_planned_start_time3').attr('disabled',true)
          $('#edit_agendamento_planned_hour3').attr('disabled',true)
          $('#edit_agendamento_planned_hour3').attr('max',max)
        })

      }else{
        //alert('nao existe algo::::')
        arrayEditValidaHora3 = []
        $('.edit-start-date3').val('');
        $('#edit_agendamento_planned_start_time3').attr('disabled',true)
        $('#edit_agendamento_planned_hour3').attr('disabled',true)
        $('#edit_agendamento_planned_hour3').attr('max',max)
      }
    })

  }else if( calculo > -1){
    $.getJSON(urlX+"resourses/getRecursoAgendamentoWhere?Pais="+paisX+"&recurso="+recurso+"&data="+dataparam, function(result) {
      if(result.result.length > 0){
        // alert('existe algo :::')
        var msg =""
        var hhmm = 0
        arrayEditValidaHora3 = [];
        $.each( result.result, function( index, value ){
          var service_type =''
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
            msg += estimatedDate + ' - '+ value['Service Invoice No_'] + ' - '+EstimatedTime+': ' + value['Estimated Starting Time'] + ' - '+ value['Estimated Finish Time'] +' - '+service_type +'\n'

            var hour_inicio = value['Estimated Starting Time'];
            var hour_fim = value['Estimated Finish Time'];

            arrayEditValidaHora3.push({'hora_ini':hour_inicio, 'hora_fim':hour_fim})

            const segent = (hmToMins(value['Estimated Starting Time']))
            const segsai = (hmToMins(value['Estimated Finish Time']))

             const diff = segsai - segent;
             hhmm = hhmm + diff/60
              // alert(hhmm)
        })
        var resta = max-hhmm
        // alert(msg+"restam:"+ (resta) +' horas')
        alert(msg)
        if(resta > 0){
        $('#edit_agendamento_planned_start_time3').attr('disabled',false)
        $('#edit_agendamento_planned_hour3').attr('disabled',false)
        $('#edit_agendamento_planned_hour3').attr('max',resta)
         console.log(arrayEditValidaHora3);
        }else{
          $('#edit_agendamento_planned_start_time3').attr('disabled',true)
          $('#edit_agendamento_planned_hour3').attr('disabled',true)
        }
        //alert('Total:'+hhmm)
      }else{
        //alert('nao existe algo::::')
        arrayEditValidaHora3 = []
        $('#edit_agendamento_planned_start_time3').attr('disabled',false)
        $('#edit_agendamento_planned_hour3').attr('disabled',false)
        $('#edit_agendamento_planned_hour3').attr('max',max)
      }
    })


    //getRecursoAgendamentoWhere
  }


})




$('.edit-start-date4').datepicker().on('changeDate', function(ev){
  var now = moment(new Date(), "YYYY-MM-DD")
  var data = moment(new Date(ev.date), "YYYY-MM-DD")
  var dataparam = moment(new Date(ev.date)).format("Y-MM-DD")
  var calculo = moment.duration(data.diff(now)).asDays();
  var recurso = $('#edit_agendamento_busca_professional4').val()
  if(calculo <= -1 ){
    $.getJSON(urlX+"resourses/getRecursoAgendamentoWhere?Pais="+paisX+"&recurso="+recurso+"&data="+dataparam, function(result) {
      if(result.result.length > 0){
        // alert('existe algo :::')
        $.each( result.result, function( index, value ){
          var service_type =''
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
          alert(estimatedDate + ' - '+ value['Service Invoice No_'] + ' - '+EstimatedTime+': ' + value['Estimated Starting Time'] + ' - '+ value['Estimated Finish Time'] +' - '+service_type)
          // alert('Entrou certo')
          $('.edit-start-date4').val('');

          $('#edit_agendamento_planned_start_time4').attr('disabled',true)
          $('#edit_agendamento_planned_hour4').attr('disabled',true)
          $('#edit_agendamento_planned_hour4').attr('max',max)
        })

      }else{
        //alert('nao existe algo::::')
        arrayEditValidaHora4 = []
        $('.edit-start-date4').val('');
        $('#edit_agendamento_planned_start_time4').attr('disabled',true)
        $('#edit_agendamento_planned_hour4').attr('disabled',true)
        $('#edit_agendamento_planned_hour4').attr('max',max)
      }
    })

  }else if( calculo > -1){
    $.getJSON(urlX+"resourses/getRecursoAgendamentoWhere?Pais="+paisX+"&recurso="+recurso+"&data="+dataparam, function(result) {
      if(result.result.length > 0){
        // alert('existe algo :::')
        var msg =""
        var hhmm = 0
        arrayEditValidaHora4 = [];
        $.each( result.result, function( index, value ){
          var service_type =''
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
            msg += estimatedDate + ' - '+ value['Service Invoice No_'] + ' - '+EstimatedTime+': ' + value['Estimated Starting Time'] + ' - '+ value['Estimated Finish Time'] +' - '+service_type +'\n'

            var hour_inicio = value['Estimated Starting Time'];
            var hour_fim = value['Estimated Finish Time'];

            arrayEditValidaHora4.push({'hora_ini':hour_inicio, 'hora_fim':hour_fim})

            const segent = (hmToMins(value['Estimated Starting Time']))
            const segsai = (hmToMins(value['Estimated Finish Time']))

             const diff = segsai - segent;
             hhmm = hhmm + diff/60
              // alert(hhmm)
        })
        var resta = max-hhmm
        // alert(msg+"restam:"+ (resta) +' horas')
        alert(msg)
        if(resta > 0){
        $('#edit_agendamento_planned_start_time4').attr('disabled',false)
        $('#edit_agendamento_planned_hour4').attr('disabled',false)
        $('#edit_agendamento_planned_hour4').attr('max',resta)
         console.log(arrayEditValidaHora4);
        }else{
          $('#edit_agendamento_planned_start_time4').attr('disabled',true)
          $('#edit_agendamento_planned_hour4').attr('disabled',true)
        }
        //alert('Total:'+hhmm)
      }else{
        //alert('nao existe algo::::')
        arrayEditValidaHora4 = []
        $('#edit_agendamento_planned_start_time4').attr('disabled',false)
        $('#edit_agendamento_planned_hour4').attr('disabled',false)
        $('#edit_agendamento_planned_hour4').attr('max',max)
      }
    })


    //getRecursoAgendamentoWhere
  }


})




$('.edit-start-date5').datepicker().on('changeDate', function(ev){
  var now = moment(new Date(), "YYYY-MM-DD")
  var data = moment(new Date(ev.date), "YYYY-MM-DD")
  var dataparam = moment(new Date(ev.date)).format("Y-MM-DD")
  var calculo = moment.duration(data.diff(now)).asDays();
  var recurso = $('#edit_agendamento_busca_professional5').val()
  if(calculo <= -1 ){
    $.getJSON(urlX+"resourses/getRecursoAgendamentoWhere?Pais="+paisX+"&recurso="+recurso+"&data="+dataparam, function(result) {
      if(result.result.length > 0){
        // alert('existe algo :::')
        $.each( result.result, function( index, value ){
          var service_type =''
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
          alert(estimatedDate + ' - '+ value['Service Invoice No_'] + ' - '+EstimatedTime+': ' + value['Estimated Starting Time'] + ' - '+ value['Estimated Finish Time'] +' - '+service_type)
          // alert('Entrou certo')
          $('.edit-start-date5').val('');

          $('#edit_agendamento_planned_start_time5').attr('disabled',true)
          $('#edit_agendamento_planned_hour5').attr('disabled',true)
          $('#edit_agendamento_planned_hour5').attr('max',max)
        })

      }else{
        //alert('nao existe algo::::')
        arrayEditValidaHora5 = []
        $('.edit-start-date5').val('');
        $('#edit_agendamento_planned_start_time5').attr('disabled',true)
        $('#edit_agendamento_planned_hour5').attr('disabled',true)
        $('#edit_agendamento_planned_hour5').attr('max',max)
      }
    })

  }else if( calculo > -1){
    $.getJSON(urlX+"resourses/getRecursoAgendamentoWhere?Pais="+paisX+"&recurso="+recurso+"&data="+dataparam, function(result) {
      if(result.result.length > 0){
        // alert('existe algo :::')
        var msg =""
        var hhmm = 0
        arrayEditValidaHora5 = [];
        $.each( result.result, function( index, value ){
          var service_type =''
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
            msg += estimatedDate + ' - '+ value['Service Invoice No_'] + ' - '+EstimatedTime+': ' + value['Estimated Starting Time'] + ' - '+ value['Estimated Finish Time'] +' - '+service_type +'\n'

            var hour_inicio = value['Estimated Starting Time'];
            var hour_fim = value['Estimated Finish Time'];

            arrayEditValidaHora5.push({'hora_ini':hour_inicio, 'hora_fim':hour_fim})

            const segent = (hmToMins(value['Estimated Starting Time']))
            const segsai = (hmToMins(value['Estimated Finish Time']))

             const diff = segsai - segent;
             hhmm = hhmm + diff/60
              // alert(hhmm)
        })
        var resta = max-hhmm
        // alert(msg+"restam:"+ (resta) +' horas')
        alert(msg)
        if(resta > 0){
        $('#edit_agendamento_planned_start_time5').attr('disabled',false)
        $('#edit_agendamento_planned_hour5').attr('disabled',false)
        $('#edit_agendamento_planned_hour5').attr('max',resta)
         console.log(arrayEditValidaHora2);
        }else{
          $('#edit_agendamento_planned_start_time5').attr('disabled',true)
          $('#edit_agendamento_planned_hour5').attr('disabled',true)
        }
        //alert('Total:'+hhmm)
      }else{
        //alert('nao existe algo::::')
        arrayEditValidaHora2 = []
        $('#edit_agendamento_planned_start_time5').attr('disabled',false)
        $('#edit_agendamento_planned_hour5').attr('disabled',false)
        $('#edit_agendamento_planned_hour5').attr('max',max)
      }
    })


    //getRecursoAgendamentoWhere
  }


})



/************************************************************************** */
$("#edit_agendamento_planned_start_time1").blur(function(){
  var hora = hmToMins($(this).val());
  var valida = false;
  arrayEditValidaHora1.map(function(value) {
    if(hora.between(hmToMins(value.hora_ini), hmToMins(value.hora_fim)) == true){
      //bloquei nao deixa continuar
      valida = true
    }
  })
  if(valida == true){
    $(this).val('');
    $('#edit_agendamento_planned_start_time1').attr('disabled',true)
    $('#edit_agendamento_planned_hour1').attr('disabled',true)
    //alert("Hora inválida!")
    var texto = "Planned Start Time 1 invalid"
    $.notify({
      title: $.i18n.prop('lAttentionMandatory',lang),
      message: texto
    },{
      type: 'pastel-danger',
      delay: 5000,
      z_index: 10000,
      template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<span data-notify="title">{1}</span>' +
        '<span data-notify="message">{2}</span>' +
      '</div>'
    });

  }
})



$("#edit_agendamento_planned_start_time2").blur(function(){
  var hora = hmToMins($(this).val());
  var valida = false;
  arrayEditValidaHora2.map(function(value) {
    if(hora.between(hmToMins(value.hora_ini), hmToMins(value.hora_fim)) == true){
      //bloquei nao deixa continuar
      valida = true
    }
  })
  if(valida == true){
    $(this).val('');
    $('#edit_agendamento_planned_start_time2').attr('disabled',true)
    $('#edit_agendamento_planned_hour2').attr('disabled',true)
    //alert("Hora inválida!")
    var texto = "Planned Start Time 2 invalid"
    $.notify({
      title: $.i18n.prop('lAttentionMandatory',lang),
      message: texto
    },{
      type: 'pastel-danger',
      delay: 5000,
      z_index: 10000,
      template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<span data-notify="title">{1}</span>' +
        '<span data-notify="message">{2}</span>' +
      '</div>'
    });

  }
})


$("#edit_agendamento_planned_start_time3").blur(function(){
  var hora = hmToMins($(this).val());
  var valida = false;
  arrayEditValidaHora3.map(function(value) {
    if(hora.between(hmToMins(value.hora_ini), hmToMins(value.hora_fim)) == true){
      //bloquei nao deixa continuar
      valida = true
    }
  })
  if(valida == true){
    $(this).val('');
    $('#edit_agendamento_planned_start_time3').attr('disabled',true)
    $('#edit_agendamento_planned_hour3').attr('disabled',true)
    //alert("Hora inválida!")
    var texto = "Planned Start Time 3 invalid"
    $.notify({
      title: $.i18n.prop('lAttentionMandatory',lang),
      message: texto
    },{
      type: 'pastel-danger',
      delay: 5000,
      z_index: 10000,
      template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<span data-notify="title">{1}</span>' +
        '<span data-notify="message">{2}</span>' +
      '</div>'
    });

  }
})


$("#edit_agendamento_planned_start_time4").blur(function(){
  var hora = hmToMins($(this).val());
  var valida = false;
  arrayEditValidaHora4.map(function(value) {
    if(hora.between(hmToMins(value.hora_ini), hmToMins(value.hora_fim)) == true){
      //bloquei nao deixa continuar
      valida = true
    }
  })
  if(valida == true){
    $(this).val('');
    $('#edit_agendamento_planned_start_time4').attr('disabled',true)
    $('#edit_agendamento_planned_hour4').attr('disabled',true)
    //alert("Hora inválida!")
    var texto = "Planned Start Time 4 invalid"
    $.notify({
      title: $.i18n.prop('lAttentionMandatory',lang),
      message: texto
    },{
      type: 'pastel-danger',
      delay: 5000,
      z_index: 10000,
      template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<span data-notify="title">{1}</span>' +
        '<span data-notify="message">{2}</span>' +
      '</div>'
    });

  }
})


$("#edit_agendamento_planned_start_time5").blur(function(){
  var hora = hmToMins($(this).val());
  var valida = false;
  arrayEditValidaHora5.map(function(value) {
    if(hora.between(hmToMins(value.hora_ini), hmToMins(value.hora_fim)) == true){
      //bloquei nao deixa continuar
      valida = true
    }
  })
  if(valida == true){
    $(this).val('');
    $('#edit_agendamento_planned_start_time5').attr('disabled',true)
    $('#edit_agendamento_planned_hour5').attr('disabled',true)
    //alert("Hora inválida!")
    var texto = "Planned Start Time 5 invalid"
    $.notify({
      title: $.i18n.prop('lAttentionMandatory',lang),
      message: texto
    },{
      type: 'pastel-danger',
      delay: 5000,
      z_index: 10000,
      template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<span data-notify="title">{1}</span>' +
        '<span data-notify="message">{2}</span>' +
      '</div>'
    });

  }
})

}())
