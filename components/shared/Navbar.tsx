import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="z-20 h-14 fixed top-0 left-0 bg-indigo-500 w-full flex items-center text-white p-6">
        <Link href="/" passHref>
          <div className="cursor-pointer">🍔🍔🍔</div>
        </Link>
        <div className="flex grow justify-end">
          <Link href="/history" passHref>
            <div className="cursor-pointer">History</div>
          </Link>
        </div>
      </div>
      <div className="mb-20" />
    </>
  );
};

export default Navbar;
