import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import playImg from './images/play.png';
import clearImg from './images/eraser.png';
import fastImg from './images/fast.png';
import pauseImg from './images/pause.png';
import seedImg from './images/seed.png';
import slowImg from './images/slow.png';
import reportWebVitals from './reportWebVitals';

class Box extends React.Component {
  selectBox = () => {
    this.props.selectBox(this.props.row, this.props.col);
  }
  render() {
    return(
      <div 
        className={this.props.boxClass}
        id={this.props.id}
        onClick={this.selectBox}
      />
    );
  }
}

class Grid extends React.Component{
  render(){
    const width = this.props.cols * 16;
    var rowsArr = [];

    var boxClass = "";
    for(let i = 0; i<this.props.rows; i++) {
      for(let j = 0; j<this.props.cols; j++) {
        let boxId = i + "_" + j;

        boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
        rowsArr.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            row={i}
            col={j}
            selectBox={this.props.selectBox}
          />
        )
      }
    }
    return (
      <div className="grid" style={{width: width}}>
        {rowsArr}
      </div>
    );
  }
}

class Buttons extends React.Component {

  render(){
    return(
      <span className="buttons">
        <img src={playImg} alt="Jouer" onClick={this.props.playButton} title="Play"/>
        <img src={pauseImg} alt="Pause" onClick={this.props.pauseButton}title="Pause"/>
        <img src={clearImg} alt="Effacer" onClick={this.props.clear} title="Clear"/>
        <img src={seedImg} alt="Remplir" onClick={this.props.seed} title="Fill randomly (~1/4)"/>
        <img src={slowImg} alt="Ralentir" onClick={this.props.slow} title="Slow"/>
        <img src={fastImg} alt="Accélérer" onClick={this.props.fast} title="Fast"/>
      </span>
    )
  }
}

class Main extends React.Component {
  constructor() {
    super();
    this.speed = 150;
    this.rows = 30;
    this.cols = 50;

    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }

  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull:gridCopy
    });
  }

  seed = () => {
    let gridCopy = arrayClone(this.state.gridFull);
    for(let i = 0; i<this.rows; i++) {
      for(let j = 0; j<this.cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({
      gridFull:gridCopy
    });
  }

  playButton = () => {
    clearInterval(this.intervalId)
    this.intervalId = setInterval(this.play, this.speed);
  }

  pauseButton = () => {
    clearInterval(this.intervalId);
  }

  slow = () => {
    this.speed = 900;
    this.playButton();
  }

  fast = () => {
    this.speed = 100;
    this.playButton();
  }

  clear = () => {
		var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
		this.setState({
			gridFull: grid,
			generation: 0
		});
    this.pauseButton();
	}



  play = () => {
    let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull);

    // All the rules are here
    for (let i = 0; i < this.rows; i++) {
		  for (let j = 0; j < this.cols; j++) {
		    let count = 0;
		    if (i > 0) if (g[i - 1][j]) count++;
		    if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
		    if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
		    if (j < this.cols - 1) if (g[i][j + 1]) count++;
		    if (j > 0) if (g[i][j - 1]) count++;
		    if (i < this.rows - 1) if (g[i + 1][j]) count++;
		    if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
		    if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;

		    if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
		    if (!g[i][j] && count === 3) g2[i][j] = true;
		  }
		}
		this.setState({
		  gridFull: g2,
		  generation: this.state.generation + 1
		});
  }

// Run methods if component just charged
  componentDidMount(){
    this.seed();
  }

  render(){
    return (
      <div>
        <h1>Game of Life - MONSOA</h1>
        <Buttons
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          seed={this.seed}
        />
        <Grid 
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
        <h2>Génération: {this.state.generation}</h2>
      </div>

    );
  }
}

function arrayClone(arr){
  return JSON.parse(JSON.stringify(arr));
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
