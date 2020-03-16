import React from 'react';

import Booking from '../../components/Booking'

const Bookings=({bookings})=>(
  <div>
    {bookings.length === 0 && <div>No bookings!</div>}

    {bookings.sort((bookingA, bookingB) => bookingA.createdAt < bookingB.createdAt).map(booking => (
      <Booking key={booking.id} booking={booking} />
    ))}
  </div>
);


export default Bookings;