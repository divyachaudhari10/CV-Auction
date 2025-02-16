import axios from 'axios';
import config from '../config';

const API_URL = config.API_URL;

const getVehicles = async () => {
  try {
    const response = await axios.get(`${API_URL}/vehicles`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw error;  // Rethrow the error to handle it in the component
  }
};

const getVehicleDetails = async (vehicleId) => {
  try {
    const response = await axios.get(`${API_URL}/vehicles/${vehicleId}`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching vehicle details:', error);
    throw error; 
  }
};

const getNameAndBrand = async (id) => {
  try {
    const obj = await getVehicleDetails(id);
    return `${obj.modelName}${obj.manufacName}`;
  } catch {
    return "Transportation";
  }
};

const placeBid = async (vehicleId, bidAmount) => {
  try {
    const response = await axios.post(`${API_URL}/vehicles/${vehicleId}/bid`, { bidAmount });
    return response.data; // Return the updated vehicle data or success message
  } catch (error) {
    console.error('Error placing bid:', error);
    throw error;  // Rethrow the error to handle it in the component
  }
};

// Function to fetch the current highest bid for a specific vehicle
const getHighestBid = async (vehicleId) => {
  try {
    const response = await axios.get(`${API_URL}/vehicles/${vehicleId}/highest-bid`);
    return response.data; // Return the highest bid amount
  } catch (error) {
    console.error('Error fetching highest bid:', error);
    throw error;  // Rethrow the error to handle it in the component
  }
};

const updateHighestBid = async (vehicleId, bidAmount) => {
  try {
    const response = await axios.put(`${API_URL}/vehicles/${vehicleId}/update-highest-bid`, { bidAmount });
    return response.data; // Return the updated vehicle data with the new highest bid
  } catch (error) {
    console.error('Error updating highest bid:', error);
    throw error;  // Rethrow the error to handle it in the component
  }
};

const getLiveEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events/live`);
    return response.data; // Return the live events data
  } catch (error) {
    console.error('Error fetching live events:', error);
    throw error;  // Rethrow the error to handle it in the component
  }
};

const getUpcomingEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events/upcoming`);
    return response.data; // Return the upcoming events data
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    throw error;  // Rethrow the error to handle it in the component
  }
};

// Function to fetch buy leads
const getBuyLeads = async () => {
  try {
    const response = await axios.get(`${API_URL}/events/buy-leads`);
    return response.data; // Return the buy leads data
  } catch (error) {
    console.error('Error fetching buy leads:', error);
    throw error;  // Rethrow the error to handle it in the component
  }
};

// Function to place a bid on a specific event
const placeEventBid = async (eventId, vehicleId, bidAmount) => {
  try {
    const response = await axios.post(`${API_URL}/events/${eventId}/vehicles/${vehicleId}/bid`, { bidAmount });
    return response.data; // Return the updated event and vehicle data or success message
  } catch (error) {
    console.error('Error placing bid on event vehicle:', error);
    throw error;  // Rethrow the error to handle it in the component
  }
};

// Function to fetch details for a specific event
const getEventDetails = async (eventId) => {
  try {
    const response = await axios.get(`${API_URL}/events/${eventId}`);
    return response.data; // Return the event details
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;  // Rethrow the error to handle it in the component
  }
};

 const userService = {
  getVehicles,
  getVehicleDetails,
  placeBid,
  getHighestBid,
  updateHighestBid,
  getLiveEvents,
  getUpcomingEvents,
  getBuyLeads,
  placeEventBid,
  getEventDetails,
  getNameAndBrand
};

export default userService;
