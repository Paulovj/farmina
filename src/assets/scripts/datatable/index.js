import * as $ from 'jquery';
import 'datatables';

export default (function () {
  //var table = $('#dataTable').DataTable(); 
  var lDemographicItems ="";

  $//("#btn_starting_booking .testedediv").on( 'click', 'button', function () {
  //$(".btn_starting_booking body").delegate("body", "click", function () {
    $("#btn_starting_booking").click(function(){
    console.log('clicou');
    // $.ajax({url: "http://www.nav.farmina.com.br:3001/api/Farmina-1-Service-Booking-Resources/getNewPrice?Resource-No=R0010&Service-Invoice-No=NFSR00003&Service-Invoice-Line-No=10000&status=1"+id, success: function(result){
    //     console.log('result;:');
    //     console.log(result);
    // }});

  });
  

  //$.ajax({url: "https://app-farmina.herokuapp.com/api/service_booking_resources", success: function(result){
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
            
            { "data" : "Estimated-Finish-Date" , "render": function ( data) {
              return formatDate(data);
              } 
            },
            { "data" : "Starting-Date" , "render": function ( data) {
              return formatDate(data);
              } 
            },
            { "data" : "Finish-Date" , "render": function ( data) {
              return formatDate(data);
              } 
            },
            
            { "data" : "Estimated-Starting-Date" , "render": function ( data) {
              return formatDate(data);
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
                    return '-';
              }else if(data==1){
                  return 'To Do';
              }else if(data==2){
                  return 'Started';            
              }else if(data==3){
                  return 'Accomplished';
              }
            } 
          },
            { "targets": -1, "data": null, "defaultContent": "<button action='starting' href='javascript:void(0);' type='button' class='btn cur-p btn-danger'>Start</button> <button action='finished' type='button' class='btn cur-p btn-info'>Finish</button>" }
          ]
          
        });

        function formatDate(date) {
          var d = new Date(date),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();
      
          if (month.length < 2) month = '0' + month;
          if (day.length < 2) day = '0' + day;
      
          return [year, month, day].join('-');
      }
        
        function FunctionX(value){
          var functionX = "";
              if (value == 0){
                functionX =  '-';
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
                Service_TypeX =  '-';
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
                Trainning_AnswerX =  '-';
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
          //alert($(this).attr('action') + "': teste é: "+ data['Service_Invoice_No'] );
          var id = data['Service-Invoice-No_']

          if($(this).attr('action') == "starting"){
            //$.ajax({url: "https://app-farmina.herokuapp.com/api/service_booking_resources/"+id, success: function(result){
              $.ajax({url: "http://www.nav.farmina.com.br:3001/api/Farmina-1-Service-Booking-Resources/"+id, success: function(result){
              
              $('#start_customer_name').val(result['Customer-Name']);  
              $('#start_resource_no').val(result['Resource-No_']);
              $('#start_function').val(FunctionX(result['Function']));//no
              $('#start_service_type').val(ServiceType(result['Service-Type']));
              $('#start_Salesperson_code').val(result['Salesperson-Code']);
              //$('#start_training_for_which_line').val(result['Trainning-Answer-Type']);//no
              //$('#start_training_for_which_line').val(TrainingAnswer(result['Trainning-Answer-Type']));//no
              

              $('#start_date').val(formatDate(result['Starting-Date']));
              $('#start_time').val(formatDate(result['Starting-Time']));

              $('#start_estimated_starting_date').val(formatDate(result['Estimated-Starting-Date']));
              //$('#start_estimated_total_time').val(result['Estimated-Total-Time']);
              $('#start_starting_observation').val(result['Starting-Observation']);//no
              
              
              


// Customer_Address: "string"
// Customer_Name: "string"
// Customer_No: "string"
// Estimated_Starting_Date: "2018-10-10T00:00:00.000Z"
// Estimated_Total_Time: 12
// Resource_Name: "string"
// Resource_No: "string"
// Salesperson_Code: "string"
// Service: "string"
// Service_Invoice_No: "PSER00020"
// Trainning_Answer: "string"

            }});
          
            $('#starting-service-booking').modal('toggle')
          }  

          if($(this).attr('action') == "finished"){
              //$.ajax({url: "https://app-farmina.herokuapp.com/api/service_booking_resources/"+id, success: function(result){
                $.ajax({url: "http://www.nav.farmina.com.br:3001/api/Farmina-1-Service-Booking-Resources/"+id, success: function(result){
                $('#finish_customer_name').val(result['Customer-Name']);  
                $('#finish_resource_no').val(result['Resource-No_']);
                $('#finish_function').val(FunctionX(result['Function']));//no
                $('#finish_service_type').val(ServiceType(result['Service-Type']));
                $('#finish_salesperson_code').val(result['Salesperson-Code']);

                $('#finish_training_for_which_line').val(TrainingAnswer(result['Trainning-Answer-Type']));//no
                $('#finish_estimated_starting_date').val(result['Estimated-Starting-Date']);
                $('#finish_estimated_total_time').val(result['Estimated-Total-Time']);
                $('#finish_starting_observation').val(result['Starting-Observation']);//no

                $('#finish_date').val(formatDate(result['Finish-Date']));
                $('#finish_time').val(formatDate(result['Finish-Time']));
  

                $('finish_how_many_customers_entered_on_store').val(result['Many-Customers'])//no
                $('finish_how_many_voucher_was_delivered').val(result['Many-Voucher'])//no
                $('finish_how_many_products_eas_sold').val(result['Many-Products'])//no
                $('finish_how_many_kits_was_delivered').val(result['Many-Kits'])//no
                $('finish_how_many_national_plans_was_generated').val(result['Many-Nutrional-Plans'])//no
                
  
              }});

            $('#finish-service-booking').modal('toggle')
          }  
      });
  }});

  
  
  
}());

