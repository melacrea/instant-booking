import React from 'react';
import Moment from 'react-moment';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const dates = booking => {
  return <span><Moment local format='HH:mm'>{booking.start}</Moment> - <Moment local format='HH:mm'>{booking.end}</Moment></span>
};

const Booking = ({booking}) => (
  <ListItem>
    <ListItemText primary={booking.name} secondary={dates(booking)} />
  </ListItem>
);

export default Booking;