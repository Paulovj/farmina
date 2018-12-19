import * as $ from 'jquery';
import 'datatables';
import 'bootstrap-notify'
import 'jquery-i18n-properties'
import moment from 'moment/src/moment';

export default (function () {

  if(window.location.pathname == '/ordem.html'){

    var lang = "en";
    if ((sessionStorage.Language != "") && (sessionStorage.Language != 'undefined')){
      lang = sessionStorage.Language
    }


    var paisX = sessionStorage.Pais
    var urlX = "";
    if(paisX == "Brasil"){
      urlX = "http://www.nav.farmina.com.br:3001/api/";
    }else{
      urlX = "http://mkt.farmina.com:3001/api/"
    }
   

  //   $("#add_agendamento_planned_date1").datepicker({
  //     dateFormat: 'dd/mm/yy',
  //     beforeShowDay: function(dateText, inst) {

  //     }
  // });

  //$('.day').attr('data-toggle="tooltip"')
  
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
function formatHora(date) {
  var data =  moment(date).utc().format("HH:mm")
    return data; 
}
function formatDateSql(date) {
  var data = '';
  if (date != ""){
    data = moment(date, 'DD/MM/YYYY').toDate();
    data =  moment(data).utc().format("Y-MM-DD")
  }  
  return data;
  }

function StatusX(value){
  var StatusPendente = $.i18n.prop('lStatusPendente',lang)
  var StatusIniciado = $.i18n.prop('lStatusIniciado',lang)
var StatusFinalizado = $.i18n.prop('lStatusFinalizado',lang)
  
  var valueX = "";
      if (value == 0){
        valueX =  StatusPendente;
      }else if(value==1){
        // valueX =  'To Do';
        // valueX =  'Iniciado';
        valueX = '<span class="badge badge-pill fl-r badge-success lh-0 p-10">'+ StatusIniciado +'</span>';
      }else if(value==2){
        // valueX =  'Started';
        valueX =  'Iniciado';
      }else if(value==3){
      // valueX =  'Accomplished';            
      valueX =  StatusFinalizado;            
      }
      return valueX;
}
  
  


  $('#dataTableOrdemAgendamento tbody').on( 'click', 'button', function () {
          var data = $("#dataTableOrdemAgendamento").DataTable().row( $(this).parents('tr') ).data();
          var id = data['No_'];
          console.log(data)
          var service_invoce_no = data['No_'].replace('WEB','WEBSO');
          var service_invoce_line_no1 = id.replace('WEB000','') +100;
          var service_invoce_line_no2 = id.replace('WEB000','') +200;
          var service_invoce_line_no3 = id.replace('WEB000','') +300;
          var service_invoce_line_no4 = id.replace('WEB000','') +400;
          var service_invoce_line_no5 = id.replace('WEB000','') +500;
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
          
          
          
          var ISPAnswerType1        = data['ISP Answer Type 1'];
          var MerchanAnswerType1    = data['Merchan Answer Type 1'];
          var TrainningAnswerType1  = data['Trainning Answer Type 1'];
          var WelcomeKitType1       = data['Welcome Kit Answer Type 1'];
          

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
                  console.log('type result com max nao esque  = '+ WelcomeKitType1 + ' - ' + ServicetypeResult1)


          var Professional2 = data['Professional 2'];
          var ServiceType2 = data['Service Type 2'];
          var PlannedDate2 = data['Planned Date 2'];
          var PlannedStartTime2 = data['Planned Start Time 2'];
          var PlannedHour2 = data['Planned Hours 2'];

          var ISPAnswerType2        = data['ISP Answer Type 2'];
          var MerchanAnswerType2    = data['Merchan Answer Type 2'];
          var TrainningAnswerType2  = data['Trainning Answer Type 2'];
          var WelcomeKitType2       = data['Welcome Kit Answer Type 2'];

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

          var ISPAnswerType3        = data['ISP Answer Type 3'];
          var MerchanAnswerType3    = data['Merchan Answer Type 3'];
          var TrainningAnswerType3  = data['Trainning Answer Type 3'];
          var WelcomeKitType3       = data['Welcome Kit Answer Type 3'];

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

          var ISPAnswerType4        = data['ISP Answer Type 4'];
          var MerchanAnswerType4    = data['Merchan Answer Type 4'];
          var TrainningAnswerType4  = data['Trainning Answer Type 4'];
          var WelcomeKitType4       = data['Welcome Kit Answer Type 4'];

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

          var ISPAnswerType5        = data['ISP Answer Type 5'];
          var MerchanAnswerType5    = data['Merchan Answer Type 5'];
          var TrainningAnswerType5  = data['Trainning Answer Type 5'];
          var WelcomeKitType5       = data['Welcome Kit Answer Type 5'];

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

          
          if ($(this).attr('action')=="edit"){
            
            $('#edit_agendamento_n_cliente').val(customer_no)
            $('#edit_agendamento_fatura_endereco_complemento').val(Billto_Address2)
            $('#edit_agendamento_fatura_cidade').val(Billto_City)
            $('#edit_agendamento_nome').val(name)
            $('#edit_agendamento_fatura_cep').val(Billto_PostCode)
            $('#edit_agendamento_fatura_endereco').val(Billto_Address)
            $('#edit_agendamento_n').val(id)
            
            $('#edit_agendamento_cod_vendendor').val(Salesperson)
            
            
            var length1 = $('#edit_agendamento_busca_professional1 > option').length;
            console.log('Edit quandadide PROFESSIONAL: ',length)
            if (length1 == 1){
              $.ajax({url: urlX+"resourses/getResourseQuery?Pais="+paisX, success: function(obj){
                var contX = "";
                  $.each(obj.result, function(index, value){
                    var val = value.No_ + ' | ' + value.Name;
                    var optName     = 'optName = "'+value.Name+'"';
                    contX +='<option value='+ value.No_ +' '+ optName + ' > '+val+' </option>';
                  })
                  $("#edit_agendamento_busca_professional1").append(contX)
                  $("#edit_agendamento_busca_professional2").append(contX)
                  $("#edit_agendamento_busca_professional3").append(contX)
                  $("#edit_agendamento_busca_professional4").append(contX)
                  $("#edit_agendamento_busca_professional5").append(contX)
                  $("#edit_agendamento_busca_professional6").append(contX)

                  //Profissional 1
              console.log('teste profissional 1' + Professional1)
              $('#edit_agendamento_busca_professional1 option[value='+Professional1+']').attr('selected','selected');
              $('#edit_agendamento_planned_hour1').val(PlannedHour1);
              $('#edit_agendamento_service_type1').val(ServiceType1);
              $('#edit_agendamento_planned_date1').val(formatDate(PlannedDate1));
              
              $('#edit_agendamento_planned_start_time1').val(formatHora(PlannedStartTime1));

              
              $('#edit_agendamento_trainning_type1').val(data['Trainning Type 1']);
              $('#edit_agendamento_food1').val(data['Food Type 1']);
              $('#edit_agendamento_Promoting1').val(data['Promotion Type 1']);
              $('#add_agendamento_push_new_line1').val(data['Push New Line Comments 1']);
              $('#edit_agendamento_line_slow_comments1').val(data['Line Slow Comments 1']);
              $('#edit_agendamento_how_meter1').val(data['How Mters 1']);
              $('#edit_agendamento_open_bags1').val(data['Open Bags 1']);
              $('#edit_agendamento_trainning_comments1').val(data['Trainnig Comments 1']);
              $('#edit_agendamento_army_specific_store1').val(data['For Specific Store 1']);
              $('#edit_agendamento_army_which_park1').val(data['In Wich Park 1']);
              if(data['In Wich Park 1'] !=""){
                $('#div_edit_agendamento_service_result_army_which_park1').show();
              }  
              

              var action ='edit'
              PromoterServiceTypeX(1,ServiceType1,action)
              // $('#edit_agendamento_service_result1').val('ServicetypeResult1');
              if(ServicetypeResult1 != ""){
                $('#edit_agendamento_service_result1 option[value='+ServicetypeResult1+']').attr('selected','selected');
              }  
              
              //Profissional 2
              console.log('teste profissional 2 ' + Professional2)
              $('#edit_agendamento_busca_professional2 option[value='+Professional2+']').attr('selected','selected');
              $('#edit_agendamento_planned_hour2').val(PlannedHour2);
              $('#edit_agendamento_service_type2').val(ServiceType2);
              $('#edit_agendamento_planned_date2').val(formatDate(PlannedDate2));
              
              $('#edit_agendamento_planned_start_time2').val(formatHora(PlannedStartTime2));

              $('#edit_agendamento_trainning_type2').val(data['Trainning Type 2']);
              $('#edit_agendamento_food2').val(data['Food Type 2']);
              $('#edit_agendamento_Promoting2').val(data['Promotion Type 2']);
              $('#add_agendamento_push_new_line2').val(data['Push New Line Comments 2']);
              $('#edit_agendamento_line_slow_comments2').val(data['Line Slow Comments 2']);
              $('#edit_agendamento_how_meter2').val(data['How Mters 2']);
              $('#edit_agendamento_open_bags2').val(data['Open Bags 2']);
              $('#edit_agendamento_trainning_comments2').val(data['Trainnig Comments 2']);
              $('#edit_agendamento_army_specific_store2').val(data['For Specific Store 2']);
              $('#edit_agendamento_army_which_park2').val(data['In Wich Park 2']);
              if(data['In Wich Park 2'] !=""){
                $('#div_edit_agendamento_service_result_army_which_park2').show();
              }  

              var action ='edit'
              PromoterServiceTypeX(2,ServiceType2,action)
              //$('#edit_agendamento_service_result2').val(ServicetypeResult2);
              if(ServicetypeResult2 != ""){
                $('#edit_agendamento_service_result2 option[value='+ServicetypeResult2+']').attr('selected','selected');
              }  

              //Profissional 3
              console.log('teste profissional 3 ' + Professional3)
              $('#edit_agendamento_busca_professional3 option[value='+Professional3+']').attr('selected','selected');
              $('#edit_agendamento_planned_hour3').val(PlannedHour3);
              $('#edit_agendamento_service_type3').val(ServiceType3);
              $('#edit_agendamento_planned_date3').val(formatDate(PlannedDate3));

              $('#edit_agendamento_planned_start_time3').val(formatHora(PlannedStartTime3));

              $('#edit_agendamento_trainning_type3').val(data['Trainning Type 3']);
              $('#edit_agendamento_food3').val(data['Food Type 3']);
              $('#edit_agendamento_Promoting3').val(data['Promotion Type 3']);
              $('#add_agendamento_push_new_line3').val(data['Push New Line Comments 3']);
              $('#edit_agendamento_line_slow_comments3').val(data['Line Slow Comments 3']);
              $('#edit_agendamento_how_meter3').val(data['How Mters 3']);
              $('#edit_agendamento_open_bags3').val(data['Open Bags 3']);
              $('#edit_agendamento_trainning_comments3').val(data['Trainnig Comments 3']);
              $('#edit_agendamento_army_specific_store3').val(data['For Specific Store 3']);
              $('#edit_agendamento_army_which_park3').val(data['In Wich Park 3']);
              if(data['In Wich Park 3'] !=""){
                $('#div_edit_agendamento_service_result_army_which_park3').show();
              }  
              var action ='edit'
              PromoterServiceTypeX(3,ServiceType3,action)
              //$('#edit_agendamento_service_result3').val(ServicetypeResult3);
              if(ServicetypeResult3 != ""){
                $('#edit_agendamento_service_result3 option[value='+ServicetypeResult3+']').attr('selected','selected');
              }  

              

              //Profissional 4
              console.log('teste profissional' + Professional4)
              $('#edit_agendamento_busca_professional4 option[value='+Professional4+']').attr('selected','selected');
              $('#edit_agendamento_planned_hour4').val(PlannedHour4);
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
              if(data['In Wich Park 4'] !=""){
                $('#div_edit_agendamento_service_result_army_which_park4').show();
              }
              var action ='edit'
              PromoterServiceTypeX(4,ServiceType4,action)
              //$('#edit_agendamento_service_result4').val(ServicetypeResult3);
              if(ServicetypeResult4 != ""){
                $('#edit_agendamento_service_result4 option[value='+ServicetypeResult4+']').attr('selected','selected');
              }  


              //Profissional 5
              console.log('teste profissional' + Professional5)
              $('#edit_agendamento_busca_professional5 option[value='+Professional5+']').attr('selected','selected');
              $('#edit_agendamento_planned_hour5').val(PlannedHour5);
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
              if(data['In Wich Park 5'] !=""){
                $('#div_edit_agendamento_service_result_army_which_park5').show();
              }
              var action ='edit'
              PromoterServiceTypeX(5,ServiceType5,action)
              //$('#edit_agendamento_service_result5').val(ServicetypeResult5);
              if(ServicetypeResult5 != ""){
                $('#edit_agendamento_service_result5 option[value='+ServicetypeResult5+']').attr('selected','selected');
              }  
                  

                 
                }
              });
            }else{
             
              //Profissional 1
              console.log('teste profissional 1' + Professional1)
              $('#edit_agendamento_busca_professional1 option[value='+Professional1+']').attr('selected','selected');
              $('#edit_agendamento_planned_hour1').val(PlannedHour1);
              $('#edit_agendamento_service_type1').val(ServiceType1);
              $('#edit_agendamento_planned_date1').val(formatDate(PlannedDate1));

              $('#edit_agendamento_planned_start_time1').val(formatHora(PlannedStartTime1));

              $('#edit_agendamento_trainning_type1').val(data['Trainning Type 1']);
              $('#edit_agendamento_food1').val(data['Food Type 1']);
              $('#edit_agendamento_Promoting1').val(data['Promotion Type 1']);
              $('#add_agendamento_push_new_line1').val(data['Push New Line Comments 1']);
              $('#edit_agendamento_line_slow_comments1').val(data['Line Slow Comments 1']);
              $('#edit_agendamento_how_meter1').val(data['How Mters 1']);
              $('#edit_agendamento_open_bags1').val(data['Open Bags 1']);
              $('#edit_agendamento_trainning_comments1').val(data['Trainnig Comments 1']);
              $('#edit_agendamento_army_specific_store1').val(data['For Specific Store 1']);
              $('#edit_agendamento_army_which_park1').val(data['In Wich Park 1']);
              if(data['In Wich Park 1'] !=""){
                $('#div_edit_agendamento_service_result_army_which_park1').show();
              }
              

            
              var action ='edit'
              PromoterServiceTypeX(1,ServiceType1,action)
              // $('#edit_agendamento_service_result1').val(ServicetypeResult1);
              if(ServicetypeResult1 != ""){
                $('#edit_agendamento_service_result1 option[value='+ServicetypeResult1+']').attr('selected','selected');
              }  
              
              //Profissional 2
              console.log('teste profissional 2 ' + Professional2)
              $('#edit_agendamento_busca_professional2 option[value='+Professional2+']').attr('selected','selected');
              $('#edit_agendamento_planned_hour2').val(PlannedHour2);
              $('#edit_agendamento_service_type2').val(ServiceType2);
              $('#edit_agendamento_planned_date2').val(formatDate(PlannedDate2));

              $('#edit_agendamento_planned_start_time2').val(formatHora(PlannedStartTime2));

              $('#edit_agendamento_trainning_type2').val(data['Trainning Type 2']);
              $('#edit_agendamento_food2').val(data['Food Type 2']);
              $('#edit_agendamento_Promoting2').val(data['Promotion Type 2']);
              $('#add_agendamento_push_new_line2').val(data['Push New Line Comments 2']);
              $('#edit_agendamento_line_slow_comments2').val(data['Line Slow Comments 2']);
              $('#edit_agendamento_how_meter2').val(data['How Mters 2']);
              $('#edit_agendamento_open_bags2').val(data['Open Bags 2']);
              $('#edit_agendamento_trainning_comments2').val(data['Trainnig Comments 2']);
              $('#edit_agendamento_army_specific_store2').val(data['For Specific Store 2']);
              $('#edit_agendamento_army_which_park2').val(data['In Wich Park 2']);
              if(data['In Wich Park 2'] !=""){
                $('#div_edit_agendamento_service_result_army_which_park2').show();
              }
              
              var action ='edit'
              PromoterServiceTypeX(2,ServiceType2,action)
              //$('#edit_agendamento_service_result2').val(ServicetypeResult2);
              $('#edit_agendamento_service_result2 option[value='+ServicetypeResult2+']').attr('selected','selected');

              //Profissional 3
              console.log('teste profissional 3 ' + Professional3)
              $('#edit_agendamento_busca_professional3 option[value='+Professional3+']').attr('selected','selected');
              $('#edit_agendamento_planned_hour3').val(PlannedHour3);
              $('#edit_agendamento_service_type3').val(ServiceType3);
              $('#edit_agendamento_planned_date3').val(formatDate(PlannedDate3));

              $('#edit_agendamento_planned_start_time3').val(formatHora(PlannedStartTime3));

              $('#edit_agendamento_trainning_type3').val(data['Trainning Type 3']);
              $('#edit_agendamento_food3').val(data['Food Type 3']);
              $('#edit_agendamento_Promoting3').val(data['Promotion Type 3']);
              $('#add_agendamento_push_new_line3').val(data['Push New Line Comments 3']);
              $('#edit_agendamento_line_slow_comments3').val(data['Line Slow Comments 3']);
              $('#edit_agendamento_how_meter3').val(data['How Mters 3']);
              $('#edit_agendamento_open_bags3').val(data['Open Bags 3']);
              $('#edit_agendamento_trainning_comments3').val(data['Trainnig Comments 3']);
              $('#edit_agendamento_army_specific_store3').val(data['For Specific Store 3']);
              $('#edit_agendamento_army_which_park3').val(data['In Wich Park 3']);

              if(data['In Wich Park 3'] !=""){
                $('#div_edit_agendamento_service_result_army_which_park3').show();
              }  
              

              var action ='edit'
              PromoterServiceTypeX(3,ServiceType3,action)
              //$('#edit_agendamento_service_result3').val(ServicetypeResult3);
              $('#edit_agendamento_service_result3 option[value='+ServicetypeResult3+']').attr('selected','selected');

              

              //Profissional 4
              console.log('teste profissional' + Professional4)
              $('#edit_agendamento_busca_professional4 option[value='+Professional4+']').attr('selected','selected');
              $('#edit_agendamento_planned_hour4').val(PlannedHour4);
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
              if(data['In Wich Park 4'] !=""){
                $('#div_edit_agendamento_service_result_army_which_park4').show();
              } 
              

              var action ='edit'
              PromoterServiceTypeX(4,ServiceType4,action)
              //$('#edit_agendamento_service_result4').val(ServicetypeResult3);
              $('#edit_agendamento_service_result4 option[value='+ServicetypeResult4+']').attr('selected','selected');


              //Profissional 5
              console.log('teste profissional' + Professional5)
              $('#edit_agendamento_busca_professional5 option[value='+Professional5+']').attr('selected','selected');
              $('#edit_agendamento_planned_hour5').val(PlannedHour5);
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
              if(data['In Wich Park 5'] !=""){
                $('#div_edit_agendamento_service_result_army_which_park5').show();
              }
              
              var action ='edit'
              PromoterServiceTypeX(5,ServiceType5,action)
              //$('#edit_agendamento_service_result5').val(ServicetypeResult5);
              $('#edit_agendamento_service_result5 option[value='+ServicetypeResult5+']').attr('selected','selected');
              
            }
            $('#edit-agendamento').modal('toggle');  
          }



          

          
          
          if ($(this).attr('action')=="postando_agendamento"){
            $('#post_agendamento_no').val(id)
            $('#post_service_invoce_no').val(service_invoce_no)
            $('#post_service_invoce_line_no1').val(service_invoce_line_no1)
            $('#post_service_invoce_line_no2').val(service_invoce_line_no2)
            $('#post_service_invoce_line_no3').val(service_invoce_line_no3)
            $('#post_service_invoce_line_no4').val(service_invoce_line_no4)
            $('#post_service_invoce_line_no5').val(service_invoce_line_no5)
            $('#post_customer_no').val(customer_no)
            $('#post_customer_name').val(name)
            $('#post_customer_address').val(Billto_Address)
            $('#post_customer_number').val(Billto_Number)
          
            $('#post_salesperson_code').val(Salesperson)
            
            $('#post_resource_no1').val(Professional1)
            $('#post_service_type1').val(ServiceType1)
            $('#post_service_type1_exibir option[value='+ServiceType1+']').attr('selected','selected');
            $('#post_planned_date1_exibir').val(formatDate(PlannedDate1))
            $('#post_planned_date1').val(PlannedDate1)
            
            
            $('#post_isp1').val(ISPAnswerType1)
            $('#post_merchan1').val(MerchanAnswerType1)
            $('#post_trainning1').val(TrainningAnswerType1)
            $('#post_welcome1').val(WelcomeKitType1)
            
            $('#post_resource_no2').val(Professional2)
            $('#post_service_type2').val(ServiceType2)
            $('#post_planned_date2').val(PlannedDate2)

            $('#post_resource_no2').val(Professional2)
            $('#post_service_type2').val(ServiceType2)
            $('#post_isp2').val(ISPAnswerType2)
            $('#post_merchan2').val(MerchanAnswerType2)
            $('#post_trainning2').val(TrainningAnswerType2)
            $('#post_welcome2').val(WelcomeKitType2)
            

            $('#post_resource_no3').val(Professional3)
            $('#post_service_type3').val(ServiceType3)
            $('#post_planned_date3').val(PlannedDate3)

            $('#post_resource_no3').val(Professional3)
            $('#post_service_type3').val(ServiceType3)
            $('#post_isp3').val(ISPAnswerType3)
            $('#post_merchan3').val(MerchanAnswerType3)
            $('#post_trainning3').val(TrainningAnswerType3)
            $('#post_welcome3').val(WelcomeKitType3)
            
            $('#post_resource_no4').val(Professional4)
            $('#post_service_type4').val(ServiceType4)
            $('#post_planned_date4').val(PlannedDate4)

            $('#post_resource_no4').val(Professional4)
            $('#post_service_type4').val(ServiceType4)
            $('#post_isp4').val(ISPAnswerType4)
            $('#post_merchan4').val(MerchanAnswerType4)
            $('#post_trainning4').val(TrainningAnswerType4)
            $('#post_welcome4').val(WelcomeKitType4)
            
            $('#post_resource_no5').val(Professional5)
            $('#post_service_type5').val(ServiceType5)
            $('#post_planned_date5').val(PlannedDate5)

            $('#post_resource_no5').val(Professional5)
            $('#post_service_type5').val(ServiceType5)
            $('#post_isp5').val(ISPAnswerType5)
            $('#post_merchan5').val(MerchanAnswerType5)
            $('#post_trainning5').val(TrainningAnswerType5)
            $('#post_welcome5').val(WelcomeKitType5)
            
            
            
            $('#post_photo_path').val(path)

            
            $('#lbl_post_agendamento').text(' '+ id + ' ?');
            $('#post-agendamento-modal').modal('toggle')
            
          } 
            
        });


    
    function loadAgendamento() {

      

      $.ajax({url: urlX+"ServiceHeaders/getServiceHeaderQuery?Pais="+paisX, success: function(result){    
        var jsonString = result.data //for testing  
        // console.log('retorno agendamento: ', jsonString)
        var oTblReportAgendamento = $("#dataTableOrdemAgendamento")
        
        oTblReportAgendamento.DataTable ({
            "data" : jsonString,
            "scrollX": true,
            "responsive":true,
            //"ajax":jsonString,
            fixedHeader: {
              header: true,
              footer: true
          },

          //    columnDefs: [
          //     { "title": $.i18n.prop('lDocumenttType',lang), "targets": 0 },
          //     { "title": $.i18n.prop('lDocumenttType',lang), "targets": 1 },
          //     { "title": $.i18n.prop('lDocumenttType',lang), "targets": 2 },
          //     { "title": $.i18n.prop('lDocumenttType',lang), "targets": 3 },
          //     { "title": $.i18n.prop('lDocumenttType',lang), "targets": 4 },
          //     { "title": $.i18n.prop('lDocumenttType',lang), "targets": 5 },
          //     { "title": $.i18n.prop('lDocumenttType',lang), "targets": 6 },
          //     { "title": $.i18n.prop('lDocumenttType',lang), "targets": 7 },
          //     { "title": $.i18n.prop('lDocumenttType',lang), "targets": 8 },
          //     { "title": $.i18n.prop('lDocumenttType',lang), "targets": 9 },
          //     { "title": $.i18n.prop('lDocumenttType',lang), "targets": 10 }
              
          // ],
            "columns" : [
              { "data" : "Document Type", "title" : "teste","visible": false},
              { "data" : "Salesperson Code","visible": false},
              { "data" : "Bill-to Address","visible": false},
        
              { "data" : "No_" },
              { "data" : "Document Status", "visible": false, "render": function (data) {
                return StatusX(data);
              }
            }, 
              { "data" : "Order Date", "render": function ( data) {
                return formatDate(data);
                } 
              } ,
              { "data" : "Order Time", "render": function ( data) {
                return formatHora(data);
                } 
              },
              { "data" : "Customer No_" },
              { "data" : "Name" },
              { "data" : "Professional 1" },
              { "data" : "NameProfissional" },
               { "targets": -1, "data": null, 
                "render": function (a,d){
                  var btn =""
                    //btn += "<button action='postando_agendamento' href='javascript:void(0);' type='button' class='btn cur-p btn-danger'>Registrar</button>" ;
                    btn += "<button action='edit' type='button' class='btn cur-p btn-info'>"+$.i18n.prop('lViewOrder',lang)+"</button>";
                    return btn;
              }
            }
          ]
            
          });

          setTimeout(function(){
             $('#dataTableOrdemAgendamento').DataTable().draw();
            }, 3000);

          
          
        } 
         
      });

      
      

  };
  loadAgendamento();
  

  

$("#add_agendamento_busca_cliente").change(function(){
  var id      = $(this).val();
  var name    = $('option:selected', this).attr("optName");
  var address = $('option:selected', this).attr("optAddress");
  var post    = $('option:selected', this).attr("optPost");
  var phone   = $('option:selected', this).attr("optPhone");
  var contact = $('option:selected', this).attr("optContact");
  var city    = $('option:selected', this).attr("optCity");
  var address2= $('option:selected', this).attr("optAddress2");
  var salespersonCode= $('option:selected', this).attr("optSalespersonCode");
  

  $('#add_agendamento_n_cliente').val(id)
  $('#add_agendamento_fatura_endereco_complemento').val(address2)
  $('#add_agendamento_fatura_cidade').val(city)
  $('#add_agendamento_nome').val(name)
  $('#add_agendamento_fatura_cep').val(post)
  $('#add_agendamento_fatura_endereco').val(address)
  $('#add_agendamento_cod_vendendor').val(salespersonCode)
  

  console.log('resultado combo on change: ' + name + ' id '+ id )
});


$("#edit_agendamento_busca_cliente").change(function(){
  var id      = $(this).val();
  var name    = $('option:selected', this).attr("optName");
  var address = $('option:selected', this).attr("optAddress");
  var post    = $('option:selected', this).attr("optPost");
  var phone   = $('option:selected', this).attr("optPhone");
  var contact = $('option:selected', this).attr("optContact");
  var city    = $('option:selected', this).attr("optCity");
  var address2= $('option:selected', this).attr("optAddress2");
  var salespersonCode= $('option:selected', this).attr("optSalespersonCode");
  

  $('#edit_agendamento_n_cliente').val(id)
  $('#edit_agendamento_fatura_endereco_complemento').val(address2)
  $('#edit_agendamento_fatura_cidade').val(city)
  $('#edit_agendamento_nome').val(name)
  $('#edit_agendamento_fatura_cep').val(post)
  $('#edit_agendamento_fatura_endereco').val(address)
  $('#edit_agendamento_cod_vendendor').val(salespersonCode)
  

  console.log('resultado combo on change: ' + name + ' id '+ id )
});

// $("#btn_add_agendamento").click(function(){

//   var length = $('#add_agendamento_busca_cliente > option').length;
//   console.log('quandadide de pop: ',length)
//   if (length == 1){
//     $.ajax({url: urlX+"http://www.nav.farmina.com.br:3001/api/Customers/", success: function(result){
//       //add_agendamento_busca_cliente
//       var contX = "";
//         $.each(result, function(index, value){
//           var val = value.No_ + ' | ' + value.Name +' | '+ value.Address + ' | ' + value['City']  + ' | ' + value['Post Code']  + ' | ' + value['Phone No_'] + ' | '+ value.Contact;
//           var optName     = 'optName = "'+value.Name+'"';
//           var optAddress  = 'optAddress = "'+value.Address+'"';
//           var optPost     = 'optPost = "'+value['Post Code']+'"';
//           var optPhone    = 'optPhone = "'+value['Phone No_']+'"';
//           var optContact  = 'optContact = "'+value.Contact+'"';
//           var optCity     = 'optCity = "'+value.City+'"';
//           var optAddress2 = 'optAddress2 = "'+value['Address 2']+'"';
//           var optSalespersonCode = 'optSalespersonCode = "'+value['Salesperson Code']+'"';
          

//             contX +='<option value='+ value.No_ +' '+ optSalespersonCode + ' '+ optCity +' '+ optName +' '+ optAddress2 +' '+ optAddress +' '+ optPost +' '+ optPhone +' '+ optContact +' > '+val+' </option>';
//         })
//         $("#add_agendamento_busca_cliente").append(contX)

//       }
//     });
//   }
  
//   var length1 = $('#add_agendamento_busca_professional1 > option').length;
//   console.log('quandadide PROFESSIONAL: ',length)
//   if (length1 == 1){
//     $.ajax({url: "http://www.nav.farmina.com.br:3001/api/resourses/getResourseQuery", success: function(obj){
//       var contX = "";
//         $.each(obj.result, function(index, value){
//           var val = value.No_ + ' | ' + value.Name;
//           var optName     = 'optName = "'+value.Name+'"';
//           contX +='<option value='+ value.No_ +' '+ optName + ' > '+val+' </option>';
//         })
//         $("#add_agendamento_busca_professional1").append(contX)
//         $("#add_agendamento_busca_professional2").append(contX)
//         $("#add_agendamento_busca_professional3").append(contX)
//         $("#add_agendamento_busca_professional4").append(contX)
//         $("#add_agendamento_busca_professional5").append(contX)
//         $("#add_agendamento_busca_professional6").append(contX)


//       }
//     });
//   }

//   $('#add-agendamento').modal('toggle');  
// })


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

$("#add_agendamento_army_specific_store1").change(function(){
  var value = $(this).val();
  $("#add_agendamento_army_which_park1").val("");
  if(value == 1 ){
    $("#div_add_agendamento_service_result_army_which_park1").hide();
  }else if(value == 2){
    $("#div_add_agendamento_service_result_army_which_park1").show();

  }
});


$("#add_agendamento_army_specific_store2").change(function(){
  var value = $(this).val();
  $("#add_agendamento_army_which_park2").val("");
  if(value == 1 ){
    $("#div_add_agendamento_service_result_army_which_park2").hide();
  }else if(value == 2){
    $("#div_add_agendamento_service_result_army_which_park2").show();

  }
});


$("#add_agendamento_army_specific_store3").change(function(){
  var promoter = 1;
  var value = $(this).val();
  $("#add_agendamento_army_which_park3").val("");
  if(value == 1 ){
    $("#div_add_agendamento_service_result_army_which_park3").hide();
  }else if(value == 2){
    $("#div_add_agendamento_service_result_army_which_park3").show();

  }
});


$("#add_agendamento_army_specific_store4").change(function(){
  var promoter = 1;
  var value = $(this).val();
  $("#add_agendamento_army_which_park4").val("");
  if(value == 1 ){
    $("#div_add_agendamento_service_result_army_which_park4").hide();
  }else if(value == 2){
    $("#div_add_agendamento_service_result_army_which_park4").show();

  }
});


$("#add_agendamento_army_specific_store5").change(function(){
  var promoter = 1;
  var value = $(this).val();
  $("#add_agendamento_army_which_park5").val("");
  if(value == 1 ){
    $("#div_add_agendamento_service_result_army_which_park5").hide();
  }else if(value == 2){
    $("#div_add_agendamento_service_result_army_which_park5").show();

  }
});



$("#add_agendamento_service_type1").change(function(){
  var promoter = 1;
  var value = $(this).val();
  var action = 'add'
  PromoterServiceTypeX(promoter,value,action)
});
$("#add_agendamento_service_type2").change(function(){
  var promoter = 2;
  var value = $(this).val();
  var action = 'add'
  PromoterServiceTypeX(promoter,value,action)
});
$("#add_agendamento_service_type3").change(function(){
  var promoter = 3;
  var value = $(this).val();
  var action = 'add'
  PromoterServiceTypeX(promoter,value,action)
});
$("#add_agendamento_service_type4").change(function(){
  var promoter = 4;
  var value = $(this).val();
  var action = 'add'
  PromoterServiceTypeX(promoter,value,action)
});
$("#add_agendamento_service_type5").change(function(){
  var promoter = 5;
  var value = $(this).val();
  var action = 'add'
  PromoterServiceTypeX(promoter,value,action)
});

function formValidacaoOrdem(promoter){
  var valida =  true;
  var texto = ""
  var profissional1        = $('#add_agendamento_busca_professional'+promoter).val();
  var planned_date1        = $('#add_agendamento_planned_date'+promoter).val();
  var planned_start_time1  = $('#add_agendamento_planned_start_time'+promoter).val();
  var planned_hour1        = $('#add_agendamento_planned_hour'+promoter).val();
  var service_type1        = $('#add_agendamento_service_type'+promoter).val();
  
  
  if(profissional1 == 0){
    texto += "Professional "+ promoter +" " + $.i18n.prop('lCampoObrigatorio',lang) + '<br>';
    valida = false
  }
  if(planned_date1 == ""){
    texto += "Planned date "+ promoter +" " + $.i18n.prop('lCampoObrigatorio',lang) + '<br>';
    valida = false
  }

  if(planned_start_time1 == ""){
    texto += "Planned Start Time "+ promoter +" " + $.i18n.prop('lCampoObrigatorio',lang) + '<br>';
    valida = false
  }

  if(service_type1 != 2){
    if(planned_hour1 == ""){
      texto += "Planned Hours "+ promoter +" " + $.i18n.prop('lCampoObrigatorio',lang) + '<br>';
      valida = false
    }
  }  

  if(service_type1 == 0){
    texto += "Service Type "+ promoter +" " + $.i18n.prop('lCampoObrigatorio',lang) + '<br>';
    valida = false
  }

  /*VALIDAÇÃO TRAINING*/
  if(service_type1 == 1){
    var trainning_type1       = $('#add_agendamento_trainning_type'+promoter).val();
    var food1                 = $('#add_agendamento_food'+promoter).val();
    var service_result1       = $('#add_agendamento_service_result'+promoter).val();
    var trainning_comments1   = $('#add_agendamento_trainning_comments'+promoter).val();
    
    if(trainning_type1 == 0){
      texto += "Training Type "+ promoter +" " + $.i18n.prop('lCampoObrigatorio',lang) + '<br>';
      valida = false
    }

    if(food1 == 0){
      texto += "Type of Food "+ promoter +" " + $.i18n.prop('lCampoObrigatorio',lang) + '<br>';
      valida = false
    }

    if(service_result1 == 0){
      texto += "Training For a Line "+ promoter +" " + $.i18n.prop('lCampoObrigatorio',lang) + '<br>';
      valida = false
    }
    if(trainning_comments1 == ""){
      texto += "Comments "+ promoter +" " + $.i18n.prop('lCampoObrigatorio',lang) + '<br>';
      valida = false
    }
  }

  /*VALIDAÇÃO WELCOME KIT*/
  if(service_type1 == 2){
    var food1                 = $('#add_agendamento_food'+promoter).val();
    var service_result1       = $('#add_agendamento_service_result'+promoter).val();
    
    if(food1 == 0){
      texto += "Type of Food "+ promoter +" " + $.i18n.prop('lCampoObrigatorio',lang) + '<br>';
      valida = false
    }

    if(service_result1 == 0){
      texto += "Welcome kit for which line "+ promoter +" " + $.i18n.prop('lCampoObrigatorio',lang) + '<br>';
      valida = false
    }
    
  }

  /*VALIDAÇÃO ISP*/
  if(service_type1 == 3){
    var food1            = $('#add_agendamento_food'+promoter).val();
    var Promoting1       = $('#add_agendamento_Promoting'+promoter).val();
    var service_result1  = $('#add_agendamento_service_result'+promoter).val();
    var open_bags        = $('#add_agendamento_open_bags'+promoter).val();

    if(food1 == 0){
      texto += "Type of Food "+ promoter +" " + $.i18n.prop('lCampoObrigatorio',lang) + '<br>';
      valida = false
    }

    if(Promoting1 == 0){
      texto += "Type of promotion "+ promoter +" " + $.i18n.prop('lCampoObrigatorio',lang) + '<br>';
      valida = false
    }

    if(service_result1 == 0){
      texto += "Purpose of the promotion "+ promoter +" " + $.i18n.prop('lCampoObrigatorio',lang) + '<br>';
      valida = false
    }

    if(open_bags == 0){
      texto += "This store is selling open bags "+ promoter +" " + $.i18n.prop('lCampoObrigatorio',lang) + '<br>';
      valida = false
    }
    
  }

  /*VALIDAÇÃO   MERCHANDISSING*/
  if(service_type1 == 4){
    var how_meter1          = $('#add_agendamento_how_meter'+promoter).val();
    var service_result1     = $('#add_agendamento_service_result'+promoter).val();
    
    if(how_meter1 == ""){
      texto += "How many meters of Farmina shelves "+ promoter +" " + $.i18n.prop('lCampoObrigatorio',lang) + '<br>';
      valida = false
    }

    if(service_result1 == 0){
      texto += "Purpose of the promotion "+ promoter +" " + $.i18n.prop('lCampoObrigatorio',lang) + '<br>';
      valida = false
    }

    if(open_bags == 0){
      texto += "Type of merchandising "+ promoter +" " + $.i18n.prop('lCampoObrigatorio',lang) + '<br>';
      valida = false
    }
    
  }

  /*VALIDAÇÃO   ARMY*/
  if(service_type1 == 5){
    var specific_store1   = $('#add_agendamento_army_specific_store'+promoter).val();
    var which_park1       = $('#add_agendamento_army_which_park'+promoter).val();
    
    if(specific_store1 == 0){
      texto += "For a specific store "+ promoter +" " + $.i18n.prop('lCampoObrigatorio',lang) + '<br>';
      valida = false
    }

    if(specific_store1 == 2){
      if(which_park1 == ""){
        texto += "In which park "+ promoter +" " + $.i18n.prop('lCampoObrigatorio',lang) + '<br>';
        valida = false
      }
    }  

    
  }
  if(valida == false){
    $.notify({
      title: 'Atenção',
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

  $("#btn_add_ordem_agendamento").click(function(){
    var valida = true
    
    valida = formValidacaoOrdem(1);
    if(valida == false){
      return false;
    }
    var professional2 = $('#add_agendamento_busca_professional2').val();
    if (professional2 != ""){
      valida = formValidacaoOrdem(2);
        if(valida == false){
          return false;
        } 
    }
    var professional3 = $('#add_agendamento_busca_professional3').val();
    if (professional3 != ""){
      valida = formValidacaoOrdem(3);
        if(valida == false){
          return false;
        } 
    }

    var professional4 = $('#add_agendamento_busca_professional4').val();
    if (professional4 != ""){
      valida = formValidacaoOrdem(4);
        if(valida == false){
          return false;
        } 
    }

    var professional5 = $('#add_agendamento_busca_professional5').val();
    if (professional5 != ""){
      valida = formValidacaoOrdem(5);
        if(valida == false){
          return false;
        } 
    }

    
    console.log('entrou na janela');
    var data = new FormData();
    
    var settings = {
      "async": true,
      "crossDomain": true,
      // "url": "http://www.nav.farmina.com.br:3001/api/funcoes/FunctionNewOrdem",
       "url": urlX+"funcoes/FunctionNewOrdem",
      
      "method": "POST",
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        "postman-token": "cbc5f035-bd06-e229-08db-b3866ff0fd0d"
      },
      "data": {        
       "Pais"             : paisX,
       "DocumentType"             : "0",
       //"No_"                      : $("#add_agendamento_n").val(),
       "CustomerNo_"              : $("#add_agendamento_n_cliente").val(),
       "Bill_toCustomerNo_"       : $("#add_agendamento_cod_vendendor").val(),
       "Bill_toName"              : $("#add_agendamento_nome").val(),
       "Bill_toName2"             : "",
       "Bill_toAddress"           : $("#add_agendamento_fatura_endereco").val(),
       "Bill_toAddress2"          : "",
       "Bill_toCity"              : $("#add_agendamento_fatura_cidade").val(),
       "Bill_toContact"           : $("#add_agendamento_nome").val(),
       "Bill-to Post Code"         : $("#add_agendamento_fatura_cep").val(),
       
       "YourReference"            : "",
       
        "Professional1"           :$("#add_agendamento_busca_professional1").val(),
        "PlannedDate1"            :formatDateSql($("#add_agendamento_planned_date1").val()),
        "PlannedStartTime1"       :$("#add_agendamento_planned_start_time1").val(),

        "PlannedHours1"           :$("#add_agendamento_planned_hour1").val(),
        "ServiceType1"            :$("#add_agendamento_service_type1").val(),
        "ProfessionalFunction1"   :$("#add_agendamento_service_result1").val(),

        "Food1"                    :$("#add_agendamento_food1").val(),
        "TrainningType1"           :$("#add_agendamento_trainning_type1").val(),
        "TrainningComments1"       :$("#add_agendamento_trainning_comments1").val(),
        "PushNewLine1"             :$("#add_agendamento_push_new_line1").val(),
        "LineSlowComments1"        :$("#add_agendamento_line_slow_comments1").val(),
        
        "Promoting1"              :$("#add_agendamento_Promoting1").val(),
        "Open-Bags1"              :$("#add_agendamento_open_bags1").val(),
        
        "How-Meter1"              :$("#add_agendamento_how_meter1").val(),
        
        "Specific-Store1"         :$("#add_agendamento_army_specific_store1").val(),
        "Which-Park1"              :$("#add_agendamento_army_which_park1").val(),
        
        
        "Professional2"           :$("#add_agendamento_busca_professional2").val(),
        "PlannedDate2"            :formatDateSql($("#add_agendamento_planned_date2").val()),
        "PlannedStartTime2"       :$("#add_agendamento_planned_start_time2").val(),
        "PlannedHours2"           :$("#add_agendamento_planned_hour2").val(),
        "ServiceType2"            :$("#add_agendamento_service_type2").val(),
        "ProfessionalFunction2"   :$("#add_agendamento_service_result2").val(),

        "Food2"                    :$("#add_agendamento_food2").val(),
        "TrainningType2"           :$("#add_agendamento_trainning_type2").val(),
        "TrainningComments2"       :$("#add_agendamento_trainning_comments2").val(),
        "PushNewLine2"             :$("#add_agendamento_push_new_line2").val(),
        "LineSlowComments2"        :$("#add_agendamento_line_slow_comments2").val(),

        "Promoting2"              :$("#add_agendamento_Promoting2").val(),
        "Open-Bags2"              :$("#add_agendamento_open_bags2").val(),

        "How-Meter2"              :$("#add_agendamento_how_meter2").val(),

        "Specific-Store2"         :$("#add_agendamento_army_specific_store2").val(),
        "Which-Park2"              :$("#add_agendamento_army_which_park2").val(),
        
        "Professional3"            :$("#add_agendamento_busca_professional3").val(),
        "PlannedDate3"            :formatDateSql($("#add_agendamento_planned_date3").val()),
        "PlannedStartTime3"       :$("#add_agendamento_planned_start_time3").val(),
        "PlannedHours3"           :$("#add_agendamento_planned_hour3").val(),
        "ServiceType3"            :$("#add_agendamento_service_type3").val(),
        "ProfessionalFunction3"   :$("#add_agendamento_service_result3").val(),

        "Food3"                    :$("#add_agendamento_food3").val(),
        "TrainningType3"           :$("#add_agendamento_trainning_type3").val(),
        "TrainningComments3"       :$("#add_agendamento_trainning_comments3").val(),
        "PushNewLine3"             :$("#add_agendamento_push_new_line3").val(),
        "LineSlowComments3"        :$("#add_agendamento_line_slow_comments3").val(),

        "Promoting3"              :$("#add_agendamento_Promoting3").val(),
        "Open-Bags3"              :$("#add_agendamento_open_bags3").val(),

        "How-Meter3"              :$("#add_agendamento_how_meter3").val(),

        "Specific-Store4"         :$("#add_agendamento_army_specific_store4").val(),
        "Which-Park4"              :$("#add_agendamento_army_which_park4").val(),
        
        "Professional4"           :$("#add_agendamento_busca_professional4").val(),
        "PlannedDate4"            :formatDateSql($("#add_agendamento_planned_date4").val()),
        "PlannedStartTime4"       :$("#add_agendamento_planned_start_time4").val(),
        "PlannedHours4"           :$("#add_agendamento_planned_hour4").val(),
        "ServiceType4"            :$("#add_agendamento_service_type4").val(),
        "ProfessionalFunction4"   :$("#add_agendamento_service_result4").val(),

        "Food4"                    :$("#add_agendamento_food4").val(),
        "TrainningType4"           :$("#add_agendamento_trainning_type4").val(),
        "TrainningComments4"       :$("#add_agendamento_trainning_comments4").val(),
        "PushNewLine4"             :$("#add_agendamento_push_new_line4").val(),
        "LineSlowComments4"        :$("#add_agendamento_line_slow_comments4").val(),

        "Promoting4"              :$("#add_agendamento_Promoting4").val(),
        "Open-Bags4"              :$("#add_agendamento_open_bags4").val(),

        "How-Meter4"              :$("#add_agendamento_how_meter4").val(),
        
        "Professional5"           :$("#add_agendamento_busca_professional5").val(),
        "PlannedDate5"            :formatDateSql($("#add_agendamento_planned_date5").val()),
        "PlannedStartTime5"       :$("#add_agendamento_planned_start_time5").val(),
        "PlannedHours5"           :$("#add_agendamento_planned_hour5").val(),
        "ServiceType5"            :$("#add_agendamento_service_type5").val(),
        "ProfessionalFunction5"   :$("#add_agendamento_service_result5").val(),

        "Food5"                    :$("#add_agendamento_food5").val(),
        "TrainningType5"           :$("#add_agendamento_trainning_type5").val(),
        "TrainningComments5"       :$("#add_agendamento_trainning_comments5").val(),
        "PushNewLine5"             :$("#add_agendamento_push_new_line5").val(),
        "LineSlowComments5"        :$("#add_agendamento_line_slow_comments5").val(),

        "How-Meter5"              :$("#add_agendamento_how_meter5").val(),

        "Promoting5"              :$("#add_agendamento_Promoting5").val(),
        "Open-Bags5"              :$("#add_agendamento_open_bags5").val(),

        "Specific-Store5"         :$("#add_agendamento_army_specific_store5").val(),
        "Which-Park5"              :$("#add_agendamento_army_which_park5").val(),
        
      }
    }

      $.ajax(settings).done(function (response) {
        console.log(response);
        $('#dataTableOrdemAgendamento').DataTable().destroy();
        loadAgendamento();
        $('#add-agendamento').modal('toggle');  
        
      });

    });
      
      


      $("#btn_edit_ordem_agendamento").click(function(){
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
            "PlannedDate1"            :formatDateSql($("#edit_agendamento_planned_date1").val()),
            "PlannedHours1"           :$("#edit_agendamento_planned_hour1").val(),
            "ServiceType1"            :$("#edit_agendamento_service_type1").val(),
            "ProfessionalFunction1"   :$("#edit_agendamento_service_result1").val(),
            
            "Professional2"           :$("#edit_agendamento_busca_professional2").val(),
            "PlannedDate2"            :formatDateSql($("#edit_agendamento_planned_date2").val()),
            "PlannedHours2"           :$("#edit_agendamento_planned_hour2").val(),
            "ServiceType2"            :$("#edit_agendamento_service_type2").val(),
            "ProfessionalFunction2"   :$("#edit_agendamento_service_result2").val(),
            
            "Professional3"            :$("#edit_agendamento_busca_professional3").val(),
            "PlannedDate3"            :formatDateSql($("#edit_agendamento_planned_date3").val()),
            "PlannedHours3"           :$("#edit_agendamento_planned_hour3").val(),
            "ServiceType3"            :$("#edit_agendamento_service_type3").val(),
            "ProfessionalFunction3"   :$("#edit_agendamento_service_result3").val(),
            
            "Professional4"           :$("#edit_agendamento_busca_professional4").val(),
            "PlannedDate4"            :formatDateSql($("#edit_agendamento_planned_date4").val()),
            "PlannedHours4"           :$("#edit_agendamento_planned_hour4").val(),
            "ServiceType4"            :$("#edit_agendamento_service_type4").val(),
            "ProfessionalFunction4"   :$("#edit_agendamento_service_result4").val(),
            
            "Professional5"           :$("#edit_agendamento_busca_professional5").val(),
            "PlannedDate5"            :formatDateSql($("#edit_agendamento_planned_date5").val()),
            "PlannedHours5"           :$("#edit_agendamento_planned_hour5").val(),
            "ServiceType5"            :$("#edit_agendamento_service_type5").val(),
            "ProfessionalFunction5"   :$("#edit_agendamento_service_result5").val(),
            
          }
        }
    
          $.ajax(settings).done(function (response) {
            console.log(response);
            $('#dataTableOrdemAgendamento').DataTable().destroy();
            loadAgendamento();
            $('#edit-agendamento').modal('toggle');  
            
          });

  });







  $("#btn_save_post_agendamento").click(function(){
    var data = new FormData();
    
    var settings = {
      "async": true,
      "crossDomain": true,
      // "url": "http://www.nav.farmina.com.br:3001/api/ServiceHeaders/getServiceHeaderPost",
       "url": urlX+"ServiceHeaders/getServiceHeaderPost",
      "method": "POST",
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        "postman-token": "cbc5f035-bd06-e229-08db-b3866ff0fd0d"
      },
      "data": {        
        "Pais"   :paisX,
        "No_"   :$("#post_agendamento_no").val(),
      }
    }

      $.ajax(settings).done(function (response) {
        var notify = $.notify('<strong>Transferindo</strong> Registro...', {
          type: 'success',
          allow_dismiss: false,
          showProgressbar: true
        });
        
        console.log(response);
        //$('#dataTableOrdemAgendamento').DataTable().destroy();
        //loadAgendamento();
        if (($('#post_resource_no1').val() != '0') ){
          SalvaBookingProfissonalX(1,notify);
          EnviaEmailX(1,notify);
        }
        if (($('#post_resource_no2').val() != '0')){
          SalvaBookingProfissonalX(2,notify);
          EnviaEmailX(2,notify);
        }
        if (($('#post_resource_no3').val() != '0')){
          SalvaBookingProfissonalX(3,notify);
          EnviaEmailX(3,notify);
        }
        if (($('#post_resource_no4').val() != '0')){
          SalvaBookingProfissonalX(4,notify);
          EnviaEmailX(4,notify);
        }
        if (($('#post_resource_no5').val() != '0')){
          SalvaBookingProfissonalX(5,notify);
          EnviaEmailX(5,notify);
        }
        //cria pasta
        SalvaBookingCriaPastaX(notify)
        $('#dataTableOrdemAgendamento').DataTable().destroy();
        loadAgendamento();
        $('#post-agendamento-modal').modal('toggle');  


       // $('#post-agendamento-modal').modal('toggle');  
       

      });
      

  });
  
  function SalvaBookingProfissonalX(Profissional1,notify){

    var settings1 = {
      "async": true,
      "crossDomain": true,
      // "url": "http://www.nav.farmina.com.br:3001/api/Farmina-1-Service-Booking-Resources/getInsertBooking",
       "url": urlX+"Farmina-1-Service-Booking-Resources/getInsertBooking",
      "method": "POST",
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        "postman-token": "cbc5f035-bd06-e229-08db-b3866ff0fd0d"
      },
      "data": {
        "Pais":paisX,
        "photo_path":$('#post_photo_path').val(),
        "service_invoce_no":$('#post_service_invoce_no').val(),
        "service_invoce_line_no1":$('#post_service_invoce_line_no'+Profissional1).val(),
        "customer_no":$('#post_customer_no').val(),
        "customer_name":$('#post_customer_name').val(),
        "customer_address":$('#post_customer_address').val(),
        "salesperson_code":$('#post_salesperson_code').val(),
        "resource_no1":$('#post_resource_no'+Profissional1).val(),
        "service_type1":$('#post_service_type'+Profissional1).val(),
        "isp1":$('#post_isp'+Profissional1).val(),
        "merchan1":$('#post_merchan'+Profissional1).val(),
        "trainning1":$('#post_trainning'+Profissional1).val(),
        "welcome1":$('#post_welcome'+Profissional1).val(),
        "planned_date1":$('#post_planned_date'+Profissional1).val(),
        }
  }
  $.ajax(settings1).done(function (response) {
    console.log(response);   
    setTimeout(function() {
      notify.update('message', '<strong>Salvando</strong> Profissional '+ $('#post_resource_no'+Profissional1).val());
    }, 2000);
        
  });  
  }

  function SalvaBookingCriaPastaX(notify){
    var settings1 = {
      "async": true,
      "crossDomain": true,
      // "url": "http://www.nav.farmina.com.br:3001/api/Containers",
       "url": urlX+"Containers",
      "method": "POST",
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        "postman-token": "cbc5f035-bd06-e229-08db-b3866ff0fd0d"
      },
      "data": {
        "name"   :$("#post_service_invoce_no").val(),
        }
  }
  $.ajax(settings1).done(function (response) {
    console.log(response);   
    setTimeout(function() {
      notify.update('message', '<strong>Salvando</strong> Pasta.');
    }, 3000);
        
  });  
  }


  
  function EnviaEmailX(prof,notify){
    var typeX = $('#post_service_type'+prof).val()
    var res = "";
    if(typeX == 1){
      res = 'Treinamento';
    }
    if(typeX == 2){
      res = 'Kit de boas-vindas'
    }
    if(typeX == 3){
      res = 'ISP'
    }
    if(typeX == 4){
      res = 'Merchandising'
    }
    if(typeX == 5){
      res = 'Army'
    }  

    var settings1 = {
      "async": true,
      "crossDomain": true,
      // "url": "http://www.nav.farmina.com.br:3001/api/resourses/getResourseEnviaEmail",
      "url": urlX+"resourses/getResourseEnviaEmail",
      "method": "POST",
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        "postman-token": "cbc5f035-bd06-e229-08db-b3866ff0fd0d"
      },
      "data": {
        "Pais":paisX,
        "nome_so":$('#post_service_invoce_no').val(),
        "nome_servico":$('#post_agendamento_no').val(),
        "nome_loja":$('#post_customer_name').val(),
        "data_estimada":formatDate($('#post_planned_date'+prof).val()),
        "endereco_loja":$('#post_customer_address').val() + ', '+ $('#post_customer_number').val(),
        "profissional1":$('#post_resource_no'+prof).val(),
        "type_service": res                
        }
  }
  $.ajax(settings1).done(function (response) {
    console.log(response);   
    setTimeout(function() {
      notify.update('message', '<strong>Enviando</strong> emails.');
    }, 4000);

    setTimeout(function() {
      notify.update('message', '<strong>Serviço</strong> Ordem de agendamento '+$('#post_service_invoce_no').val() + ', criada com sucesso');
    }, 4000);  
  });  
  }


  $("#btn_cliente_agendamento").click(function(){
    $('.start-date1').val('').datepicker('destroy')
    $('.start-date2').val('').datepicker('destroy')
    $('.start-date3').val('').datepicker('destroy')
    $('.start-date4').val('').datepicker('destroy')
    $('.start-date5').val('').datepicker('destroy')


    $('#add_agendamento_busca_professional1').val('0')
    $('#add_agendamento_planned_date1').val('')
    $('#add_agendamento_planned_hour1').val('')
    $('#add_agendamento_service_type1').val('0')
    $('#add_agendamento_food1').val('0')
    $('#add_agendamento_trainning_type1').val('0')
    $('#add_agendamento_trainning_comments1').val('')
    $('#add_agendamento_push_new_line1').val('')
    $('#add_agendamento_line_slow_comments1').val('')
    $('#div_add_agendamento_service_result1').val('0')

    $('#add_agendamento_busca_professional2').val('0')
    $('#add_agendamento_planned_date2').val('')
    $('#add_agendamento_planned_hour2').val('')
    $('#add_agendamento_service_type2').val('0')
    $('#add_agendamento_food2').val('0')
    $('#add_agendamento_trainning_type2').val('0')
    $('#add_agendamento_trainning_comments2').val('')
    $('#add_agendamento_push_new_line2').val('')
    $('#add_agendamento_line_slow_comments2').val('')
    $('#div_add_agendamento_service_result2').val('0')

    $('#add_agendamento_busca_professional3').val('0')
    $('#add_agendamento_planned_date3').val('')
    $('#add_agendamento_planned_hour3').val('')
    $('#add_agendamento_service_type3').val('0')
    $('#add_agendamento_food3').val('0')
    $('#add_agendamento_trainning_type3').val('0')
    $('#add_agendamento_trainning_comments3').val('')
    $('#add_agendamento_push_new_line3').val('')
    $('#add_agendamento_line_slow_comments3').val('')
    $('#div_add_agendamento_service_result3').val('0')

    $('#add_agendamento_busca_professional4').val('0')
    $('#add_agendamento_planned_date4').val('')
    $('#add_agendamento_planned_hour4').val('')
    $('#add_agendamento_service_type4').val('0')
    $('#add_agendamento_food4').val('0')
    $('#add_agendamento_trainning_type4').val('0')
    $('#add_agendamento_trainning_comments4').val('')
    $('#add_agendamento_push_new_line4').val('')
    $('#add_agendamento_line_slow_comments4').val('')
    $('#div_add_agendamento_service_result4').val('0')

    $('#add_agendamento_busca_professional5').val('0')
    $('#add_agendamento_planned_date5').val('')
    $('#add_agendamento_planned_hour5').val('')
    $('#add_agendamento_service_type5').val('0')
    $('#add_agendamento_food5').val('0')
    $('#add_agendamento_trainning_type5').val('0')
    $('#add_agendamento_trainning_comments5').val('')
    $('#add_agendamento_push_new_line5').val('')
    $('#add_agendamento_line_slow_comments5').val('')
    $('#div_add_agendamento_service_result5').val('0')

    

    var table = $('#dataTableClienteAgendamento').DataTable();
    var length = table.column(0).data().length;
    $('#action_cliente_agendamento').val('i')
    $('#cliente-agendamento').modal('toggle');  
    
    if (length == 0){
      table.destroy();
      loadClienteX();
     }

     var length1 = $('#add_agendamento_busca_professional1 > option').length;
     console.log('quandadide PROFESSIONAL: ',length)
     if (length1 == 1){
       $.ajax({url: urlX+"resourses/getResourseQuery?Pais="+paisX, success: function(obj){
         var contX = "";
           $.each(obj.result, function(index, value){
             var val = value.No_ + ' | ' + value.Name;
             var optName     = 'optName = "'+value.Name+'"';
             contX +='<option value='+ value.No_ +' '+ optName + ' > '+val+' </option>';
           })
           $("#add_agendamento_busca_professional1").append(contX)
           $("#add_agendamento_busca_professional2").append(contX)
           $("#add_agendamento_busca_professional3").append(contX)
           $("#add_agendamento_busca_professional4").append(contX)
           $("#add_agendamento_busca_professional5").append(contX)
           $("#add_agendamento_busca_professional6").append(contX)
   
   
         }
       });
     }
  })

  $('#add_busca_cliente_agendamento').click(function(){
    $('#add-agendamento').modal('toggle');
    $('#action_cliente_agendamento').val('i')
    setTimeout(chamaCliente, 1000);
  })

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
  })

  

  var chamaCliente = function(){
    $('#cliente-agendamento').modal('toggle');  
  };


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
  var chamaAddAgendamento = function(){
    $('#add-agendamento').modal('toggle');  
  };
  var chamaEditAgendamento = function(){
    $('#edit-agendamento').modal('toggle');  
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


} 


}());

