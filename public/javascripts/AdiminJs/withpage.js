$(document).ready(function(){
    $(".withdraw_li").addClass("active");
   

    // $(".with_2_row").hide()
    // $(".with_3_row").show()


$("#with_1_row").click(function(){
    $("#with_1_row").addClass('active_with');
    $("#with_2_row").removeClass('active_with');
    $("#with_3_row").removeClass('active_with');



    $(".with_1_row").show()
    $(".with_2_row").hide()
    $(".with_3_row").hide()

})

$("#with_2_row").click(function(){
    $("#with_2_row").addClass('active_with');
    $("#with_1_row").removeClass('active_with');
    $("#with_3_row").removeClass('active_with');

    $(".with_1_row").hide()
    $(".with_2_row").show()
    $(".with_3_row").hide()
})

$("#with_3_row").click(function(){
    $("#with_3_row").addClass('active_with');
    $("#with_2_row").removeClass('active_with');
    $("#with_1_row").removeClass('active_with');

    $(".with_1_row").hide()
    $(".with_2_row").hide()
    $(".with_3_row").show()
})
})

function submitPay(){
    var inputPay = $(".with_input_field").val();
        if(inputPay != ""){
            $(".err_pay").hide()
            $.ajax({
                url:"/artist/withdraw/data/save",
                method:"POST",
                data:{
                    paypalId : inputPay
                },
                headers: {
                    Authorization : `Bearer ${userValue}`
                },
                success: function(result){
                    console.log(result);
                    if(result.message != "flag0"){
                        alert("Withdraw details Saved !")
                    }else{
                        alert("Error in Saving !")
                    }
                }
            })

        }else{
            $(".err_pay").show()

        }
}