function submitTest(){
 document.getElementById("update_btn_profile").value = "Please wait...";
   
   let fullname = document.getElementById("fullname").value;
   let artistType = document.getElementById("artistType").value;
   let mainGenre = document.getElementById("mainGenre").value;
   let artistStyle = document.getElementById("artistStyle").value;
   let stageName = document.getElementById("stageName").value;
   let portfolioLinks = document.getElementById("portfolioLinks").value;
   let facebookLinks = document.getElementById("facebookLinks").value;
   let youtubeLinks = document.getElementById("youtubeLinks").value;
   let websiteLinks = document.getElementById("websiteLinks").value;
   let address = document.getElementById("address").value;
   let cityname = document.getElementById("cityname").value;
   let country_name = document.getElementById("country_name").value;
   let postalCode = document.getElementById("postalCode").value;
   let artistBio = document.getElementById("artistBio").value;
   let hid_profile_image = document.getElementById("hid_profile_image").value;
   let profilImageValue = document.getElementById("profileImage").files[0];
   let ispro_registered = document.getElementById("ispro_registered").checked;

   let postProfile = { fullname, artistType, mainGenre, artistStyle, stageName, portfolioLinks, address, cityname, country_name, postalCode, artistBio, hid_profile_image, ispro_registered};
   let emptyChecker = [];

console.log(hid_profile_image);

   for(key in postProfile){
     //  console.log(key);
       if(postProfile[key] == ""){
            emptyChecker.push(key);
       }
   }

   var form_data = new FormData();  
       form_data.append("fullname",fullname);
       form_data.append("artistType",artistType);
       form_data.append("mainGenre",mainGenre);
       form_data.append("Styles",artistStyle);
       form_data.append("StageName",stageName);
       form_data.append("PortfolioLink",portfolioLinks);
       form_data.append("FacebookLink",facebookLinks);
       form_data.append("YoutubeLink",youtubeLinks);
       form_data.append("WebsiteLink",websiteLinks);
       form_data.append("Address",address);
       form_data.append("Country",country_name);  
       form_data.append("Postalcode",postalCode);
       form_data.append("City",cityname);
       form_data.append("hid_profile_image",hid_profile_image);
       form_data.append("isProRegistered",ispro_registered);
       form_data.append("Bio",artistBio);
       form_data.append("ArtistImage",profilImageValue);
      

  console.log(form_data);
   $.ajax({
    url: '/artist/profile/update/user',
    type: 'POST',
    processData: false, // important
    contentType: false, // important
    dataType : 'json',
    data: form_data,
    success: function(result){
        console.log(result);
        if(result.message == "flag1"){
        }
     //   $("#songUploadBtn").html(`Upload`);
     document.getElementById("update_btn_profile").value = "update profile";

    },
});
   
}

function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();
          reader.onload = function (e) {
             $('#img_prev_me').attr('src', e.target.result);
          };
      reader.readAsDataURL(input.files[0]);
  }
}