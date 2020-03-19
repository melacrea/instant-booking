import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as moment from 'moment';

import Bookings from '../Bookings';
import { getBookings } from '../Bookings/actions';
import { getResource } from '../Resource/actions';
import { getCurrentUser } from '../User/actions';
import BookingForm from '../BookingForm';
import Resource from '../Resource';
import Header from '../../components/Header';

class Layout extends React.Component {

  state = {};

  static propTypes = {
    bookings: PropTypes.array.isRequired
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // Store prevUserId in state so we can compare when props change.
    // Clear out any previously-loaded user data (so we don't render stale stuff).
    if (nextProps.bookings !== prevState.prevBookings) {
      return {
        prevBookings: nextProps.bookings,
        profileOrError: null,
      };
    }

    // No state update necessary
    return null;
  }

  componentDidMount() {
    const { getBookings, getResource, getCurrentUser } = this.props;
    getBookings();
    getResource();
    getCurrentUser();
  }

  componentDidUpdate

  currentBooking = () =>{
    const { bookings } = this.props;
    const currentBooking = bookings.filter(booking => moment().isBetween(booking.start, booking.end));
    return (currentBooking.length === 0 ? <BookingForm /> : <Resource currentBooking={currentBooking[0]} />);
  }

  render = () => (
    <Wrapper>
      <Header name={this.props.resource.name} />
      <Container>
        <main>
          Bonjour {this.props.currentUser.name}
          {this.currentBooking()}
        </main>
        <aside>
          <Bookings bookings={this.props.bookings} />
        </aside>
      </Container>
    </Wrapper>
  )
}

const mapStateToProps = state => ({
  bookings: state.bookings,
  resource: state.resource,
  currentUser: state.currentUser
});

const mapDispatchToProps = {
  getBookings,
  getResource,
  getCurrentUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout );

const Wrapper = styled.section`
  min-height: calc(100vh - 70px);
  background-color: #ddd;
`;

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;