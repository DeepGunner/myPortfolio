import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { Motion, spring } from 'react-motion';
import { enableScrolling, disableScrolling } from 'scroll';
import { connect } from 'react-redux';

const Container = styled.div`
  width: 100%;
  // height: 400px;

  // display: flex;
  // flex-direction: column;
  // align-content: center;
  // justify-content: center;

  // overflow: hidden;
`;

const PlayerContainer = styled.div`
  position: relative;
  // We need this because we're gonna
  // have elements with "position: absolute"
  cursor: pointer;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;




class Video extends Component {
  static propTypes = {
    videoUrl: PropTypes.string.isRequired,
    playing: PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.state = {
      zoom: false,
      hover: false,
      moveDown: 0,
      moveLeft: 0,
      moveVideoLeft: 0,
      expandWidth: 1,
      expandHeight: 1,
      videoContainerPosition: 'relative',
      cursorPosition: {
        top: 0,
        left: 0
      },
      maxVideoSize: 100
    };
  }

  toggleZoom = () => {
    const { zoom } = this.state;
    const { clientHeight, clientWidth } = this.container;
    const videoRatio = clientWidth / clientHeight;
    const windowRatio = window.innerWidth / window.innerHeight;

    // console.log(this.container.clientWidth);
    this.setState({
      placeholderHeight: this.container.clientWidth / videoRatio,
      placeholderWidth: this.container.clientWidth
    });
    
    const maxVideoSize = videoRatio > windowRatio ? (videoRatio / windowRatio * 100) : 100;
    console.log(maxVideoSize);
    this.setState({
      maxVideoSize
    });
    if (!zoom) {
      this.setState({
        videoContainerPosition: 'absolute'
      });
    }

    // When the video is zoom. Disable scrolling
    if (zoom) {
      this.props.enableScrolling();
    } else {
      window.stopScrolling();
      this.props.disableScrolling();
      this.player.seekTo(0);
    }

    const moveDown = -this.container.getBoundingClientRect().top;
    let moveLeft = -this.container.getBoundingClientRect().left;
    if (maxVideoSize > 100) {
      this.setState({
        moveVideoLeft: zoom ? 0 : -(maxVideoSize/ 100 - 1) / 2 * window.innerWidth
      });
    }
    const expandWidth = window.innerWidth / this.container.offsetWidth;
    const expandHeight = window.innerHeight / this.container.offsetHeight;

    this.setState({
      zoom: !zoom,
      moveDown: !zoom ? moveDown : 0,
      moveLeft: !zoom ? moveLeft : 0,
      expandWidth: !zoom ? expandWidth : 1,
      expandHeight: !zoom ? expandHeight : 1
    });
  };

  onMouseOver = () => {
    this.setState({
      hover: true
    });
  };

  onMouseLeave = () => {
    this.setState({
      hover: false
    });
  };

  onMouseMove = (e) => {
    this.setState({
      cursorPosition: {
        top: e.clientY,
        left: e.clientX
      }
    });
  };

  onRest = () => {
    const { zoom } = this.state;
    if (!zoom) {
      // console.log('set to relative');
      this.setState({
        videoContainerPosition: 'relative'
      });
    }
  }

  onReady = () => {
    // const { clientHeight, clientWidth } = this.player.player.player;
    this.setState({
      placeholderWidth: this.container.clientWidth
    });
  }

  render() {
    const { videoUrl, playing } = this.props;
    const { zoom,moveDown, moveLeft, expandWidth, expandHeight, maxVideoSize, moveVideoLeft, videoContainerPosition, placeholderWidth, placeholderHeight } = this.state;
    
    const motionStyle = zoom ? {
      videoSize: spring(maxVideoSize),
      triangleLeft: spring(-100),
      moveVideoLeft: spring(moveVideoLeft)
    } : {
      // videoSize: spring(window.innerWidth > 1440 ? 30 : 70),
      videoSize: spring(100),
      triangleLeft: spring(-50),
      moveVideoLeft: spring(moveVideoLeft)
    };

    // console.log(motionStyle);

    return (
      <Container innerRef={(elem) => this.container = elem}>
        <div style={{
          width: placeholderWidth,
          height: placeholderHeight,
          display: videoContainerPosition === 'absolute' ? 'block' : 'none'
        }}></div>
        <Motion style={{
          containerTop: spring(moveDown),
          containerLeft: spring(moveLeft),
          containerWidth: spring(expandWidth),
          containerHeight: spring(expandHeight)
        }} onRest={this.onRest}>
          {({ containerTop, containerLeft, containerWidth, containerHeight }) =>
            <Container style={{
              position: videoContainerPosition,
              zIndex: zoom ? 100 : 'initial',
              width: `${100 * containerWidth}%`,
              height: `${100 * containerHeight}%`,
              top: containerTop,
              left: containerLeft,
            }}>
              <Motion style={motionStyle}>
                {({ videoSize, triangleLeft, moveVideoLeft }) =>
                  <PlayerContainer
                    ref={(elem) => this.playerContainer = elem}
                    onMouseMove={this.onMouseMove}
                    onMouseOver={this.onMouseOver}
                    onMouseLeave={this.onMouseLeave}
                    onClick={this.toggleZoom}
                    style={{
                      width: `${videoSize}%`,
                      cursor: zoom ? 'none' : 'pointer'
                      // Hide the cursor when it's zoomed.
                    }}>
                   
                    <div style={{
                      transform: `translateX(${moveVideoLeft}px)`
                    }}>
                      <ReactPlayer
                        onReady={this.onReady}
                        ref={(player) => this.player = player}
                        width={'100%'}
                        height={'80vh'}
                        playing={zoom || playing}
                        loop
                        volume={zoom ? 0.8 : 0}
                        url={videoUrl} />
                    </div>
                  </PlayerContainer>
                }
              </Motion>
            </Container>
          }
        </Motion>
      </Container>
    );
  }
}

export default connect(
  null,
  {
    enableScrolling,
    disableScrolling
  }
)(Video);
