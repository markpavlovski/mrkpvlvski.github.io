// jscompplete.com/repl

const 

const Stars = (props) => {
  return (
    <div className = "col-5">
        <li className = "fa fa-star"></li>
        <li className = "fa fa-star"></li>
        <li className = "fa fa-star"></li>
        <li className = "fa fa-star"></li>
    </div>
  )
}
const Button = (props) => {
  return (
    <div className = "col-2">
      <button>=</button>
    </div>
  )
}
const Answer = (props) => {
  return (
    <div className = "col-5">
      ...
    </div>
  )
}

const Numbers = (props) => {
  return(
    <div className = "card text-center">
      <div>
        <span className = "selected">1</span>
        <span className = "used">2</span>
        <span>3</span>
      </div>
    </div>
  )
}


class Game extends React.Component {
  render(){
    return(
      <div className = "container">
        <h3>Play Nine</h3>
        <div className = "row">
          <Stars />
          <Button />
          <Answer />
        </div>
        <br />
        <Numbers />
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