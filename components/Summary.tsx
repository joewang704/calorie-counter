import React from 'react';

import { useEntriesContext } from 'context/Entries';

const Summary = () => {
  const { entries } = useEntriesContext();
  const calorieCountsByDate = entries.reduce<Record<string, number>>((acc, cur) => {
    const dateStr = cur.date.toLocaleString();
    acc[dateStr] = cur.calories + (acc[dateStr] || 0);
    return acc;
  }, {})

  return <div>
    <h1 className="text-3xl mb-4 font-medium">Summary</h1>
    <div className="grid grid-cols-[100px_80px] gap-3">
      <div className="font-medium">Date</div>
      <div className="font-medium">Calories</div>
      {Object.keys(calorieCountsByDate).map((dateStr, i) => (
        <React.Fragment key={i}>
          <div>{dateStr}</div>
          <div>{calorieCountsByDate[dateStr]}</div>
        </React.Fragment>
      ))}
    </div>
  </div>;
}

export default Summary;