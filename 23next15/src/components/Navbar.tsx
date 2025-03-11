import Link from "next/link";
import { Button } from "./ui/button";

const NavLinks = [
	{
		title: "Home",
		slug: "/",
	},
	{
		title: "Dashboard",
		slug: "/dashboard",
	},
];

export default function Navbar() {
	return (
		<nav className="py-5 flex items-center justify-between">
			<div className="flex items-center gap-6">
				<Link href={"/"}>
					<h1 className="text-2xl font-semibold">
						Next<span className="text-blue-500">Blog</span>
					</h1>
				</Link>
				<div className="hidden sm:flex items-center gap-6">
					{NavLinks.map((Nav) => (
						<Link
							key={Nav.slug}
							href={Nav.slug}
							className="text-sm font-medium hover:text-blue-500 transition-colors"
						>
							{Nav.title}
						</Link>
					))}
				</div>
			</div>
			<div>
				<Button variant="outline">Sign In</Button>
			</div>
		</nav>
	);
}
