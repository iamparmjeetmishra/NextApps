import type { QueryClient } from "@tanstack/react-query";

import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";

import { Toaster } from "@/components/ui/sonner";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Navbar />
      <hr />
      <Outlet />
      <Toaster />
    </>
  ),
});

function Navbar() {
  return (
    <div className="p-4 flex items-baseline justify-between max-w-2xl m-auto">
      <Link to="/" className="[&.active]:font-bold">
        <h1 className="text-xl font-semibold w-fit">Expenses Tracker</h1>
      </Link>
      <div className="flex gap-3 justify-center">
        {" "}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/expenses" className="[&.active]:font-bold">
          Expenses
        </Link>
        <Link to="/create-expense" className="[&.active]:font-bold">
          Create
        </Link>
        <Link to="/profile" className="[&.active]:font-bold">
          Profile
        </Link>
      </div>
    </div>
  );
}
