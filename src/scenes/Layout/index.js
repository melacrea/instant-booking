import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InstantBook from '../InstantBook'
import Bookings from '../Bookings'

const Layout = () => (
  <Wrapper>
    <InstantBook />
    <Bookings />
  </Wrapper>
);

export default Layout

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  min-height: calc(100vh - 70px);
`;