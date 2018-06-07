import { injectGlobal } from 'styled-components';
import {textColor,color5, normalFontFamily } from './variables';
import media from 'theme/media';

/* eslint-disable */
injectGlobal`
  body {
    margin: 0;
    padding: 10vh 10vw 10vh 10vw;
    ${media.tablet`
      padding: 0;
    `}
    font-family: ${normalFontFamily};
    font-size: 18px;
    
    color: ${textColor};
    background-image: url(${require('assets/4595.jpg')});
    background-repeat: repeat-y;
    background-size: 100%;
    // background-attachment: fixed
    // background-size:cover;
  }

  h1, h2, h3 {
    font-family: ${normalFontFamily};
  }

  p {
    line-height: 1.1em;
  }

  a:visited,
  a:focus,
  a:active,
  a:-webkit-any-link {
    color: ${color5};
  }

  a {
    font-family: inherit;
  }

  input,
  textarea {
    -webkit-appearance: none;
    border-radius: 0;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-left:0;
  }

  blockquote {
    ${media.tablet`
      margin-left: 0;
      margin-right: 0;
    `}
  }
`;
/* eslint-enable */
