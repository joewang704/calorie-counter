import React, { useEffect, useMemo, useRef, useState } from "react";
import { DateTime } from "luxon";
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/solid";

const monthArrowCx = "h-5 w-5 text-sky-500 cursor-pointer";

type Props = {
  onSelect: (date: DateTime) => void;
  date: DateTime;
}

const DatePicker = ({ onSelect, date }: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [month, setMonth] = useState<DateTime>(date.startOf("month"));
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fn = (event: MouseEvent) => {
      if (event.target instanceof Element && ref.current && !ref.current.contains(event.target)) {
        setModalIsOpen(false);
      }
    }
    window.addEventListener('click', fn);
    return () => {
      window.removeEventListener('click', fn);
    };
  }, []);

  const daysInMonth = useMemo(() => {
    const days: DateTime[] = [];
    for (let i = 0; i < month.daysInMonth; i++) {
      days.push(month.plus({ days: i }));
    }
    return days;
  }, [month]);

  return (
    <div className="relative select-none" ref={ref}>
      <input
        type="text"
        value={date.toLocaleString()}
        onFocus={() => setModalIsOpen(true)}
        className="w-full h-full"
        readOnly
      />
      {modalIsOpen && (
        <div className="absolute flex flex-col text-center bg-white rounded shadow p-7">
          <div className="font-medium mb-3 flex justify-between items-center">
            <ArrowNarrowLeftIcon
              className={monthArrowCx}
              onClick={() => setMonth(month.minus({ month: 1 }))}
            />
            {month.monthLong} {month.year}
            <ArrowNarrowRightIcon
              className={monthArrowCx}
              onClick={() => setMonth(month.plus({ month: 1 }))}
            />
          </div>
          <div className="grid grid-cols-7 w-60 mb-1">
            {["S", "M", "T", "W", "T", "F", "S"].map((wkd, i) => (
              <div className="font-medium border-solid border-b border-gray-100" key={i}>{wkd}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 w-60">
            {daysInMonth.map((day, i) => {
              const isSelected = day.hasSame(date, "day");
              const gridColumnStart = i === 0 ? month.plus({ days: 1 }).weekday : undefined;
              const cursor = isSelected ? 'default' : 'pointer';

              return (
                <div
                  className={isSelected ? "bg-sky-400 rounded hover:bg-sky-200 hover:rounded flex justify-center items-center" : "hover:bg-sky-200 hover:rounded flex justify-center items-center"}
                  onClick={() => {
                    onSelect(day);
                    setModalIsOpen(false);
                  }}
                  style={{ gridColumnStart, cursor }}
                  key={i}
                >
                  {day.day}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
