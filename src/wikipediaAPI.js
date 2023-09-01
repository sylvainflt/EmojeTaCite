import { parse } from 'node-html-parser';

const language = "fr"

let pieceId = 0

const titles = [
    "Coluche",
    "Le_père_Noël_est_une_ordure"
]

let title = titles[0]

export async function rechercheImageWikipedia(name = title){

    //console.log("rechercheImageWikipedia")
    //console.log(name)

    // premier appel : on recupère l'Id pour l'auteur ou le film (titles)
    const paramsPiece = `?action=query&format=json&titles=${name}`
    const response = await fetch(`https://${language}.wikipedia.org/w/api.php${paramsPiece}`)
    
    if(!response.ok){
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    } 

    const data = await response.json()
    //const parsedData = JSON.parse(data)
    //console.log(parsedData)     

    const pages = data.query.pages
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
    const paramsPage = `?format=json&action=parse&pageid=${pieceId}`
    const responsePage = await fetch(`https://${language}.wikipedia.org/w/api.php${paramsPage}`)
    
    if(!responsePage.ok){
        const message = `An error has occured: ${responsePage.status}`;
        throw new Error(message);
    } 

    const dataPage = await responsePage.json()
    //const parsedData = JSON.parse(data)
    console.log(dataPage)     

    // on fait un algo qui parse et recupere les citations, les met dans un tableau puis un choisi une au pif
    const text = dataPage.parse.text['*']

    //console.log(text)
    const htmlParsed = parse(text)  
    let infobox = htmlParsed.querySelector('.infobox_v3 .legend img')
    if(infobox === null) infobox = htmlParsed.querySelector('.infobox_v3 .images img')
    if(infobox === null) infobox = htmlParsed.querySelector('.infobox_v2 img')
    //console.log("infobox : "+infobox)            
    //document.querySelector('#imageAuthor').innerHTML = infobox
    return infobox   
    

}