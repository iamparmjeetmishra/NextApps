import TabSwitcher from "@/components/TabSwitcher";
import React from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { getUser } from "@/lib/lucia";
import { redirect } from "next/navigation";
import GoogleOAuthButton from "@/components/GoogleOAuthButton";

export default async function AuthenitcatePage() {
	const user = await getUser()
	if (user) {
		redirect('/dashboard')
	}
	return (
		<div className="relative flex h-screen w-full items-center justify-center bg-background">
			<TabSwitcher
				SignInTab={<SignInForm />}
				SignUpTab={<SignUpForm />}
			/>
			<GoogleOAuthButton />
		</div>
	);
}
