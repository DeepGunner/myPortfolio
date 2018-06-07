import styled from 'styled-components';
import { Fixed } from 'theme/grid';
import { Link } from 'react-router-dom';
import { color3,color5 } from 'theme/variables';
import { A } from 'theme/types';

export const Container = styled(Fixed)`
  right: 40vw;
  top: 90vh;
  z-index: 99;
  background: transparent;
  color ;${color5};
  padding: 7px;
  text-align: center;
`;

export const StyledLink = styled(Link)`
  margin-left: 20px;
  position: relative;
  color: ${color5};
  transition: color .3s;
  text-decoration:none;
  

  &:hover {
    color: white;
  }
  &:after {
    content: ' ';
    z-index: -1;
    position: absolute;
    top: 0;
    left: -20px;
    width: calc(100% + 40px);
    height: 0;
    transition: height .3s;
  }

  &:hover::after {
    height: 100%;
    background-color: ${color3};
    transform: scale(1, 1.6);
  }
`;

export const StyledA = styled(A)`
  margin-left: 20px;
  position: relative;
  transition: color .3s;

  &:hover {
    color: white;
  }
  &:after {
    content: ' ';
    z-index: -1;
    position: absolute;
    top: 0;
    left: -20px;
    width: calc(100% + 40px);
    height: 0;
    transition: height .3s;
  }

  &:hover::after {
    height: 100%;
    background-color: ${color3};
    transform: scale(1, 1.6);
  }
`;
