import View from "./view.js";
import previewView from "./previewView.js";
import icon from "url:../../../src/img/icons.svg";
class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipes found for your input. Please try again!";
  _successMsg = "";

  _generateMarkup() {
    // console.log(this._data);
    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }
}

export default new ResultsView();
