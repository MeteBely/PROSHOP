import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps.jsx';
import { toast } from 'react-toastify';
import Loader from '../components/Loader.jsx';
import { useCreateOrderMutation } from '../slices/orderApiSlice.jsx';
import { clearCartItems } from '../slices/cartSlice.jsx';
import Message from '../components/Message.jsx';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  console.log(cart);
  return (
    <div className="w-1/2 mx-auto">
      <CheckoutSteps step1 step2 step3 step4 />{' '}
      <div className="flex flex-row justify-between">
        <div>
          <div>
            <h2>Shipping</h2>
            <p>
              <strong>Address:</strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>
          <div>
            <h2>Payment Method</h2>
            <strong>Method: </strong>
            {cart.paymentMethod}
          </div>
          <div className="flex flex-col">
            <h2>Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <Message text="Your cart is empty" />
            ) : (
              cart.cartItems.map((item, index) => {
                return (
                  <div key={index} className="flex flex-row">
                    <img className="w-40" src={item.image} alt={item.name} />
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                    <div>
                      {item.qty} x {item.price} = {item.qty * item.price}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div>
          <h2>Order Summary</h2>
          <div className="flex flex-row">
            <div>Items: ${cart.itemsPrice}</div>
          </div>
          <div className="flex flex-row">
            <div>Shipping: ${cart.shippingPrice}</div>
          </div>
          <div className="flex flex-row">
            <div>tax: ${cart.taxPrice}</div>
          </div>
          <div className="flex flex-row">
            <div>total: ${cart.totalPrice}</div>
          </div>
          <div>{error && <Message>{error?.data?.message}</Message>}</div>
          <div>
            <button type="button" disabled={cart.cartItems.length === 0} onClick={() => placeOrderHandler()}>
              Place Order
            </button>
            {isLoading && <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
