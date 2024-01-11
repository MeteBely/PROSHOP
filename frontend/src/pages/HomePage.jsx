import products from '../products';
import Product from '../components/Product.jsx';

const HomePage = () => {
  return (
    <>
      <h1 className="text-[40px] text-[#6E7E81] font-semibold ml-[136px] my-2">Latest Products</h1>
      <div className="flex flex-row flex-wrap items-center justify-center gap-8">
        {products.map((product) => {
          return <Product product={product} key={product._id} />;
        })}
      </div>
    </>
  );
};

export default HomePage;
