import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className="w-[800px] mx-auto">
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <form action="" onSubmit={(e) => submitHandler(e)}>
        <legend>Select Method</legend>
        <div className="my-2 ">
          <label className="text-[#728285] font-semibold" htmlFor="PayPal">
            PayPal or Credit Card
            <input name="PaymentMethod" className="border border-[#B9BCBC] rounded-lg placeholder:text-[#728285] pl-2" type="radio" id="PayPal" value="PayPal" checked onChange={(e) => setPaymentMethod(e.target.value)} />
          </label>
        </div>
        <div>
          <button className="mt-2 text-white bg-[#354255] px-4 py-2 rounded-md" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;
