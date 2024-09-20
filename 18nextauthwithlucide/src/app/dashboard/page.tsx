import SignOutButton from "@/components/SignOutButton";
import {
	Avatar,
	AvatarFallback,
} from "@/components/ui/avatar";
import { getUser } from "@/lib/lucia";
import { AvatarWord, CapitalizeFirstWord } from "@/lib/utils";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
	// Protected Page
	const user = await getUser();
	console.log("from dash", user);
	if (!user) {
		redirect("/authenticate");
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<div className="flex flex-col gap-2  items-center border p-4 shadow-md">
				<span className="flex items-center gap-2">
					<Avatar>
						{/* {user.picture} */}
						<Image
							className="parm"
							src={user.picture || ''}
							alt={user.name}
							width={40}
							height={40}
						/>
							<AvatarFallback>{AvatarWord(user.name)}</AvatarFallback>
					</Avatar>
					<h2>{CapitalizeFirstWord(user.name)}</h2>
				</span>
				<p>
					you are logged in as <b>{user.email}</b>
				</p>
				<SignOutButton />
			</div>
		</div>
	);
}
