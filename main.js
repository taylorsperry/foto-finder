// Global Variables

var add = document.querySelector("#add-btn")
var input = document.querySelector("#input-btn")
var photoGallery = document.querySelector('.photo-gallery');
var imagesArr = JSON.parse(localStorage.getItem("photos")) || [];
var reader = new FileReader();
var title = document.querySelector("#title");
var caption = document.querySelector("#caption");
var favorite = document.querySelector("#favorite");
var searchInput = document.querySelector("#search-input");
var favoriteBtn = document.querySelector("#fav-btn");


// Event Listeners

window.addEventListener('load', appendPhotos(imagesArr));
add.addEventListener('click', addToAlbum);
photoGallery.addEventListener("click", manipulateCard);
photoGallery.addEventListener("keydown", enterCheck);
photoGallery.addEventListener("focusout", captureContent)
searchInput.addEventListener("input", search);
favoriteBtn.addEventListener("click", viewFavorites);

// Add Card Functions

function appendPhotos(array) {
  imagesArr = [];
  array.forEach(function (photo) {
    var newPhoto = new Photo(photo.id, photo.title, photo.caption, photo.file, photo.favorite);
    imagesArr.push(newPhoto);
    populateCard(newPhoto);
  });
}

function addToAlbum(event) {
  event.preventDefault();
  if (input.files[0]) {
    reader.readAsDataURL(input.files[0]);
    reader.onload = addPhoto;
  }
}

function addPhoto(event) {
  var newPhoto = new Photo(Date.now(), title.value, caption.value, event.target.result, favorite);
  populateCard(newPhoto);
  imagesArr.push(newPhoto);
  newPhoto.saveToStorage(imagesArr);
  title.value = "";
  caption.value = "";
}

function populateCard(card) {
  photoGallery.innerHTML += 
    `<article class="card" data-id=${card.id}>
      <h2 class="title-output" contenteditable="true">${card.title}</h2>
      <img src="${card.file}" class="card-image"> 
      <p class="caption-output" contenteditable="true">${card.caption}</p>
      <div class="card-icons">
        <img src="assets/delete.svg" alt="delete" class="delete">
        <img src=${card.favorite ? "assets/favorite-active.svg" : "assets/favorite.svg"} alt="favorite" class="favorite">
      </div>
    </article`;
}

// Manipulate Card Functions

function manipulateCard(event) {
  if (event.target.classList.contains("delete")) {
    deleteCard();
  }
  if (event.target.classList.contains("favorite")) {
    favoriteCard(event);
  }
}

function enterCheck(event) {
  if(event.keyCode === 13) {
    captureContent(event);
  }
}

function captureContent(event) {
  event.preventDefault();
  var selectedCard = event.target.closest("article");
  var selectedID = parseInt(selectedCard.dataset.id);
  var index = imagesArr.findIndex(function(photo) {
    return photo.id === selectedID;
  });
  var targetClass = event.target.className;
  var targetText = event.target.innerText;
  changeContent(index, targetClass, targetText);
}

function changeContent(index, targetClass, targetText) {
  if (targetClass === "title-output") {
    imagesArr[index].updatePhoto("title", targetText);
  }
  if(targetClass === "caption-output") {
    imagesArr[index].updatePhoto("caption", targetText)
  }
}

function deleteCard() {
  var selectedCard = event.target.closest("article");
  var selectedID = parseInt(selectedCard.dataset.id);
  var index = imagesArr.findIndex(function(photo) {
    return photo.id === selectedID;
  });
  imagesArr[index].deleteFromStorage(index);
  selectedCard.remove();
}

function favoriteCard(event) {
  var selectedCard = event.target.closest('article');
  var selectedID = parseInt(selectedCard.dataset.id);
  var foundCard = imagesArr.find(function(photo) {
    return photo.id === selectedID;
  })
  if(foundCard.favorite === true) {
    event.target.src = "assets/favorite.svg";
  } else { 
    event.target.src = "assets/favorite-active.svg";
  }
  foundCard.updatePhoto();
  foundCard.saveToStorage(imagesArr);
}

// View Favorites and Search Results Functions

function viewFavorites(event) {
  event.preventDefault();
  photoGallery.innerHTML = "";
  favArray = imagesArr.filter(function(photo) {
    return photo.favorite == true;
  })
  favArray.forEach(function (photo) {
    var newPhoto = new Photo(photo.id, photo.title, photo.caption, photo.file, photo.favorite);
    populateCard(newPhoto);
  });  
}

function search() {
  photoGallery.innerHTML = ""; 
  var searchText = searchInput.value;
  var searchArray = imagesArr.filter(function(photo) {
    return photo.title.includes(searchText) || photo.caption.includes(searchText);
  });
  searchArray.forEach(function (photo) {
    var newPhoto = new Photo(photo.id, photo.title, photo.caption, photo.file, photo.favorite);
    populateCard(newPhoto);
  });
}
