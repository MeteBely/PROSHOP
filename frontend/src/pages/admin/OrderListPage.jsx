import { useGetOrdersQuery } from '../../slices/orderApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const OrderListPage = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message text={error} />
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                USER
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
            {orders.map((order) => (
              <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{order._id}</td>
                <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{order.user && order.user.name}</td>
                <td className="px-6 py-4 text-center">{order.createdAt.substring(0, 10)}</td>
                <td className="px-6 py-4 text-center">${order.totalPrice}</td>
                <td className="px-6 py-4 flex justify-center">{order.isPaid ? order.paidAt.substring(0, 10) : <FaTimes className="mx-auto" style={{ color: 'red' }} />}</td>
                <td className="px-6 py-4 ">{order.isDelivered ? order.deliveredAt.substring(0, 10) : <FaTimes className="mx-auto" style={{ color: 'red' }} />}</td>
                <td className="px-6 py-4">
                  <Link to={`/order/${order._id}`}>Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default OrderListPage;
