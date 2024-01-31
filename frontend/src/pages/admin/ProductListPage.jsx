import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productsApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Paginate from '../../components/Paginate';

const ProductListPage = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({ pageNumber });
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete')) {
      try {
        const res = await deleteProduct(id);
        refetch();
        toast.success(res.data.message);
      } catch (err) {
        toast.error(err?.message);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create new product?')) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.message);
      }
    }
  };
  return (
    <>
      <div className="flex flex-row justify-around">
        <div>
          <h1>Products</h1>
        </div>
        <div>
          <button onClick={createProductHandler} className="flex items-center">
            <FaEdit /> Create Products
          </button>
        </div>
      </div>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message text={error} />
      ) : (
        <>
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
                  PRICE
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  CATEGORY
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  BRAND
                </th>
                <th scope="col" className="px-6 py-3 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{product._id}</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.name}</td>
                  <td className="px-6 py-4 text-center">${product.price}</td>
                  <td className="px-6 py-4 text-center">{product.category}</td>
                  <td className="px-6 py-4 flex justify-center">{product.brand}</td>
                  <td className="px-6 py-4">
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <FaEdit />
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => deleteHandler(product._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListPage;
