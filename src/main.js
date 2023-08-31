import "./main.scss"
import html2canvas from 'html2canvas'
import { getQuote } from "./quoteFunctions.js" 
import { recherchePersonnage } from "./wikiquoteAPI.js" 
import { getEmojiContentByGroup, getNextEmojiGroup, getPrecEmojiGroup, emojiGroupSelectChange } from "./emojiFunctions.js"
import { rechercheImageWikipedia } from "./wikipediaAPI.js"

// une variable qui enregistre le nom de l'utilisateur
let user = ""

document.addEventListener('DOMContentLoaded', getQuote)

quoteBtn.addEventListener('click', getQuote)
quoteSearch.addEventListener('click', function (){
  //const search = prompt("Rechercher un personnage (commencez par le prénom) ou un film : ")
  resultResearch.style.display = "flex"  
})
researchBtn.addEventListener('click', function (){
  console.log(inputResearch)
  recherchePersonnage(inputResearch.value)
})
function setPseudo(){
  // on demande le pseudo de l'utilisateur
  const pseudo = prompt("Veuillez entrez votre nom.")
  // on l'affiche dans la zone de commentaires emojis
  authorCommentSpan.innerHTML = pseudo + " says : "
  user = pseudo
}

// on ajoute un listener au bouton de commentaires pour demander le pseudo
commentBtn.addEventListener('click', function(){
  setPseudo()
  commentBtn.style.display = "none"
  commandLine.style.display = "flex"
  emojiBloc.style.display = "flex"
})

getEmojiContentByGroup()
emojiGroupSelect.addEventListener('change', emojiGroupSelectChange)
precEmojiGroupBtn.addEventListener('click', getPrecEmojiGroup)
nextEmojiGroupBtn.addEventListener('click', getNextEmojiGroup)

changePseudoBtn.addEventListener('click', function (){
  setPseudo()
})

closeModalSendEmail.onclick = function () {
  sendEmail.style.display = "none"
}

closeModalResultResearch.onclick = function () {
  resultResearch.style.display = "none"
  statusResults.innerHTML = ""
}

/**
 * EventListener sur le bouton d'envoi d'e-mail
 */
sendBtn.addEventListener('click', function (){

  if(authorCommentSpan.innerHTML !== " says : ") {
  
    const receiver = prompt("Veuillez entrer l'adresse e-mail à qui envoyer: ")
    
    // on ouvre la modal
    sendEmail.style.display = "flex"

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
      statusSendEmail.innerHTML = `Sending e-mail ...`
    })
    //console.log(nouvelleImg)

    /*
    fetch("https://api.elasticemail.com/v4/emails/transactional", 
      { headers: {
                    'X-ElasticEmail-ApiKey':'282193FD1292CFF4CB31C4CC63D0A75CBB06594CFB60A887B27A6FD24F16601908B9F0992ABCA56CBBE49E59F783EF2E', 
                    },
            method: 'POST',        
            data: {          
              "Recipients":[  
                {  
                    "To":"sylvainfoucault1@gmail.com"
                }
              ],
              "Content":{  
                "From":"sylvainfoucault1@gmail.com",
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
    .catch((error) => {
      console.log(error)
      document.querySelector("#quoteLoader").style.display = "none";
      document.querySelector("#quoteContent").style.visibility = "visible";
      document.querySelector("#quoteContent").innerHTML = error
    })*/
  }
  else {
    setPseudo()
  }
})

//rechercheImageWikipedia()