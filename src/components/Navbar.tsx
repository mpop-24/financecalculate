// components/Navbar.tsx
import { NavLink } from "react-router-dom";
import { cn } from "../lib/utils";
import { Calculator, Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface NavLinkItem {
  to: string;
  label: string;
}

export function Navbar() {
  const links: NavLinkItem[] = [
    { to: "/", label: "Retirement Calculator" },
    { to: "/need", label: "How Much Do I Need" },
    { to: "/loan", label: "Loan Calculator" },
    { to: "/news", label: "News" },
  ];

  return (
    <nav className="border-b bg-card fixed top-0 left-0 right-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <NavLink to="/" className="flex items-center space-x-3">
            <Calculator className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Finance Calculator</span>
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }: { isActive: boolean }) =>
                  cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-gray-900" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[300px] bg-white text-gray-900 !dark:bg-white !dark:text-gray-900 shadow-lg"
              >
                <SheetHeader>
                  <SheetTitle className="text-gray-900 !dark:text-gray-900">
                    Menu
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col space-y-4 mt-4">
                  {links.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }: { isActive: boolean }) =>
                        cn(
                          "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                          "hover:bg-accent hover:text-accent-foreground",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-gray-700 hover:text-gray-900",
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
