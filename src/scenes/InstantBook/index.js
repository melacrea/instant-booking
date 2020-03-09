import React from 'react';
import { connect } from 'react-redux';
import { getBookings } from './actions';
import Button from '@material-ui/core/Button';

const InstantBook=({getBookings})=>(
    <Button variant="contained" color="primary" onClick={getBookings}>Press to get bookings</Button>
)

const mapDispatchToProps = {
    getBookings
};

export default connect(null,mapDispatchToProps)(InstantBook);