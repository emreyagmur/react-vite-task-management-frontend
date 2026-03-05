import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import Menus from "@/components/auth/menus";

export const AuthNavbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full flex items-center px-4 md:px-6 justify-between py-3 border-b backdrop-blur bg-muted/40">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-4">
          <nav className="grid items-start text-md font-medium gap-1">
            <Menus />
          </nav>
          <div className="mt-auto">upgrade to pro for more features</div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <img src="/vite.svg" alt="logo" className="w-6.25" />
            <span className="text-primary font-bold">Taskify</span>
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
        <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
          <Button asChild variant="secondary">
            <Link to="sign-in">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="sign-up">Sign Up</Link>
          </Button>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
};
