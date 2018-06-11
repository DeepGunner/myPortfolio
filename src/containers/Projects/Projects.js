/* globals emailjs */
import React, { Component } from 'react';
import { ProjectsContainer, Container, Relative } from 'theme/grid';
import { A, FixedTitle } from 'theme/types';
import { connect } from 'react-redux';
import c from 'classnames';


import WaypointShow from 'components/WaypointShow/WaypointShow';

import {LeftP} from './styles';


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
    const { step} = this.props;
   

    return (
      <div>
        <FixedTitle><div style={{backgroundColor : 'transparent'}}>Projects</div></FixedTitle>
        <ProjectsContainer>
          <Container>
            
             { step >= 1 &&
              <div>
                <WaypointShow>
                  {({ show }) =>
                    <LeftP className={c({ hide: !show })}>
                      <span>Here's some of the work I've done in recent months...</span>
                      { step === 1                         
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
