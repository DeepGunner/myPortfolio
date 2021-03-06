/* globals emailjs */
import React, { Component } from 'react';
import { RevealDiv, ProjectsContainer, Container, Relative } from 'theme/grid';
import {FixedTitle } from 'theme/types';
import { connect } from 'react-redux';
import c from 'classnames';
import Video from 'components/Video/Video';
import Waypoint from 'react-waypoint';
import AudioPlayer from 'components/AudioPlayer/AudioPlayer';

import WaypointShow from 'components/WaypointShow/WaypointShow';
import { color3 } from 'theme/variables';
import ReactPlayer from 'react-player';
import { MusicPlayerContainer, PlayButton, StyledClickHereCircle, StyledVideoBlock, LeftP, RightP, AudioLine,  NormalImageStuff, } from './styles';


import { OrderNumber as _OrderNumber } from 'theme/types';



const NEXT_STEP = 'aboutMe/NEXT_STEP';
const NEXT_PARTIAL_STEP = 'aboutMe/NEXT_PARTIAL_STEP';
const PAUSE_VIDEO1 = 'aboutMe/PAUSE_VIDEO1';
const PLAY_VIDEO1 = 'aboutMe/PLAY_VIDEO1';
const PAUSE_VIDEO2 = 'aboutMe/PAUSE_VIDEO2';
const PLAY_VIDEO2 = 'aboutMe/PLAY_VIDEO2';
const SEND = 'aboutMe/SEND';
const SEND_SUCCESS = 'aboutMe/SEND_SUCCESS';
const SEND_FAIL = 'aboutMe/SEND_FAIL';

export function nextStep() {
  return { type: NEXT_STEP };
}

export function nextPartialStep(amount) {
  return { type: NEXT_PARTIAL_STEP, amount };
}

export function pauseVideo1() {
  return { type: PAUSE_VIDEO1 };
}

export function playVideo1() {
  return { type: PLAY_VIDEO1 };
}

export function pauseVideo2() {
  return { type: PAUSE_VIDEO2 };
}

export function playVideo2() {
  return { type: PLAY_VIDEO2 };
}

export function sendForm(values) {
  return {
    types: [SEND, SEND_SUCCESS, SEND_FAIL],
    promise: () => emailjs.send('gmail', 'deepindersingh.23@gmail.com', {
      message_html: values.message,
      from_name: `${values.name} (${values.email})`,
    })
  };
}

const roundDecimal = (val) => Math.round(val * 10) / 10;

const initialState = {
  step: 1,
  video1Playing: false,
  video2Playing: false,
  sending: false
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case PAUSE_VIDEO1:
      return { ...state, video1Playing: false };
    case PLAY_VIDEO1:
      return { ...state, video1Playing: true };
    case PAUSE_VIDEO2:
      return { ...state, video2Playing: false };
    case PLAY_VIDEO2:
      return { ...state, video2Playing: true };
    case NEXT_STEP:
      return { ...state, step: Math.floor(state.step) + 1 }
    case NEXT_PARTIAL_STEP:
      return { ...state, step: roundDecimal(state.step + action.amount) }
    case SEND:
      return { ...state, sending: true };
    case SEND_SUCCESS:
      return { ...state, sending: false };
    case SEND_FAIL:
      return { ...state, sending: false };
    default:
      return state;
  }
}

class AboutMe extends Component {
  render() {
    const { step, nextStep, pauseVideo1, playVideo1, video1Playing} = this.props;


    return (
      <div>
        <FixedTitle><div style={{backgroundColor : 'transparent'}}>About Me</div></FixedTitle>
        <ProjectsContainer>
          <Container>
            <WaypointShow>
              {({ show }) =>
                <LeftP className={c({ hide: !show })}>
                  <span>
                    Hi there!
                    <br/><br/>
                    You are here means that you want to get to know me. Ok, so, you already know that my name is Deepinder Singh. I am from Faridabad,India and I aspire to be a Front-End Developer.
                  </span>
                </LeftP>
              }
            </WaypointShow>
            
            { step >= 1 &&
              <div>
                <WaypointShow>
                  {({ show }) =>
                    <LeftP className={c({ hide: !show })}>
                      <span>Well, I like cycling and football. Most of my free time is divided between the two. Check out this sunrise i recently caught on one of my rides.</span>
                    </LeftP>
                  }
                </WaypointShow>
                
                <Relative hideInTablet>
                  <WaypointShow>
                    {({ show }) =>
                      <StyledVideoBlock
                        marginBottom="30px">
                        <Waypoint
                          bottomOffset={100}
                          onLeave={pauseVideo1}
                          onEnter={playVideo1}/>
                        <Video
                              height="80vh"
                          playing={video1Playing}
                          videoUrl={require('assets/sunrise.mp4')}/>
                      </StyledVideoBlock>
                    }
                  </WaypointShow>
                </Relative>
                <Relative showInTablet>
                  <ReactPlayer
                    width="100%"
                    height="80vh"
                    url={require('assets/sunrise.mp4')}
                    playing={false}
                    controls
                  />
                </Relative>
                
                <WaypointShow>
                  {({ show }) =>
                    <Relative>
                      <RightP
                        onClick={step === 1 && nextStep}
                        className={c({ unanswered: step === 1, hide: !show })}
                      >
                        <span>Oh nice...What else?</span>
                      </RightP>
                      { step === 1 &&
                        <StyledClickHereCircle color={color3} />
                      }
                    </Relative>
                  }
                </WaypointShow>
              </div>
            }
           
           { step >= 2 &&
              <div>
                <WaypointShow>
                  {({ show }) =>
                    <LeftP className={c({ hide: !show })}>
                      <span>
                        Listening to music is another thing I do to unwind and declutter my mind so here are my 3 current favourites:
                      </span>
                    </LeftP>
                  }
                </WaypointShow>
                <WaypointShow>
                  {({ show }) =>
                    <RevealDiv
                      inline
                      marginBottom="10px"
                      fromLeftToRight
                      className={c({ hide: !show })}>
                      <span style={{ display: 'block' }}>
                        <AudioPlayer trackId={0}>
                          {({ play, pause, playing, currentTime, duration }) =>
                            <MusicPlayerContainer>
                              <PlayButton onClick={playing ? pause : play}>
                                <p>
                                  { !playing && <i className="fa fa-play"></i>}
                                  { playing && <i className="fa fa-pause"></i>}
                                </p>
                              </PlayButton>
                              <div>
                                <p style={{ margin: '0 0 10px 0' }}>C2C - Delta</p>
                                <AudioLine>
                                  <span className="mainLine" style={{ width: `${currentTime / duration * 100}%` }}></span>
                                </AudioLine>
                              </div>
                            </MusicPlayerContainer>
                          }
                        </AudioPlayer>
                      </span>
                    </RevealDiv>
                  }
                </WaypointShow>
                <WaypointShow>
                  {({ show }) =>
                    <RevealDiv
                      inline
                      marginBottom="10px"
                      fromLeftToRight
                      className={c({ hide: !show })}>
                      <span style={{ display: 'block' }}>
                        <AudioPlayer trackId={1}>
                          {({ play, pause, playing, currentTime, duration }) =>
                            <MusicPlayerContainer>
                              <PlayButton onClick={playing ? pause : play}>
                                <p>
                                  { !playing && <i className="fa fa-play"></i>}
                                  { playing && <i className="fa fa-pause"></i>}
                                </p>
                              </PlayButton>
                              <div>
                                <p style={{ margin: '0 0 10px 0' }}>
                                  Thutmose - Run Wild (feat. NoMBe)
                                </p>
                                <AudioLine>
                                  <span className="mainLine" style={{ width: `${currentTime / duration * 100}%` }}></span>
                                </AudioLine>
                              </div>
                            </MusicPlayerContainer>
                          }
                        </AudioPlayer>
                      </span>
                    </RevealDiv>
                  }
                </WaypointShow>
                <WaypointShow>
                  {({ show }) =>
                    <RevealDiv
                      inline
                      marginBottom="10px"
                      fromLeftToRight
                      className={c({ hide: !show })}>
                      <span style={{ display: 'block' }}>
                        <AudioPlayer trackId={2}>
                          {({ play, pause, playing, currentTime, duration }) =>
                            <MusicPlayerContainer>
                              <PlayButton onClick={playing ? pause : play}>
                                <p>
                                  { !playing && <i className="fa fa-play"></i>}
                                  { playing && <i className="fa fa-pause"></i>}
                                </p>
                              </PlayButton>
                              <div>
                                <p style={{ margin: '0 0 10px 0' }}>
                                  Pusha T - The Games We Play
                                </p>
                                <AudioLine>
                                  <span className="mainLine" style={{ width: `${currentTime / duration * 100}%` }}></span>
                                </AudioLine>
                              </div>
                            </MusicPlayerContainer>
                          }
                        </AudioPlayer>
                      </span>
                    </RevealDiv>
                  }
                </WaypointShow>
                
                <WaypointShow>
                  {({ show }) =>
                    <Relative>
                      <RightP
                        onClick={step === 2 && nextStep}
                        className={c({ unanswered: step === 2, hide: !show })}
                      >
                        <span>Awesome, What else occupies your time?</span>
                      </RightP>
                      { step === 2 &&
                        <StyledClickHereCircle color={color3} />
                      }
                    </Relative>
                  }
                </WaypointShow>
              </div>
            }
           { step >= 3 &&
              <div>
                <WaypointShow>
                  {({ show }) =>
                    <LeftP className={c({ hide: !show })}>
                      <span>
                       I find reading sci-fi, fictional and fantasy novels a great way to introspect amd pass the time but I'm a very reader and take ages to finish a book. I stacked some of them together, have a look.
                      </span>
                    </LeftP>
                  }
                </WaypointShow>
                <WaypointShow>
                  {({ show }) =>
                    <Relative>
                      <NormalImageStuff
                        inline
                        noPointer
                        marginBottom="30px"
                        className={c({ hide: !show })}>
                        <img src={require('assets/books.jpg')} alt="kitchen on fire" className="thumbnailImage"/>
                      </NormalImageStuff>
                    </Relative>
                  }
                </WaypointShow>
                <WaypointShow>
                  {({ show }) =>
                    <LeftP className={c({ hide: !show })}>
                      <span>
                        Well that's me. It’s been so nice talking to you. Let’s keep in contact, shall we?
                      </span>
                    </LeftP>
                  }
                </WaypointShow>
                <WaypointShow>
                {({ show }) =>
                    <LeftP className={c({ hide: !show })}>
                      <span style={{ display:"inline"}}> 
                          <ul style={{float:"center"}}>
                          <li style={{display:"inline-block", marginLeft:"35%"}}><h4>YOU CAN REACH ME HERE:</h4></li>
                          <li style={{display:"inline-block", marginLeft:"5%"}}><a target="_blank" href="mailto:deepindersingh.23@gmail.com"><h4><i className="fa fa-envelope"></i></h4></a></li>
                          <li style={{display:"inline-block", marginLeft:"5%"}}><a target="_blank" href="https://www.linkedin.com/singh-deepinder"><h4><i className="fa fa-linkedin"></i></h4></a></li>
                          <li style={{display:"inline-block", marginLeft:"5%"}}><a target="_blank" href="https://www.github.com/deepgunner"><h4><i className="fa fa-github"></i></h4></a></li>
                          </ul>
                      </span>
                    </LeftP>
                  }
                </WaypointShow>
              </div>
            } 
            
         
          </Container>
        </ProjectsContainer>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    step: state.aboutMe.step,
    video1Playing: state.aboutMe.video1Playing,
    video2Playing: state.aboutMe.video2Playing,
    sending: state.aboutMe.sending
  }),
  {
    nextStep,
    nextPartialStep,
    pauseVideo1,
    playVideo1,
    pauseVideo2,
    playVideo2,
    sendForm,
  }
)(AboutMe);
