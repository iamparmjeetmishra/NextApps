import { createFileRoute, Outlet } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { userQueryOptions } from "@/lib/actions";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    // useQueryOptions
    const queryClient = context.queryClient;
    // check if the user is logged in
    try {
      const data = await queryClient.fetchQuery(userQueryOptions);
      // console.log("datafromAuth", data);
      return data.User;
    }
    catch (error) {
      toast(`Error : ${error}`);
      return { user: "" };
    }
  },
  component: AuthComponent,
});

function AuthComponent() {
  const user = Route.useRouteContext();
  // console.log("userfromAuthComp", user);

  if (!user) {
    return <Login />;
  }
  return <Outlet />;
}

function Login() {
  return (
    <div className="container max-w-screen-lg mx-auto flex flex-col items-center mt-4">
      <p>You have to login or register</p>
      <div className="flex gap-2 items-center">
        <Button asChild>
          <a href="/api/auth/login">Login!</a>
        </Button>
        <Button asChild>
          <a href="/api/auth/register">Register!</a>
        </Button>
      </div>
    </div>
  );
}
