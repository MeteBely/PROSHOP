import { FaShoppingCart } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { TbSquareRoundedLetterP } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useLogoutMutation } from '../slices/usersApiSlice.jsx';
import SearchBox from './SearchBox.jsx';
import { logout } from '../slices/authSlice.jsx';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openAdminMenu, setOpenAdminMenu] = useState(false);
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };
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
          <div className="flex flex-row gap-8 justify-center items-center">
            <div>
              <SearchBox />
            </div>
            <div className="relative">
              <Link to="/cart" className="flex flex-row items-center gap-[4px]">
                <FaShoppingCart />
                Cart
              </Link>
              {cartItems.length > 0 && <div className="absolute top-0 left-[52px] bg-[#00B394] rounded-[50%] w-[25px] text-center text-white font-semibold">{cartItems.reduce((a, c) => a + c.qty, 0)}</div>}
            </div>
            <div>
              <Link to="/login" className="flex flex-row items-center gap-[4px]">
                <FaUser />
                Sign In
              </Link>
            </div>
            <div>
              {userInfo ? (
                <>
                  <div className="relative">
                    <button onClick={() => setOpenUserMenu(!openUserMenu)} className="w-[100px] h-8 rounded-full">
                      {userInfo.name}
                    </button>
                    {openUserMenu && (
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
            <div>
              {userInfo && userInfo.isAdmin && (
                <div className="relative">
                  <button onClick={() => setOpenAdminMenu(!openAdminMenu)} className="w-[100px] h-8 rounded-full">
                    Admin
                  </button>
                  {openAdminMenu && (
                    <div className="absolute right-0 mt-3 w-[200px] bg-white shadow-lg shadow-gray-300 flex flex-col items-start">
                      <Link to="/admin/productlist">Products</Link>
                      <Link to="/admin/orderlist">Orders</Link>
                      <Link to="/admin/userlist">Users</Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
