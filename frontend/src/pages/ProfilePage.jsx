import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../slices/usersApiSlice.jsx';
import { setCredentials } from '../slices/authSlice.jsx';
import { useGetMyOrdersQuery } from '../slices/orderApiSlice.jsx';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email]);

  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
  const { data: myOrders, isLoading: loadingMyOrders, error } = useGetMyOrdersQuery();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const res = await updateProfile({ _id: userInfo._id, name, email, password }).unwrap();
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (error) {
        toast.error(error?.data?.message);
      }
    } else {
      toast.error("Passwords doesn't match!");
    }
  };

  return (
    <div className="flex flex-row">
      <div>
        {/*FİRST COL  */}
        <form onSubmit={submitHandler}>
          <div className="flex flex-col my-2">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="password">Password</label>
            <input autoComplete="on" type="password" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input autoComplete="on" type="password" id="confirmPassword" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <div className="flex flex-col my-2">
            <button type="submit" className="bg-[#364256]">
              Update
            </button>
            {loadingUpdateProfile && <Loader />}
          </div>
        </form>
      </div>
      <div>
        {/*SECOND COL  */}
        <h2>My Orders</h2>
        {loadingMyOrders ? (
          <Loader />
        ) : error ? (
          <Message text={error?.data?.message} />
        ) : (
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    DATE
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    TOTAL
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    PAID
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    DELIVERED
                  </th>
                  <th scope="col" className="px-6 py-3 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map((order) => (
                  <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{order._id}</td>
                    <td className="px-6 py-4 text-center">{order.createdAt.substring(0, 10)}</td>
                    <td className="px-6 py-4 text-center">${order.totalPrice}</td>
                    <td className="px-6 py-4 ">{order.isPaid ? order.paidAt.substring(0, 10) : <FaTimes className="mx-auto" style={{ color: 'red' }} />}</td>
                    <td className="px-6 py-4 ">{order.isDelivered ? order.deliveredAt.substring(0, 10) : <FaTimes className="mx-auto" style={{ color: 'red' }} />}</td>
                    <td className="px-6 py-4">
                      <Link to={`/order/${order._id}`}>Details</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
