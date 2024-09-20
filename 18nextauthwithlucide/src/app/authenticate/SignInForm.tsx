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
import { SignInFormInferSchema, SignInFormSchema } from "@/lib/types";
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
import { SignInAction } from "./auth.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignInForm() {
	const router = useRouter()
	const form = useForm<SignInFormInferSchema>({
		resolver: zodResolver(SignInFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// submit handler
	async function FormHandler(values: SignInFormInferSchema) {
		try {
			const res = await SignInAction(values)
			if (res.success) {
				router.push('/dashboard')
				toast.success('Successfully Logged in')
			} else {
				console.log('res', res);
				toast.error(`${res.error}`)
			}
		} catch (error) {
			console.log(error)
			toast.error(`${error}`)
		}
	}

	return (
		<Card className="min-w-[500px]">
			<CardHeader>
				<CardTitle>Welcome back!</CardTitle>
				<CardDescription>
					Sign in to your account to continue.
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
						<Button type="submit" className="self-start">
							Sign In
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
