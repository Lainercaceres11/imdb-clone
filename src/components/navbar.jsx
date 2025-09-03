import { NavbarItem } from "./navbar-item";

export const Navbar = () => {
  return (
    <div className="flex dark:bg-gray-600 bg-amber-100 p-4 lg:text-lg justify-center gap-6">
      <NavbarItem title="Trending" param="trending" />
      <NavbarItem title="Top Rated" param="rated" />
    </div>
  );
};
