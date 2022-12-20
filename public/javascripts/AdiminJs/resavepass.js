let reSavePass = document.getElementById("saveNewPassBtn");
    reSavePass.addEventListener("click",function(){
        this.value = "Please Wait..."
        let newPass_1 = document.getElementById("newPass_1").value;
        let newPass_2 = document.getElementById("newPass_2").value;
        let err_save_password = document.getElementById("err_save_password");
        if(newPass_1 == newPass_2 && newPass_1 !== "" && newPass_2 !== ""){
            console.log(newPass_1);
            console.log(email);
            console.log(verifyId);
            $.ajax({
                url:"/artist/reset/password/update",
                method:"POST",
                data:{ email:email,
                     password:newPass_1,
                     verifycode:verifyId
                    },
                success:function(result){
                    reSavePass.value = "Reset Password"
                    console.log(result);
                    if(result.message == "flag0"){
                        MessageThrow("red", "Please fill all the fields !" )
                    }else if(result.message == "flag1"){
                        MessageThrow("red", "Invalid link expired !" )
                    }else if(result.message == "flag2"){
                        MessageThrow("green", "Password reset successfully !" )
                    }
                    function MessageThrow(color, text){
                        err_save_password.innerHTML = text;
                        err_save_password.style.color = color;  
                    }
                }           
            }) 
        }else{ 
            err_save_password.innerHTML = "Password not matched !";
            err_save_password.style.color = "red";
        }
        if(newPass_1 == "" || newPass_2 == ""){
            err_save_password.innerHTML = "Please fill all the fields    !";
            err_save_password.style.color = "red";
        }
    })

let new_pass_mess = document.getElementById("newPass_1");
    new_pass_mess.addEventListener("change", function(){
        let new_pass_mess = document.getElementById("new_pass_mess");
        if(this.value == ""){
            new_pass_mess.innerHTML = "please fill this field !";
            new_pass_mess.style.color = "red";
        }else if(this.value.length < 6){
            new_pass_mess.innerHTML = "Password should be minimum 6 character !";
            new_pass_mess.style.color = "red";
        }else{
            new_pass_mess.innerHTML = "";

        }
    })
let new_pass_mess_2 = document.getElementById("newPass_2");
    new_pass_mess_2.addEventListener("change", function(){
    let errMessage = document.getElementById("re_pass_mess");
    // console.log(new_pass_mess.value);
    // console.log(this.value);
    if(this.value == new_pass_mess.value){
        errMessage.innerHTML = "Password matched !";
        errMessage.style.color = "green";      
    }else{
        errMessage.innerHTML = "Password not matched !";
        errMessage.style.color = "red"; 
    }


    })

