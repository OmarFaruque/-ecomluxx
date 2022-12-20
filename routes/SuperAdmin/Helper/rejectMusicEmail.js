const nodemailer = require("nodemailer");
require("dotenv").config();

exports.sendEmailForRejectMusic =  async (email,htmlData, songName) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.ionos.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SUPPORT_MAIL,
            pass: process.env.SUPPOR_MAIL_PASSWORD
        },
});
let rejectDate = new Date().toISOString().slice(0, 10);
let info = await transporter.sendMail({
    from: `"Artist | Music" <support@mertyourtalent.co.za>`,
    to: email,
    subject: "🎼 Your Music Got Rejected", 
    text: "", 
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Forget | Pass | Email</title>
    
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;1,300&display=swap');
            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                 font-family: 'Poppins', sans-serif;
            }
            .container{
                width: 100%;
                /* border: 2px solid red; */
                height: auto;
                margin: 0 auto;
                background-color: #343a40;
            }
            .header-sec{
                text-align: center;
                padding-top: 20px;
            }
            .card{
                width: 70%;
                margin: 30px auto 0 auto;
                background-color: #ffff;
                border-radius: 2px;
                padding: 20px 40px 72px 40px;
            }
            p{
                font-size: .9rem;
            }
            .card .forget-pass-btn{
             
                background: #28a78f;
                padding: 6px 35px;
                border: none;
                font-size: 1.1rem;
               position: relative;
               top: 6px;
                color: #fff;
                border-radius: 2px;
                font-weight: 700;
                outline: none;
                cursor: pointer;
                transition: all .5s;
                text-decoration: none;
            }
            .card .forget-pass-btn:hover{
                background: #0f7b67;
            }
            .query_faq{
                background: #fff3cd;
                padding: 11px;
                margin-top: 18px;
                color: #856404;
                border-radius: 2px;
            }
            .thanks_para{
                margin-top: 30px;
            }
            .link_para{
                margin-top: 10px;
                color: #42b0ff;
            }
            .footer_card{
                border: 2px solid red;
                height: 100px;
                margin-top: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container" >
            <div class="header-sec" >
                <img src="https://artist-music-seller.herokuapp.com/images/admin/logo2.png" alt="mert-your-talent">
            </div>
            <div class="card" >
                
                <p>We wanted to let you know that our team has reviewed your content and we don't think that it's in line with our policy. As a result, we've rejected the following content:
                </p>
                <p class="query_faq">Song name / <b> ${songName}</b>  Date : ${rejectDate}</p>
                <p class="thanks_para">What you can do next</p>
                <p class="thanks_para">We realise that this may be frustrating news, and we want to help make sure that your content is accessible to all audiences. Here's what you can do:</p>
                <div>
                    ${htmlData}
                </div>
                <p class="thanks_para">What you can do next</p>
                <ul class="thanks_para">
                    <li>Review YouTube's Community Guidelines and Creator Academy lessons.</li>
                    <li>Double-check that your content is in line with our guidelines.</li>
                    <li>Appeal here if you think that we've made a mistake.</li>
                </ul>
    
    
                <p class="thanks_para">If you have any further questions, please feel free to reach out to us here. </p> <br>
                <p class="thanks_para">Sincerely, </p> <br>
                <p class="thanks_para">The Mert Your Talent team, </p> <br>
    
                
            </div>
           
        </div>
    </body>
    </html>`, 
});    
 console.log("Message sent: %s", info.messageId);
// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

//<p> http://localhost:5001/artist/reset/password?id=${verifycode} <p></p>