import React from 'react'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteBooking } from '../../Bookings/actions';
import WithCurrentUser from '../../../services/WithCurrentUser';

function DeleteButton(props){

  const deleteBooking = () => {
    props.deleteBooking({id: props.booking.id});
  };

  return <Button variant='contained' color='primary' onClick={deleteBooking}>Delete</Button>;
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

const mapDispatchToProps = {
  deleteBooking
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps)(WithCurrentUser(DeleteButton));
  
DeleteButton.propTypes = {
  deleteBooking: PropTypes.func,
  booking: PropTypes.shape({ id: PropTypes.string }).isRequired,
};

DeleteButton.defaultProps = {
  deleteBooking: void 0,
};