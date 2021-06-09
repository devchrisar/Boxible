import views from '../views/nutricion.html'
import '../css/nutricion.css'
import '../source/fontawesome.js'
require('dotenv').config();
export default () =>{
    const divElement = document.createElement('div');
    divElement.innerHTML = views;



    const searchForm = divElement.querySelector(".NUform");
    const searchResultDiv = divElement.querySelector(".resultado_bsqFood");
    const container = divElement.querySelector(".NUcontenedor");
    const APP_ID = 'bf8d255a';
    const APP_KEY = process.env.API_KEY;
let searchQuery = "";

function generateHTML(results) {
    container.classList.remove("initial");
    let generatedHTML = "";
    results.map((result) => {
      generatedHTML += `
      <div class="NUitem">
      <a class="view-btn" href="${result.recipe.url}" target="_blank" rel="noopener">Receta</a>
      <img class="NUimg" src="${result.recipe.image}">
      <div class="contenedor_Flex">
          <h1 class="titulo_item">${result.recipe.label}</h1>
      </div>
      <p class="data_item">calorias: ${result.recipe.calories.toFixed(0)}</p>
      <p class="data_item">Nivel favorable: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels :'No se encontró en la base de datos' }</p>
  </div>
      `;
    });
    searchResultDiv.innerHTML = generatedHTML;
  }
async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=100`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
  }
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector("#NUinput").value;
     fetchAPI();
  });
    return divElement
}
