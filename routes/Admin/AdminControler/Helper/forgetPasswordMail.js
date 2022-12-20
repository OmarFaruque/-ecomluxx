const nodemailer = require("nodemailer");
require("dotenv").config();

exports.forgetEmailSend =  async (email,verifycode, userName) => {
    console.log(userName);
    let transporter = nodemailer.createTransport({
        host: "smtp.ionos.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SUPPORT_MAIL,
            pass: process.env.SUPPOR_MAIL_PASSWORD
        },
});
let forgetUrl = `${process.env.APP_URL}/artist/reset/password?id=${verifycode}`; 
let emailHtml = `<!DOCTYPE html>
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
    </style>
</head>
<body>
    <div class="container" >
        <div class="header-sec" >
            <img src="https://artist-music-seller.herokuapp.com/images/admin/logo2.png" alt="mert-your-talent">
        </div>
        <div class="card" >
            <h1> Hey ${userName} ! </h1>
            <p>You recently requested to reset your password for Artist | Music account. USe the button below ti reset it.</p>
            <a href="${forgetUrl}" class="forget-pass-btn" > Reset Your Password </a>
            <p class="query_faq" >If you have any questions. feel free to email our customer support</p>
            <p class="thanks_para">Thanks, <br>

                Artist | Music and the Company Team.</p>
            <p class="thanks_para">If you have trouble with the button above, copy and paste the URL below into your web browser</p>

            <p class="link_para" >${forgetUrl}</p>

            <p> Regards, </p>
            <p>The Mert Your Talent Team.</p>
        </div>
    </div>
</body>
</html>`
let info = await transporter.sendMail({
    from: `"Artist | Music" <support@mertyourtalent.co.za>`,
    to: email,
    subject: "🎼Forget Password Link", 
    text: "", 
    html: emailHtml, 
});    
 console.log("Message sent: %s", info.messageId);
// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

//<p> http://localhost:5001/artist/reset/password?id=${verifycode} <p></p>

