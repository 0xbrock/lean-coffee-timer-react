import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAudio } from './soundGenerator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faUndo } from '@fortawesome/free-solid-svg-icons'

class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    
    this.audio = createAudio({
      sampleRate: 44100,  // hz
      freq: 432,          // hz
      duration: .25
    });

    this.state = {
      timer: null,
      counter: 0,
      initialCountdown: 300,
      decrement: 60,
      countdown: 0
    };
    this.tick = this.tick.bind(this);
    this.startTimer1 = this.startTimer1.bind(this);
    this.stopTimer1 = this.stopTimer1.bind(this);
  }

  componentDidMount() {
    this.setState({counter: this.state.initialCountdown });
  }

  componentWillUnmount() {
    this.stopTimer1();
  }

  startTimer1() {
    this.audio.play();
    let timer = setInterval(this.tick, 1000);
    this.setState({timer: timer, countdown: this.state.counter});
  }

  stopTimer1() {
    this.audio.play();
    if (this.state.timer)
      clearInterval(this.state.timer);
      this.setState({
        timer: undefined
      });
  }

  resetTimer1() {
    this.audio.play();
    if (this.state.timer) 
      clearInterval(this.state.timer);
    this.setState({
      counter: this.state.initialCountdown,
      timerAlert: false,
      forceNext: false,
      timer: undefined
    });
  }

  decrementStart1() {
    this.audio.play();
    this.setState({
      counter: this.state.countdown - this.state.decrement,
      timerAlert: false,
      forceNext: false,
      timer: undefined
    });
  }

  tick() {
    let { counter, countdown, decrement } = this.state;
    if (counter-1 <= 0) {
      this.stopTimer1();
      // Beep
      this.audio.play();
      this.setState({
        counter: 0,
        timerAlert: true,
        forceNext: (countdown - decrement) <= 0
      });
    } else {
      this.setState({
        counter: counter - 1
      });
    }
  }

  handleChange(stateName, e) {
    var newState = { }; 
    newState[stateName] = e.target.value;
    this.setState(newState);
  }

  renderCountdownInfo(counterFormatted, countdown, decrement, timerAlert, timer, forceNext) {
    return (
      <section className="countdownTimerInfo">
          <h1 className="countdown">Time: {counterFormatted}</h1>
          <div className="btn-list">
            { !timerAlert && 
            <div className="list-flex">
              {timer && 
              <button className="btn btn-lg btn-warning" onClick={() => this.stopTimer1()}>Pause&nbsp;&nbsp;<FontAwesomeIcon icon={faPause} /></button>
              }
              { !timer && 
              <button className="btn btn-lg btn-success" onClick={() => this.startTimer1()}>Start&nbsp;&nbsp;<FontAwesomeIcon icon={faPlay} /></button>
              }
              <button className="btn btn-lg btn-danger" onClick={() => this.resetTimer1()}>Reset&nbsp;&nbsp;<FontAwesomeIcon icon={faUndo} /></button>
            </div>
            }
            { timerAlert && 
              <div className="list-flex">
                { !forceNext &&
                <button className="btn btn-lg btn-warning" onClick={() => this.decrementStart1()}>{countdown - decrement} More?&nbsp;&nbsp;<FontAwesomeIcon icon={faPlay} /></button>
                }
                <button className="btn btn-lg btn-danger" onClick={() => this.resetTimer1()}>New Topict&nbsp;&nbsp;<FontAwesomeIcon icon={faUndo} /></button>
              </div>
            }
          </div>
        </section>
    );
  }

  renderSettings(initialCountdown, decrement) {
    return (
      <section className="config">
          <h2 class="page-header">Settings</h2>
          <div className="form-group row">
            <label htmlFor="txtInitialCountdown" class="offset-sm-3 col-sm-3 col-form-label">Initial Countdown (seconds)</label>
            <div className="col-sm-3">
              <input id="txtInitialCountdown"
                type="number"  min="0" max="1800"
                value={initialCountdown} 
                onChange={ this.handleChange.bind(this, "initialCountdown") } 
                placeholder="Initial Countdown"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="txtDecrement" class="offset-sm-3 col-sm-3 col-form-label">Decrement (seconds)</label>
            <div className="col-sm-3">
              <input id="txtDecrement"
                type="number" min="0" max="300"
                value={decrement} 
                onChange={ this.handleChange.bind(this, "decrement") } 
                placeholder="Decrement (in seconds)"
                className="form-control"
              />
            </div>
          </div>
        </section>
    );
  }

  render() {
    const { timer, timerAlert, forceNext, counter, countdown, decrement, initialCountdown } = this.state;
    let counterFormatted = (new Date(counter * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
    if (counterFormatted.startsWith("00:"))
      counterFormatted = counterFormatted.substring(3);

    return (
      <div className="countdownTimer container">
        {this.renderCountdownInfo(counterFormatted, countdown, decrement, timerAlert, timer, forceNext)}
        <hr />
        {this.renderSettings(initialCountdown, decrement)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { timerAlert, timer, decrement, countdown, counter } = state;
  return { timerAlert, timer, decrement, countdown, counter };
}

export default connect(mapStateToProps, { /*startTimer, stopTimer, resetTimer*/ })(CountdownTimer);

//export default CountdownTimer;

/* <Particles 
              params={{
            		"particles": {
                  "number": {
                    "value": 190,
                    "density": {
                      "enable": true,
                      "value_area": 750.1062650542164
                    }
                  },
                  "color": {
                    "value": "#0fff1d"//"#8efaad"
                  },
                  "shape": {
                    "type": "circle",
                    "stroke": {
                      "width": 0,
                      "color": "#000000"
                    },
                    "polygon": {
                      "nb_sides": 5
                    },
                    "image": {
                      "src": "img/github.svg",
                      "width": 100,
                      "height": 100
                    }
                  },
                  "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                      "enable": false,
                      "speed": 1,
                      "opacity_min": 0.1,
                      "sync": false
                    }
                  },
                  "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                      "enable": false,
                      "speed": 40,
                      "size_min": 0.1,
                      "sync": false
                    }
                  },
                  "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                  },
                  "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                      "enable": false,
                      "rotateX": 600,
                      "rotateY": 1200
                    }
                  }
                },
                "interactivity": {
                  "detect_on": "canvas",
                  "events": {
                    "onhover": {
                      "enable": false,
                      "mode": "bubble"
                    },
                    "onclick": {
                      "enable": true,
                      "mode": "push"
                    },
                    "resize": true
                  },
                  "modes": {
                    "grab": {
                      "distance": 400,
                      "line_linked": {
                        "opacity": 1
                      }
                    },
                    "bubble": {
                      "distance": 400,
                      "size": 40,
                      "duration": 2,
                      "opacity": 8,
                      "speed": 3
                    },
                    "repulse": {
                      "distance": 200,
                      "duration": 0.4
                    },
                    "push": {
                      "particles_nb": 4
                    },
                    "remove": {
                      "particles_nb": 2
                    }
                  }
                },
                "retina_detect": true
            	}}
              style={{
                width: '100%',
                height: '200px',
                backgroundColor: "#3744a7"//,
                //backgroundImage: `url(${logo})` 
              }}
            >I AM AWESOME
            </Particles> */
