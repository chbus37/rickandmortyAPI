// Mostrar personajes sin filtrar, buscar todos los personajes y mostrarlos en el DOM

const characterEl = document.querySelector("#characters");
const nameFilter = document.querySelector("#name-filters");
const statusFilter = document.querySelector("#status-filter");

// Funcion que llame a la API

async function getCharacters(name, status) {
  let url = "https://rickandmortyapi.com/api/character/";

  if (name || status) {
    url += "?";
    if (name) {
      url += `name=${name}&`;
    }
    if (status) {
      url += `status=${status}`;
    }
  }

  const response = await fetch(url);
  const data = await response.json();
  // console.log(data.results);
  return data.results;
}

// La funcion que renderiza en el DOM

async function displayCharacters(name, status) {
  const characters = await getCharacters(name, status);

  characterEl.innerHTML = "";

  // Renderizar los personajes
  for (let character of characters) {
    const card = document.createElement("div");
    card.classList.add("character-card");

    card.innerHTML = `
    
      <img src="${character.image}" />
      <h2>${character.name}</h2>
      <p> Status: ${character.status}</p>
      <p>Especie: ${character.species}</p>
    
    `;

    characterEl.appendChild(card);
  }
}

displayCharacters();

nameFilter.addEventListener("input", () => {
  displayCharacters(nameFilter.value, statusFilter.value);
});

statusFilter.addEventListener("change", () => {
  displayCharacters(nameFilter.value, statusFilter.value);
});
