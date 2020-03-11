import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as moment from 'moment';

import Bookings from '../Bookings';
import { getBookings } from '../Bookings/actions';
import { getResource } from '../Resource/actions';
import BookingForm from '../BookingForm';
import Resource from '../Resource';
import Header from '../../components/Header';

class Layout extends React.Component {

  static propTypes = {
    bookings: PropTypes.array.isRequired
  };

  componentDidMount() {
    const { getBookings, getResource } = this.props;
    getBookings();
    getResource();
  }

  currentBooking = () =>{
    const { start, end } = this.props.bookings;
    const currentBooking = this.props.bookings.filter(booking => moment().isBetween(moment(start), moment(end)));
    return (currentBooking.length === 0 ? <BookingForm /> : <Resource currentBooking />);
  }

  render = () => (
    <Wrapper>
      <Header name={this.props.resource.name} />
      <Container>
        {this.currentBooking()}
        <Bookings bookings={this.props.bookings} />
      </Container>
    </Wrapper>
  )
}

const mapStateToProps = state => ({
  bookings: state.bookings,
  resource: state.resource
});

const mapDispatchToProps = {
  getBookings,
  getResource
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
  padding: 10px;
`;