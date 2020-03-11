import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as moment from 'moment';

const Header = ({name, className}) => (
  <Wrapper className={className}>
    <Title>{name}</Title>
    <Date>{moment().format('DD/MM/YYYY')}</Date>
  </Wrapper>
);

Header.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string
};

Header.defaultProps = {
  className: void 0,
  name: ''
};

export default Header;

const Wrapper = styled.header`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 1.4rem;
  line-height: 1.2;
`;

const Date = styled.span`
  font-weight: bold;
  line-height: 1.2;
`;
