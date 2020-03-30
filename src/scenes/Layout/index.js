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
import COLORS from '../../style/colors';

class Layout extends React.Component {

  state = {};

  static propTypes = {
    bookings: PropTypes.array.isRequired,
    resource: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    getBookings: PropTypes.func,
    getResource: PropTypes.func,
    getCurrentUser: PropTypes.func,
  };

  static defaultProps = {
    getBookings: () => void 0,
    getResource: () => void 0,
    getCurrentUser: () => void 0,
  };

  componentDidMount() {
    const { getBookings, getResource, getCurrentUser } = this.props;
    getBookings();
    getResource();
    getCurrentUser();
  }

  currentBooking = () =>{
    const { bookings } = this.props;
    const currentBooking = bookings.filter(
      booking => moment().isBetween(booking.start, booking.end));
    return (
      currentBooking.length === 0 ? 
        <BookingForm /> : <Resource currentBooking={currentBooking[0]} />
    );
  }

  render = () => (
    <Wrapper>
      <Header name={this.props.resource.name} />
      <Container>
        <Main>
          <Title>Bonjour {this.props.currentUser.name} !</Title>
          {this.currentBooking()}
        </Main>
        <Aside>
          <Bookings bookings={this.props.bookings} />
        </Aside>
      </Container>
    </Wrapper>
  )
}

const mapStateToProps = state => ({
  bookings: state.bookings,
  resource: state.resource,
  currentUser: state.currentUser,
  feedback: state.feedback
});

const mapDispatchToProps = {
  getBookings,
  getResource,
  getCurrentUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);

const Main = styled.section`
  width: 70%;
  padding: 20px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  margin-top: 10px;
  font-size: 1.5rem;
`;

const Wrapper = styled.section`
  margin: auto;
  min-height: calc(100vh - 70px);
  max-width: 700px;
  background-color: ${COLORS.WHITE};
`;

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Aside = styled.aside`
  width: 30%;
  border-left: 1px solid ${COLORS.GREY_LIGHT};
  @media (max-width: 768px) {
    width: 100%;
  }
`;