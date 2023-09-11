import "./main.scss"
import { getQuote } from "./quoteFunctions.js" 
import { recherchePersonnage } from "./wikiquoteAPI.js" 
import { getAllEmojisFromGroup, emojiGroupSelectChange } from "./emojiFunctions.js"
import { sendEmailEmailJS } from "./sendEmailFunctions.js"

// une variable qui enregistre le nom de l'utilisateur
let user = ""

document.addEventListener('DOMContentLoaded', getQuote)

quoteBtn.addEventListener('click', getQuote)
quoteSearch.addEventListener('click', function (){
  //const search = prompt("Rechercher un personnage (commencez par le prénom) ou un film : ")
  resultResearch.style.display = "flex"  
})
researchBtn.addEventListener('click', function (e){
  e.preventDefault()
  recherchePersonnage(inputResearch.value)
})
function setPseudo(){
  // on demande le pseudo de l'utilisateur
  //const pseudo = prompt("Veuillez entrez votre nom.")
  entrerNom.style.display = "flex"  
}
entrerNomBtn.addEventListener('click', function (e){
  e.preventDefault()
  user = nomInput.value
  entrerNom.style.display = "none"
  // on l'affiche dans la zone de commentaires emojis
  authorCommentSpan.innerHTML = user + " dit : "
  
  // seulement si pemiere fois :
  const commentBtnStyle = window.getComputedStyle(commentBtn)
  if(commentBtnStyle.display === "inline-block"){
    commentBtn.style.display = "none"
    commandLine.style.display = "flex"
    emojiBloc.style.display = "flex"
    // on refait les border radius suite à apparition du bloc Emojis
    quoteBloc.style.borderRadius = "100px 0 0 100px"
    // on teste la largeur de l'écran pour savoir si on est en mode mobile, si oui, alors on met le borderRadius à 100px 100px 0 0
    if(screen.width <= 800){
      quoteBloc.style.borderRadius = "100px 100px 0 0"
    }
  }
}) 
// on ajoute un listener au bouton de commentaires pour demander le pseudo
commentBtn.addEventListener('click', function(){
  setPseudo()
  
})

// recherche des emojis (group smileys)
getAllEmojisFromGroup()

emojiGroupSelect.addEventListener('change', emojiGroupSelectChange)

changePseudoBtn.addEventListener('click', function (){
  setPseudo()
})

closeModalSendEmail.onclick = function () {
  sendEmail.style.display = "none"
  statusSendEmail.innerHTML = ""
}
closeEntrerNomModal.onclick = function () {
  entrerNom.style.display = "none"
}
closeModalResultResearch.onclick = function () {
  resultResearch.style.display = "none"
  //statusResults.innerHTML = ""
}

/**
 * EventListener sur le bouton d'envoi
 */
sendBtn.addEventListener('click', function (){

  if(user !== "") {
  
    //const receiver = prompt("Veuillez entrer l'adresse e-mail à qui envoyer: ")
    
    // on ouvre la modal
    sendEmail.style.display = "flex"
  }
})

/**
 * EventListener sur le bouton d'envoi d'e-mail
 */
sendEmailBtn.addEventListener('click', function (e){

  e.preventDefault()

  statusSendEmail.innerHTML = "Envoi de l'e-mail ..."

  //sendEmailSmtpJs(user)
  //mailTo()
  sendEmailEmailJS(user)
})

document.body.style.display = "block"
