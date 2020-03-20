import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Login from '../scenes/Login';
import Layout from '../scenes/Layout';

function Greeting(props) {
  if (props.isLoggedIn) return <Layout />;
  return <Login />;
}

const App = ({isLoggedIn}) => <Greeting isLoggedIn={isLoggedIn} />

function mapStateToProps(state) {
  const { currentUser } = state;
  return { isLoggedIn: currentUser.validToken };
}

export default connect(mapStateToProps)(App);

App.propTypes = {
  isLoggedIn: PropTypes.bool,
};

App.defaultProps = {
  isLoggedIn: localStorage.getItem('jwt_token') != null,
};

Greeting.propTypes = {
  isLoggedIn: PropTypes.bool,
};

Greeting.defaultProps = {
  isLoggedIn: localStorage.getItem('jwt_token') != null,
};