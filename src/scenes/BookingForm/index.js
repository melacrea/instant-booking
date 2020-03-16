import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import BookingNameInput from '../../components/BookingNameInput';
import { postBooking } from '../Bookings/actions';

class BookingForm extends React.Component {
  state = {
    input: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    onSubmit: () => void 0,
  };

  onInputChange = input => this.setState({input});

  onSubmit = event => {
    event.preventDefault();
    this.props.postBooking({duration: 10, name: this.bookingName});
    this.reset();
  };

  reset = () => {
    this.setState({
      input: '',
    });
  };

  get isFormValid() {
    return this.state.input.length > 2;
  }

  get bookingName() {
    return this.state.input;
  }

  render = () => (
    <Form onSubmit={this.onSubmit}>
      <Input
        value={this.state.input}
        onChange={this.onInputChange}
      />
      <SubmitButton type='submit' disabled={!this.isFormValid}>
        submit
      </SubmitButton>
    </Form>
  );
}


const mapDispatchToProps = {
  postBooking
};

export default connect(
  null,
  mapDispatchToProps
)(BookingForm);

const Form = styled.form`
  margin-bottom: 2rem;
  display: flex;
`;

const Input = styled(BookingNameInput).attrs({
  placeholder: 'Nom de la résevation',
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
