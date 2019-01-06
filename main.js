var create = document.querySelector("#add-btn")
var input = document.querySelector("#input-btn")
var photoGallery = document.querySelector('.photo-gallery');
var imagesArr = JSON.parse(localStorage.getItem("photos")) || [];
var reader = new FileReader();
var title = document.querySelector("#title");
var caption = document.querySelector("#caption");
var favorite = document.querySelector("#favorite");


window.addEventListener('load', appendPhotos);
create.addEventListener('click', addToAlbum);

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
}

function populateCard(populateId, populateTitle, populatePhoto, populateCaption, populateFavorite) {
  photoGallery.innerHTML += 
    `<article class="card" data-id=${populateId}>
      <h2 class="title-output" contenteditable="true">${populateTitle}</h2>
      <img src=${populatePhoto} / class="card-image"> 
      <p class="caption-output" contenteditable="true">${populateCaption}</p>
      <div class="space-between card-icons"
        <p id="favorite">${populateFavorite}</p>
      </div>
    </article`;
}
