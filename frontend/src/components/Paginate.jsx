import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    <div>
      {pages > 1 && (
        <div>
          {[...Array(pages).keys()].map((x) => (
            <Link key={x + 1} to={!isAdmin ? (keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`) : `/admin/productlist/${x + 1}`}>
              {x + 1}
              {/* {page} AKTİF OLANI DÖNDÜRÜR*/}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Paginate;
