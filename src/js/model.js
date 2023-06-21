import { async } from "regenerator-runtime";
import { API_URL, KEY } from "./configuration";
import { getJson } from "./helper";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJson(`${API_URL}v2/recipes/${id}`);

    const { recipe } = data.data;

    //assinging values to the empty Recipe property in the state Object above
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
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
    const data = await getJson(`${API_URL}?search=${query}`);

    console.log(data);
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    console.log(state.search.results);
  } catch (err) {
    console.error(err);
  }
};
// loadSearchResults("pizza");
//13 video.10 mins
