import { z } from "zod";

export const SignInFormSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(8, {
			message: "Password must be atleast 8 characters long",
		}),
});

export const SignUpFormSchema = z.object({
   name: z.string().min(2),
	email: z.string().email(),
	password: z
		.string()
		.min(8, {
			message: "Password must be atleast 8 characters long",
		}),
	confirmPassword: z
		.string()
		.min(8, {
			message: "Confirm Password must be atleast 8 characters long",
		}),
}).refine(data => data.password === data.confirmPassword, {
   message: 'Passwords do not match',
   path: ['confirmPassword']
})

export type SignInFormInferSchema = z.infer<typeof SignInFormSchema>;
export type SignUpFormInferSchema = z.infer<typeof SignUpFormSchema>;
