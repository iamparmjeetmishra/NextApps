"use client";
import { useToast } from "@/components/ui/use-toast";
import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError,} from "axios";
import { useParams,useRouter,} from "next/navigation";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import {
	OTPInput,
	OTPInputContext,
	REGEXP_ONLY_DIGITS,
} from "input-otp";
import { useState } from "react";

const VerifyAccount = () => {
	const [otp, setOtp] = useState("");

	const router = useRouter();
	const params = useParams();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof verifySchema>>({
		resolver: zodResolver(verifySchema),
	});

	const onSubmit = async (data: z.infer<typeof verifySchema>) => {
		try {
			const response = await axios.post<ApiResponse>(`/api/verify-code`,	{
					username: params.username,
					code: data.code,
				}
			);

			toast({
				title: "Success",
				description:
					response.data.message,
			});

			router.replace("sign-in");
		} catch (error) {
			console.error(
				"Erron in verifying user",
				error
			);
			const axiosError =
				error as AxiosError<ApiResponse>;

			toast({
				title: "Verification failed",
				description:
					axiosError.response?.data
						.message,
				variant: "destructive",
			});
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadown-md">
				<div className="text-center">
					<h1 className="text-4xl font-extrabold tracking-light lg:text-5xl mb-6">
						Verify Your Account
					</h1>
					<p className="mb-4">
						Enter the Verification code
						from your Email.
					</p>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(
							onSubmit
						)}
						className="space-y-6"
					>
						<FormField
							control={form.control}
							name="code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Verification Code
									</FormLabel>
									<FormControl>
										{/* <Input
											placeholder="Enter your code"
											{...field}
										/> */}
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">
							Submit
						</Button>
					</form>
				</Form>
				<div>
					
				</div>
				{otp}
			</div>
		</div>
	);
};

export default VerifyAccount;
