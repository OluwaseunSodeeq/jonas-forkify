import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultView.js";
import bookMarkView from "./views/bookMarkView.js";
import paginationView from "./views/paginationView.js";
import addRecipeView from "./views/addRecipeView.js";
import { MODAL_CLOSE_SEC } from "./configuration.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

//It used to prevent the page from reloading,it is not js code actually
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    //===============Renderinng theSpinner
    recipeView.renderSpinner();

    //update the result
    resultsView.update(model.getSearchResultsPage());
    bookMarkView.update(model.state.bookMarks);
    //===============Loading the Recipe
    await model.loadRecipe(id);
    // const { recipe } = model.state;

    //===============Renderinng the Recipe
    recipeView.render(model.state.recipe);
    // const recipeView = new recipeView(model.state.recipe);
    // console.log(model.state.recipe);

    //===============Generating the Markup
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};
const controlSearchResult = async function () {
  try {
    resultsView.renderSpinner();

    //1. Get search query

    const query = searchView.getQuery();
    // if (query === "") return;
    if (!query) return;

    //2. passing or loading the query into the search function
    await model.loadSearchResults(query);

    //3. Rendering the result
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
    // console.log(model.state.search.results);

    //renderPagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
// controlSearchResult();
const controlPagination = function (goto) {
  //3. Rendering new the result
  resultsView.render(model.getSearchResultsPage(goto));

  //3. Rendering new Pagination
  paginationView.render(model.state.search);
};

const controlSevings = function (newServings) {
  //update thr recipe servings in state
  model.updateServings(newServings);

  //rendering the recipe
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookMark = function () {
  //add?remove BookMark
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.removeBookMark(model.state.recipe.id);
  console.log(model.state.recipe);

  //update recipe View
  recipeView.update(model.state.recipe);

  //render Bookmark
  bookMarkView.render(model.state.bookMarks);
};

const controlBookMarks = function () {
  bookMarkView.render(model.state.bookMarks);
};

const controlAddrecipe = async function (newRecipe) {
  try {
    //render spainer
    addRecipeView.renderSpinner();
    //upload the new recipe data

    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //render recipe view data
    recipeView.render(model.state.recipe);
    //success Msg
    addRecipeView.renderSuccessMsg();

    //close form
    setTimeout(function () {
      addRecipeView.toggle();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error("🤞", err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  //subcriber
  bookMarkView.addHandlerRender(controlBookMarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlSevings);
  recipeView.addHandlerAddBookmark(controlAddBookMark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddrecipe);
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
