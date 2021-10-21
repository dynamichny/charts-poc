import { round } from 'react-native-redash';

export const formatCurrency = (value: number) => {
  'worklet';
  return `${round(value, 2).toLocaleString('de-DE')}€`;
};

export const formatDatetime = (value: number) => {
  'worklet';
  const d =
    typeof value == 'number' ? new Date(value) : new Date(Number(value));
  return d.toLocaleTimeString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};
