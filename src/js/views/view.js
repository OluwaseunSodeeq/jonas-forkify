import icon from "url:../../../src/img/icons.svg";
export default class View {
  //Public Api
  _data;
  //check jsdoc.app for this
  /**
   *
   * @param {Object | Object[]} data The data to be rendered(e.g rcipe)
   * @param {boolean} [render = false]  if true,create Markup staring instaed of rendering to the dom
   * @returns {undefined | string} A mark up staring is returned if render false
   * @this {Object} View instance
   * @author Oluwaseun Sodeeq 2023 with Jonas
   */

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();

    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));
    // console.log(newElements);
    // console.log(curElements);
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //   console.log(curEl, newEl.isEqualNode(curEl));

      //update Text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        // console.log(newEl.firstChild?.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      //updating the Attributes
      //   console.log(newEl.attributes);

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
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
