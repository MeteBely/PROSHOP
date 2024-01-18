import { FaShoppingCart } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { TbSquareRoundedLetterP } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [openMenu, setOpenMenu] = useState(false);
  const logoutHandler = () => {};
  return (
    <header className="">
      <nav className="">
        <div className="flex flex-row justify-between items-center  px-20 w-full text-[#BCC4C6] h-12 bg-[#6E7E81]">
          <div>
            <Link to="/" className="text-white text-xl flex flex-row items-center gap-[4px]">
              <TbSquareRoundedLetterP size={40} />
              ProShop
            </Link>
          </div>
          <div className="flex flex-row gap-8 relative">
            <Link to="/cart" className="flex flex-row items-center gap-[4px]">
              <FaShoppingCart />
              Cart
            </Link>
            {cartItems.length > 0 && <div className="absolute left-[35%] bg-[#00B394] rounded-[50%] w-[25px] text-center text-white font-semibold">{cartItems.reduce((a, c) => a + c.qty, 0)}</div>}
            <Link to="/login" className="flex flex-row items-center gap-[4px]">
              <FaUser />
              Sign In
            </Link>
            {userInfo ? (
              <>
                <div className="relative">
                  <button onClick={() => setOpenMenu(!openMenu)} className="w-20 h-8 rounded-full">
                    {userInfo.name}
                  </button>
                  {openMenu && (
                    <div className="absolute right-0 mt-3 w-[200px] bg-white shadow-lg shadow-gray-300 flex flex-col items-start">
                      <Link to="/profile">Profile</Link>
                      <button onClick={() => logoutHandler()}>Logout</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
