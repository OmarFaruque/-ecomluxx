function ValidateEmail(mail){
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)){
        return true;
    }else{
        return false;
    }
}

function siginUpValidation(email,password){
    let email_1 = ValidateEmail(email);

    let pass;
    if(password.length < 6 && password){
        pass = false;
        document.getElementById('pass_err-01').style.display = "unset"
    }else{
        pass = true;
        document.getElementById('pass_err-01').style.display = "none";
    }
    if(email_1 && email ){
        document.getElementById('email_err-01').style.display = "none"
    }else{
        document.getElementById('email_err-01').style.display = "unset";
    }
    
    if(email_1 && pass){
        return true;
    }else{
        return false;
    }

}


let signupBtnPost = document.getElementById("signUpBtn");
      signupBtnPost.addEventListener("click", async function(){
      let isRegistered = document.getElementById("isProRegistered").checked;
      let termsandconditions = document.getElementById("termsandconditions").checked;

      var fullname = document.getElementById("fullname").value;
      let artistType = document.getElementById("airtistType").value;
      let email = document.getElementById("signUpEmail").value;
      let maingenre = document.getElementById("mainGenre").value;
      let country = document.getElementById("Country").value;
      let pass = document.getElementById("signUpPassword").value;

    let valiidd =  siginUpValidation(email, pass)
    let empToAr = ["fullname", "airtistType", "signUpEmail", "mainGenre", "Country", "signUpPassword"];
    function makeEmpty(){
        empToAr.forEach((element)=> document.getElementById(element).value = "");
    }

    if( valiidd ) {
        if(termsandconditions){
            document.getElementById("text_err").style.display = "none";
        signupBtnPost.value = "Please wait...";
        let postData = {
            fullname:fullname,
            artistType:artistType,
            email:email,
            mainGenre:maingenre,  
            country:country,
            isProRegistered: isRegistered,
            password:pass
        }
           
        $.ajax({
            url:"/artist/signup",
            method:"POST",
            data:postData,
            success:function(result){
              //  console.log(result);
                if(result.message == "flag2"){
                     $(".signUpError").html("Email Already Registered !")
                    // alert("ss")
                }
                if(result.message == "flag1"){
                     $(".signUpError").html("New Artist Created Successfully !")
                      makeEmpty();

             }
             if(result.message == "flag0"){
                $(".signUpError").html("Please fill all the fields !")
             }
             signupBtnPost.value = "Sign Up";       

         }
     })

    }else{
        document.getElementById("text_err").style.display = "block";
    }
}
    })

let signInBtnPost = document.getElementById("signInBtnnn");
    signInBtnPost.addEventListener("click", async function(){
        this.value = "Please Wait...";
     
        let email = document.getElementById("signInEmail").value;
        let password = document.getElementById("signInPassword").value;
        let postData = {
            email:email,
            password:password
        }
        $.ajax({
            url:"/artist/signin",
            method:"POST",
            data:postData,
            success:function(result){
                console.log(result);
                signInBtnPost.value = "Sign In";
                var errValue = document.getElementById("errSigninnn");
              
                if(result.message == "flag1"){
                    errValue.innerHTML = "Email Not Registered !";
                    //$(".errSigninnn").html("Email Not Registered !")
                }
                else if(result.message == "flag2"){ 
                  window.location = "/artist";
                } 
                else if(result.message == "flag3"){
                    errValue.innerHTML = "Wrong Credentials !";

                }
                else if(result.message == "flag0"){
                    errValue.innerHTML = "Please fill all the fields !";

                }
            } 
        })
      
    })

let forgetPassword = document.getElementById("forgetPassword");
    forgetPassword.addEventListener("click", async function(){
        this.value = "Please Wait..."
        let email = document.getElementById("forgetEmail").value;
        let emailErr = document.getElementById("errForget");

        $.ajax({
            url:"/artist/forgetpassword",
            method:"POST",
            data:{
                email:email
            },
            success:function(result){
                console.log(result);
                forgetPassword.value = "Forget Now"
                switch(result.message){
                    case 'flag0':             
                        emailErr.innerHTML = "Please fill this field !";
                        break;
                    case 'flag1':
                        emailErr.innerHTML = "Email is not registered !";
                        break;
                    case 'flag2':
                        emailErr.innerHTML = "Reset password link sent to your email !";
                        break;
                    case 'flag3':
                        emailErr.innerHTML = "Reset password link sent to your email !";    
                        break;
                }

            }
        })


    })

