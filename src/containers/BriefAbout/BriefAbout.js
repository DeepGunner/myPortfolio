/* globals emailjs */
import React, { Component } from 'react';
import { RevealDiv, ProjectsContainer, Container, Relative } from 'theme/grid';
import { A, FixedTitle } from 'theme/types';
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
import { Div } from 'theme/grid';

import {
  OrderNumber,
  InstallCode,
  VerticalGuideLine,
  Group,

 
} from './Projects.style';


import DistortionImage from 'react-distortion-image';
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
    const { step, nextStep, pauseVideo1, playVideo1, video1Playing } = this.props;
   

    return (
      <div>
        <FixedTitle><div style={{backgroundColor : 'transparent'}}>Deepinder Singh</div></FixedTitle>
        <ProjectsContainer>
          <Container>
            <WaypointShow>
              {({ show }) =>
                <LeftP className={c({ hide: !show })}>
                  <span>
                    Hi there!
                    <br/><br/>
                    So, as you already know that my name is Deepinder Singh.I am from Faridabad, India and I aspire to be a Front-End Developer.
                  </span>
                </LeftP>
              }
            </WaypointShow>
            { step >= 1 &&
              <WaypointShow>
              {({ show }) =>
                <Relative>
                  <RightP
                    className={c({ unanswered: step === 1, hide: !show })}
                    onClick={nextStep}
                  >
                    <span>
                      Hi Deep,<br/>
                      Nice to meet you, so why do you want to be a Front-End developer?
                    </span>
                  </RightP>
                  { step === 1 &&
                    <StyledClickHereCircle color={color3} />
                  }
                </Relative>
              }
              </WaypointShow>
            }
            { step >= 2 &&
              <div>
                <WaypointShow>
                  {({ show }) =>
                    <LeftP className={c({ hide: !show })}>
                      <span>
                        Good question! Well I love to create things and have always found the front-end aspect of websites and apps 
                        interesting and this is something I'd like to build my career in.
                      </span>
                    </LeftP>
                  }
                </WaypointShow>
            
                <WaypointShow>
                  {({ show }) =>
                    <Relative>
                      <RightP
                        onClick={step === 2 && nextStep}
                        className={c({ unanswered: step === 2, hide: !show })}
                      >
                        <span>Great! So how about we dig right into it and see some of your work?</span>
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
                      <span>Sure! Here's some of the work I've done in recent months...</span>
                      { step === 3                         
                      }
                    </LeftP>
                  }
                </WaypointShow>
                
<WaypointShow bottomOffset={250}>
              {({ show }) =>
                <Group>
                  <Relative textLeft noOverflow>
                    <OrderNumber hide={!show}>
                      <Div>0</Div>
                      <Div>1</Div>
                    </OrderNumber>
                    <InstallCode left hide={!show}><br/>Fungry - Leftover food delivery system  <A target="_blank" href="https://github.com/Fungry/Fungry/">Github</A></InstallCode>
                  </Relative>
                  <Relative>
                    <Relative inline>
                      <VerticalGuideLine left>
                      <A target="_blank" href="https://docs.google.com/presentation/d/1r0uEjk2hZAcVB6hMqjwEfNwV4a6N7taO0HMKk1-Cujw/edit?usp=sharing">Know more</A>
                      </VerticalGuideLine>
                      <DistortionImage
                        style={{ width: 600, height: 400, maxWidth: 'calc(100vw - 80px)',
                          maxHeight: 'calc(66vw - 80px)' }}
                        image1={require('assets/images/fungry.jpeg')}
                        image2={require('assets/images/fungry-s.jpeg')}
                        displacementImage={require('assets/images/3.jpg')}
                      />
                    </Relative>
                  </Relative>
                </Group>
              }
            </WaypointShow>
               
   
                
            
             
            
                <WaypointShow bottomOffset={250}>
              {({ show }) =>
                <Group>
                  <Relative textLeft noOverflow>
                    <OrderNumber hide={!show}>
                      <Div>0</Div>
                      <Div>2</Div>
                    </OrderNumber>
                    <InstallCode left hide={!show}><br/> React-Native To-Do List <A target="_blank" href="https://github.com/DeepGunner/React-Native-To-Do">Github</A></InstallCode>
                  </Relative>
                  <Relative>
                    <Relative inline>
                      <VerticalGuideLine left>
                      <A target="_blank" href="https://github.com/deepgunner"></A>
                      </VerticalGuideLine>
                      <DistortionImage 
                        style={{ width: 600, height: 400, maxWidth: 'calc(100vw - 80px)',
                          maxHeight: 'calc(66vw - 80px)' }}
                        image1={require('assets/images/rntd.png')}
                        image2={require('assets/images/rntd-s.jpeg')}
                        displacementImage={require('assets/images/3.jpg')}
                      />
                    </Relative>
                  </Relative>
                </Group>
              }
            </WaypointShow>
               
        
                
              
              
                <WaypointShow bottomOffset={250}>
              {({ show }) =>
                <Group>
                  <Relative textLeft noOverflow>
                    <OrderNumber hide={!show}>
                      <Div>0</Div>
                      <Div>3</Div>
                    </OrderNumber>
                    <InstallCode left hide={!show}><br/>A chat web app using React.js and websockets <A target="_blank" href="https://github.com/DeepGunner/React-chat-app">Github</A></InstallCode>
                  </Relative>
                  <Relative>
                    <Relative inline>
                      <VerticalGuideLine left>
                      <A target="_blank" href="http://secure-crag-19304.herokuapp.com/">Live Demo</A>
                      </VerticalGuideLine>
                      <DistortionImage
                        style={{ width: 600, height: 400, maxWidth: 'calc(100vw - 80px)',
                          maxHeight: 'calc(66vw - 80px)' }}
                        image1={require('assets/images/rca.jpeg')}
                        image2={require('assets/images/rca-s.jpeg')}
                        displacementImage={require('assets/images/3.jpg')}
                      />
                    </Relative>
                  </Relative>
                </Group>
              }
            </WaypointShow>
               
      
                    
         
              
              
                <WaypointShow bottomOffset={250}>
              {({ show }) =>
                <Group>
                  <Relative textLeft noOverflow>
                    <OrderNumber hide={!show}>
                      <Div>0</Div>
                      <Div>4</Div>
                    </OrderNumber>
                    <InstallCode left hide={!show}><br/>Local weather web app using Yahoo API <A target="_blank" href="https://github.com/DeepGunner/Dawn-To-Dusk">Github</A></InstallCode>
                  </Relative>
                  <Relative>
                    <Relative inline>
                      <VerticalGuideLine left>
                      <A target="_blank" href="https://dawntodusk.herokuapp.com/">Live Demo</A>
                      </VerticalGuideLine>
                      <DistortionImage
                        style={{ width: 600, height: 400, maxWidth: 'calc(100vw - 80px)',
                          maxHeight: 'calc(66vw - 80px)' }}
                        image1={require('assets/images/wapi.jpeg')}
                        image2={require('assets/images/wapi-s.jpeg')}
                        displacementImage={require('assets/images/3.jpg')}
                      />
                    </Relative>
                  </Relative>
                </Group>
              }
            </WaypointShow>
               
    
                
        
              
            
            
                <WaypointShow bottomOffset={250}>
              {({ show }) =>
                <Group>
                  <Relative textLeft noOverflow>
                    <OrderNumber hide={!show}>
                      <Div>0</Div>
                      <Div>5</Div>
                    </OrderNumber>
                    <InstallCode left hide={!show}><br/> Word frequency counter from API <A target="_blank" href="https://github.com/DeepGunner/Word-Frequency-Counter">Github</A></InstallCode>
                  </Relative>
                  <Relative>
                    <Relative inline>
                      <VerticalGuideLine left>
                      <A target="_blank" href="ttt-deep.herokuapp.com">Live Demo</A>
                      </VerticalGuideLine>
                      <DistortionImage
                        style={{ width: 600, height: 400, maxWidth: 'calc(100vw - 80px)',
                          maxHeight: 'calc(66vw - 80px)' }}
                        image1={require('assets/images/ttt.jpeg')}
                        image2={require('assets/images/ttt-s.jpeg')}
                        displacementImage={require('assets/images/3.jpg')}
                      />
                    </Relative>
                  </Relative>
                </Group>
              }
            </WaypointShow>
               
  
                
                <WaypointShow>
              {({ show }) =>
                <Relative>
                  <RightP
                    className={c({ unanswered: step === 3, hide: !show })}
                    onClick={nextStep}
                  >
                    <span>
                      Great, What else do you do besides this?
                    </span>
                  </RightP>
                  { step === 3 &&
                    <StyledClickHereCircle color={color3} />
                  }
                </Relative>
              }
              </WaypointShow>
              </div>
            }

            { step >= 4 &&
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
                        onClick={step === 4 && nextStep}
                        className={c({ unanswered: step === 4, hide: !show })}
                      >
                        <span>Oh nice...What else?</span>
                      </RightP>
                      { step === 4 &&
                        <StyledClickHereCircle color={color3} />
                      }
                    </Relative>
                  }
                </WaypointShow>
              </div>
            }
           
           { step >= 5 &&
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
                        onClick={step === 5 && nextStep}
                        className={c({ unanswered: step === 5, hide: !show })}
                      >
                        <span>Awesome, What else occupies your time?</span>
                      </RightP>
                      { step === 5 &&
                        <StyledClickHereCircle color={color3} />
                      }
                    </Relative>
                  }
                </WaypointShow>
              </div>
            }
           { step >= 6 &&
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
                          <li style={{display:"inline-block", marginLeft:"-5%", fontSize:"18px"}}><h6>YOU CAN REACH ME HERE:</h6></li>
                          <li style={{display:"inline-block", marginLeft:"6%"}}><a target="_blank" href="mailto:deepindersingh.23@gmail.com"><h4><i className="fa fa-envelope"></i></h4></a></li>
                          <li style={{display:"inline-block", marginLeft:"6%"}}><a target="_blank" href="https://www.linkedin.com/singh-deepinder"><h4><i className="fa fa-linkedin"></i></h4></a></li>
                          <li style={{display:"inline-block", marginLeft:"6%"}}><a target="_blank" href="https://www.github.com/deepgunner"><h4><i className="fa fa-github"></i></h4></a></li>
                          <li style={{display:"inline-block", marginLeft:"6%"}}><a target="_blank" href="tel:+919158440020"><h4><i className="fa fa-phone"></i></h4></a></li>
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
