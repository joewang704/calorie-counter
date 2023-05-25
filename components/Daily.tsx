import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/solid";

import { useEntriesContext } from "context/Entries";
import { useCalorieGoalContext } from "context/CalorieGoal";
import { WEIGHT_DAY_FMT, useWeight } from "context/Weights";
import { isSameDay, isToday, today } from "utils/datetime";
import Entries from "./Entries";

const monthArrowCx = "h-5 w-5 cursor-pointer";

const Daily = () => {
  const { entries } = useEntriesContext();
  const { calorieGoal } = useCalorieGoalContext();
  const [day, setDay] = useState<DateTime>(today);
  const [weight, setWeight] = useState<number | undefined>();
  const [weights, logWeight] = useWeight();
  const totalCaloriesToday = entries
    .filter(({ date }) => isSameDay(date, day))
    .reduce((acc, cur) => acc + cur.calories!, 0);

  const prevDay = () => {
    setDay(day.minus({ days: 1 }));
  };

  const nextDay = () => {
    setDay(day.plus({ days: 1 }));
  };

  useEffect(() => {
    const fetched = weights[day.toFormat(WEIGHT_DAY_FMT)];
    if (fetched) {
      setWeight(fetched);
    } else {
      setWeight(undefined);
    }
  }, [weights, day]);

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
      <div className="flex flex-row items-center justify-center w-full">
        <h1 className="text-3xl font-medium mt-8">
          Weight Log
        </h1>
      </div>
      <input type="text" inputMode="numeric" pattern="[0-9]*"
        value={weight || ''}
        onChange={(e) => e.target.value && setWeight(Number(e.target.value))}
      />
      <button
        className="ml-4 bg-blue-500 p-2 rounded text-white hover:bg-blue-400 cursor:pointer disabled:bg-gray-300 disabled:hover:bg-gray-300"
        disabled={!weight || !day}
        onClick={() => {
          logWeight(day, weight!);
        }}
      >
        Save
      </button>
    </div>
  );
};

export default Daily;
