import { initializeApp } from "firebase/app"
import { addDoc, collection, doc, getDocs, getFirestore, setDoc, Timestamp } from "firebase/firestore"
import { DateTime } from "luxon";

const firebaseConfig = {
  apiKey: "AIzaSyBeuTbULiiINQAXebh_E79W9EBjp3Ahpdg",
  authDomain: "calorie-backend.firebaseapp.com",
  projectId: "calorie-backend",
  storageBucket: "calorie-backend.appspot.com",
  messagingSenderId: "41163867104",
  appId: "1:41163867104:web:df053c65e7d4ecdf792185"
};

export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export type Food = {
  date: DateTime;
  name: string;
  calories: number;
}

export type StoredFood = Food & {
  id: string;
}

export const getFoods = async (): Promise<StoredFood[]> => {
  const foodsCol = collection(db, 'foods');
  const foodSnapshot = await getDocs(foodsCol);
  const foodList = foodSnapshot.docs.map(doc => {
    const d = doc.data();
    d.date = DateTime.fromSeconds(d.date.seconds);
    d.id = doc.id;
    return d;
  });
  return foodList as StoredFood[];
};

export type AddFoodParams = Food & {
  email: string;
}

export const addFood = async ({ date, name, calories, email }: AddFoodParams) => {
  await addDoc(collection(db, 'foods'), {
    name,
    calories,
    email,
    date: Timestamp.fromDate(date.toUTC().toJSDate()),
  });
};

export type UpdateFoodParams = Food & {
  id: string;
  email: string;
}

export const setFood = async ({ id, name, calories, date, email }: UpdateFoodParams) => {
  await setDoc(doc(db, 'foods', id), {
    name,
    calories,
    email,
    date: Timestamp.fromDate(date.toUTC().toJSDate()),
  });
};