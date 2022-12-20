// Song Upload Api Called Here
console.log(userValue);
$("#songUploadBtn").click(function(){
    let firstValidation  = first_form_err();
    let thirdValidation =  third_form_err();
    let secondValidation = second_form_err();
    
    if(firstValidation && secondValidation && thirdValidation){
    $("#songUploadBtn").html(` <i class="fa fa-spinner fa-spin"></i> Uploading `);
     let Mood = [];
     let Theme = [];

     let Moodcheckboxes = document.querySelectorAll('input[name=Mood]:checked');
     let Themecheckboxes = document.querySelectorAll('input[name=Theme]:checked');
     let Lyrics = CKEDITOR.instances.editor1.getData();

   

     for (var i = 0; i < Moodcheckboxes.length; i++) {
         Mood.push(Moodcheckboxes[i].value)
     }
     for (var i = 0; i < Themecheckboxes.length; i++) {
         Theme.push(Themecheckboxes[i].value)
     }

     // console.log(Theme);
     // console.log(Mood);
     // console.log(VocalType);

     let imagesAll = $("#Song_Image").prop("files");
     console.log([...imagesAll]);

     var form_data = new FormData();  
     form_data.append("SongFile", $("#Song_Mp3_File").prop("files")[0]);
     form_data.append("SongTitle", $("#song_title").val());
     form_data.append("RecordingYear", $("#Recording_Year").val());
     form_data.append("ReleaseDate", $("#ReleaseDate").val());
     form_data.append("Country", $("#Country").val());    
     form_data.append("ArtistRole", $("#ArtistRole").val());
     form_data.append("ArtistName", $("#ArtistName").val());
     form_data.append("SongPricing", $("#SongPricing").val());
     form_data.append("Theme", Theme.join());
     form_data.append("Mood", Mood.join());
     form_data.append("Lyrics", Lyrics);
     [...imagesAll].map((item, i)=>{
        form_data.append(`SongImage${i}`, item);
     })
     

     $.ajax({
         url: '/artist/music/upload',
         type: 'POST',
         processData: false, // important
         contentType: false, // important
         dataType : 'json',
         data: form_data,
         headers: {
            Authorization : `Bearer ${userValue}`
         },
         success: function(result){
             console.log(result);
             if(result.message == "flag1"){
                 alert("Music Uploaded please edit the amount of license !")
                 
             }
             $("#songUploadBtn").html(`Upload`);

         },
     });
}

 })

 
