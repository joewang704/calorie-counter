import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import {
  PencilAltIcon,
} from "@heroicons/react/solid";

import DatePicker from "./DatePicker";
import { Entry, useEntriesContext } from "context/Entries";

const now = DateTime.now();

type Props = {
  filter?: (entry: Entry) => boolean
  readonlyDate?: boolean
}

const Entries = ({ filter, readonlyDate }: Props) => {
  const { entries, setEntries } = useEntriesContext();
  const [editingID, setEditingID] = useState<number | undefined>();
  const [page, setPage] = useState<number>(0);

  const addEntry = ({ date, item, calories }: Entry) => {
    const newEntries = entries?.concat([
      {
        date,
        item,
        calories,
      }
    ]);
    setEntries(newEntries);
  }

  const updateEntry = (entry: Entry) => {
    entries[editingID!] = entry;
    setEntries(entries);
    setEditingID(undefined);
  }

  const displayedEntries = filter ? entries.filter(filter) : entries;

  return (
    <>
      <div className="grid grid-cols-[100px_500px_100px_80px] gap-3">
        <div className="font-medium">Date</div>
        <div className="font-medium">Item</div>
        <div className="font-medium">Calories</div>
        <div></div>
        <EntryForm onSubmit={addEntry} readonlyDate={readonlyDate} />

        {displayedEntries?.sort((a, b) => {
          if (a.date == b.date) {
            return 0;
          } else if (a.date < b.date) {
            return 1;
          }
          return -1;
        }).map(({ date, item, calories }, i) => i === editingID ?
          <EntryForm onSubmit={updateEntry} initialState={{ date, item, calories }} submitText="Update" readonlyDate={readonlyDate} key={i} /> : <React.Fragment key={i}>
          <div>{date.toLocaleString()}</div>
          <div>{item}</div>
          <div>{calories}</div>
          <div className="flex items-center"><PencilAltIcon className="w-5 h-5 text-gray-400 hover:text-gray-300 cursor-pointer" onClick={() => setEditingID(i)} /></div>
        </React.Fragment>)}
      </div>
    </>
  );
};

type FormProps = {
  onSubmit: (e: Entry) => void;
  initialState?: Entry;
  submitText?: string;
  readonlyDate?: boolean;
}

const EntryForm = ({ onSubmit, initialState, submitText, readonlyDate }: FormProps) => {
  const [date, setDate] = useState<DateTime>(initialState?.date || now);
  const [item, setItem] = useState<string>(initialState?.item || '');
  const [calories, setCalories] = useState<number>(initialState?.calories || 0);

  const valid = date.isValid && !!item && Number.isSafeInteger(Number(calories)) && Number(calories) > 0;

  const resetForm = () => {
    setItem('');
    setCalories(0);
  }

  return (
    <>
      {readonlyDate ? <div className="flex items-center text-gray-600">{date.toLocaleString()}</div> : <DatePicker onSelect={setDate} date={date} />}
      <input type="text" value={item} onChange={(e) => setItem(e.target.value)}/>
      <input type="text" value={calories} onChange={(e) => setCalories(Number(e.target.value))}/>
      <button className="bg-blue-500 p-2 rounded text-white hover:bg-blue-400 cursor:pointer disabled:bg-gray-300 disabled:hover:bg-gray-300" disabled={!valid} onClick={() => {
        onSubmit({ date, item, calories });
        resetForm();
      }}>{submitText || 'Save'}</button>
    </>
  );
}

export default Entries;
