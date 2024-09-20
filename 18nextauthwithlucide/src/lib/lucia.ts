import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "./prisma";
import { cookies } from "next/headers";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		name: "p-auth-cookie",
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === "production",
		},
	},
});

export const getUser = async () => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value || null
	if (!sessionId) {
		return null
	}
	
	const { session, user } = await lucia.validateSession(sessionId)
	console.log('user', user)
	console.log('session',session)
	
	try {
		if (session && session.fresh) {
			// refreshing cookie
			const sessionCookie = await lucia.createSessionCookie(sessionId)
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
		}
		if (!session) {
			const sessionCookie = await lucia.createBlankSessionCookie()
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

		}
	} catch (error) {
		console.log(error)
	}
	
	const dbUser = await prisma.user.findUnique({
		where: {
			id: user?.id
		},
		select: {
			name: true,
			email: true,
			picture: true,
		}
	})
	console.log('dbuser', dbUser)
	return dbUser
}