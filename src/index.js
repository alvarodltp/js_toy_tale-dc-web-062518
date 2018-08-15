document.addEventListener("DOMContentLoaded", init);
const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
let addToy = false;
let toyCollection = document.getElementById("toy-collection");
let createButton = document.querySelector(".submit");

function init() {
  getAllToys();
  createButton.addEventListener("click", createNewClick);

  // renderAllToys(name, image, likes); dont need this because getAllToys already has this method
}

// YOUR CODE HERE

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
    // submit listener here
  } else {
    toyForm.style.display = "none";
  }
});

// OR HERE!
function getAllToys() {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(json => {
      allToys = json;
      for (toy of allToys) {
        renderToy(toy);
      }
    });
}

function renderToy(toy) {
  let toyDiv = document.createElement("div");
  toyDiv.id = `toy-${toy.id}`;
  toyDiv.className = "card";
  let h2Name = document.createElement("h2");
  h2Name.innerText = toy.name;
  let imageElement = document.createElement("img");
  imageElement.className = "toy-avatar";
  imageElement.src = toy.image;
  let likesElement = document.createElement("p");
  likesElement.innerText = toy.likes;
  let likesButton = document.createElement("button");
  likesButton.innerText = "Like🤘";
  likesButton.className = "like-btn";
  likesButton.addEventListener("click", likes);
  toyDiv.appendChild(h2Name);
  toyDiv.appendChild(imageElement);
  toyDiv.appendChild(likesElement);
  toyDiv.appendChild(likesButton);
  toyCollection.appendChild(toyDiv);
}

function createNewClick(event) {
  event.preventDefault();
  let name = document.getElementById("toy-name").value;
  let image = document.getElementById("url-input").value;
  createNewToy(name, image);
}

function createNewToy(name, image) {
  // console.log(name, image);
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: image,
      likes: 0
    })
  })
    .then(response => response.json())
    .then(jsonData => {
      let newToy = jsonData;
      renderToy(newToy);
    });
}

function likes(event) {
  let divElement = event.currentTarget.parentNode;
  let name = divElement.querySelector("h2").innerText;
  let image = divElement.querySelector("img").src;
  let likes = divElement.querySelector("p").innerText;
  let id = divElement.id.split("-")[1];
  updateToy(id, likes);
}

function updateToy(toyId, likesNumber) {
  //doesnt have to have the same name
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      likes: ++likesNumber
    })
  })
    .then(response => response.json())
    .then(jsonData => {
      let data = jsonData;
      let update = document.getElementById(`toy-${toyId}`);
      update.querySelector("p").innerText = `${likesNumber}`;
    });
}
