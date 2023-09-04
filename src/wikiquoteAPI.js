import { parse } from 'node-html-parser';
import { rechercheImageWikipedia } from "./wikipediaAPI.js"

const language = "fr"

const titles = [
    "Coluche",
    "Le_père_Noël_est_une_ordure"
]
const humoristes = [
    "Coluche",
    "Dieudonné",
    "Pierre Desproges",
    "Chevaliers du fiel",
    "Anthony Kavanagh",
    "Jean-Marie Bigard",
    "Laurent Gerra",
    "Patrick Sébastien"
]
const films = [
    "Kaamelott",
    "Le père Noël est une ordure",
    "Brice de Nice",
    "L'Autre c'est moi",
    "C'est arrivé près de chez vous",
    "South Park",
    "La Soupe aux choux",
    "La Grande Vadrouille",
    "La Folie des grandeurs",
    "Les Simpson",
    "Les Aventures de Tintin",
    "Le Roi lion",
    "Les Bronzés font du ski",
    "Les Visiteurs"
]
let pieceId = 0
let title = ""

export function recherchePersonnage(personnage){
    
    statusResults.innerHTML = ""

    // appel API : exemple on cherche le nom d'un comedien
    const params = `?format=json&action=opensearch&search=${personnage}`
    fetch(`https://${language}.wikiquote.org/w/api.php${params}`)
    .then(response => {
        if(response.status === 200) return response.text()
    })
    .then(data => { 
        
        const parsedData = JSON.parse(data)
        //console.log(parsedData)     
       
        //const name = parsedData[3][0].slice(30)
        //console.log(name)
        
        //statusResults.innerHTML = parsedData[1][0]
        parsedData[1].forEach((element, index) => {
            const id = index + element.replace(/\s/g, '')
            //console.log(id)
            const newElementResult = document.createElement("div")
            newElementResult.id = id
            newElementResult.className = "elementResult"
            newElementResult.innerHTML = element
            statusResults.appendChild(newElementResult)
            // mettre un id sur la div, suivi d'un eventlistener
            newElementResult.addEventListener('click', function(){
                appelsWikiQuote(element)
                resultResearch.style.display = "none"                
            })
        })

    })
    .catch((error) => {
        console.log(error)
    
    })
}

export function appelsWikiQuote(name = films[Math.floor(Math.random()*films.length)]){

    //console.log("appelsWikiQuote()")
    //title = films[Math.floor(Math.random()*films.length)]
    title = name
    //console.log(title)

    // premier appel : on recupère l'Id pour l'auteur ou le film (titles)
    const paramsPiece = `?action=query&format=json&titles=${title}`
    fetch(`https://${language}.wikiquote.org/w/api.php${paramsPiece}`)
    .then(response => {
        if(response.status === 200) return response.text()
    })
    .then(data => { 
        
        const parsedData = JSON.parse(data)
        //console.log(parsedData)     

        const pages = parsedData.query.pages
        let pageId = -1;
        for(let p in pages) {
            let page = pages[p];
            // api can return invalid recrods, these are marked as "missing"
            if(!("missing" in page)) {
                pageId = page.pageid;
                break;
            }
        }
        //console.log(pageId)
        pieceId = pageId

        // 2e appel : on recupère la page
        const paramsPage = `?format=json&action=parse&pageid=${pieceId}&section=1`
        fetch(`https://${language}.wikiquote.org/w/api.php${paramsPage}`)
        .then(response => {
            if(response.status === 200) return response.text()
        })
        .then(data => { 
            
            document.querySelector("#emojis").innerHTML = ""

            const parsedData = JSON.parse(data)
            //console.log("parsedData "+parsedData)     

            // on fait un algo qui parse et recupere les citations, les met dans un tableau puis un choisi une au pif
            const text = parsedData.parse.text['*']
            //console.log(text)
            const htmlParsed = parse(text)  
            const quotes = htmlParsed.querySelectorAll('.citation')
            //console.log("quotes "+quotes)
            const indRandQuote = Math.floor(Math.random()*quotes.length)
            //console.log(indRandQuote)
            const quote = quotes[indRandQuote] 
            //console.log(quote)
            //console.log(quote?.childNodes[0]?._rawText?.length)
            //if(quote?.childNodes[0]?._rawText?.length <= 180){
              if(quote)  
                document.querySelector("#quoteLine").innerHTML = quote
              else  document.querySelector("#quoteLine").innerHTML = "Un problème technique est survenu ou bien il n'y a pas de citation pour l'instant."
                //document.querySelector("#quoteAuthor").innerHTML = title
                quoteAuthor.href = `https://fr.wikipedia.org/wiki/${title}`
                quoteAuthor.innerHTML = title
                quoteAuthor.target = "_blank"

                // test ajout d'une image wikipedia en title
                rechercheImageWikipedia(title).then((image)=>{
                    const imageWikipedia = image
                    //console.log("imageWikipedia "+imageWikipedia)
                    document.querySelector('#imageAuthor').innerHTML = imageWikipedia
                })                                                            

                document.querySelector("#quoteLoader").style.display = "none";
                document.querySelector("#quoteContent").style.visibility = "visible";
            /*}else {
                appelsWikiQuote()
            }*/
            

        })
        .catch((error) => {
            console.log(error)
        
        })


    })
    .catch((error) => {
        console.log(error)
    
    })

    

}