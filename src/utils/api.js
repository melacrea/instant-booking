import axios from 'axios'

const url =  process.env.REACT_APP_API_ENDPOINT
const bearer = 'Bearer ' + localStorage.getItem('jwt_token');

export const axiosInstantBooking = axios.create({ baseURL: url})
axiosInstantBooking.defaults.headers['Content-Type'] = 'application/json'

export const axiosInstantBookingWithAuth = axios.create({ baseURL: url, headers: { 'Authorization': bearer}})

export const handleError = error => {
}