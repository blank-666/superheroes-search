const baseUrl = "https://superheroapi.com/api.php";
const token = "2890093177898426";
const authorizedUrl = `${baseUrl}/${token}`;

function getSearchUrl(name) {
  return `${authorizedUrl}/search/${name}`;
}

function getIdUrl(id) {
  return `${authorizedUrl}/${id}`;
}

export async function getCharacter(name) {
  try {
    let response = await fetch(getSearchUrl(name));
    let data = await response.json();
    return data;
  } catch (error) {
    console.log("OUR ERROR", error);
  }
}

export async function getFavoriteCharacters(idList) {
  let characters = [];
  for (let id of idList) {
    await fetch(getIdUrl(id))
      .then(
        (successResponse) => {
          return successResponse.json();
        },
        (failResponse) => {
          return console.log(failResponse);
        }
      )
      .then((character) => (characters = [...characters, character]));
  }
  let results = await Promise.all(characters);
  return results;
}
