import React from 'react';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import Grid from './Grid.js';
import Buttons from './Buttons.js';

export default class Main extends React.Component {
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
            if (Math.floor(Math.random() * 8) === 1) {
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

// ReactDOM.render(
//   <Main />,
//   document.getElementById('root')
// );


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
