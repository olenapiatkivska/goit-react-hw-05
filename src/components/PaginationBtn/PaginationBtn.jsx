import css from './PaginationBtn.module.css';

const PaginationBtn = ({ onBtnClick, page }) => {
  return (
    <button
      className={css.paginationBtn}
      type="button"
      onClick={() => onBtnClick(page - 1)}
    >
      Pervious Page
    </button>
  );
};

export default PaginationBtn;
