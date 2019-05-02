import React from 'react';
import './App.css';

const buttonEnabledBgColor = '#123456';
const buttonDisabledBgColor = '#654321';
const letters = [
  'A' , 'B' , 'C' , 'D' , 'E' , 'F' ,'G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
];

class Button extends React.Component {
  constructor(props)
  {
    super(props);
  }
  render()
  {
    return(
      <div className="btn btn-sm btn-primary">{this.props.title}</div>
    );
  }
}
class HangMan extends React.Component {
  render() {
    return (
      <div className="hangmanContainer">
        <div className="hangmanHead"></div>
        <div className="hangmanHeadDown"></div>
        <div className="hangmanBodyContainer">
        <div className="hangmanBody"></div>
          <div className="hangmanLeftArm"></div>
          <div className="hangmanRightArm"></div>
        </div>
        <div className="hangmanLeftLeg"></div>
        <div className="hangmanRightLeg"></div>            
      </div>
    )
  }
}
class Letter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false ,
      activeClassName : "btn btn-sm btn-primary" ,
      background : buttonEnabledBgColor
    };

    this.disable = () => {
      this.setState ({
        disabled : true,
        activeClassName : "btn btn-sm btn-primary disabled",
        background : buttonDisabledBgColor
      });
    }
    this.enable = () => {
      this.setState ({
        disabled : false,
        activeClassName : "btn btn-sm btn-primary",
        background : buttonEnabledBgColor
      });
    }
    this.changeState = () => {
      if(this.state.disabled===true) {
        this.enable();
      } else {
        this.disable();
      }
    }
    
  }
  render(){
    return(
      <div className={this.state.activeClassName} style={{background:this.state.background}} onClick={this.changeState}>{this.props.letter}</div>
    )
  }
}
class WordLetter extends React.Component {
  render() {
    return(
      <div className="wordLetter">A</div>
    );
  }
}
class Panel extends React.Component {
  constructor(props)
  {    
    super(props);

    this.state = {
      score: 0 ,
      message : ''
    }

    
  }
  render() {
    return (
      <div>
        <div>Score : <b>{this.state.score}</b></div>
        <div>{this.state.message}</div>
      </div>
    );
  }
}
function App() {
  
  
  return (
    <div>
      <div className="row">
        <div className="col-md-3 hangmanCol">
        <HangMan/>
        </div>
        <div className="col-md-9 panelCol">
          <div className="row">
            <div className="col-md-12">
              <Button title="New game"/>
            </div>            
          </div>
          <div className="row">&nbsp;</div>
          <div className="row">
            <div className="col-md-12">
              <Panel/>
            </div>
          </div>
          
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="wordContainer">
          <WordLetter/>
          <WordLetter/>
          <WordLetter/>
          <WordLetter/>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          { 
            letters.map((letter) => {
              return <Letter letter={letter}/>
            })
          }
        </div>        
      </div>            
    </div>
  );
}

export default App;
