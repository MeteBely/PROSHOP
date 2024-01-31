import asyncHandler from '../middleware/asyncHandler.js';
import productModel from '../models/productModel.js';

// @desc Fetch all products
// @route GET /api/products
//  @Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 2;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};

  const count = await productModel.countDocuments({ ...keyword });

  const products = await productModel
    .find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

// @desc delete product
// @route DELETE /api/products/:id
//  @Private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await productModel.findById(req.params.id);
  if (product) {
    await productModel.deleteOne({ _id: product._id });
    res.status(200).json({ message: 'Product deleted successfully' });
  } else {
    res.status(404);
    throw new Error('Resources not found');
  }
});

// @desc create product review
// @route DELETE /api/products/:id/reviews
//  @Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await productModel.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString()); //reviews adlı dizi içerisindeki objeleri teker teker dönüyoruz.
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Resources not found');
  }
});

// @desc get top rating product
// @route GET /api/product/top
//  @Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await productModel.find({}).sort({ rating: -1 }).limit(3);
  res.status(200).json(products);
});

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview, getTopProducts };
