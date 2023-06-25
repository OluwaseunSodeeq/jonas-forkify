import View from "./view.js";
import icon from "url:../../../src/img/icons.svg";
class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _successMsg = "Recipe was successfully uploaded";

  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _openBtn = document.querySelector(".nav__btn--add-recipe");
  _closeBtn = document.querySelector(".btn--close-modal");
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHiddenFeatures();
  }

  toggle() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  _addHandlerShowWindow() {
    this._openBtn.addEventListener("click", this.toggle.bind(this));
  }

  _addHiddenFeatures() {
    this._closeBtn.addEventListener("click", this.toggle.bind(this));
    this._overlay.addEventListener("click", this.toggle.bind(this));
  }
  addHandlerUpload(handler) {
    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      const dataarr = [...new FormData(this)];
      const data = Object.fromEntries(dataarr);
      console.log(data);
      console.log(dataarr);
      handler(data);
    });
  }
  _generateMarkup() {}
}
export default new AddRecipeView();
