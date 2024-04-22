import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from 'zod'
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

// Get Method to check username

export async function GET(request: Request) {

    // Not required in the lastest Version of Next
    // if (request.method !== 'GET') {
    //     return Response.json({
    //         success: false,
    //         message: 'Other than GET method not allowed'
    //     }, {status: 400}
    //     )
    // }
    // console.log(`Received request with method: ${request.method}`)

    await dbConnect()

    // localhost:3000/api/cuu?username=parm?email=info@gmail.com
    // Getting the username from the query strings
    try {
        
        const { searchParams } = new URL(request.url)
        const queryParam = {
            username : searchParams.get('username')
        }

        // Validation with Zod
        const result = UsernameQuerySchema.safeParse(queryParam)
        console.log(result) // Todo: Remove
        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                success: false,
                message: usernameErrors?.length > 0
                    ? usernameErrors.join(', ')
                    : "Invalid query parameters",
            }, { status: 400 }
            )
        }

        const { username } = result.data

        // Getting the username from DB

        const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true })
        
        if (existingVerifiedUser) {
            return Response.json(
                {
                    success: false,
                    message: 'Username is already taken'
                },
                {status: 400}
            )
        }

        return Response.json({
            success: true,
            message: 'Username is unique'
        }, { status: 200 }
        )


    } catch (error) {
        console.log('Error checking username', error)
        return Response.json(
            {
                success: false,
                message: 'Error checking username'
            },
            { status: 500}
        )
    }
}