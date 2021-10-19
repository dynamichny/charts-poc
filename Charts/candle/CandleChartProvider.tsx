import React, {useMemo} from 'react';
import {interpolate, Extrapolate} from 'react-native-reanimated';
import {Candle} from './Candle';

import CandleChartContext, {useGenerateValues} from './CandleChartContext';

export default function CandleChartProvider({
  data: candles,
  size,
  children,
}: {
  data: Candle[];
  size: {width: number; height: number};
  children?: JSX.Element;
}) {
  const values = useGenerateValues();
  const step = size.width / candles.length;

  const scaleY = (value: number) => {
    'worklet';
    return interpolate(value, domain, [size.height, 0], Extrapolate.CLAMP);
  };

  const scaleBody = (value: number) => {
    'worklet';
    return interpolate(
      value,
      [0, Math.max(...domain) - Math.min(...domain)],
      [0, size.height],
      Extrapolate.CLAMP,
    );
  };

  const getDomain = (rows: Candle[]): [number, number] => {
    'worklet';
    const values = rows.map(({high, low}) => [high, low]).flat();
    return [Math.min(...values), Math.max(...values)];
  };

  const domain = getDomain(candles);
  const domainReversed = getDomain(candles).reverse();

  const scaleYInvert = (y: number) => {
    'worklet';
    return interpolate(y, [0, size.height], domainReversed, Extrapolate.CLAMP);
  };

  const contextValue = useMemo(
    () => ({
      ...values,
      candles,
      size,
      step,
      scaleY,
      scaleYInvert,
      scaleBody,
      getDomain,
      domainReversed,
    }),
    [
      values,
      candles,
      size,
      step,
      scaleY,
      scaleYInvert,
      scaleBody,
      getDomain,
      domainReversed,
    ],
  );

  return (
    <CandleChartContext.Provider value={contextValue}>
      {children}
    </CandleChartContext.Provider>
  );
}
