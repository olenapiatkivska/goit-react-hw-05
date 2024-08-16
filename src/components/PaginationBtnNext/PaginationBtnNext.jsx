import css from './PaginationBtnNext.module.css';

const PaginationBtnNext = ({ onBtnClick, page }) => {
  return (
    <button
      className={css.paginationBtn}
      type="button"
      onClick={() => onBtnClick(page + 1)}
    >
      Next Page
    </button>
  );
};

export default PaginationBtnNext;
