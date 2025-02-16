import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginAndRegisterService from "./services/LoginAndRegisterService";
import { useNavigate } from "react-router-dom";
import LandingPage from "./services/LandingPage";
import UserService from "./services/UserService";

function Frontpage() {
  
  const [activeSection, setActiveSection] = useState("live");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [liveAuction, setLiveAuction] = useState([]);
  const [upcomingAuction, setUpcomingAuction] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getLive();
    getUpcoming();
  }, []);

  const getLive = async () => {
    try {
      const response = await LandingPage.getLiveAuction();
      if (Array.isArray(response.data)) {
        const liveData = await Promise.all(
          response.data.map(async (item) => {
            const nameAndBrand = await UserService.getNameAndBrand(
              item.vehicleid
            );
            return { ...item, nameAndBrand };
          })
        );
        setLiveAuction(liveData);
      }
    } catch {
      console.log("Error in getting live auction data");
    }
  };

  const getUpcoming = () => {
    LandingPage.getUpcomingAuction()
      .then((response) => {
        if (Array.isArray(response.data)) {
          setUpcomingAuction(response.data);
        }
      })
      .catch(() => {
        console.log("Error in getting upcoming auction data");
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");
    const userData = { Uemail: email, Upwd: password };

    LoginAndRegisterService.loginUser(userData)
      .then((data) => {
        if (data && data.role) {
          console.log("Role returned:", data.role);
          if (data.role === "ADMIN") {
            localStorage.setItem("admin", JSON.stringify(data));
            navigate("/admin-dashboard");
          } else if (data.role === "Customer") {
            localStorage.setItem("user", JSON.stringify(data));
            navigate("/dashboard");
          } else {
            setError("Invalid role returned from server.");
          }
        } else {
          setError("Invalid login details or server error.");
        }
      })
      .catch((error) => {
        setError("Login request failed: " + error.message);
      });
  };

  const handleSignUp = () => {
    navigate("/registration");
  };

  return (
    <div className="container-fluid d-flex flex-column min-vh-100 px-4 py-3">
      <header className="text-center py-4 bg-white shadow-sm border-bottom">
        <div className="container">
          <img
            src="/images/CV_AUCTION_HQ_LOGO (1).png"
            className="img-fluid"
            alt="logo"
            width="30%"
          />
        </div>
      </header>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="d-flex justify-content-center gap-3 mb-2">
              <button
                className={`btn ${
                  activeSection === "live" ? "btn-danger" : "btn-outline-danger"
                } px-4 py-2 fw-bold`}
                onClick={() => setActiveSection("live")}
              >
                Live Auction
              </button>
              <button
                className={`btn ${
                  activeSection === "upcoming"
                    ? "btn-danger"
                    : "btn-outline-danger"
                } px-4 py-2 fw-bold`}
                onClick={() => setActiveSection("upcoming")}
              >
                Upcoming Auction
              </button>
            </div>

            <div
              className="border rounded-3 p-4 bg-white shadow-sm overflow-auto"
              style={{ maxHeight: "360px" }}
            >
              {activeSection === "live" ? (
                <div>
                  <h5 className="text-danger">Live Auction Content</h5>
                  <ul className="list-group">
                    {liveAuction.length > 0 ? (
                      liveAuction.map((item, index) => (
                        <li className="list-group-item" key={index}>
                          <a
                            href="/vehicle-list/live-auction"
                            className="text-decoration-none text-dark"
                          >
                            {item.nameAndBrand} BasePrice: {item.basePrice} -
                            End Date:{" "}
                            {new Date(item.auctionEnd).toLocaleDateString()},
                            highestBid: {item.highestBid}
                          </a>
                        </li>
                      ))
                    ) : (
                      <li className="list-group-item">
                        No live auctions available
                      </li>
                    )}
                  </ul>
                </div>
              ) : (
                <div>
                  <h5 className="text-danger">Upcoming Auction Content</h5>
                  <ul className="list-group">
                    {upcomingAuction.length > 0 ? (
                      upcomingAuction.map((item, index) => (
                        <li className="list-group-item" key={index}>
                          <a
                            href="/vehicle-list/upcoming-auction"
                            className="text-decoration-none text-dark"
                          >
                            BasePrice: {item.basePrice} - Start:{" "}
                            {new Date(item.auctionStart).toLocaleDateString()} -
                            End:{" "}
                            {new Date(item.auctionEnd).toLocaleDateString()}
                          </a>
                        </li>
                      ))
                    ) : (
                      <li className="list-group-item">
                        No upcoming auctions available
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="col-md-4 mt-5">
            <div className="border rounded-3 p-4 bg-white shadow-sm">
              <h5 className="text-center mb-4">Login</h5>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="userId" className="form-label">
                    User Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="userId"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your user ID"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-3">
                  Log In
                </button>
                <button
                  type="button"
                  className="btn btn-success w-100"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
                <p className="text-end mt-2">
                  <button
                    type="button"
                    className="btn btn-link text-blue"
                    onClick={() => navigate("/forgot")}
                  >
                    Forgot Password?
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5 text-center p-4 bg-white shadow-sm rounded-3">
        <h5 className="text-danger">Contact Us 📞</h5>
        <p>
          <strong>Helpline Number:</strong> 7020700000
        </p>
        <p>
          <strong>Email:</strong> cvauction02@gmail.com
        </p>
      </div>

      <footer className="bg-dark text-white text-center py-3 mt-auto w-100">
        <p className="mb-0">
          <strong>
            © 2024 cvauction.com. All rights reserved in favour of CV Auction
            Tech Ltd.
          </strong>
        </p>
      </footer>
    </div>
  );
}

export default Frontpage;