import Loader from './Loader';
import Message from './Message';
import { Link } from 'react-router-dom';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import Product from './Product';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message text={error} />
      ) : (
        <div className="flex flex-row flex-wrap items-center justify-center gap-8">
          {products.map((product) => {
            return <Product product={product} key={product._id} />; //CAROUSEL İÇERİSİNDE GÖSTERİLECEK BU KISIM !
          })}
        </div>
      )}
    </>
  );
};

export default ProductCarousel;
