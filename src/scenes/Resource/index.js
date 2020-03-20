import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import styled from 'styled-components';

import DeleteButton from '../Bookings/Delete';
import {getUser} from '../Users/actions';

class Resource extends React.Component {
  state = {
    ownerBooking: ''
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.users !== prevState.users) {
      return {
        users: nextProps.users,
      };
    }
    return null;
  }

  componentDidMount() {
    const { users, currentBooking, getUser } = this.props;
    let u = users.filter(user => user.id === currentBooking.userId);
    if(u.length === 0){
      getUser({id: currentBooking.userId});
    }
  }

  renderOwnerName = () => {
    const { users } = this.state;
    const { currentBooking } = this.props;
    let o = users.filter(user => user.id === currentBooking.userId);
    if(o.length > 0){
      let owner = o[0]
      return owner.name;
    }
  }

  render = () => (
    <Text>
      La salle est réservée par <OwnerName>{this.renderOwnerName()}</OwnerName> jusqu'à <Time datetime={this.props.currentBooking.end}><Moment local format='HH:mm'>{this.props.currentBooking.end}</Moment></Time> 
      <BookingName>Motif : {this.props.currentBooking.name}</BookingName>
      <DeleteButton booking={this.props.currentBooking} />
    </Text>
  )
}

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = {
  getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Resource);

const OwnerName = styled.span`
  font-weight: bold;
`

const Time = styled.time`
  font-weight: bold;
`

const Text = styled.div`
  text-align: center;
  line-height: 2;
`

const BookingName = styled.h3`
  margin: 15px 0;
  font-size: 1.3rem;
  font-weight: bold;
`