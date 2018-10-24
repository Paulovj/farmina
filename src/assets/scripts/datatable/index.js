import * as $ from 'jquery';
import 'datatables';
import moment from 'moment/src/moment';

export default (function () {
  //var table = $('#dataTable').DataTable(); 
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

  $('#dataTable tbody').on( 'click', 'button', function () {
          var data = $("#dataTable").DataTable().row( $(this).parents('tr') ).data();
          var id = data['Service-Invoice-No_']

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

        });


    
    function load() {       
      $.ajax({url: "http://www.nav.farmina.com.br:3001/api/Farmina-1-Service-Booking-Resources", success: function(result){    
        var jsonString = result //for testing  
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

              { "data" : "Estimated-Finish-Date" , "render": function ( data) {
                return formatDate(data);
                } 
              },
              { "data" : "Starting-Date" , "render": function (data) {
                return formatDate(data);
                } 
              },
              { "data" : "Starting-Time" , "render": function (data) {
                return formatHora(data);
                } 
              },
              { "data" : "Finish-Date" , "render": function ( data) {
                return formatDate(data);
                } 
              },
              { "data" : "Finish-Time" , "render": function ( data) {
                return formatHora(data);
                } 
              },
              
                            { "data" : "Customer-No_" },            
              { "data" : "Customer-Address" },
              { "data" : "Salesperson-Code" },
              // { "data" : "Trainning-Answer-Type", "render": function ( data) {
              //       return TrainingAnswer(data);              
              //   }  
              // },

              { "data" : "Status", "render": function ( data) {
                if (data == 0){
                  return '<center> - - </center>'
                }else if(data==1){
                    return 'To Do';
                }else if(data==2){
                    return 'Started';            
                }else if(data==3){
                    return 'Accomplished';
                }
              } 
            },
              { "targets": -1, "data": null, 
              "render": function (a,d){
                if (a['Status']==3){
                  return "<button action='finished' type='button' class='btn cur-p btn-info'>Finish</button>";
                }else{
                  return "<button action='starting' href='javascript:void(0);' type='button' class='btn cur-p btn-danger'>Start</button> <button action='finished' type='button' class='btn cur-p btn-info'>Finish</button>" ;
                }

              }
              //"defaultContent": "<button action='starting' href='javascript:void(0);' type='button' class='btn cur-p btn-danger'>Start</button> <button action='finished' type='button' class='btn cur-p btn-info'>Finish</button>" 
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

  
  var Many_Customers = $("#finish_how_many_customers_entered_on_store").val();
  var Many_Voucher = $("#finish_how_many_voucher_was_delivered").val();
  var Many_Products = $("#finish_how_many_products_eas_sold").val();
  var Many_Kits = $("#finish_how_many_kits_was_delivered").val();
  var Many_Nutrional_Plans = $("#finish_how_many_national_plans_was_generated").val();

  
  $.ajax({url: "http://www.nav.farmina.com.br:3001/api/Farmina-1-Service-Booking-Resources/getUpdateFinish?Resource-No="+resource_no+"&Service-Invoice-No="+service_invoice_no+"&Service-Invoice-Line-No="+service_invoice_line_no+"&Finish-Date="+finish_date+"&Finish-Time="+finish_time+"&Many-Customers=" + Many_Customers + "&Many-Voucher=" + Many_Voucher + "&Many-Products=" + Many_Products + "&Many-Kits=" + Many_Kits + "&Many-Nutrional-Plans=" + Many_Nutrional_Plans, success: function(result){
    $('#finish-service-booking').modal('toggle');
    var oTblReport = $('#dataTable').DataTable().destroy();

    load();
    }
  });
});
  
}());

