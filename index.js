const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

let currentPage = 1;
let totalPages = 1;

//busca na API do Rick and Morty com base no valor inserido no campo de pesquisa.
function search(event) {
  event.preventDefault();

  let searchBarValue = document.getElementById("search-bar").value;

  let apiUrl = "https://rickandmortyapi.com/api/character";
  let params = {
    page: currentPage,
  };

  if (searchBarValue) {
    params.name = searchBarValue;
  }

  api
    .get(apiUrl, { params })
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

      // Atualizar informações de paginação
      const pagination = response.data.info;
      totalPages = pagination.pages;

      // Adicionar botões de paginação
      addPaginationButtons();
    })
    .catch((error) => {
      console.log(error);
    });
}

function addPaginationButtons() {
  let paginationContainer = document.querySelector(".pagination-container");
  paginationContainer.innerHTML = "";

  // Botão "Anterior"
  if (currentPage > 1) {
    let previousButton = document.createElement("button");
    previousButton.textContent = "Anterior";
    previousButton.addEventListener("click", goToPreviousPage);
    paginationContainer.appendChild(previousButton);
  }

  // Botão "Próximo"
  if (currentPage < totalPages) {
    let nextButton = document.createElement("button");
    nextButton.textContent = "Próximo";
    nextButton.addEventListener("click", goToNextPage);
    paginationContainer.appendChild(nextButton);
  }
}

function goToPreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    search(event);
  }
}

function goToNextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    search(event);
  }
}

// Carregar todos os personagens quando a página for carregada
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM carregado");
  search(event);
});
