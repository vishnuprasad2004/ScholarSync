const { transporter } = require('./mailer.config');

const mailer = async(studentData, messages) => {

   
    console.log("messages"+messages)
    let content = ""
    for (let i = 0; i < messages.length; i++) {
        const element = messages[i];
        content += `<div class="news-container">
                    <h3>${element.name}</h3>
                    <br>
                    <p>${element.content}</p>
                    <a href="${element.link}"></a>
                    <br>
                </div>`
        
    }


    // the email message with default html and css code
    let emailMessage = {
        from: `"Today's Updates 👻" <${process.env.EMAIL}>`, 
        to: studentData.email, 
        subject: `Today's Updates ${new Date().getDate()}`, 
        html:
            `
            <head>
                <style>
                    @import url('https://fonts.googleapis.com/css?family=Poppins');
                    @import url('https://fonts.googleapis.com/css?family=Shrikhand');
                    body {
                        font-family:'Poppins',sans-serif;
                    }
                    h1,h2,h5 {
                        font-family:'Shrikhand',sans-serif;
                    }
                    .container {
                        box-shadow:0 0 5px;
                        padding:2rem;
                        border-radius:16px;
                        background-color:#ffffff;
                        box-shadow:0 0 5px #000;
                        margin:10px;
                        text-align:center;
                    }
                    .news-container {
                        color:white;
                        background-color:#141414;
                        padding:0.5rem;
                        box-shadow:0 0 5px #000;
                        border-radius:1rem;
                        margin:2px;
                        margin-top:7px;
                        
                    }
                    .container-wrapper {
                        background-image:  linear-gradient(#6a6a6a 1px, transparent 1px), linear-gradient(to right, #6a6a6a 1px, rgb(4, 4, 6) 1px);
                        background-size: 30px 30px;
                        padding:1rem;
                        text-align:center;
                        /*
                        display:flex;
                        flex-direction:column;
                        justify-content:center;
                        align-items:center;
                        */
                    }
                </style>
            </head>
            <body>
                <div class="container-wrapper">
                    ${content}
                </div>
            </body>
            `, 
    };

    // sending the mail
    let info = await transporter.sendMail(emailMessage)
        .then((info) => {
            console.log("MAILER: You sent an email successfully...!!!\nMessage sent 👍");    
        }).catch(error => {
            console.log(error.message);
            return;
        });
    
}

module.exports = { mailer };    