var add = document.querySelector("#add-btn")
var input = document.querySelector("#input-btn")
var photoGallery = document.querySelector('.photo-gallery');
var imagesArr = JSON.parse(localStorage.getItem("photos")) || [];
var reader = new FileReader();
var title = document.querySelector("#title");
var caption = document.querySelector("#caption");
var favorite = document.querySelector("#favorite");

window.addEventListener('load', appendPhotos);
add.addEventListener('click', addToAlbum);
photoGallery.addEventListener("click", manipulateCard);

function appendPhotos() {
  imagesArr.forEach(function (photo) {
    populateCard(photo.id, photo.title, photo.file, photo.caption, photo.favorite);
  })
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
  populateCard(newPhoto.id, newPhoto.title, newPhoto.file, newPhoto.caption, newPhoto.favorite);
  imagesArr.push(newPhoto);
  newPhoto.saveToStorage(imagesArr);
  title.value = "";
  caption.value = "";
}

function populateCard(populateId, populateTitle, populatePhoto, populateCaption, populateFavorite) {
  photoGallery.innerHTML += 
    `<article class="card" data-id=${populateId}>
      <h2 class="title-output edit" contenteditable="true">${populateTitle}</h2>
      <img src=${populatePhoto} / class="card-image"> 
      <p class="caption-output edit" contenteditable="true">${populateCaption}</p>
      <div class="card-icons">
        <input type="image" src="assets/delete.svg" alt="delete" class="card-icon delete">
        <input type="image" src="assets/favorite.svg" alt="favorite" class="card-icon favorite">
      </div>
    </article`;
}

function manipulateCard(event) {
  if (event.target.classList.contains("edit")) {
    editCard(event);
  }
  if (event.target.classList.contains("delete")) {
    // console.log(event.target.classList)
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
  // console.log("deleteCard fired");
  var selectedCard = event.target.closest('article');
  // console.log(selectedCard);
  var selectedID = parseInt(selectedCard.dataset.id);
  // console.log(selectedID);
  var index = imagesArr.findIndex(function(photo) {
    return photo.id === selectedID;
  });
  // console.log(index);
  // console.log(imagesArr[index]);
  imagesArr[index].deleteFromStorage();
  // imagesArr.splice(index, 1);
  // selectedCard.remove();
}

function favoriteCard(event) {
  console.log("favoriteCard fired");
  //updatePhoto will give this.favorite a value of "true"
  }
