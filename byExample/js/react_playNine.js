const Stars = (props) => {
  return (
    <div className = "col-5">
          {_.range(props.numberOfStars).map(
            (i) =>  <i key={i} className = "fa fa-star"></i>
          )}
    </div>
  )
}
const Button = (props) => {
  let button
  switch (props.answerIsCorrect){
    case true:
      button =  <button className="btn btn-success" onClick = {props.acceptAnswer}><i className = "fa fa-check"></i></button>
      break;
    case false:
      button =  <button className="btn btn-danger"><i className = "fa fa-times"></i></button>
      break;  
    default:
      button =  <button 
                  disabled = {props.selectedNumbers.length===0} 
                  className="btn"
                  onClick = {props.checkAnswer}>
                  =
                  </button>
      break;             
  }
  return (
    <div className = "col-2 text-center">
      {button}
      <br /><br />
      <button className = "btn btn-warning btn-sm" onClick = {props.redraw}>
          <i  className="fa fa-refresh"></i>
      </button>
    </div>
  )
}
const Answer = (props) => {
  return (
    <div className = "col-5">
      {props.selectedNumbers.map(
          (number,i) => <span key={i} onClick = {() => props.unselectNumber(number)}>{number}</span>
        )}
    </div>
  )
}

const Numbers = (props) => {
  const numberClassName = (number)=>{
    if (props.usedNumbers.indexOf(number) >= 0) {
      return "used"
    }
    if (props.selectedNumbers.indexOf(number) >= 0) {
      return "selected"
    }
  }
  return(
    <div className = "card text-center">
      <div>
        {Numbers.list.map(
          (number,i) => <span key={i} className={numberClassName(number)} onClick={() => props.selectNumber(number)}>{number}</span>
        )}
      </div>
    </div>
  )
}
Numbers.list = _.range(1,10);


class Game extends React.Component {
  state = {
    selectedNumbers: [],
    usedNumbers: [],
    randomNumberOfStars: Math.floor(Math.random()*9)+1,
    answerIsCorrect: null
  }
  
  checkAnswer = ()=>{
    this.setState(
      prevState => ({
        answerIsCorrect: prevState.randomNumberOfStars  === prevState.selectedNumbers.reduce((acc,n)=>acc+n,0)
      })
    )
  }
  
  acceptAnswer = () => {
    this.setState(
      prevState => ({
        usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
        selectedNumbers: [],
        answerIsCorrect: null,
        randomNumberOfStars: Math.floor(Math.random()*9)+1
      })
    )
  }
  
  selectNumber = (clickedNumber) => { 
      if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {
        return;
      }
      this.setState((prevState) => ({
        answerIsCorrect: null,
        selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        
      }))
  }
  unselectNumber = (clickedNumber) => { 
      this.setState((prevState) => ({
        answerIsCorrect: null,
        selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
      }))
  }
  redraw = () => {
    this.setState({
      randomNumberOfStars: Math.floor(Math.random()*9)+1,
      answerIsCorect: null,
      selectedNumbers: []
    })
  }
  
  render(){
    const {selectedNumbers, randomNumberOfStars, answerIsCorrect, usedNumbers} = this.state
    return(
      <div className = "container">
        <h3>Play Nine</h3>
        <div className = "row">
          <Stars numberOfStars = {randomNumberOfStars}/>
          <Button selectedNumbers = {selectedNumbers} checkAnswer = {this.checkAnswer} answerIsCorrect = {answerIsCorrect} acceptAnswer = {this.acceptAnswer} redraw = {this.redraw} />
          <Answer selectedNumbers = {selectedNumbers} unselectNumber ={this.unselectNumber}/>
        </div>
        <br />
        <Numbers selectedNumbers = {selectedNumbers} selectNumber ={this.selectNumber} usedNumbers ={usedNumbers} />
      </div>
    )
  }
}

class App extends React.Component {
  render(){
    return(
      <div>
        <Game />
      </div>
    )
  }
}




ReactDOM.render(<App />, mountNode);