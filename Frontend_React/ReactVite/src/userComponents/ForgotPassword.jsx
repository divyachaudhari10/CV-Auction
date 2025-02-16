import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import axios from 'axios';

function ForgotPassword() {
  const URL = config.API_URL;

  const [Uemail, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [gototp, setgotOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const sendOtp = async () => {
    try {
      const response = await axios.post(`${URL}/user/${Uemail}`);
      console.log(response.data);
      setgotOtp(response.data.otp);
      setShowOtpForm(true);
      setError('');
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const validateOtp = () => {
    if (Number.parseInt(otp) === Number.parseInt(gototp)) {
      setShowPasswordForm(true);
      setError(''); 
    } else {
      setError('Invalid OTP.');
    }
  };

  const updatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const userdata = {
      Uemail: Uemail,
      Upwd: newPassword,
    }

    console.log(userdata);

    try {
      const response = await axios.post(`${URL}/changepass` , userdata);
      console.log(response);
      if (response.data.success) {
        setMessage('Password updated successfully!');
        setEmail('');
        setOtp('');
        setNewPassword('');
        setConfirmPassword('');
        setShowOtpForm(false);
        setShowPasswordForm(false);
      } else {
        setError('Failed to update password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while updating the password. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Forgot Password</h2>

          {/* Email Input Form */}
          {!showOtpForm && (
            <div className="card p-4 shadow-sm">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Enter your Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={Uemail}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                />
              </div>
              <button type="button" className="btn btn-primary w-100" onClick={sendOtp}>Send OTP</button>
            </div>
          )}

          {/* OTP Input Form */}
          {showOtpForm && (
            <div className="card p-4 shadow-sm mt-4">
              <div className="mb-3">
                <label htmlFor="otp" className="form-label">Enter OTP</label>
                <input
                  type="text"
                  className="form-control"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="OTP"
                />
              </div>
              <button type="button" className="btn btn-primary w-100" onClick={validateOtp}>Validate OTP</button>
            </div>
          )}

          {/* New Password Form */}
          {showPasswordForm && (
            <div className="card p-4 shadow-sm mt-4">
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
              </div>
              <button type="button" className="btn btn-primary w-100" onClick={updatePassword}>Update Password</button>
            </div>
          )}

          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {message && <div className="alert alert-success mt-3">{message}</div>}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
