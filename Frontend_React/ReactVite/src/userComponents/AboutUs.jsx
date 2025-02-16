import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";


const AboutUs = () => {
  return (
    <section className="container-fluid d-flex flex-column min-vh-100 px-4 py-3">
      <header className="text-center py-4 bg-white shadow-sm border-bottom">
        <div className="container">
          <img src="/images/CV_AUCTION_HQ_LOGO (1).png" className="img-fluid" alt="logo" width="30%" />
        </div>
      </header>
      
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
            <h2 className="mb-4 display-5 text-center">About Us</h2>
            <p className="text-secondary mb-5 text-center lead fs-4">
              Our platform was created to address these pain points by providing a dedicated and secure marketplace specifically for commercial vehicles. We aim to offer a comprehensive, transparent, and efficient solution for buying and selling commercial vehicles, with a special focus on auction-based transactions, verified listings, and enhanced fraud prevention measures.
            </p>
            <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row gy-4 gy-lg-0 align-items-lg-center">
          <div className="col-12 col-lg-6">
            <img
              className="img-fluid rounded border border-dark"
              loading="lazy"
              src="/images/truck.jpg"
              alt="About Us"
            />
          </div>
          <div className="col-12 col-lg-6 col-xxl-6">
            <div className="row justify-content-lg-end">
              <div className="col-12 col-lg-11">
                <div className="about-wrapper">
                  <p className="lead mb-4 mb-md-5">
                    In summary, our platform is more than just a marketplace; it is a business-enabler designed to protect both buyers and sellers in the world of commercial vehicle transactions.
                  </p>
                  <div className="row gy-4 mb-4 mb-md-5">
                    <div className="col-12 col-md-6">
                      <div className="card border border-dark">
                        <div className="card-body p-4">
                          <h3 className="display-5 fw-bold text-primary text-center mb-2">370+</h3>
                          <p className="fw-bold text-center m-0">Qualified Experts</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="card border border-dark">
                        <div className="card-body p-4">
                          <h3 className="display-5 fw-bold text-primary text-center mb-2">18k+</h3>
                          <p className="fw-bold text-center m-0">Satisfied Clients</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <h2 className="text-center mb-4">Contact Us</h2>
        <div className="row">
        <div className="col-12 col-md-6">
                <h5>Our Contact Information</h5>
                <p><strong>Phone:</strong> +91 7514862125</p>
                <p><strong>Email:</strong> support@cvauction.com</p>
                <p><strong>Address:</strong> 123 Commercial Ave, City, Country</p>

                <h5 className="mt-4">Follow Us</h5>
                <ul className="list-unstyled">
                  <li>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                      <FaFacebook style={{ width: '24px', height: '24px', marginRight: '8px' }} />Facebook
                      </a>
                  </li>
                  <li>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                      < FaTwitterSquare style={{ width: '24px', height: '24px', marginRight: '8px' }} />Twitter
                    </a>
                  </li>
                  <li>
                    <a href="https://Whatsapp.com" target="_blank" rel="noopener noreferrer">
                      <FaSquareWhatsapp style={{ width: '24px', height: '24px', marginRight: '8px', color: 'green' }} />Whatsapp
                    </a>
                  </li>
                </ul>
              </div>
          <div className="col-12 col-md-6">
            <h5>Contact Form</h5>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Your Name</label>
                <input type="text" className="form-control" id="name" placeholder="Your Name" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input type="email" className="form-control" id="email" placeholder="Your Email" />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea className="form-control" id="message" rows="4" placeholder="Your Message"></textarea>
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

export default AboutUs;
