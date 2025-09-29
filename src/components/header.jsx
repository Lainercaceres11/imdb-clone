"use client";

import Link from "next/link";
import { DarkModeSwitch } from ".";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const routes = [
  {
    id: 1,
    title: "Home",
    href: "/",
  },
  {
    id: 2,
    title: "About",
    href: "/about",
  },
  {
    id: 3,
    title: "Favorites",
    href: "/favorite",
  },
];

export const Header = () => {
  const { isSignedIn } = useUser();
  const location = usePathname();
  return (
    <div className="flex flex-wrap gap-4 justify-between items-center p-3 max-w-6xl mx-auto">
      <ul className="flex gap-4">
        {isSignedIn ? (
          <li className="sm:block">
            <UserButton />
          </li>
        ) : (
          <li className="sm:block">
            <Link href={"/sign-in"}>Sing-in</Link>
          </li>
        )}
        {routes.map((path) => (
          <>
            <li
              key={path.id}
              className={`sm:block ${
                location === path.href
                  ? "underline underline-offset-8 decoration-4 decoration-amber-500 rounded-lg"
                  : ""
              }  `}
            >
              <Link href={path.href}>{path.title}</Link>
            </li>
          </>
        ))}
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
