export const getBookings = () => ({
  type: 'GET_BOOKINGS',
});

export const postBooking = payload => ({
  type: 'POST_BOOKING',
  payload
});

export const deleteBooking = payload => ({
  type: 'DELETE_BOOKING',
  payload
});