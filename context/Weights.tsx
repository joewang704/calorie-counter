import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { DateTime } from 'luxon';

export type WeightEntry = {
  date: DateTime;
  value: number;
}

type WeightMap = Record<string, number>;
type WeightFn = (d: DateTime, e: number) => void;

type WeightContext = {
  weights: WeightMap;
  setWeight: (d: DateTime, e: number) => void;
}

const initialState: WeightContext = {
  weights: {},
  setWeight: () => {},
};

const KEY = 'weights';

export const WeightContext = createContext<WeightContext>(initialState);

export const useWeightContext = () => useContext(WeightContext);

export const useWeight = (): [WeightMap, WeightFn] => {
  const weightRef = useRef<WeightMap>({});

  useEffect(() => {
    try {
      const weightsParsed = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (weightsParsed) {
        weightRef.current = weightsParsed;
      }
    } catch (error) {
      console.error('Error parsing weights from localStorage: ' + error)
    }
  }, []);

  return [weightRef.current, (date: DateTime, value: number) => {
    weightRef.current[date.toFormat(WEIGHT_DAY_FMT)] = value;
    localStorage.setItem(KEY, JSON.stringify(weightRef.current));
  }];
}

export const WEIGHT_DAY_FMT = 'yyyy LLL dd';