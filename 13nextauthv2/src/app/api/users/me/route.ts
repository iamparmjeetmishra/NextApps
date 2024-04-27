import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

connect();

// We have to clean token

export async function POST(request: NextRequest) {
   try {
      
      // extract data from token
      const userId = await getDataFromToken(request)
      const user = await User.findOne(
         { _id: userId }
      ).select('-password')

      // console.log('after user find')

      // check if there is no user
      if (!user) {
         return NextResponse.json(
            {
               success: false,
               message: 'User not found'
            }, {status: 400}
         )
      }
      // console.log('Before return user')
      return NextResponse.json({
         success: true,
         message: 'User Found',
         data: user
      })

   } catch (error: any) {
      // console.log(error)
		return NextResponse.json(
			{
				error: error.message,
			},
			{ status: 400 }
		);
	}
}
