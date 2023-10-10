import SlimSelect from "slim-select";
import Notiflix from "notiflix";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const catInfo = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function hideError() {
  error.style.display = "none";
}

async function fetchAndDisplayCatInfo(selectedBreedId) {
  showLoader();
  catInfo.style.display = "none";

  try {
    const catData = await fetchCatByBreed(selectedBreedId);

    hideLoader();
    catInfo.style.display = "block";

    catInfo.innerHTML = `
      <img src="${catData.url}" alt="фото">
      <div class="cat-text">
        <h2>${catData.breeds[0].name}</h2>
        <p>${catData.breeds[0].description}</p>
        <p><h3>Temperament:</h3>${catData.breeds[0].temperament}</p>
      </div>
    `;
  } catch (error) {
    hideLoader();
    Notiflix.Notify.failure("Сталася помилка під час операції.", {
      position: "bottom-left",
      width: "300px",
      fontSize: "18px",
      borderRadius: "8px",
      backgroundColor: "#ff0000",
      textColor: "#ffffff",
      timeout: 3000,
    });
    catInfo.innerHTML = "";
  }
}

async function setupBreedSelect() {
  showLoader();
  hideError();

  try {
    const breeds = await fetchBreeds();

    hideLoader();

    const options = breeds.map((breed) => ({
      value: breed.id,
      text: breed.name,
    }));

    const select = document.querySelector(".breed-select");

    const slimSelect = new SlimSelect({
      select: ".breed-select",
      data: options,
      searchText: "Пошук породи кота",
      searchPlaceholder: "Введіть породу кота",
      onChange: async (info) => {
        const selectedBreedId = info.value;

        if (selectedBreedId) {
          await fetchAndDisplayCatInfo(selectedBreedId);
        } else {
          catInfo.style.display = "none";
        }
      },
    });

    select.addEventListener("change", async () => {
      const selectedBreedId = select.value;

      if (selectedBreedId) {
        await fetchAndDisplayCatInfo(selectedBreedId);
      } else {
        catInfo.style.display = "none";
      }
    });
  } catch (error) {
    hideLoader();
    Notiflix.Notify.failure("Сталася помилка під час операції.", {
      position: "bottom-left",
      width: "300px",
      fontSize: "18px",
      borderRadius: "8px",
      backgroundColor: "#ff0000",
      textColor: "#ffffff",
      timeout: 3000,
    });
    catInfo.innerHTML = "";
  }
}

setupBreedSelect();