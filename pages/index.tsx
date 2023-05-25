import type { NextPage } from "next";
import Daily from "components/Daily";

const Home: NextPage = () => {
  return (
    <div className="font-sans">
      <div className="m-8">
        <Daily />
      </div>
    </div>
  );
};

export default Home;
