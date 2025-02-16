import axios from "axios";
import config from "../config";

const live = config.API_URL;
const upcoming = config.API_URL;

class LandingPage {

  getLiveAuction = () => {
    return axios.get(`${live}/currentAuction`);
  };

  getUpcomingAuction = () => {
    return axios.get(`${upcoming}/HostAuction`);
  };

}

export default new LandingPage();
