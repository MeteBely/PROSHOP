import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
const Product = ({ product }) => {
  return (
    <div className="flex flex-col gap-2 text-center w-[300px] h-[400px] shadow-[0px_2px_4px_3px_#00000026] rounded-[4px]">
      <div className=" p-4">
        <Link to={`/product/${product._id}`}>
          <img className="rounded-[4px]" src={product.image} alt="" />
        </Link>
      </div>
      <div className="mx-[35px] h-[2.5em]">
        <Link to={`/product/${product._id}`} className="">
          <p className="underline text-left font-semibold truncate">{product.name}</p>
        </Link>
      </div>

      <div className="ml-[30px]">
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      </div>

      <div className="ml-[35px]">
        <p className="text-[22px] text-left font-bold text-[#707D7E]">${product.price}</p>
      </div>
    </div>
  );
};

export default Product;
