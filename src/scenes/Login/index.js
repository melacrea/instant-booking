import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Button } from '../../components/Button';

function Login(){
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <Button type='button' variant='contained' color='primary' onClick={() => dispatch({type: 'GET_TOKEN'})}>Se connecter</Button>
    </Wrapper>
  );
}

export default Login;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 100px;
  margin: auto;
  background-color: #fff;
  border: 1px solid #eee;
`;