
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Book, List, TrainFront } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHomepage = location.pathname === "/";
  
  if (isHomepage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <TrainFront className="h-6 w-6 text-primary mr-2" />
              <h1 className="text-xl font-bold text-gray-900">
                Railway Gate Monitor
              </h1>
            </div>
            <nav className="flex space-x-4">
              <NavLink to="/dashboard" currentPath={location.pathname}>
                Dashboard
              </NavLink>
              <NavLink to="/manual" currentPath={location.pathname}>
                <Book className="w-5 h-5 mr-1" />
                Manual
              </NavLink>
              <NavLink to="/logs" currentPath={location.pathname}>
                <List className="w-5 h-5 mr-1" />
                Logs
              </NavLink>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-grow py-6 px-4">{children}</main>
      <footer className="py-4 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Railway Gate Monitoring System
        </div>
      </footer>
    </div>
  );
};

interface NavLinkProps {
  to: string;
  currentPath: string;
  children: React.ReactNode;
}

const NavLink = ({ to, currentPath, children }: NavLinkProps) => {
  const isActive = currentPath === to;
  
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center px-3 py-2 rounded-md text-sm font-medium",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-gray-600 hover:bg-gray-100"
      )}
    >
      {children}
    </Link>
  );
};

export default Layout;
