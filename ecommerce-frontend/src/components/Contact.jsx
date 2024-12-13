import React from 'react';

const ContactSection = () => {
  return (
    <section className=" text-white py-20">
      <div className="max-w-screen-xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-900">Contact Us</h2>
        <p className="text-lg text-center mb-8">
          Have any questions? Feel free to reach out to us. We are here to help!
        </p>
        <div className="flex justify-center gap-8">
          <a
            href="mailto:sreenands93@gmail.com"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all"
          >
            Email Us
          </a>
          <a
            href="https://www.linkedin.com/in/sreenand-s-9b2716292/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-all"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
