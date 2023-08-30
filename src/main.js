import "./main.scss"
import html2canvas from 'html2canvas'
import { recherchePersonnage, appelsWikiQuote } from "./wikiquoteAPI.js" 

// une variable qui stocke l'offset des emojiGroups pour pagination
let emojiGroupsOffset = 0

/**
 * fonction qui choisi une couleur de fond au hasard, et qui va chercher une citation
 */
function getQuote() {
  getQuoteBackground()
  getQuoteContent()
}

function getQuoteBackground(){
  quoteBloc.style.backgroundColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
}

function getQuoteContent() {
  
  document.querySelector("#quoteContent").style.visibility = "hidden";
  document.querySelector("#quoteLoader").style.display = "inline";

  let category = document.querySelector("#quoteCategory").value
  if(category !== "") {
    category = "?category="+category
  }

  appelsWikiQuote()
  /*
  fetch("https://api.api-ninjas.com/v1/quotes"+category, { headers: {"X-Api-Key":"2Dst7djyWZH/iSyUenkgOw==rRyQbQZw2NyxaWI3"}})
  .then(response => {
    if(response.status === 200) return response.text()
  })
  .then(data => { 
    if(data) {  
      //console.log(JSON.parse(data))     

      quoteLine.innerHTML = `"${JSON.parse(data)[0].quote}"`
      quoteAuthor.href = `https://fr.wikipedia.org/wiki/${JSON.parse(data)[0].author}`
      quoteAuthor.innerHTML = JSON.parse(data)[0].author
      quoteAuthor.target = "_blank"

      document.querySelector("#emojis").innerHTML = ""
      //authorCommentSpan.innerHTML = ""
      
      document.querySelector("#quoteLoader").style.display = "none";
      document.querySelector("#quoteContent").style.visibility = "visible";
    }
    else quote.innerHTML = ""
  })
  .catch((error) => {
    console.log(error)
    document.querySelector("#quoteLoader").style.display = "none";
    document.querySelector("#quoteContent").style.visibility = "visible";
    document.querySelector("#quoteContent").innerHTML = "Erreur de chargement. Rééssayer plus tard."
  })*/
  
}

/**
 * fonction qui retourne un element TD pour l'emoji à afficher dans la table à gauche, et qui créé l'émoji 
 * sous la citation
 * @param {*} element 
 * @param {*} key 
 * @returns un element TD
 */
function createEmojiTD(element, key){
  const tdEmojiForTable = document.createElement("td")
  tdEmojiForTable.className = "clickable"
  tdEmojiForTable.id = `emoji${key}`

  const character = document.createTextNode(element.character);
  tdEmojiForTable.appendChild(character);

  tdEmojiForTable.addEventListener('click', function(){

    console.log(`${element.character}`)
    
    const tdEmojeed = document.createElement("td")
    tdEmojeed.className = "clickableBigger"
    tdEmojeed.id = `emojeed${key}`
    const newCharacter = document.createTextNode(element.character);
    tdEmojeed.appendChild(newCharacter)

    tdEmojeed.addEventListener('click', function(){
      document.querySelector("#emojis").removeChild(tdEmojeed)
    })

    document.querySelector("#emojis").appendChild(tdEmojeed)

  })
  return tdEmojiForTable
}

/**
 * fonction qui va chercher les emojis d'un groupe et les insère dans un tableau de 5*6
 */
function getEmojiContentByGroup(offset = 0) {

  console.log(offset)

  let emojiGroupSelect= document.querySelector("#emojiGroupSelect").value
  if(emojiGroupSelect!== "") {
    emojiGroupSelect= "?group="+emojiGroupSelect+"&offset="+offset.toString()
  }

  fetch("https://api.api-ninjas.com/v1/emoji"+emojiGroupSelect, { headers: {"X-Api-Key":"2Dst7djyWZH/iSyUenkgOw==rRyQbQZw2NyxaWI3"}})
  .then(response => {
    if(response.status === 200) return response.text()
  })
  .then(data => { 
    if(data) { 

      const tableData = JSON.parse(data) 
      //console.log(tableData)

      emojiList.innerHTML = ""
      const tbody = document.createElement("tbody")
      const tr = document.createElement("tr")      
      const tr2 = document.createElement("tr")
      const tr3 = document.createElement("tr")
      const tr4 = document.createElement("tr")
      const tr5 = document.createElement("tr")
      const tr6 = document.createElement("tr")

      tableData.forEach((element, key) => {
        if(key < 5)          
          tr.appendChild(createEmojiTD(element, key))                               
        else if(key < 10)        
          tr2.appendChild(createEmojiTD(element, key))        
        else if(key < 15)
          tr3.appendChild(createEmojiTD(element, key))
        else if(key < 20)
          tr4.appendChild(createEmojiTD(element, key))   
        else if(key < 25)
          tr5.appendChild(createEmojiTD(element, key))
        else 
          tr6.appendChild(createEmojiTD(element, key))
      })

      tbody.appendChild(tr)
      tbody.appendChild(tr2)
      tbody.appendChild(tr3)
      tbody.appendChild(tr4)
      tbody.appendChild(tr5)
      tbody.appendChild(tr6)
      emojiList.appendChild(tbody)

    }
    else quote.innerHTML = ""
  });
  
}

function getNextEmojiGroup() {
  emojiGroupsOffset += 30
  getEmojiContentByGroup(emojiGroupsOffset)
  precEmojiGroupBtn.style.display = "inline"
  
}
function getPrecEmojiGroup() {
  emojiGroupsOffset -= 30
  getEmojiContentByGroup(emojiGroupsOffset)

  if(emojiGroupsOffset === 0) precEmojiGroupBtn.style.display = "none"
}
function emojiGroupSelectChange() {
  emojiGroupsOffset = 0
  precEmojiGroupBtn.style.display = "none"
  getEmojiContentByGroup()
}

document.addEventListener('DOMContentLoaded', getQuote)

quoteBtn.addEventListener('click', getQuote)
quoteSearch.addEventListener('click', function (){
  const search = prompt("Rechercher un personnage (commencez par le prénom) ou un film : ")
  recherchePersonnage(search)
})

function setPseudo(){
  // on demande le pseudo de l'utilisateur
  const pseudo = prompt("Veuillez entrez votre pseudo.")
  // on l'affiche dans la zone de commentaires emojis
  authorCommentSpan.innerHTML = pseudo + " says : "
}

// on ajoute un listener au bouton de commentaires pour demander le pseudo
commentBtn.addEventListener('click', function(){
  setPseudo()
  commentBtn.style.display = "none"
  commandLine.style.display = "block"
})

getEmojiContentByGroup()
emojiGroupSelect.addEventListener('change', emojiGroupSelectChange)
precEmojiGroupBtn.addEventListener('click', getPrecEmojiGroup)
nextEmojiGroupBtn.addEventListener('click', getNextEmojiGroup)

changePseudoBtn.addEventListener('click', function (){
  setPseudo()
})

closeModalResultResearch.onclick = function () {
  resultResearch.style.display = "none"
  statusResults.innerHTML = "Resultats :"
}

/**
 * EventListener sur le bouton d'envoi d'e-mail
 */
sendBtn.addEventListener('click', function (){

  if(authorCommentSpan.innerHTML !== " says : ") {
  
    const receiver = prompt("Veuillez entrer l'adresse e-mail à qui envoyer: ")
    /**
     * fonction d'envoi d'e-mail, on prépare d'abord la partie à envoyer
     */
    let newBody = document.createElement('div')
    newBody.appendChild(document.querySelector('#quoteBloc'))
    console.log(newBody)
    newBody.children[0].removeChild(newBody.querySelector('#selectionCategory'))
    newBody.children[0].removeChild(newBody.querySelector('#commandLine'))
    let nouvelleImg = document.createElement("img");
    
    html2canvas(newBody).then(function (canvas) {
      //document.body.appendChild(canvas)
      nouvelleImg.src = canvas.toDataURL()
      //console.log("image "+nouvelleImg)

      //document.body.appendChild(nouvelleImg);

      Email.send({
        SecureToken : "957f0f1a-faea-407a-a73d-2d5dffada68e",
        To : receiver,
        From : "EmojeedQuotes<contact@sylvainfoucault.com>",
        Subject : "You got an EmojeedQuote",
        Body : "",
        Attachments : [
          {
            name : "emojeedQuote.png",
            data : nouvelleImg.src
          }
        ]
      }).then(
      message => alert(message)
      )
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
