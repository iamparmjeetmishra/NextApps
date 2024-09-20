"use client";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {SignUpFormInferSchema, SignUpFormSchema } from "@/lib/types";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignUpAction } from "./auth.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignUpForm() {
	const router = useRouter()

	const form = useForm<SignUpFormInferSchema>({
		resolver: zodResolver(SignUpFormSchema),
		defaultValues: {
			name: '',
			email: "",
			password: "",
			confirmPassword: ''
		},
	});

	// submit handler
	async function FormHandler(values: SignUpFormInferSchema) {
		const res = await SignUpAction(values)
		if (res.success) {
			toast.success('User is created')
			router.push('/dashboard')
		} else {
			console.log(res.error)
			toast.error(`${res.error}`)
		}
		
	}

	return (
		<Card className="min-w-[500px]">
			<CardHeader>
				<CardTitle>Begin your journey</CardTitle>
				<CardDescription>
					Sign up to your account to continue.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						className="flex flex-col gap-2"
						onSubmit={form.handleSubmit(FormHandler)}
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="Enter your name.."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="Enter your email.."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Enter your password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Confirm your password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="self-start">
							Sign Up
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
