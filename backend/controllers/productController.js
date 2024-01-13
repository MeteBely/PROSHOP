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

export { getProducts, getProductById };
