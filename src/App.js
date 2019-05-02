import React   from 'react';
import './App.css';

const buttonEnabledBgColor = '#123456';
const buttonDisabledBgColor = '#654321';
const letters = [
  'A' , 'B' , 'C' , 'D' , 'E' , 'F' ,'G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
];
const singleCharScore = 50;

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
  newGame = () => {    
    this.setState({
      mistakes : 0
    })
  }

  increaseMistakes = ()=> {
    this.setState({
      mistakes: this.state.mistakes+1
    })
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
      gameFinished : false ,
      disabled: false ,
      activeClassName : "btn btn-sm btn-primary" ,
      background : buttonEnabledBgColor ,
      check : this.props.check
    };  
  }
  newGame = ()=> {
    this.setState({
      gameFinished : false ,
      disabled: false ,
      activeClassName : "btn btn-sm btn-primary" ,
      background : buttonEnabledBgColor ,
      check : this.props.check
    })
  }
  disable = () => {
    if(this.state.gameFinished === false) {
      this.setState ({
        disabled : true,
        activeClassName : "btn btn-sm btn-primary disabled",
        background : buttonDisabledBgColor
      });
    }
  }
  enable = () => {
    if(this.state.gameFinished === false) {
      this.setState ({
        disabled : false,
        activeClassName : "btn btn-sm btn-primary",
        background : buttonEnabledBgColor
      });
    }
  }
  checkLetter = () => {
    if(this.state.gameFinished === false) {
      if(this.state.disabled!==true) {        
        this.disable();
        this.state.check(this.state.letter);
      }
    }
  }
  gameFinished = ()=> {
    this.setState({
      gameFinished: true
    })
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
    this.wordLetters = [];       
    this.state = 
    {
      word : word.split('')      
    }    

    for(let i=0; i<word.length;i++) {
      this.wordLetters[i] = React.createRef();             
    }
  }
  newGame = () => {    
    let word = this.props.word.toUpperCase();            
    this.state = 
    {
      word : word.split('')      
    }    

    for(let i=0; i<word.length;i++) {
      this.wordLetters[i].current.newGame();            
    }
  }
  showLetter = (letter) => {
    for(let i=0; i<this.state.word.length;i++) {
      if(this.wordLetters[i].current.props.letter === letter )
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
  newGame = () => {
    this.setState({
      letter : this.props.letter ,
      finded : false      
    })
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
  newGame = () => {
    this.setState ({
      score: 0 ,
      message : ''      
    });
  }
  addScore(score) {
    this.setState({
      score: this.state.score+score
    })
  }

  youWin() {
    this.setState({
      message: 'You winnn !!!!'
    })
  }

  youLost() {
    this.setState({
      message: 'You lost :( !!!!'
    })
  }

  render() {
    return (
      <div>
        <div>Score : <b>{this.state.score}</b></div>
        <div><h4>{this.state.message}</h4></div>
      </div>
    );
  }
}
class Game extends React.Component {
  constructor(props)
  {
    super(props);
    this.wordComponent = React.createRef();
    this.hangManComponent = React.createRef();
    this.panelComponent = React.createRef();
    this.lettersComponents = [];

    let WORD = "test";

    this.state = {
      mistakes : 0,
      score : 0,
      word: WORD.toUpperCase(),
      wordLength : WORD.length,
      findedLetters : 0 ,

      win : false,
      lost: false
    } 

    for(let i=0; i<letters.length;i++) {
      this.lettersComponents[i] = React.createRef();             
    }   
  }

  newGame = () => {
    
    let WORD = "test";
    this.setState({
      mistakes : 0,
      score : 0,
      word: WORD.toUpperCase(),
      wordLength : WORD.length,
      findedLetters : 0 ,

      win : false,
      lost: false
    });
    
    this.hangManComponent.current.newGame();
    this.wordComponent.current.newGame();
    this.panelComponent.current.newGame();
    for(let i=0;i<letters.length;i++) {
      this.lettersComponents[i].current.newGame();
    }

  }

  howManyTimesExists = (letter) => {
    if( !this.state.win && !this.state.lost ) {
      let times = 0;
      for(let i = 0;i<this.state.word.length;i++) {
        if(this.state.word[i]===letter) {
          times++;
        }
      }      
      return times;
    }
  }

  checkLetter = (letter)=> {
    if( !this.state.win && !this.state.lost ) {
      let times = this.howManyTimesExists(letter); 
      let addToScore = singleCharScore;
      if(times > 0 )
      {              
        if(times > 1)
        {
          addToScore = times * ( singleCharScore * times);
        } 
        
        let newScore = this.state.score+addToScore;
        let newFindedLetters = this.state.findedLetters + times;

        this.setState({
          score: newScore ,
          findedLetters : newFindedLetters
        });                
        this.panelComponent.current.addScore(addToScore);
        this.wordComponent.current.showLetter(letter);    
        
        if(this.state.wordLength === newFindedLetters) {
          this.panelComponent.current.youWin();
          this.setState({
            win:true
          });
          this.gameFinished();
        }
      }
      else
      {
        let newMistakes = this.state.mistakes + 1;  
        this.setState({
          mistakes: newMistakes
        })             
        this.hangManComponent.current.increaseMistakes();
        if(newMistakes === 7){
          this.panelComponent.current.youLost();
          this.setState({
            lost:true
          });
          this.gameFinished();
        }        
      } 
    }     
  }    

  check = (letter) => {
    if( !this.state.win && !this.state.lost ) {
      this.checkLetter(letter);
    }
  }

  gameFinished = () => {
    for(let i=0;i<letters.length;i++) {
      this.lettersComponents[i].current.gameFinished();
    }
  }

  render()
  {
    let i=0;
    return(
      <div>
      <div className="row">
        <div className="col-md-3 hangmanCol">
        <HangMan mistakes={this.state.mistakes} ref={this.hangManComponent} />
        </div>
        <div className="col-md-9 panelCol">
          <div className="row">
            <div className="col-md-12">
              <div className="btn btn-sm btn-primary" onClick={evt=> this.newGame()}>New game</div>              
            </div>            
          </div>
          <div className="row">&nbsp;</div>
          <div className="row">
            <div className="col-md-12">
              <Panel ref={this.panelComponent}/>
            </div>
          </div>
          
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {<Word word={this.state.word} ref={this.wordComponent}/>}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {            
            letters.map((letter) => {
              return <Letter letter={letter} check={evt=> this.check(letter)} ref={this.lettersComponents[i++]} />
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
