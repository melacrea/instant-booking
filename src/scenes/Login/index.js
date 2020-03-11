import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import { getToken } from './actions';

const Login=({getToken})=>(
  <Button variant='contained' color='primary' onClick={getToken}>Press to connect</Button>
);

const mapDispatchToProps = {
  getToken
};

export default connect(null,mapDispatchToProps)(Login);