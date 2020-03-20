import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Booking from '../../components/Booking';

const Bookings=({bookings})=>(
  <>
    <Title>Réservations de la journée</Title>
    {bookings.length === 0 && <NoBooking>Aucune réservation aujourd'hui</NoBooking>}
    {bookings.sort(
      (bookingA, bookingB) => bookingA.createdAt < bookingB.createdAt).map(booking => (
      <Booking key={booking.id} booking={booking} />
    ))}
  </>
);

export default Bookings;

Bookings.propTypes = {
  bookings: PropTypes.array.isRequired
};

const Title = styled.h4`
  text-align: center;
`;

const NoBooking = styled.p`
  text-align: center;
`;