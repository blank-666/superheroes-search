import { CharacterCard } from "./CharacterCard";

export function CharactersList({
  characters,
  addFavorite,
  removeFavorite,
  favoriteIdList
}) {
  return (
    <div className="charactersList">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          id={character.id}
          name={character.name}
          imgUrl={character.image.url}
          //
          biography={character.biography}
          powerstats={character.powerstats}
          appearance={character.appearance}
          occupation={character.work.occupation}
          relatives={character.connections.relatives}
          //
          addFavorite={() => addFavorite(character.id)}
          removeFavorite={() => removeFavorite(character.id)}
          isFavorite={favoriteIdList.includes(character.id)}
        />
      ))}
    </div>
  );
}
