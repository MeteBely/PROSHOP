import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUpdateUserMutation, useGetUserDetailsQuery } from '../../slices/usersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';

const UserEditPage = () => {
  const { id: userId } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        userId,
        name,
        email,
        isAdmin,
      });
      toast.success('User updated successfully');
      refetch();
      navigate('/admin/userlist');
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <>
      <Link to="/admin/userlist">Go Back</Link>
      <h1>Edit User</h1>
      {loadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message text={error} />
      ) : (
        <form action="" onSubmit={(e) => submitHandler(e)}>
          <div className="flex flex-col my-2">
            <label htmlFor="name">Name</label>
            <input type="text" value={name} placeholder="Enter name" id="name" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="email">Email</label>
            <input type="email" value={email} placeholder="Enter email" id="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="isAdmin">Admin</label>
            <input type="checkbox" checked={isAdmin} id="isAdmin" onChange={(e) => setIsAdmin(e.target.checked)} />
          </div>
          <div>
            <button type="submit">Update</button>
          </div>
        </form>
      )}
    </>
  );
};

export default UserEditPage;
