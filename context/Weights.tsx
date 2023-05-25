import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { DateTime } from 'luxon';

export type WeightEntry = {
  date: DateTime;
  value: number;
}

type WeightMap = Record<string, number>;

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

export const useWeight = () => {
  const weightRef = useRef<WeightMap>({});

  useEffect(() => {
    try {
      const weightsParsed = JSON.parse(localStorage.getItem(KEY) || '');
      if (weightsParsed) {
        weightRef.current = weightsParsed;
      }
    } catch (error) {
      console.error('Error parsing items from localStorage: ' + error)
    }
  }, []);

  return [weightRef.current, (date: DateTime, value: number) => {
    weightRef.current[date.toFormat('yyyy LLL dd')] = value;
    localStorage.setItem(KEY, JSON.stringify(weightRef.current));
  }];
}

