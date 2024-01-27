import asyncHandler from '../middleware/asyncHandler.js';
import orderModel from '../models/orderModel.js';
import stripe from 'stripe';
const stripeInstance = stripe('sk_test_51Od8nZEh4r18sSvB0IaosaPCBUBe9AxL0HxBtDLnD6kcWsjK1AToenXbCOYV2DfvAlUySR5jCExLhPKLxIBNsQue00rpAwb48O');

// @desc Create new order
// @route POST /api/orders
//  @Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new orderModel({
      orderItems: orderItems?.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc Get logged in user orders
// @route GET /api/orders/myorders
//  @Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderModel.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc Get order by Id
// @route GET /api/orders/:id
//  @Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await orderModel.findById(req.params.id).populate('user', 'name email');
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc update order to paid
// @route PUT /api/orders/:id/pay
//  @Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await orderModel.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // order.paymentResult = {
    //   id: req.body.id,
    //   status: req.body.status,
    //   update_time: req.body.update_time,
    //   email_address: req.body.email_address,
    // };
    const updatedOrder = await order.save();
    // res.status(200).json(updatedOrder);
    const products = req.body;
    try {
      const lineItems = products.map((product) => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              images: [`../../frontend/public${product.image}`],
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: product.qty,
        };
      });
      const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel',
      });

      res.json({ id: session.id });
    } catch (error) {
      console.error('Error creating Stripe Checkout session:', error);
      res.status(500).json({ error: 'Failed to create Stripe Checkout session' });
    }
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc update order to delivered
// @route PUT /api/orders/:id/deliver
//  @Private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('updateOrderToDelivered');
});

// @desc Get all orders
// @route GET /api/orders
//  @Private/admin
const getOrders = asyncHandler(async (req, res) => {
  res.send('getOrders');
});

export { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders };
