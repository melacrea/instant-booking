import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as moment from 'moment';

import COLORS from '../../style/colors';

const Header = ({name, className}) => (
  <Wrapper role='banner' className={className}>
    <Title>{name}</Title>
    <Date>{moment().format('DD/MM/YYYY')}</Date>
  </Wrapper>
);

export default Header;

Header.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string
};

Header.defaultProps = {
  className: void 0,
  name: ''
};

const Wrapper = styled.header`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLORS.PRIMARY};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  margin: 0;
  font-weight: bold;
  font-size: 1.4rem;
  color: ${COLORS.WHITE};
  line-height: 1.2;
`;

const Date = styled.span`
  line-height: 1.2;
  color: ${COLORS.WHITE};
`;
