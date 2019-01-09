var add = document.querySelector("#add-btn")
var input = document.querySelector("#input-btn")
var photoGallery = document.querySelector('.photo-gallery');
var imagesArr = JSON.parse(localStorage.getItem("photos")) || [];
var reader = new FileReader();
var title = document.querySelector("#title");
var caption = document.querySelector("#caption");
var favorite = document.querySelector("#favorite");

window.addEventListener('load', appendPhotos(imagesArr));
add.addEventListener('click', addToAlbum);
photoGallery.addEventListener("click", manipulateCard);

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
      <h2 class="title-output edit" contenteditable="true">${card.title}</h2>
      <img src="${card.file}" class="card-image"> 
      <p class="caption-output edit" contenteditable="true">${card.caption}</p>
      <div class="card-icons">
        <img src="assets/delete.svg" alt="delete" class="card-icon delete">
        <img src=${card.favorite ? "assets/favorite-active.svg" : "assets/favorite.svg"} alt="favorite" class="card-icon favorite">
      </div>
    </article`;
}

function manipulateCard(event) {
  if (event.target.classList.contains("edit")) {
    editCard(event);
  }
  if (event.target.classList.contains("delete")) {
    deleteCard();
  }
  if (event.target.classList.contains("favorite")) {
    favoriteCard(event);
  }
}

function editCard(event) {
  console.log("editCard fired")
}

function deleteCard() {
  var selectedCard = event.target.closest('article');
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
