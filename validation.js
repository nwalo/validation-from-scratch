$('#register').on('submit', (e)=>{
    
    handleValidation()
    e.preventDefault()
    
    let allAreFilled = true;
    document.getElementById("register").querySelectorAll("[required]").forEach(function(i) {
    if (!allAreFilled) return;
    if (!i.value) allAreFilled = false;
    if (i.type === "radio") {
      let radioValueCheck = false;
      document.getElementById("register").querySelectorAll(`[name=${i.name}]`).forEach(function(r) {
        if (r.checked) radioValueCheck = true;
      })
      allAreFilled = radioValueCheck;
    }
  })
  if (!allAreFilled) {
    alert('Fill all the fields');
  }else{
    $.get(`/users/checkEmail/${$('#email').val()}/`, (res)=>{
       
      if(res.status){
        console.log('email exist')
      }else{        
        $.get(`/users/checkUserName/${$('#username').val()}/`, (userres)=>{
            if(userres.status){
              console.log('user exist')
            }else{
              
                  if($('#pass1').val() == $('#pass2').val()){
                    data = {
                    firstname: $('#fname').val(),
                    lastname: $('#lname').val(),
                    username: $('#username').val(),
                    email: $('#email').val(), 
                    password: $('#pass1').val()
                    }      

                    $.post('/users/signup/', data, (response)=>{
                      console.log(response)
                      if(response.response == 'success'){
                        
                        $('.g_alert').fadeIn()
                        $('.g_alert').fadeOut(10000)
//                        setTimeout(()=>{
                          window.location.replace('/account/myaccount/')
//                        }, 2000)
                      }else{
                        alert('Error! unable to complete user registration, please try again.')
                      }
                    }, 'json')
                  }else{
                    console.log('Password does not match')
                    $('.f_alert').fadeIn()
                    $('.f_alert').fadeOut(5000)
                    return false;
                  }
                  
            }
          }, 'json')
      }
    }, 'json')
  }
    
    const pwp = {}
    pwp.alert = (message, type)=>{
      const html = `<div class="alert alert-${type} f_alert n_alert pt-20 pb-20" role="alert">
                      ${message}
                    </div>`
    }
    
//  let valid = true;
//  $('[required]').each(function() {
//    if ($(this).is(':invalid') || !$(this).val()) valid = false;
//  })
//  if (!valid) console.log("error please fill all fields!");
//  else console.log('valid');
//    
//    $.get(`/users/checkEmail/${$('#email').val()}/`, (res)=>{
//       
//      if(res.status){
//        console.log('email exist')
//      }else{
//        
//        $.get(`/users/checkUserName/${$('#username').val()}/`, (userres)=>{
//
//            if(userres.status){
//              console.log('user exist')
//            }else{
//              
//              if(!valid){
////                  $('.f_alert').fadeIn()
////                  $('.f_alert').fadeOut(5000)
//                  console.log('empty field')
//                } else{
//                  if($('#pass1').val() == $('#pass2').val()){
//                    data = {
//                    firstname: $('#fname').val(),
//                    lastname: $('#lname').val(),
//                    username: $('#username').val(),
//                    email: $('#email').val(), 
//                    password: $('#pass1').val()
//                    }      
//
//                    $('.g_alert').fadeIn()
//                    $('.g_alert').fadeOut(10000)
//
//            //        $.post('/users/signup/', data, (res)=>{
//            //          console.log(res)
//            //          window.location.replace('/account/myaccount/')
//            //        }, 'json')
//                  }else{
//                    console.log('Password does not match')
//                    $('.f_alert').fadeIn()
//                    $('.f_alert').fadeOut(5000)
//                    return false;
//                  }
//                  
//                }
//              
//              
//            }
//          }, 'json')
//      }
//    }, 'json')
  })