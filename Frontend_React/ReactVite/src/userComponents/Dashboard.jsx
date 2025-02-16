import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsPersonCircle } from "react-icons/bs";
import { data, useNavigate } from "react-router-dom";
import PaymentPlans from "./PaymentPlans";
import axios from "axios";
import config from "../config";

function Dashboard() {
  const URL = config.API_URL;
  var id = JSON.parse(localStorage.getItem("user")).uid;


  const [serverTime, setServerTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [showModal, setShowModal] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [wins, setWins] = useState();
  const [username,setUsername] = useState("User01");

  const [userInfo, setUserInfo] = useState({
    name: "Admin1",
    email: "admin1@cvauction.com",
    role: "Administrator",
  });

  const [userObject, setUserObject] = useState({
    securityAmount: 10000,
    limit: 0,
    bidperVehicle: 10,
    pending: 300000,
    packActive: false,
    planStart: new Date().toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
    }),
  });

  const miniInfo = async () => {
    const response = await axios.get(`${URL}/user/${id}`)
    const newInfo = {
      name: `${response.data.ufirstName}   ${response.data.ulastName}`,
      email: response.data.uemail,
      role: response.data.role,
    }
    setUsername(response.data.ufirstName + " " + response.data.ulastName);
    setUserInfo(newInfo);
  }
  const fillPaymentInfo = (vehicleClaim) => {
    navigate("/claim", { state: vehicleClaim });
  };

  const navigate = useNavigate();

  const handleAuctionsClick = () => {
    setActiveTab("Auctions");
    navigate("/auction");
  };

  const handleAboutusClick = () => {
    navigate("/about-us");
  };

  const handleProfileClick = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  const handlelogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleContactUsClick = () => {
    navigate("/contactus");
  };
  const handleCloseModal = () => setShowModal(false);
  const handleCustomerFeedbackClick = () => navigate("/customer-rating");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if(user == null){
      navigate("/");
    }
    miniInfo();
    const interval = setInterval(() => {
      setServerTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);



  useEffect(() => {
    axios
      .get(`${URL}/userdashboard/${id}`)
      .then((response) => {
        console.log(response.data);
        const o = {
          securityAmount: data.securityAmount,
          limit: data.limit,
          bidperVehicle: 10,
          pending: data.pending,
          packActive: data.pending,
          planStart: data.planStart,
        };
        setUserObject(response.data);
      })
      .catch((error) => {
        console.error("Error fetching metrics data:", error);
      });
    getWins();
  }, []);

  const getWins = async () => {
    const response = await axios.get(`${URL}/myWins/${id}`);
    console.log(response.data);
    setWins(response.data);
  };

  return (
    <div className="container-fluid d-flex flex-column min-vh-100 px-4 py-3">
      <header className="d-flex justify-content-between align-items-center p-3 bg-white shadow-sm w-100">
        <div className="d-flex align-items-center">
          <img
            src="/images/CV_AUCTION_HQ_LOGO (1).png"
            className="img-fluid"
            alt="logo"
            style={{ width: "180px" }}
          />
          <div className="ms-3">
            <p className="fw-bold mb-0 text-primary">Welcome, {username}</p>

            <small className="text-muted">
              {serverTime.toLocaleDateString("en-IN", {
                timeZone: "Asia/Kolkata",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </small>
            
          </div>
        </div>

        <div className="d-flex align-items-center">
          <span className="fw-bold me-3">
            Server Time:{" "}
            <span className="badge bg-light text-dark">
              {serverTime.toLocaleTimeString("en-IN", {
                timeZone: "Asia/Kolkata",
              })}
            </span>
          </span>
          <span
            className="text-primary fw-bold me-3"
            style={{ cursor: "pointer" }}
            onClick={handleAboutusClick}
          >
            <u>About Us</u>
          </span>
          <span
            className="text-primary fw-bold me-3"
            style={{ cursor: "pointer" }}
            onClick={handleProfileClick}
          >
            <BsPersonCircle size={25} className="me-1" />
          </span>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={handlelogout}
          >
            Logout
          </button>
        </div>
      </header>
      <br />

      {showProfilePopup && (
        <div
          className="position-absolute bg-white shadow-lg p-4 w-25"
          style={{
            top: "60px",
            right: "10px",
            zIndex: 9999,
            transition: "transform 0.3s ease-in-out",
            borderRadius: "10px",
          }}
        >
          <button
            className="btn-close position-absolute top-0 end-0"
            onClick={() => setShowProfilePopup(false)}
          ></button>
          <h4 className="text-center">User Profile</h4>
          <div className="mt-4">
            <p>
              <strong>Name:</strong> {userInfo.name}
            </p>
            <p>
              <strong>Email:</strong> {userInfo.email}
            </p>
            <p>
              <strong>Role:</strong> {userInfo.role}
            </p>
            <p>
              <strong>Status:</strong> Active
            </p>
          </div>
        </div>
      )}

      <nav className="py-2">
        <div className="container d-flex flex-wrap">
          {["Dashboard", "My Wins", "Auctions", "Payments"].map(
            (item, index) => (
              <button
                key={index}
                className={`btn ${
                  activeTab === item ? "btn-danger" : "btn-outline-secondary"
                } me-2 mb-2`}
                onClick={() =>
                  item === "Auctions"
                    ? handleAuctionsClick()
                    : setActiveTab(item)
                }
              >
                {item}
              </button>
            )
          )}
        </div>
      </nav>

      {activeTab === "Dashboard" && (
        <div className="container-fluid d-flex flex-column min-vh-100 px-4 py-3">
          <div className="row">
            <div className="col-md-8">
              <div className="row g-4">
                {[
                  {
                    label: "Security Amount",
                    value: userObject.securityAmount,
                    color: "text-success",
                  },
                  {
                    label: "Vehicle Limit",
                    value: userObject.limit,
                    color: "text-primary",
                  },
                  { label: "Bid Per Vehicle", value: 10, color: "text-info" },
                  {
                    label: "Pending Bill",
                    value: userObject.pending,
                    color: "text-danger",
                  },
                  {
                    label: "Your Package",
                    value: userObject.packActive ? "Active" : "Expired",
                    color: userObject.packActive
                      ? "text-success"
                      : "text-danger",
                  },
                  {
                    label: "Plan Started on",
                    value: userObject.planStart,
                    color: "text-secondary",
                  },
                ].map((metric, index) => (
                  <div className="col-md-4" key={index}>
                    <div className="card shadow-sm text-center p-4 border-0">
                      <p className="text-secondary fw-semibold mb-1">
                        {metric.label}
                      </p>
                      <h5 className={`fw-bold ${metric.color}`}>
                        {metric.value}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm p-4 border-0 mb-4">
                <h6 className="fw-bold text-primary">Quick Links</h6>
                <ul className="list-unstyled">
                  {["Contact Us", "Customer Feedback"].map((link, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-decoration-none text-primary fw-semibold d-block py-1"
                        onClick={
                          link === "Contact Us"
                            ? handleContactUsClick
                            : handleCustomerFeedbackClick
                        }
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "My Wins" && (
        <div className="container-fluid px-4 py-3">
          <h5 className="text-primary">My Wins</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Brand Name</th>
                <th>Vehicle Name</th>
                <th>Register Number</th>
                <th>Final Amount</th>
                <th>Pay</th>
              </tr>
            </thead>
            <tbody>
              {wins.map((win, index) => (
                <tr key={index}>
                  <td>{win.brandName}</td>
                  <td>{win.modelName}</td>
                  <td>{win.registerNo}</td>
                  <td>{win.bidAmount}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => fillPaymentInfo(win)}
                    >
                      Claim
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "Payments" && (
        <div className="text-center fw-bold text-primary fs-4">
          <PaymentPlans />
        </div>
      )}

      <footer className="bg-dark text-white text-center py-3 mt-auto w-100">
        <p className="mb-0">
          © 2025 cvauction.tech All rights reserved in favour of CV Auction Tech
          Ltd.
        </p>
      </footer>
    </div>
  );
}
export default Dashboard;
