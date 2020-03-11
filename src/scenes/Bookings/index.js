import React from 'react';

const Bookings=({bookings})=>(
  <div>
    {bookings.length === 0 && <div>No bookings!</div>}

    {bookings.sort((bookingA, bookingB) => bookingA.createdAt < bookingB.createdAt).map(booking => (
      <div key={booking.id}>
        {booking.name}
        {booking.start}
        {booking.end}
      </div>
    ))}
  </div>
);


export default Bookings