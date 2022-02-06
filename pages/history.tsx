import type { NextPage } from "next";

import Entries from "components/Entries";
import Summary from "components/Summary";
import Navbar from "components/shared/Navbar";

const Home: NextPage = () => {
  return (
    <div className="font-sans">
      <Navbar />
      <div className="m-8">
        <h1 className="text-3xl mb-4 font-medium">Food History</h1>
        <Entries />
        <div className="m-8"></div>
        <Summary />
      </div>
    </div>
  );
};

export default Home;
