import React, { ReactNode } from 'react';
import { DateTime } from 'luxon';

import { EntriesContext, Entry } from 'context/Entries';
import { CalorieGoalProvider } from 'context/CalorieGoal';
import Navbar from './shared/Navbar';
import Header from './Header';

const Layout = ({ children }: { children: ReactNode }) => {
  const [entries, setEntries] = React.useState<Entry[]>([]);
  console.log('entries updated');
  console.log(entries);

  React.useEffect(() => {
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

  const setSavedEntries = (e: Entry[]) => {
    setEntries(e);
    console.log('new entries');
    console.log(e);
    localStorage.setItem('entries', JSON.stringify(e));
  };

  return (
    <>
      <Header />
      <EntriesContext.Provider value={{ entries, setEntries: setSavedEntries }}>
        <CalorieGoalProvider>
          <Navbar />
          {children}
        </CalorieGoalProvider>
      </EntriesContext.Provider>
    </>
  );
}

export default Layout;