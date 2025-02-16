import React, { useState } from 'react';
import { FaFacebook, FaTwitterSquare, FaWhatsappSquare } from "react-icons/fa"; 
import emailjs from 'emailjs-com';

const ContactUs = () => {

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: 'support@cvauction02.com', 
    };

    emailjs.send('service_46jxtzn', 'template_0aity8o', templateParams, 'wHCJh-hnYlMhtRlve')
      .then((response) => {
        alert('Thank you for reaching out! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('Failed to send your message. Please try again.');
      });
  };

  return (
    <section className="container-fluid d-flex flex-column min-vh-100 px-4 py-3">
      <header className="text-center py-4 bg-white shadow-sm border-bottom">
        <div className="container">
          <img src="/images/CV_AUCTION_HQ_LOGO (1).png" className="img-fluid" alt="logo" width="30%" />
        </div>
      </header>

      <div className="container py-5">
        <h2 className="text-center mb-4">Contact Us</h2>
        <div className="row">
          <div className="col-12 col-md-6">
            <h5>Our Contact Information</h5>
            <p><strong>Phone:</strong> +91 7514862125</p>
            <p><strong>Email:</strong> support@cvauction02.com</p>
            <p><strong>Address:</strong> 123 Commercial Ave, City, Country</p>

            <h5 className="mt-4">Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook style={{ width: '24px', height: '24px', marginRight: '8px' }} /> Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitterSquare style={{ width: '24px', height: '24px', marginRight: '8px' }} /> Twitter
                </a>
              </li>
              <li>
                <a href="https://Whatsapp.com" target="_blank" rel="noopener noreferrer">
                  <FaWhatsappSquare style={{ width: '24px', height: '24px', marginRight: '8px', color: 'green' }} /> WhatsApp
                </a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-6">
            <h5>Contact Form</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>

      <footer className="bg-dark text-white text-center py-3 mt-auto w-100">
        <p className="mb-0">
          <strong>© 2025 cvauction.tech All rights reserved in favour of CV Auction Tech Ltd.</strong>
        </p>
      </footer>
    </section>
  );
};

export default ContactUs;
