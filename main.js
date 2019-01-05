document.querySelector("#add-btn").addEventListener("click", addToAlbum);

function addToAlbum(event) {
  event.preventDefault();
  var title = document.querySelector("#title").value;
  console.log("add-btn clicked", title);
  alert(title);
  // new photo .....title, body, etc
}