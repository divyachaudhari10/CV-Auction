import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from '../config';

const AddVehicle = () => {
    const URL = `${config.API_URL}/vehicles`;

    const [formData, setFormData] = useState({
        registrationNumber: '',
        registrationYear: '',
        manufacturereName: '',
        modelName: '',
        fuelType: 'petrol',
        insurance: '',
        kmDriven: '',
        rtoPassing: '',
        yearofregistration: '',
        manufacturingYear: '',
        parkingLocation: '',
        images: [],
        pdf: null,
        imagePreviews: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;

        if (name === 'images') {
            setFormData({
                ...formData,
                images: Array.from(files),
                imagePreviews: Array.from(files).map(file => URL.createObjectURL(file))
            });
        } else if (name === 'pdf') {
            setFormData({
                ...formData,
                pdf: files[0]
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    


        const data = {
            vehicleid: 2,
            regNo: formData.registrationNumber,
            regYear: parseInt(formData.registrationYear, 10),
            manufacName: formData.manufacturereName,
            modelName: formData.modelName,
            fuelType: formData.fuelType,
            insurance: formData.insurance,
            kmDriven: formData.kmDriven,
            rtoPassing: formData.rtoPassing,
            yearOfManufacturing: formData.manufacturingYear,
            parkingLocation: formData.parkingLocation,
            imgUrls: 'https://www.onelap.in/news/wp-content/uploads/2020/04/cvfipng.png',
            pdfReportUrl: 'https://ipedgy.com/wp-content/uploads/2021/04/Valuation-Report-for-Vehicles.pdf'
        };
    
        try {
            const response = await axios.post(URL, data, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log('Form data successfully submitted:', response);
        }catch (error) {
            if (error.response) {
                console.error('Error submitting form data:', error.response.data);
                console.error('Validation errors:', error.response.data.errors);
            } else {
                console.error('Error:', error.message);
            }
        }
        
    };
    

    return (
        <div>
          <main className="container mt-5">
            <section className="add-vehicle-form">
              <h2 className="text-center">Enter Vehicle Details</h2><br />
              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="regNo" className="form-label">Register Number:</label>
                  <input
                    type="text"
                    id="regNo"
                    name="regNo"
                    className="form-control"
                    value={formData.regNo}
                    onChange={handleChange}
                    required
                  />
                </div>
    
                <div className="col-md-6">
                  <label htmlFor="manufacName" className="form-label">Manufacturer Name:</label>
                  <input
                    type="text"
                    id="manufacName"
                    name="manufacName"
                    className="form-control"
                    value={formData.manufacName}
                    onChange={handleChange}
                    required
                  />
                </div>
    
                <div className="col-md-6">
                  <label htmlFor="modelName" className="form-label">Model Name:</label>
                  <input
                    type="text"
                    id="modelName"
                    name="modelName"
                    className="form-control"
                    value={formData.modelName}
                    onChange={handleChange}
                    required
                  />
                </div>
    
                <div className="col-md-6">
                  <label htmlFor="fuelType" className="form-label">Fuel Type:</label>
                  <select
                    id="fuelType"
                    name="fuelType"
                    className="form-select"
                    value={formData.fuelType}
                    onChange={handleChange}
                    required
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="CNG">CNG</option>
                  </select>
                </div>
    
                <div className="col-md-6">
                  <label htmlFor="insurance" className="form-label">Insurance:</label>
                  <input
                    type="text"
                    id="insurance"
                    name="insurance"
                    className="form-control"
                    value={formData.insurance}
                    onChange={handleChange}
                    required
                  />
                </div>
    
                <div className="col-md-6">
                  <label htmlFor="kmDriven" className="form-label">KM Driven:</label>
                  <input
                    type="number"
                    id="kmDriven"
                    name="kmDriven"
                    className="form-control"
                    value={formData.kmDriven}
                    onChange={handleChange}
                    required
                  />
                </div>
    
                <div className="col-md-6">
                  <label htmlFor="rtoPassing" className="form-label">RTO Passing:</label>
                  <input
                    type="text"
                    id="rtoPassing"
                    name="rtoPassing"
                    className="form-control"
                    value={formData.rtoPassing}
                    onChange={handleChange}
                    required
                  />
                </div>
    
                <div className="col-md-6">
                  <label htmlFor="yearOfManufacturing" className="form-label">Year of Manufacturing:</label>
                  <input
                    type="number"
                    id="yearOfManufacturing"
                    name="yearOfManufacturing"
                    className="form-control"
                    value={formData.yearOfManufacturing}
                    onChange={handleChange}
                    required
                  />
                </div>
    
                <div className="col-md-6">
                  <label htmlFor="parkingLocation" className="form-label">Parking Location:</label>
                  <input
                    type="text"
                    id="parkingLocation"
                    name="parkingLocation"
                    className="form-control"
                    value={formData.parkingLocation}
                    onChange={handleChange}
                    required
                  />
                </div>
                        <div className="col-md-6">
                            <label htmlFor="images" className="form-label">Upload Vehicle Images:</label>
                            <input
                                type="file"
                                id="images"
                                name="images"
                                accept="image/*"
                                className="form-control"
                                multiple
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="pdf" className="form-label">Evaluation Report PDF:</label>
                            <input
                                type="file"
                                id="pdf"
                                name="pdf"
                                accept=".pdf"
                                className="form-control"
                                onChange={handleFileChange}
                                required
                            />
                        </div>

                        {formData.imagePreviews.length > 0 && (
                            <div className="col-12">
                                <h5>Selected Images Preview:</h5>
                                <div className="d-flex flex-wrap">
                                    {formData.imagePreviews.map((preview, index) => (
                                        <div key={index} className="m-2 text-center">
                                            <img
                                                src={preview}
                                                alt={`preview-${index}`}
                                                className="img-thumbnail"
                                                style={{ width: '100px', height: '100px' }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="col-12 text-center">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default AddVehicle;
