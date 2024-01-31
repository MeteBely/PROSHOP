import Product from '../components/Product.jsx';
import { useParams, Link } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice.jsx';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import Paginate from '../components/Paginate.jsx';
import ProductCarousel from '../components/ProductCarousel.jsx';

const HomePage = () => {
  const { pageNumber, keyword } = useParams();
  const { data, error, isLoading } = useGetProductsQuery({ keyword, pageNumber });
  return (
    <>
      {!keyword ? <ProductCarousel /> : <Link to="/">GO BACK</Link>}
      {isLoading ? (
        <div className="mx-auto flex justify-center mt-8">
          <Loader />
        </div>
      ) : error ? (
        <Message text={error?.data?.message || error?.error}></Message>
      ) : (
        <>
          <h1 className="text-[40px] text-[#6E7E81] font-semibold ml-[136px] my-2">Latest Products</h1>
          <div className="flex flex-row flex-wrap items-center justify-center gap-8">
            {data.products.map((product) => {
              return <Product product={product} key={product._id} />;
            })}
          </div>
          <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
        </>
      )}
    </>
  );
};

export default HomePage;
