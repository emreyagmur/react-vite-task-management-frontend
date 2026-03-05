import React from "react";
import { Home, User, CircleDollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const menusItems = [
  {
    label: "Dashboard",
    icon: Home,
    url: "/dashboard",
  },
  {
    label: "Account",
    icon: User,
    url: "/profile",
  },
  {
    label: "Income Expense",
    icon: CircleDollarSign,
    url: "/transaction",
  },
];

const Menus = () => {
  return (
    <React.Fragment>
      {menusItems.map((menu) => (
        <Link
          key={menu.url}
          to={menu.url}
          className={cn(
            "group flex text-sm items-center px-2 py-2 font-medium rounded-md cursor-pointer hover:bg-opacity-75",
            location.pathname === menu.url ? "bg-muted" : "hover:bg-muted",
          )}
        >
          <menu.icon size={14} className="mr-2" />
          {menu.label}
        </Link>
      ))}
    </React.Fragment>
  );
};

export default Menus;
