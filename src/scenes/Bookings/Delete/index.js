import React from 'react';
import Button from '@material-ui/core/Button';

const DeleteButton=({onDelete})=>(
  <Button variant='contained' color='primary' onClick={onDelete}>Delete</Button>
);

export default DeleteButton;