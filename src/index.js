import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_U0dwcjNk0KTCEfaRccYrG3QJQuo0w3PD2EWKI6uidBlBKarzW6NvUNCq4MPbfKkJ";

function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds");
}fetchBreeds()
  .then((response) => {
    const select = document.querySelector(".breed-select");
    response.data.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.text = breed.name;
      select.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Помилка при завантаженні порід:", error);
  });
function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
}
const select = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");

select.addEventListener("change", () => {
  const selectedBreedId = select.value;

  fetchCatByBreed(selectedBreedId)
    .then((response) => {
      const catData = response.data[0];
      catInfo.innerHTML = `
        <img src="${catData.url}" alt="фото">
        <div class="cat-text"><p><strong>Назва породи:</strong> ${catData.breeds[0].name}</p>
        <p><strong>Опис:</strong> ${catData.breeds[0].description}</p>
        <p><strong>Темперамент:</strong> ${catData.breeds[0].temperament}</p></div>
      `;
    })
   .catch((error) => {
      console.error("Помилка при завантаженні інформації про кота:", error);
    });
});
