import React from 'react';
import PropTypes from 'prop-types';

import Booking from '../../components/Booking';

const Bookings=({bookings})=>(
  <div>
    {bookings.length === 0 && <div>No bookings!</div>}

    {bookings.sort(
      (bookingA, bookingB) => bookingA.createdAt < bookingB.createdAt).map(booking => (
      <Booking key={booking.id} booking={booking} />
    ))}
  </div>
);

export default Bookings;

Bookings.propTypes = {
  bookings: PropTypes.array.isRequired
};