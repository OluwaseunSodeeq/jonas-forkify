import View from "./view.js";
import icon from "url:../../../src/img/icons.svg";
class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const clickedbtn = e.target.closest(".btn--inline");
      console.log(clickedbtn);
    });
  }
  _generateMarkup() {
    const numberPages = Math.ceil(
      this._data.results.length / this._data.resultsperPage
    );
    const curPage = this._data.page;
    console.log(numberPages);
    console.log(this._data.page);

    //page 1 there are other pages
    if (this._data.page === 1 && numberPages > 1) {
      console.log(this._data.page++);

      return `
    <button class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
      <use href="${icon}#icon-arrow-right"></use>
      </svg>
   </button>`;
      //page 1 there are no other pages
    }
    //last pages
    else if (curPage === numberPages && numberPages > 1) {
      console.log(curPage - 1);

      return `<button class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icon}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${curPage - 1} </span>
              </button>`;
    }
    // other pages
    else if (curPage < numberPages) {
      //   console.log(curPage--);
      //   console.log(curPage++);

      return `
      <button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icon}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>

      <button class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
        <use href="${icon}#icon-arrow-right"></use>
        </svg>
     </button>`;
    } else return console.log("only one page");
  }
  _generateMarkupButton() {
    console.log("refrator the above markup");
  }
}
export default new PaginationView();
