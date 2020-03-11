import axios from 'axios';

const url =  process.env.REACT_APP_API_ENDPOINT;

export const axiosInstantBooking = axios.create({ baseURL: url});
axiosInstantBooking.defaults.headers['Content-Type'] = 'application/json';

export const handleError = error => {
}