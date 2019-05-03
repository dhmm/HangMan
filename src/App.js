import React   from 'react';
import './App.css';

const buttonEnabledBgColor = '#123456';
const buttonDisabledBgColor = '#654321';
const letters = [
  'A' , 'B' , 'C' , 'D' , 'E' , 'F' ,'G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
];
const singleCharScore = 50;
let WORDS_LIST = [];

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
    this.init(word);
     
  }
  init = (newWord) => {
    this.state = 
    {
      word : newWord,
      wordLetters : newWord.split(''),
      displayedLetters : this.createEmptyArray(newWord.length)
    }  
  }
  createEmptyArray = (length) => {
    let arr = [];
    for(let i=0;i<length;i++) {
      arr[i]="-";
    }
    return arr;
  }
  getDisplayedLetters = ()=> {
    return this.state.displayedLetters;
  }
  newGame = (newWord) => {   
     let word = newWord.toUpperCase();
     this.setState ( 
     {
       word : word.split(''),
       wordLetters : word.split(''),
       displayedLetters : this.createEmptyArray(word.length)   
     });      
  }
  
  showLetter = (letter) => {    
    let newDisplayedLetters = this.state.displayedLetters;    
    for(let i=0; i<this.state.word.length;i++) {
      if(this.state.word[i] === letter ) {
        newDisplayedLetters[i] = letter.toUpperCase();
      }
    }    

    this.setState({
      displayedLetters : newDisplayedLetters
    });
  }

  render() {
    let i=0;
    return(      
      <div className="wordContainer">
      {        
        this.state.displayedLetters.map( (letter) => {
          return <div className="wordLetter">{letter !== "-" ? letter : ' ' }</div>
        })      
      }
      </div>
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

    
    let WORD = this.selectRandomWord();

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

  selectRandomWord = () => {
    let wordsLength = WORDS_LIST.length;
    let min = 1;
    let max = wordsLength;
    let rand = parseInt( (min + Math.random() * (max - min)) );
    rand--;       
    return WORDS_LIST[rand] ;

  }
  newGame = () => {
    
    let WORD = this.selectRandomWord();
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
    this.wordComponent.current.newGame(WORD);
    this.panelComponent.current.newGame();
    for(let i=0;i<letters.length;i++) {
      this.lettersComponents[i].current.newGame();
    }

  }

  help = () => {
    if(this.state.score >= 50) {
    let word = this.state.word;
    let findedLetters = this.wordComponent.current.getDisplayedLetters();
    
    let notFindedChars = [];
    let j=0;
    for(let i=0;i<findedLetters.length;i++) {
      if(findedLetters[i] === "-") {
        notFindedChars[j] = word[i];
        j++;
      }
    }

    let min = 1;
    let max = notFindedChars.length;
    let rand = parseInt( (min + Math.random() * (max - min)) );

    this.checkLetter(notFindedChars[rand-1] , true);
    } else {
      alert('You haven\'t score to get a help');
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

  checkLetter = (letter , isHelp = false)=> {
    if( !this.state.win && !this.state.lost ) {
      let times = this.howManyTimesExists(letter); 
      let addToScore = singleCharScore;
      if(times > 0 )
      {              
        if(times > 1)
        {
          addToScore = times * ( singleCharScore * times);
        } 
        
        if(isHelp) {
          addToScore = -50;
        }
        let newScore = this.state.score + addToScore; ;                
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
              <div className="btn btn-sm btn-warning" onClick={evt=> this.help()}>Help</div>   
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
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", "./words.txt", false);
  rawFile.onreadystatechange = () => {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        WORDS_LIST = allText.split("\r\n"); 
        console.log(WORDS_LIST);         
      }
    }
  };
  rawFile.send(null);
  

  return (
    <Game/>
  );
}
export default App;
