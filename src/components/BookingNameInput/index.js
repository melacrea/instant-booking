import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default class FormGroup extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    onChange: () => void 0,
    placeholder: void 0,
    value: void 0,
    className: void 0,
  };

  handleChange = event => {
    const {value} = event.target;

    const isValid = RegExp(/$|^[a-zA-Z0-9._-]+$/).test(value);
    if (!isValid) return event.preventDefault();

    return this.props.onChange(value);
  };

  render = () => (
    <Wrapper className={this.props.className}>
      <Input
        placeholder={this.props.placeholder}
        type='text'
        onChange={this.handleChange}
        value={this.props.value}
      />
    </Wrapper>
  );
}

const Wrapper = styled.span`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #eee;

  &:focus-within {
    box-shadow: 0 0 0 3px #ccc;
  }

  ::placeholder {
    color: rgba(68, 68, 68, 0.6);
  }
`;

const Input = styled.input`
  flex-grow: 1;
  font-size: 1rem;
  padding: 1rem 1.142857143rem;
  line-height: 1.571428571;
  border: 0;

  &:focus {
    outline: 0;
  }
`;