import { FaShoppingCart } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { TbSquareRoundedLetterP } from 'react-icons/tb';
import { Link } from 'react-router-dom';
const Header = () => {
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
          <div className="flex flex-row gap-4">
            <Link to="/cart" className="flex flex-row items-center gap-[4px]">
              <FaShoppingCart />
              Cart
            </Link>
            <Link to="/login" className="flex flex-row items-center gap-[4px]">
              <FaUser />
              Sign In
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
