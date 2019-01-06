var create = document.querySelector("#add-btn")
var input = document.querySelector("#input-btn")
var photoGallery = document.querySelector('.images');
var imagesArr = JSON.parse(localStorage.getItem("photos")) || [];
var reader = new FileReader();


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
  // var title = document.querySelector("#title").value;
  // var caption = document.querySelector("#caption").value;
  // console.log(title, caption);
  if (input.files[0]) {
    reader.readAsDataURL(input.files[0]);
    reader.onload = addPhoto;
  }
}

function addPhoto(event) {
  var newPhoto = new Photo(Date.now(), event.target.result);
  photoGallery.innerHTML += `${title} <img src=${event.target.result} /> ${caption}`;
}
