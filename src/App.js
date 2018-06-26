import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import { simpleAction } from './actions/simpleAction'
import CountdownTimer from './CountdownTimer'

class App extends Component {
  // simpleAction = (event) => {
  //   this.props.simpleAction();
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"><FontAwesomeIcon icon={faCoffee} className="cherry-swing coffee-color" /> Lean Coffee Time!</h1>
        </header>
        {/* <button onClick={this.simpleAction}>Test redux action</button>
        <pre>
          {
            JSON.stringify(this.props)
          }
        </pre> */}
        <CountdownTimer />
        <hr />
        <footer>
          &copy; {new Date().getFullYear()} 0xbrock | Switch to the  original AngularJS <a href="https://0xbrock.github.io/LeanCoffeeTimer/">Lean Coffee Timer</a>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
 });
const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
