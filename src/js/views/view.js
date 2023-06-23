import icon from "url:../../../src/img/icons.svg";
export default class View {
  //Public Api
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  _clear() {
    this._parentElement.innerHTML = "";
  }
  renderSpinner() {
    const markup = `
   <div class="spinner">
         <svg>
           <use href="${icon}#icon-loader"></use>
         </svg>
   </div>   
   `;
    // this._parentElement.innerHTML = "";
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  addHandlerRender(handler) {
    //publisher
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }
  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
        <div>
            <svg>
            <use href="${icon}#icon-alert-triangle"></use>
            </svg>
        </div>
        <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSuccessMsg(message = this._successMsg) {
    const markup = `
    <div class="message">
        <div>
            <svg>
            <use href="${icon}#icon-smile"></use>
            </svg>
        </div>
        <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
