import React, { useState } from "react";
import { DateTime } from "luxon";
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/solid";

import { useEntriesContext } from "context/Entries";
import { useCalorieGoalContext } from "context/CalorieGoal";
import { useWeight } from "context/Weights";
import { isSameDay, isToday, today } from "utils/datetime";
import Entries from "./Entries";

const monthArrowCx = "h-5 w-5 cursor-pointer";

const Daily = () => {
  const { entries } = useEntriesContext();
  const { calorieGoal } = useCalorieGoalContext();
  const [day, setDay] = useState<DateTime>(today);
  const [weights, setWeight] = useWeight();
  const totalCaloriesToday = entries
    .filter(({ date }) => isSameDay(date, day))
    .reduce((acc, cur) => acc + cur.calories!, 0);

  const prevDay = () => {
    setDay(day.minus({ days: 1 }));
  };

  const nextDay = () => {
    setDay(day.plus({ days: 1 }));
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-center w-full">
        <ArrowNarrowLeftIcon className={monthArrowCx} onClick={prevDay} />
        <h1 className="text-3xl font-medium mr-8 ml-8">
          {day.toLocaleString()}
        </h1>
        {isToday(day) || <ArrowNarrowRightIcon className={monthArrowCx} onClick={nextDay} />}
      </div>
      <h2 className="text-lg mb-6">
        {calorieGoal} - {totalCaloriesToday} ={" "}
        {calorieGoal - totalCaloriesToday}
      </h2>
      <Entries readonlyDate filter={({ date }) => isSameDay(date, day)} defaultDate={day} />
    </div>
  );
};

export default Daily;
