var add = document.querySelector("#add-btn")
var input = document.querySelector("#input-btn")
var photoGallery = document.querySelector('.photo-gallery');
var imagesArr = JSON.parse(localStorage.getItem("photos")) || [];
var reader = new FileReader();
var title = document.querySelector("#title");
var caption = document.querySelector("#caption");
var favorite = document.querySelector("#favorite");
// var deleteBtn = document.getElementById("delete");

window.addEventListener('load', appendPhotos);
add.addEventListener('click', addToAlbum);
// deleteBtn.addEventListener("click", deleteCard);

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
      <h2 class="title-output" contenteditable="true">${populateTitle}</h2>
      <img src=${populatePhoto} / class="card-image"> 
      <p class="caption-output" contenteditable="true">${populateCaption}</p>
      <div class="space-between card-icons"
        <input type="image" src="assets/favorite.svg" alt="favorite" class="spaced-btns">
        <input type="image" src="assets/delete.svg" alt="delete" class="spaced-btns">
      </div>
    </article`;
}

// function deleteCard() {
//   console.log("hi");
//   var uniqueId = event.target.closest(data.id);
//   console.log(uniqueId);
// }
