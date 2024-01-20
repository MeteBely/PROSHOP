import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader.jsx';
import { useRegisterMutation } from '../slices/usersApiSlice.jsx';
import { setCredentials } from '../slices/authSlice.jsx';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/'; ///jwt varsa login?redirect=/shipping üzerindeyse /shipping'e, sadece login üzerindeyse /'e gönderir.

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap(); //unwrap promise yapmamızı sağladı.
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <div className="w-2/5 mx-auto flex flex-col justify-center items-start">
      <h1 className="text-[#728285] font-semibold text-[38px]">Sing Up</h1>
      <form action="" onSubmit={(e) => submitHandler(e)}>
        <div className="my-2 flex flex-col items-start justify-center">
          <label className="text-[#728285] font-semibold" htmlFor="name">
            Name
          </label>
          <input className="border border-[#B9BCBC] h-[40px] w-[600px] rounded-lg placeholder:text-[#728285] pl-2" type="text" name="" id="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="my-2 flex flex-col items-start justify-center">
          <label className="text-[#728285] font-semibold" htmlFor="email">
            Email Adress
          </label>
          <input className="border border-[#B9BCBC] h-[40px] w-[600px] rounded-lg placeholder:text-[#728285] pl-2" type="email" name="" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="my-2 flex flex-col items-start justify-center">
          <label className="text-[#728285] font-semibold" htmlFor="password">
            Password
          </label>
          <input className="border border-[#B9BCBC] h-[40px] w-[600px] rounded-lg placeholder:text-[#728285] pl-2" type="password" name="" id="password" placeholder="Enter password" autoComplete="on" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="my-2 flex flex-col items-start justify-center">
          <label className="text-[#728285] font-semibold" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input className="border border-[#B9BCBC] h-[40px] w-[600px] rounded-lg placeholder:text-[#728285] pl-2" type="password" name="" id="confirmPassword" placeholder="Confirm password" autoComplete="on" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <div>
          <button className="mt-2 text-white bg-[#354255] px-4 py-2 rounded-md" type="submit" disabled={isLoading}>
            Register
          </button>
          {isLoading && <Loader />}
        </div>
        <div className="text-[#7F8789] text-[14px] mt-2">
          Already have an account?
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="underline text-[#49515B] ml-2 font-semibold">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
