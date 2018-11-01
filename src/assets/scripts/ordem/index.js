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
  var valueX = "";
      if (value == 0){
        valueX =  'Pendente';
      }else if(value==1){
        valueX =  'To Do';
      }else if(value==2){
        valueX =  'Started';
      }else if(value==3){
      valueX =  'Accomplished';            
      }
      return valueX;
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



  $('#dataTableOrdemAgendamento tbody').on( 'click', 'button', function () {
          var data = $("#dataTableOrdemAgendamento").DataTable().row( $(this).parents('tr') ).data();
          var id = data['No_'];
          
          $('#post_agendamento_no').val(id)
          $('#lbl_post_agendamento').text('Deseja postar esse agendamento '+ id + ' ?');
          $('#post-agendamento-modal').modal('toggle')
            
        });


    
    function loadAgendamento() {       
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
              { "data" : "Document Status", "render": function (data) {
                return StatusX(data);
              }
            }, 
              // { "data" : "Status", "render": function (data) {
              //     return StatusX(data);
              //   }
              // },  
              { "data" : "Order Date", "render": function ( data) {
                return formatDate(data);
                } 
              } ,
              { "data" : "Order Time", "render": function ( data) {
                return formatHora(data);
                } 
              },
              { "data" : "Customer No_" },
              // { "data" : "Ship-to Name" },
              { "data" : "Name" },
              // { "data" : "Name" ,"visible": false},//Codigo deposito
              //{ "data" : "Priority" ,"visible": false},
              //{ "data" : "Assigned User ID" ,"visible": false},
              { "data" : "Professional 1" },
               { "targets": -1, "data": null, 
                "render": function (a,d){
                  var btn =""
                    //btn += "<button action='finished' type='button' class='btn cur-p btn-info'>Edit</button>";                  
                    btn += "<button action='postando_agendamento' href='javascript:void(0);' type='button' class='btn cur-p btn-danger'>Post</button>" ;                  
                    return btn;
              }
            }]
            
          });
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

$("#btn_add_agendamento").click(function(){

  var length = $('#add_agendamento_busca_cliente > option').length;
  console.log('quandadide de pop: ',length)
  if (length == 1){
    $.ajax({url: "http://www.nav.farmina.com.br:3001/api/Customers/", success: function(result){
      //add_agendamento_busca_cliente
      var contX = "";
        $.each(result, function(index, value){
          var val = value.No_ + ' | ' + value.Name +' | '+ value.Address + ' | ' + value['City']  + ' | ' + value['Post Code']  + ' | ' + value['Phone No_'] + ' | '+ value.Contact;
          var optName     = 'optName = "'+value.Name+'"';
          var optAddress  = 'optAddress = "'+value.Address+'"';
          var optPost     = 'optPost = "'+value['Post Code']+'"';
          var optPhone    = 'optPhone = "'+value['Phone No_']+'"';
          var optContact  = 'optContact = "'+value.Contact+'"';
          var optCity     = 'optCity = "'+value.City+'"';
          var optAddress2 = 'optAddress2 = "'+value['Address 2']+'"';
          var optSalespersonCode = 'optSalespersonCode = "'+value['Salesperson Code']+'"';
          

            contX +='<option value='+ value.No_ +' '+ optSalespersonCode + ' '+ optCity +' '+ optName +' '+ optAddress2 +' '+ optAddress +' '+ optPost +' '+ optPhone +' '+ optContact +' > '+val+' </option>';
        })
        $("#add_agendamento_busca_cliente").append(contX)

      }
    });
  }
  
  var length1 = $('#add_agendamento_busca_professional1 > option').length;
  console.log('quandadide PROFESSIONAL: ',length)
  if (length1 == 1){
    $.ajax({url: "http://www.nav.farmina.com.br:3001/api/resourses/getResourseQuery", success: function(obj){
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

  $('#add-agendamento').modal('toggle');  
})


function PromoterServiceTypeX(promoter,value){
  var contX ="";
  var lblCont ="";
  $("#add_agendamento_service_result"+promoter+ " option").remove();
  if(value==1){
    //traning
    lblCont =" Tranning for which line?";
    contX +='<option value="0">  </option>';
    contX +='<option value="1"> Traning2 </option>';
    contX +='<option value="2"> Traning3 </option>';
    contX +='<option value="3"> Traning4 </option>';
    contX +='<option value="4"> Traning5 </option>';
  }else if(value==2){
    lblCont =" For which line would your like welcome kit?";
    contX +='<option value="0">  </option>';
    contX +='<option value="1"> ND QUINOA </option>';
    contX +='<option value="2"> ND PUMPKIN </option>';
    contX +='<option value="3"> ND ANCESTRAL </option>';
    contX +='<option value="4"> ND PRIME </option>';
  }else if(value==3){
    lblCont =" Why you are doing this ISP? ";
    contX +='<option value="0">  </option>';
    contX +='<option value="1"> PUSH NEW LINE </option>';
    contX +='<option value="2"> LINE SLOW </option>';
    contX +='<option value="3"> GENERIC </option>';
  }else if(value==4){
    lblCont =" What kind of mechandissing do you want? ";
    contX +='<option value="0">  </option>';
    contX +='<option value="1"> SHELF ORGANIZATION </option>';
    contX +='<option value="2"> STICKER DECOR </option>';
    contX +='<option value="3"> NEW SHELF </option>';
  }else if(value==5){
    lblCont ="  MERCHANNNNN ? ";
    contX +='<option value="0">  </option>';
    contX +='<option value="1"> 1 </option>';
    contX +='<option value="2"> 2 </option>';
    contX +='<option value="3"> 3 </option>';
  }  
  $('#div_add_agendamento_service_result'+promoter).show()
  $("#lbl_add_agendamento_service_result"+promoter).html(lblCont)
  $("#add_agendamento_service_result"+promoter).append(contX)
}

$("#add_agendamento_service_type1").change(function(){
  var promoter = 1;
  var value = $(this).val();
  PromoterServiceTypeX(promoter,value)
});
$("#add_agendamento_service_type2").change(function(){
  var promoter = 2;
  var value = $(this).val();
  PromoterServiceTypeX(promoter,value)
});
$("#add_agendamento_service_type3").change(function(){
  var promoter = 3;
  var value = $(this).val();
  PromoterServiceTypeX(promoter,value)
});
$("#add_agendamento_service_type4").change(function(){
  var promoter = 4;
  var value = $(this).val();
  PromoterServiceTypeX(promoter,value)
});
$("#add_agendamento_service_type5").change(function(){
  var promoter = 5;
  var value = $(this).val();
  PromoterServiceTypeX(promoter,value)
});
$("#add_agendamento_service_type6").change(function(){
  var promoter = 6;
  var value = $(this).val();
  PromoterServiceTypeX(promoter,value)
});


  $("#btn_add_ordem_agendamento").click(function(){
    console.log('entrou na janela');
    var data = new FormData();
    
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://www.nav.farmina.com.br:3001/api/ServiceHeaders/getServiceHeaderInsert",
      "method": "POST",
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        "postman-token": "cbc5f035-bd06-e229-08db-b3866ff0fd0d"
      },
      "data": {        
       "DocumentType"             : "0",
       //"No_"                      : $("#add_agendamento_n").val(),
       "CustomerNo_"              : $("#add_agendamento_n_cliente").val(),
       "Bill_toCustomerNo_"       : $("#add_agendamento_n_cliente").val(),
       "Bill_toName"              : $("#add_agendamento_nome").val(),
       "Bill_toName2"             : "",
       "Bill_toAddress"           : $("#add_agendamento_fatura_endereco").val(),
       "Bill_toAddress2"          : "",
       "Bill_toCity"              : $("#add_agendamento_fatura_cidade").val(),
       "Bill_toContact"           : $("#add_agendamento_nome").val(),
       "Bill-to Post Code"           : $("#add_agendamento_fatura_cep").val(),
       
       "YourReference"            : "",
       
        "Professional1"           :$("#add_agendamento_busca_professional1").val(),
        "PlannedDate1"            :formatDateSql($("#add_agendamento_planned_date1").val()),
        "PlannedHours1"           :$("#add_agendamento_planned_hour1").val(),
        "ServiceType1"            :$("#add_agendamento_service_type1").val(),
        "ProfessionalFunction1"   :$("#add_agendamento_service_result1").val(),
        
        "Professional2"           :$("#add_agendamento_busca_professional2").val(),
        "PlannedDate2"            :formatDateSql($("#add_agendamento_planned_date2").val()),
        "PlannedHours2"           :$("#add_agendamento_planned_hour2").val(),
        "ServiceType2"            :$("#add_agendamento_service_type2").val(),
        "ProfessionalFunction2"   :$("#add_agendamento_service_result2").val(),
        
        "Professional3"            :$("#add_agendamento_busca_professional3").val(),
        "PlannedDate3"            :formatDateSql($("#add_agendamento_planned_date3").val()),
        "PlannedHours3"           :$("#add_agendamento_planned_hour3").val(),
        "ServiceType3"            :$("#add_agendamento_service_type3").val(),
        "ProfessionalFunction3"   :$("#add_agendamento_service_result3").val(),
        
        "Professional4"           :$("#add_agendamento_busca_professional4").val(),
        "PlannedDate4"            :formatDateSql($("#add_agendamento_planned_date4").val()),
        "PlannedHours4"           :$("#add_agendamento_planned_hour4").val(),
        "ServiceType4"            :$("#add_agendamento_service_type4").val(),
        "ProfessionalFunction4"   :$("#add_agendamento_service_result4").val(),
        
        "Professional5"           :$("#add_agendamento_busca_professional5").val(),
        "PlannedDate5"            :formatDateSql($("#add_agendamento_planned_date5").val()),
        "PlannedHours5"           :$("#add_agendamento_planned_hour5").val(),
        "ServiceType5"            :$("#add_agendamento_service_type5").val(),
        "ProfessionalFunction5"   :$("#add_agendamento_service_result5").val(),
        
      }
    }

      $.ajax(settings).done(function (response) {
        console.log(response);
        $('#dataTableOrdemAgendamento').DataTable().destroy();
        loadAgendamento();
        $('#add-agendamento').modal('toggle');  
        
      });    

  });







  $("#btn_save_post_agendamento").click(function(){
    var data = new FormData();
    
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://www.nav.farmina.com.br:3001/api/ServiceHeaders/getServiceHeaderPost",
      "method": "POST",
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        "postman-token": "cbc5f035-bd06-e229-08db-b3866ff0fd0d"
      },
      "data": {        
        "No_"   :$("#post_agendamento_no").val(),
        
      }
    }

      $.ajax(settings).done(function (response) {
        console.log(response);
        $('#dataTableOrdemAgendamento').DataTable().destroy();
        loadAgendamento();
        $('#post-agendamento-modal').modal('toggle');  
        
      });    

  });
  
}());

