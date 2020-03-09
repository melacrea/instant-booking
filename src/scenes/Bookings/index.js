import React from 'react';
import { connect } from 'react-redux';

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
)

function mapStateToProps(state) {
    const { bookings } = state
    return { bookings }
  }
  
export default connect(mapStateToProps)(Bookings);