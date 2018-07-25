import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import { WorldGenerator } from './engines/worldGenerator';
import { WorldRender } from './engines/worldRender';

import { GrassPlains } from './biomes';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
    this.worldGen = new WorldGenerator(100, 100, 45);
    
    window.worldGen = this.worldGen;
  }

  render() {
    return (
      <div>
        <input type="number" onChange={this.worldGen.setFillPercentage}/>
        <button onClick={()=>{this.worldGen.randomizeMapArray(54)}}>Regenerate</button>
        <button onClick={()=>{this.worldGen.smoothMap()}}>Smooth</button>
        <WorldRender  worldGen={this.worldGen} tileDimensions={{ h: 10, w: 10 }} />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
