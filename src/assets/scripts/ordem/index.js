import * as $ from 'jquery';
import 'datatables';
import moment from 'moment/src/moment';

export default (function () {
  var lDemographicItems ="";
  function formatDate(date) {
    var data =  moment(date).utc().format("DD/MM/Y")
      if (data=='01/01/1753'){
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
          Service_TypeX =  'Merchan';
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

  $('#dataTableOrdemAgendamento tbody').on( 'click', 'button', function () {
          var data = $("#dataTableOrdemAgendamento").DataTable().row( $(this).parents('tr') ).data();
          var id = data['Service-Invoice-No_'];
                
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
                  
                // $("#btn_finish_booking_upload").attr("code",result['Service-Invoice-No_']);

                  $('#finish_service_invoice_no').val(result['Service-Invoice-No_']);  
                  $('#finish_service_invoice_line_no').val(result['Service-Invoice-Line-No_']);
    
                $('#finish_customer_name').val(result['Customer-Name']);  
                $('#finish_resource_no').val(result['Resource-No_']);
                $('#finish_function').val(FunctionX(result['Function']));//no
                $('#finish_service_type').val(ServiceType(result['Service-Type']));
                $('#finish_salesperson_code').val(result['Salesperson-Code']);

                $('#finish_training_for_which_line').val(TrainingAnswer(result['Trainning-Answer-Type']));//no
                $('#finish_estimated_starting_date').val(result['Estimated-Starting-Date']);
                $('#finish_estimated_total_time').val(result['Estimated-Total-Time']);
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
                console.log("tete:" + id)
                $('#photo_service_invoice_no').val(id);  
                $('#photo-service-booking').modal('toggle');  
            }

        });


    
    function load() {       
      $.ajax({url: "http://www.nav.farmina.com.br:3001/api/ServiceHeaders/getServiceHeaderQuery", success: function(result){    
        var jsonString = result.result //for testing  
        console.log('retorno agendamento: ', jsonString)
      var oTblReportAgendamento = $("#dataTableOrdemAgendamento")
        oTblReportAgendamento.DataTable ({
            "data" : jsonString,
            "scrollX": true,
            "columns" : [
              { "data" : "Document Type","visible": false},
              { "data" : "No_" },
              { "data" : "Status" },
              { "data" : "Order Date", "render": function ( data) {
                return formatDate(data);
                } 
              } ,
              { "data" : "Order Time", "render": function ( data) {
                return formatHora(data);
                } 
              },
              { "data" : "Customer No_" },
              { "data" : "Ship-to Name" },
              { "data" : "Name" },
              { "data" : "Name" },//Codigo deposito
              { "data" : "Priority" },
              { "data" : "Assigned User ID" },
              { "data" : "Professional 1" },
               { "targets": -1, "data": null, 
                "render": function (a,d){
                  var btn =""
                    btn += "<button action='finished' type='button' class='btn cur-p btn-info'>Edit</button>";                  
                    btn += "<button action='starting' href='javascript:void(0);' type='button' class='btn cur-p btn-danger'>Post</button>" ;                  
                    return btn;
              }
            }]
            
          });
        }        
         
      });

  };
load();
  



$("#btn_add_agendamento").click(function(){
  $('#add-agendamento').modal('toggle');  
})

  $("#btn_add_agendamento222222").click(function(){
    console.log('entrou na janela');


    var pasta = $('#photo_service_invoice_no').val();
    var data = new FormData();
    data.append('file', $('#fileimagem')[0].files[0]);
    
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
        $('#photo-service-booking').modal('toggle');  
      });    

  });
  
}());

