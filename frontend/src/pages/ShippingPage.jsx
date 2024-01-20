import { useState } from 'react';
import { saveShippingAdress } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAdress({ address, city, postalCode, country }));
    navigate('/payment');
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <form action="" onSubmit={(e) => submitHandler(e)}>
        <div className="my-2 flex flex-col items-start justify-center">
          <label className="text-[#728285] font-semibold" htmlFor="address">
            address
          </label>
          <input className="border border-[#B9BCBC] h-[40px] w-[600px] rounded-lg placeholder:text-[#728285] pl-2" type="address" name="" id="address" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="my-2 flex flex-col items-start justify-center">
          <label className="text-[#728285] font-semibold" htmlFor="city">
            city
          </label>
          <input className="border border-[#B9BCBC] h-[40px] w-[600px] rounded-lg placeholder:text-[#728285] pl-2" type="city" name="" id="city" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="my-2 flex flex-col items-start justify-center">
          <label className="text-[#728285] font-semibold" htmlFor="postalCode">
            postalCode
          </label>
          <input className="border border-[#B9BCBC] h-[40px] w-[600px] rounded-lg placeholder:text-[#728285] pl-2" type="postalCode" name="" id="postalCode" placeholder="Enter postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
        </div>
        <div className="my-2 flex flex-col items-start justify-center">
          <label className="text-[#728285] font-semibold" htmlFor="country">
            country
          </label>
          <input className="border border-[#B9BCBC] h-[40px] w-[600px] rounded-lg placeholder:text-[#728285] pl-2" type="country" name="" id="country" placeholder="Enter country" value={country} onChange={(e) => setCountry(e.target.value)} />
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

export default ShippingPage;
