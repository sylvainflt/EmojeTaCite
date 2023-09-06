import html2canvas from 'html2canvas'

export function sendEmailSmtpJs(user) {

    const receiver = inputEmail.value
    console.log(receiver)
  
    // on récupère la partie citation avec commentaire, à laquelle on retire les boutons pour l'envoyer en pièce jointe
    let newBody = document.querySelector('#quoteBloc')
    newBody.querySelector('#selectionCategory').style.display = "none"
    newBody.querySelector('#commandLine').style.display = "none"
  
    // on fait une image qui va contenir la partie citation ci-dessus
    let nouvelleImg = document.createElement("img");
    
    html2canvas(newBody).then(function (canvas) {
      //document.body.appendChild(canvas)
      nouvelleImg.src = canvas.toDataURL()
      //console.log("image "+nouvelleImg)
  
      //document.body.appendChild(nouvelleImg);
  
      // Envoi de l'e-mail avec l'image en pièce jointe
      Email.send({
        SecureToken : "957f0f1a-faea-407a-a73d-2d5dffada68e",
        To : receiver,
        From : "EmojeedQuotes<contact@sylvainfoucault.com>",
        Subject : "😀💬👋 You got an EmojeedQuote 📫🧾 from "+user,
        Body : `You received a message from ${user}. <br/><br/><br/>
          This e-mail is sent by the EmojeedQuote web application. <br/>
          The e-mail is sent through ElasticEmail and my personal domain. <br/>
          Person in charge : Sylvain Foucault, adress : 13 rue des Francs Muriers 80000 Amiens FRANCE, phone : +33 768766012 `,
        Attachments : [
          {
            name : "emojeedQuote.png",
            data : nouvelleImg.src
          }
        ]
      }).then(
        message => statusSendEmail.innerHTML = `E-mail status : ${message}`  
  
      )
      newBody.querySelector('#selectionCategory').style.display = "block"
      newBody.querySelector('#commandLine').style.display = "flex"
      
    })
}

export function sendEmailElasticemailAPI(){
    
  fetch("https://api.elasticemail.com/v4/emails/transactional", 
    { headers: {
                  'X-ElasticEmail-ApiKey':'282193FD1292CFF4CB31C4CC63D0A75CBB06594CFB60A887B27A6FD24F16601908B9F0992ABCA56CBBE49E59F783EF2E', 
                  },
          method: 'POST',        
          data: {          
            "Recipients":[  
              {  
                  "To":"foucaultsylvain@hotmail.com"
              }
            ],
            "Content":{  
              "From":"contact@sylvainfoucault.com",
              "Subject":"Hello world",
              "Body":"<html><head></head><body><p>Hello,</p>This is my first transactional email.</p></body></html>"            
            },
            "message":"contenu du message"
            
          }
    }
  )
  .then(response => {
    if(response.status === 200) return response.text()
  })
  .then(data => {
    console.log(JSON.parse(data))
  })
  .catch((error) => {
    console.log(error)
    document.querySelector("#quoteLoader").style.display = "none";
    document.querySelector("#quoteContent").style.visibility = "visible";
    document.querySelector("#quoteContent").innerHTML = error
  })

}

export async function mailTo(){

    const receiver = inputEmail.value
    console.log(receiver)

    /*<form action="mailto:you@yourdmainhere.com" method="post" enctype="text/plain">
        FirstName: <input type="text" name="FirstName">
        Email: <input type="text" name="Email">
        <input type="submit" name="submit" value="Submit">
    </form>*/
    
    
    // on récupère la partie citation avec commentaire, à laquelle on retire les boutons pour l'envoyer en pièce jointe
    let newBody = document.querySelector('#quoteBloc')
    newBody.querySelector('#selectionCategory').style.display = "none"
    newBody.querySelector('#commandLine').style.display = "none"
    // on fait une image qui va contenir la partie citation ci-dessus
    let nouvelleImg = document.createElement("img");  

    const canvas = await html2canvas(newBody)
    //document.body.appendChild(canvas)
    nouvelleImg.src = canvas.toDataURL()
    //console.log("image "+nouvelleImg)
    //sendEmailForm.appendChild(nouvelleImg)
          
    console.log(nouvelleImg)
    sendEmailForm.action = `mailto:${receiver}`
    sendEmailForm.method = "post"
    sendEmailForm.enctype = "application/x-www-form-urlencoded"
    sendEmailForm.submit()

    
}

function copyDivToClipboard(element) {
  var range = document.createRange();
  range.selectNode(element);
  window.getSelection().removeAllRanges(); // clear current selection
  window.getSelection().addRange(range); // to select text
  document.execCommand('copy');
  window.getSelection().removeAllRanges();// to deselect
}

export function sendEmailEmailJS(user, quote){

  console.log("sendEmailEmailJS(quote)")
  console.log("user "+user)
  console.log("quote "+quote)
  console.log("quote.outerHTML "+quote.outerHTML)

  const receiver = inputEmail.value
  console.log(receiver)

  var templateParams = {
    from_name: user,
    to_name: 'Pascal',
    to_email: receiver,    
    message: quote.outerHTML
  };
 
  console.log("templateParams "+templateParams)

  emailjs.send('service_r80ouju', 'template_ymygahy', templateParams)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });

}