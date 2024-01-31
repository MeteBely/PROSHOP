import { useParams, Link, useNavigate } from 'react-router-dom';
import Rating from '../components/Rating';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useState } from 'react';
import { addToCart } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Meta from '../components/Meta';

const ProductPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id: productId } = useParams();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { userInfo } = useSelector((state) => state.auth);

  const { data: product, error, isLoading, refetch } = useGetProductDetailsQuery(productId);
  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review added successfully');
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message); //MİS
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="mx-auto flex justify-center mt-8">
          <Loader />
        </div>
      ) : error ? (
        <Message text={error?.data?.message || error?.error}></Message>
      ) : (
        <>
          <Meta title={product.name} />
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
              <div className="shadow-[0px_2px_4px_3px_#00000026] rounded-[12px] border border-[#C0C3C2] h-[250px]">
                <div className="p-4">
                  Price: <span className="font-bold ml-[40px]">${product.price}</span>
                </div>
                <div className="p-4 border-y border-[#C0C3C2]">
                  Status: <span className="font-bold ml-8">{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</span>
                </div>
                {product.countInStock > 0 && (
                  <div className="flex gap-8 items-center justify-center mt-4">
                    <span>Qty:</span>
                    <form>
                      <select className="w-[80px] h-[40px] pl-4" name="" id="" value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                        {[...Array(product.countInStock).keys()].map((stock) => (
                          <option key={stock + 1} value={stock + 1}>
                            {stock + 1}
                          </option>
                        ))}
                      </select>
                    </form>
                  </div>
                )}
                <div className="p-4">
                  <button onClick={addToCartHandler} className={`${product.countInStock > 0 ? 'bg-[#344154]' : 'bg-[#7C868E]'} text-white px-[14px] py-[10px] rounded-[10px]`} disabled={product.countInStock > 0 ? false : true}>
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
            <div>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message text="No Reviews" />}
              {product.reviews.map((review) => {
                return (
                  <div key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </div>
                );
              })}
              <h2>Write Review</h2>
              {loadingProductReview && <Loader />}
              {userInfo ? (
                <form onSubmit={(e) => submitHandler(e)}>
                  <div className="flex flex-col my-2">
                    <label htmlFor="rating">Rating</label>
                    <select id="rating" name="rating" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                      <option>Select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  <div className="flex flex-col my-2">
                    <label htmlFor="comment">Comment</label>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} name="" id="" cols="30" rows="10"></textarea>
                  </div>
                  <div className="flex flex-col my-2">
                    <button disabled={loadingProductReview} type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              ) : (
                <Message text={`Please login to write a review`} />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductPage;
