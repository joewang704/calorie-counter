import { createContext, useContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';

export type Entry = {
  date: DateTime;
  item: string;
  calories?: number;
}

type EntriesContext = {
  entries: Entry[];
  setEntries: (e: Entry[]) => void;
}

const initialState: EntriesContext = {
  entries: [],
  setEntries: () => {},
};

export const EntriesContext = createContext<EntriesContext>(initialState);

export const useEntriesContext = () => useContext(EntriesContext);

export const useEntries = (): [Entry[], (e: Entry[]) => void] => {
  const [entries, setEntries] = useState<Entry[]>([]);
  console.log('entries updated');
  console.log(entries);

  useEffect(() => {
    try {
      const entriesRaw = JSON.parse(localStorage.getItem('entries') || '');
      const entries = entriesRaw.map((e: Record<string, string>) => Object.assign({}, e, { date: DateTime.fromISO(e.date) }));
      if (entries) {
        setEntries(entries);
      }
    } catch (error) {
      console.error('Error parsing items from localStorage: ' + error)
    }
  }, []);

  return [entries, (e) => {
    setEntries(e);
    console.log('new entries');
    console.log(e);
    localStorage.setItem('entries', JSON.stringify(e));
  }];
}
