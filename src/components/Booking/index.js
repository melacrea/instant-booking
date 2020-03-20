import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import DeleteButton from '../../scenes/Bookings/Delete';

const dates = booking => {
  return <span><Moment local format='HH:mm'>{booking.start}</Moment> - <Moment local format='HH:mm'>{booking.end}</Moment></span>
};

const Booking = ({booking}) => (
  <ListItem>
    <ListItemText primary={booking.name} secondary={dates(booking)} />
    <DeleteButton small booking={booking} />
  </ListItem>
);

export default Booking;

Booking.propTypes = {
  booking: PropTypes.shape({ name: PropTypes.string}).isRequired,
};
