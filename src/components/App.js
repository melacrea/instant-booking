import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Login from '../scenes/Login';
import Layout from '../scenes/Layout';

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <Layout />;
  }
  return <Login />;
}

const App = ({isLoggedIn}) => (
  <div>
    <Greeting isLoggedIn={isLoggedIn} />
  </div>
);

App.propTypes = {
  isLoggedIn: PropTypes.bool,
};

App.defaultProps = {
  isLoggedIn: localStorage.getItem('jwt_token') != null,
};

function mapStateToProps(state) {
  const { currentUser } = state;
  return { isLoggedIn: currentUser.validToken };
}

export default connect(mapStateToProps)(App);