import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as moment from 'moment';

import BookingNameInput from '../../components/BookingNameInput';
import { Button } from '../../components/Button';
import { postBooking } from '../Bookings/actions';

class BookingForm extends React.Component {
  state = {
    input: '',
    duration: 10
  };

  static propTypes = {
    postBooking: PropTypes.func,
    bookings: PropTypes.array.isRequired,
    resource: PropTypes.object.isRequired,
  };

  static defaultProps = {
    postBooking: () => void 0,
  };

  onInputChange = input => this.setState({input});

  onSelectChange = e => {
    this.setState({duration: e.target.value});
  }

  onSubmit = event => {
    event.preventDefault();
    this.props.postBooking({duration: this.bookingDuration, name: this.bookingName});
    this.reset();
  };

  reset = () => {
    this.setState({
      input: '',
      duration: 10
    });
  };

  renderOptions = () => {
    const { resource } = this.props;
    let nbOptions = Math.floor(this.maxDurationBooking() / resource.bookingDurationStep);
    let options = [];
    for(let i = 1; i <= nbOptions; i++){
      if(i*resource.bookingDurationStep >= resource.minimumBookingDuration){
        options.push(
          <option key={i} 
            value={i*resource.bookingDurationStep}>{i*resource.bookingDurationStep} minutes
          </option>);
      }
    }
    return options;
  }

  maxDurationBooking = () => {
    const { bookings, resource } = this.props;
    let maxBooking = resource.maximumBookingDuration;
    let diffFromNow = 0;
    for(let i = 0; i < bookings.length; i++){
      diffFromNow = moment(bookings[i].start).diff(moment(), 'minutes');
      if(diffFromNow > 0 && diffFromNow < maxBooking){
        return diffFromNow;
      }
    }
    return maxBooking;
  }

  get isFormValid() {
    return this.state.input.length > 2;
  }

  get bookingName() {
    return this.state.input;
  }

  get bookingDuration() {
    return this.state.duration;
  }

  render = () => (
    <Form onSubmit={this.onSubmit}>
      <Title>Réserver la salle maintenant, pour une durée de :  </Title>    
      <Label htmlFor='duration'>Durée</Label>
      <Select aria-required='true' id='duration' onChange={this.onSelectChange} value={this.state.duration}>
        {this.renderOptions()}
      </Select>
      <Label htmlFor='name'>Motif de la réservation</Label>
      <Input
        id='name'
        value={this.state.input}
        onChange={this.onInputChange}
        aria-required='true'
      />
      <Button type='submit' disabled={!this.isFormValid}>
        Réserver
      </Button>
    </Form>
  );
}

const mapStateToProps = state => ({
  resource: state.resource,
  bookings: state.bookings
});

const mapDispatchToProps = {
  postBooking
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingForm);

const Form = styled.form`
  margin-bottom: 2rem;
`;

const Input = styled(BookingNameInput)``;

const Title = styled.p`
  margin-bottom: 30px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Select = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none; 
  display: block;
  width: 100%;
  padding: 1rem 1.5rem;
  margin-bottom: 20px;
  flex-grow: 1;
  font-size: 1rem;
  border: 0;
`;