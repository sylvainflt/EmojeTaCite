import { appelsWikiQuote } from "./wikiquoteAPI.js" 

/**
 * fonction qui choisi une couleur de fond au hasard, et qui va chercher une citation
 */
export function getQuote() {
    getQuoteBackground()
    getQuoteContent()
  }
  
  function generateColor(){
    const hexArray = [8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    let code = "";
    for(let i=0; i<6; i++){
     code += hexArray[Math.floor(Math.random()*8)];
    }
    return `#${code}`
   }

  function getQuoteBackground(){
    const color = generateColor()
    quoteBloc.style.backgroundColor = color
    quoteBloc.style.boxShadow = `0 0 20px ${color}, inset 0 0 10px #fff`
    emojiBloc.style.boxShadow = `0 0 20px #f3f3f3, inset 0 0 10px #fff`
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