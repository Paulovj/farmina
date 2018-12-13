import * as $ from 'jquery';
import 'datatables';
import moment from 'moment/src/moment';
import 'bootstrap-notify'
import 'jquery-i18n-properties'
export default (function () {

  var paisX = sessionStorage.Pais
    var urlX = "";
    var urlImgX = ""
    if(paisX == "Brasil"){
      urlX = "http://www.nav.farmina.com.br:3001/api/";
      
    }else{
      urlX = "http://mkt.farmina.com:3001/api/"
    }
   

  var lang = "en";
  if ((sessionStorage.Language != "") && (sessionStorage.Language != 'undefined')){
      lang = sessionStorage.Language
    }

  if(window.location.pathname == '/datatable.html'){

  //var table = $('#dataTable').DataTable(); 
  var lDemographicItems ="";
  
  function formatDateStatus(data,status) {
    //var data = '2018/11/22'
    //var dataMarcarda      = moment(new Date(data).getTime()).format("DDMMY")
    //var dataAtual = moment(new Date().getTime()).format("DDMMY")
    //console.log((moment(new Date(data).getTime()).format("DDMMY") - moment(new Date().getTime()).format("DDMMY"))/1000)
    
    var falta = (moment(new Date(data).getTime()).utc() - moment(new Date().getTime()).utc()) / 1000;
    var dias = Math.round(falta / 60 / 60 / 24);
    var horas = Math.round(falta / 60 / 60 % 24);
    
    //console.log((status + ' data da base:'+moment(new Date(data).getTime()).utc().format("DD-MM-Y") +'- data do servidor:'+ moment(new Date().getTime()).format("DD-MM-Y")))
    //console.log('quantos dias faltando:' +dias)
    var result =''
    var texto = ''
    if(status != 3){
      if (dias > 2 ){
        texto  = $.i18n.prop('lDiasRestante',lang)
        result =  '<span class="badge badge-pill fl-r badge-info lh-0 p-10">' + dias + ' ' +texto +'</span>'
      }else if (dias > 0 && dias <= 1){
        texto  = $.i18n.prop('lDiaRestante',lang)
        result =  '<span class="badge badge-pill fl-r badge-warning lh-0 p-10">' + dias + ' ' + texto + ' </span>'
        //result = 'faltam ' + dias + ' dias'
      }else if (dias > 0 && dias <= 2){
        texto  = $.i18n.prop('lDiasRestante',lang)
        result =  '<span class="badge badge-pill fl-r badge-warning lh-0 p-10">' + dias + ' ' + texto + ' </span>'
        //result = 'faltam ' + dias + ' dias'  
      }else if(dias == 0){
        texto  = $.i18n.prop('lTarefaDia',lang)
        result =  '<span class="badge badge-pill fl-r badge-success lh-0 p-10">' + texto + '</span>'
        //result = ' chegou o dia'
      }else if(dias < 0){
        texto  = $.i18n.prop('lAtrasado',lang)
        var delay  = $.i18n.prop('lDelay',lang)
        // result =  '<span class="badge badge-pill fl-r badge-danger lh-0 p-10">' + dias + ' ' + texto +'</span>'
        result =  '<span class="badge badge-pill fl-r badge-danger lh-0 p-10">'+ texto +' ' + ((dias-dias-dias)) +' '+ delay + '</span>'
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
          var id = data['Service Invoice No_'];
          var Service_Invoice_Line_No = data['Service Invoice Line No_'];
          var Service_type = data['Service Type'];
                
          if($(this).attr('action') == "starting"){
              $.ajax({
                // url: "http://www.nav.farmina.com.br:3001/api/Farmina-1-Service-Booking-Resources/"+id, 
                url: urlX+"Farmina-1-Service-Booking-Resources/"+id, 
                success: function(result){
                  console.log('resultoa hj :',result)

              
              
              $('#start_service_invoice_no').val(result['Service Invoice No_']);  
              $('#start_service_invoice_line_no').val(result['Service Invoice Line No_']);

              $('#start_customer_name').val(result['Customer Name']);  
              $('#start_resource_no').val(result['Resource No_']);
              $('#start_function').val(FunctionX(result['Function']));//no
              $('#start_service_type').val(ServiceType(result['Service Type']));
              $('#start_Salesperson_code').val(result['Salesperson Code']);
              $('#start_date').val(formatDate(result['Starting Date']));
              $('#start_time').val(formatHora(result['Starting Time']));
              $('#start_estimated_starting_date').val(formatDate(result['Estimated Starting Date']));
              $('#start_observation').val(result['Starting Observation']);//no
            }});
          
            $('#starting-service-booking').modal('toggle')
          }  

          if($(this).attr('action') == "finished"){
              //$.ajax({url: "https://app-farmina.herokuapp.com/api/service_booking_resources/"+id, success: function(result){
                $.ajax({url: urlX+"Farmina-1-Service-Booking-Resources/ServiceQueryID?Pais="+ paisX +"&ID="+id, success: function(result){

                  console.log(result)
                // $("#btn_finish_booking_upload").attr("code",result['Service-Invoice-No_']);

                  $('#finish_service_invoice_no').val(result['Service Invoice No_']);  
                  $('#finish_service_invoice_line_no').val(result['Service Invoice Line No_']);
    
                $('#finish_customer_name').val(result['Customer Name']);  
                $('#finish_resource_no').val(result['Resource No_']);
                $('#finish_function').val(FunctionX(result['Function']));//no
                $('#finish_service_type').val(ServiceType(result['Service Type']));
                $('#finish_salesperson_code').val(result['Salesperson Code']);

                $('#finish_training_for_which_line').val(TrainingAnswer(result['Trainning Answer Type']));//no
                $('#finish_estimated_starting_date').val(formatDate(result['Estimated Starting Date']));
                $('#finish_starting_date').val(formatDate(result['Starting Date']));
                $('#finish_starting_hour').val(formatHora(result['Starting Time']));
                
                $('#finish_estimated_total_time').val(formatHora(result['Estimated Total Time']));
                $('#finish_starting_observation').val(result['Starting Observation']);//no
                console.log('time> '+formatHora(result['Finish Time']))
                $('#finish_date').val(formatDate(result['Finish Date']));
                $('#finish_time').val(formatHora(result['Finish Time']));
  

                $('#finish_how_many_customers_entered_on_store').val(result['Many Customers'])//no
                $('#finish_how_many_voucher_was_delivered').val(result['Many Voucher'])//no
                $('#finish_how_many_products_eas_sold').val(result['Many Products'])//no
                $('#finish_how_many_kits_was_delivered').val(result['Many Kits'])//no
                $('#finish_how_many_national_plans_was_generated').val(result['Many Nutrional Plans'])//no
              }});

            $('#finish-service-booking').modal('toggle')
          } 

          if($(this).attr('action') == "views"){
            console.log(data);
            var service_invoice_no = data['Service Invoice No_']
            var service_invoce_line_no = data['Service Invoice Line No_']
            $.ajax({url: urlX+"Farmina-1-Service-Booking-Resources/QueryBookingResourseRelatorio?Pais="+paisX+"&service_invoice_no="+ service_invoice_no +"&service_invoce_line_no="+service_invoce_line_no, success: function(result){
              var result = result.result[0] ;
              console.log('Enmtroou no formmmmmm')
              console.log(result)
            // $("#btn_finish_booking_upload").attr("code",result['Service-Invoice-No_']);
            $('#view_question_Isp').hide();
            $('#view_question_Kit').hide();
            $('#view_question_trainning').hide();
            $('#view_question_merchandising').hide();
            $('#view_question_army').hide();
            
            
            $('#view_many_additional_meters_sim').hide();
            $('#view_type_space_out_of_shelves_sim').hide();
            $('#view_type_seasonal_sticker_sim').hide();
            $('#view_type_branding_sim').hide();
            
            
            if($('.lDate').length > 0){
              $('.lDate').removeClass('lDate').addClass('lDataInicio');
              $('.lDataInicio').html($.i18n.prop('lDataInicio',lang))
            }
            
            if(result['Service Type'] == 1){
              $('#view_question_trainning').show();
              $('#view_date_final_label').hide();
              $('#view_date_inicio_label').show();
              $('.labelDataInicio').removeClass('lDataInicio').addClass('lDate');
              $('.lDate').html($.i18n.prop('lDate',lang))
            }
            if(result['Service Type'] == 2){
              $('#view_question_Kit').show();
              $('#view_date_final_label').show();
              $('#view_date_inicio_label').show();
            }
            if(result['Service Type'] == 3){
              $('#view_question_Isp').show();
              $('#view_date_final_label').show();
              $('#view_date_inicio_label').show();
            }
            if(result['Service Type'] == 4){
              $('#view_question_merchandising').show();
              $('#view_date_inicio_label').hide();
              $('#view_date_final_label').hide();
            }
            if(result['Service Type'] == 5){
              $('#view_question_army').show();
              $('#view_date_inicio_label').show();
              $('#view_date_final_label').show();
            }
            
            
            
              $('#view_service_invoice_no').val(result['Service Invoice No_']);  
              $('#view_service_invoice_line_no').val(result['Service Invoice Line No_']);
        
            $('#view_customer_name').val(result['Customer Name']);  
            $('#view_resource_no').val(result['Resource No_']);
            $('#view_function').val(FunctionX(result['Function']));//no
            $('#view_service_type').val(ServiceType(result['Service Type']));
            $('#view_salesperson_code').val(result['Salesperson Code']);
        
            $('#view_training_for_which_line').val(TrainingAnswer(result['Trainning Answer Type']));//no
            $('#view_estimated_starting_date').val(formatDate(result['Estimated Starting Date']));
            $('#view_starting_date').val(formatDate(result['Starting Date']));
            $('#view_starting_hour').val(formatHora(result['Starting Time']));
            
            $('#view_estimated_total_time').val(formatHora(result['Estimated Total Time']));
            $('#view_starting_observation').val(result['Starting Observation']);//no
            // console.log('time> '+formatHora(result['Finish Time']))
            $('#view_date').val(formatDate(result['Finish Date']));
            $('#view_time').val(formatHora(result['Finish Time']));
        
        
            $('#view_how_many_customers_entered_on_store').val(result['Many Customers'])//no
            $('#view_how_many_voucher_was_delivered').val(result['Many Voucher'])//no
            $('#view_how_many_products_eas_sold').val(result['Many Products'])//no
            $('#view_how_many_kits_was_delivered').val(result['Many Kits'])//no
            $('#view_how_many_national_plans_was_generated').val(result['Many Nutrional Plans'])//no
            $('#view_how_many_bags').val(result['Many Bags'])
            $('#view_open_bags').val(result['Open Bags'])
            $('#view_how_many_cans').val(result['Many Cans'])
            $('#view_how_many_kg').val(result['Many KG'])
            
            $('#view_delivered').val(result['Delivered'])
             $('#view_trainning_type').val(result['Trainning Type'])
             $('#view_trainning_comments').val(result['Trainnig Comments'])   
             $('#view_number_shelves').val(result['Number of Shelves'])
             $('#view_able_to_place_on_better_position').val(result['Able to Place Better Position'])
             $('#view_able_to_get_more_space').val(result['Able to get more space'])
              if(result['Able to get more space'] == 1){
                $('#view_many_additional_meters_sim').show();
              }else{
                $('#view_many_additional_meters_sim').hide();
              }
            
             $('#view_get_additional_space_out').val(result['Get Additional space out'])
              if(result['Get Additional space out'] == 1){
                $('#view_type_space_out_of_shelves_sim').show();
              }else{
                $('#view_type_space_out_of_shelves_sim').hide();
              }
             $('#view_many_additional_meters').val(result['Many Additional Meters'])
             $('#view_type_space_out_of_shelves').val(result['Type Space out of shelves'])
             $('#view_implemented_seasonal_sticker').val(result['Implemented seasonal sticker'])
              if(result['Implemented seasonal sticker'] == 1){
                $('#view_type_seasonal_sticker_sim').show();
              }else{
                $('#view_type_seasonal_sticker_sim').hide();
              }
             $('#view_implemented_branding').val(result['Implemented Branding'])
              if(result['Implemented Branding'] == 1){
                $('#view_type_branding_sim').show();
              }else{
                $('#view_type_branding_sim').hide();
              }
             $('#view_type_seasonal_sticker').val(result['Type Seasonal Sticker'])
             $('#view_type_branding').val(result['Type Branding'])
        
             
        
            
        
        
            
        
            
            $('#view_people_spoke').val(result['Army How Many People Spoke']);
            $('#view_dry_samples').val(result['Army How Many Dry Samples']);
            $('#view_wet_Samples').val(result['Army How Many Wet Samples']);
            $('#view_print_voruchers').val(result['Army How Many Bags Dry Food']);
            $('#view_kits_delivered').val(result['Many Kits Delivered']);
            $('#view_people_refused').val(result['Many People Refused']);
            $('#view_location_activity').val(result['Location Activity']);
        
        

            $('#view_open_bags').val(result['Open Bags']);
            if(result['Open Bags'] == 1){
              $('#view_open_bags_sim').show()
            }else{
              $('#view_open_bags_sim').hide()
            }
        


              }});

          $('#views-service-booking').modal('toggle')
        } 

            if ($(this).attr('action')=="save_photo"){
                //var x = $(this).attr(id);
                $('#photo_service_merchadising_menssage').hide();
                $('#photo_service_army_menssage').hide();
                $('#photo_service_isp_menssage').hide();
                $('#photo_service_trainning_menssage').hide();
                console.log(data )
                var textoService = "";
                if(Service_type == 4 ){
                  $('#photo_service_merchadising_menssage').show();
                  textoService = $.i18n.prop('lEnviarFotoMerchandising',lang);
                }
                if(Service_type == 5 ){
                  $('#photo_service_army_menssage').show();
                  textoService = $.i18n.prop('lEnviarFotoArmy',lang);
                }
                if(Service_type == 3 ){
                  $('#photo_service_isp_menssage').show();
                  textoService = $.i18n.prop('lEnviarFotoISP',lang);
                }
                if(Service_type == 1 ){
                  $('#photo_service_trainning_menssage').show();
                  textoService = $.i18n.prop('lEnviarFotoTranning',lang);
                }
                if (Service_type==2 ){
                  textoService = $.i18n.prop('lEnviarFotoWelcomeKit',lang);
                }
                
                $('#photo_service_invoice_line_no').val(Service_Invoice_Line_No);
                $('#photo_service_invoice_no').val(id);
                $('#photo_service_type').val(Service_type);
                $('#dataTableImagens').DataTable().destroy();
                $('#msg_service_line').html(' '+ textoService +' '+ id +'  ');

                
                loadImagensX(id,Service_type);
                $('#photo-service-booking').modal('toggle'); 

            }

        });

        $("#finish_open_bags").change(function(){
          var valor      = $(this).val();
          $('#finish_how_many_kg').val('0');
          if(valor == 1){
            $('#finish_open_bags_sim').show();
          }else{
            $('#finish_open_bags_sim').hide();
          }
        });

        $("#finish_able_to_get_more_space").change(function(){
          var valor      = $(this).val();
          $('#finish_many_additional_meters').val('0');
          if(valor == 1){
            $('#finish_many_additional_meters_sim').show();
          }else{
            $('#finish_many_additional_meters_sim').hide();
          }
        });

        $("#finish_get_additional_space_out").change(function(){
          var valor      = $(this).val();
          $('#finish_type_space_out_of_shelves').val('0');
          if(valor == 1){
            $('#finish_type_space_out_of_shelves_sim').show();
          }else{
            $('#finish_type_space_out_of_shelves_sim').hide();
          }
        });


        $("#finish_implemented_seasonal_sticker").change(function(){
          var valor      = $(this).val();
          $('#finish_type_seasonal_sticker').val('0');
          if(valor == 1){
            $('#finish_type_seasonal_sticker_sim').show();
          }else{
            $('#finish_type_seasonal_sticker_sim').hide();
          }
        });

        $("#finish_implemented_branding").change(function(){
          var valor      = $(this).val();
          $('#finish_type_branding').val('0');
          if(valor == 1){
            $('#finish_type_branding_sim').show();
          }else{
            $('#finish_type_branding_sim').hide();
          }
        });
        


    
    function load() {       
      $.ajax({url: urlX+"Farmina-1-Service-Booking-Resources/ServiceQueryStatus?Pais="+paisX+"&type="+ sessionStorage.Type +"&no="+ sessionStorage.No, success: function(result){    
        var jsonString = result.rowDataPacket //for testing  
        console.log(jsonString)    
        //Load  datatable
        var oTblReport = $("#dataTable")
        oTblReport.DataTable ({
            "data" : jsonString,
            responsive: true,
            // "scrollX": true,
            "columns" : [
              
              { "data" : "Resource No_" },
              { "data" : "Customer Name" },
              { "data" : "Service Invoice No_" },
              { "data" : "Service Type" , "render": function ( data) {
                        return ServiceType(data);                
                } 
              },
              // { "data" : "Estimated-Total-Time" },
              { "data" : "Estimated Starting Date" , "render": function ( data) {
                return formatDate(data);
                } 
              },

              // { "data" : "Estimated-Finish-Date" , "render": function ( data) {
              //   return formatDate(data);
              //   } 
              // },
              { "data" : "Starting Date" ,"visible": false , "render": function (data) {
                return formatDate(data);
                } 
              },
              { "data" : "Starting Time" ,"visible": false , "render": function (data) {
                return formatHora(data);
                } 
              },
              { "data" : "Finish Date" , "render": function ( data) {
                return formatDate(data);
                } 
              },
              { "data" : "Finish Time" ,"visible": false , "render": function ( data) {
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
                     return formatDateStatus(data['Estimated Starting Date'],data['Status'])              
                 },
              },
              { "targets": -1, "data": null, 
              "render": function (a,d){
                var btn =""

                // if (a['Status']==1 || a['Status']==2){
                //   btn += "<button action='finished' type='button' class='btn cur-p btn-info'>Finalizar</button>";
                // }  
                  //btn += "<button action='starting' href='javascript:void(0);' type='button' class='btn cur-p btn-danger'>Iniciar</button>";
                  if (a['Status']==3){
                    btn += "<button action='views' code="+a['Service Invoice No_']+" type='button' class='btn cur-p btn-info lViews' id='btn_finish_booking_upload'>Views</button>";
                  }
                  if (a['Status']==1 || a['Service Type']==4){
                    btn += "<button action='save_photo' code="+a['Service Invoice No_']+" type='button' class='btn cur-p btn-success lEnviarFotosFinalizar' id='btn_finish_booking_upload'>Enviar Fotos / Finalizar </button>";
                  }

                  
                  $('.lEnviarFotosFinalizar').html($.i18n.prop('lEnviarFotosFinalizar',lang))
                  $('.lViews').html($.i18n.prop('lViews',lang))
              return btn;

              

              }
              
              
            }]
            
          });
          //  var oTblReport = $('#dataTable').DataTable().destroy();
          //  var oTblReport = $('#dataTable').DataTable();

          // $('#dataTableOrdemAgendamento').DataTable().destroy();
          // $('#dataTableOrdemAgendamento').DataTable({
          //   "scrollX": true
          // }).init();
          
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
  var valida_finish_date = $('#finish_date').val();
  var valida_starting_date = $('#starting_date').val();

  var resource_no = $('#finish_resource_no').val();
  var service_invoice_no = $('#finish_service_invoice_no').val();
  var service_invoice_line_no = $('#finish_service_invoice_line_no').val();
  var finish_date = ((!valida_finish_date)? '' :formatDateSql($('#finish_date').val()));
  var finish_time = $('#finish_time').val();
  
  var starting_date = ((!valida_starting_date)? '' : formatDateSql($('#finish_starting_date').val()));
  var starting_hour = $('#finish_starting_hour').val();
  var starting_observation = $('#finish_starting_observation').val();

  var Many_Customers = $("#finish_how_many_customers_entered_on_store").val();
  var Many_Voucher = $("#finish_how_many_voucher_was_delivered").val();
  var Many_Products = $("#finish_how_many_products_eas_sold").val();
  var Many_Kits = $("#finish_how_many_kits_was_delivered").val();
  var Many_Nutrional_Plans = $("#finish_how_many_national_plans_was_generated").val();
  
  var Many_Bags = $("#finish_how_many_bags").val();
  var Open_Bags = $("#finish_open_bags").val();

  var Many_Cans = $("#finish_how_many_cans").val();
  var Many_Kg = $("#finish_how_many_kg").val();

  var Delivered = $("#finish_delivered").val();

  var Trainning_Type = $('#finish_trainning_type').val()
  var Trainning_Comments = $('#finish_trainning_comments').val()

  var finish_number_shelves                   = $('#finish_number_shelves').val()
  var finish_able_to_place_on_better_position = $('#finish_able_to_place_on_better_position').val()
  var finish_able_to_get_more_space           = $('#finish_able_to_get_more_space').val()
  var finish_get_additional_space_out         = $('#finish_get_additional_space_out').val()
  var finish_many_additional_meters           = $('#finish_many_additional_meters').val()
  var finish_type_space_out_of_shelves        = $('#finish_type_space_out_of_shelves').val()
  var finish_implemented_seasonal_sticker     = $('#finish_implemented_seasonal_sticker').val()
  var finish_implemented_branding             = $('#finish_implemented_branding').val()
  var finish_type_seasonal_sticker            = $('#finish_type_seasonal_sticker').val()
  var finish_type_branding                    = $('#finish_type_branding').val()


  var finish_people_spoke     = $('#finish_people_spoke').val();
  var finish_dry_samples      = $('#finish_dry_samples').val();
  var finish_wet_Samples      = $('#finish_wet_Samples').val();
  //var finish_bags_dry_food    = $('#finish_bags_dry_food').val();
  var finish_print_voruchers  = $('#finish_print_voruchers').val();
  //var finish_cans_sold        = $('#finish_cans_sold').val();
  //var finish_kg_Sold          = $('#finish_kg_Sold').val();

  var finish_kits_delivered   = $('#finish_kits_delivered').val();
  var finish_people_refused          = $('#finish_people_refused').val();
  var finish_location_activity       = $('#finish_location_activity').val();

  

  

  //   $.ajax({url: urlX+"Farmina-1-Service-Booking-Resources/getUpdateFinish?Pais="+paisX+"&Resource-No="+resource_no+"&Service-Invoice-No="+service_invoice_no+"&Service-Invoice-Line-No="+service_invoice_line_no+"&Finish-Date="+finish_date+"&Finish-Time="+finish_time+"&Many-Customers=" + Many_Customers + "&Many-Voucher=" + Many_Voucher + "&Many-Products=" + Many_Products + "&Many-Kits=" + Many_Kits + "&Many-Nutrional-Plans=" + Many_Nutrional_Plans + "&starting_date="+ starting_date + "&starting_hour=" + starting_hour + "&starting_observation=" + starting_observation + "&Many-Bags="+Many_Bags+ "&Open-Bags="+ Open_Bags +"&Many-Cans="+Many_Cans+ "&Many-Kg="+Many_Kg + "&Delivered="+Delivered+ "&Trainning-Type="+Trainning_Type+ "&Trainning-Comments="+Trainning_Comments+"&finish-number-shelves="+finish_number_shelves+"&finish-able-to-place-on-better-position="+finish_able_to_place_on_better_position+"&finish-able-to-get-more-space="+finish_able_to_get_more_space+"&finish-get-additional-space-out="+finish_get_additional_space_out+"&finish-many-additional-meters="+finish_many_additional_meters+"&finish-type-space-out-of-shelves="+finish_type_space_out_of_shelves+"&finish-implemented-seasonal-sticker="+finish_implemented_seasonal_sticker+"&finish-implemented-branding="+finish_implemented_branding+"&finish-type-seasonal-sticker="+finish_type_seasonal_sticker+"&finish-type-branding="+finish_type_branding +"&People-Spoke="+finish_people_spoke+"&Dry-Samples="+finish_dry_samples+"&Wet-Samples="+finish_wet_Samples+"&Kits-Delivered="+finish_kits_delivered+"&Print-Voruchers="+finish_print_voruchers+"&People-Refused="+finish_people_refused+"&Location-Activity="+finish_location_activity  , success: function(result){
  //   $('#finish-service-booking').modal('toggle');
  //   var oTblReport = $('#dataTable').DataTable().destroy();

  //   load();
  //   }
  // });


  var settings = {
    "async": true,
    "crossDomain": true,
     "url": urlX+"Farmina-1-Service-Booking-Resources/getUpdateFinish",
    "method": "POST",
    "headers": {
      "content-type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache",
      "postman-token": "cbc5f035-bd06-e229-08db-b3866ff0fd0d"
    },
    "data": {       
      "Pais"  : paisX,
      "Resource-No":((!resource_no)? '': resource_no),
      "Service-Invoice-No":((!service_invoice_no)? '': service_invoice_no),
      "Service-Invoice-Line-No":((!service_invoice_line_no)? '': service_invoice_line_no),
      "Finish-Date":((!finish_date)? '': finish_date),
      "Finish-Time":((!finish_time)? '': finish_time),
      "Many-Customers":((!Many_Customers)? '': Many_Customers),
      "Many-Voucher":((!Many_Voucher)? '': Many_Voucher),
      "Many-Products":((!Many_Products)? '': Many_Products),
      "Many-Kits": ((!Many_Kits)? '': Many_Kits),
      "Many-Nutrional-Plans":((!Many_Nutrional_Plans)? '': Many_Nutrional_Plans),
      "starting_date": ((!starting_date)? '': starting_date),
      "starting_hour": ((!starting_hour)? '': starting_hour),
      "starting_observation":((!starting_observation)? '': starting_observation),
      "Many-Bags":((!Many_Bags)? '': Many_Bags),
      "Open-Bags": ((!Open_Bags)? '': Open_Bags),
      "Many-Cans":((!Many_Cans)? '': Many_Cans),
      "Many-Kg":((!Many_Kg)? '': Many_Kg),
      "Delivered":((!Delivered)? '': Delivered),
      "Trainning-Type":((!Trainning_Type)? '': Trainning_Type),
      "Trainning-Comments":((!Trainning_Comments)? '': Trainning_Comments),
      "finish-number-shelves":((!finish_number_shelves)? '': finish_number_shelves),
      "finish-able-to-place-on-better-position":((!finish_able_to_place_on_better_position)? '': finish_able_to_place_on_better_position),
      "finish-able-to-get-more-space":((!finish_able_to_get_more_space)? '': finish_able_to_get_more_space),
      "finish-get-additional-space-out":((!finish_get_additional_space_out)? '': finish_get_additional_space_out),
      "finish-many-additional-meters":((!finish_many_additional_meters)? '': finish_many_additional_meters),
      "finish-type-space-out-of-shelves":((!finish_type_space_out_of_shelves)? '': finish_type_space_out_of_shelves),
      "finish-implemented-seasonal-sticker":((!finish_implemented_seasonal_sticker)? '': finish_implemented_seasonal_sticker),
      "finish-implemented-branding":((!finish_implemented_branding)? '': finish_implemented_branding),
      "finish-type-seasonal-sticker":((!finish_type_seasonal_sticker)? '': finish_type_seasonal_sticker),
      "finish-type-branding":((!finish_type_branding)? '': finish_type_branding ) ,
      "People-Spoke":((!finish_people_spoke)? '': finish_people_spoke),
      "Dry-Samples":((!finish_dry_samples)? '': finish_dry_samples),
      "Wet-Samples":((!finish_wet_Samples)? '': finish_wet_Samples),
      "Kits-Delivered":((!finish_kits_delivered)? '': finish_kits_delivered),
      "Print-Voruchers":((!finish_print_voruchers)? '': finish_print_voruchers),
      "People-Refused":((!finish_people_refused)? '': finish_people_refused),
      "Location-Activity":((!finish_location_activity)? '': finish_location_activity) 
      }
  }

  $.ajax(settings).done(function (response) {
    $('#finish-service-booking').modal('toggle');
    var oTblReport = $('#dataTable').DataTable().destroy();

    load();
  }); 



});




  $("#finished").click(function(){
  $('#photo-service-booking').modal('toggle')
  var id  = $("#photo_service_invoice_no").val();
  var line_no  = $("#photo_service_invoice_line_no").val();
  
    //var query = '{"where" : {"Service-Invoice-No_":"' + id + '","Service-Invoice-Line-No_": "' + line_no + '"}}'
    //$.ajax({url: "http://www.nav.farmina.com.br:3001/api/Farmina-1-Service-Booking-Resources?filter="+query, success: function(result){
    $.ajax({url: urlX+"Farmina-1-Service-Booking-Resources/QueryBookingResourseRelatorio?Pais="+paisX+"&service_invoice_no="+ id +"&service_invoce_line_no="+line_no, success: function(result){
      var result = result.result[0] ;
      console.log('Enmtroou no formmmmmm')
      console.log(result)
    // $("#btn_finish_booking_upload").attr("code",result['Service-Invoice-No_']);
    $('#finish_question_Isp').hide();
    $('#finish_question_Kit').hide();
    $('#finish_question_trainning').hide();
    $('#finish_question_merchandising').hide();
    $('#finish_question_army').hide();
    
    
    $('#finish_many_additional_meters_sim').hide();
    $('#finish_type_space_out_of_shelves_sim').hide();
    $('#finish_type_seasonal_sticker_sim').hide();
    $('#finish_type_branding_sim').hide();
    
    
    if($('.lDate').length > 0){
      $('.lDate').removeClass('lDate').addClass('lDataInicio');
      $('.lDataInicio').html($.i18n.prop('lDataInicio',lang))
    }
    
    if(result['Service Type'] == 1){
      $('#finish_question_trainning').show();
      $('#finish_date_final_label').hide();
      $('#finish_date_inicio_label').show();
      $('.labelDataInicio').removeClass('lDataInicio').addClass('lDate');
      $('.lDate').html($.i18n.prop('lDate',lang))
    }
    if(result['Service Type'] == 2){
      $('#finish_question_Kit').show();
      $('#finish_date_final_label').show();
      $('#finish_date_inicio_label').show();
    }
    if(result['Service Type'] == 3){
      $('#finish_question_Isp').show();
      $('#finish_date_final_label').show();
      $('#finish_date_inicio_label').show();
    }
    if(result['Service Type'] == 4){
      $('#finish_question_merchandising').show();
      $('#finish_date_inicio_label').hide();
      $('#finish_date_final_label').hide();
    }
    if(result['Service Type'] == 5){
      $('#finish_question_army').show();
      $('#finish_date_inicio_label').show();
      $('#finish_date_final_label').show();
    }
    
    
    
      $('#finish_service_invoice_no').val(result['Service Invoice No_']);  
      $('#finish_service_invoice_line_no').val(result['Service Invoice Line No_']);

    $('#finish_customer_name').val(result['Customer Name']);  
    $('#finish_resource_no').val(result['Resource No_']);
    $('#finish_function').val(FunctionX(result['Function']));//no
    $('#finish_service_type').val(ServiceType(result['Service Type']));
    $('#finish_salesperson_code').val(result['Salesperson Code']);

    $('#finish_training_for_which_line').val(TrainingAnswer(result['Trainning Answer Type']));//no
    $('#finish_estimated_starting_date').val(formatDate(result['Estimated Starting Date']));
    $('#finish_starting_date').val(formatDate(result['Starting Date']));
    $('#finish_starting_hour').val(formatHora(result['Starting Time']));
    
    $('#finish_estimated_total_time').val(formatHora(result['Estimated Total Time']));
    $('#finish_starting_observation').val(result['Starting Observation']);//no
    // console.log('time> '+formatHora(result['Finish Time']))
    $('#finish_date').val(formatDate(result['Finish Date']));
    $('#finish_time').val(formatHora(result['Finish Time']));


    // $('#finish_how_many_customers_entered_on_store').val(result['Many Customers'])//no
    // $('#finish_how_many_voucher_was_delivered').val(result['Many Voucher'])//no
    // $('#finish_how_many_products_eas_sold').val(result['Many Products'])//no
    // $('#finish_how_many_kits_was_delivered').val(result['Many Kits'])//no
    // $('#finish_how_many_national_plans_was_generated').val(result['Many Nutrional Plans'])//no
    // $('#finish_how_many_bags').val(result['Many Bags'])
    // $('#finish_open_bags').val(result['Open Bags'])
    // $('#finish_how_many_cans').val(result['Many Cans'])
    // $('#finish_how_many_kg').val(result['Many KG'])
    
    // $('#finish_delivered').val(result['Delivered'])
     $('#finish_trainning_type').val(result['Trainning Type'])
     $('#finish_trainning_comments').val(result['Trainnig Comments'])   
     $('#finish_number_shelves').val(result['Number of Shelves'])
     $('#finish_able_to_place_on_better_position').val(result['Able to Place Better Position'])
     $('#finish_able_to_get_more_space').val(result['Able to get more space'])
      if(result['Able to get more space'] == 1){
        $('#finish_many_additional_meters_sim').show();
      }else{
        $('#finish_many_additional_meters_sim').hide();
      }
    
     $('#finish_get_additional_space_out').val(result['Get Additional space out'])
      if(result['Get Additional space out'] == 1){
        $('#finish_type_space_out_of_shelves_sim').show();
      }else{
        $('#finish_type_space_out_of_shelves_sim').hide();
      }
     $('#finish_many_additional_meters').val(result['Many Additional Meters'])
     $('#finish_type_space_out_of_shelves').val(result['Type Space out of shelves'])
     $('#finish_implemented_seasonal_sticker').val(result['Implemented seasonal sticker'])
      if(result['Implemented seasonal sticker'] == 1){
        $('#finish_type_seasonal_sticker_sim').show();
      }else{
        $('#finish_type_seasonal_sticker_sim').hide();
      }
     $('#finish_implemented_branding').val(result['Implemented Branding'])
      if(result['Implemented Branding'] == 1){
        $('#finish_type_branding_sim').show();
      }else{
        $('#finish_type_branding_sim').hide();
      }
     $('#finish_type_seasonal_sticker').val(result['Type Seasonal Sticker'])
     $('#finish_type_branding').val(result['Type Branding'])

     

    


    

    
    // $('#finish_people_spoke').val(result['Army How Many People Spoke']);
    // $('#finish_dry_samples').val(result['Army How Many Dry Samples']);
    // $('#finish_wet_Samples').val(result['Army How Many Wet Samples']);
    // $('#finish_print_voruchers').val(result['Army How Many Bags Dry Food']);
    // $('#finish_kits_delivered').val(result['Many Kits Delivered']);
    // $('#finish_people_refused').val(result['Many People Refused']);
    // $('#finish_location_activity').val(result['Location Activity']);


    $('#finish_how_many_customers_entered_on_store').val('');
    $('#finish_how_many_voucher_was_delivered').val('');
    $('#finish_how_many_products_eas_sold').val('');
    $('#finish_how_many_kits_was_delivered').val('');
    $('#finish_how_many_national_plans_was_generated').val('');
    $('#finish_how_many_bags').val('');
    $('#finish_open_bags').val(result['Open Bags']);
    if(result['Open Bags'] == 1){
      $('#finish_open_bags_sim').show()
    }else{
      $('#finish_open_bags_sim').hide()
    }

    $('#finish_how_many_cans').val('');
    $('#finish_how_many_kg').val('');


    $('#finish_delivered').val('');
    //$('#finish_trainning_type').val('');
    //$('#finish_trainning_comments').val('');
    // $('#finish_number_shelves').val('');
    // $('#finish_able_to_place_on_better_position').val('');
    // $('#finish_able_to_get_more_space').val('');
    // $('#finish_get_additional_space_out').val('');
    // $('#finish_many_additional_meters').val('');
    // $('#finish_type_space_out_of_shelves').val('');
    // $('#finish_implemented_seasonal_sticker').val('');
    // $('#finish_implemented_branding').val('');
    //$('#finish_type_seasonal_sticker').val('');
    //$('#finish_type_branding').val('');
    $('#finish_people_spoke').val('');
    $('#finish_dry_samples').val('');
    $('#finish_wet_Samples').val('');
    $('#finish_print_voruchers').val('');
    $('#finish_kits_delivered').val('');
    $('#finish_people_refused').val('');
    $('#finish_location_activity').val('');


    
  }});
  setTimeout(chamaFinaliza, 1000);

}) 

var chamaFinaliza = function(){
  $('#finish-service-booking').modal('toggle')
};




  // $("#btn_save_photo").click(function(){
  $("#fileimagem").change(function(){
    //alert('entrou  no change ')
    var pasta = $('#photo_service_invoice_no').val();
    var service_type  = $("#photo_service_type").val();
  
    var data = new FormData();
    var file = $('#fileimagem').val();
    if (file == ""){
      var atencao = $.i18n.prop('lAtencao',lang)
      var msg = $.i18n.prop('lParaEnviarFoto',lang)
      $.notify({
        title: atencao,
        message: msg
      },{
        type: 'pastel-danger',
        delay: 5000,
        z_index: 10000,
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
          '<span data-notify="title">{1}</span>' +
          '<span data-notify="message">{2}</span>' +
        '</div>'
      });
      return false;
    }
    var extensao = 'C:/MKT/FOTOS/'+pasta+'/'+$('#fileimagem')[0].files[0].name
    data.append('file', $('#fileimagem')[0].files[0]);
    //data.append('destino', './teste.png');
    
      var settings = {
        "async": true,
        "crossDomain": true,
        // "url": "http://www.nav.farmina.com.br:3001/api/Containers/"+ pasta +"/upload",
         "url": urlX+"Containers/"+ pasta +"/upload",
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
        console.log('retorno do respose');
        console.log(response);
        // $.notify({
        //   title: atencao,
        //   message: msg
        // },{
        //   type: 'pastel-danger',
        //   delay: 5000,
        //   z_index: 10000,
        //   template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        //     '<span data-notify="title">{1}</span>' +
        //     '<span data-notify="message">{2}</span>' +
        //   '</div>'
        // });
        $('#fileimagem').val('');
        $('#dataTableImagens').DataTable().destroy();
        loadImagensX(pasta,service_type);
        salvaEndereco(pasta,extensao)
      });    
      //console.log(pasta)
      //loadImagensX(pasta);

  });










  function loadImagensX(id,service_type) {
    $.ajax({url: urlX+"Containers/"+id+"/files", success: function(result){
    console.log('result ' + result.length)  

       //console.log('welcome kit:'+service_type)
      var maxImg = 0
      if (service_type==1 ){
        //$("#btn_save_photo").html($.i18n.prop('lEnviarFotoTranning',lang));
        maxImg = 3
      }
      if (service_type==2 ){
        //$("#finished").attr("disabled",false);
       //$("#btn_save_photo").html($.i18n.prop('lEnviarFotoWelcomeKit',lang));
      }
      if (service_type==3 ){
        //$("#btn_save_photo").html($.i18n.prop('lEnviarFotoISP',lang));
        maxImg = 5
      }
      if (service_type==4 ){
        $("#btn_save_photo").html($.i18n.prop('lEnviarFotoMerchandising',lang));
        maxImg = 10
      }
      if (service_type==5 ){
        //$("#btn_save_photo").html($.i18n.prop('lEnviarFotoArmy',lang));
        maxImg = 5
      }
      if (service_type !=2){
        if (result.length > 0){
          $("#finished").attr("disabled",false);
        }else{
          $("#finished").attr("disabled",true);
        }  
        if (result.length < maxImg ){
          $("#fileimagem").attr("disabled",false);
        }else{
          $("#fileimagem").attr("disabled",true);
        }  
      }else{
        $("#fileimagem").attr("disabled",true);
      } 



    var jsonString = result 

      console.log(jsonString)    
      var datatableImages = $("#dataTableImagens")
      datatableImages.DataTable ({
          "data" : jsonString,
          //"scrollX": true,
          "paging": false,
          "info": false,
          "searching": false,
          "columns" : [
            
            { "data" : "name" , "render": function ( data) { 
              return "<img src='http://nav.farmina.com.br:3002/"+id+"/"+data+"'/ heigth='50px' width='50px'>" 
              }
            },
            { "data" : "name" },

            { "targets": -1, "data": null, 
              "render": function (a,d){
                var btn =""
                var textoDelete = $.i18n.prop('lDelete',lang);
                    btn += "<button action='delete_photo' code="+a['name']+" type='button' class='btn cur-p btn-danger lDelete' id='btn_photo_delete'> "+textoDelete+" </button>";
              return btn;

              

              }
            }
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
      "url": urlX+"ServiceHeaders/getInsertImages",
      "method": "POST",
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        "postman-token": "cbc5f035-bd06-e229-08db-b3866ff0fd0d"
      },
      "data": {        
      "Pais"  : paisX,
      "InvoiceNo_"  : InvoiceNo_,
        "PhotoFile" : PhotoFile
      }
    }

      $.ajax(settings).done(function (response) {
        console.log('entrou  get insert images response');
        console.log(response);

        var header = $.i18n.prop('lSuccess',lang)
        var msg = $.i18n.prop('lImagenSuccess',lang)
        
        $.notify({
          title: header,
          message: msg
        },{
          type: 'pastel-success',
          delay: 5000,
          z_index: 10000,
          template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
            '<span data-notify="title">{1}</span>' +
            '<span data-notify="message">{2}</span>' +
          '</div>'
        });

        
      }).fail(function() {
        var atencao = $.i18n.prop('lAtencao',lang)
        var msg = $.i18n.prop('lPareceQueImagemJaExisteNaNossaBaseDeDados',lang)
        
        $.notify({
          title: atencao,
          message: msg
        },{
          type: 'pastel-warning',
          delay: 5000,
          z_index: 10000,
          template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
            '<span data-notify="title">{1}</span>' +
            '<span data-notify="message">{2}</span>' +
          '</div>'
        });
        
      });
    }


    $('#dataTableImagens tbody').on( 'click', 'button', function () {
      var data = $("#dataTableImagens").DataTable().row( $(this).parents('tr') ).data();
      var pasta = $('#photo_service_invoice_no').val();
      var service_type  = $("#photo_service_type").val();
      var  file =  data.name
      if($(this).attr('action') == "delete_photo"){
       
        var settings = {
          "async": true,
          "crossDomain": true,
           "url": urlX+"Containers/"+ pasta +"/files/"+file,
          "method": "DELETE",
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
          var header = $.i18n.prop('lSuccess',lang)
          var msg = $.i18n.prop('lImagenExcluidaComSucesso',lang)
          $.notify({
            title: header,
            message: msg
          },{
            type: 'pastel-success',
            delay: 5000,
            z_index: 10000,
            template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
              '<span data-notify="title">{1}</span>' +
              '<span data-notify="message">{2}</span>' +
            '</div>'
          });
          $('#dataTableImagens').DataTable().destroy();
          loadImagensX(pasta,service_type);
          
        });    
    }
  });
    


  }  
}());

