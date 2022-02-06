import React from 'react';
import { DateTime } from 'luxon';

import { useEntriesContext } from 'context/Entries';
import { useCalorieGoalContext } from 'context/CalorieGoal';
import { isToday, today } from 'utils/datetime';
import Entries from './Entries';

const Calories = () => {
  const { entries } = useEntriesContext();
  const { calorieGoal, setCalorieGoal } = useCalorieGoalContext();
  const totalCaloriesToday = entries.filter(({ date }) => isToday(date)).reduce((acc, cur) => acc + cur.calories, 0);

  return (<div>
    <h1 className="text-3xl mb-4 font-medium">Calories Remaining for {today.toLocaleString()}</h1>
    <h2 className="text-lg mb-6">{calorieGoal} - {totalCaloriesToday} = {calorieGoal - totalCaloriesToday}</h2>
    <Entries readonlyDate filter={({ date }) => isToday(date)} />
  </div>);
}

export default Calories;
