import * as $ from 'jquery';
import 'datatables';
import moment from 'moment/src/moment';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
import 'bootstrap-notify'
import 'jquery-i18n-properties'
export default (function () {


  var paisX = sessionStorage.Pais
    var urlX = "";
    var urlImgX = ""
    if(paisX == "Brasil"){
      urlX = "http://www.nav.farmina.com.br:3001/api/";
      urlImgX = 'http://nav.farmina.com.br:3002/';
      
    }else{
      urlX = "http://mkt.farmina.com:3001/api/"
      urlImgX = 'http://mkt.farmina.com/';
    }
   

    var lang = "en";
    if (sessionStorage.Language){
      lang = sessionStorage.Language
    }
  if(window.location.pathname == '/datatable.html'){

  //var table = $('#dataTable').DataTable(); 
  var lDemographicItems ="";
  
  function formatDateStatus(falta,status) {
    var texto =''
    var result = ''

    if(status != 3){
      if (falta > 2 ){
        texto  = $.i18n.prop('lDiasRestante',lang)
        result =  '<span class="badge badge-pill fl-r badge-info lh-0 p-10">' + falta + ' ' +texto +'</span>'
      }else if (falta == 1 ){
        texto  = $.i18n.prop('lDiaRestante',lang)
        result =  '<span class="badge badge-pill fl-r badge-warning lh-0 p-10">' + falta + ' ' + texto + ' </span>'
        }else if (falta > 1 ){
        texto  = $.i18n.prop('lDiasRestante',lang)
        result =  '<span class="badge badge-pill fl-r badge-warning lh-0 p-10">' + falta + ' ' + texto + ' </span>'
      }else if(falta == 0){
        texto  = $.i18n.prop('lTarefaDia',lang)
        result =  '<span class="badge badge-pill fl-r badge-success lh-0 p-10">' + texto +'</span>'
        //result = ' chegou o dia'
      }else if(falta == -1 ){
        texto  = $.i18n.prop('lAtrasado',lang)
        var delay  = $.i18n.prop('lDelay',lang)
        result =  '<span class="badge badge-pill fl-r badge-danger lh-0 p-10" style="font-size: 14px;">'+ texto +'</span> <br><br>'
        result +=  '<span class="badge badge-pill fl-r badge-danger lh-0 p-10">' + ((falta-falta-falta)) +' '+ delay + '</span>'
      }else if(falta < -1 ){
        texto  = $.i18n.prop('lAtrasado',lang)
        var delays  = $.i18n.prop('lDelays',lang)
        result =  '<span class="badge badge-pill fl-r badge-danger lh-0 p-10" style="font-size: 14px;">'+ texto +'</span><br><br>'
        result +=  '<span class="badge badge-pill fl-r badge-danger lh-0 p-10">' + ((falta-falta-falta)) +' '+ delays + '</span>'
      }

    }  
    return result

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
  var data = '';
  if (date != ""){
    data = moment(date, 'DD/MM/YYYY').toDate();
    data =  moment(data).format("Y-MM-DD")
  }  
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

                alert(result['Estimated Finish Time'])
                alert(formatHora(result['Estimated Finish Time']))
                $('#finish_estimated_start_time').val(formatHora(result['Estimated Start Time']));
                $('#finish_estimated_finish_time').val(formatHora(result['Estimated Finish Time']));

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

          
          if($(this).attr('action') == "viewsEdit"){
            //alert(id);
            //EditDisabledX(true,bloqueadoEdit)
            //var bloqueadoEdit = 0
            //EditDisabledX(false,bloqueadoEdit)
            $('#edit-agendamento').modal('toggle');
            $.ajax({url: urlX+"ServiceHeaders/getServiceHeaderQueryWhere?Pais="+paisX+"&No_="+id+"&Document-Type=", success: function(data){
              var data = data.result[0]
              var bloqueadoEdit = data['STATUS_BLOQ']
              var path = '\\Srv-propay\\fotos\\'+id;
              var customer_no = data['Customer No_'];
              var Salesperson = data['Salesperson Code'];
              var Billto_Address = data['Bill-to Address'];
              var Billto_Address2 = data['Bill-to Address 2'];
              var Billto_City     = data['Bill-to City'];
              var Billto_PostCode = data['Bill-to Post Code'];
              var Billto_Number = data['Number'];
              var name = data['Name'];
              var Professional1 = data['Professional 1'];
              var ServiceType1 = data['Service Type 1'];
              var PlannedDate1 = data['Planned Date 1'];
              var PlannedStartTime1 = data['Planned Start Time 1'];
              var PlannedHour1 = data['Planned Hours 1'];
              
              var ISPAnswerType1        = data['ISP Answer Type Filter 1'];
              var MerchanAnswerType1    = data['Merchan Answer Type Filter 1'];
              var TrainningAnswerType1  = data['Trainning Answer Filter 1'];
              var WelcomeKitType1       = data['Wellcome Kit Answer Filter 1'];

              
              
              var TrainningType1        = data['Trainning Type 1'];
    
              var ServicetypeResult1 =""
              if (ISPAnswerType1!=0 ){
                ServicetypeResult1 = ISPAnswerType1
              }else if(MerchanAnswerType1!=0){
                ServicetypeResult1 = MerchanAnswerType1
              }else if(TrainningAnswerType1!=0 ){
                ServicetypeResult1 = TrainningAnswerType1
              }else if(WelcomeKitType1!=0){
                ServicetypeResult1 = WelcomeKitType1
              }
              var Professional2 = data['Professional 2'];
              var ServiceType2 = data['Service Type 2'];
              var PlannedDate2 = data['Planned Date 2'];
              var PlannedStartTime2 = data['Planned Start Time 2'];
              var PlannedHour2 = data['Planned Hours 2'];
    
              var ISPAnswerType2        = data['ISP Answer Type Filter 2'];
              var MerchanAnswerType2    = data['Merchan Answer Type Filter 2'];
              var TrainningAnswerType2  = data['Trainning Answer Filter 2'];
              var WelcomeKitType2       = data['Wellcome Kit Answer Filter 2'];
    
              var ServicetypeResult2 =0
              if (ISPAnswerType2!=0 ){
                ServicetypeResult2 = ISPAnswerType2
              }else if(MerchanAnswerType2!=0){
                ServicetypeResult2 = MerchanAnswerType2
              }else if(TrainningAnswerType2!=0 ){
                ServicetypeResult2 = TrainningAnswerType2
              }else if(WelcomeKitType2!=0){
                ServicetypeResult2 = WelcomeKitType2
              }
    
              var Professional3 = data['Professional 3'];
              var ServiceType3 = data['Service Type 3'];
              var PlannedDate3 = data['Planned Date 3'];
              var PlannedStartTime3 = data['Planned Start Time 3'];
              var PlannedHour3 = data['Planned Hours 3'];
    
              var ISPAnswerType3        = data['ISP Answer Type Filter 3'];
              var MerchanAnswerType3    = data['Merchan Answer Type Filter 3'];
              var TrainningAnswerType3  = data['Trainning Answer Filter 3'];
              var WelcomeKitType3       = data['Wellcome Kit Answer Filter 3'];
    
              var ServicetypeResult3 =0
              if (ISPAnswerType3!=0 ){
                ServicetypeResult3 = ISPAnswerType3
              }else if(MerchanAnswerType3!=0){
                ServicetypeResult3 = MerchanAnswerType3
              }else if(TrainningAnswerType3!=0 ){
                ServicetypeResult3 = TrainningAnswerType3
              }else if(WelcomeKitType3!=0){
                ServicetypeResult3 = WelcomeKitType3
              }
    
              var Professional4 = data['Professional 4'];
              var ServiceType4 = data['Service Type 4'];
              var PlannedDate4 = data['Planned Date 4'];
              var PlannedStartTime4 = data['Planned Start Time 4'];
              var PlannedHour4 = data['Planned Hours 4'];
    
              var ISPAnswerType4        = data['ISP Answer Type Filter 4'];
              var MerchanAnswerType4    = data['Merchan Answer Type Filter 4'];
              var TrainningAnswerType4  = data['Trainning Answer Filter 4'];
              var WelcomeKitType4       = data['Wellcome Kit Answer Filter 4'];
    
              var ServicetypeResult4 =0
              if (ISPAnswerType4!=0 ){
                ServicetypeResult4 = ISPAnswerType4
              }else if(MerchanAnswerType4!=0){
                ServicetypeResult4 = MerchanAnswerType4
              }else if(TrainningAnswerType4!=0 ){
                ServicetypeResult4 = TrainningAnswerType4
              }else if(WelcomeKitType4!=0){
                ServicetypeResult4 = WelcomeKitType4
              }
    
              var Professional5 = data['Professional 5'];
              var ServiceType5 = data['Service Type 5'];
              var PlannedDate5 = data['Planned Date 5'];
              var PlannedStartTime5 = data['Planned Start Time 5'];
    
              var PlannedHour5 = data['Planned Hours 5'];
    
              var ISPAnswerType5        = data['ISP Answer Type Filter 5'];
              var MerchanAnswerType5    = data['Merchan Answer Type Filter 5'];
              var TrainningAnswerType5  = data['Trainning Answer Filter 5'];
              var WelcomeKitType5       = data['Wellcome Kit Answer Filter 5'];
    
              var ServicetypeResult5 =0
              if (ISPAnswerType5!=0 ){
                ServicetypeResult5 = ISPAnswerType5
              }else if(MerchanAnswerType5!=0){
                ServicetypeResult5 = MerchanAnswerType5
              }else if(TrainningAnswerType5!=0 ){
                ServicetypeResult5 = TrainningAnswerType5
              }else if(WelcomeKitType5!=0){
                ServicetypeResult5 = WelcomeKitType5
              }

              $('#edit_agendamento_n_cliente').val(customer_no)
            $('#edit_agendamento_fatura_endereco_complemento').val(Billto_Address2)
            $('#edit_agendamento_fatura_cidade').val(Billto_City)
            $('#edit_agendamento_nome').val(name)
            $('#edit_agendamento_fatura_cep').val(Billto_PostCode)
            $('#edit_agendamento_fatura_endereco').val(Billto_Address)
            $('#edit_agendamento_n').val(id)
            
            $('#edit_agendamento_cod_vendendor').val(Salesperson)
            
            
            $("#edit_agendamento_busca_professional1 option").remove();
            $("#edit_agendamento_busca_professional2 option").remove();
            $("#edit_agendamento_busca_professional3 option").remove();
            $("#edit_agendamento_busca_professional4 option").remove();
            $("#edit_agendamento_busca_professional5 option").remove();
            
            var length1 = $('#edit_agendamento_busca_professional1 > option').length;
            console.log('Edit quandadide PROFESSIONAL: ',length)
            //if (length1 == 1){
              $.ajax({url: urlX+"resourses/getResourseQuery?Pais="+paisX, success: function(obj){
                var contX = "";
                contX += '<option selected="selected" value="0">Select...</option>'
                  $.each(obj.result, function(index, value){
                    var val = value.No_ + ' | ' + value.Name;
                    //var val = value.Name;
                    var optName     = 'optName = "'+value.Name+'"';
                    contX +='<option value='+ value.No_ +' '+ optName + ' > '+val+' </option>';
                  })
                  $("#edit_agendamento_busca_professional1").append(contX)
                  $("#edit_agendamento_busca_professional2").append(contX)
                  $("#edit_agendamento_busca_professional3").append(contX)
                  $("#edit_agendamento_busca_professional4").append(contX)
                  $("#edit_agendamento_busca_professional5").append(contX)
                  //$("#edit_agendamento_busca_professional6").append(contX)

                  //Profissional 1
              console.log('teste profissional 1' + Professional1)
              $('#edit_agendamento_busca_professional1 option[value='+Professional1+']').attr('selected','selected');
              $('#edit_agendamento_planned_hour1').val(PlannedHour1);
              $('#edit_agendamento_service_type1').val(ServiceType1);
              $('#edit_agendamento_planned_date1').val(formatDate(PlannedDate1));
              
              $('#edit_agendamento_planned_start_time1').val(formatHora(PlannedStartTime1));
                  console.log('console log TrainningType1::::',TrainningType1)
              $('#edit_agendamento_trainning_type1').val(TrainningType1);
              $('#edit_agendamento_food1').val(data['Food Type 1']);
              $('#edit_agendamento_Promoting1').val(data['Promotion Type 1']);
              $('#edit_agendamento_push_new_line1').val(data['Push New Line Comments 1']);
              $('#edit_agendamento_line_slow_comments1').val(data['Line Slow Comments 1']);
              $('#edit_agendamento_how_meter1').val(data['How Mters 1']);
              $('#edit_agendamento_open_bags1').val(data['Open Bags 1']);
              $('#edit_agendamento_trainning_comments1').val(data['Trainnig Comments 1']);
              $('#edit_agendamento_army_specific_store1').val(data['For Specific Store 1']);
              $('#edit_agendamento_army_which_park1').val(data['In Wich Park 1']);
              
              $('#edit_agendamento_number_workers_train1').val(data['Number Workes to Train 1']);
              $('#edit_agendamento_projector1').val(data['Projector 1']);
              $('#edit_agendamento_buffet1').val(data['Buffet 1']);

              
              if(data['In Wich Park 1'] !=""){
                $('#div_edit_agendamento_service_result_army_which_park1').show();
              }  
              $('#edit_agendamento_location_activity_training1').val(data['Training Location 1']);

              var action ='edit'
              PromoterServiceTypeX(1,ServiceType1,action)
              
              // $('#edit_agendamento_service_result1').val('ServicetypeResult1');
              // if(ServicetypeResult1 != ""){
              //   $('#edit_agendamento_service_result1 option[value='+ServicetypeResult1+']').attr('selected','selected');
              // }  
              if(ServicetypeResult1 != ""){
                var ServicetypeResult1X =  ServicetypeResult1.split(",")               
                  ServicetypeResult1X.map(function(res){
                    $('#edit_agendamento_service_result1 option[value='+res+']').attr('selected','selected');
                  })  
                }    

              
              //Profissional 2
              console.log('teste profissional 2 ' + Professional2)
              $('#edit_agendamento_busca_professional2 option[value='+Professional2+']').attr('selected','selected');
              var PlannedHour2X = ((PlannedHour2)? PlannedHour2 : '');
              $('#edit_agendamento_planned_hour2').val(PlannedHour2X);
              $('#edit_agendamento_service_type2').val(ServiceType2);
              $('#edit_agendamento_planned_date2').val(formatDate(PlannedDate2));
              
              var PlannedStartTime2 = ((formatHora(PlannedStartTime2) =='00:00')? '': formatHora(PlannedStartTime2))
              $('#edit_agendamento_planned_start_time2').val(formatHora(PlannedStartTime2));

              $('#edit_agendamento_trainning_type2').val(data['Trainning Type 2']);
              $('#edit_agendamento_food2').val(data['Food Type 2']);
              $('#edit_agendamento_Promoting2').val(data['Promotion Type 2']);
              $('#edit_agendamento_push_new_line2').val(data['Push New Line Comments 2']);
              $('#edit_agendamento_line_slow_comments2').val(data['Line Slow Comments 2']);
              $('#edit_agendamento_how_meter2').val(data['How Mters 2']);
              $('#edit_agendamento_open_bags2').val(data['Open Bags 2']);
              $('#edit_agendamento_trainning_comments2').val(data['Trainnig Comments 2']);
              $('#edit_agendamento_army_specific_store2').val(data['For Specific Store 2']);
              $('#edit_agendamento_army_which_park2').val(data['In Wich Park 2']);

              $('#edit_agendamento_number_workers_train2').val(data['Number Workes to Train 2']);
              $('#edit_agendamento_projector2').val(data['Projector 2']);
              $('#edit_agendamento_buffet2').val(data['Buffet 2']);


              if(data['In Wich Park 2'] !=""){
                $('#div_edit_agendamento_service_result_army_which_park2').show();
              }
              $('#edit_agendamento_location_activity_training2').val(data['Training Location 2']);  
              

              var action ='edit'
              PromoterServiceTypeX(2,ServiceType2,action)
              //$('#edit_agendamento_service_result2').val(ServicetypeResult2);
              // if(ServicetypeResult2 != ""){
              //   $('#edit_agendamento_service_result2 option[value='+ServicetypeResult2+']').attr('selected','selected');
              // }  

              if(ServicetypeResult2 != ""){
                var ServicetypeResult2X =  ServicetypeResult2.split(",")
                ServicetypeResult2X.map(function(res){
                  $('#edit_agendamento_service_result2 option[value='+res+']').attr('selected','selected');
                })  
              }  

              //Profissional 3
              console.log('teste profissional 3 ' + Professional3)
              $('#edit_agendamento_busca_professional3 option[value='+Professional3+']').attr('selected','selected');
              var PlannedHour3X = ((PlannedHour3)? PlannedHour3 : '');
              $('#edit_agendamento_planned_hour3').val(PlannedHour3X);
              $('#edit_agendamento_service_type3').val(ServiceType3);
              $('#edit_agendamento_planned_date3').val(formatDate(PlannedDate3));

              $('#edit_agendamento_planned_start_time3').val(formatHora(PlannedStartTime3));

              $('#edit_agendamento_trainning_type3').val(data['Trainning Type 3']);
              $('#edit_agendamento_food3').val(data['Food Type 3']);
              $('#edit_agendamento_Promoting3').val(data['Promotion Type 3']);
              $('#edit_agendamento_push_new_line3').val(data['Push New Line Comments 3']);
              $('#edit_agendamento_line_slow_comments3').val(data['Line Slow Comments 3']);
              $('#edit_agendamento_how_meter3').val(data['How Mters 3']);
              $('#edit_agendamento_open_bags3').val(data['Open Bags 3']);
              $('#edit_agendamento_trainning_comments3').val(data['Trainnig Comments 3']);
              $('#edit_agendamento_army_specific_store3').val(data['For Specific Store 3']);
              $('#edit_agendamento_army_which_park3').val(data['In Wich Park 3']);

              $('#edit_agendamento_number_workers_train3').val(data['Number Workes to Train 3']);
              $('#edit_agendamento_projector3').val(data['Projector 3']);
              $('#edit_agendamento_buffet3').val(data['Buffet 3']);

              if(data['In Wich Park 3'] !=""){
                $('#div_edit_agendamento_service_result_army_which_park3').show();
              }  
              var action ='edit'
              PromoterServiceTypeX(3,ServiceType3,action)
              //$('#edit_agendamento_service_result3').val(ServicetypeResult3);
              // if(ServicetypeResult3 != ""){
              //   $('#edit_agendamento_service_result3 option[value='+ServicetypeResult3+']').attr('selected','selected');
              // }

              if(ServicetypeResult3 != ""){

                var ServicetypeResult3X =  ServicetypeResult3.split(",")
                ServicetypeResult3X.map(function(res){
                  $('#edit_agendamento_service_result3 option[value='+res+']').attr('selected','selected');
                })  

              }

              $('#edit_agendamento_location_activity_training3').val(data['Training Location 3']);

              

              //Profissional 4
              console.log('teste profissional' + Professional4)
              $('#edit_agendamento_busca_professional4 option[value='+Professional4+']').attr('selected','selected');
              var PlannedHour4X = ((PlannedHour4)? PlannedHour4 : '');
              $('#edit_agendamento_planned_hour4').val(PlannedHour4X);
              $('#edit_agendamento_service_type4').val(ServiceType4);
              $('#edit_agendamento_planned_date4').val(formatDate(PlannedDate4));

              $('#edit_agendamento_planned_start_time4').val(formatHora(PlannedStartTime4));

              $('#edit_agendamento_trainning_type4').val(data['Trainning Type 4']);
              $('#edit_agendamento_food4').val(data['Food Type 4']);
              $('#edit_agendamento_Promoting4').val(data['Promotion Type 4']);
              $('#add_agendamento_push_new_line4').val(data['Push New Line Comments 4']);
              $('#edit_agendamento_line_slow_comments4').val(data['Line Slow Comments 4']);
              $('#edit_agendamento_how_meter4').val(data['How Mters 4']);
              $('#edit_agendamento_open_bags4').val(data['Open Bags 4']);
              $('#edit_agendamento_trainning_comments4').val(data['Trainnig Comments 4']);
              $('#edit_agendamento_army_specific_store4').val(data['For Specific Store 4']);
              $('#edit_agendamento_army_which_park4').val(data['In Wich Park 4']);

              $('#edit_agendamento_number_workers_train4').val(data['Number Workes to Train 4']);
              $('#edit_agendamento_projector4').val(data['Projector 4']);
              $('#edit_agendamento_buffet4').val(data['Buffet 4']);


              if(data['In Wich Park 4'] !=""){
                $('#div_edit_agendamento_service_result_army_which_park4').show();
              }
              var action ='edit'
              PromoterServiceTypeX(4,ServiceType4,action)
              //$('#edit_agendamento_service_result4').val(ServicetypeResult3);
              // if(ServicetypeResult4 != ""){
              //   $('#edit_agendamento_service_result4 option[value='+ServicetypeResult4+']').attr('selected','selected');
              // }

              if(ServicetypeResult4 != ""){
                var ServicetypeResult4X =  ServicetypeResult4.split(",")
                ServicetypeResult4X.map(function(res){
                  $('#edit_agendamento_service_result4 option[value='+res+']').attr('selected','selected');
                })  
              }  
              
              $('#edit_agendamento_location_activity_training4').val(data['Training Location 4']);  



              //Profissional 5
              console.log('teste profissional' + Professional5)
              $('#edit_agendamento_busca_professional5 option[value='+Professional5+']').attr('selected','selected');
              var PlannedHour5X = ((PlannedHour5)? PlannedHour5 : '');
              $('#edit_agendamento_planned_hour5').val(PlannedHour5X);
              $('#edit_agendamento_service_type5').val(ServiceType5);
              $('#edit_agendamento_planned_date5').val(formatDate(PlannedDate5));

              $('#edit_agendamento_planned_start_time5').val(formatHora(PlannedStartTime5));

              $('#edit_agendamento_trainning_type5').val(data['Trainning Type 5']);
              $('#edit_agendamento_food5').val(data['Food Type 5']);
              $('#edit_agendamento_Promoting5').val(data['Promotion Type 5']);
              $('#add_agendamento_push_new_line5').val(data['Push New Line Comments 5']);
              $('#edit_agendamento_line_slow_comments5').val(data['Line Slow Comments 5']);
              $('#edit_agendamento_how_meter5').val(data['How Mters 5']);
              $('#edit_agendamento_open_bags5').val(data['Open Bags 5']);
              $('#edit_agendamento_trainning_comments5').val(data['Trainnig Comments 5']);
              $('#edit_agendamento_army_specific_store5').val(data['For Specific Store 5']);
              $('#edit_agendamento_army_which_park5').val(data['In Wich Park 5']);

              $('#edit_agendamento_number_workers_train5').val(data['Number Workes to Train 5']);
              $('#edit_agendamento_projector5').val(data['Projector 5']);
              $('#edit_agendamento_buffet5').val(data['Buffet 5']);

              if(data['In Wich Park 5'] !=""){
                $('#div_edit_agendamento_service_result_army_which_park5').show();
              }
              var action ='edit'
              PromoterServiceTypeX(5,ServiceType5,action)
              //$('#edit_agendamento_service_result5').val(ServicetypeResult5);
              // if(ServicetypeResult5 != ""){
              //   $('#edit_agendamento_service_result5 option[value='+ServicetypeResult5+']').attr('selected','selected');
              // }

              if(ServicetypeResult5 != ""){
                var ServicetypeResult5X =  ServicetypeResult5.split(",")
                ServicetypeResult5X.map(function(res){
                  $('#edit_agendamento_service_result5 option[value='+res+']').attr('selected','selected');
                })  
              }  

              $('#edit_agendamento_location_activity_training5').val(data['Training Location 5']);  
                  

                }
              });

           // } 

              //alert(bloqueadoEdit)
              EditDisabledX(true,bloqueadoEdit)
                console.log(data)
              }
            });  
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
            
            $('#view_estimated_start_time').val(formatHora(result['Estimated Start Time']));
            $('#view_estimated_finish_time').val(formatHora(result['Estimated Finish Time']));


            //alert('dkdsjfkdsfjsdkjf'+ result['Starting Date'])
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


            $('#view_specific_store').val(result['For Specific Store'])
            if(result['For Specific Store'] == 2){
              $('#view_army_which_park_no').show();
            }else{
              $('#view_army_which_park_no').hide();
            }

            $('#view_army_which_park').val(result['In Wich Park'])
        
            $('#view_location_activity_training').val(result['Location Activity']);
            $('#view_how_many_people_participe').val(result['How Many People Participate']);
            


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
                $('#msg_service_line').html(' '+ textoService);

                
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
          $('#finish_many_additional_meters').val('');
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
             "scrollX": true,
             columnDefs: [
              { type: 'date-br', targets: 5 }
     
            ],
            "columns" : [
              
              { "data" : "Resource No_" ,"visible": false},
              { "data" : "Customer Name" },
              { "data" : "Name" },
              { "data" : "Service Invoice No_" },
              { "data" : "Service Type" , "render": function ( data) {
                        return ServiceType(data);                
                } 
              },
              // { "data" : "Estimated-Total-Time" },
              { "data" : "Estimated Starting Date" , type: 'date-br', "render": function ( data) {
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
                     return formatDateStatus(data['Falta'],data['Status'])              
                 },
              },
              { "targets": -1, "data": null, 
              "render": function (a,d){
                var btn =""
                var textoEnviarFoto = $.i18n.prop('lEnviarFotosFinalizar',lang)

                // if (a['Status']==1 || a['Status']==2){
                //   btn += "<button action='finished' type='button' class='btn cur-p btn-info'>Finalizar</button>";
                // }  
                  //btn += "<button action='starting' href='javascript:void(0);' type='button' class='btn cur-p btn-danger'>Iniciar</button>";

                  btn += " <button action='viewsEdit' code="+a['Service Invoice No_']+" type='button' class='btn cur-p btn-info lViewsEdit' id='btn_finish_booking_upload' style='margin:1px;'>"+$.i18n.prop('lViewOrder',lang)+"</button>";
                  if (a['Status']==3){
                    btn += " <button action='views' code="+a['Service Invoice No_']+" type='button' class='btn cur-p btn-info lViews' id='btn_finish_booking_upload' style='margin:1px;'>View</button>";
                  }
                  if (a['Status']==1 &&  a['Falta']<=0){
                    btn += " <button action='save_photo' code="+a['Service Invoice No_']+" type='button' class='btn cur-p btn-success lEnviarFotosFinalizar' id='btn_finish_booking_upload' style='margin:1px;'>"+textoEnviarFoto+"</button>";
                  }

                  
                  $('.lEnviarFotosFinalizar').html($.i18n.prop('lEnviarFotosFinalizar',lang))
                  $('.lViews').html($.i18n.prop('lViews',lang))
              return btn;

              

              }
              
              
            }]
            
          });
          
          setTimeout(function(){
            $('#dataTable').DataTable().draw();        
           }, 3000);
        
          
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
function formValidacaoActivity(service_type){
  var valida =  true;
  var texto = ""
  var start_date        = $('#finish_starting_date').val();  
  var start_hour        = $('#finish_starting_hour').val();  
  var finish_time       = $('#finish_time').val();
  
  if(start_date == ""){
    texto +=  $.i18n.prop('lDataInicio',lang) + '<br>';//"Start Date " +
    valida = false
  }
  // alert(start_hour)
  if(start_hour == "" || start_hour == "00:00"){
    texto +=  $.i18n.prop('lHoraInicio',lang) + '<br>'; //"Start Hours " +
    valida = false
  }

  if(finish_time == "" || finish_time == "00:00"){
    texto += $.i18n.prop('lHoraFinal',lang) + '<br>'; // "Finish Time " +
    valida = false
  }
    
  
  
  if(service_type == "Training"){
    var location_activity = $('#finish_location_activity_training').val();  
    var people            = $('#finish_how_many_people_participe').val();  
    var start_obsevation  = $('#finish_starting_observation').val();  
    
    
  //  if(location_activity == ""){
  //     texto +=  $.i18n.prop('lLocationOfActivity',lang) + '<br>';//"Location of activity? " +
  //     valida = false
  //   }

    if(people == ""){
      texto +=  $.i18n.prop('lHowManyPeopleParticipate',lang) + '<br>'; //"How Many People Participate?" +
      valida = false
    }

    // if(start_obsevation == ""){
    //   texto += "Comments " + $.i18n.prop('lCampoObrigatorio',lang) + '<br>';
    //   valida = false
    // }

  }

  if(service_type == "Welcome Kit"){
    var delivered            = $('#finish_delivered').val();  
    var start_obsevation  = $('#finish_starting_observation').val();  
    
    if(!delivered){
      texto += $.i18n.prop('lEntregue',lang) + '<br>'; //"Delivered " + 
      valida = false
    }

    // if(start_obsevation == ""){
    //   texto += "Comments " + $.i18n.prop('lCampoObrigatorio',lang) + '<br>';
    //   valida = false
    // }

  }

  if(service_type == "ISP"){
    var many_customers_entered_on_store         = $('#finish_how_many_customers_entered_on_store').val();  
    var many_voucher_was_delivered              = $('#finish_how_many_voucher_was_delivered').val();  
    var how_many_products_eas_sold              = $('#finish_how_many_products_eas_sold').val();  
    var how_many_kits_was_delivered             = $('#finish_how_many_kits_was_delivered').val();  
    var how_many_national_plans_was_generated   = $('#finish_how_many_national_plans_was_generated').val();  
    var how_many_bags                           = $('#finish_how_many_bags').val();  
    var how_many_cans                           = $('#finish_how_many_cans').val();
    var open_bags                               = $('#finish_open_bags').val();  
    var how_many_kg                             = $('#finish_how_many_kg').val();  

    var start_obsevation                        = $('#finish_starting_observation').val();  

    
    
    if(many_customers_entered_on_store == ""){
      texto += $.i18n.prop('lQuantosClientesEntraramNaLoja',lang) + '<br>';//"Total number of people entered in store? "
      valida = false
    }

    if(many_voucher_was_delivered == ""){
      texto +=  $.i18n.prop('lQuantosComprovantesForamEntregues',lang) + '<br>';//"With how many people you spoke? " +
      valida = false
    }


    if(how_many_products_eas_sold == ""){
      texto += $.i18n.prop('lQuantosProdutosForamVendidos',lang) + '<br>';//"How many dry samples you gave? " +
      valida = false
    }

    if(how_many_kits_was_delivered == ""){
      texto +=  $.i18n.prop('lHowManyWetSamplesYouGave',lang) + '<br>';//"How many wet samples you gave? " +
      valida = false
    }

    if(how_many_national_plans_was_generated == ""){
      texto +=  $.i18n.prop('lHowManyPrintVouchersYouGave',lang) + '<br>'; //"How many print vouchers you gave? " +
      valida = false
    }
    if(open_bags == 1){
      if(how_many_kg == ""){
        texto += $.i18n.prop('lQuantosKhVendeuAberto',lang) + '<br>';//"How many KG you sold from the open bags? " + 
        valida = false
      }
    }

    if(how_many_bags == ""){
      texto += $.i18n.prop('lQuantasSacolasdeComidaSecaVoceVendeu',lang) + '<br>';//"How many bags of dry food you sold? " + 
      valida = false
    }

    if(how_many_cans == ""){
      texto +=  $.i18n.prop('lQuantasLatasVoceVendeu',lang) + '<br>';//"How many cans you sold? " +
      valida = false
    }

    // if(start_obsevation == ""){
    //   texto += "Comment " + $.i18n.prop('lCampoObrigatorio',lang) + '<br>';
    //   valida = false
    // }

  }


  if(service_type == "Merchandising"){
    var number_shelves                    = $('#finish_number_shelves').val();  
    var able_to_place_on_better_position  = $('#finish_able_to_place_on_better_position').val();  
    var able_to_get_more_space            = $('#finish_able_to_get_more_space').val();  
    //if do yes
    var many_additional_meters            = $('#finish_many_additional_meters').val();  
    
    var get_additional_space_out          = $('#finish_get_additional_space_out').val();  
    //if do yes
    var type_space_out_of_shelves         = $('#finish_type_space_out_of_shelves').val();  
    
    var implemented_seasonal_sticker      = $('#finish_implemented_seasonal_sticker').val();  
    //if do yes
    var type_seasonal_sticker             = $('#finish_type_seasonal_sticker').val();  

    
    var implemented_branding              = $('#finish_implemented_branding').val();  
    var type_branding                      = $('#finish_type_branding').val();  

    var starting_observation              = $('#finish_starting_observation').val();  
    

    
    
    if(number_shelves == ""){
      texto +=  $.i18n.prop('lNumeroPrateleirasProdutosFarmina',lang) + '<br>'; //"Number of shelves with Farmina products? " +
      valida = false
    }

    if(!able_to_place_on_better_position){
      texto +=  $.i18n.prop('lConseguiuColocarProdutoFarminaPosicaoMelhor',lang) + '<br>';//"Have you been able to place Farmina products on a better position? " +
      valida = false
    }


    if(!able_to_get_more_space){
      texto +=  $.i18n.prop('lConseguiuEspacoProduto',lang) + '<br>';//"Have you been able to get more space for products? " +
      valida = false
    }

    if(able_to_get_more_space == 1){
      if(many_additional_meters == ""){
        texto +=  $.i18n.prop('lQuantosMedidoresAdicionais',lang) + '<br>';//"How many additional meters? " +
        valida = false
      }
    }

    if(!get_additional_space_out){
      texto +=  $.i18n.prop('lConseguiuEspacoAdicionalForaPrateleira',lang) + '<br>'; //"Did you get additional space out of shelves? " +
      valida = false
    }

    if(get_additional_space_out == 1){
      if(type_space_out_of_shelves == 0){
        texto +=  $.i18n.prop('lEspacoAdicionalPara',lang) + '<br>';//"The additional space is for? " +
        valida = false
      }
    }

    if(!implemented_seasonal_sticker){
      texto +=  $.i18n.prop('lImplementouCampanhaAdesivoSazonal',lang) + '<br>';//"Have you implemented seasonal sticker campaign? " +
      valida = false
    }

    if(implemented_seasonal_sticker == 1){
      if(type_seasonal_sticker == 0){
        texto +=  $.i18n.prop('lCampanhaAdesivoSazonal',lang) + '<br>';//"The seasonal sticker campaign? " +
        valida = false
      }
    }

    if(!implemented_branding){
      texto +=  $.i18n.prop('lImplementouMarca',lang) + '<br>';//"Have you implemented branding? " +
      valida = false
    }

    if(implemented_branding == 1){
      if(type_branding == 0){
        texto +=  $.i18n.prop('lQualTipoMarca',lang) + '<br>';//"Which branding you implemented? " +
        valida = false
      }
    }


    // if(starting_observation == ""){
    //   texto += "Comment " + $.i18n.prop('lCampoObrigatorio',lang) + '<br>';
    //   valida = false
    // }

  }



   if(service_type == "Army"){
    var location_activity   = $('#finish_location_activity').val();  
    var people_spoke        = $('#finish_people_spoke').val();  
    var kits_delivered      = $('#finish_kits_delivered').val();  
    var print_voruchers     = $('#finish_print_voruchers').val();  
    var dry_samples         = $('#finish_dry_samples').val();  
    var wet_Samples         = $('#finish_wet_Samples').val();  
    var people_refused      = $('#finish_people_refused').val();  
    
    var starting_observation = $('#finish_starting_observation').val();  
    

    
    
    if(location_activity == ""){
      texto +=  $.i18n.prop('lLocationOfActivity',lang) + '<br>';//"Location of activity? " +
      valida = false
    }

    if(people_spoke == ""){
      texto += $.i18n.prop('lQuantosComprovantesForamEntregues',lang) + '<br>';//"With how many people you spoke? " +
      valida = false
    }


    if(kits_delivered == ""){
      texto +=  $.i18n.prop('lHowManyKitsYouDelivered',lang) + '<br>'; //"How many kits you delivered? " +
      valida = false
    }

    if(print_voruchers == ""){
      texto +=  $.i18n.prop('lHowManyPrintVouchersYouGave',lang) + '<br>';//"How many print vouchers you gave? " +
      valida = false
    }

    if(dry_samples == ""){
      texto +=  $.i18n.prop('lHowManyDrySamplesYouGave',lang) + '<br>';//"How many dry samples you gave? " +
      valida = false
    }

    if(wet_Samples == ""){
      texto +=  $.i18n.prop('lHowManyWetSamplesYouGave',lang) + '<br>';//"How many wet samples you gave? " +
      valida = false
    }

    if(people_refused == ""){
      texto +=  $.i18n.prop('lHowManyPeopleRefusedToSpeakWithYou',lang) + '<br>';//"How many people refused to speak with you? " +
      valida = false
    }


    // if(starting_observation == ""){
    //   texto += "Comment " + $.i18n.prop('lCampoObrigatorio',lang) + '<br>';
    //   valida = false
    // }

  }

  if(valida == false){
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

  return valida
}

$("#btn_finish_booking").click(function(){
  var service_type = $('#finish_service_type').val()
  var valida = true
  
    valida = formValidacaoActivity(service_type);
    if(valida == false){
      return false;
    }

  
  var valida_finish_date = $('#finish_date').val();
  var valida_starting_date = $('#finish_starting_date').val();

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

  var finish_location_activity       = ""

  if(service_type == "Training"){
    finish_location_activity       = $('#finish_location_activity_training').val();
  }else{
    finish_location_activity       = $('#finish_location_activity').val();
  }
  
  var finish_people_participe       = $('#finish_how_many_people_participe').val();
  

  

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
      "Location-Activity":((!finish_location_activity)? '': finish_location_activity),
      "People-Particpe":((!finish_people_participe)? '': finish_people_participe)
      
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
    $('#finish_army_which_park_no').hide();
    
    
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
      $('#finish_date_inicio_label').show();
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
    $('#finish_location_activity_training').val(result['Location Activity']);
    //alert('Data:'+result['Estimated Starting Date'])
    $('#finish_estimated_finish_time').val(formatHora(result['Estimated Finish Time']));
    $('#finish_estimated_start_time').val(formatHora(result['Estimated Start Time']));


    //$('#finish_starting_date').val(formatDate(result['Starting Date']));
    $('#finish_starting_date').val('').datepicker('destroy')
    $('#finish_starting_date').datepicker({
      format: 'dd/mm/yyyy', 
      startDate: moment(new Date(result['Estimated Starting Date'])).utc().format("DD/MM/Y"),
      todayBtn: true,
      language: "pt-BR",
      //orientation: "auto left",
      keyboardNavigation: false,
      //daysOfWeekDisabled: "6",
      // daysOfWeekHighlighted: "6",
      //calendarWeeks: true,
      autoclose: true,
      todayHighlight: true,
      toggleActive: true,
      beforeShowDay: function(date){
        toggleActive: true
      }
    });
    $('#finish_starting_date').datepicker('update');

    $('#finish_starting_hour').val(formatHora(result['Starting Time']));
    
    $('#finish_estimated_total_time').val(formatHora(result['Estimated Total Time']));
    $('#finish_starting_observation').val(result['Starting Observation']);//no
    // console.log('time> '+formatHora(result['Finish Time']))
    // $('#finish_date').val(formatDate(result['Finish Date']));
    $('#finish_date').val('').datepicker('destroy')
    $('#finish_date').datepicker({
      format: 'dd/mm/yyyy', 
      startDate: moment(new Date(result['Estimated Starting Date'])).utc().format("DD/MM/Y"),
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
    $('#finish_date').datepicker('update');
    
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
    // alert(result['Trainning Type'])
     $('#finish_trainning_type').val(result['Trainning Type'])
     $('#finish_trainning_comments').val(result['Trainnig Comments'])   
     $('#finish_number_shelves').val(result['Number of Shelves'])
     $('#finish_able_to_place_on_better_position').val(result['Able to Place Better Position'])
     $('#finish_able_to_get_more_space').val(result['Able to get more space'])
      // if(result['Able to get more space'] == 1){
      //   $('#finish_many_additional_meters_sim').show();
      // }else{
      //   $('#finish_many_additional_meters_sim').hide();
      // }
    
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
     
     $('#finish_specific_store').val(result['For Specific Store'])
     if(result['For Specific Store'] == 2){
      $('#finish_army_which_park_no').show();
    }else{
      $('#finish_army_which_park_no').hide();
    }

    $('#finish_army_which_park').val(result['In Wich Park'])
    //$('#finish_trainning_type').val(result['In Wich Park'])
     

     

     

    


    

    
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
    $('#finish_number_shelves').val('');
    $('#finish_able_to_place_on_better_position').val('');
    $('#finish_able_to_get_more_space').val('');
    $('#finish_get_additional_space_out').val('');
    $('#finish_many_additional_meters').val('');
    $('#finish_type_space_out_of_shelves').val('');
    $('#finish_implemented_seasonal_sticker').val('');
    $('#finish_implemented_branding').val('');
    $('#finish_type_seasonal_sticker').val('');
    $('#finish_type_branding').val('');

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
    var InvoiceNo_ = pasta.replace('///','');
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









  $("#fileimagemBefore").change(function(){
    var pasta = $('#photo_service_invoice_no').val()+'%5C%5CBefore';
    var InvoiceNo_ = $('#photo_service_invoice_no').val();
    var pasta2 = $('#photo_service_invoice_no').val()+'/Before';
    var service_type  = $("#photo_service_type").val();
  
    var data = new FormData();
    var file = $('#fileimagemBefore').val();
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
    var extensao = 'C:/MKT/FOTOS/'+pasta2+'/'+$('#fileimagemBefore')[0].files[0].name
    data.append('file', $('#fileimagemBefore')[0].files[0]);
    
      var settings = {
        "async": true,
        "crossDomain": true,
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
        $('#fileimagemBefore').val('');
        $('#dataTableImagens').DataTable().destroy();
        loadImagensX(InvoiceNo_,service_type);
        salvaEndereco(InvoiceNo_,extensao)
      });    
      
  });



  $("#fileimagemAfter").change(function(){
    var pasta = $('#photo_service_invoice_no').val()+'%5C%5CAfter';
    var InvoiceNo_ = $('#photo_service_invoice_no').val();
    var pasta2 = $('#photo_service_invoice_no').val()+'/After';
    var service_type  = $("#photo_service_type").val();
  
    var data = new FormData();
    var file = $('#fileimagemAfter').val();
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
    var extensao = 'C:/MKT/FOTOS/'+pasta2+'/'+$('#fileimagemAfter')[0].files[0].name
    data.append('file', $('#fileimagemAfter')[0].files[0]);
    
      var settings = {
        "async": true,
        "crossDomain": true,
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
        $('#fileimagemAfter').val('');
        $('#dataTableImagens').DataTable().destroy();
        loadImagensX(InvoiceNo_,service_type);
        salvaEndereco(InvoiceNo_,extensao)
      });    
      
  });






  function loadImagensX(id,service_type) {
    


      $.ajax({url: urlX+"Containers/"+id+"/files", success: function(result){
      console.log('result ' + result.length)  

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
        $("#fileimagemUpload").show();
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
            $("#fileimagemUpload").hide();
          }  
        }else{
          $("#fileimagem").attr("disabled",true);
          $("#fileimagemUpload").hide();
          
        } 

        

        
      

      $.ajax({url: urlX+"Containers/"+id+"%5C%5CBefore/files", success: function(resultBefore){
        console.log('result ' + resultBefore.length)  
  
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
            
          if (service_type ==4){
            $("#fileimagemUpload").hide();
            $("#fileimagemUploadBefore").show();
            if (resultBefore.length > 0){
              $("#finished").attr("disabled",false); 
            }else{
              $("#finished").attr("disabled",true);
            }  
            if (resultBefore.length < maxImg ){
              $("#fileimagemUploadBefore").attr("disabled",false);
            }else{
              $("#fileimagemUploadBefore").attr("disabled",true);
              $("#fileimagemUploadBefore").hide();
            }  
          }else{
            $("#fileimagemUploadBefore").attr("disabled",true);
            $("#fileimagemUploadBefore").hide();
            
            
          } 


          $.ajax({url: urlX+"Containers/"+id+"%5C%5CAfter/files", success: function(resultAfter){
            console.log('result ' + resultAfter.length)  
      
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
              
              if (service_type ==4){
                $("#fileimagemUploadAfter").show();
                if (resultAfter.length > 0){
                  $("#finished").attr("disabled",false); 
                }else{
                  $("#finished").attr("disabled",true);
                }  
                if (resultAfter.length < maxImg ){
                  $("#fileimagemUploadAfter").attr("disabled",false);
                }else{
                  $("#fileimagemUploadAfter").attr("disabled",true);
                  $("#fileimagemUploadAfter").hide();
                }  
              }else{
                $("#fileimagemUploadAfter").attr("disabled",true);
                //$("#fileimagemUpload").hide();
                $("#fileimagemUploadAfter").hide();

                
              } 
  
           
          
          // resultado +=result

        

      var jsonString = $.merge(result,resultBefore)
      jsonString = $.merge(jsonString,resultAfter)

      console.log(jsonString)    
      var datatableImages = $("#dataTableImagens")
      datatableImages.DataTable ({
          "data" : jsonString,
          "scrollX": true,
          "paging": false,
          "info": false,
          "searching": false,
          "columns" : [
            
            { "data" : null , "render": function ( data) { 
              var endereco =  data['container'].replace("\\\\","/")
              // return "<img src='"+urlImgX+id+"/"+data+"'/ heigth='50px' width='50px'>" 
              return "<img src='"+urlImgX+"/"+endereco+"/"+data['name']+"' heigth='50px' width='50px'>" 
              }
            },
            { "data" : "container" },
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

        

        setTimeout(function(){
          $('#dataTableImagens').DataTable().draw();        
         }, 3000);

         
        }})

      }})
    }})

    
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
      // var pasta = $('#photo_service_invoice_no').val();
      var InvoiceNo_ = $('#photo_service_invoice_no').val();
      var pasta = data.container.replace('\\\\','%5C%5C');
      var service_type  = $("#photo_service_type").val();
      var  file =  data.name
      if($(this).attr('action') == "delete_photo"){
        console.log(data);
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
          loadImagensX(InvoiceNo_,service_type);
          
        });    
    }
  });
    






















  function EditDisabledX(DisabledX,bloqueadoEditX){


    $("#edit_busca_cliente_agendamento").attr("disabled",DisabledX);
    $("#edit_busca_cliente_agendamento_nav").attr("disabled",DisabledX);
    /*Promoter 1 */
    $("#edit_agendamento_busca_professional1").attr("disabled",DisabledX);
    $("#edit_agendamento_planned_date1").attr("disabled",DisabledX);
    $("#edit_agendamento_planned_start_time1").attr("disabled",DisabledX);
    $("#edit_agendamento_planned_hour1").attr("disabled",DisabledX);
    $("#edit_agendamento_service_type1").attr("disabled",DisabledX);
    $("#edit_agendamento_location_activity_training1").attr("disabled",DisabledX);
    $("#edit_agendamento_trainning_type1").attr("disabled",DisabledX);
    $("#edit_agendamento_food1").attr("disabled",DisabledX);
    $("#edit_agendamento_Promoting1").attr("disabled",DisabledX);
    $("#add_agendamento_push_new_line1").attr("disabled",DisabledX);
    $("#edit_agendamento_line_slow_comments1").attr("disabled",DisabledX);
    $("#edit_agendamento_how_meter1").attr("disabled",DisabledX);
    $("#edit_agendamento_service_result1").attr("disabled",DisabledX);
    $("#edit_agendamento_open_bags1").attr("disabled",DisabledX);
    $("#edit_agendamento_trainning_comments1").attr("disabled",DisabledX);
    $("#edit_agendamento_army_specific_store1").attr("disabled",DisabledX);
    $("#edit_agendamento_army_which_park1").attr("disabled",DisabledX);

    $("#edit_agendamento_number_workers_train1").attr("disabled",DisabledX);
    $("#edit_agendamento_projector1").attr("disabled",DisabledX);
    $("#edit_agendamento_buffet1").attr("disabled",DisabledX);

  
    /*Promoter 2 */
    $("#edit_agendamento_busca_professional2").attr("disabled",DisabledX);
    $("#edit_agendamento_planned_date2").attr("disabled",DisabledX);
    $("#edit_agendamento_planned_start_time2").attr("disabled",DisabledX);
    $("#edit_agendamento_planned_hour2").attr("disabled",DisabledX);
    $("#edit_agendamento_service_type2").attr("disabled",DisabledX);
    $("#edit_agendamento_location_activity_training2").attr("disabled",DisabledX);
    $("#edit_agendamento_trainning_type2").attr("disabled",DisabledX);
    $("#edit_agendamento_food2").attr("disabled",DisabledX);
    $("#edit_agendamento_Promoting2").attr("disabled",DisabledX);
    $("#add_agendamento_push_new_line2").attr("disabled",DisabledX);
    $("#edit_agendamento_line_slow_comments2").attr("disabled",DisabledX);
    $("#edit_agendamento_how_meter2").attr("disabled",DisabledX);
    $("#edit_agendamento_service_result2").attr("disabled",DisabledX);
    $("#edit_agendamento_open_bags2").attr("disabled",DisabledX);
    $("#edit_agendamento_trainning_comments2").attr("disabled",DisabledX);
    $("#edit_agendamento_army_specific_store2").attr("disabled",DisabledX);
    $("#edit_agendamento_army_which_park2").attr("disabled",DisabledX);

    $("#edit_agendamento_number_workers_train2").attr("disabled",DisabledX);
    $("#edit_agendamento_projector2").attr("disabled",DisabledX);
    $("#edit_agendamento_buffet2").attr("disabled",DisabledX);
  
    /*Promoter 3 */
    $("#edit_agendamento_busca_professional3").attr("disabled",DisabledX);
    $("#edit_agendamento_planned_date3").attr("disabled",DisabledX);
    $("#edit_agendamento_planned_start_time3").attr("disabled",DisabledX);
    $("#edit_agendamento_planned_hour3").attr("disabled",DisabledX);
    $("#edit_agendamento_service_type3").attr("disabled",DisabledX);
    $("#edit_agendamento_location_activity_training3").attr("disabled",DisabledX);
    $("#edit_agendamento_trainning_type3").attr("disabled",DisabledX);
    $("#edit_agendamento_food3").attr("disabled",DisabledX);
    $("#edit_agendamento_Promoting3").attr("disabled",DisabledX);
    $("#add_agendamento_push_new_line3").attr("disabled",DisabledX);
    $("#edit_agendamento_line_slow_comments3").attr("disabled",DisabledX);
    $("#edit_agendamento_how_meter3").attr("disabled",DisabledX);
    $("#edit_agendamento_service_result3").attr("disabled",DisabledX);
    $("#edit_agendamento_open_bags3").attr("disabled",DisabledX);
    $("#edit_agendamento_trainning_comments3").attr("disabled",DisabledX);
    $("#edit_agendamento_army_specific_store3").attr("disabled",DisabledX);
    $("#edit_agendamento_army_which_park3").attr("disabled",DisabledX);

    $("#edit_agendamento_number_workers_train3").attr("disabled",DisabledX);
    $("#edit_agendamento_projector3").attr("disabled",DisabledX);
    $("#edit_agendamento_buffet3").attr("disabled",DisabledX);
  
  
    /*Promoter 4 */
    $("#edit_agendamento_busca_professional4").attr("disabled",DisabledX);
    $("#edit_agendamento_planned_date4").attr("disabled",DisabledX);
    $("#edit_agendamento_planned_start_time4").attr("disabled",DisabledX);
    $("#edit_agendamento_planned_hour4").attr("disabled",DisabledX);
    $("#edit_agendamento_service_type4").attr("disabled",DisabledX);
    $("#edit_agendamento_location_activity_training4").attr("disabled",DisabledX);
    $("#edit_agendamento_trainning_type4").attr("disabled",DisabledX);
    $("#edit_agendamento_food4").attr("disabled",DisabledX);
    $("#edit_agendamento_Promoting4").attr("disabled",DisabledX);
    $("#add_agendamento_push_new_line4").attr("disabled",DisabledX);
    $("#edit_agendamento_line_slow_comments4").attr("disabled",DisabledX);
    $("#edit_agendamento_how_meter4").attr("disabled",DisabledX);
    $("#edit_agendamento_service_result4").attr("disabled",DisabledX);
    $("#edit_agendamento_open_bags4").attr("disabled",DisabledX);
    $("#edit_agendamento_trainning_comments4").attr("disabled",DisabledX);
    $("#edit_agendamento_army_specific_store4").attr("disabled",DisabledX);
    $("#edit_agendamento_army_which_park4").attr("disabled",DisabledX);

    $("#edit_agendamento_number_workers_train4").attr("disabled",DisabledX);
    $("#edit_agendamento_projector4").attr("disabled",DisabledX);
    $("#edit_agendamento_buffet4").attr("disabled",DisabledX);
  
  
    /*Promoter 5 */
    $("#edit_agendamento_busca_professional5").attr("disabled",DisabledX);
    $("#edit_agendamento_planned_date5").attr("disabled",DisabledX);
    $("#edit_agendamento_planned_start_time5").attr("disabled",DisabledX);
    $("#edit_agendamento_planned_hour5").attr("disabled",DisabledX);
    $("#edit_agendamento_service_type5").attr("disabled",DisabledX);
    $("#edit_agendamento_location_activity_training5").attr("disabled",DisabledX);
    $("#edit_agendamento_trainning_type5").attr("disabled",DisabledX);
    $("#edit_agendamento_food5").attr("disabled",DisabledX);
    $("#edit_agendamento_Promoting5").attr("disabled",DisabledX);
    $("#add_agendamento_push_new_line5").attr("disabled",DisabledX);
    $("#edit_agendamento_line_slow_comments5").attr("disabled",DisabledX);
    $("#edit_agendamento_how_meter5").attr("disabled",DisabledX);
    $("#edit_agendamento_service_result5").attr("disabled",DisabledX);
    $("#edit_agendamento_open_bags5").attr("disabled",DisabledX);
    $("#edit_agendamento_trainning_comments5").attr("disabled",DisabledX);
    $("#edit_agendamento_army_specific_store5").attr("disabled",DisabledX);
    $("#edit_agendamento_army_which_park5").attr("disabled",DisabledX);

    $("#edit_agendamento_number_workers_train5").attr("disabled",DisabledX);
    $("#edit_agendamento_projector5").attr("disabled",DisabledX);
    $("#edit_agendamento_buffet5").attr("disabled",DisabledX);
  
    if(DisabledX === false){
      $("#btn_edit_ordem_agendamento").attr("disabled",true);
      $("#btn_save_ordem_agendamento").attr("disabled",false);
  
    }else{
      $("#btn_edit_ordem_agendamento").attr("disabled",false);
      $("#btn_save_ordem_agendamento").attr("disabled",true);
    }
  
    if(bloqueadoEditX==3){
      $("#btn_edit_ordem_agendamento").attr("disabled",true);
      $("#btn_save_ordem_agendamento").attr("disabled",true);
   
    }
    //STATUS_BLOQ
  
  
  }





  function PromoterServiceTypeX(promoter,value,action){
    var contX ="";
    var lblCont ="";
    $("#"+action+"_agendamento_service_result"+promoter+ " option").remove();
    $("#div_"+action+"_agendamento_service_result"+promoter).show()
    $("#add_agendamento_food"+promoter).val("0");
    $("#add_agendamento_push_new_line"+promoter).val("");
    $("#add_agendamento_line_slow_comments"+promoter).val("");  
    $("#add_agendamento_how_meter"+promoter).val("");  
    $("#div_"+action+"_agendamento_service_result_food"+promoter).show();
    $("#div_"+action+"_agendamento_service_result_location"+promoter).hide();
    

    $("#div_"+action+"_agendamento_service_result_projector"+promoter).hide();
  
  
    $("#add_agendamento_trainning_type"+promoter).val("0");
    $("#add_agendamento_trainning_comments"+promoter).val("");
    $("#add_agendamento_Promoting"+promoter).val("0");
    $("#add_agendamento_open_bags"+promoter).val("0");
    // $("#add_agendamento_planned_hour"+promoter).val("");
    $("#div_"+action+"_agendamento_service_result_planned_hour"+promoter).show();
    $("#add_agendamento_ISP_comments"+promoter).val("");
    
    $("#add_agendamento_army_specific_store"+promoter).val("0");
    $("#add_agendamento_army_which_park"+promoter).val("");
    
    
    if(value==1){
      //traning
      
      lblCont = $.i18n.prop('TreinamentoParaQualLinha',lang);
  
      contX +='<option value="0">  </option>';
      contX +='<option value="1">All ND lines </option>';
      contX +='<option value="2">ND Prime </option>';
      contX +='<option value="3">ND Ancestral </option>';
      contX +='<option value="4">ND Pumpkin </option>';
      contX +='<option value="5">ND Quinoa </option>';
      contX +='<option value="6">ND Ocean </option>';
      contX +='<option value="7">Vet Life </option>';
      
      $("#div_"+action+"_agendamento_service_result_food"+promoter).show();
      $("#div_"+action+"_agendamento_service_result_push"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_line"+promoter).hide();
      
      $("#div_"+action+"_agendamento_service_result_trainning_type"+promoter).show();
      $("#div_"+action+"_agendamento_service_result_tranning_comments"+promoter).show();
      $("#div_"+action+"_agendamento_service_result_promoting"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_open_bags"+promoter).hide();
      $("#div_"+action+"_agendamento_service_many_meters"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_ISP_comments"+promoter).hide();
  
      $("#div_"+action+"_agendamento_service_result_army_specific_store"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_army_which_park"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_location"+promoter).show();
      $("#div_"+action+"_agendamento_service_result_projector"+promoter).show();
  
      
  
     
  
      
    }else if(value==2){
      //KITS
      lblCont =$.i18n.prop('ParaQualLinhaVoceGostariaKitDeBoasVindas',lang);
      
      contX +='<option value="0">  </option>';
      contX +='<option value="1"> ND Prime cat </option>';
      contX +='<option value="2"> ND Ancestral cat </option>';
      contX +='<option value="3"> ND Pumpkin cat </option>';
      contX +='<option value="4"> ND Quinoa cat </option>';    
      contX +='<option value="5"> ND Ocean cat </option>';    
      contX +='<option value="6"> ND Prime dog </option>';
      contX +='<option value="7"> ND Ancestral dog </option>';
      contX +='<option value="8"> ND Pumpkin dog </option>';
      contX +='<option value="9"> ND Quinoa dog </option>';
      contX +='<option value="10">ND Ocean dog </option>';
  
      
      $("#div_"+action+"_agendamento_service_result_food"+promoter).show();
      $("#div_"+action+"_agendamento_service_result_push"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_line"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_trainning_type"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_tranning_comments"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_promoting"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_open_bags"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_planned_hour"+promoter).hide();
      $("#add_agendamento_planned_hour"+promoter).val("");
      $("#div_"+action+"_agendamento_service_many_meters"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_ISP_comments"+promoter).hide();
  
      $("#div_"+action+"_agendamento_service_result_army_specific_store"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_army_which_park"+promoter).hide();
  
  
  
      
  
  
      
    }else if(value==3){
      //ISP
      lblCont =$.i18n.prop('PorQueVoceEstaFazendoIssoISP',lang);
      contX +='<option value="0">  </option>';
      // contX +='<option value="1"> PUSH NEW LINE </option>';
      // contX +='<option value="2"> LINE SLOW </option>';
      // contX +='<option value="3"> GENERIC </option>';
  
      contX +='<option value="4"> ND Prime</option>';
      contX +='<option value="5"> ND Ancestral</option>';
      contX +='<option value="6"> ND Pumpkin</option>';
      contX +='<option value="7"> ND Quinoa</option>';
      contX +='<option value="8"> ND Ocean</option>';
      $("#div_"+action+"_agendamento_service_result_food"+promoter).show();
      $("#div_"+action+"_agendamento_service_result_push"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_line"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_trainning_type"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_tranning_comments"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_promoting"+promoter).show();
      $("#div_"+action+"_agendamento_service_result_open_bags"+promoter).show();
      $("#div_"+action+"_agendamento_service_many_meters"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_ISP_comments"+promoter).show();
  
      $("#div_"+action+"_agendamento_service_result_army_specific_store"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_army_which_park"+promoter).hide();
  
  
  
      
    }else if(value==4){
      //MERCHANDISSING
  
      
      var PlacingOfProducts = $.i18n.prop('lPlacingOfProducts',lang)
      var NewShelf = $.i18n.prop('lNewShelf',lang)
      var PlacingOfFarminaMaterials = $.i18n.prop('lPlacingOfFarminaMaterials',lang)
  
      lblCont =$.i18n.prop('QueTipoMmerchandisingVoceQuer',lang);
      contX +='<option value="0">  </option>';
      contX +='<option value="1"> '+PlacingOfProducts+'</option>';
      contX +='<option value="2"> '+NewShelf+'</option>';
      contX +='<option value="3"> '+PlacingOfFarminaMaterials+'</option>';
      $("#div_"+action+"_agendamento_service_result_food"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_push"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_line"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_trainning_type"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_tranning_comments"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_promoting"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_open_bags"+promoter).hide();
      $("#div_"+action+"_agendamento_service_many_meters"+promoter).show();
      $("#div_"+action+"_agendamento_service_result_ISP_comments"+promoter).hide();
      
      
      $("#div_"+action+"_agendamento_service_result_army_specific_store"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_army_which_park"+promoter).hide();
  
      
  
      
  
      
    }else if(value==5){
      lblCont =" Army ? ";
      contX +='<option value="0">  </option>';
      $("#div_"+action+"_agendamento_service_result"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_push"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_line"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_trainning_type"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_tranning_comments"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_promoting"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_open_bags"+promoter).hide();
      $("#div_"+action+"_agendamento_service_many_meters"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_ISP_comments"+promoter).hide();
      $("#div_"+action+"_agendamento_service_result_army_specific_store"+promoter).show();
      
  
  
      
    }  
    
    $("#lbl_"+action+"_agendamento_service_result"+promoter).html(lblCont)
    $("#"+action+"_agendamento_service_result"+promoter).append(contX)
  }



  $("#btn_edit_ordem_agendamento").click(function(){
    //alert('teste')
    var bloqueadoEdit = 0
    EditDisabledX(false,bloqueadoEdit)
  }) ;



  $('#edit_busca_cliente_agendamento').click(function(){
    var table = $('#dataTableClienteAgendamento').DataTable();
    var length = table.column(0).data().length;
    $('#edit-agendamento').modal('toggle');
    $('#action_cliente_agendamento').val('u')
    setTimeout(chamaCliente, 1000);
    if (length == 0){
      table.destroy();
      loadClienteX();
     }

     setTimeout(function(){
      $('#dataTableClienteAgendamento').DataTable().draw();
     }, 3000);

  })


  $('#edit_busca_cliente_agendamento_nav').click(function(){
    var table = $('#dataTableClienteAgendamentoNav').DataTable();
    var length = table.column(0).data().length;
    $('#edit-agendamento').modal('toggle');
    $('#action_cliente_agendamento').val('u')
    setTimeout(chamaClienteNav, 1000);
    if (length == 0){
      table.destroy();
      loadClienteNavX();
     }

     setTimeout(function(){
      $('#dataTableClienteAgendamentoNav').DataTable().draw();
     }, 3000);

  })

  

  var chamaCliente = function(){
    $('#cliente-agendamento').modal('toggle');  
  };

  var chamaClienteNav = function(){
    $('#cliente-agendamento-Nav').modal('toggle');  
  };




  function loadClienteX() {  
    // $('#dataKTableClienteAgendamento').DataTable().destroy();
    var query = "";
    var queryTerritory =""
    if(sessionStorage.Type =='0'){
      //query = '{"where":{"Territory Code": "' + sessionStorage.UF + '"}}';
      queryTerritory = '&Territory='+sessionStorage.UF;
    }
    
    // $.ajax({url: "http://www.nav.farmina.com.br:3001/api/Customers?filter="+query, success: function(result){
    $.ajax({url: urlX+"Customers/getCustomerQuery?Pais="+paisX+queryTerritory, success: function(result){
      

    var jsonString = result.result //for testing  
    var tableClienteAgendamento = $("#dataTableClienteAgendamento")
    tableClienteAgendamento.DataTable ({
          "data" : jsonString,
          rowReorder: {
            selector: 'td:nth-child(2)'
        },
        responsive: true,
          "scrollX": true,
          "columns" : [
            { "data" : "No_"},
            { "data" : "Name"},
            { "data" : "Phone No_" },
            { "data" : "Contact" },
            { "data" : "Address",},
            { "data" : "City" },
            { "data" : "Post Code" },
            { "data" : "Address 2" },
            { "data" : "Salesperson Code" },
          ]
          
        });

        $('#dataTableClienteAgendamento').DataTable().draw();        
      }        
       
    });

    
    

};




function loadClienteNavX() {  
  
  //$.ajax({timeout:15000, url: urlX+"service_booking_resources/get?Pais="+sessionStorage.Country, success: function(result){
  //var jsonString = result.data //for testing  
  var tableClienteAgendamentoNav = $("#dataTableClienteAgendamentoNav")
  tableClienteAgendamentoNav.DataTable ({
        // "data" : jsonString,
        // timeout: 60000,
        ajax: urlX+"service_booking_resources/get?Pais="+sessionStorage.Country,
        rowReorder: {
          selector: 'td:nth-child(2)'
      },
      responsive: true,
        "scrollX": true,
        "columns" : [
          { "data" : "id"},
          // { "data" : "ragsoc"},
          { "data" : "ragsoc" , "render": function ( data) {
            return data.replace('','');
          
            } 
          },
          { "data" : "tel" },
          { "data" : "contatto" },
          { "data" : "indirizzo"},
          { "data" : "comune" },
          { "data" : "cap" },
          //{ "data" : "codice" },
          { "data" : "idsam" },
        ]
        
      });

      //$('#dataTableClienteAgendamentoNav').DataTable().draw();
    }        
     
//   });

// };




$('#dataTableClienteAgendamento tbody').on( 'click', 'td', function () {
  $('#cliente-agendamento').modal('toggle');
  var data = $("#dataTableClienteAgendamento").DataTable().row( $(this).parents('tr') ).data();
   
  console.log(data)
  var id      = data['No_'];
  var name    = data['Name'];
  var address = data['Address'];
  var post    = data['Post Code'];
  var phone   = data['Phone No_'];
  var contact = data['Contact'];
  var city    = data['City'];
  var address2= data['Adrress 2'];
  var salespersonCode= data['Salesperson Code'];
  
  var action = $('#action_cliente_agendamento').val()
  
  if (action == 'i'){
    $('#add_agendamento_n_cliente').val(id)
    $('#add_agendamento_fatura_endereco_complemento').val(address2)
    $('#add_agendamento_fatura_cidade').val(city)
    $('#add_agendamento_nome').val(name)
    $('#add_agendamento_fatura_cep').val(post)
    $('#add_agendamento_fatura_endereco').val(address)
    $('#add_agendamento_cod_vendendor').val(salespersonCode)
    
    setTimeout(chamaAddAgendamento, 1000);
  } else if (action == 'u')  {
    $('#edit_agendamento_n_cliente').val(id)
    $('#edit_agendamento_fatura_endereco_complemento').val(address2)
    $('#edit_agendamento_fatura_cidade').val(city)
    $('#edit_agendamento_nome').val(name)
    $('#edit_agendamento_fatura_cep').val(post)
    $('#edit_agendamento_fatura_endereco').val(address)
    $('#edit_agendamento_cod_vendendor').val(salespersonCode)
    setTimeout(chamaEditAgendamento, 1000);
  }


})



$('#dataTableClienteAgendamentoNav tbody').on( 'click', 'td', function () {
  $('#cliente-agendamento-Nav').modal('toggle');
  var data = $("#dataTableClienteAgendamentoNav").DataTable().row( $(this).parents('tr') ).data();
   
  console.log(data)

  
  var id      = data['id'];
  var name    = data['ragsoc'];
  var address = data['indirizzo'];
  var post    = data['cap'];
  var phone   = data['tel'];
  var contact = data['contatto'];
  var city    = data['comune'];
  var address2= data['codice'];
  var salespersonCode= data['idsam'];
  
  var action = $('#action_cliente_agendamento').val()
  
  if (action == 'i'){

    
    $('#add_agendamento_n_cliente').val(id)
    $('#add_agendamento_fatura_endereco_complemento').val(address2)
    $('#add_agendamento_fatura_cidade').val(city)
    $('#add_agendamento_nome').val(name)
    $('#add_agendamento_fatura_cep').val(post)
    $('#add_agendamento_fatura_endereco').val(address)
    $('#add_agendamento_cod_vendendor').val(salespersonCode)
    
    setTimeout(chamaAddAgendamento, 1000);
  } else if (action == 'u')  {
    $('#edit_agendamento_n_cliente').val(id)
    $('#edit_agendamento_fatura_endereco_complemento').val(address2)
    $('#edit_agendamento_fatura_cidade').val(city)
    $('#edit_agendamento_nome').val(name)
    $('#edit_agendamento_fatura_cep').val(post)
    $('#edit_agendamento_fatura_endereco').val(address)
    $('#edit_agendamento_cod_vendendor').val(salespersonCode)
    setTimeout(chamaEditAgendamento, 1000);
  }


})


var chamaEditAgendamento = function(){
  $('#edit-agendamento').modal('toggle');  
};

  










$("#btn_save_ordem_agendamento").click(function(){
  var valida = true

    valida = formValidacaoOrdem(1,'edit');
    if(valida == false){
      return false;
    }
    var professional2 = $('#edit_agendamento_busca_professional2').val();
    var hora2         = $('#edit_agendamento_planned_hour2').val()
    var serviceType2   = $('#edit_agendamento_service_type2').val()
    console.log('teste console hora : ', serviceType2)
    console.log('teste console service type : ', hora2)
    if (professional2 != 0 || hora2 != "" || serviceType2 != 0 ){
      valida = formValidacaoOrdem(2,'edit');
        if(valida == false){
          return false;
        } 
    }
    var professional3 = $('#edit_agendamento_busca_professional3').val();
    var hora3         = $('#edit_agendamento_planned_hour3').val()
    var serviceType3   = $('#edit_agendamento_service_type3').val()

    if (professional3 != 0 || hora3 != "" || serviceType3 != 0 ){
      valida = formValidacaoOrdem(3,'edit');
        if(valida == false){
          return false;
        } 
    }

    var professional4 = $('#edit_agendamento_busca_professional4').val();
    var hora4         = $('#edit_agendamento_planned_hour4').val()
    var serviceType4   = $('#edit_agendamento_service_type4').val()

    if (professional4 != 0 || hora4 != "" || serviceType4 != 0 ){
      valida = formValidacaoOrdem(4,'edit');
        if(valida == false){
          return false;
        } 
    }

    var professional5 = $('#edit_agendamento_busca_professional5').val();
    var hora5         = $('#edit_agendamento_planned_hour5').val()
    var serviceType5   = $('#edit_agendamento_service_type5').val()

    if (professional5 != 0 || hora5 != "" || serviceType5 != 0 ){
      valida = formValidacaoOrdem(5,'edit');
        if(valida == false){
          return false;
        } 
    }
  console.log('entrou na janela');
  var data = new FormData();
  
  var settings = {
    "async": true,
    "crossDomain": true,
    // "url": "http://www.nav.farmina.com.br:3001/api/ServiceHeaders/getServiceHeaderUpdate",
    "url": urlX+"ServiceHeaders/getServiceHeaderUpdate",
    "method": "POST",
    "headers": {
      "content-type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache",
      "postman-token": "cbc5f035-bd06-e229-08db-b3866ff0fd0d"
    },
    "data": {        
     "Pais"             : paisX,
     "CreatedBy"             : sessionStorage.No,
     "DocumentType"             : "0",
     "No_"                      : $("#edit_agendamento_n").val(),
     "CustomerNo_"              : $("#edit_agendamento_n_cliente").val(),
     "Bill_toCustomerNo_"       : $("#edit_agendamento_cod_vendendor").val(),
     "Bill_toName"              : $("#edit_agendamento_nome").val(),
     "Bill_toName2"             : "",
     "Bill_toAddress"           : $("#edit_agendamento_fatura_endereco").val(),
     "Bill_toAddress2"          : "",
     "Bill_toCity"              : $("#edit_agendamento_fatura_cidade").val(),
     "Bill_toContact"           : $("#edit_agendamento_nome").val(),
     "Bill-to Post Code"         : $("#edit_agendamento_fatura_cep").val(),
     
     "YourReference"            : "",
     
      "Professional1"           :$("#edit_agendamento_busca_professional1").val(),
      "PlannedStartTime1"       :$("#edit_agendamento_planned_start_time1").val(),

      "PlannedDate1"            :formatDateSql($("#edit_agendamento_planned_date1").val()),
      "PlannedHours1"           :$("#edit_agendamento_planned_hour1").val(),
      "ServiceType1"            :$("#edit_agendamento_service_type1").val(),
      "ProfessionalFunction1"   :$("#edit_agendamento_service_result1").val(),


      "Food1"                     :$("#edit_agendamento_food1").val(),
      "TrainningType1"            :$("#edit_agendamento_trainning_type1").val(),
      "LocationActivityTraining1" :$("#edit_agendamento_location_activity_training1").val(),
      "TrainningComments1"        :$("#edit_agendamento_trainning_comments1").val(),
      "PushNewLine1"              :$("#edit_agendamento_push_new_line1").val(),
      "LineSlowComments1"         :$("#edit_agendamento_line_slow_comments1").val(),
      "Promoting1"                :$("#edit_agendamento_Promoting1").val(),
      "Open-Bags1"                :$("#edit_agendamento_open_bags1").val(),
      "How-Meter1"                :$("#edit_agendamento_how_meter1").val(),
      "Specific-Store1"           :$("#edit_agendamento_army_specific_store1").val(),
      "Which-Park1"               :$("#edit_agendamento_army_which_park1").val(),

      "Number-Works1"               :$("#edit_agendamento_number_workers_train1").val(),
      "Projector1"                  :$("#edit_agendamento_projector1").val(),
      "Buffet1"                     :$("#edit_agendamento_buffet1").val(),

      
      "Professional2"           :$("#edit_agendamento_busca_professional2").val(),
      "PlannedDate2"            :formatDateSql($("#edit_agendamento_planned_date2").val()),
      "PlannedHours2"           :$("#edit_agendamento_planned_hour2").val(),
      "ServiceType2"            :$("#edit_agendamento_service_type2").val(),
      "ProfessionalFunction2"   :$("#edit_agendamento_service_result2").val(),

      "Food2"                     :$("#edit_agendamento_food2").val(),
      "TrainningType2"            :$("#edit_agendamento_trainning_type2").val(),
      "LocationActivityTraining2" :$("#edit_agendamento_location_activity_training2").val(),
      "TrainningComments2"        :$("#edit_agendamento_trainning_comments2").val(),
      "PushNewLine2"              :$("#edit_agendamento_push_new_line2").val(),
      "LineSlowComments2"         :$("#edit_agendamento_line_slow_comments2").val(),
      "Promoting2"                :$("#edit_agendamento_Promoting2").val(),
      "Open-Bags2"                :$("#edit_agendamento_open_bags2").val(),
      "How-Meter2"                :$("#edit_agendamento_how_meter2").val(),
      "Specific-Store2"           :$("#edit_agendamento_army_specific_store2").val(),
      "Which-Park2"               :$("#edit_agendamento_army_which_park2").val(),
      
      "Professional3"            :$("#edit_agendamento_busca_professional3").val(),
      "PlannedDate3"            :formatDateSql($("#edit_agendamento_planned_date3").val()),
      "PlannedHours3"           :$("#edit_agendamento_planned_hour3").val(),
      "ServiceType3"            :$("#edit_agendamento_service_type3").val(),
      "ProfessionalFunction3"   :$("#edit_agendamento_service_result3").val(),

      "Number-Works2"               :$("#edit_agendamento_number_workers_train2").val(),
      "Projector2"                  :$("#edit_agendamento_projector2").val(),
      "Buffet2"                     :$("#edit_agendamento_buffet2").val(),


      "Food3"                     :$("#edit_agendamento_food3").val(),
      "TrainningType3"            :$("#edit_agendamento_trainning_type3").val(),
      "LocationActivityTraining3" :$("#edit_agendamento_location_activity_training3").val(),
      "TrainningComments3"        :$("#edit_agendamento_trainning_comments3").val(),
      "PushNewLine3"              :$("#edit_agendamento_push_new_line3").val(),
      "LineSlowComments3"         :$("#edit_agendamento_line_slow_comments3").val(),
      "Promoting3"                :$("#edit_agendamento_Promoting3").val(),
      "Open-Bags3"                :$("#edit_agendamento_open_bags3").val(),
      "How-Meter3"                :$("#edit_agendamento_how_meter3").val(),
      "Specific-Store3"           :$("#edit_agendamento_army_specific_store3").val(),
      "Which-Park3"               :$("#edit_agendamento_army_which_park3").val(),

      "Number-Works3"               :$("#edit_agendamento_number_workers_train3").val(),
      "Projector3"                  :$("#edit_agendamento_projector3").val(),
      "Buffet3"                     :$("#edit_agendamento_buffet3").val(),

      
      
      "Professional4"           :$("#edit_agendamento_busca_professional4").val(),
      "PlannedDate4"            :formatDateSql($("#edit_agendamento_planned_date4").val()),
      "PlannedHours4"           :$("#edit_agendamento_planned_hour4").val(),
      "ServiceType4"            :$("#edit_agendamento_service_type4").val(),
      "ProfessionalFunction4"   :$("#edit_agendamento_service_result4").val(),

      "Food4"                     :$("#edit_agendamento_food4").val(),
      "TrainningType4"            :$("#edit_agendamento_trainning_type4").val(),
      "LocationActivityTraining4" :$("#edit_agendamento_location_activity_training4").val(),
      "TrainningComments4"        :$("#edit_agendamento_trainning_comments4").val(),
      "PushNewLine4"              :$("#edit_agendamento_push_new_line4").val(),
      "LineSlowComments4"         :$("#edit_agendamento_line_slow_comments4").val(),
      "Promoting4"                :$("#edit_agendamento_Promoting4").val(),
      "Open-Bags4"                :$("#edit_agendamento_open_bags4").val(),
      "How-Meter4"                :$("#edit_agendamento_how_meter4").val(),
      "Specific-Store4"           :$("#edit_agendamento_army_specific_store4").val(),
      "Which-Park4"               :$("#edit_agendamento_army_which_park4").val(),
      
      "Number-Works4"               :$("#edit_agendamento_number_workers_train4").val(),
      "Projector4"                  :$("#edit_agendamento_projector4").val(),
      "Buffet4"                     :$("#edit_agendamento_buffet4").val(),


      "Professional5"           :$("#edit_agendamento_busca_professional5").val(),
      "PlannedDate5"            :formatDateSql($("#edit_agendamento_planned_date5").val()),
      "PlannedHours5"           :$("#edit_agendamento_planned_hour5").val(),
      "ServiceType5"            :$("#edit_agendamento_service_type5").val(),
      "ProfessionalFunction5"   :$("#edit_agendamento_service_result5").val(),

      "Food5"                     :$("#edit_agendamento_food5").val(),
      "TrainningType5"            :$("#edit_agendamento_trainning_type5").val(),
      "LocationActivityTraining5" :$("#edit_agendamento_location_activity_training5").val(),
      "TrainningComments5"        :$("#edit_agendamento_trainning_comments5").val(),
      "PushNewLine5"              :$("#edit_agendamento_push_new_line5").val(),
      "LineSlowComments5"         :$("#edit_agendamento_line_slow_comments5").val(),
      "Promoting5"                :$("#edit_agendamento_Promoting5").val(),
      "Open-Bags5"                :$("#edit_agendamento_open_bags5").val(),
      "How-Meter5"                :$("#edit_agendamento_how_meter5").val(),
      "Specific-Store5"           :$("#edit_agendamento_army_specific_store5").val(),
      "Which-Park5"               :$("#edit_agendamento_army_which_park5").val(),

      "Number-Works5"               :$("#edit_agendamento_number_workers_train5").val(),
      "Projector5"                  :$("#edit_agendamento_projector5").val(),
      "Buffet5"                     :$("#edit_agendamento_buffet5").val(),
      
    }
  }

    $.ajax(settings).done(function (response) {
      console.log(response);
      //$('#dataTableOrdemAgendamento').DataTable().destroy();
      //loadAgendamento();
      $('#edit-agendamento').modal('toggle');  
      
    });

});


function formValidacaoOrdem(promoter,action){
  var valida =  true;
  var texto = ""
  var profissional1        = $('#'+action+'_agendamento_busca_professional'+promoter).val();
  var planned_date1        = $('#'+action+'_agendamento_planned_date'+promoter).val();
  var planned_start_time1  = $('#'+action+'_agendamento_planned_start_time'+promoter).val();
  var planned_hour1        = $('#'+action+'_agendamento_planned_hour'+promoter).val();
  var service_type1        = $('#'+action+'_agendamento_service_type'+promoter).val();
  
  
  if(profissional1 == 0){
    texto +=  $.i18n.prop('lProfissional'+promoter,lang) +'<br>';//"Professional "+ promoter +" " +
    valida = false
  }
  if(planned_date1 == ""){
    texto +=  $.i18n.prop('lDataPlanejada',lang)+ ' ' + promoter +'<br>';//"Planned date "+ promoter +" " +
    valida = false
  }

  if(planned_start_time1 == ""){
    texto +=  $.i18n.prop('lPlannedStartTime',lang)+ ' ' + promoter +'<br>';//"Planned Start Time "+ promoter +" " +
    valida = false
  }

  if(service_type1 != 2){
    if(planned_hour1 == ""){
      texto +=  $.i18n.prop('lHoraPlanejada',lang)+ ' ' + promoter +'<br>';//"Planned Hours "+ promoter +" " +
      valida = false
    }
  }  

  if(service_type1 == 0){
    texto +=  $.i18n.prop('lTipoServico',lang)+ ' ' + promoter +'<br>';//"Service Type "+ promoter +" " +
    valida = false
  }

  /*VALIDAÇÃO TRAINING*/
  if(service_type1 == 1){
    var trainning_type1       = $('#'+action+'_agendamento_trainning_type'+promoter).val();
    var food1                 = $('#'+action+'_agendamento_food'+promoter).val();
    var service_result1       = $('#'+action+'_agendamento_service_result'+promoter).val();
    var trainning_comments1   = $('#'+action+'_agendamento_trainning_comments'+promoter).val();
    var location_activity1    = $('#'+action+'_agendamento_location_activity_training'+promoter).val();
    
    if(location_activity1 == ""){
      texto +=  $.i18n.prop('lLocation',lang)+ ' ' + promoter +'<br>';//"Training Type "+ promoter +" " +
      valida = false
    }

    if(trainning_type1 == 0){
      texto +=  $.i18n.prop('lTrainningType',lang)+ ' ' + promoter +'<br>';//"Training Type "+ promoter +" " +
      valida = false
    }

    if(food1 == 0){
      texto +=  $.i18n.prop('lTypeFood',lang)+ ' ' + promoter +'<br>';//"Type of Food "+ promoter +" " +
      valida = false
    }

    if(service_result1 == 0){
      texto +=  $.i18n.prop('TreinamentoParaQualLinha',lang)+ ' ' + promoter +'<br>';//"Training For a Line "+ promoter +" " +
      valida = false
    }
    if(trainning_comments1 == ""){
      texto +=  $.i18n.prop('lObservacaoInicial',lang)+ ' ' + promoter +'<br>';//"Comments "+ promoter +" " +
      valida = false
    }
  }

  /*VALIDAÇÃO WELCOME KIT*/
  if(service_type1 == 2){
    var food1                 = $('#'+action+'_agendamento_food'+promoter).val();
    var service_result1       = $('#'+action+'_agendamento_service_result'+promoter).val();
    
    if(food1 == 0){
      texto += $.i18n.prop('lTypeFood',lang)+ ' ' + promoter +'<br>';//"Type of Food "+ promoter +" " + 
      valida = false
    }

    if(service_result1 == 0){
      texto += $.i18n.prop('ParaQualLinhaVoceGostariaKitDeBoasVindas',lang)+ ' ' + promoter +'<br>';// "Welcome kit for which line "+ promoter +" " +
      valida = false
    }
    
  }

  /*VALIDAÇÃO ISP*/
  if(service_type1 == 3){
    var food1            = $('#'+action+'_agendamento_food'+promoter).val();
    var Promoting1       = $('#'+action+'_agendamento_Promoting'+promoter).val();
    var service_result1  = $('#'+action+'_agendamento_service_result'+promoter).val();
    var open_bags        = $('#'+action+'_agendamento_open_bags'+promoter).val();

    if(food1 == 0){
      texto +=  $.i18n.prop('lTypeFood',lang)+ ' ' + promoter +'<br>';//"Type of Food "+ promoter +" " +
      valida = false
    }

    if(Promoting1 == 0){
      texto += $.i18n.prop('lPromoting',lang)+ ' ' + promoter +'<br>';//"Type of promotion "+ promoter +" " + 
      valida = false
    }

    if(service_result1 == 0){
      texto +=  $.i18n.prop('PorQueVoceEstaFazendoIssoISP',lang)+ ' ' + promoter +'<br>';//"Purpose of the promotion "+ promoter +" " +
      valida = false
    }

    if(open_bags == 0){
      texto +=  $.i18n.prop('lThisStoreIsSellingOpenBags',lang)+ ' ' + promoter +'<br>';//"This store is selling open bags "+ promoter +" " +
      valida = false
    }
    
  }

  /*VALIDAÇÃO   MERCHANDISSING*/
  if(service_type1 == 4){
    var how_meter1          = $('#'+action+'_agendamento_how_meter'+promoter).val();
    var service_result1     = $('#'+action+'_agendamento_service_result'+promoter).val();
    
    if(how_meter1 == ""){
      texto +=  $.i18n.prop('lCampoObrigatorio',lang)+ ' ' + promoter +'<br>';//"How many meters of Farmina shelves "+ promoter +" " +
      valida = false
    }

    if(service_result1 == 0){
      texto += $.i18n.prop('lCampoObrigatorio',lang)+ ' ' + promoter +'<br>';// "Purpose of the promotion "+ promoter +" " +
      valida = false
    }

    if(open_bags == 0){
      texto +=  $.i18n.prop('lCampoObrigatorio',lang)+ ' ' + promoter +'<br>';//"Type of merchandising "+ promoter +" " +
      valida = false
    }
    
  }

  /*VALIDAÇÃO   ARMY*/
  if(service_type1 == 5){
    var specific_store1   = $('#'+action+'_agendamento_army_specific_store'+promoter).val();
    var food1            = $('#'+action+'_agendamento_food'+promoter).val();
    var which_park1       = $('#'+action+'_agendamento_army_which_park'+promoter).val();
    

    if(food1 == 0){
      texto +=  $.i18n.prop('lTypeFood',lang)+ ' ' + promoter +'<br>';//"Type of Food "+ promoter +" " +
      valida = false
    }

    if(specific_store1 == 0){
      texto += $.i18n.prop('lForSpecificStore',lang)+ ' ' + promoter +'<br>';//"For a specific store "+ promoter +" " + 
      valida = false
    }

    if(specific_store1 == 2){
      if(which_park1 == ""){
        texto += $.i18n.prop('lInWhicPark',lang) + '<br>';//"In which park "+ promoter +" " + 
        valida = false
      }
    }  

    
  }
  if(valida == false){
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



  
  return valida
}




  }  
}());

