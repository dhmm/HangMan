import React  , {forwardRef, userRef , useImperativeHandle } from 'react';
import './App.css';

const buttonEnabledBgColor = '#123456';
const buttonDisabledBgColor = '#654321';
const letters = [
  'A' , 'B' , 'C' , 'D' , 'E' , 'F' ,'G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
];

class Button extends React.Component {
  render()
  {
    return(
      <div className="btn btn-sm btn-primary">{this.props.title}</div>
    );
  }
}
class HangMan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mistakes : this.props.mistakes
    }
  }
  render() {

    return (
      <div className="hangmanContainer">        

          { this.state.mistakes >= 1 ? <div className="hangmanHead"></div> : '' }
          { this.state.mistakes >= 2 ? <div className="hangmanHeadDown"></div> : '' }  
          { this.state.mistakes >= 3 ? <div className="hangmanBodyContainer"> 
              <div className="hangmanBody"></div>
              { this.state.mistakes >= 4 ? <div className="hangmanLeftArm"></div> : '' }
              { this.state.mistakes >= 5 ? <div className="hangmanRightArm"></div> : '' }
          </div>  : '' }                                 
          { this.state.mistakes >= 6 ? <div className="hangmanLeftLeg"></div>  : '' }
          { this.state.mistakes >= 7 ? <div className="hangmanRightLeg"></div> : '' }
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
      background : buttonEnabledBgColor ,
      fnCheckLetter : this.props.fnCheckLetter
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
    this.checkLetter = () => {
      if(this.state.disabled!==true) {        
        this.disable();
        this.state.fnCheckLetter(this.state.letter);
      }
    }
    
  }
  render(){
    return(
      <div className={this.state.activeClassName} style={{background:this.state.background}} onClick={evt=>this.checkLetter()}>{this.props.letter}</div>
    )
  }
}

class Word extends React.Component {
  
  constructor(props) {
    super(props);
    let word = this.props.word.toUpperCase();    
    this.wordLetters = new Array();       
    this.state = 
    {
      word : word.split('')      
    }    

    for(let i=0; i<word.length;i++) {
      this.wordLetters[i] = React.createRef();             
    }

  }
  showLetter = (letter) => {
    for(let i=0; i<this.state.word.length;i++) {
      if(this.wordLetters[i].current.props.letter == letter )
      {
        this.wordLetters[i].current.showLetter();
      }
    }    
  }

  render() {
    let i=0;
    return(      
      <div className="wordContainer">
      {        
        this.state.word.map( (letter) => {
          return <WordLetter letter={letter} ref={this.wordLetters[i++]}/>
        })       
      }
      </div>
    );
  }
}
class WordLetter extends React.Component {
  constructor(props) {
    super(props);
    this.state = 
    {
      letter : this.props.letter ,
      finded : false ,

      fnShowCharacter : this.showCharacter
    }
  }

  showLetter = ()=> {
    this.setState({
      finded:true
    });
  }

  render() {
    var displayedLetter = '-';
    if(this.state.finded===true) {
      displayedLetter = this.state.letter
    }
    

    return(
      <div className="wordLetter">{displayedLetter}</div>
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
class Game extends React.Component {
  constructor(props)
  {
    super(props);
    this.wordComponent = React.createRef();

    this.state = {
      mistakes : 0,
      score : 0,
      word: 'ALELA' 
    } 
    this.checkLetter = (letter)=> {
      if(this.state.word.indexOf(letter) > -1 ) {          
        this.wordComponent.current.showLetter(letter);      
      } else {
        alert("Problemmmmm");
      }
    }

  }

  render()
  {
    return(
      <div>
      <div className="row">
        <div className="col-md-3 hangmanCol">
        <HangMan mistakes={this.state.mistakes}/>
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
          {<Word word="ALELA" ref={this.wordComponent}/>}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          { 
            letters.map((letter) => {
              return <Letter letter={letter} fnCheckLetter={evt=> this.checkLetter(letter)} />
            })
          }
        </div>        
      </div>            
    </div>
    );
  }
}



function App() {    
  return (
    <Game/>
  );
}
export default App;
