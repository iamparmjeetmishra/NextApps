import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

// We have to clean token

export async function POST(request: NextRequest) {
   try {
      
      const response = NextResponse.json({
         message: 'Logout successfully',
         success: true
      })

      response.cookies.set(
         'token',
         "",
         {
            httpOnly: true,
            expires: new Date(0)
         },
      )

      return response;


	} catch (error: any) {
		return NextResponse.json(
			{
				error: error.message,
			},
			{ status: 500 }
		);
	}
}
