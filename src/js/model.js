import { async } from "regenerator-runtime";
import { API_URL, KEY, PER_PAGE } from "./configuration";
import { AJAx } from "./helper";
// import { getJson, sendJson } from "./helper";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsperPage: PER_PAGE,
  },
  bookMarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  // customising and assinging values to the Recipe property in the state Object above
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAx(`${API_URL}${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);

    //to retain the property bookmarked
    if (state.bookMarks.some((bookmark) => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    // console.log(state.recipe);
  } catch (err) {
    console.error(`${err.message}`);
    throw err;
  }
};

//Search functionality
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    // https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza
    const data = await AJAx(`${API_URL}?search=${query}&key=${KEY}`);

    // console.log(data);
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;

    // console.log(state.search.results);
  } catch (err) {
    console.error(err);
  }
};

// loadSearchResults("pizza");
//13 video.10 mins
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsperPage; //0
  const end = page * state.search.resultsperPage; //9
  // console.log(state.search.results); // from this array copy and render the set below
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};
const persistBookMarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookMarks));
};

export const addBookMark = function (recipe) {
  state.bookMarks.push(recipe);
  //bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookMarks();
};

export const removeBookMark = function (id) {
  const index = state.bookMarks.findIndex((el) => el.id === id);
  state.bookMarks.splice(index, 1);

  //unbookmark
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookMarks();
};
const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookMarks = JSON.parse(storage);
};

init();
//clearing the Storage
const clearBookMark = function () {
  localStorage.clear("bookmarks");
};
// clearBookMark();

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const ingArr = ing[1].split(",").map((each) => each.trim());
        // const ingArr = ing[1].replaceAll(" ", "").split(",");
        if (ingArr.length !== 3)
          throw new Error(
            " Wrong ingredient format! Please use the correct format "
          );
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    console.log(ingredients);
    // console.log(ingredients, quantity, unit, description);
    const recipe = {
      title: newRecipe.title,
      publisher: newRecipe.publisher,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    console.log(recipe);
    // const data = await sendJson(`${API_URL}?key=${KEY}`, recipe);
    const data = await AJAx(`${API_URL}?key=${KEY}`, recipe);
    // https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=<insert your key>
    state.recipe = createRecipeObject(data);
    addBookMark(state.recipe);
    console.log(data);
  } catch (err) {
    throw err;
  }
};
