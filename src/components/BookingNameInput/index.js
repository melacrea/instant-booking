import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function FormGroup(props){

  const handleChange = event => {
    const { value } = event.target;
    const isValid = RegExp(/$|^[a-zA-Z0-9._-]+$/).test(value);
    
    if (!isValid) return event.preventDefault();
    return props.onChange(value);
  };

  return(
    <Wrapper className={props.className}>
      <Input
        type='text'
        onChange={handleChange}
        value={props.value}
      />
    </Wrapper>
  );
}

export default FormGroup;

FormGroup.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
  value: PropTypes.string,
};

FormGroup.defaultProps = {
  className: void 0,
  value: void 0,
  onChange: () => void 0,
};

const Wrapper = styled.span`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #eee;

  &:focus-within {
    box-shadow: 0 0 0 3px #ccc;
  }
`;

const Input = styled.input`
  flex-grow: 1;
  font-size: 1rem;
  padding: 1rem 1.2rem;
  line-height: 1.6;
  border: 0;

  &:focus {
    outline: 0;
  }
`;