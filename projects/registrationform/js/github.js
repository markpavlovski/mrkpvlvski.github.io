console.log("hello world")

let username = 'mrkpvlvski'
let userObject = {}
let githubAvatar = document.getElementById("githubAvatar")
let githubUsername = document.getElementById("githubUsername").value
let guthubImageDiv = document.getElementById("githubImage")
let githubTextField = document.getElementById("githubTextField")
let formElement = document.getElementById("registrationForm")
let buttonElement = document.getElementById("buttonElement")
let greeting = document.getElementById("greeting")





function getUserData(username){
  $.getJSON(`https://api.github.com/users/${username}`, githubUser)
  .fail(()=> resetUser())
}

function resetUser(){
  githubAvatar.src = "http://placehold.it/60x60/"
  userObject = {}
  githubTextField.setAttribute("class", "input-field col s12")
  guthubImageDiv.setAttribute("class", "input-field col s3 hidden")
  formElement.setAttribute("action","")
  buttonElement.setAttribute("class", "btn waves-effect waves-light disabled")
  greeting.innerHTML = "G82"


}

function githubUser(data) {

  userObject.login = data.login
  userObject.name = data.name
  userObject.avatar_url = data.avatar_url

  githubAvatar["src"] = data.avatar_url
  console.log(userObject.name)
  githubTextField.setAttribute("class", "input-field col s9")
  guthubImageDiv.setAttribute("class", "input-field col s3")
  formElement.setAttribute("action",`https://github.com/${userObject.login}`)
  buttonElement.setAttribute("class", "btn waves-effect waves-light")
  greeting.innerHTML = `Hi ${userObject.name.split(" ")[0]},`

}

$( "#githubUsername" ).blur( () => getUserData(document.getElementById("githubUsername").value)
);
