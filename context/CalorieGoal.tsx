import React, { createContext, ReactNode, useContext, useState } from 'react';

const DEFAULT_CALORIE_GOAL = 2200;

type CalorieGoalContext = {
  calorieGoal: number;
  setCalorieGoal: (e: number) => void;
}

const initialState: CalorieGoalContext = {
  calorieGoal: DEFAULT_CALORIE_GOAL,
  setCalorieGoal: () => {},
};

export const CalorieGoalContext = createContext<CalorieGoalContext>(initialState);

export const useCalorieGoalContext = () => useContext(CalorieGoalContext);

export const CalorieGoalProvider = ({ children }: { children: ReactNode }) => {
  const [calorieGoal, setCalorieGoal] = useState<number>(DEFAULT_CALORIE_GOAL);

  return (
    <CalorieGoalContext.Provider value={{
      calorieGoal,
      setCalorieGoal
    }}>
      {children}
    </CalorieGoalContext.Provider>
  );
}