import asyncHandler from '../middleware/asyncHandler.js';
import productModel from '../models/productModel.js';

// @desc Fetch all products
// @route GET /api/products
//  @Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await productModel.find({});
  res.json(products);
});

// @desc Fetch a product
// @route GET /api/product/:id
//  @Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await productModel.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc create  product
// @route POST /api/products
//  @Private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = await new productModel({
    user: req.user._id,
    name: 'Sample Name',
    price: 0,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc update product
// @route PUT /api/products/:id
//  @Private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;
  const product = await productModel.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Resources not found');
  }
});

export { getProducts, getProductById, createProduct, updateProduct };
