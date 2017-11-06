// Write JavaScript here and press Ctrl+Enter to execute

const Stars = (props) => {
  return (
    <div className = "col-5">
          {_.range(props.numberOfStars).map(
            (i) =>  <li key={i} className = "fa fa-star"></li>
          )}
    </div>
  )
}
const Button = (props) => {
  return (
    <div className = "col-2">
      <button disabled = {props.selectedNumbers.length===0} className="btn">=</button>
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
    selectedNumbers: [2,4,6],
    randomNumberOfStars: Math.floor(Math.random()*9)+1
  }
  
  selectNumber = (clickedNumber) => { 
      if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {
        return;
      }
      this.setState((prevState) => ({
        selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
      }))
  }
  unselectNumber = (clickedNumber) => { 
      this.setState((prevState) => ({
        selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
      }))
  }
  
  render(){
    const {selectedNumbers, randomNumberOfStars} = this.state
    return(
      <div className = "container">
        <h3>Play Nine</h3>
        <div className = "row">
          <Stars numberOfStars = {randomNumberOfStars}/>
          <Button selectedNumbers = {selectedNumbers} />
          <Answer selectedNumbers = {selectedNumbers} unselectNumber ={this.unselectNumber}/>
        </div>
        <br />
        <Numbers selectedNumbers = {selectedNumbers} selectNumber ={this.selectNumber} />
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