import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginAndRegisterService from '../services/LoginAndRegisterService';  

function RegistrationForm() {
  const navigate = useNavigate();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [Uname, setUname] = useState('');
  const [Upwd, setUpwd] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [Uemail, setUemail] = useState('');
  const [MobNo, setMobNo] = useState('');
  const [PanCard, setPanCard] = useState('');
  const [Address, setAddress] = useState('');
  const [BankAccNo, setBankAccNo] = useState('');
  const [BankName, setBankName] = useState('');
  const [BankBranch, setBankBranch] = useState('');
  const [BankIFSC, setBankIFSC] = useState('');
  const [AccholdName, setAccholdName] = useState('');
  const [confirmBankAccNo, setconfirmBankAccNo] = useState('');

  function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9]{4,15}$/;
    if (!username) {
      return { isValid: false, message: "Username is required" };
    } else if (!usernameRegex.test(username)) {
      return { isValid: false, message: "Username must be 4-15 characters long and contain only letters and numbers" };
    } else {
      return { isValid: true, message: "" };
    }
  }

  function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!password) {
      return { isValid: false, message: "Password is required" };
    } else if (!passwordRegex.test(password)) {
      return { isValid: false, message: "Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, and one number" };
    } else {
      return { isValid: true, message: "" };
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault(); 

    let isValidUsername = validateUsername(Uname);
    if (!isValidUsername.isValid) {
      document.getElementById('username-error-msg').innerText = isValidUsername.message;
    } else {
      document.getElementById('username-error-msg').innerText = '';
    }

    let isValidPassword = validatePassword(Upwd);
    if (!isValidPassword.isValid) {
      document.getElementById('pass-error-msg').innerText = isValidPassword.message;
    } else {
      document.getElementById('pass-error-msg').innerText = '';
    }

    if (Upwd !== confirmPassword) {
      document.getElementById('confirm-pass-error-msg').innerText = "Passwords do not match";
    } else {
      document.getElementById('confirm-pass-error-msg').innerText = '';
    }

    if (isValidUsername.isValid && isValidPassword.isValid && Upwd === confirmPassword) {
      setIsFormSubmitted(true);
    }
  }

  const handleFinalSubmit = async () => {
    const userData = {
      ufirstName : firstName,
      ulastName : lastName,
      uemail: Uemail,
      mobNo: MobNo,
      panCard: PanCard,
      uname: Uname,
      upwd: Upwd,
      address : Address,
      bankAccNo: BankAccNo,
      bankname: BankName,
      bankBranch: BankBranch,
      accountHolderName: AccholdName,
      ifscCode: BankIFSC,
      confirmBankAccNo: confirmBankAccNo,
      role: "Customer",
      accessStatus: "Active",
    };

    try {
      const response = await LoginAndRegisterService.registerUser(userData); 
      console.log('Data submitted successfully:', response);
      navigate('/package');
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <div className="container-fluid bg-transparent p-5">
      <header className="text-center py-4 bg-white shadow-sm border-bottom mb-4">
        <div className="container">
          <img src="/images/CV_AUCTION_HQ_LOGO (1).png" className="img-fluid" alt="logo" width="30%" />
        </div>
      </header>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg p-4 border-primary rounded-3 mt-4">
            <div className="card-body">
              <div className="text-center mb-4">
                <h1 className="fw-bold">Create your account</h1>
              </div>
              <form id="registration-form" onSubmit={handleFormSubmit}>
                {!isFormSubmitted && (
                  <>
                    <div className="row">
                      <div className="col-12 col-md-6 mb-3">
                        <div className="form-group">
                          <label htmlFor="firstname" className="form-label">First name</label>
                          <input type="text" className="form-control" id="firstname" placeholder="Enter first name" required
                            value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <div className="form-group">
                          <label htmlFor="lastname" className="form-label">Last name</label>
                          <input type="text" className="form-control" id="lastname" placeholder="Enter last name" required
                            value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12 col-md-6 mb-3">
                        <div className="form-group">
                          <label htmlFor="email" className="form-label">Email</label>
                          <input type="email" className="form-control" id="email" placeholder="example@gmail.com" required
                            value={Uemail} onChange={(e) => setUemail(e.target.value)} />
                        </div>
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <div className="form-group">
                          <label htmlFor="mobile" className="form-label">Mobile Number</label>
                          <input type="number" className="form-control" id="mobile" placeholder="xxxxxxxxxx" required
                            value={MobNo} onChange={(e) => setMobNo(e.target.value)} />
                        </div>
                      </div>
                    </div>

                    <hr className="border-primary" />

                    <div className="row">
                      <div className="col-12 col-md-6 mb-3">
                        <div className="form-group">
                          <label htmlFor="pancard" className="form-label">Enter PAN Card no.</label>
                          <input type="text" className="form-control" id="pancard" placeholder="ABCTY1234D" required
                            value={PanCard} onChange={(e) => setPanCard(e.target.value)} />
                        </div>
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <div className="form-group">
                          <label htmlFor="Address" className="form-label">Enter Address</label>
                          <input type="text" className="form-control" id="address" placeholder="Enter your address"
                            value={Address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12 col-md-6 mb-3">
                        <div className="form-group">
                          <label htmlFor="username" className="form-label">Username</label>
                          <input type="text" className="form-control" id="username" placeholder="Enter username" required
                            value={Uname} onChange={(e) => setUname(e.target.value)} />
                          <small id="username-error-msg" className="form-text text-danger"></small>
                        </div>
                      </div>

                      <div className="col-12 col-md-6 mb-3">
                        <div className="form-group">
                          <label htmlFor="password" className="form-label">Password</label>
                          <input type="password" className="form-control" id="password" placeholder="Enter password" required
                            value={Upwd} onChange={(e) => setUpwd(e.target.value)} />
                          <small id="pass-error-msg" className="form-text text-danger"></small>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                      <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm password" required
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                      <small id="confirm-pass-error-msg" className="form-text text-danger"></small>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Next</button>
                  </>
                )}

                {isFormSubmitted && (
          <>
            <h4 className="mt-4">Account Details</h4>
            <hr className="border-primary" />
            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <div className="form-group">
                  <label htmlFor="BankName" className="form-label">Bank Name</label>
                  <input type="text" className="form-control" id="BankName" placeholder="xyz Bank" required
                    value={BankName} onChange={(e) => setBankName(e.target.value)} />
                </div>
              </div>
              <div className="col-12 col-md-6 mb-3">
                <div className="form-group">
                  <label htmlFor="BankBranch" className="form-label">Bank Branch</label>
                  <input type="text" className="form-control" id="BankBranch" placeholder="Enter Bank address"
                    value={BankBranch} onChange={(e) => setBankBranch(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <div className="form-group">
                  <label htmlFor="AccholdName" className="form-label">Account holder name</label>
                  <input type="text" className="form-control" id="AccholdName" placeholder="First Name & Last Name" required
                    value={AccholdName} onChange={(e) => setAccholdName(e.target.value)} />
                </div>
              </div>
              <div className="col-12 col-md-6 mb-3">
                <div className="form-group">
                  <label htmlFor="BankIFSC" className="form-label">Bank IFSC Code</label>
                  <input type="text" className="form-control" id="BankIFSC" placeholder="IFSC Code" required
                    value={BankIFSC} onChange={(e) => setBankIFSC(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <div className="form-group">
                  <label htmlFor="BankAccNo" className="form-label">Bank Account Number</label>
                  <input type="text" className="form-control" id="BankAccNo" placeholder="123456789012" required
                    value={BankAccNo} onChange={(e) => setBankAccNo(e.target.value)} />
                </div>
              </div>
              <div className="col-12 col-md-6 mb-3">
                <div className="form-group">
                  <label htmlFor="confirmBankAccNo" className="form-label">Confirm Account Number</label>
                  <input type="text" className="form-control" id="confirmBankAccNo" placeholder="Re-enter Account Number" required
                    value={confirmBankAccNo} onChange={(e) => setconfirmBankAccNo(e.target.value)} />
                </div>
              </div>
            </div>

            <button type="button" className="btn btn-success w-100 mt-3" onClick={handleFinalSubmit}>
              Submit Registration
            </button>
          </>
        )}
      </form>
      </div>
          </div>
        </div>
      </div>
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p className="mb-0">
          <strong>© 2024 cvauction.com. All rights reserved in favour of CV Auction Tech Ltd.</strong>
        </p>
      </footer>
    </div>
    
  );
  }

export default RegistrationForm;
