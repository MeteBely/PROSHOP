import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="flex flex-row gap-4">
      <div>
        {step1 ? (
          <Link to="/login">Sign In</Link>
        ) : (
          <Link aria-disabled className="text-[#A0A6A6]">
            Sign In
          </Link>
        )}
      </div>
      <div>
        {step2 ? (
          <Link to="/shipping">Shipping</Link>
        ) : (
          <Link aria-disabled className="text-[#A0A6A6]">
            Shipping
          </Link>
        )}
      </div>
      <div>
        {step3 ? (
          <Link to="/payment">Payment</Link>
        ) : (
          <Link aria-disabled className="text-[#A0A6A6]">
            Payment
          </Link>
        )}
      </div>
      <div>
        {step4 ? (
          <Link to="/placeorder">Place Order</Link>
        ) : (
          <Link aria-disabled className="text-[#A0A6A6]">
            Place Order
          </Link>
        )}
      </div>
    </nav>
  );
};

export default CheckoutSteps;
