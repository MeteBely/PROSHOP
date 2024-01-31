import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserListPage = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const res = await deleteUser(id);
        refetch();
        toast.success(res.data.message);
      } catch (err) {
        toast.error(err?.message);
      }
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loadingDelete && <Loader />}
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
                NAME
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                EMAIL
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                ADMIN
              </th>
              <th scope="col" className="px-6 py-3 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{user._id}</td>
                <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</td>
                <td className="px-6 py-4 text-center">
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td className="px-6 py-4 flex justify-center">{user.isAdmin ? <FaCheck style={{ color: 'green' }} className="mx-auto" /> : <FaTimes className="mx-auto" style={{ color: 'red' }} />}</td>
                <td className="px-6 py-4">
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <FaEdit />
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => deleteHandler(user._id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserListPage;
