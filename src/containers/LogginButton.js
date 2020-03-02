import React from 'react';
import { connect } from 'react-redux';
import { getToken } from '../actions';

let LogginButton=({getToken})=>(
   <button onClick={getToken}>Press to connect</button>
)

const mapDispatchToProps = {
    getToken
};

LogginButton = connect(null,mapDispatchToProps)(LogginButton);

export default LogginButton;