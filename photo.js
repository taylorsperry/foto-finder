class Photo {
  constructor(id, title, caption, file, favorite) {
    this.id = id || Date.now();
    this.title = title;
    this.caption = caption;
    this.file = file;
    this.favorite = favorite || false; 
  }

  saveToStorage() {}

  deleteFromStorage() {}

  updatePhoto() {}

}