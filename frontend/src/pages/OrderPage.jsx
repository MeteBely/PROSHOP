import { Link, useParams } from 'react-router-dom';
import Message from '../components/Message.jsx';
import Loader from '../components/Loader.jsx';
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetStripeClientIdQuery, useDeliverOrderMutation } from '../slices/orderApiSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';

const OrderPage = () => {
  const { id: orderId } = useParams();
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

  const { userInfo } = useSelector((state) => state.auth);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const { data: stripeId, isLoading: loadingStripe, error: errorStripe } = useGetStripeClientIdQuery();

  // useEffect(() => {
  //   if (!errorStripe && !loadingStripe && stripe.clientId) {
  //     const loadStripeScript = async(() => {
  //       //documentse göre
  //     });
  //   }
  // }, [order, stripe]);

  const makePayment = async () => {
    const stripe = await loadStripe(stripeId);
    const res = await payOrder({ orderId, details: order.orderItems });

    const result = stripe.redirectToCheckout({
      sessionId: res.data.id,
    });
    if (result.error) {
      console.log(result.error);
    }
  };

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch(); //anlık olarak sonuç almamızı sağlar.
      toast.success('Order delivered!');
    } catch (error) {
      toast.error(error?.message);
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
        {loadingDeliver && <Loader />}

        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && <button onClick={deliverOrderHandler}>Mark As Delivered</button>}
      </div>
    </>
  );
};

export default OrderPage;
