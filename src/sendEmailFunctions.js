import html2canvas from 'html2canvas'
import EmojeTaCiteLogo from './EmojeTaCiteReduit.png'
import $ from "jquery";

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

export function sendEmailEmailJS(user){  

  const receiverEmail = inputEmail.value
  const receiverName = inputNameReceiver.value

  // on récupère la partie citation avec commentaire, à laquelle on retire les boutons pour l'envoyer 
  let newBody = document.querySelector('.monSite')
  let selectionCategorySaved = $('#selectionCategory').detach()
  let commandLineSaved = $('#commandLine').detach()
  let imageAuthorSaved = $('#imageAuthor').detach()

  // on enregistre l'emojiBloc dans un nouvel élément pour le supprimer pendant l'envoi puis le remettre    
  let emojiBlocSaved = $('#emojiBloc').detach()
  
  quoteBloc.style.borderRadius = "50px"
  const quoteBlocPadding = getComputedStyle(quoteBloc).padding
  quoteBloc.style.padding = "1rem"
  quoteLine.style.borderRadius = "10px"
  quoteLine.style.padding = getComputedStyle(quoteLine).padding

  const quoteLineFontSize = getComputedStyle(quoteLine).fontSize
  quoteLine.style.fontSize = "1rem"
  const quoteAuthorFontSize = getComputedStyle(quoteAuthor).fontSize
  quoteAuthor.style.fontSize = "1rem"


  // pour ajouter un espace entre la citation et le commentaire
  const quoteAuthorDivPadding = getComputedStyle(quoteAuthorDiv).padding
  quoteAuthorDiv.style.padding = "1rem 0 2rem 2rem"

  const authorCommentSpanFontSize = getComputedStyle(authorCommentSpan).fontSize
  authorCommentSpan.style.fontSize = "1rem"
  const emojisFontSize = getComputedStyle(emojis).fontSize 
  emojis.style.fontSize = "1.5rem"   


  const logo = new Image()
  logo.src = EmojeTaCiteLogo
  //logo.style.margin = "0 50%"
  console.log(logo.outerHTML)

  var templateParams = {
    from_name: user,
    to_name: receiverName,
    to_email: receiverEmail,   
    titre1: logo.outerHTML,
    message: newBody.outerHTML
  };

  //console.log("templateParams "+templateParams)

  emailjs.send('service_r80ouju', 'template_fi4zpmr', templateParams)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      statusSendEmail.innerHTML = `E-mail envoyé avec succès !`
    }, function(error) {
      console.log('FAILED...', error);
      statusSendEmail.innerHTML = `E-mail non envoyé, un problème technique s'est produit.`
    });

  /* on remet tous les éléments
  newBody.querySelector('#selectionCategory').style.display = "block"
  newBody.querySelector('#commandLine').style.display = "flex"
  newBody.querySelector('#imageAuthor').style.display = "block"*/
  
  // on remet l'emojiBloc
  //newBody.querySelector('#emojiBloc').style.display = "flex"
  emojiBlocSaved.appendTo(newBody)
  selectionCategorySaved.insertBefore(document.querySelector('#quoteLoader'))
  commandLineSaved.insertAfter(document.querySelector('#quoteContent'))
  imageAuthorSaved.insertAfter(document.querySelector('#quoteAuthor'))
  
  // on refait les border radius suite à apparition du bloc Emojis
  newBody.querySelector('#quoteBloc').style.borderRadius = "100px 0 0 100px"
  // on teste la largeur de l'écran pour savoir si on est en mode mobile, si oui, alors on met le borderRadius à 100px 100px 0 0
  if(screen.width <= 800){
    newBody.querySelector('#quoteBloc').style.borderRadius = "100px 100px 0 0"
  }
  
  quoteLine.style.fontSize = quoteLineFontSize
  quoteAuthor.style.fontSize = quoteAuthorFontSize
  authorCommentSpan.style.fontSize = authorCommentSpanFontSize
  emojis.style.fontSize = emojisFontSize
  quoteAuthorDiv.style.padding = quoteAuthorDivPadding
  quoteBloc.style.padding = quoteBlocPadding
}