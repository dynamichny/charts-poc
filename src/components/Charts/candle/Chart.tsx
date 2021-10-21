import React from 'react';
import { Svg } from 'react-native-svg';
import Candle from './Candle';
import { useCandleChartContext } from './CandleChartContext';

const Chart = () => {
  const { size, step, candles } = useCandleChartContext();
  return (
    <Svg width={size.width} height={size.height}>
      {candles.map((candle, index) => (
        <Candle key={candle.time} width={step} {...{ candle, index }} />
      ))}
    </Svg>
  );
};

export default Chart;
