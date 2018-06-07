import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { color3, color5 } from 'theme/variables';
import { connect } from 'react-redux';
// import media from 'theme/media';
import { Flex } from 'theme/grid';

const Container = styled(Flex)`
  color: ${color5};
  align-content: center;

  font-size: 0.8em;

  transition: color .3s;

  z-index: 99;

  i {
    margin: 0 15px;
  }

  ${({ horizontal }) => !horizontal && css`
    transform: rotate(-90deg);
    transform-origin: left top;
    i {
      transform: rotate(90deg);
    }
  `}

  p {
    margin: 0 10px 0 0;
  }

  a {
    /*color: white;*/
    color: ${color5};
  }
  a:hover {
    color: ${color3};
  }
`;

class SocialMedia extends Component {
  render() {
    const { /* menuOpen,  */horizontal, ...others } = this.props;
    return (
      <Container horizontal={horizontal} {...others}>
        <h4>YOU CAN REACH ME HERE -></h4>
        <a
          target="_blank"
          href="mailto:deepindersingh.23@gmail.com">
          <h4><i className="fa fa-envelope"></i></h4>
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/singh-deepinder">
          <h4><i className="fa fa-linkedin"></i></h4>
        </a>
        <a
          target="_blank"
          href="https://www.github.com/deepgunner">
          <h4><i className="fa fa-github"></i></h4>
        </a>
      </Container>
    )
  }
}

export default connect(
  (state) => ({
    menuOpen: state.menu
  })
)(SocialMedia);
