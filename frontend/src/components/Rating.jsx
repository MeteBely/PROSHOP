import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import React from 'react';

const Rating = ({ value, text }) => {
  return (
    <div className="flex flex-row">
      <span className="m-[0.1rem]">{value >= 1 ? <FaStar color="#f8e825" /> : value >= 0.5 ? <FaStarHalfAlt color="#f8e825" /> : <FaRegStar color="#f8e825" />}</span>
      <span className="m-[0.1rem]">{value >= 2 ? <FaStar color="#f8e825" /> : value >= 1.5 ? <FaStarHalfAlt color="#f8e825" /> : <FaRegStar color="#f8e825" />}</span>
      <span className="m-[0.1rem]">{value >= 3 ? <FaStar color="#f8e825" /> : value >= 2.5 ? <FaStarHalfAlt color="#f8e825" /> : <FaRegStar color="#f8e825" />}</span>
      <span className="m-[0.1rem]">{value >= 4 ? <FaStar color="#f8e825" /> : value >= 3.5 ? <FaStarHalfAlt color="#f8e825" /> : <FaRegStar color="#f8e825" />}</span>
      <span className="m-[0.1rem]">{value >= 5 ? <FaStar color="#f8e825" /> : value >= 4.5 ? <FaStarHalfAlt color="#f8e825" /> : <FaRegStar color="#f8e825" />}</span>
      <span className="text-[0.8rem] font-semibold ml-[0.5rem]">{text && text}</span>
    </div>
  );
};

export default Rating;
