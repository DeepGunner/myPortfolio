import React, { Component } from 'react';
import { Container, StyledLink, StyledA } from './NavMenu.style';

class NavMenu extends Component {
  render() {
    return (
      <Container>
        <StyledLink to={'/'}>Home</StyledLink>
        <StyledLink to={'/projects'}>Projects</StyledLink>
        <StyledA href={'https://standardresume.co/deepinder'}>Resume</StyledA>
      </Container>
    );
  }
}

export default NavMenu;