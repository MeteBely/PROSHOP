import { Link, useParams } from 'react-router-dom';
import Message from '../components/Message.jsx';
import Loader from '../components/Loader.jsx';
import { useGetOrderDetailsQuery, usePayOrderMutation } from '../slices/orderApiSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const OrderPage = () => {
  const { id: orderId } = useParams();
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

  const { userInfo } = useSelector((state) => state.auth);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  // const { data: stripe, isLoading: loadingStripe, error: errorStripe } = useGetStripeClientIdQuery();

  // useEffect(() => {
  //   if (!errorStripe && !loadingStripe && stripe.clientId) {
  //     const loadStripeScript = async(() => {
  //       //documentse göre
  //     });
  //   }
  // }, [order, stripe]);

  const makePayment = async () => {
    const stripe = await loadStripe('pk_test_51Od8nZEh4r18sSvBFR8RkZIc8kP3jyEgfCOM7n611vTKnLVNvj3GLwl53DSdPfSBUG2MThLZ3Mw9RVA5msdy03qk00E6vIfmna');
    const res = await payOrder({ orderId, details: order.orderItems });

    const result = stripe.redirectToCheckout({
      sessionId: res.data.id,
    });
    if (result.error) {
      console.log(result.error);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message />
  ) : (
    <>
      <div className="flex flex-row justify-around">
        <div>
          <h1>Order {order._id}</h1>
          <div>
            <h2>Shipping</h2>
            <p>
              <strong>Name: </strong>
              {order.user.name}
            </p>
            <p>
              <strong>Email</strong>
              {order.user.email}
            </p>
            <p>
              <strong>Address </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country},
            </p>
            {order.isDelivered ? <Message text={`Delivered on ${order.deliveredAt}`} /> : <Message text="Not Delivered" />}
          </div>
          <div>
            <h2>Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? <Message text={`Paid on ${order.paidAt}`} /> : <Message text="Not paid" />}
            <h2>Order Items</h2>
            {order.orderItems.map((item, index) => {
              return (
                <div className="flex flex-row" key={index}>
                  <img className="w-40" src={item.image} alt={item.name} />
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                  <div>
                    {item.qty} x {item.price} = ${item.qty * item.price}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div>
            <h2>Order Summary</h2>
            <div>Items: ${order.itemsPrice}</div>
          </div>
          <div>
            <h2>Shipping</h2>
            <div>${order.shippingPrice}</div>
          </div>
          <div>
            <h2>tax</h2>
            <div>${order.taxPrice}</div>
          </div>
          <div>
            <h2>total</h2>
            <div>${order.totalPrice}</div>
          </div>
          <div>
            <button onClick={makePayment}>TEST ÖDEME YAP</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
