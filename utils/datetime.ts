import { DateTime } from "luxon";

export const today = DateTime.local().startOf('day');

export const isSameDay = (a: DateTime, b: DateTime) => a.startOf('day').equals(b.startOf('day'));
export const isToday = (d: DateTime) => isSameDay(d, today);