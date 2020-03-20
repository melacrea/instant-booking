import React from 'react';
import styled from 'styled-components';

import COLORS from '../../style/colors';

const StyledButton = styled.button`;
    margin: 20px auto;
    padding: ${props => props.small? '0.5rem 1rem' : '1rem 1.5rem'} ;
    line-height: 1.571428571;
    display: block;
    border: 0;
    border-radius: 2px;
    font-family: inherit;
    font-weight: bold;
    font-size: 0.785714286rem;
    letter-spacing: 0.181818182em;
    text-transform: uppercase;
    background-color: ${COLORS.PRIMARY};
    color: #fff;
    cursor: pointer;

    &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    }

    &:focus {
    box-shadow: 0 0 0 3px #ddd;
    }
}
`;

export const Button = (props) => <StyledButton {...props} />;