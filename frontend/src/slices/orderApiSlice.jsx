import { ORDERS_URL, STRIPE_URL } from '../constants';
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
    getMyOrders: builder.query({
      query: () => ({
        //protect ile zaten kullanıcının bilgilerini ilettiğimiz için buradan id göndermemize gerek yok.
        url: `${ORDERS_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),
    getStripeClientId: builder.query({
      //getstripelclientıd'li fonksiyon oluşturduk ve stripeurl'e istek atıp id'yi aldık.
      query: () => ({
        url: STRIPE_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT',
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation, useGetMyOrdersQuery, useGetStripeClientIdQuery, useGetOrdersQuery, useDeliverOrderMutation } = ordersApiSlice;
