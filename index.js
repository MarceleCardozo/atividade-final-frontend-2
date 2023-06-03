const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

let currentPage = 1;
let totalPages = 1;

// Search in the Rick and Morty API based on the value entered in the search bar.
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
        let statusColorClass = ""; // Declare the statusColorClass variable

        if (character.status === "Alive") {
          statusColorClass = "green-status";
        } else if (character.status === "Dead") {
          statusColorClass = "red-status";
        } else {
          statusColorClass = "gray-status";
        }

        cards.innerHTML += `
    <div class="card">
      <img src="https://rickandmortyapi.com/api/character/avatar/${character.id}.jpeg"/>
      <div class="informations">
        <span class="title">${character.name}</span> 
        <div class="statusCharacter">
          <div class="statusColor ${statusColorClass}"></div>
          <div class="statusText">${character.status} - ${character.species}</div>
        </div>
        <div class="lastCharaterLocation">
          <p>Last known location:</p>
          <span>${character.location.name}</span>
        </div>
        <div>
          <p>Last seen on:</p>
          <span>${character.episode.name}</span>
        </div>
      </div>
    </div>
  `;

        if ((index + 1) % 2 === 0 && index !== filteredCharacters.length - 1) {
          cards.innerHTML += `<hr class="greenHr"/>`;
        }
      });

      console.log(filteredCharacters);

      // Update pagination information
      const pagination = response.data.info;
      totalPages = pagination.pages;

      // Add pagination buttons
      addPaginationButtons();
    })
    .catch((error) => {
      console.log(error);
    });
}

function addPaginationButtons() {
  let paginationContainer = document.querySelector(".pagination-container");
  paginationContainer.innerHTML = "";

  // "Previous" button
  if (currentPage > 1) {
    let previousButton = document.createElement("button");
    previousButton.textContent = "Previous";
    previousButton.addEventListener("click", goToPreviousPage);
    paginationContainer.appendChild(previousButton);
  }

  // "Next" button
  if (currentPage < totalPages) {
    let nextButton = document.createElement("button");
    nextButton.textContent = "Next";
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

// Load all characters when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded");
  search(event);
});
