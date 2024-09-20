"use client";

import { logOutAction } from "@/app/authenticate/auth.action";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
   

export default function SignOutButton() {

   async function logOut() {
      await logOutAction()
      toast.success('Sign out')
   }

	return <Button onClick={logOut}>Logout</Button>
}
