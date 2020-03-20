import { createGlobalStyle } from 'styled-components';

import COLORS from '../style/colors';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato:400,700');

  html {
    font-size: 14px;
  }

  body {
    margin: 8px;
    color: ${COLORS.BLACK};
    font-family: 'Lato', sans-serif;
    background-color: #eee;
    @media (max-width: 768px) {
      margin: 0;
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;