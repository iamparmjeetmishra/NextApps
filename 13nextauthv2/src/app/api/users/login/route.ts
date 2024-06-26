import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { email, password } = reqBody;
		console.log(reqBody)

		const user = await User.findOne({ email });

		if (!user) {
			return NextResponse.json(
				{ error: "User does not exist" },
				{ status: 400 }
			);
		}
		console.log("User Exists", user);

		const validPassword = await bcryptjs.compare(
			password,
			user.password
		);

		if (!validPassword) {
			return NextResponse.json(
				{ error: "Check your password" },
				{ status: 400 }
			);
		}

		// console.log('before jwt')

		// jwt token

		const tokenData = {
			id: user._id,
			username: user.username,
			email: user.email,
		};

		const token = await jwt.sign(
			tokenData,
			process.env.TOKEN_SECRET!,
			{ expiresIn: "1d" }
      );
      
      const response = NextResponse.json({
         message: 'Logged in Success',
         success: true
      })

      response.cookies.set(
         "token",
         token,
         {httpOnly: true}
		)
		return response;

	} catch (error: any) {
		console.log(error)
		return NextResponse.json(
			{
				error: error.message,
				message: 'error 123'
			},
			{ status: 500 }
		);
	}
}
