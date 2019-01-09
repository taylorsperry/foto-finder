class Photo {
  constructor(id, title, caption, file, favorite) {
    this.id = Date.now();
    this.title = title;
    this.caption = caption;
    this.file = file;
    this.favorite = favorite || false; 
  }

  saveToStorage(imagesArr) {
    localStorage.setItem("photos", JSON.stringify(imagesArr));
  }

  deleteFromStorage(index) {
    imagesArr.splice(index, 1);
    this.saveToStorage(imagesArr);
   }

  updatePhoto(category, text) {
    if (event.target.classList.contains("favorite")) {
      this.favorite = !this.favorite;
      this.saveToStorage(imagesArr);
    }
    if (category && text) {
      this[category] = text;
    }
    this.saveToStorage(imagesArr)
    console.log(category);
    console.log(text);
  }
}

   