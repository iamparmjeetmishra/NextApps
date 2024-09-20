"use server";

import { googleOAuthClient } from "@/lib/gooleOauth";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { SignInFormInferSchema, SignUpFormInferSchema } from "@/lib/types";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";

export const SignUpAction = async (values: SignUpFormInferSchema) => {
	console.log("i am running server with value", values);

	try {
		// if user already exits ,
		const existingUser = await prisma.user.findUnique({
			where: {
				email: values.email,
			},
		});
		if (existingUser) {
			return { error: "User already exists", success: false };
		}

		// Create user
		// hashed Password
		const hashedPassword = await new Argon2id().hash(values.password);

		const user = await prisma.user.create({
			data: {
				name: values.name,
				email: values.email.toLowerCase(),
				hashedPassword,
			},
		});

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = await lucia.createSessionCookie(session.id);
		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes
		);
		return { success: true };
   } catch (error) {
      console.log('ErrSignUpAction',error);
      return { error, success: false }
	}
};


export const SignInAction = async (values: SignInFormInferSchema) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				email: values.email
			}
		})

		if (!user || !user.hashedPassword) {
			return { error: 'Invalid User Credentials!', success: false}
		}
		
		const passwordMatch = await new Argon2id().verify(user.hashedPassword, values.password)
		
		if (!passwordMatch) {
			return { error: 'Invalid Credentials!', success: false}
		}

		// Successfully login
		const session = await lucia.createSession(user.id, {})
		const sessionCookie = await lucia.createSessionCookie(session.id)
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
		return {success: true}

	} catch (error) {
		console.log('err', error)
		return {error, success: false}
	}
}

export const logOutAction = async () => {
	const sessionCookie = await lucia.createBlankSessionCookie()
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
	console.log('Signout')
	return redirect('/authenticate')
}

export const getGoogleOauthConsentUrl = async () => {
	try {
		const state = generateState()
		const codeVerifier = generateCodeVerifier()

		cookies().set('codeVerifier', codeVerifier, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production'
		})
		cookies().set('state', state, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production'
		})

		const authUrl = await googleOAuthClient.createAuthorizationURL(state, codeVerifier, {
			scopes: ['email', 'profile']
		})
		return {success: true, url: authUrl.toString()}

	} catch (error) {
		console.log(error)
		return {success: false, error: 'Something went wrong'}
	}
}