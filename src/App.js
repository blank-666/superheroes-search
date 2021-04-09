import "./styles.css";
import { useState, useEffect } from "react";
import { getCharacter, getFavoriteCharacters } from "./api";
import { CharactersList } from "./components/CharactersList";
import { LocalStorageManager } from "./LocalStorageManager";
import useDebounce from "./hooks/useDebounce";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  //
  const [searchWord, setSearchWord] = useState("");
  const [searchResults, setSearchResults] = useState();
  const debouncedSearchWord = useDebounce(searchWord, 300);
  //
  const [favoriteIdList, setFavoriteIdList] = useState(
    LocalStorageManager.getFavorites()
  );
  const [isFavoriteMode, setIsFavoriteMode] = useState(false);
  const [favoriteCharacters, setFavoriteCharacters] = useState("");

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const { results } = await getCharacter(debouncedSearchWord);
      setIsFavoriteMode(false);
      setSearchResults(results);
      setIsLoading(false);
    }
    fetchData();
  }, [debouncedSearchWord]);

  useEffect(() => {
    async function fetchData() {
      const results = await getFavoriteCharacters(favoriteIdList);
      setFavoriteCharacters(results);
    }
    fetchData();
  }, [favoriteIdList]);

  function handleInputChange(e) {
    setSearchWord(e.target.value);
  }

  function addFavorite(id) {
    if (!favoriteIdList.includes(id)) {
      const updatedList = [...favoriteIdList, id];
      LocalStorageManager.setFavorites(updatedList);
      setFavoriteIdList(updatedList);
    }
  }

  function removeFavorite(id) {
    const updatedList = favoriteIdList.filter(
      (characterId) => characterId !== id
    );
    LocalStorageManager.setFavorites(updatedList);
    setFavoriteIdList(updatedList);
  }

  function toggleFavorite() {
    setIsFavoriteMode(!isFavoriteMode);
  }

  return (
    <div className="App">
      <input
        type="text"
        name="search"
        placeholder="Search..."
        autoComplete="off"
        value={searchWord}
        onChange={handleInputChange}
      />
      <button className='favoriteModeButton' onClick={toggleFavorite}>
        {isFavoriteMode ? "Hide favorite" : "Show favorite"}
      </button>

      {isFavoriteMode ? (
        <CharactersList
          characters={favoriteCharacters}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
          favoriteIdList={favoriteIdList}
        />
      ) : searchResults ? (
        <CharactersList
          characters={searchResults}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
          favoriteIdList={favoriteIdList}
        />
      ) : isLoading ? (
        <p className="loader" />
      ) : (
        searchWord && <p className="errorMessage">No superheroes found.</p>
      )}
    </div>
  );
}
