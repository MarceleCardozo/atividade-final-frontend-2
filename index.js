const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

let currentPage = 1;
let totalPages = 1;
const cardsPerPage = 6; // Number of cards to display per page

// Search in the Rick and Morty API based on the value entered in the search bar.
async function search(event) {
  event.preventDefault();

  let searchBarValue = document.getElementById("search-bar").value;

  let apiUrl = "https://rickandmortyapi.com/api/character";
  let params = {
    page: currentPage,
  };

  if (searchBarValue) {
    params.name = searchBarValue;
  }

  try {
    const response = await api.get(apiUrl, { params });
    const filteredCharacters = response.data.results;
    let cards = document.querySelector(".containerCards");
    cards.innerHTML = "";

    let cardCounter = 0; // Counter for the number of cards displayed

    for (const character of filteredCharacters) {
      const episodeNResponse = await axios.get(character.episode[0]);
      const episodeName = episodeNResponse.data.name;

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
              <span>${episodeName}</span>
            </div>
          </div>
        </div>`;

      if (
        (filteredCharacters.indexOf(character) + 1) % 2 === 0 &&
        filteredCharacters.indexOf(character) !== filteredCharacters.length - 1
      ) {
        cards.innerHTML += `<hr class="greenHr"/>`;
      }

      cardCounter++;

      // Break the loop if the maximum number of cards per page is reached
      if (cardCounter >= cardsPerPage) {
        break;
      }
    }

    // Update pagination information
    const pagination = response.data.info;
    totalPages = pagination.pages;

    // Add pagination buttons
    addPaginationButtons();
  } catch (error) {
    console.log(error);
  }
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

//Makes a request to an API endpoint and returns the total number of items received.
async function getTotalCount(endpoint) {
  const response = await api.get(endpoint);
  if (response.status === 200) {
    return response.data.info.count;
  } else {
    console.log(response.error);
    return 0;
  }
}

// Load all characters when the page is loaded
document.addEventListener("DOMContentLoaded", async function () {
  console.log("DOM loaded");

  const charactersCount = await getTotalCount("/character");
  const locationsCount = await getTotalCount("/location");
  const episodesCount = await getTotalCount("/episode");

  document.getElementById("characters").textContent += ` ${charactersCount}`;
  document.getElementById("locations").textContent += ` ${locationsCount}`;
  document.getElementById("episodes").textContent += ` ${episodesCount}`;

  search(event);
});
