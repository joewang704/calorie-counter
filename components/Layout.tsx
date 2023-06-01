import React, { ReactNode } from "react";

import { FoodsProvider } from "context/Entries";
import { CalorieGoalProvider } from "context/CalorieGoal";
import { UserProvider } from "context/User";
import Navbar from "./shared/Navbar";
import Header from "./Header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <UserProvider>
        <FoodsProvider>
          <CalorieGoalProvider>
            <Navbar />
            {children}
          </CalorieGoalProvider>
        </FoodsProvider>
      </UserProvider>
    </>
  );
};

export default Layout;
