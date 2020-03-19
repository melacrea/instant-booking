import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

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

    // No state update necessary
    return null;
  }

  componentDidMount() {
    const { users, currentBooking, getUser } = this.props;
    let u = users.filter(user => user.id == currentBooking.userId);
    if(u.length == 0){
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
    <div>
      La salle est réservée par {this.renderOwnerName()} jusqu'à <Moment local format='HH:mm'>{this.props.currentBooking.end}</Moment> 
      <div>Motif : {this.props.currentBooking.name}</div>
      <DeleteButton booking={this.props.currentBooking} />
    </div>
  )
}

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = {
  getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Resource);