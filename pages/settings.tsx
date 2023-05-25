import type { NextPage } from "next";
import { useCalorieGoalContext } from "context/CalorieGoal";

const Home: NextPage = () => {
  const { calorieGoal, setCalorieGoal } = useCalorieGoalContext();

  return (
    <div className="font-sans">
      <div className="m-8">
        Daily Calorie Limit:{" "}
        <input
          type="text"
          value={calorieGoal}
          onChange={(e) => setCalorieGoal(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default Home;
