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
      let cards = document.querySelector(".containerCards");
      cards.innerHTML = "";

      filteredCharacters.forEach((character, index) => {
        cards.innerHTML += `
          <div class="card">
            <img src="https://rickandmortyapi.com/api/character/avatar/${character.id}.jpeg"/>
            <div>
              <span class="title">${character.name}</span> 
              <span>${character.status} ${character.species}</span>
            </div>
          </div>
        `;
      
        if ((index + 1) % 2 === 0 && index !== filteredCharacters.length - 1) {
          cards.innerHTML += `<hr class="greenHr"/>`;
        }
      });      
      
      console.log(filteredCharacters);
    })
    .catch((error) => {
      console.log(error);
    });
}
