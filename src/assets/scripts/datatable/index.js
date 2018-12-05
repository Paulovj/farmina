import * as $ from 'jquery';
import 'datatables';
import moment from 'moment/src/moment';
import 'jquery-i18n-properties'
export default (function () {

  var lang = "en";
    if (sessionStorage.Language != ""){
      lang = sessionStorage.Language
    }

  if(window.location.pathname == '/datatable.html'){

  //var table = $('#dataTable').DataTable(); 
  var lDemographicItems ="";
  
  function formatDateStatus(data,status) {
    //var data = '2018/11/22'
    var falta = (new Date(data).getTime() - new Date().getTime()) / 1000;
    var dias = Math.round(falta / 60 / 60 / 24);
    var horas = Math.round(falta / 60 / 60 % 24);
    var result =''
    var texto = ''
    if(status != 3){
      if (dias > 2 ){
        texto  = $.i18n.prop('lDiasRestante',lang)
        result =  '<span class="badge badge-pill fl-r badge-info lh-0 p-10">' + dias + ' ' +texto +'</span>'
      }else if (dias > 0 && dias <= 2){
        texto  = $.i18n.prop('lDiasRestante',lang)
        result =  '<span class="badge badge-pill fl-r badge-warning lh-0 p-10">' + dias + ' - ' + texto + ' </span>'
        //result = 'faltam ' + dias + ' dias'
      }else if(dias == 0){
        texto  = $.i18n.prop('lTarefaDia',lang)
        result =  '<span class="badge badge-pill fl-r badge-success lh-0 p-10">' + texto + '</span>'
        //result = ' chegou o dia'
      }else if(dias < 0){
        texto  = $.i18n.prop('lAtrasado',lang)
        result =  '<span class="badge badge-pill fl-r badge-danger lh-0 p-10">' + dias + ' ' + texto +'</span>'
        //result = 'atrasdo ' + dias + ' dias'
      }
    }  
    return result

    // var data =  moment(date).utc().format("DD/MM/Y")
    //   if ((data=='01/01/1753') || (data =='01/01/1900')){
    //       return ''
    //   }else{
    //     return data
    //   }
    // return data;
    }


  function formatDate(date) {
    var data =  moment(date).utc().format("DD/MM/Y")
      if ((data=='01/01/1753') || (data =='01/01/1900')){
          return ''
      }else{
        return data
      }
    return data;
    }
  
    function formatDateSql(date) {
      var data = moment(date, 'DD/MM/YYYY').toDate();
      data =  moment(data).utc().format("Y-MM-DD")
      return data;
      }
  


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}
function formatHora(date) {
  var data =  moment(date).utc().format("HH:mm")
    return data;
    
  // var d = new Date(date);
  // var hour = d.getHours() + "";
  // var minutes = d.getMinutes() + "";

  // var hours = checkZero(hour);
  // var mintues = checkZero(minutes);
  // return hours +':'+ mintues;
}
  
  function FunctionX(value){
    var functionX = "";
        if (value == 0){
          functionX =  '';
        }else if(value==1){
          functionX =  'SOS';
        }else if(value==2){
          functionX =  'Army';            
        }
        return functionX;
  }
  function ServiceType(value){
    var Service_TypeX = "";
        if (value == 0){
          Service_TypeX = '';
        }else if(value==1){
          Service_TypeX =  'Training';
        }else if(value==2){
          Service_TypeX =  'Welcome Kit';            
        }else if(value==3){
          Service_TypeX =  'ISP';
        }else if(value==4){
          Service_TypeX =  'Merchandising';
        }else if(value==5){
          Service_TypeX =  'Army';
        }
        return Service_TypeX
  }

  function TrainingAnswer(value){
    var Trainning_AnswerX ="";
        if (value == 0){
          Trainning_AnswerX =  '';
        }else if(value==1){
          Trainning_AnswerX = 'ND';
        }else if(value==2){
          Trainning_AnswerX = 'ND';            
        }else if(value==3){
          Trainning_AnswerX = 'PUMPKIN';
        }else if(value==4){
          Trainning_AnswerX = 'ND QUINOA';
        }else if(value==5){
          Trainning_AnswerX = 'ND ANCESTRAL';
        }else if(value==6){
          Trainning_AnswerX = 'ND PRIME VET LIFE';
        }else if(value==7){
          Trainning_AnswerX = 'INSTITUCIONAL';
        }
        return Trainning_AnswerX;
  }

  $('#dataTable tbody').on( 'click', 'button', function () {
          var data = $("#dataTable").DataTable().row( $(this).parents('tr') ).data();
          var id = data['Service-Invoice-No_'];
          var Service_Invoice_Line_No = data['Service-Invoice-Line-No_'];
          var Service_type = data['Service-Type'];
                
          if($(this).attr('action') == "starting"){
              $.ajax({url: "http://www.nav.farmina.com.br:3001/api/Farmina-1-Service-Booking-Resources/"+id, success: function(result){
              console.log(result)

              
              
              $('#start_service_invoice_no').val(result['Service-Invoice-No_']);  
              $('#start_service_invoice_line_no').val(result['Service-Invoice-Line-No_']);

              $('#start_customer_name').val(result['Customer-Name']);  
              $('#start_resource_no').val(result['Resource-No_']);
              $('#start_function').val(FunctionX(result['Function']));//no
              $('#start_service_type').val(ServiceType(result['Service-Type']));
              $('#start_Salesperson_code').val(result['Salesperson-Code']);
              $('#start_date').val(formatDate(result['Starting-Date']));
              $('#start_time').val(formatHora(result['Starting-Time']));
              $('#start_estimated_starting_date').val(formatDate(result['Estimated-Starting-Date']));
              $('#start_observation').val(result['Starting-Observation']);//no
            }});
          
            $('#starting-service-booking').modal('toggle')
          }  

          if($(this).attr('action') == "finished"){
              //$.ajax({url: "https://app-farmina.herokuapp.com/api/service_booking_resources/"+id, success: function(result){
                $.ajax({url: "http://www.nav.farmina.com.br:3001/api/Farmina-1-Service-Booking-Resources/"+id, success: function(result){
                  console.log(result)
                // $("#btn_finish_booking_upload").attr("code",result['Service-Invoice-No_']);

                  $('#finish_service_invoice_no').val(result['Service-Invoice-No_']);  
                  $('#finish_service_invoice_line_no').val(result['Service-Invoice-Line-No_']);
    
                $('#finish_customer_name').val(result['Customer-Name']);  
                $('#finish_resource_no').val(result['Resource-No_']);
                $('#finish_function').val(FunctionX(result['Function']));//no
                $('#finish_service_type').val(ServiceType(result['Service-Type']));
                $('#finish_salesperson_code').val(result['Salesperson-Code']);

                $('#finish_training_for_which_line').val(TrainingAnswer(result['Trainning-Answer-Type']));//no
                $('#finish_estimated_starting_date').val(formatDate(result['Estimated-Starting-Date']));
                $('#finish_starting_date').val(formatDate(result['Starting-Date']));
                $('#finish_starting_hour').val(formatHora(result['Starting-Time']));
                
                $('#finish_estimated_total_time').val(formatHora(result['Estimated-Total-Time']));
                $('#finish_starting_observation').val(result['Starting-Observation']);//no
                console.log('time> '+formatHora(result['Finish-Time']))
                $('#finish_date').val(formatDate(result['Finish-Date']));
                $('#finish_time').val(formatHora(result['Finish-Time']));
  

                $('#finish_how_many_customers_entered_on_store').val(result['Many-Customers'])//no
                $('#finish_how_many_voucher_was_delivered').val(result['Many-Voucher'])//no
                $('#finish_how_many_products_eas_sold').val(result['Many-Products'])//no
                $('#finish_how_many_kits_was_delivered').val(result['Many-Kits'])//no
                $('#finish_how_many_national_plans_was_generated').val(result['Many-Nutrional-Plans'])//no
              }});

            $('#finish-service-booking').modal('toggle')
          } 

            if ($(this).attr('action')=="save_photo"){
                //var x = $(this).attr(id);
                $('#photo_service_merchadising_menssage').hide();
                $('#photo_service_army_menssage').hide();
                $('#photo_service_isp_menssage').hide();
                $('#photo_service_trainning_menssage').hide();
                console.log(data )
                if(Service_type == 4 ){
                  $('#photo_service_merchadising_menssage').show();
                }
                if(Service_type == 5 ){
                  $('#photo_service_army_menssage').show();
                }
                if(Service_type == 3 ){
                  $('#photo_service_isp_menssage').show();
                }
                if(Service_type == 1 ){
                  $('#photo_service_trainning_menssage').show();
                }
                $('#photo_service_invoice_line_no').val(Service_Invoice_Line_No);
                $('#photo_service_invoice_no').val(id);
                $('#dataTableImagens').DataTable().destroy();
                loadImagensX(id);
                $('#photo-service-booking').modal('toggle'); 

            }

        });


    
    function load() {       
      $.ajax({url: "http://www.nav.farmina.com.br:3001/api/Farmina-1-Service-Booking-Resources/ServiceQueryStatus?type="+ sessionStorage.Type +"&no="+ sessionStorage.No, success: function(result){    
        
        var jsonString = result.rowDataPacket //for testing  
        console.log(jsonString)    
      //Load  datatable
      var oTblReport = $("#dataTable")
        oTblReport.DataTable ({
            "data" : jsonString,
            "scrollX": true,
            "columns" : [
              
              { "data" : "Resource-No_" },
              { "data" : "Customer-Name" },
              { "data" : "Service-Invoice-No_" },
              { "data" : "Service-Type" , "render": function ( data) {
                        return ServiceType(data);                
                } 
              },
              // { "data" : "Estimated-Total-Time" },
              { "data" : "Estimated-Starting-Date" , "render": function ( data) {
                return formatDate(data);
                } 
              },

              // { "data" : "Estimated-Finish-Date" , "render": function ( data) {
              //   return formatDate(data);
              //   } 
              // },
              { "data" : "Starting-Date" ,"visible": false , "render": function (data) {
                return formatDate(data);
                } 
              },
              { "data" : "Starting-Time" ,"visible": false , "render": function (data) {
                return formatHora(data);
                } 
              },
              { "data" : "Finish-Date" , "render": function ( data) {
                return formatDate(data);
                } 
              },
              { "data" : "Finish-Time" ,"visible": false , "render": function ( data) {
                return formatHora(data);
                } 
              },
              
              // { "data" : "Customer-No_" },            
              // { "data" : "Customer-Address" },
              // { "data" : "Salesperson-Code" },
               
              // },

              { "data" : "Status", "render": function ( data) {
                var texto = ''
                if (data == 0){
                  return '<center> - - </center>'
                }else if(data==1){
                  texto = $.i18n.prop('lToDo',lang)
                    //return 'To Do';
                    return '<span class="badge badge-pill fl-r badge-danger lh-0 p-10">'+texto+'</span>'
                }else if(data==2){
                   texto = $.i18n.prop('lStarted',lang)
                    return texto;
                }else if(data==3){
                  texto = $.i18n.prop('lAccomplished',lang)
                    ///return 'Accomplished';
                    return '<span class="badge badge-pill fl-r badge-info lh-0 p-10">'+ texto+'</span>'
                  }
                } 
              },
              { "data" : -1 , "data":null, "render": function (data,d) {
                     return formatDateStatus(data['Estimated-Starting-Date'],data['Status'])              
                 },
              },
              { "targets": -1, "data": null, 
              "render": function (a,d){
                var btn =""

                // if (a['Status']==1 || a['Status']==2){
                //   btn += "<button action='finished' type='button' class='btn cur-p btn-info'>Finalizar</button>";
                // }  
                  //btn += "<button action='starting' href='javascript:void(0);' type='button' class='btn cur-p btn-danger'>Iniciar</button>";
                  if (a['Status']==1 || a['Service-Type']==4){
                    btn += "<button action='save_photo' code="+a['Service-Invoice-No_']+" type='button' class='btn cur-p btn-success lEnviarFotosFinalizar' id='btn_finish_booking_upload'>Enviar Fotos / Finalizar </button>";
                  }

                  
                  var lang ='';
                  $('.lEnviarFotosFinalizar').html($.i18n.prop('lEnviarFotosFinalizar',lang))
              return btn;

              

              }
              
              
            }]
            
          });

          
        }        
         
      });
      
      
  };
load();
  
$("#btn_starting_booking").click(function(){
  var resource_no = $('#start_resource_no').val();
  var service_invoice_no = $('#start_service_invoice_no').val();
  var service_invoice_line_no = $('#start_service_invoice_line_no').val();
  var start_date = formatDateSql($('#start_date').val());
  var start_time = $('#start_time').val();
  var start_observation = $('#start_observation').val();
      
    
    $.ajax({url: "http://www.nav.farmina.com.br:3001/api/Farmina-1-Service-Booking-Resources/getUpdateStart?Resource-No="+resource_no+"&Service-Invoice-No="+service_invoice_no+"&Service-Invoice-Line-No="+service_invoice_line_no+"&Start-Date="+start_date+"&Start-Time="+start_time+"&Start-Observation="+start_observation, success: function(result){
    //$.ajax({url: "http://www.nav.farmina.com.br:3001/api/Farmina-1-Service-Booking-Resources/TesteSql?Finish-Date="+start_date+"&Finish-time="+start_time, success: function(result){
      

      $('#starting-service-booking').modal('toggle');
      var oTblReport = $('#dataTable').DataTable().destroy();

      load();
      }
    });
});


$("#btn_finish_booking").click(function(){
  var resource_no = $('#finish_resource_no').val();
  var service_invoice_no = $('#finish_service_invoice_no').val();
  var service_invoice_line_no = $('#finish_service_invoice_line_no').val();
  var finish_date = formatDateSql($('#finish_date').val());
  var finish_time = $('#finish_time').val();
  
  var starting_date = formatDateSql($('#finish_starting_date').val());
  var starting_hour = $('#finish_starting_hour').val();
  var starting_observation = $('#finish_starting_observation').val();

  var Many_Customers = $("#finish_how_many_customers_entered_on_store").val();
  var Many_Voucher = $("#finish_how_many_voucher_was_delivered").val();
  var Many_Products = $("#finish_how_many_products_eas_sold").val();
  var Many_Kits = $("#finish_how_many_kits_was_delivered").val();
  var Many_Nutrional_Plans = $("#finish_how_many_national_plans_was_generated").val();

  
  $.ajax({url: "http://www.nav.farmina.com.br:3001/api/Farmina-1-Service-Booking-Resources/getUpdateFinish?Resource-No="+resource_no+"&Service-Invoice-No="+service_invoice_no+"&Service-Invoice-Line-No="+service_invoice_line_no+"&Finish-Date="+finish_date+"&Finish-Time="+finish_time+"&Many-Customers=" + Many_Customers + "&Many-Voucher=" + Many_Voucher + "&Many-Products=" + Many_Products + "&Many-Kits=" + Many_Kits + "&Many-Nutrional-Plans=" + Many_Nutrional_Plans + "&starting_date="+ starting_date + "&starting_hour=" + starting_hour + "&starting_observation=" + starting_observation, success: function(result){
    $('#finish-service-booking').modal('toggle');
    var oTblReport = $('#dataTable').DataTable().destroy();

    load();
    }
  });
});




  $("#finished").click(function(){
  $('#photo-service-booking').modal('toggle')
  var id  = $("#photo_service_invoice_no").val();
  var line_no  = $("#photo_service_invoice_line_no").val();
  
  //http://www.nav.farmina.com.br:3001/api/Farmina-1-Service-Booking-Resources?filter=%7B%22where%22%20%3A%20%7B%22Service-Invoice-No_%22%3A%22WEBSO00025%22%2C%22Service-Invoice-Line-No_%22%3A%20%2225300%22%7D%7D
  var query = '{"where" : {"Service-Invoice-No_":"' + id + '","Service-Invoice-Line-No_": "' + line_no + '"}}'

    $.ajax({url: "http://www.nav.farmina.com.br:3001/api/Farmina-1-Service-Booking-Resources?filter="+query, success: function(result){
      var result = result[0] ;
      console.log(result[0])
    // $("#btn_finish_booking_upload").attr("code",result['Service-Invoice-No_']);

      $('#finish_service_invoice_no').val(result['Service-Invoice-No_']);  
      $('#finish_service_invoice_line_no').val(result['Service-Invoice-Line-No_']);

    $('#finish_customer_name').val(result['Customer-Name']);  
    $('#finish_resource_no').val(result['Resource-No_']);
    $('#finish_function').val(FunctionX(result['Function']));//no
    $('#finish_service_type').val(ServiceType(result['Service-Type']));
    $('#finish_salesperson_code').val(result['Salesperson-Code']);

    $('#finish_training_for_which_line').val(TrainingAnswer(result['Trainning-Answer-Type']));//no
    $('#finish_estimated_starting_date').val(formatDate(result['Estimated-Starting-Date']));
    $('#finish_starting_date').val(formatDate(result['Starting-Date']));
    $('#finish_starting_hour').val(formatHora(result['Starting-Time']));
    
    $('#finish_estimated_total_time').val(formatHora(result['Estimated-Total-Time']));
    $('#finish_starting_observation').val(result['Starting-Observation']);//no
    console.log('time> '+formatHora(result['Finish-Time']))
    $('#finish_date').val(formatDate(result['Finish-Date']));
    $('#finish_time').val(formatHora(result['Finish-Time']));


    $('#finish_how_many_customers_entered_on_store').val(result['Many-Customers'])//no
    $('#finish_how_many_voucher_was_delivered').val(result['Many-Voucher'])//no
    $('#finish_how_many_products_eas_sold').val(result['Many-Products'])//no
    $('#finish_how_many_kits_was_delivered').val(result['Many-Kits'])//no
    $('#finish_how_many_national_plans_was_generated').val(result['Many-Nutrional-Plans'])//no
  }});
  setTimeout(chamaFinaliza, 1000);

}) 

var chamaFinaliza = function(){
  $('#finish-service-booking').modal('toggle')
};




  $("#btn_save_photo").click(function(){
    var pasta = $('#photo_service_invoice_no').val();
    var data = new FormData();
    var file = $('#fileimagem').val();
    if (file == ""){
      alert('Por favor, ecolher arquivo!');
      return false;
    }
    var extensao = 'C:/MKT/FOTOS/'+pasta+'/'+$('#fileimagem')[0].files[0].name
    data.append('file', $('#fileimagem')[0].files[0]);
    //data.append('destino', './teste.png');
    
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://www.nav.farmina.com.br:3001/api/Containers/"+ pasta +"/upload",
        "method": "POST",
        "headers": {
          "cache-control": "no-cache",
          "postman-token": "d754895d-5909-8ac8-1e61-b09a9bab5a2b"
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": data
      }

      $.ajax(settings).done(function (response) {
        console.log(response);
        $('#fileimagem').val('');
        $('#dataTableImagens').DataTable().destroy();
        loadImagensX(pasta);
        salvaEndereco(pasta,extensao)
      });    
      //console.log(pasta)
      //loadImagensX(pasta);

  });










  function loadImagensX(id) {
    $.ajax({url: "http://www.nav.farmina.com.br:3001/api/Containers/"+id+"/files", success: function(result){
    console.log('result ' + result.length)  
    if (result.length > 0 ){
        $("#finished").attr("disabled",false);
      }else{
        $("#finished").attr("disabled",true);
       }  
    var jsonString = result 

      console.log(jsonString)    
      var datatableImages = $("#dataTableImagens")
      datatableImages.DataTable ({
          "data" : jsonString,
          "scrollX": true,
          "columns" : [
            
            { "data" : "name" , "render": function ( data) { 
              return "<img src='http://nav.farmina.com.br:3002/"+id+"/"+data+"'/ heigth='50px' width='50px'>" 
              }
            },
            { "data" : "name" }
            ]
          
        });
      }        
       
    });
    
};










function salvaEndereco(InvoiceNo_,PhotoFile){
  // alert('ewntrrou' + InvoiceNo_ + ' - ' +PhotoFile )
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://www.nav.farmina.com.br:3001/api/ServiceHeaders/getInsertImages",
      "method": "POST",
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        "postman-token": "cbc5f035-bd06-e229-08db-b3866ff0fd0d"
      },
      "data": {        
      "InvoiceNo_"  : InvoiceNo_,
        "PhotoFile" : PhotoFile
      }
    }

      $.ajax(settings).done(function (response) {
        console.log(response);

        //$('#dataTableOrdemAgendamento').DataTable().destroy();
        //loadAgendamento();
        //$('#add-agendamento').modal('toggle');  
        
      });
    }




  }  
}());

