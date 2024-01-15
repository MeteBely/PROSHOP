import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message.jsx';
import React from 'react';
import { addToCart, removeFromCart } from '../slices/cartSlice.jsx';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeToCartHandler = async (product) => {
    dispatch(removeFromCart({ ...product }));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="flex flex-col">
      <div>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <>
            <Message text="Your cart is empty" />
            <Link to="/">Go Back</Link>
          </>
        ) : (
          <div className="flex flex-row justify-around">
            <div className="flex flex-col gap-8">
              {cartItems.map((item) => {
                return (
                  <div key={item._id} className="b border-b border-black flex items-center gap-4 ">
                    <img src={item.image} alt={item.name} className="w-[250px]" />
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                    <p>${item.price}</p>
                    <form>
                      <select className="w-[80px] h-[40px] pl-4" name="" id="" value={item.qty} onChange={(e) => addToCartHandler(item, Number(e.target.value))}>
                        {[...Array(item.countInStock).keys()].map((stock) => (
                          <option key={stock + 1} value={stock + 1}>
                            {stock + 1}
                          </option>
                        ))}
                      </select>
                    </form>
                    <button onClick={() => removeToCartHandler(item)}>
                      <FaTrash />
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</p>
              <button disabled={cartItems.length === 0 && true} onClick={() => checkoutHandler()}>
                Proceed To Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
