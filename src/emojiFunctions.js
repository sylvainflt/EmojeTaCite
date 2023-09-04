// une variable qui stocke l'offset des emojiGroups pour pagination
let emojiGroupsOffset = 0

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
    return tdEmojiForTable
  }
  
/**
 * fonction qui va chercher les emojis d'un groupe et les insère dans un tableau de 5*6
 */
export function getEmojiContentByGroup(offset = 0) {

    //console.log(offset)

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
        //const tr6 = document.createElement("tr")

        tableData.forEach((element, key) => {
            if(key < 6)          
            tr.appendChild(createEmojiTD(element, key))                               
            else if(key < 12)        
            tr2.appendChild(createEmojiTD(element, key))        
            else if(key < 18)
            tr3.appendChild(createEmojiTD(element, key))
            else if(key < 24)
            tr4.appendChild(createEmojiTD(element, key))   
            else 
            tr5.appendChild(createEmojiTD(element, key))
            
        })

        tbody.appendChild(tr)
        tbody.appendChild(tr2)
        tbody.appendChild(tr3)
        tbody.appendChild(tr4)
        tbody.appendChild(tr5)
        //tbody.appendChild(tr6)
        emojiList.appendChild(tbody)

        }
        else quote.innerHTML = ""
    });

}

export function getNextEmojiGroup() {
    emojiGroupsOffset += 30
    getEmojiContentByGroup(emojiGroupsOffset)
    precEmojiGroupBtn.style.display = "inline"

}
export function getPrecEmojiGroup() {
    emojiGroupsOffset -= 30
    getEmojiContentByGroup(emojiGroupsOffset)

    if(emojiGroupsOffset === 0) precEmojiGroupBtn.style.display = "none"
}
export function emojiGroupSelectChange() {
    emojiGroupsOffset = 0
    precEmojiGroupBtn.style.display = "none"
    getEmojiContentByGroup()
}