import { observable, action } from 'mobx';
import { isUndefined } from 'lodash';

export class WorldGenerator {

  @observable map2DArray = [];
  @observable fillPercentage = 54;
  mapHeight = 10;
  mapWidth = 10;

  smoothingIterations = 5;

  constructor(height, width, fillPercentage) {
    this.mapHeight = height;
    this.mapWidth = width;
    this.randomizeMapArray(fillPercentage);
  }

  @action
  randomizeMapArray() {
    this.foreachMapNode((h, w) => {
      if (!this.rowExists(h)) {
        this.map2DArray[h] = [];
      }
      const randomInt = this.getRandomInt(100);
      if (randomInt < this.fillPercentage) {
        this.map2DArray[h][w] = 1
      } else {
        this.map2DArray[h][w] = 0
      }
    });
    for(let i = 0; i < this.smoothingIterations; i++){
      setTimeout(() => {this.smoothMap()}, 1000 * i + 1000);
    }
    
  }

  getNodeNeighbours(h, w) {
    const wallCount = 0;

    for (const y = h - 1; y <= h + 1; y++) {
      for (const x = w - 1; x <= w + 1; x++) {
        if (this.rowExists(y)) {
          if (this.nodeExists(y, x)) {
            if (this.map2DArray[y][x]) {
              wallCount++
            }
          }
        }
      }
    }
    return wallCount;
  }
 @action
  smoothMap() {
    this.foreachMapNode((h, w) => {
      if (this.getNodeNeighbours(h, w) > 4) {
        this.map2DArray[h][w] = 1;
      } else {
        this.map2DArray[h][w] = 0;
      }
    });
  }

  setFillPercentage = (event) => {
    this.fillPercentage = event.target.value;
  }

  rowExists(h) {
    if (h > this.mapHeight || h < 0)
      return false;
    return !isUndefined(this.map2DArray.slice()[h]);
  }

  nodeExists(h, w) {
    // console.log(h,w,!(isUndefined(this.map2DArray[h]) || isUndefined(this.map2DArray[h][w]))); DONT DELETE EVER
    if (h > this.mapHeight || h < 0)
      return false;
    if (w > this.mapWidth || w < 0)
      return false;
    return !(isUndefined(this.map2DArray.slice()[h]) || isUndefined(this.map2DArray.slice()[h].slice()[w]));
  }

  @action
  foreachMapNode(doSomeStuff) {
    for (const h = 0; h < this.mapHeight; h++) {
      for (const w = 0; w < this.mapWidth; w++) {
        doSomeStuff(h, w);
      }
    }
  }

  @action
  foreachMapRow(doSomeStuff) {
    for (const h = 0; h < this.mapHeight; h++) {
      doSomeStuff(h);
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  printMapArray() {
    this.foreachMapRow((h) => {
      console.log(this.map2DArray[h].slice().join("  "));
    })
  }
}