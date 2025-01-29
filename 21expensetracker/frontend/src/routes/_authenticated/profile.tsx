import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Badge, Verified } from "lucide-react";

import LoadingComponent from "@/components/loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { userQueryOptions } from "@/lib/actions";
import { AvatarFirstWord } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions);
  // console.log("datafromProfile", data);

  if (isPending)
    return <LoadingComponent />;
  if (error)
    return <LoginComponent />;

  return (
    <div className="p-4 border container m-auto mt-4 rounded">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Avatar className="text-black border-1 rounded-full">
            {data.picture && (
              <AvatarImage src={data.given_name} alt={data.given_name} />
            )}
            <AvatarFallback>{AvatarFirstWord(data.given_name)}</AvatarFallback>
          </Avatar>
          <p>
            {data.given_name}
            {" "}
            {data.family_name}
          </p>
        </div>
        <p className="flex items-center gap-2">
          Your Email:
          {data.email}
          {" "}
          {data.email_verified
            ? <Verified />
            : <Badge />}
        </p>
      </div>
      <Button asChild className="my-4">
        <a href="/api/auth/logout">Logout!</a>
      </Button>
    </div>
  );
}

function LoginComponent() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <p>Not Logged In..</p>
      <Button><a href="/api/auth/login">Log in</a></Button>
    </div>
  );
}
