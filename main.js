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
        h2.id = "h2ss"
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
        button.className = 'btn btn-warning m-2 js-bookmarks'
        button.appendChild(textNode("Bookmark"))
        button.dataset.id = object[i].id
        // button.addEventListener("click") // titles function
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
let input  = elementId("input_1")
let selectSort = elementId("select_sort")
let object =  {
    az: function(a,b) {
        if(a.title.toLowerCase() < b.title.toLowerCase()){
            return -1
        }else{
            return 1
        }
    },
     za: function(a,b) {
        if(a.title.toLowerCase() < b.title.toLowerCase()){
            return 1
        }else{
            return -1
        }
    },
    rating: function(a,b) {
        if(a.rating < b.rating){
            return 1
        }else {
            return -1
        }
    },
    year: function(a, b){
        if(a.year < b.year){
            return 1
        }else {
            return -1
        }
    }
}
function filter(e){
    e.preventDefault()
    let optionArray = []
    let selectValue = selectOption.value
    let inputValue = input.value
    let sortValue = selectSort.value
    if(selectValue == "all"){
        optionArray = movies
    }else if(selectValue !== "all"){
        optionArray = movies.filter((item) => item.categories.includes(selectValue))
    }
    let rejex = new RegExp(inputValue, "gi")
    if(inputValue == "all"){
        optionArray = movies
    }else if(inputValue !== "all"){
        optionArray = optionArray.filter((item) => item.title.match(rejex))
    }
    

    optionArray.sort(object[sortValue])
    // if(sortValue == "az"){
    //     optionArray.sort((a,b) => {
    //         if(a.title.toLowerCase() < b.title.toLowerCase()){
    //             return -1
    //         }else{
    //             return 1
    //         }
    //     })
    // }
    renderCard(optionArray)
}
elementId("form").addEventListener("submit", filter)
renderCard(movies)
let right = renderElement(".right")
let left = renderElement(".left")
let limit = 3
let page = 1
left.disabled = true
let max = movies.length / limit
function rightFunction(){
    page ++
    if(page <= max){
        renderCard(movies.slice(limit *(page-1), limit*page))
    }else{
        left.disabled = false
        right.disabled = true
    }
    // renderCard(movies.slice(limit*(page-1)))
}
right.addEventListener("click", rightFunction)

function leftFunction(){
    page--
    if(page > 0){
        renderCard(movies.slice(limit *(page-1), limit*page))
    }else if(page == 0){
        left.disabled = true
        right.disabled = false
    }
    
}
left.addEventListener("click", leftFunction)
renderCard(movies)
// let objectStorage = {
//     name: null,
//     year: null,
// }
// let collapse = elementId("flush-collapseOne")
// function titles(e){
//     console.log("ishladi")
//     let texts = e.target.textContent
//     let rejexx = new RegExp(texts, "gi")
//     let filters = movies.filter((item) => item.title.match(rejexx))
//     for(key of filters){
//        objectStorage.name = key.title
//        objectStorage.year = key.year
//     }
//     window.localStorage.setItem("storageRender", JSON.stringify(objectStorage))
//     let acardionBody = createTag("div")
//     acardionBody.className = 'accordion-body'
//     acardionBody.append(`Got it's dowload ${JSON.parse(localStorage.getItem("storageRender")).name}`)
//     collapse.appendChild(acardionBody)
// }

// let acardionBody = createTag("div")
// acardionBody.className = 'accordion-body'
// acardionBody.append(`Got it's dowload ${JSON.parse(localStorage.getItem("storageRender")).name}`)
// collapse.appendChild(acardionBody)

let caruselAlign = renderElement(".carusel_align")
let caruselImages = renderElement(".carusel_images")
let rightBtn = renderElement("#right_carusel")
let leftBtn = renderElement("#left_carusel")
let qolib;
function carusels(arr){
    for(let i = 0; i<arr.length; i++){
        let image = createTag("img")
        image.src = arr[i].bigposter
        image.style.width = "500px"
        image.class = "shox"
        image.style.height = "500px"
        image.style.objectFit = 'cover'
        caruselImages.appendChild(image)
    
    }
    qolib = renderElementAll(".carusel_images img")
    return qolib
}
let results =carusels(movies)
console.time("changes Carusel time")
let index = 1
function changes(){
   caruselAlign.style.transition = "all 0.5s ease"
   if(index >result.length){
    index = 0
   }else if(index < 0){
    index = result.length-1
   }
    caruselAlign.style.transform = `translateX(${index*-500}px)`    
}
rightBtn.addEventListener("click", () => {
    index ++
    changes()    
})
leftBtn.addEventListener("click", () => {
    index--
    changes()
})
setInterval(() => {
    index++
    changes()
}, 1000)
console.timeEnd("changes Carusel time")

// let listes = renderElement(".listes")
// function books(e){
//     if(e.target.matches(".js-bookmarks")){
//         let id = e.target.dataset.id
//         for(let i = 0; i<movies.length; i++){
//             if(movies[i].id == id){
//             let li = createTag("li")
//             li.className = "d-flex justify-content-between border p-3 m-0 align-items-center"
//             let h4 = createTag("h4")
//             h4.appendChild(textNode(movies[i].title))
//             li.appendChild(h4)
//             listes.appendChild(li)    
//             let buttonRemove = createTag("button")
//             buttonRemove.className = 'btn btn-danger'
//             buttonRemove.appendChild(textNode("Remove"))
//             li.appendChild(buttonRemove)
//             buttonRemove.addEventListener("click", () => {
//             let parent = buttonRemove.parentNode
//             parent.remove()
//             })
//         }
//         }
//     }
// }
// parent.addEventListener("click", books)

let objectBooks = {
    name: null
}
let listes = renderElement(".listes")
function handleBooks(e)
{
    if(e.target.matches(".js-bookmarks") ){
        let ids = e.target.dataset.id
        for(let i = 0; i<movies.length; i++){
           if(ids == movies[i].id){
                objectBooks.name = movies[i].title
                window.localStorage.setItem("localBooks", JSON.stringify(objectBooks))
           }
        }
        let li = createTag("li")
        li.className = "d-flex justify-content-between border p-3 m-0 align-items-center"
        listes.appendChild(li)
        let h4 = createTag("h4")
        h4.appendChild(textNode(JSON.parse(window.localStorage.getItem("localBooks")).name))
        li.appendChild(h4)
        let buttonRemove = createTag("button")
        buttonRemove.className = 'btn btn-danger'
        buttonRemove.appendChild(textNode(`Remove ${JSON.parse(window.localStorage.getItem("localBooks")).name}`))
        buttonRemove.addEventListener("click", () => {
            let parentsLi = buttonRemove.parentNode
            parentsLi.remove()
        })
        li.appendChild(buttonRemove)
    }
}
parent.addEventListener("click", handleBooks)

let objecting = [
    {
        name: "Messi", 
        age: 34
    },
    {
        name: "Ronaldo", 
        age: 38
    },
    {
        name: "Bruno Fernandesh", 
        age: 38
    }
]
objecting.sort((a,b) => {
    if(a.name.toLowerCase() < b.name.toLowerCase()){
        return -1
    }else{
        return 1
    }
})
console.log(objecting)