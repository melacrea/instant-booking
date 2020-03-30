import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as moment from 'moment';

import { Button } from '../../components/Button';
import { postBooking } from '../Bookings/actions';

function BookingForm(props){

  const [duration, setDuration] = React.useState(10);
  const [input, setValue] = React.useState('');

  const onSubmit = event => {
    event.preventDefault();
    if(isFormValid()){
      props.postBooking({duration: duration, name: input});
    }
    reset();
  };

  const reset = () => {
    setValue('');
    setDuration(10);
  };

  const renderOptions = () => {
    const { resource } = props;
    let nbOptions = Math.floor(maxDurationBooking() / resource.bookingDurationStep);
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
  };

  const maxDurationBooking = () => {
    const { bookings, resource } = props;
    let maxBooking = resource.maximumBookingDuration;
    let diffFromNow = 0;
    for(let i = 0; i < bookings.length; i++){
      diffFromNow = moment(bookings[i].start).diff(moment(), 'minutes');
      if(diffFromNow > 0 && diffFromNow < maxBooking){
        return diffFromNow;
      }
    }
    return maxBooking;
  };

  const isFormValid = () => {
    return input.length > 2;
  };

  return(
    <Form onSubmit={onSubmit}>
      <Title>Réserver la salle maintenant, pour une durée de : </Title>    
      <Label htmlFor='duration'>Durée</Label>
      <Select aria-required='true' id='duration' onChange={(e) => setDuration(e.target.value)} value={duration}>
        {renderOptions()}
      </Select>
      <Label htmlFor='name'>Motif de la réservation</Label>
      <Input
        type='text'
        id='name'
        autoComplete='off'
        value={input}
        onChange={(e) => setValue(e.target.value)}
        aria-required='true'
      />
      <Button type='submit' disabled={!isFormValid()}>
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

BookingForm.propTypes = {
  postBooking: PropTypes.func,
  bookings: PropTypes.array.isRequired,
  resource: PropTypes.object.isRequired,
};

BookingForm.defaultProps = {
  postBooking: () => void 0,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingForm);

const Form = styled.form`
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width:100%;
  font-size: 1rem;
  padding: 1rem 1.2rem;
  line-height: 1.6;
`;

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