import React from 'react';

const WithCurrentUser = (Component) => (props) =>
  !(props.currentUser.id == props.booking.userId)
    ? null
    : <Component { ...props } />;

export default WithCurrentUser;