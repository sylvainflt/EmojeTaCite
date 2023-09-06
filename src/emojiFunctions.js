// une variable qui stocke l'offset des emojiGroups pour pagination
let emojiGroupsOffset = 0
// témoin spécifiant qu'il reste des emojis à aller chercher
let moreEmojisToAdd = true

/**
 * fonction qui retourne un element TD pour l'emoji à afficher dans la table à gauche, et qui créé l'émoji 
 * sous la citation
 * @param {*} element 
 * @param {*} key 
 * @returns un element TD
 */
function createEmojiTD(element, key){

    const tdEmojiForTable = document.createElement("td")
    const divEmojiForTable = document.createElement("div")

    divEmojiForTable.className = "clickable"
    divEmojiForTable.id = `emoji${key}`
  
    //console.table(element)    

    const character = document.createTextNode(element.character);
    divEmojiForTable.appendChild(character);
  
    divEmojiForTable.addEventListener('click', function(){
  
      //console.log(`${element.character}`)
      
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
    tdEmojiForTable.appendChild(divEmojiForTable)
    return tdEmojiForTable
  }
  
/**
 * Fonction qui va chercher les emojis d'un groupe en fonction de l'offset
 * Cette fonction met à jour le témoin moreEmojisToAdd lorsqu'il n'y a plus d'éléments
 * @param {*} offset 
 * @returns un tableau de maximum 30 emojis
 */
export async function getEmojiContentByGroup(offset = 0) {

    //console.log("getEmojiContentByGroup ",emojiGroupsOffset)

    let emojiGroupSelect= document.querySelector("#emojiGroupSelect").value
    if(emojiGroupSelect!== "") {
        emojiGroupSelect= "?group="+emojiGroupSelect+"&offset="+emojiGroupsOffset.toString()
    }

    const response = await fetch("https://api.api-ninjas.com/v1/emoji"+emojiGroupSelect, { headers: {"X-Api-Key":"2Dst7djyWZH/iSyUenkgOw==rRyQbQZw2NyxaWI3"}})
    
    if(!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message)
    }
    
    const data = await response.json()
    //console.log(data)
    //console.log(data.length)
    if(data && data.length > 0) { 

        return data

    } else if(data.length === 0){
        //console.log("moreEmojisToAdd = false")
        moreEmojisToAdd = false
    }
    return data    

}

/**
 * Cette fonction va rechercher tous les emojis d'un groupe (par paquet de 30, cf offset) 
 * et va les insérer dans la table du emojiBloc.
 */
export async function getAllEmojisFromGroup(){
    
    //console.log("getAllEmojisFromGroup()")
    //console.log(moreEmojisToAdd)

    let dataEmojis = []

    const tbody = document.createElement("tbody")
    let tr = document.createElement("tr")

    // sur une ligne de 8 places, position est l'indice courant
    let position = 0

    // paquet suivant (max 30 elements)
    while (moreEmojisToAdd) {
        
        //console.log("while")

        const moreData = await getEmojiContentByGroup()
        //console.log("moreData "+moreData)
        dataEmojis = [moreData]
        emojiGroupsOffset += 30       

        // on parcourt le paquet
        dataEmojis.forEach((element, key1) => { 

            //console.log("element "+element)

            // pour chaque élément (emojiAvecInfos)
            element.forEach((element2, key2) => {   

                // si la ligne de 8 est complète 
                // on passe à la ligne et on remet l'indice à 0
                if(position === 8){                                                                            
                    position = 0
                    tbody.appendChild(tr)
                    tr = document.createElement("tr")
                }
                // dans tous les cas, on ajoute l'élément
                // et on met à jour l'indice
                tr.appendChild(createEmojiTD(element2, key1+key2)) 
                position++
            })            
        })
        // à la fin du paquet, on ajoute dans la page
        tbody.appendChild(tr)        
        emojiList.appendChild(tbody)

    }
    
}

/**
 * Cette fonction est appelée lors d'un changement de group d'emojis dans l'emojiBloc.
 * Elle remet l'offset à 0, efface les emojis dans la table, remet le voyant plus d'emojis à afficher
 * à vrai puis lance la fonction qui va récupérer les émojis du groupe et les mettre dans la table
 */
export function emojiGroupSelectChange() {
    emojiGroupsOffset = 0
    //getEmojiContentByGroup()
    emojiList.innerHTML = ""
    moreEmojisToAdd = true
    getAllEmojisFromGroup()
}