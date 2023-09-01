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
  
    // mise en place de la recherche de citation en fonction de la catégorie

    if(quoteCategory.value !== "")
      appelsWikiQuote(quoteCategory.value)
    else 
      appelsWikiQuote()
   
    
  }