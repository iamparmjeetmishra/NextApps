"use client";

import { getGoogleOauthConsentUrl } from "@/app/authenticate/auth.action";
import { Button } from "./ui/button";
import { RiGoogleFill } from "@remixicon/react";
import { toast } from "sonner";

export default function GoogleOAuthButton() {

	const handleClick = async () => {
		const res = await getGoogleOauthConsentUrl()
		console.log(res)
		if (res.url) {
			window.location.href = res.url
		} else {
			toast.error(res.error)
		}
	}

	return (
		<Button onClick={handleClick}>
			<RiGoogleFill className="mr-2" />
			<span>Continue with Google</span>
		</Button>
	);
}
