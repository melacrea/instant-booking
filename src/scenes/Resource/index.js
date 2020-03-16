import React from 'react';
import { connect } from 'react-redux';

import { deleteBooking } from '../Bookings/actions';
import DeleteButton from '../Bookings/Delete';

function Resource(props){
  const deleteBooking = () => {
    props.deleteBooking({id: props.currentBooking.id});
  };
  return (<div>
    Details
    {props.currentBooking.name}
    <DeleteButton onDelete={deleteBooking} />
  </div>
  )
};

const mapDispatchToProps = {
  deleteBooking
};

export default connect(null,mapDispatchToProps)(Resource);