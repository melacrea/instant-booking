import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from '../../../components/Button';
import { deleteBooking } from '../../Bookings/actions';
import WithCurrentUser from '../../../HOC/WithCurrentUser';

function DeleteButton(props){

  const deleteBooking = () => {
    props.deleteBooking({id: props.booking.id});
  };

  return <Button type='button' small={props.small} onClick={deleteBooking}>Annuler</Button>;
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
  small: PropTypes.bool,
};

DeleteButton.defaultProps = {
  deleteBooking: void 0,
  small: false,
};