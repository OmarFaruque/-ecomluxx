function signInCheckerAdmin(){
    let email = $("#admin_email").val();
    let password = $("#admin_password").val();
    let err_Message = $(".err_admin_login")
    if(email && password){
        err_Message.html("");
        $.ajax({
            url:"/admin/login",
            method:"POST",
            data:{
                email,password
            },
            success:function(result){
                if(result.message == "flag1"){
                    window.location = "/admin";
                }else{
                    err_Message.html("Wrong Credentials !");
                    err_Message.css("color","red");
                }
            }
        })

    }else{
        err_Message.html("Please fill both the fields !");
        err_Message.css("color","red");
    }

}