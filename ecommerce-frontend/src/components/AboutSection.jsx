import React from 'react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <section className=" text-white py-20">
      <div className="max-w-screen-xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">About Us</h2>
        <p className="text-lg text-center mb-8">
          Welcome to PrismTech! We are passionate about providing the best laptops at unbeatable prices.
          Whether you're a student, a professional, or a gaming enthusiast, we have something for everyone.
          Our goal is to offer high-quality products with excellent customer service.
        </p>
        <div className='flex justify-center'>
          <Link to={"/shopping-cart"}>
            <button className='bg-blue-900 p-3 font-bold rounded-md text-gray-300'>Explore Our Products</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
