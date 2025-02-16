import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import config from "../config";

const Claim = () => {
  const URL = config.API_URL;

  const location = useLocation();
  const win = location.state;
  var id = JSON.parse(localStorage.getItem("user")).uid;

  const [object, setObject] = useState({
    uid: id,
    amt: win.bidAmount || '',
    transactionDate: '',
    utrNo: ''
  });

  const handleChange = (e) => {
    setObject({ ...object, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedData = {
        ...object,
        transactionDate: `${object.transactionDate}T00:00:00`
      };
      console.log(formattedData);
      const response = await axios.post(`${URL}/Transaction`, formattedData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      alert(`Transaction Successful! Amount: ${formattedData.amt}, UTR No: ${formattedData.utrNo}`);
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting the transaction:', error);
    }
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center">Claim for {win.modelName}</h2>
        <div className="text-center">
          <p><strong>Brand Name:</strong> {win.brandName}</p>
          <p><strong>Register Number:</strong> {win.registerNo}</p>
          <p><strong>Final Amount:</strong> {win.bidAmount}</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <label htmlFor="transactionDate" className="form-label">Transaction Date</label>
            <input
              type="date"
              id="transactionDate"
              name="transactionDate"
              className="form-control"
              value={object.transactionDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="utrNo" className="form-label">UTR Number</label>
            <input
              type="text"
              id="utrNo"
              name="utrNo"
              className="form-control"
              value={object.utrNo}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Claim;