import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";

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
      console.log('error logout route', error)
		return NextResponse.json(
			{
				error: error.message,
			},
			{ status: 500 }
		);
	}
}
