import React from "react";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">About ShopEase</h1>
      <p className="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
        ShopEase is your one-stop destination for quality grocery and e-commerce products. We’re committed to delivering an easy, fast, and secure shopping experience from the comfort of your home. Our vision is to simplify everyday shopping with technology and trust.
      </p>

      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Our Mission</h2>
          <p className="text-gray-600">
            To provide a seamless shopping platform with top-notch service, authentic products, and timely delivery — improving lives through convenience and innovation.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Why Choose Us</h2>
          <ul className="list-disc ml-5 text-gray-600 space-y-1">
            <li>Wide range of groceries and products</li>
            <li>Easy OTP-based user login</li>
            <li>Secure payment & fast delivery</li>
            <li>Responsive customer support</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
