import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as moment from 'moment';

import BookingNameInput from '../../components/BookingNameInput';
import { postBooking } from '../Bookings/actions';

class BookingForm extends React.Component {
  state = {
    input: '',
    duration: 10
  };

  static propTypes = {
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    onSubmit: () => void 0,
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
    const {resource} = this.props
    let nbOptions = Math.floor(this.maxDurationBooking() / resource.bookingDurationStep)
    let options = []
    for(let i = 1; i <= nbOptions; i++){
      if(i*resource.bookingDurationStep >= resource.minimumBookingDuration){
        options.push(<option key={i} value={i*resource.bookingDurationStep}>{i*resource.bookingDurationStep}</option>)
      }
     }
    return options
  }

  maxDurationBooking = () => {
    const {bookings, resource} = this.props;
    let maxBooking = resource.maximumBookingDuration;
    let diffFromNow = 0;
    for(let i = 0; i < bookings.length; i++){
      diffFromNow = moment(bookings[i].start).diff(moment(), 'minutes')
      if(diffFromNow > 0 && diffFromNow < maxBooking){
        return diffFromNow
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
      <Input
        value={this.state.input}
        onChange={this.onInputChange}
      />
      <select onChange={this.onSelectChange} value={this.state.duration}>
        {this.renderOptions()}
      </select>
      <SubmitButton type='submit' disabled={!this.isFormValid}>
        submit
      </SubmitButton>
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
  display: flex;
`;

const Input = styled(BookingNameInput).attrs({
  placeholder: 'Nom de la réservation',
})`
  flex-grow: 1;
  margin-right: 1.142857143rem;
`;

const SubmitButton = styled.button`
  margin-left: auto;
  padding: 1rem 1.5rem;
  line-height: 1.571428571;
  display: block;
  border: 0;
  border-radius: 2px;
  font-family: inherit;
  font-weight: bold;
  font-size: 0.785714286rem;
  letter-spacing: 0.181818182em;
  text-transform: uppercase;
  background-color: #ddd;
  color: #fff;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus {
    box-shadow: 0 0 0 3px #ddd;
  }
`;
