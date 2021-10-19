import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {
  ChartDot,
  ChartPath,
  ChartLine,
  ChartPathProvider,
  monotoneCubicInterpolation,
  useChartData,
  ChartZeroLine,
  //@ts-ignore
} from '@rainbow-me/animated-charts';
import {useDerivedValue} from 'react-native-reanimated';
import {red, violet, green} from '../Constants';
import {Candle} from './candle/Candle';
import {useChartsDataContext} from './Charts';

const Chart = ({size}: {size: {width: number; height: number}}) => {
  const {originalX, originalY} = useChartData();
  const {value, date, data} = useChartsDataContext();

  useDerivedValue(() => {
    if (originalX.value != '') {
      value.value = originalY.value;
      date.value = originalX.value;
    }
  }, [originalX]);

  const strokeColor = useDerivedValue(() => {
    return data[0].close <= data[data.length - 1].close ? green[50] : red[50];
  });

  return (
    <View>
      <ChartPath
        height={size.height - 20}
        width={size.width}
        stroke={strokeColor.value}
        strokeWidth={3}
        selectedStrokeWidth={2}
        negativeColor={red[50]}
        positiveColor={green[50]}
        hapticsEnabled={true}
        
      />
      <ChartDot style={{backgroundColor: violet[60]}} />
      <ChartLine color={violet[60]} length={size.height} />
      <ChartZeroLine color={violet[60]} length={size.width} />
    </View>
  );
};

export default function ChartWithPovider({
  data,
  size,
  active,
}: {
  data: Candle[];
  size: {width: number; height: number};
  active: boolean;
}) {
  const [points, setPoints] = useState(null);

  useEffect(() => {
    const d = data.map((a: Candle) => ({x: a.time * 1000, y: a.close}));
    setPoints(monotoneCubicInterpolation({data: d, range: d.length}));
  }, [data]);

  return (
    <ChartPathProvider
      data={{points, smoothingStrategy: 'simple', smoothingFactor: 0.3}}>
      {active && <Chart size={size} />}
    </ChartPathProvider>
  );
}
