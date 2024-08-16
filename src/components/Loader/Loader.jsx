import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loaderBox}>
      <RotatingLines
        className={css.loader}
        visible={true}
        height="96"
        width="96"
        color="#4fa94d"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
