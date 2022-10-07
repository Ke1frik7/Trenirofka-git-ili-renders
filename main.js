let parent = renderElement(".carding")
function renderCard(object){
    parent.innerHTML = null
    for(let i = 0; i<object.length; i++){
        let card = createTag("div")
        card.className = 'card w-25 d-flex text-center '
        parent.appendChild(card)
        let img = createTag("img")
        img.src= object[i].bigposter
        card.appendChild(img)
        let text = createTag("div")
        text.className = 'card-text'
        card.appendChild(text)
        let h2 = createTag("h2")
        h2.appendChild(textNode(object[i].title))
        text.appendChild(h2)
        let h5 = createTag("h5")
        h5.appendChild(textNode(object[i].year))
        text.appendChild(h5)
        let p = createTag("p")
        p.appendChild(textNode("this film it's supper and weryCood" + object[i].title ))
        text.appendChild(p)
        let anker = createTag("a")
        anker.href = object[i].trailer
        anker.className = 'btn btn-dark m-1'
        anker.appendChild(textNode(object[i].title + " " + "trailers"))
        text.appendChild(anker)
        let button = createTag("button")
        button.className = 'btn btn-danger m-2'
        button.appendChild(textNode("Dowload"))
        text.appendChild(button)
    }

}
let result = []
function cate(arr){
    for(let i = 0; i<arr.length; i++){
        let categories = arr[i].categories
        for(let j = 0; j<categories.length; j++){
            if(!result.includes(categories[j])){
                result = [...result, categories[j]]
            }
        }
    }
}
cate(movies)
console.log(result)
let selectOption  = elementId("select_1")
function optionsCreate(arr){
    arr.map((item) => {
        let option =  createTag("option")
        option.appendChild(textNode(item))
        option.value = item
        selectOption.appendChild(option)
    })
}
optionsCreate(result)
function filter(e){
    e.preventDefault()
    let optionArray = []
    let selectValue = selectOption.value

    optionArray = movies.filter((item) => item.categories.includes(selectValue))

    renderCard(optionArray)
}
elementId("form").addEventListener("submit", filter)
renderCard(movies)