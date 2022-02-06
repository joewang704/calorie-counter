import type { NextPage } from "next";
import Calories from "components/Calories";

const Home: NextPage = () => {
  return (
    <div className="font-sans">
      <div className="m-8">
        <Calories />
      </div>
    </div>
  );
};

export default Home;
