// DRAW ON CANVAS

let yoff = 0.0
let height = innerHeight
let width = innerWidth

function setup() {
  const cnv = createCanvas(window.innerWidth, window.innerHeight)
  cnv.parent(document.querySelector('header'))
  // console.log(window.innerHeight)
}

function draw() {
  // background(79,139,204,);
  background(51, 51, 51);
  stroke('rgba(50%,100%,70%,0.0)');
  strokeWeight(1)
  fill(255);
  // We are going to draw a polygon out of the wave points
  beginShape();

  var xoff = 0;

  // Iterate over horizontal pixels
  for (var x = 0; x <= width; x += 1) {
    var y = map(noise(xoff, yoff), 0.5, 1, window.innerHeight * .80, window.innerHeight * .90);
    vertex(x, y);
    xoff += 0.001;
  }
  // increment y dimension for noise
  yoff += 0.002;
  vertex(width, height+100);
  vertex(0, height+100);
  endShape(CLOSE);
}

// RESIZE CANVAS ON WINDOW RESIZE

window.addEventListener("resize", () => {
  const canvas = document.querySelector("header > canvas")
  canvas.style = `width: ${innerWidth}px; height: ${innerHeight}px;`
})

//

document.querySelector("#title").addEventListener("click", () => {
  document.querySelector('#title')
    .scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
})

// Change navbar color & add disappearing cards

document.addEventListener("scroll", () => {

  const main = document.querySelector("main")
  const topLeft = document.querySelector("#top-left")
  const icons = document.querySelectorAll("#top-right i")
  const cards = document.querySelectorAll(".card")
  const titleBox = document.querySelector("#tags").getBoundingClientRect()

  // toggle header color
  if (window.pageYOffset > main.offsetTop * .70) {
    topLeft.classList.add("dark-font")
    for (let i = 0; i < icons.length; i++) {
      icons[i].classList.add("dark-font")
    }
  } else {
    topLeft.classList.remove("dark-font")
    for (let i = 0; i < icons.length; i++) {
      icons[i].classList.remove("dark-font")
    }
  }

  // Toggle dissapearing cards
  for (let i = 0; i < cards.length; i++) {
    if (titleBox.y + titleBox.height > cards[i].getBoundingClientRect().y) {
      cards[i].classList.add("invisible")
    } else {
      cards[i].classList.remove("invisible")

    }
  }

})

// Handle Favorites
const favoritesJSON = localStorage.getItem("favorites")
const favorites = favoritesJSON ? JSON.parse(favoritesJSON) : {}
const stars = document.querySelectorAll(".card i.fa-star")
for (let i = 0; i < stars.length; i++) {
  if (favorites[stars[i].closest(".card").id]) {
    stars[i].classList.toggle("fas")
    stars[i].classList.toggle("i-fav")
  }
}
document.querySelector("container").addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-star")) {
    const id = event.target.closest(".card").id;
    favorites[id] = !favorites[id]
    event.target.classList.toggle("fas")
    event.target.classList.toggle("i-fav")
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }
})



////////////// Handle Tags


const tagDataJSON = localStorage.getItem("tagData")
const tagData = {"ALL":true}
const tags = document.querySelectorAll(".tag:not(.title-tag)")


// Make other tags appear inactive if ALL is selected
function activateTags(){
  const tagsNotAll = document.querySelectorAll(".tag:not(.title-tag):not(.all-tag)")
  for (let i=0; i<tagsNotAll.length; i++){
    tagsNotAll[i].classList.remove("inactive")
  }
}
function deactivateTags(){
  const tagsNotAll = document.querySelectorAll(".tag:not(.title-tag):not(.all-tag)")
  for (let i=0; i<tagsNotAll.length; i++){
    tagsNotAll[i].classList.add("inactive")
  }
}
function toggleTags(){
  const tagsNotAll = document.querySelectorAll(".tag:not(.title-tag):not(.all-tag)")
  for (let i=0; i<tagsNotAll.length; i++){
    tagsNotAll[i].classList.toggle("inactive")
  }
}
function deactivateALLTag(){
  document.querySelector(".tag.all-tag").classList.remove("selected")
}

function filterCards(){

  const cards = document.querySelectorAll(".card")

  for (let i =0; i< cards.length; i++){
    const activeTags = Object.keys(tagData).filter((key)=>tagData[key])
    const cardTags = ["ALL"]
    if (cards[i].querySelector(".fa-star").classList.contains("fas")) cardTags.push("STARRED")

    const cardTagsList = cards[i].querySelectorAll("ul.tags li")
    for (let j=0; j< cardTagsList.length; j++){
      cardTags.push(cardTagsList[j].innerText)
    }

    const result = cardTags.filter((item)=>activeTags.includes(item))

    if (! result.join('')){
      cards[i].classList.add("card-hide")
    } else {
      cards[i].classList.remove("card-hide")
    }
  }

  document.querySelector(".card:not(.card-hide)").scrollIntoView({
      behavior: "smooth",
      block: "center"
  })

}

// if (tagData["ALL"]) deactivateTags()

document.querySelector("#tags").addEventListener("click", (event) => {
  const tag = event.target.closest(".tag:not(.title-tag)")
  if (tag) {
    const tagName = tag.firstElementChild.innerText
    if (tagName !== "ALL") {
      activateTags()
      deactivateALLTag()
      tag.classList.toggle("selected")
      tagData["ALL"] = false
    }
    if (tagName === "ALL") {
      toggleTags()
      tag.classList.toggle("selected")
    }
    tagData[tagName] = !tagData[tagName]
    // tag.classList.toggle("selected")
    filterCards()
  }
})
