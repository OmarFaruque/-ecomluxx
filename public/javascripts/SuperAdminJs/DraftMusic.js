$(document).ready(function(){
    $(".draft_li").addClass("active");
    $('#example_0').DataTable();

// Only One checbox checked 
    $('input[name="vocal_type"]').click(function() {
    $('input[name="vocal_type"]').not(this).prop("checked", false);
    });


})
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
            reader.onload = function (e) {
               $('#image_preview').attr('src', e.target.result);
            };
        reader.readAsDataURL(input.files[0]);
    }
}

$("#songPublishBtn").click(function(){
    $("#songPublishBtn").html(` <i class="fa fa-spinner fa-spin"></i> Publishing `);
     let Mood = [];
     let Theme = [];

     let Moodcheckboxes = document.querySelectorAll('input[name=Mood]:checked');
     let Themecheckboxes = document.querySelectorAll('input[name=Theme]:checked');
     let Lyrics = CKEDITOR.instances.editor2.getData();
    

     for (var i = 0; i < Moodcheckboxes.length; i++) {
         Mood.push(Moodcheckboxes[i].value)
     }
     for (var i = 0; i < Themecheckboxes.length; i++) {
         Theme.push(Themecheckboxes[i].value)
     }

    //  console.log(Theme);
    //  console.log(Mood);
    


     var form_data = new FormData();  
     form_data.append("SongImage", $("#Song_Image").prop("files")[0]);
     form_data.append("SongFile", $("#Song_Mp3_File").prop("files")[0]);
     form_data.append("OldSongImage", $("#image_urldata").val());
     form_data.append("OldSongFile", $("#music_urldata").val());
     form_data.append("SongTitle", $("#song_title").val());
     form_data.append("RecordingYear", $("#Recording_Year").val());
     form_data.append("ReleaseDate", $("#ReleaseDate").val());
     form_data.append("Country", $("#Country").val());    
     form_data.append("ArtistRole", $("#ArtistRole").val());
     form_data.append("ArtistName", $("#ArtistName").val());
    //  form_data.append("SongPricing", $("#SongPricing").val());
     form_data.append("Theme", Theme.join());
     form_data.append("Mood", Mood.join());
     form_data.append("Lyrics", Lyrics);
     form_data.append("ProductID", $("#product_idtp").val());

     

     $.ajax({
         url: '/admin/music/publish',
         type: 'POST',
         processData: false, // important
         contentType: false, // important
         dataType : 'json',
         data: form_data,
         success: function(result){
             console.log(result);
             if(result.message == "flag1"){
                 alert("Music Published !")
             }else if(result.message == "flag2"){
                 alert("Please Fill All The field !")
             }
             
             $("#songPublishBtn").html(`Publish`);

         },
     });

 })
 function updateVarientPrice(sn){
        let price = $(`#varient_price_${sn}`).val();
        let varient_id = $(`#varient_id_${sn}`).val();
        $(`#update_var_id_${sn}`).html("wait...");

        $.ajax({
            url:`/admin/music/varient/price/update`,
            method:"POST",
            data:{
                varient_id, price
            },
            success:function(result){
            $(`#update_var_id_${sn}`).html("Update");
                console.log(result);
                if(result.message == "flag1"){
                    alert("New Price Updated !")
                }
            }
        })

        // alert(price +" - " + varientId);
    }
$(".varient_row_update").hide();
 function getMeChange(va){
        if(va == 2){
            $(".music_view_row").hide();
            $(".varient_row_update").slideDown().show();
        }else if(va == 1){
            $(".music_view_row").slideDown().show();
            $(".varient_row_update").hide();
        }
    }