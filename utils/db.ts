import { initializeApp } from "firebase/app"
import { collection, getDocs, getFirestore } from "firebase/firestore"
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

export const getFoods = async () => {
    const foodsCol = collection(db, 'foods');
    const foodSnapshot = await getDocs(foodsCol);
    const foodList = foodSnapshot.docs.map(doc => {
        const d = doc.data();
        d.date = DateTime.fromSeconds(d.date.seconds);
        return d;
    });
    return foodList;
}