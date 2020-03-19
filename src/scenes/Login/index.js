import React from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';

function Login(){
  const dispatch = useDispatch();
  return <Button variant='contained' color='primary' onClick={() => dispatch({type: 'GET_TOKEN'})}>Press to connect</Button>;
}

export default Login;