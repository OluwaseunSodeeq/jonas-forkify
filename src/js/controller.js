import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import recipeView from "./views/recipeView.js";

const recipeContainer = document.querySelector(".recipe");

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    //===============Renderinng theSpinner
    recipeView.renderSpinner();

    //===============Loading the Recipe
    await model.loadRecipe(id);
    // const { recipe } = model.state;

    //===============Renderinng the Recipe

    recipeView.render(model.state.recipe);
    // const recipeView = new recipeView(model.state.recipe);

    //===============Generating the Markup
  } catch (err) {
    // console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    //1. Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2. passing or loading the query into the search function
    await model.loadSearchResults(query);

    //3. Rendering the query
    // console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};
// controlSearchResult();
const init = function () {
  //subcriber
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResult);
};
init();
/*
//========STATE ONE===================



//polyfilling everything else  //specifically for polyfiling async

// import { forEach } from "core-js/core/array";
import "core-js/stable";
import "regenerator-runtime/runtime";
import icon from "url:../img/icons.svg";

const recipeContainer = document.querySelector(".recipe");
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Requst too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

//===============Renderinng theSpinner
const renderSpinner = function (parentEl) {
  const html = `
 <div class="spinner">
       <svg>
         <use href="${icon}#icon-loader"></use>
       </svg>
 </div> 

    
 `;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", html);
};

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    renderSpinner(recipeContainer);

    if (!id) return;

    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json();
    console.log(data);
    if (!res.ok) throw new Error(`${data.message} ${res.status}`);

    //Destructuring and Reformating the Properties
    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);

    //===============Renderinng the  data
    const markup = `
      <figure class="recipe__fig">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icon}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            recipe.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icon}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            recipe.servings
          }</span>
          <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icon}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icon}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated">
        <svg>
          <use href="${icon}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round">
        <svg class="">
          <use href="${icon}#icon-bookmark-fill"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
      ${recipe.ingredients
        .map((ing) => {
          return `
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icon}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${ing.quantity}</div>
          <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.description}
          </div>
        </li>`;
        })
        .join("")}
        
      </ul>
    </div>

    <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-right"></use>
            </svg>
          </a>
    </div>`;

    recipeContainer.innerHTML = "";
    recipeContainer.insertAdjacentHTML("afterbegin", markup);
  } catch (err) {
    console.log(err);
  }
};
["hashchange", "load"].forEach((ev) => window.addEventListener(ev, showRecipe));

*/
