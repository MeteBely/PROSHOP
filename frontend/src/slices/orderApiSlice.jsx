import { ORDERS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: details,
      }),
    }),
    // getStripeClientId: builder.query({
    //   query: () => ({
    //     url: STRIPE_URL,
    //   }),
    //   keepUnusedDataFor: 5,
    // }),
    //getpaypalclientıd'li fonksiyon oluşturduk ve paypalurl'e istek atıp id'yi aldık.
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation } = ordersApiSlice;
