import React from 'react';
import playImg from './images/play.png';
import clearImg from './images/eraser.png';
import fastImg from './images/fast.png';
import pauseImg from './images/pause.png';
import seedImg from './images/seed.png';
import slowImg from './images/slow.png';

export default class Buttons extends React.Component {
    render(){
        return(
            <span className="buttons">
            <img src={playImg} alt="Jouer" onClick={this.props.playButton} title="Play"/>
            <img src={pauseImg} alt="Pause" onClick={this.props.pauseButton}title="Pause"/>
            <img src={clearImg} alt="Effacer" onClick={this.props.clear} title="Clear"/>
            <img src={seedImg} alt="Remplir" onClick={this.props.seed} title="Fill randomly (~1/8)"/>
            <img src={slowImg} alt="Ralentir" onClick={this.props.slow} title="Slow"/>
            <img src={fastImg} alt="Accélérer" onClick={this.props.fast} title="Fast"/>
            </span>
        )
    }
}