import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-200 py-4 text-center text-gray-600">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} FitLife. All rights reserved.</p>

      </div>
      <div className='flex justify-center mt-2'>
        <a href="/privacy-policy" className="text-gray-600 hover:text-gray-800 mx-2">Privacy Policy</a>
        <a href="/terms-of-service" className="text-gray-600 hover:text-gray-800 mx-2">Terms of Service</a>
        <a href="/contact-us" className="text-gray-600 hover:text-gray-800 mx-2">Contact Us</a>
        <a href="/about-us" className="text-gray-600 hover:text-gray-800 mx-2">About Us</a>
      </div>
      
    </footer>
  );
}

export default Footer;