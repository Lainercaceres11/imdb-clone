"use client";

import Link from "next/link";
import { DarkModeSwitch } from ".";
import { UserButton, useUser } from "@clerk/nextjs";

export const Header = () => {
  const { isSignedIn } = useUser();
  return (
    <div className="flex justify-between items-center p-3 max-w-6xl mx-auto">
      <ul className="flex gap-4">
        {isSignedIn ? (
          <li className="hidden sm:block">
            <UserButton />
          </li>
        ) : (
          <li className="hidden sm:block">
            <Link href={"/sign-in"}>Sing-in</Link>
          </li>
        )}

        <li className="hidden sm:block">
          <Link href={"/"}>Home</Link>
        </li>

        <li className="hidden sm:block">
          <Link href={"/about"}>About</Link>
        </li>

        <li className="hidden sm:block">
          <Link href={"/favorite"}>Favorites</Link>
        </li>
      </ul>
      <div className="flex items-center gap-4">
        <DarkModeSwitch />
        <Link href={"/"} className="flex gap-1 items-center">
          <span className="text-2xl font-bold bg-amber-500 py-1 px-2 rounded-lg">
            IMDb
          </span>
          <span className="text-xl hidden sm:inline">Clone</span>
        </Link>
      </div>
    </div>
  );
};
