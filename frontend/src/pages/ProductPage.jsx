import { useParams, Link } from 'react-router-dom';
import products from '../products';
import Rating from '../components/Rating';

const ProductPage = () => {
  const { id: productId } = useParams();
  const product = products.find((item) => item._id === productId);
  return (
    <div className="w-5/6 mx-auto text-[#8C9393] font-medium mt-8">
      <div className="flex flex-row gap-4 justify-center items-center">
        <div>
          <Link to="/">
            <button className="bg-[#F3F1F3] px-[12px] py-4 rounded-[10px] font-semibold text-black mb-4">Go Back</button>
          </Link>
          <img className="w-[400px]" src={product.image} alt="" />
        </div>
        <div className="w-[400px]">
          <div className="p-8 text-[1.5rem] font-bold leading-[28px]">{product.name}</div>
          <div className="p-8 border-y border-[#B9BFBF]">
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </div>
          <div className="p-8">Description: {product.description}</div>
        </div>
        <div className="shadow-[0px_2px_4px_3px_#00000026] rounded-[12px] border border-[#C0C3C2] h-[200px]">
          <div className="p-4">
            Price: <span className="font-bold ml-[40px]">${product.price}</span>
          </div>
          <div className="p-4 border-y border-[#C0C3C2]">
            Status: <span className="font-bold ml-8">{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</span>
          </div>
          <div className="p-4">
            <button className={`${product.countInStock > 0 ? 'bg-[#344154]' : 'bg-[#7C868E]'} text-white px-[14px] py-[10px] rounded-[10px]`} disabled={product.countInStock > 0 ? false : true}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
