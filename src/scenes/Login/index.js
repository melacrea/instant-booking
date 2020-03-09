import React from 'react';
import { connect } from 'react-redux';
import { getToken } from './actions';
import Button from '@material-ui/core/Button';

const Login=({getToken})=>(
    <Button variant="contained" color="primary" onClick={getToken}>Press to connect</Button>
)

const mapDispatchToProps = {
    getToken
};

export default connect(null,mapDispatchToProps)(Login);