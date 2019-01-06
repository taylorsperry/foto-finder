var create = document.querySelector("#add-btn")
var input = document.querySelector("#input-btn")
var photoGallery = document.querySelector('.photo-gallery');
var imagesArr = JSON.parse(localStorage.getItem("photos")) || [];
var reader = new FileReader();
var title = document.querySelector("#title");
var caption = document.querySelector("#caption");


window.addEventListener('load', appendPhotos);
create.addEventListener('click', addToAlbum);

function appendPhotos() {
  console.log("input clicked")
  imagesArr.forEach(function (photo) {
    photoGallery.innerHTML += `img src=${photo.file} />`
  })
}

function addToAlbum(event) {
  event.preventDefault();
  // console.log(title.value, caption.value);
  if (input.files[0]) {
    reader.readAsDataURL(input.files[0]);
    reader.onload = addPhoto;
  }
}

function addPhoto(event) {
  var newPhoto = new Photo(Date.now(), event.target.result);
  photoGallery.innerHTML += 
    `<article class="card">
      <h2 class="title-output" contenteditable="true">${title.value}</h2>
      <img src=${event.target.result} /> 
      <p class="caption-output" contenteditable="true">${caption.value}</p>
      <div class="space-between card-icons"
        <img src="assets/delete.svg" alt="delete" class="card-icon">
        <img src="assets/favorite.svg" alt="favorite" class="card-icon">
      </div>
    </article`;
}
