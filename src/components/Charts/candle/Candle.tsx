import React from 'react';
import { Line, Rect } from 'react-native-svg';

import { red, green } from '../../../constants/colors';
import { useCandleChartContext } from './CandleChartContext';

const MARGIN = 2;

export interface Candle {
  time: number;
  close: number;
  open: number;
  high: number;
  low: number;
  volume: number;
}

interface CandleProps {
  candle: Candle;
  index: number;
  width: number;
}

const Candle = ({ candle, index, width }: CandleProps) => {
  const { scaleY, scaleBody } = useCandleChartContext();
  const { close, open, high, low } = candle;
  const fill = close > open ? green[50] : red[70];
  const x = index * width;
  const max = Math.max(open, close);
  const min = Math.min(open, close);
  return (
    <>
      <Line
        x1={x + width / 2}
        y1={scaleY(low)}
        x2={x + width / 2}
        y2={scaleY(high)}
        stroke={fill}
        strokeWidth={1}
      />
      <Rect
        x={x + MARGIN}
        y={scaleY(max)}
        width={width - MARGIN * 2}
        height={scaleBody(max - min)}
        stroke={fill}
        rx={1}
        {...{ fill }}
      />
    </>
  );
};

export default Candle;
