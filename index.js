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
      const filteredCharacters = response.data.results;
      let cards = document.getElementById("containerCards");
      cards.innerHTML = "";

      filteredCharacters.forEach((character) => {
        cards.innerHTML += `
          <div>
            <img src="https://rickandmortyapi.com/api/character/avatar/${character.id}.jpeg"/>
          </div>
          <div>
            <a href="">${character.name}</a>
            <span>${character.status} ${character.species}</span>
          </div>
        `;
      });

      console.log(filteredCharacters);
    })
    .catch((error) => {
      console.log(error);
    });
}
