import { observer } from 'mobx-react';
import styled from 'styled-components';
import React from 'react';

import {
  GreenGrass,
  BlueWater
} from '../tiles'

const WorldMap = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: scroll;
  flex-shrink: 0;
  /* transform: rotate(-25deg) skew(45deg,10deg) translate(300px, 200px); */
`;

export const WorldRender = observer(
  ({ biome, worldGen, tileDimensions }) => (
    <WorldMap>
      {
        worldGen.map2DArray.map((row, rowIndex) => (
          row.map((node, nodeIndex) => (

            (node) ?
              <div key={`${rowIndex}-${nodeIndex}`} style={{
                position: "absolute",
                transform: `translate(${nodeIndex * tileDimensions.w}px, ${rowIndex * tileDimensions.h}px)`,
                background: "green",
                width: tileDimensions.w,
                height: tileDimensions.h
              }} /> :
              <div key={`${rowIndex}-${nodeIndex}`} style={{
                position: "absolute",
                transform: `translate(${nodeIndex * tileDimensions.w}px, ${rowIndex * tileDimensions.h}px)`,
                background: "navy",
                width: tileDimensions.w,
                height: tileDimensions.h
              }} />
          ))
        ))
      }
    </WorldMap>
  )
)