import toast, { Toaster } from 'react-hot-toast';
import { IoMdSearch } from 'react-icons/io';
import css from './SearchFormMovie.module.css';

const SearchFormMovie = ({ onSearch }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const searchForm = event.currentTarget.elements.searchInput.value.trim();

    if (searchForm === '') {
      toast.error('Please add a query.');
      return;
    }
    onSearch(searchForm, 1);
    event.currentTarget.reset();
  };

  return (
    <div>
      <form className={css.formSearchBar} onSubmit={handleSubmit}>
        <input
          className={css.formSearchInput}
          type="text"
          name="searchInput"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button className={css.formSearchBtn} type="submit">
          <IoMdSearch size="20" />
        </button>
        <Toaster position="bottom-right" reverseOrder={false} />
      </form>
    </div>
  );
};

export default SearchFormMovie;
