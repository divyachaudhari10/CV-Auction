import axios from "axios";
import config from "../config";

const URL = config.API_URL;

class AdminService {

  AddAdmin = (data) => {
    return axios.post(`${URL}/Admin`, data);
  };

  AddVehicle = (data) => {
    const formData = new FormData();

    formData.append('registrationNumber', data.registrationNumber);
    formData.append('registrationYear', data.registrationYear);
    formData.append('manufacturereName', data.manufacturereName);
    formData.append('modelName', data.modelName);
    formData.append('fuelType', data.fuelType);
    formData.append('insurance', data.insurance);
    formData.append('kmDriven', data.kmDriven);
    formData.append('rtoPassing', data.rtoPassing);
    formData.append('yearofregistration', data.yearofregistration);
    formData.append('manufacturingYear', data.manufacturingYear);
    formData.append('parkingLocation', data.parkingLocation);

    data.images.forEach(image => {
      formData.append('images', image);
    });

    if (data.pdf) {
      formData.append('pdf', data.pdf);
    }

    return axios.post(`${URL}/vehicles`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    });
  };

  UpdateVehicleDetails = (vehicleId, basePrice, eventId) => {
    return axios.put(`${URL}/vehicles/${vehicleId}`, {
      basePrice, 
      eventId,
    });
  };

  AddVehicleToAuction = (vehicleId) => {
    return axios.post(`${URL}/HostAuction`, { vehicleId });
  };

  getAllAuctions = () => {
    return axios.get(`${URL}/HostAuction`); // Fetch all auction events from the backend
  };

  // Start an auction event
  startAuction = (auctionId) => {
    return axios.put(`${URL}/${auctionId}/start`); 
  };

  // Delete an auction event
  deleteAuction = (auctionId) => {
    return axios.delete(`${URL}/${auctionId}`); 
  };

  // Get all users
  getAllUsers = () => {
    return axios.get(`${URL}/user`); 
  };

  deleteUser = (userId) => {
    return axios.delete(`${URL}/user/${userId}`); // Assuming the API endpoint to delete users is /users/{id}
  };

  getAllApprovals = () => {
    return axios.get(URL);  // Assuming the backend returns all approvals
  };

  // Approve a vehicle (or item) for auction
  approveItem = (approvalId) => {
    return axios.put(`${URL}/${approvalId}/approve`);  // Assuming PUT request to approve
  };

  // Deny a vehicle (or item) for auction
  denyItem = (approvalId) => {
    return axios.put(`${URL}/${approvalId}/deny`);  // Assuming PUT request to deny
  };

  // Delete an approval (item)
  deleteApproval = (approvalId) => {
    return axios.delete(`${URL}/${approvalId}`);  // Assuming DELETE request to delete approval
  };
}

export default new AdminService();