export class LocalStorageManager {
    static getFavorites() {
      return JSON.parse(localStorage.getItem("favoriteList")) || [];
    }
  
    static setFavorites(characters) {
      localStorage.setItem("favoriteList", JSON.stringify(characters));
    }
  }
  