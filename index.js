const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

//busca na API do Rick and Morty com base no valor inserido no campo de pesquisa.
function search(event) {
  event.preventDefault();

  let searchBarValue = document.getElementById("search-bar").value;

  api
    .get("https://rickandmortyapi.com/api/character", {
      params: { name: searchBarValue },
    })
    .then((response) => {
      const filteredCharacters = response.data.results.filter((character) => {
        return character.name
          .toLowerCase()
          .includes(searchBarValue.toLowerCase());
      });

      console.log(filteredCharacters);
    })
    .catch((error) => {
      console.log(error);
    });
}
