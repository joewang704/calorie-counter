import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { PencilAltIcon } from "@heroicons/react/solid";

import DatePicker from "./DatePicker";
import { useUserContext } from "context/User";
import { AddFoodParams, Food, UpdateFoodParams, addFood, setFood } from "utils/db";
import { useFoodsContext } from "context/Entries";
import { NumericInput } from "./shared/NumericInput";

const now = DateTime.now();

type Props = {
  filter?: (f: Food) => boolean;
  readonlyDate?: boolean;
  defaultDate?: DateTime;
};

const Entries = ({ filter, readonlyDate, defaultDate }: Props) => {
  const [editingID, setEditingID] = useState<number | undefined>();
  const { foods, loading, refetch } = useFoodsContext();

  const addEntry = (params: AddFoodParams) => {
    addFood(params);
  };

  const updateEntry = (params: UpdateFoodParams) => {
    setFood(params);
    refetch();
    setEditingID(undefined);
  };

  if (loading) {
    return <>Loading...</>;
  }

  const displayedFoods = foods ? (filter ? foods.filter(filter) : foods) : [];

  return (
    <>
      <div className="grid grid-cols-[100px_500px_100px_80px] gap-3">
        <div className="font-medium">Date</div>
        <div className="font-medium">Item</div>
        <div className="font-medium">Calories</div>
        <div></div>
        <EntryForm
          onSubmit={addEntry}
          readonlyDate={readonlyDate}
          initialState={
            defaultDate && { date: defaultDate, name: "", calories: undefined }
          }
        />

        {displayedFoods
          ?.sort((a, b) => {
            if (a.date == b.date) {
              return 0;
            } else if (a.date < b.date) {
              return 1;
            }
            return -1;
          })
          .map(({ date, name, calories, id }, i) =>
            i === editingID ? (
              <EntryForm
                onSubmit={updateEntry}
                initialState={{ date, name, calories }}
                submitText="Update"
                readonlyDate={readonlyDate}
                id={id}
                key={i}
              />
            ) : (
              <React.Fragment key={i}>
                <div>{date.toLocaleString()}</div>
                <div>{name}</div>
                <div>{calories}</div>
                <div className="flex items-center">
                  <PencilAltIcon
                    className="w-5 h-5 text-gray-400 hover:text-gray-300 cursor-pointer"
                    onClick={() => setEditingID(i)}
                  />
                </div>
              </React.Fragment>
            )
          )}
      </div>
    </>
  );
};

type FormProps = {
  onSubmit: (e: any) => void;
  initialState?: {
    date: DateTime;
    name: string;
    calories?: number;
  }
  submitText?: string;
  readonlyDate?: boolean;
  id?: string;
};

const EntryForm = ({
  onSubmit,
  initialState,
  submitText,
  readonlyDate,
  id,
}: FormProps) => {
  const { user } = useUserContext();
  const [date, setDate] = useState<DateTime>(initialState?.date || now);
  const [name, setName] = useState<string>(initialState?.name || "");
  // const [calories, setCalories] = useState<string | undefined>(initialState?.calories);
  const [calories, setCalories] = useState<number | undefined>(initialState?.calories);

  useEffect(() => {
    if (initialState) {
      setDate(initialState.date);
      setName(initialState.name);
      setCalories(initialState.calories);
    }
  }, [initialState]);

  const valid =
    date.isValid &&
    !!name &&
    Number.isSafeInteger(Number(calories)) &&
    Number(calories) > 0;

  const resetForm = () => {
    setName("");
    setCalories(undefined);
  };

  return (
    <>
      {readonlyDate ? (
        <div className="flex items-center text-gray-600">
          {date.toLocaleString()}
        </div>
      ) : (
        <DatePicker onSelect={setDate} date={date} />
      )}
      <input
        type="text"
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <NumericInput value={calories} onChange={(c) => setCalories(c)} />
      <button
        className="bg-blue-500 p-2 rounded text-white hover:bg-blue-400 cursor:pointer disabled:bg-gray-300 disabled:hover:bg-gray-300"
        disabled={!valid}
        onClick={() => {
          if (!calories) {
            throw new Error('Calories must exist');
          }
          onSubmit({ date, name, calories: Number(calories), email: user!.email!, id });
          resetForm();
        }}
      >
        {submitText || "Save"}
      </button>
    </>
  );
};

export default Entries;
