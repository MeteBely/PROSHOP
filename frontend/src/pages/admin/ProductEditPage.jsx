import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUpdateProductMutation, useGetProductDetailsQuery, useUploadProductImageMutation } from '../../slices/productsApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setDescription(product.description);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setCategory(product.category);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      productId,
      name,
      price,
      image,
      description,
      countInStock,
      brand,
      category,
    };
    const result = await updateProduct(updatedProduct);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Product successfuly updated!');
      navigate('/admin/productlist');
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <>
      <Link to="/admin/productlist">Go Back</Link>
      <h1>Edit Product</h1>
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
            <label htmlFor="price">Price</label>
            <input type="number" value={price} placeholder="Enter price" id="price" onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="image">Image</label>
            <input type="text" value={image} placeholder="Enter image url" id="image" onChange={(e) => setImage(e.target.value)} />
            <input type="file" label="Choose file" id="" onChange={uploadFileHandler} />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="brand">Brand</label>
            <input type="text" value={brand} placeholder="Enter brand" id="brand" onChange={(e) => setBrand(e.target.value)} />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="countInStock">Count In Stock</label>
            <input type="number" value={countInStock} placeholder="Enter count in stock" id="countInStock" onChange={(e) => setCountInStock(e.target.value)} />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="category">Category</label>
            <input type="text" value={category} placeholder="Enter category" id="category" onChange={(e) => setCategory(e.target.value)} />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="description">Description</label>
            <input type="text" value={description} placeholder="Enter description" id="description" onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <button type="submit">Update</button>
          </div>
        </form>
      )}
    </>
  );
};

export default ProductEditPage;
